export function numberWithCommas(number) {
  if (!number && number !== 0) return "0";
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function titleCase(str) {
  if (!str || typeof str !== "string") return str || "";
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizePhoneInput(val) {
  if (!val || typeof val !== "string") return val || "";
  let str = val.trim();
  // If browser autofill inserts leading 0 (e.g. 080... or +080...)
  if (str.startsWith("+0")) {
    return "+234" + str.slice(2);
  }
  if (str.startsWith("0")) {
    return "+234" + str.slice(1);
  }
  if (str.startsWith("+2340")) {
    return "+234" + str.slice(5);
  }
  if (str.startsWith("2340")) {
    return "+234" + str.slice(4);
  }
  if (/^[789]\d{9}$/.test(str)) {
    return "+234" + str;
  }
  return str;
}

export function toInternationalFormat(phone) {
  if (!phone || typeof phone !== "string") return "";

  // 1. Remove all spaces, dashes, parens, etc. Keep digits and '+'
  let cleaned = phone.replace(/[^\d+]/g, "").trim();
  if (!cleaned) return "";

  // 2. Handle autofilled numbers starting with +0 (e.g. +08012345678)
  if (cleaned.startsWith("+0")) {
    cleaned = "+234" + cleaned.slice(2);
  } else if (!cleaned.startsWith("+")) {
    if (cleaned.startsWith("0")) {
      cleaned = "+234" + cleaned.replace(/^0+/, "");
    } else if (cleaned.startsWith("234")) {
      cleaned = "+" + cleaned;
    } else {
      cleaned = "+234" + cleaned;
    }
  }

  // 3. Fix trunk zero following country codes (e.g. +234080... -> +23480...)
  if (cleaned.startsWith("+2340")) {
    cleaned = "+234" + cleaned.slice(5);
  } else if (cleaned.startsWith("+440")) {
    cleaned = "+44" + cleaned.slice(4);
  }

  // 4. Ensure total subscriber digits is between 8 and 15 (strict E.164 standard)
  const digits = cleaned.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    return "";
  }

  // 5. Must match strict E.164: + followed by 8-15 digits, starting with 1-9
  if (!/^\+[1-9]\d{7,14}$/.test(cleaned)) {
    return "";
  }

  return cleaned;
}

export function isValidE164(phone) {
  const formatted = toInternationalFormat(phone);
  return Boolean(formatted && /^\+[1-9]\d{7,14}$/.test(formatted));
}

/**
 * Returns a user-friendly phone validation message, or null when valid.
 * Distinguishes empty input, incomplete Nigerian numbers, and invalid country-code formats.
 */
export function getPhoneValidationError(phone, label = "phone number") {
  const digits = String(phone || "").replace(/\D/g, "");
  if (!digits || digits === "234") {
    return `Please enter your ${label} (e.g. 0801 234 5678 or +2348012345678).`;
  }

  const formatted = toInternationalFormat(phone);
  if (!formatted) {
    return `Please enter a valid ${label} with its country code (e.g. +2348012345678).`;
  }

  if (formatted.startsWith("+234") && formatted.length !== 14) {
    return `Nigerian ${label}s must have 10 digits after +234 (e.g. +2348012345678).`;
  }

  return null;
}

