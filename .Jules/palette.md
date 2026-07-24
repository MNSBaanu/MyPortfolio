## 2026-07-24 - Missing ARIA Labels on Icon-only Modals/Overlays
**Learning:** Found a recurring pattern in the app's components (`CVViewer` and `Projects`) where icon-only `X` (close) buttons in modals or overlays were missing accessible names. While visual users can identify an `X` icon as a close button, screen readers will not announce the button's purpose without an `aria-label`.
**Action:** Always ensure that icon-only interactive elements, especially those used for dismissing or closing overlays, include a descriptive `aria-label` attribute (e.g., `aria-label="Close project details"`).
