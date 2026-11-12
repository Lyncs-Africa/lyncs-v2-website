/**
 * Contact Leads API Client
 * Public endpoint: POST /contact-leads
 */

// Deployment base URL (without trailing slash or /api)
const RAW_ORIGIN =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_ORIGIN ||
  'https://staging.lyncs.africa';

export const API_ORIGIN = RAW_ORIGIN.replace(/\/+$/, '').replace(/\/api$/, '');

/**
 * Normalizes phone numbers to Nigerian E.164 format (+234...).
 * - valid: +2348012345678
 * - accepted & normalized: 0814 944 5103 -> +2348149445103
 * - compacts spaces, parentheses, dots, and hyphens.
 */
export function toNigerianE164(input: string): string {
  if (!input) return '';
  const compact = String(input).trim().replace(/[\s().-]/g, '');
  if (/^0\d{10}$/.test(compact)) return `+234${compact.slice(1)}`;
  if (/^234\d{10}$/.test(compact)) return `+${compact}`;
  if (/^\+234\d{10}$/.test(compact)) return compact;
  if (/^\+[1-9]\d{7,14}$/.test(compact)) return compact;
  return compact.startsWith('+') ? compact : `+${compact}`;
}

export interface CreateContactLeadRequest {
  name: string; // trimmed, 2–120 characters
  email: string; // valid email, max 191
  phone: string; // E.164, e.g. +2348012345678
  isWhatsApp: boolean; // strict JSON boolean, not "true" or "yes"
  message: string; // trimmed, 5–5000 characters
}

export interface CreateContactLeadSuccess {
  success: true;
  message: string;
  data: {
    reference: string; // CL-YYYYMMDD-XXXXXXXX
    status: 'new';
    createdAt: string; // ISO date-time
  };
}

/**
 * 3. Public Get-a-Solution contact form
 * Endpoint: POST /contact-leads
 * Content-Type: application/json
 */
export async function submitContactLead(
  payload: CreateContactLeadRequest
): Promise<CreateContactLeadSuccess> {
  const cleanPayload: CreateContactLeadRequest = {
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    phone: toNigerianE164(payload.phone),
    isWhatsApp: Boolean(payload.isWhatsApp),
    message: payload.message.trim(),
  };

  const response = await fetch(`${API_ORIGIN}/contact-leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(cleanPayload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 400 || response.status === 429) {
      throw new Error(data?.message || 'Validation failed');
    }
    throw new Error(data?.message || `Unable to submit your message (HTTP ${response.status})`);
  }

  return data as CreateContactLeadSuccess;
}

