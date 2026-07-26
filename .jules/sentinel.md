## 2026-07-26 - Information Leakage and Improper XSS Sanitization
**Vulnerability:** The contact form caught and displayed raw error messages directly in the UI via toast notifications. The custom `sanitizeInput` function only encoded `<` and `>`, leaving other HTML entities (like `&`, `"`, `'`) vulnerable.
**Learning:** Even custom simple sanitization tools miss basic XSS vectors, and typical `catch (error)` blocks tend to accidentally leak internal error strings or traces directly to the user.
**Prevention:** Always encode all relevant HTML entities (`&`, `<`, `>`, `"`, `'`) when writing custom sanitization, and ensure error handlers log actual errors securely on the server/console while providing generic, safe error messages to the client UI.
