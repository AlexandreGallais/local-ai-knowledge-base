---
name: css-layout
description: "Builds and debugs CSS layouts - Flexbox, Grid, responsive rules, themes with CSS variables. Use when positioning elements, making a page responsive, fixing overflow, alignment or spacing problems, or adding theme colours."
metadata:
  id: FE-09
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# CSS layout

**Core rule:** choose Grid for two-dimensional layouts and Flexbox for one direction, use the project's variables for colours and spacing, and debug with the computed styles, not by adding rules.

## Procedure

1. Choose the layout model with the table.
   - Check: one model per container.
2. Use the project's design tokens or CSS variables (`var(--space-2)`), never new raw values where tokens exist.
   - Check: `grep` finds no new hard-coded colour.
3. Make it responsive with relative units and a few breakpoints (`min-width` media or container queries).
   - Check: the layout holds at narrow and wide widths (`ui-visual-qa` if present).
4. To debug, read the computed style of the element (browser tools or a Playwright `getComputedStyle` call) before changing CSS.
   - Check: you name the rule that causes the problem.

| Need | Model |
| --- | --- |
| Row or column of items, alignment, spacing | Flexbox (`display: flex; gap`) |
| Page or card grid with rows and columns | Grid (`display: grid; grid-template-columns`) |
| Overlay on top of content | `position: absolute` inside a `relative` parent |

## Stop and ask the human if

- The design cannot be met without breaking the design system.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Add `!important`." | It hides a specificity problem. Find the competing rule. |
| "Margins for spacing between items." | `gap` is simpler and does not collapse. |

## Definition of done

- [ ] Layout model fits; tokens used; responsive at two widths; cause found before changing CSS.
