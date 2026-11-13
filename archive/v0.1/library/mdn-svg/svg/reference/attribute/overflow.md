---
title: "overflow"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/overflow/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# overflow

The **`overflow`** attribute sets what to do when an element's content is too big to fit in its block formatting context.

This attribute has the same parameter values and meaning as the CSS `overflow` property, however, the following additional points apply:

- If it has a value of `visible`, the attribute has no effect (i.e., a clipping rectangle is not created).
- If the `overflow` property has the value `hidden` or `scroll`, a clip of the exact size of the SVG viewport is applied.
- When `scroll` is specified on an `` element, a scrollbar or panner is normally shown for the SVG viewport whether or not any of its content is clipped.
- Within SVG content, the value `auto` implies that all rendered content for child elements must be visible, either through a scrolling mechanism, or by rendering with no clip.

> **Note:**
> Although the initial value for overflow is `auto`, it is overwritten in the User Agent style sheet for the `` element when it is not the root element of a stand-alone document, the `<pattern>` element, and the `<marker>` element to be hidden by default.

> **Note:**
> As a presentation attribute, `overflow` also has a CSS property counterpart: `overflow`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<foreignObject>`
- `<image>`
- `<marker>`
- `<pattern>`
- `<symbol>`
- ``
- `<text>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg" overflow="auto">
  <text y="20">
    This text is wider than the SVG, so there should be a scrollbar shown.
  </text>
</svg>
```

## Usage notes

       | Value
       |
        `visible` | `hidden` | `scroll` |
        `auto`

       | Default value
       | `visible`

       | Animatable
       | Yes

For a description of the values, please see the CSS `overflow` property.

## See also

- CSS `overflow` property
