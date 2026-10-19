## 2024-05-19 - Prevent Global App Re-Renders
**Learning:** In a single-page portfolio App.tsx without routing, isolated UI state like `chatOpen` (toggling a side panel) or `techFilter` triggered full re-renders of heavy lists like Experience, Work, and Stack sections. This degrades time-to-interactive and UI smoothness.
**Action:** Extract below-the-fold content into a `useMemo` block (or isolate state) so that simple state toggles do not re-render the entire heavy component tree.
