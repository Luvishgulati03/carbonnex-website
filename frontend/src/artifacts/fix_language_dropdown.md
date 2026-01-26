Draft a plan to fix the language dropdown visibility issue.

## Problem
The user reports that the language dropdown is not visible. While the browser subagent successfully interacted with it via JavaScript, the user (and likely manual interaction) is facing issues. This suggests a potential UI/CSS issue such as:
1.  **Z-Index/Stacking Context**: The dropdown might be rendering behind other header elements or the main content.
2.  **Interaction Logic**: The `onMouseLeave` event might be triggering too aggressively, closing the dropdown before the user can interact with it.
3.  **Visual Contrast**: The dropdown might be transparent or blending into the background.

## Proposed Changes

### 1. CSS Adjustments (`Header.css`)
-   Increase `z-index` for the `.language-selector` and `.lang-dropdown` to ensure it sits on top of everything.
-   Ensure the dropdown background is solid and has sufficient contrast.
-   Add a small transparent pseudo-element bridge between the button and the dropdown to prevent `onMouseLeave` from firing when moving the mouse across the gap.
-   Check responsive styles to ensure it's not hidden on smaller screens (though the User seems to be on Desktop).

### 2. Component Logic (`Header.jsx`)
-   Review the `onMouseLeave` handler. It's safer to use `onClick` for toggling and perhaps remove `onMouseLeave` or add a slight delay to avoid accidental closing.
-   For this specific request, I will switch to a pure click-based toggle for better reliability, or ensure the hover area is continuous.


## Verification Plan
- [x] Apply changes.
- [x] Use the browser subagent to:
    -   [x] Open the site.
    -   [x] Click the language button.
    -   [x] Take a screenshot specifically of the *open* dropdown to confirm visibility.
    -   [x] Verify the dropdown persists without immediately closing.

**Status: COMPLETED**
