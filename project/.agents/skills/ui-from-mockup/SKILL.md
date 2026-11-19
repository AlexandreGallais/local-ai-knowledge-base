---
name: ui-from-mockup
description: "Implements a screen from a mockup or a screenshot - structure, spacing, states - and lists every difference left. Use when given an image, a design export or a screenshot of a screen to build, when asked to match a design, or when a page must look like a reference picture."
metadata:
  id: FE-02
  stars: "3"
  nature: process
  mode: A
  wave: V2
  load: auto
---

# UI from mockup

**Core rule:** describe the mockup in a written structure first, build it with the project's existing components, and report every difference you could not close.

## Procedure

1. Describe the mockup in text: regions, components, texts, states visible (empty, loading, error, disabled).
   - Check: each element of the image appears in the description.
2. Map each element to an existing component of the project (`grep` the component folder) or to a new one.
   - Check: no new component where an existing one fits.
3. Build the structure (layout and components) before the styling.
   - Check: the page renders without errors in the console.
4. Apply spacing, sizes and colours from the project's tokens or variables, not hard-coded values.
   - Check: `grep` finds no new raw colour or pixel value where tokens exist.
5. Compare with the mockup side by side (a screenshot of the result if possible, `ui-visual-qa` if present).
   - Check: the difference list is written.
6. Add the states not shown in the mockup but needed: loading, empty, error, keyboard focus.
   - Check: each state can be reached in a test or a story.

## Stop and ask the human if

- The mockup contradicts the design system or leaves a behaviour unspecified (what a button does, what happens on error).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Pixel values from the picture." | Use the tokens; pictures are scaled. |
| "Only the drawn state matters." | Real screens have loading, empty and error states. |

## Definition of done

- [ ] Screen built from existing components and tokens.
- [ ] States added; difference list reported.
