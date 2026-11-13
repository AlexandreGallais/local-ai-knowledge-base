---
title: "`::selection` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_selection/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::selection` CSS pseudo-element

The **`::selection`** CSS pseudo-element applies styles to the part of a document that has been highlighted by the user (such as clicking and dragging the mouse across text).

The `::selection` pseudo-element follows a special inheritance model common to all highlight pseudo-elements. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

```css
p::selection {
  color: red;
  background-color: yellow;
}
```

```html
<p>
  Select a fragment of this paragraph, to see how its appearance is affected.
</p>
```

## Allowable properties

Only certain CSS properties can be used with `::selection`:

- `color`
- `background-color`
- `text-decoration` and its associated properties
- `text-shadow`
- `-webkit-text-stroke-color`, `-webkit-text-fill-color` and `-webkit-text-stroke-width`

In particular, `background-image` is ignored.

## Syntax

```css
::selection {
  /* ... */
}
```

## Accessibility

**Don't override selected text styles for purely aesthetic reasons** — users can customize them to suit their needs. For people experiencing cognitive concerns or who are less technologically literate, unexpected changes to selection styles may hurt their understanding of the functionality.

If overridden, it is important to ensure that the **contrast ratio** between the text and background colors of the selection is high enough that people experiencing low vision conditions can read it.

Color contrast ratio is found by comparing the luminosity of the selected text and the selected text background colors. To meet current Web Content Accessibility Guidelines (WCAG), text content must have a contrast ratio of **4.5:1**, or 3:1 for larger text such as headings. (WCAG defines large text as between `18.66px` and `24px` and bold, or `24px` or larger.)

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

## Examples

### HTML

```html
This text has special styles when you highlight it.
<p>Also try selecting text in this paragraph.</p>
```

### CSS

```css
::-moz-selection {
  color: gold;
  background-color: red;
}

p::-moz-selection {
  color: white;
  background-color: blue;
}
```

```css
/* Make selected text gold on a red background */
::selection {
  color: gold;
  background-color: red;
}

/* Make selected text in a paragraph white on a blue background */
p::selection {
  color: white;
  background-color: blue;
}
```

## See also

- `pointer-events` - control which events are active on the element
