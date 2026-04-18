// HTML-escape and length-limit untrusted text before storing/displaying.
// Use for any user-submitted free-text field (name, phone, message, etc.)
// before inserting into Supabase. Output is safe for HTML contexts and
// for inclusion in plain-text emails.
export function sanitizeText(input: string | null | undefined, maxLength = 2000): string {
  if (input == null) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim()
    .slice(0, maxLength);
}
