/**
 * Cars API Service Layer
 * Connects directly to live backend endpoints (/cars/catalog, /cars/purchases, /cars/swaps, /cars/requests).
 * Pure API integration without static fallback mock data.
 */

import {
  computeInstallmentBreakdown,
  getDeliveryFeeInfo,
} from "../carPurchase.js";
import { numberWithCommas, toInternationalFormat } from "../utils.js";

const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://staging.lyncs.africa";

// The backend endpoints (/cars/catalog, /cars/purchases, etc.) are mounted without /api prefix
const BASE_URL = RAW_BASE_URL.replace(/\/+$/, "").replace(/\/api$/, "");

/**
 * Normalizes any vehicle object from Yekauto, Guazi, or backend
 * into a standard unified format required by the UI components.
 */
export function normalizeCar(raw) {
  if (!raw) return null;

  const id = String(raw.id || raw.productId || raw._id || Math.random());
  const productId = String(raw.productId || raw.id || id);
  const title =
    raw.title ||
    raw.name ||
    [raw.brandName || raw.make, raw.model].filter(Boolean).join(" ").trim() ||
    "Vehicle";
  const make = raw.brandName || raw.make || "";
  const model = raw.model || "";
  const year = raw.year || 2024;
  const platform = raw.platform || raw.source || (String(id).includes("-") ? "yekauto" : "guazi");

  // Condition & Usage: "brand-new" | "used"
  const rawCond = String(raw.condition || raw.usage || "").toUpperCase();
  const isBrandNew =
    rawCond === "NEW" ||
    rawCond === "BRAND-NEW" ||
    rawCond === "BRAND_NEW" ||
    raw.usage === "brand-new";
  const usage = isBrandNew ? "brand-new" : "used";
  const condition = isBrandNew ? "NEW" : "USED";

  // Fuel Type / Powertrain: "electric" | "hybrid" | "petrol"
  const rawFuel = String(raw.fuelType || raw.type || "").toUpperCase();
  let type = "petrol";
  if (
    rawFuel.includes("EV") ||
    rawFuel.includes("ELECTRIC") ||
    rawFuel.includes("BEV")
  ) {
    type = "electric";
  } else if (
    rawFuel.includes("HYBRID") ||
    rawFuel.includes("PHEV") ||
    rawFuel.includes("HEV")
  ) {
    type = "hybrid";
  } else if (
    rawFuel.includes("DIESEL") ||
    rawFuel.includes("GASOLINE") ||
    rawFuel.includes("PETROL")
  ) {
    type = "petrol";
  } else if (raw.type) {
    type = raw.type;
  }

  // Price (NGN)
  const price = Number(raw.priceNgn ?? raw.price ?? 0);
  const originalPrice = raw.linePriceNgn || raw.originalPrice || null;

  // Images: extract array of strings
  const imageList = [];
  if (raw.headImage) imageList.push(raw.headImage);
  if (raw.image) imageList.push(raw.image);
  if (Array.isArray(raw.images)) {
    raw.images.forEach((img) => {
      if (!img) return;
      if (typeof img === "string") imageList.push(img);
      else if (typeof img === "object" && img.url) imageList.push(img.url);
      else if (typeof img === "object" && img.src) imageList.push(img.src);
    });
  }
  const cleanImages = Array.from(new Set(imageList.filter(Boolean)));
  const primaryImage =
    cleanImages[0] ||
    raw.headImage ||
    raw.image ||
    "";

  // Mileage
  let mileage = "0 km";
  if (raw.mileageKm !== undefined && raw.mileageKm !== null) {
    const kmNum = Number(raw.mileageKm);
    if (isBrandNew && kmNum <= 50) {
      mileage = `${kmNum} km`;
    } else {
      mileage = `${numberWithCommas(kmNum)} km`;
    }
  } else if (raw.mileage) {
    mileage = raw.mileage;
  } else if (isBrandNew) {
    mileage = "0 km";
  }

  // Transmission
  let transmission = "Automatic";
  const rawTrans = String(raw.transmission || "").toUpperCase();
  if (rawTrans === "AT") transmission = "Automatic";
  else if (rawTrans === "MT") transmission = "Manual";
  else if (rawTrans === "AMT") transmission = "Automated Manual (AMT)";
  else if (rawTrans === "CVT") transmission = "CVT";
  else if (raw.transmission) transmission = raw.transmission;

  // Origin
  const origin = raw.origin || "imported";

  // Seats
  const seats = raw.seats
    ? typeof raw.seats === "number"
      ? `${raw.seats} seats`
      : String(raw.seats)
    : "5 seats";

  // Engine
  const engine = raw.displacement
    ? `${raw.displacement}${raw.horsepower ? ` (${raw.horsepower} hp)` : ""}`
    : raw.engine || (type === "electric" ? "Electric Motor" : "2.0T Engine");

  // Drivetrain
  const drivetrain = raw.driveType || raw.drivetrain || "AWD";

  return {
    ...raw,
    id,
    productId,
    name: title,
    title,
    make,
    brandName: make,
    model,
    year,
    usage,
    condition,
    type,
    fuelType: raw.fuelType || type.toUpperCase(),
    platform,
    price,
    priceNgn: price,
    priceUsd: raw.priceUsd || null,
    priceCny: raw.priceCny || null,
    originalPrice,
    image: primaryImage,
    headImage: primaryImage,
    images: cleanImages,
    mileage,
    mileageKm: raw.mileageKm ?? 0,
    transmission,
    origin,
    seats,
    engine,
    drivetrain,
    color: raw.color || "Standard",
    dimensions: raw.dimensions || null,
    description:
      raw.description ||
      `This ${year} ${title} is available for direct import through Lyncs Africa. Verified inspection, shipping logistics, and customs documentation are processed upon order.`,
  };
}

