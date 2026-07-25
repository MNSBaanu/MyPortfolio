## 2026-07-24 - Missing ARIA Labels on Icon-only Modals/Overlays
**Learning:** Found a recurring pattern in the app's components (`CVViewer` and `Projects`) where icon-only `X` (close) buttons in modals or overlays were missing accessible names. While visual users can identify an `X` icon as a close button, screen readers will not announce the button's purpose without an `aria-label`.
**Action:** Always ensure that icon-only interactive elements, especially those used for dismissing or closing overlays, include a descriptive `aria-label` attribute (e.g., `aria-label="Close project details"`).

## 2026-07-25 - Missing ARIA Labels on Form Inputs
**Learning:** Found that the inputs (`name`, `email`, `subject`) and the `textarea` (`message`) in the `ContactForm` component lack associated `<label>` elements or `aria-label` attributes. While placeholder text is present, screen readers may not reliably read it as a label.
**Action:** Always ensure that form fields have accessible names. If visible `<label>` elements are not used for design reasons, include a descriptive `aria-label` attribute (e.g., `aria-label="Email Address"`) on the `<input>` or `<textarea>` element to ensure proper accessibility.
