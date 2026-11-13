---
title: "stroke"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/stroke/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# stroke

The **`stroke`** attribute is a presentation attribute defining the color (_or any SVG paint servers like gradients or patterns_) used to paint the outline of the shape.

> **Note:**
> As a presentation attribute, `stroke` also has a CSS property counterpart: `stroke`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<line>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`
- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Basic color and gradient stroke

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Basic color stroke -->
  <circle cx="5" cy="5" r="4" fill="none" stroke="green" />

  <!-- Stroke a circle with a gradient -->
  <defs>
    <linearGradient id="myGradient">
      <stop offset="0%" stop-color="green" />
      <stop offset="100%" stop-color="white" />
    </linearGradient>
  </defs>

  <circle cx="15" cy="5" r="4" fill="none" stroke="url(#myGradient)" />
</svg>
```

The output is as follows:

### `context-stroke` example

In this example, we define three shapes using `` elements, each with a different `stroke` and `fill` color set on them. We also define a `<circle>` element as a marker via the `<marker>` element. Each shape has the marker applied via the `marker` CSS property.

The `<circle>` has `stroke="context-stroke"` and `fill="context-fill"` set on it. Because it is being set as a marker in the context of the shapes, these attributes cause it to inherit the `fill` and `stroke` set on the `` element in each case.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 90">
  <style>
    path {
      stroke-width: 2px;
      marker: url("#circle");
    }
  </style>
  <path d="M 10 44.64 L 30 10 L 70 10 L 90 44.64 L 70 79.28 L 30 79.28 Z"
        stroke="red" fill="orange" />
  <path d="M 100 44.64 L 80 10 L 120 10 L 140 44.64 L 120 79.28 L 80 79.28 Z"
        stroke="green" fill="lightgreen" />
  <path d="M 150 44.64 L 130 10 L 170 10 L 190 44.64 L 170 79.28 L 130 79.28 Z"
        stroke="blue" fill="lightblue" />
  <marker id="circle" markerWidth="12" markerHeight="12"
          refX="6" refY="6" markerUnits="userSpaceOnUse">
    <circle cx="6" cy="6" r="3" stroke-width="2"
            stroke="context-stroke" fill="context-fill"  />
  </marker>
</svg>
```

The output is as follows:

> **Note:**
> Elements can also use `context-stroke` and `context-fill` to inherit `stroke` and `fill` values when they are referenced by `<use>` elements.

## Usage notes

       | Value
       |
        &#x3C;paint>

       | Default value
       | `none`

       | Animatable
       | Yes

## See also

- CSS `stroke` property
