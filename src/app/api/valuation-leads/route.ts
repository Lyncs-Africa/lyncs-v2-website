import {NextResponse} from 'next/server'
import {getPayload} from 'payload'
import config from '@payload-config'
import type {ValuationLead} from '@/payload-types'

type LeadData = Omit<ValuationLead, 'id' | 'reference' | 'createdAt' | 'updatedAt'>

// Accepts a multipart/form-data submission from the /swap valuation tool,
// validates it server-side, stores any uploaded fleet list in `media`, then
// creates a `valuation-leads` document. Runs on the Node runtime because it
// talks to Payload / Mongo.
export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CONDITIONS = ['Tokunbo', 'Needs work']
const FLEET_COUNTS = ['1–5', '6–20', '21–50', '50+']
const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_EXT = ['.xlsx', '.csv']

type Errors = Record<string, string>

function str(v: FormDataEntryValue | null): string {
    return typeof v === 'string' ? v.trim() : ''
}

export async function POST(req: Request) {
    let form: FormData
    try {
        form = await req.formData()
    } catch {
        return NextResponse.json({success: false, message: 'Expected a form submission.'}, {status: 400})
    }

    const type = str(form.get('type'))
    const errors: Errors = {}

    // Shared contact validation.
    const contactName = str(form.get('contactName'))
    const contactPhone = str(form.get('contactPhone'))
    const contactEmail = str(form.get('contactEmail'))
    if (!contactName) errors.contactName = 'Please enter your name.'
    if (!contactPhone) errors.contactPhone = 'Please add a phone number.'
    if (!contactEmail) errors.contactEmail = 'Please add an email.'
    else if (!EMAIL_RE.test(contactEmail)) errors.contactEmail = 'That email looks off.'

    if (type !== 'owner' && type !== 'fleet') {
        return NextResponse.json({success: false, message: 'Unknown submission type.'}, {status: 400})
    }

    // Build the document per type.
    const data: Record<string, unknown> = {
        type,
        contactName,
        contactCompany: str(form.get('contactCompany')),
        contactRole: str(form.get('contactRole')),
        contactPhone,
        contactEmail,
    }

    let fileUpload: {data: Buffer; mimetype: string; name: string; size: number} | null = null

    if (type === 'owner') {
        const make = str(form.get('make'))
        const model = str(form.get('model'))
        const year = Number(str(form.get('year')))
        const km = Number(str(form.get('mileageKm')) || '0')
        const condition = str(form.get('condition'))
        const min = Number(str(form.get('estimateMin')))
        const max = Number(str(form.get('estimateMax')))
        const targetEvName = str(form.get('targetEvName'))
        const targetEvPrice = Number(str(form.get('targetEvPrice')))

        if (!make) errors.make = 'Pick a make.'
        if (!model) errors.model = 'Pick a model.'
        if (!year || year < 1990 || year > new Date().getFullYear() + 1) errors.year = 'Pick a valid year.'
        if (condition && !CONDITIONS.includes(condition)) errors.condition = 'Unknown condition.'

        data.car = {make, model, year, mileageKm: Number.isFinite(km) ? km : undefined, condition}
        data.estimate = {
            min: Number.isFinite(min) ? min : undefined,
            max: Number.isFinite(max) ? max : undefined,
        }
        if (targetEvName) {
            data.targetEv = {
                name: targetEvName,
                price: Number.isFinite(targetEvPrice) ? targetEvPrice : undefined,
            }
        }
    } else {
        const count = str(form.get('count'))
        const rough = str(form.get('rough'))
        const company = str(form.get('contactCompany'))
        if (!company) errors.contactCompany = 'Please add your company name.'
        if (count && !FLEET_COUNTS.includes(count)) errors.count = 'Unknown fleet size.'

        const file = form.get('fleetList')
        if (file && file instanceof File && file.size > 0) {
            const lower = file.name.toLowerCase()
            if (!ALLOWED_FILE_EXT.some((ext) => lower.endsWith(ext))) {
                errors.fleetList = 'Upload an .xlsx or .csv file.'
            } else if (file.size > MAX_FILE_BYTES) {
                errors.fleetList = 'That file is larger than 10MB.'
            } else {
                fileUpload = {
                    data: Buffer.from(await file.arrayBuffer()),
                    mimetype: file.type || 'application/octet-stream',
                    name: file.name,
                    size: file.size,
                }
            }
        }

        data.fleet = {count, roughDescription: rough}
    }

    if (Object.keys(errors).length > 0) {
        return NextResponse.json({success: false, message: 'Please fix the highlighted fields.', errors}, {status: 400})
    }

    try {
        const payload = await getPayload({config})

        // Store the fleet list first, then reference it.
        if (fileUpload && data.fleet) {
            const media = await payload.create({
                collection: 'media',
                data: {alt: `Fleet list — ${contactName}`},
                file: fileUpload,
                overrideAccess: true,
            })
            ;(data.fleet as Record<string, unknown>).fleetList = media.id
        }

        const lead = await payload.create({
            collection: 'valuation-leads',
            data: data as LeadData,
            overrideAccess: true,
        })

        return NextResponse.json({success: true, id: lead.id})
    } catch (err) {
        console.error('[valuation-leads] create failed', err)
        return NextResponse.json(
            {success: false, message: 'Something went wrong. Try again, or message us on WhatsApp.'},
            {status: 500},
        )
    }
}
