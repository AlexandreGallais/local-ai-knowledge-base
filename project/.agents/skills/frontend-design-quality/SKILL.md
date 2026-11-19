---
name: frontend-design-quality
description: "Improves the visual quality of an interface - hierarchy, typography, spacing, alignment, consistency - within the project's design system. Use when a screen looks cluttered, unbalanced or inconsistent, when asked to polish a UI, or before showing a new screen to users."
license: Apache-2.0
metadata:
  id: FE-11
  stars: "1"
  nature: reference
  mode: R
  wave: V4
  load: auto
---

# Front-end design quality

**Core rule:** fix hierarchy and spacing with the design system's scale before touching colours or adding decoration.

## Procedure

1. Take a screenshot of the screen (`ui-visual-qa` if present) and list problems with the checklist.
   - Check: each problem points to an element.
2. Fix hierarchy: one primary action, clear heading levels, important content first.
   - Check: the eye goes to the main action first on the screenshot.
3. Fix spacing and alignment with the design tokens' scale only.
   - Check: no new arbitrary pixel value.
4. Check consistency with other screens (same components for the same jobs).
   - Check: no new variant of an existing component.

## Checklist

- [ ] One primary action per view.
- [ ] Text sizes from the type scale; at most three sizes on a screen.
- [ ] Spacing from the token scale; related items closer than unrelated ones.
- [ ] Elements aligned on a grid.
- [ ] Colour used for meaning (status, emphasis), not decoration.
- [ ] Empty, loading and error states designed.

## Stop and ask the human if

- The fix needs a design system change or a new component.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add colour to make it pop." | Hierarchy and spacing fix most clutter. |
| "Each screen can have its own style." | Consistency is part of quality. |

## Definition of done

- [ ] Checklist ticked on a fresh screenshot; tokens and components only.

## References

- `references/SOURCE.md`: upstream and licence of this skill.
