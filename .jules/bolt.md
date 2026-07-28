## 2025-07-24 - React excessive re-rendering and continuous polling
**Learning:** Found a component (`src/components/Projects.tsx`) tracking mouse coordinates via `useState` for a 3D hover effect, causing re-renders dozens of times a second. Also found an image slider using a continuous `requestAnimationFrame` loop just to check if 4 seconds had passed instead of using a simple timeout.
**Action:** Always prefer updating DOM nodes directly via refs for high-frequency events (like `mousemove` or `scroll`) rather than putting them in React state. Replace continuous polling loops with standard `setTimeout` when only waiting for a set duration.
## 2024-05-24 - Unnecessary Re-renders via High-Frequency Interval State
**Learning:** Placing a high-frequency state update (like `setInterval` rotating a panel index every 5s) in a parent component (e.g., `Projects.tsx`) triggers full re-renders of all child elements. In cases with many unmemoized elements (like rendering a list of 30+ projects in a mobile view), this creates a continuous CPU overhead and degrades scroll/interaction performance.
**Action:** Isolate high-frequency or auto-updating state (like timers or carousels) into leaf components, so only the specific elements that need to change are re-rendered, sparing the rest of the tree.
## 2026-07-26 - Multiple IntersectionObserver Instances
**Learning:** In `src/components/Header.tsx`, creating a separate `IntersectionObserver` instance for each section causes unnecessary memory overhead and increases browser-side intersection calculations.
**Action:** Always batch intersection observations into a single `IntersectionObserver` instance that tracks multiple elements, and loop through `entries` to determine which specific element intersected.
