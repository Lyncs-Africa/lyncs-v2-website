# Swap valuation — backend API spec

The marketing site is deployed as a **static export** (`npm run build:netlify`), so it
cannot run server code. The `/swap` valuation tool therefore calls the **backend**
(same host as the car catalog, e.g. `https://staging.lyncs.africa`) for two things:

1. `GET  /cars/valuation` — price a used car from live market data.
2. `POST /cars/valuation-leads` — capture a swap/fleet lead.

The frontend targets `${API_BASE}/cars/valuation…` where `API_BASE` is
`NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_API_URL` (default `https://staging.lyncs.africa`),
with any trailing `/` or `/api` stripped — identical to the `/cars/catalog` calls.

The reference implementation these endpoints must reproduce already lives in this repo
(previously run as Next API routes, now removed):

- Jiji lookup: `src/lib/valuation/jijiPricing.ts`
- Range maths + offline fallback: `src/lib/valuation/getCarValuation.ts`
- Seed table + conditions: `src/lib/valuation/data.ts`

Porting those three files server-side is the fastest path to matching output.

---

## 1. GET /cars/valuation

Prices a single used car. CORS-restricted upstream (Jiji) means this **must** run
server-side.

### Request — query params
| param       | type                          | notes                                  |
|-------------|-------------------------------|----------------------------------------|
| `make`      | string                        | e.g. `Toyota`                          |
| `model`     | string                        | e.g. `Camry`                           |
| `year`      | 4-digit string                | e.g. `2013`                            |
| `km`        | integer string (optional)     | mileage; empty allowed                 |
| `condition` | `Tokunbo` \| `Needs work`     | defaults to `Tokunbo` if missing       |

### Response — `200 application/json`
```json
{ "range": { "min": 10700000, "max": 13600000 } }
```
- Values are **NGN**, rounded to the nearest ₦100,000.
- When the car can't be valued (missing make/model/year, or no data), return
  `{ "range": null }` with **HTTP 200** (the UI shows a "couldn't value" state;
  it treats any non-200 as null too).

### Algorithm (from `jijiPricing.ts` + `getCarValuation.ts`)
1. **Fetch comparables from Jiji** (asking prices, skew slightly high):
   - `GET https://jiji.ng/api_web/v1/listing?slug=cars&webp=true&query=<make> <model>&page=<1..3>`
     (20 results/page; fetch 3 pages). Send a generic `user-agent` and
     `accept: application/json`. 6s timeout per page; cache each page ~24h.
   - For each advert keep only clean same-make/same-model matches with a sane price
     (₦300k–₦500m): prefer `schema_org` (`brand.name`, `model`, `vehicleModelDate`),
     else whole-word match make+model in `title` and parse the year from it.
2. **Build the range** (`rangeFromComparables`): need ≥3 comps. Narrow to comps near
   the requested year (widening windows ±2 / ±4 / ±7, min 4 samples). Then:
   - ≥6 prices → interquartile range (25th–75th percentile),
   - else → median ±10%.
   - Multiply both ends by the condition factor, round to ₦100k, ensure
     `max ≥ min + 100k`.
3. **Fallback** when Jiji yields no usable comps (`getCarValuation`): deterministic
   estimate from the `CAR_VALUES` seed table × year/condition/mileage factors, as a
   ±8% range. Returns null if the model isn't in the table.

Condition factor used on the live (Jiji) path — `CONDITION_ADJ`:
`Tokunbo = 1.0`, `Needs work = 0.78`.

---

## 2. POST /cars/valuation-leads

Captures a lead from the swap tool. **`multipart/form-data`** (the fleet form may
attach a file). Validates server-side, stores the lead, returns an id.

### Request — form fields
Shared:
| field            | required | notes                         |
|------------------|----------|-------------------------------|
| `type`           | yes      | `owner` \| `fleet`            |
| `contactName`    | yes      |                               |
| `contactPhone`   | yes      |                               |
| `contactEmail`   | yes      | must look like an email       |
| `contactCompany` | fleet: yes | owner: optional             |
| `contactRole`    | no       |                               |

`type = owner` adds:
| field          | notes                                            |
|----------------|--------------------------------------------------|
| `make`, `model`| required                                         |
| `year`         | required, 1990..currentYear+1                     |
| `mileageKm`    | optional integer                                  |
| `condition`    | `Tokunbo` \| `Needs work`                         |
| `estimateMin`, `estimateMax` | the quoted range (NGN)              |
| `targetEvName`, `targetEvPrice` | EV they're swapping into (NGN)   |

`type = fleet` adds:
| field      | notes                                                        |
|------------|--------------------------------------------------------------|
| `count`    | `1–5` \| `6–20` \| `21–50` \| `50+`                          |
| `rough`    | free-text description                                        |
| `fleetList`| optional file, `.xlsx`/`.csv` only, ≤10 MB                   |

### Response
- Success: `200 { "success": true, "id": "<leadId>" }`
- Validation: `400 { "success": false, "message": "...", "errors": { "<field>": "..." } }`
  — the UI maps `errors` onto the matching inputs.
- Failure: `500 { "success": false, "message": "..." }`

### Storage
Mirror the fields above. The retired Payload collection
`src/collections/ValuationLeads.ts` shows the intended record shape
(`car {make,model,year,mileageKm,condition}`, `estimate {min,max}`,
`targetEv {name,price}`, `fleet {count,roughDescription,fleetList}`, contact fields,
plus an optional `inspectionAddress` the team fills in later, and an auto `reference`).

---

## Notes
- CORS: the backend must allow the marketing origin(s) since the browser calls it
  cross-origin from the static site.
- Paths (`/cars/valuation`, `/cars/valuation-leads`) were chosen to sit beside the
  existing `/cars/*` endpoints; if you prefer different paths, tell us and we'll
  repoint `API_BASE` usage in `src/lib/valuation/getCarValuation.ts`,
  `src/components/swap/LockInModal.tsx`, and `src/components/swap/FleetForm.tsx`.
