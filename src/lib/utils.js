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

export function toInternationalFormat(phone) {
  if (!phone || typeof phone !== "string") return "";

  // 1. Remove all spaces, dashes, parens, etc. Keep digits and '+'
  let cleaned = phone.replace(/[^\d+]/g, "").trim();
  if (!cleaned) return "";

  // 2. Normalize leading + and country code
  if (!cleaned.startsWith("+")) {
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

