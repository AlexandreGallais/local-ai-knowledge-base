---
id: overlays
title: "Overlays and announcements without the CDK"
topic: components
summary: What the browser gives instead of the CDK - dialog and showModal, popover, inert, CSS anchoring, live regions, the two observers - and what is still to write.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6]
license: MIT, written for this base; facts summarized from MDN (CC BY-SA 2.5) and the ARIA Authoring Practices (W3C)
---

# Overlays and announcements without the CDK

Contents: 1. What replaces the CDK · 2. Modal or not · 3. Live regions · 4. Long lists · Sources

## 1. What replaces the CDK (browser features)

| Need | The browser gives | Limit |
| --- | --- | --- |
| Modal window, backdrop, focus trap | `<dialog>` and `showModal()`: rest of the page inert, top layer, `::backdrop`, Escape [S1] | Give it a name (`aria-labelledby`); never a `tabindex` on `<dialog>` |
| An inactive area | `inert`: no click, no focus, out of the accessibility tree [S2] | No visual sign by default |
| A non-modal floating layer | `popover` (`auto`, `manual`, `hint`), `popovertarget`; top layer [S3] | No role by default; the page is not inert |
| Place a layer by its trigger | CSS anchoring: `anchor-name`, `position-anchor`, `position-area`, `anchor-scope` [S4] | Baseline since January 2026: check the target browsers |
| The origin of the focus | `:focus-visible` | Contrast 3:1 |
| Watch the visible area, a size | `IntersectionObserver`, `ResizeObserver` | Never resize the observed element in its own callback |
| Arrow navigation in a group | Nothing native | Write it: roving tabindex or `aria-activedescendant` |
| A virtual list | Nothing native | Write it with the two observers |

- A layer inside the component, with `position: absolute`, is clipped by an ancestor in
  `overflow: hidden`; a `popover` in the top layer is not. Choose the popover when the component may sit
  in a scrolled panel.
- `showModal()` and `showPopover()` need a real browser: jsdom does not have them. Test such a component
  in browser mode (`ng test` with the `browsers` option) or with Playwright.

## 2. Modal or not (dialog, popover, tooltip)

- Blocks the page: `<dialog>` with `showModal()`. Focus enters at opening (first focusable element, or
  the title with `tabindex="-1"` for a long content); Escape closes; the focus goes back to the trigger.
  A visible close button is strongly advised. `aria-modal` only if the rest is really blocked. [S1] [S5]
- Does not block: `popover`. Put its content right after its trigger in the DOM: the browser fixes the
  tab order, not the accessibility tree. [S3]
- Tooltip: text only, linked by `aria-describedby`; shows on focus and hover; Escape hides it; never a
  link nor a button inside, never `title`. It must stay hoverable and persistent (WCAG 1.4.13). [S5]

## 3. Live regions (aria-live, status, alert)

- `aria-live="polite"` waits until the user is idle; `assertive` cuts in: urgent only. [S6]
- The region exists, empty, before the change: put it in the initial template. Created by script, it
  gets its content in a later task. [S6]
- `role="status"` or `role="log"`: add `aria-live="polite"`. `role="alert"`: no `aria-live` (read twice
  on some mobile screen readers). [S6]
- A notification never moves the focus. [S5]
- One announcer service per application, with two regions (polite and assertive) in the root
  template, replaces the CDK's `LiveAnnouncer`.

## 4. Long lists (virtual lists)

- When not all items are in the DOM: `aria-setsize` and `aria-posinset` on each option; a tree adds
  `aria-level`; a table gives `aria-rowcount` and `aria-rowindex`. [S5]
- Keep the DOM focus on the container with `aria-activedescendant`: a recycled node then loses no focus.
- Prefer paging or filtering to virtualizing when you can.

## Sources

- [S1] MDN contributors, 2026, "<dialog>: The Dialog element", MDN Web Docs. In the library: `library/mdn-html/`.
- [S2] MDN contributors, 2026, "HTMLElement: inert property", MDN Web Docs.
- [S3] MDN contributors, 2026, "Popover API", MDN Web Docs. In the library: `library/mdn-api/`.
- [S4] MDN contributors, 2026, "CSS anchor positioning", MDN Web Docs. In the library: `library/mdn-css/`.
- [S5] W3C WAI, 2026, "Dialog (Modal)", "Tooltip", "Alert" and "Grid and Table Properties" patterns, ARIA Authoring Practices Guide.
- [S6] MDN contributors, 2026, "ARIA live regions", MDN Web Docs. In the library: `library/mdn-accessibility/`.
