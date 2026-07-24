## 2025-07-24 - [Remove Hardcoded EmailJS Credentials]
**Vulnerability:** Hardcoded `serviceId`, `templateId`, and `publicKey` for EmailJS were found in `src/components/ContactForm.tsx`.
**Learning:** Hardcoding credentials in client-side code exposes them to anyone who inspects the source code or network requests, potentially leading to unauthorized usage or quota exhaustion of the email service.
**Prevention:** Always use environment variables (e.g., `import.meta.env` in Vite) to inject sensitive configuration at build time, and ensure these values are stored securely in a `.env` file that is not committed to version control.
