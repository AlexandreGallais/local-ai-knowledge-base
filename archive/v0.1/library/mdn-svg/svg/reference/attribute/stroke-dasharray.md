---
title: "stroke-dasharray"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/stroke-dasharray/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# stroke-dasharray

The **`stroke-dasharray`** attribute is a presentation attribute defining the pattern of dashes and gaps used to paint the outline of the shape.

> **Note:**
> As a presentation attribute, `stroke-dasharray` also has a CSS property counterpart: `stroke-dasharray`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- ``
- `<line>`
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<text>`
- `<textPath>`
- `<tspan>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 30 12" xmlns="http://www.w3.org/2000/svg">
  <style>
    line {
      stroke: black;
    }
  </style>
  <!-- No dashes nor gaps -->
  <line x1="0" y1="1" x2="30" y2="1" />

  <!-- Dashes and gaps of the same size -->
  <line x1="0" y1="3" x2="30" y2="3" stroke-dasharray="4" />

  <!-- Dashes and gaps of different sizes -->
  <line x1="0" y1="5" x2="30" y2="5" stroke-dasharray="4 1" />

  <!-- Dashes and gaps of various sizes with an odd number of values -->
  <line x1="0" y1="7" x2="30" y2="7" stroke-dasharray="4 1 2" />

  <!-- Dashes and gaps of various sizes with an even number of values -->
  <line x1="0" y1="9" x2="30" y2="9" stroke-dasharray="4 1 2 3" />

  <!-- Dashes starting with a gap -->
  <line x1="0" y1="11" x2="30" y2="11" stroke-dasharray="0 4 0" />
</svg>
```

## Usage notes

       | Value
       | `none` | `&#x3C;dasharray>`

       | Default value
       | `none`

       | Animatable
       | Yes

- \<dasharray>
    A list of comma and/or white space separated `<length>`s and `<percentage>`s that specify the lengths of alternating dashes and gaps.

    If an odd number of values is provided, then the list of values is repeated to yield an even number of values. Thus, `5,3,2` is equivalent to `5,3,2,5,3,2`.

## See also

- CSS `stroke-dasharray` property
