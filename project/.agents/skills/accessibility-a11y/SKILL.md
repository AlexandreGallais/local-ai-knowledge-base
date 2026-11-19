---
name: accessibility-a11y
description: "Makes interfaces usable with a keyboard and a screen reader - semantic HTML, focus, contrast, ARIA only when needed - against WCAG 2.1 AA. Use when building or changing a UI component, a form, a dialog, a menu or a custom control, or when an accessibility audit or lint rule reports a problem."
metadata:
  id: FE-03
  stars: "3"
  nature: reference
  mode: A
  wave: V2
  load: auto
---

# Accessibility

**Core rule:** use the native HTML element first; every action works with the keyboard, has a visible focus and an accessible name.

## Procedure

1. Choose native elements: `button` for actions, `a` for navigation, `label` for inputs, `dialog`, `details`, lists and headings in order.
   - Check: no `div` or `span` with a click handler.
2. Give every control an accessible name: visible label, `aria-label` only when no visible text exists.
   - Check: an automated check (axe, lint rule) or the browser's accessibility tree shows a name.
3. Test the keyboard: Tab reaches every control in a logical order, Enter or Space activates, Escape closes overlays, focus returns to the trigger.
   - Check: the whole flow works without a mouse.
4. Check contrast: 4.5:1 for text, 3:1 for large text and UI parts.
   - Check: the colours used meet the ratios.
5. Use ARIA only for custom widgets, following the WAI-ARIA patterns (role, states, keyboard).
   - Check: the pattern's keyboard behaviour is implemented, not only the role.

## Checklist (WCAG 2.1 AA)

- [ ] Images have `alt` (empty for decoration).
- [ ] Forms: labels, errors announced and linked to the field.
- [ ] Focus visible; no keyboard trap.
- [ ] Information not given by colour alone.
- [ ] Headings and landmarks structure the page.
- [ ] Motion can be reduced (`prefers-reduced-motion`).

## Stop and ask the human if

- The design asks for something that breaks a rule (no visible focus, low contrast).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add `role=button` to the div." | Then you must add keyboard and focus too. Use a `button`. |
| "ARIA makes it accessible." | Wrong ARIA is worse than none. |

## Definition of done

- [ ] Keyboard flow tested; names, contrast and focus checked.
- [ ] Checklist ticked.
