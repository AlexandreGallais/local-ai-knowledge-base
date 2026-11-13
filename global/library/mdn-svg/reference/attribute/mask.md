---
title: "mask"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/mask/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# mask

The **`mask`** attribute is a presentation attribute mainly used to bind a given `<mask>` element with the element the attribute belongs to.

> **Note:**
> As a presentation attribute, `mask` also has a CSS property counterpart: `mask`. When both are specified, the CSS property takes priority.

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
<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
  <mask id="myMask" maskContentUnits="objectBoundingBox">
    <rect fill="white" x="0" y="0" width="100%" height="100%" />
    <polygon
      fill="black"
      points="0.5,0.2 0.68,0.74 0.21,0.41 0.79,0.41 0.32,0.74" />
  </mask>

  <!--
  Punch a hole in a shape of a star inside the red circle,
  revealing the yellow circle underneath
  -->
  <circle cx="50" cy="50" r="20" fill="yellow" />
  <circle cx="50" cy="50" r="45" fill="red" mask="url(#myMask)" />
</svg>
```

Since SVG2, the `mask` attribute is defined as a CSS property and is a shorthand for many other properties: `mask-image`, `mask-mode`, `mask-repeat`, `mask-position`, `mask-clip`, `mask-origin`, `mask-size`, and `mask-composite`.

## Usage notes

       | Value
       | See the CSS property `mask`

       | Default value
       | `none`

       | Animatable
       | Yes

## See also

- CSS `mask` property
