---
id: keyboard-focus
title: "Keyboard and focus"
topic: components
summary: One tab stop per component, roving tabindex or aria-activedescendant, disabled items, a visible focus, the focus back to the trigger, no focus trap except a modal.
tool: angular
version: "22"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base; facts summarized from the ARIA Authoring Practices (W3C) and MDN (CC BY-SA 2.5)
---

# Keyboard and focus

Contents: 1. One stop per component · 2. Moving inside · 3. Disabled items · 4. Visible focus · 5. Focus back · Sources

## 1. One stop per component (Tab and arrows)

- Tab goes from one component to the next; the arrows move inside a component. A composite (list,
  tabs, tree, menu, radio group) has one element in the tab sequence. [S1]
- Entering a composite: the chosen element or the first (radio, tabs, list, tree), the first (menu bar,
  toolbar). [S1]
- Never a positive `tabindex`: only `0` (in the sequence) or `-1` (focusable by script). [S1]

## 2. Moving inside (roving tabindex or aria-activedescendant)

| Way | How | When |
| --- | --- | --- |
| Roving tabindex | `tabindex="0"` on the active item, `-1` on the others; at each arrow, swap and call `focus()` | Tabs, radio group, toolbar, tree; the browser scrolls the item into view [S1] |
| `aria-activedescendant` | The container keeps the DOM focus and names the active item by its `id` | A combobox, a long or virtual list; draw the active item and scroll it yourself [S1] |

- The item named by `aria-activedescendant` is a descendant, or belongs to the element named by the
  `aria-controls` of a combobox. [S1]
- A click updates the active item as the keyboard does. [S1]
- A click on an option of a combobox list: `(mousedown)="$event.preventDefault()"` on the list,
  otherwise the click takes the focus away and the list closes first.

## 3. Disabled items (disabled or aria-disabled)

- The native `disabled` attribute removes the element from the tab sequence; `aria-disabled="true"`
  keeps it focusable. [S1]
- Disabled options, menu items, tabs and tree nodes stay focusable; they cannot be chosen. [S1]

## 4. Visible focus (:focus-visible)

- A focus indicator always visible (WCAG 2.4.7), never hidden by the author's content (WCAG 2.4.11). [S2]
- Style it with `:focus-visible`, contrast at least 3:1; the browser decides when to show it. [S3]
- The selection looks different from the focus. [S1]

## 5. Focus back (never on body)

- After closing an overlay, the focus goes back to its trigger; after a deletion, to the next logical
  element. Never leave it on `body`. [S1]
- No focus at page load, except a page with one single function. [S1]
- A focus trap only in a modal: `showModal()` gives it. Never block the way out by keyboard
  (WCAG 2.1.2). [S2]

## Sources

- [S1] W3C WAI, 2026, "Developing a Keyboard Interface", ARIA Authoring Practices Guide.
- [S2] W3C, 2023, WCAG 2.2, success criteria 2.1.2, 2.4.7, 2.4.11.
- [S3] MDN contributors, 2026, ":focus-visible", MDN Web Docs. In the library: `library/mdn-css/`.
