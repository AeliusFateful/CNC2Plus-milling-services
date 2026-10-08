const NATIONAL_LENGTH = 10;

// Digits after the country code (+7). Handles "+7…", "8…" and "7…" pasted or autofilled.
function nationalDigits(value: string) {
  let digits = value.replace(/\D/g, "");
  if (value.trimStart().startsWith("+7")) {
    digits = digits.slice(1);
  } else if (digits.length > NATIONAL_LENGTH && /^[78]/.test(digits)) {
    digits = digits.slice(1);
  }
  return digits.slice(0, NATIONAL_LENGTH);
}

export function isPhoneComplete(value: string) {
  return nationalDigits(value).length === NATIONAL_LENGTH;
}

export function isPhoneEmpty(value: string) {
  return nationalDigits(value).length === 0;
}

// Formats to "+7 (747) 109-25-24" as the user types. When the user deletes
// only a mask character, the last digit is removed so backspace never gets stuck.
export function formatPhone(raw: string, previous: string, deleting: boolean) {
  let digits = nationalDigits(raw);
  if (deleting && digits === nationalDigits(previous)) {
    digits = digits.slice(0, -1);
  }

  let result = `+7 (${digits.slice(0, 3)}`;
  if (digits.length >= 3) result += ") ";
  if (digits.length > 3) result += digits.slice(3, 6);
  if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
  if (digits.length > 8) result += `-${digits.slice(8, 10)}`;
  return result;
}
