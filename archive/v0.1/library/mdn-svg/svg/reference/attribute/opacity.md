---
title: "opacity"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/opacity/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# opacity

The **`opacity`** attribute specifies the transparency of an object or of a group of objects, that is, the degree to which the background behind the element is overlaid.

> **Note:**
> As a presentation attribute, `opacity` also has a CSS property counterpart: `opacity`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- ``
- `<circle>`
- `<ellipse>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<marker>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`
- ``
- `<switch>`
- `<symbol>`
- `<text>`
- `<textPath>`
- `<tspan>`
- `<use>`

Unlike `fill-opacity`, `stroke-opacity`, and `stop-opacity`, which are applied to individual operations and are rendered _when_ the element is rendered, `opacity` is applied to whole objects or groups, and is more like a post-processing operation on the rendered image of the object or group. Therefore, when you have both `opacity` and the other opacity attributes in the same area, they will be overlaid on top of each other and cause the opacity to be multiplied.

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
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0" y2="100%">
      <stop offset="0%" stop-color="skyblue" />
      <stop offset="100%" stop-color="seagreen" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
  <circle cx="50" cy="50" r="40" fill="black" />
  <circle cx="150" cy="50" r="40" fill="black" opacity="0.3" />
</svg>
```

## Usage notes

       | Default value
       | `1`

       | Value
       | `&#x3C;alpha-value>`

       | Animatable
       | Yes

- `<alpha-value>`
    The uniform opacity setting to be applied across an entire object, as a `number`. Any values outside the range 0.0 (fully transparent) to 1.0 (fully opaque) will be clamped to this range.

## See also

- CSS `opacity` property
- `fill-opacity`
- `stop-opacity`
- `stroke-opacity`
