## 2025-07-24 - [Remove Hardcoded EmailJS Credentials]
**Vulnerability:** Hardcoded `serviceId`, `templateId`, and `publicKey` for EmailJS were found in `src/components/ContactForm.tsx`.
**Learning:** Hardcoding credentials in client-side code exposes them to anyone who inspects the source code or network requests, potentially leading to unauthorized usage or quota exhaustion of the email service.
**Prevention:** Always use environment variables (e.g., `import.meta.env` in Vite) to inject sensitive configuration at build time, and ensure these values are stored securely in a `.env` file that is not committed to version control.
## 2025-02-27 - Input Validation Enhancement
**Vulnerability:** Lack of constraints on contact form inputs could allow oversized payloads (DoS risk) and unchecked characters.
**Learning:** Adding `maxLength` limits directly in the UI constrains payload sizes, and implementing basic sanitization adds a defensive layer, even though backend validation is still paramount.
**Prevention:** Always implement defense-in-depth by adding max lengths and basic sanitization to user-facing forms before transmission.
## 2026-07-27 - [Secure Error Handling & Script Fix]
**Vulnerability:** Leaking internal error details (`error.text` or `error.message`) to users via toasts on `src/components/ContactForm.tsx`.
**Learning:** Directly rendering raw error properties to users violates the "fail securely" principle and exposes backend configurations or API issues. In addition, the security check script `scripts/security-check.js` incorrectly searched only the first route object in `vercel.json` for security headers like HSTS and CSP, missing configurations across multiple route/header blocks.
**Prevention:** Always log full error details securely to the console (`console.error`) and present generic fallback messages to end users. Ensure auditing scripts deeply inspect configurations (e.g. using `flatMap` on arrays of objects) to prevent false negatives.