/**
 * Helper to build URL with query params
 */
function buildQueryString(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== "" && val !== "all") {
      query.append(key, String(val));
    }
  });
  const str = query.toString();
  return str ? `?${str}` : "";
}

/**
 * Standard fetch wrapper with JSON parsing and error handling
 */
async function apiRequest(path, options = {}) {
  const url = `${BASE_URL}/${path.replace(/^\/+/, "")}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorJson = null;
    try {
      errorJson = JSON.parse(errorText);
    } catch {
      // not JSON
    }

    const retryAfter = response.headers.get("Retry-After");
    let message = errorJson?.message;

    if (response.status === 429) {
      message = `Rate limit exceeded. Please try again${
        retryAfter ? ` in ${retryAfter} seconds` : " in a few minutes"
      }.`;
    } else if (!message) {
      message = `HTTP ${response.status}: ${response.statusText}`;
    }

    if (errorJson?.errors && typeof errorJson.errors === "object") {
      const fieldErrors = Object.entries(errorJson.errors)
        .map(([field, msg]) => `${field}: ${msg}`)
        .join("; ");
      if (fieldErrors) {
        message = `${message} (${fieldErrors})`;
      }
    }

    const error = new Error(message);
    error.status = response.status;
    error.retryAfter = retryAfter ? Number(retryAfter) : null;
    error.errors = errorJson?.errors || null;
    error.data = errorJson;
    throw error;
  }

  return response.json();
}

/**
 * 1. Browse the unified car catalog
 * Endpoint: GET /cars/catalog
 *
 * Query params: page, limit, condition ('NEW' | 'USED'), fuelType, origin, make, keyword, sort, source
 */
export async function fetchCarsCatalog(params = {}) {
  const apiParams = {};

  if (params.page) apiParams.page = params.page;
  if (params.limit) apiParams.limit = Math.min(Number(params.limit) || 20, 50);

  // Condition: 'NEW' or 'USED' per API spec
  if (params.condition) {
    const c = String(params.condition).toUpperCase();
    if (c === "NEW" || c === "BRAND-NEW" || c === "BRAND_NEW") {
      apiParams.condition = "NEW";
    } else if (c === "USED" || c === "FOREIGN-USED" || c === "FOREIGN_USED" || c === "USED-CARS") {
      apiParams.condition = "USED";
    } else {
      apiParams.condition = params.condition;
    }
  }

  if (params.fuelType && params.fuelType !== "all") {
    apiParams.fuelType = params.fuelType;
  }

  if (params.origin && params.origin !== "all") {
    apiParams.origin = params.origin;
  }

  if (params.make) {
    apiParams.make = params.make;
  }

  if (params.keyword || params.q || params.keyWord) {
    apiParams.keyword = params.keyword || params.q || params.keyWord;
  }

  if (params.sort) {
    apiParams.sort = params.sort;
  }

  if (params.source && params.source !== "all") {
    apiParams.source = params.source;
  }

  const query = buildQueryString(apiParams);
  try {
    const res = await apiRequest(`cars/catalog${query}`, {
      method: "GET",
      next: { revalidate: 60 },
    });

    const rawList = Array.isArray(res?.data?.cars)
      ? res.data.cars
      : Array.isArray(res?.cars)
      ? res.cars
      : Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
      ? res
      : [];

    const normalizedCars = rawList.map(normalizeCar).filter(Boolean);
    const pagination = res?.data?.pagination || res?.pagination || {
      page: Number(apiParams.page) || 1,
      pageSize: apiParams.limit || 20,
      limit: apiParams.limit || 20,
      totalCount: normalizedCars.length,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    return {
      success: true,
      message: res?.message || "Unified car catalog fetched successfully",
      data: {
        cars: normalizedCars,
        pagination,
      },
      source: "api",
    };
  } catch (err) {
    console.error("API /cars/catalog error:", err?.message || err);
    return {
      success: false,
      message: err?.message || "Failed to fetch car catalog",
      data: {
        cars: [],
        pagination: {
          page: Number(apiParams.page) || 1,
          pageSize: apiParams.limit || 20,
          limit: apiParams.limit || 20,
          totalCount: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
        },
      },
      error: err?.message,
    };
  }
}

/**
 * Single Car Detail Query
 * Tries platform-specific /cars/catalog/:id, /guazi/cars/:id, or /yekauto/cars/:id
 */
export async function fetchCarDetail(id, platform = null) {
  if (!id) return null;

  try {
    const endpoint =
      platform === "guazi"
        ? `guazi/cars/${id}`
        : platform === "yekauto"
        ? `yekauto/cars/${id}`
        : `cars/catalog/${id}`;

    const res = await apiRequest(endpoint, { method: "GET" });
    const rawCar = res?.data?.car || res?.car || res?.data || res;
    return normalizeCar(rawCar);
  } catch (err) {
    console.error(`API detail fetch for car ${id} error:`, err?.message || err);
    return null;
  }
}

/**
 * 4. Request a Bespoke Vehicle
 * Endpoint: POST /cars/requests
 */
export async function submitCarRequest(payload) {
  const cleanPayload = {
    make: payload.make?.trim(),
    model: payload.model?.trim(),
    type: payload.type || "petrol",
    usage: payload.usage || "brand-new",
    details: payload.details || undefined,
    contact: {
      name: payload.contact?.name?.trim(),
      email: payload.contact?.email?.trim(),
      phone: toInternationalFormat(payload.contact?.phone),
      whatsapp: toInternationalFormat(payload.contact?.whatsapp || payload.contact?.phone),
    },
  };

  if (payload.budgetMin !== undefined && payload.budgetMin !== null && payload.budgetMin !== "") {
    cleanPayload.budgetMin = Number(payload.budgetMin);
  }
  if (payload.budgetMax !== undefined && payload.budgetMax !== null && payload.budgetMax !== "") {
    cleanPayload.budgetMax = Number(payload.budgetMax);
  }
  if (payload.yearMin !== undefined && payload.yearMin !== null && payload.yearMin !== "") {
    cleanPayload.yearMin = Number(payload.yearMin);
  }
  if (payload.yearMax !== undefined && payload.yearMax !== null && payload.yearMax !== "") {
    cleanPayload.yearMax = Number(payload.yearMax);
  }

  try {
    const res = await apiRequest("cars/requests", {
      method: "POST",
      body: JSON.stringify(cleanPayload),
    });
    return res;
  } catch (err) {
    console.error("API /cars/requests error:", err);
    throw err;
  }
}

/**
 * 3. Submit a Trade-in or Vehicle Swap
 * Endpoint: POST /cars/swaps
 */
export async function submitCarSwap(payload) {
  const cleanPayload = {
    targetCarId: payload.targetCarId || undefined,
    targetCar: payload.targetCar
      ? {
          id: String(payload.targetCar.id),
          name: payload.targetCar.name,
          price: Number(payload.targetCar.price),
          image: payload.targetCar.image || undefined,
          platform: payload.targetCar.platform || undefined,
        }
      : undefined,
    currentCar: {
      make: payload.currentCar?.make?.trim(),
      model: payload.currentCar?.model?.trim(),
      fuelType: payload.currentCar?.fuelType || "petrol",
      condition: payload.currentCar?.condition || "used",
      mileageKm:
        payload.currentCar?.mileageKm !== undefined && payload.currentCar?.mileageKm !== null
          ? Number(payload.currentCar.mileageKm)
          : undefined,
      issuesOrFaults: payload.currentCar?.issuesOrFaults || undefined,
    },
    contact: {
      name: payload.contact?.name?.trim(),
      email: payload.contact?.email?.trim(),
      phone: toInternationalFormat(payload.contact?.phone),
      whatsapp: toInternationalFormat(payload.contact?.whatsapp || payload.contact?.phone),
    },
  };

  try {
    const res = await apiRequest("cars/swaps", {
      method: "POST",
      body: JSON.stringify(cleanPayload),
    });
    return res;
  } catch (err) {
    console.error("API /cars/swaps error:", err);
    throw err;
  }
}

/**
 * Calculate Purchase & Installment Breakdown
 * Endpoint: POST /cars/purchases/calculate
 */
export async function calculatePurchaseQuote(payload) {
  try {
    const res = await apiRequest("cars/purchases/calculate", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res;
  } catch (err) {
    console.error("API /cars/purchases/calculate error:", err);
    throw err;
  }
}

/**
 * 2. Request a Purchase Quote
 * Endpoint: POST /cars/purchases (Alias: POST /cars/purchases/quote)
 */
export async function createCarPurchase(payload) {
  const phone = toInternationalFormat(payload.contact?.phone || payload.phone);
  const isSameAsPhone = Boolean(payload.contact?.isSameAsPhone);
  const whatsapp = isSameAsPhone
    ? phone
    : toInternationalFormat(payload.contact?.whatsapp || payload.whatsapp || phone);

  let firstName = payload.contact?.firstName || payload.firstName || "";
  let lastName = payload.contact?.lastName || payload.lastName || "";
  if (!firstName && payload.contact?.name) {
    const parts = payload.contact.name.trim().split(" ");
    firstName = parts[0] || "";
    lastName = parts.slice(1).join(" ") || parts[0] || "";
  }
  const fullName = payload.contact?.name || `${firstName} ${lastName}`.trim();

  const cleanPayload = {
    carId: String(payload.carId || payload.car?.id || payload.car?.productId),
    carName: payload.carName || payload.car?.name,
    carPrice: Number(payload.carPrice || payload.car?.price || 0),
    paymentMode: payload.paymentMode || "outright",
    installmentMonths:
      payload.paymentMode === "installment"
        ? Number(payload.installmentMonths || payload.months || 3)
        : undefined,
    deliveryMethod: payload.deliveryMethod || "pickup",
    deliveryAddress:
      payload.deliveryMethod === "delivery"
        ? typeof payload.deliveryAddress === "string"
          ? payload.deliveryAddress
          : typeof payload.deliveryAddress === "object" && payload.deliveryAddress
          ? [payload.deliveryAddress.line, payload.deliveryAddress.city, payload.deliveryAddress.state]
              .filter(Boolean)
              .join(", ")
          : undefined
        : undefined,
    paymentSource: "quote",
    contact: {
      firstName,
      lastName,
      name: fullName,
      email: payload.contact?.email || payload.email,
      phone,
      whatsapp,
      isSameAsPhone,
    },
    car: payload.car
      ? {
          id: String(payload.car.id || payload.car.productId || payload.carId),
          name: payload.car.name || payload.carName,
          make: payload.car.make || "",
          model: payload.car.model || "",
          year: Number(payload.car.year) || 2024,
          origin: payload.car.origin || "imported",
          platform: payload.car.platform || payload.platform || "yekauto",
        }
      : undefined,
  };

  try {
    const res = await apiRequest("cars/purchases", {
      method: "POST",
      body: JSON.stringify(cleanPayload),
    });
    return res;
  } catch (err) {
    console.error("API /cars/purchases error:", err);
    throw err;
  }
}
