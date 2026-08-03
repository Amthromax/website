/**
 * Security & Data Sanitization Utilities
 * Amthromax Enterprise Security Layer
 */

/**
 * Sanitizes user text input against XSS (Cross-Site Scripting) attacks.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Masks API key strings for safe UI rendering and log output.
 * Example: "amx_secret_key_9f823a71b2" -> "amx_secr••••••••71b2"
 */
export function maskApiKey(key: string): string {
  if (!key) return "";
  if (key.length <= 8) return "••••••••";
  const prefix = key.slice(0, 8);
  const suffix = key.slice(-4);
  return `${prefix}••••••••${suffix}`;
}

/**
 * Masks user email addresses for privacy preservation.
 * Example: "kishorekanth@gmail.com" -> "k••••h@gmail.com"
 */
export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return "••••@••••.com";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) {
    return `${localPart[0]}*@${domain}`;
  }
  const maskedLocal = `${localPart[0]}••••${localPart[localPart.length - 1]}`;
  return `${maskedLocal}@${domain}`;
}

/**
 * Validates email format strictly against standards.
 */
export function validateEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

/**
 * Checks for malicious patterns (SQL injection, XSS payloads, command injection).
 */
export function containsMaliciousPayload(input: string): boolean {
  if (!input) return false;
  const dangerousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    /javascript:/i,
    /onerror\s*=/i,
    /onload\s*=/i,
    /eval\s*\(/i,
    /SELECT\s+[\s\S]*?\s+FROM/i,
    /UNION\s+SELECT/i,
    /DROP\s+TABLE/i,
    /INSERT\s+INTO/i,
    /DELETE\s+FROM/i,
  ];

  return dangerousPatterns.some((pattern) => pattern.test(input));
}
