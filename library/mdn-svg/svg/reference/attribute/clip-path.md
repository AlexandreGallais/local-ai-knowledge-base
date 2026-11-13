---
title: "clip-path"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/clip-path/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# clip-path

The **`clip-path`** presentation attribute defines or associates a clipping path with the element it is related to.

> **Note:**
> As a presentation attribute, `clip-path` also has a CSS property counterpart: `clip-path`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- ``
- `<circle>`
- `<clipPath>`
- `<ellipse>`
- ``
- `<image>`
- `<line>`
- `<marker>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<rect>`
- ``
- `<symbol>`
- `<text>`
- `<use>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  <clipPath id="myClip" clipPathUnits="objectBoundingBox">
    <circle cx=".5" cy=".5" r=".5" />
  </clipPath>

  <!-- Top-left: Apply a custom defined clipping path -->
  <rect
    x="1"
    y="1"
    width="8"
    height="8"
    stroke="green"
    clip-path="url(#myClip)" />

  <!-- Top-right: Apply a CSS basic shape on a fill-box
       geometry. This is the same as having a custom clipping
       path with a clipPathUnits set to objectBoundingBox -->
  <rect
    x="11"
    y="1"
    width="8"
    height="8"
    stroke="green"
    clip-path="circle() fill-box" />

  <!-- Bottom-left -->
  <rect
    x="1"
    y="11"
    width="8"
    height="8"
    stroke="green"
    clip-path="circle() stroke-box" />

  <!-- Bottom-right: Apply a CSS basic shape on a view-box
       geometry. This is the same as having a custom clipping
       path with a clipPathUnits set to userSpaceOnUse -->
  <rect
    x="11"
    y="11"
    width="8"
    height="8"
    stroke="green"
    clip-path="circle() view-box" />
</svg>
```

## Usage notes

       | Value
       |
        `<url>` | [ `basic-shape` ||
        `&#x3C;geometry-box>` ] | `none`

       | Default value
       | `none`

       | Animatable
       | Yes

- \<geometry-box>
    An extra information to tell how a `basic-shape` is applied to an element: `fill-box` indicates to use the object bounding box; `stroke-box` indicates to use the object bounding box extended with the stroke; `view-box` indicates to use the nearest SVG viewport as the reference box.

> **Note:**
> For more details on the clip-path syntax, see the CSS property `clip-path` reference page.

## See also

- CSS `clip-path` property
- Introduction to CSS clipping
