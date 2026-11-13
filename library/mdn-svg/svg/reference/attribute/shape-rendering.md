---
title: "shape-rendering"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/shape-rendering/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# shape-rendering

The **`shape-rendering`** attribute provides hints to the renderer about what tradeoffs to make when rendering shapes like paths, circles, or rectangles.

> **Note:**
> As a presentation attribute, `shape-rendering` also has a CSS property counterpart: `shape-rendering`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<line>`
- ``
- `<polygon>`
- `<polyline>`
- `<rect>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="100" shape-rendering="geometricPrecision" />
  <circle cx="320" cy="100" r="100" shape-rendering="crispEdges" />
</svg>
```

## Usage notes

       | Value
       |
        `auto` | `optimizeSpeed` |
        `crispEdges` | `geometricPrecision`

       | Default value
       | `auto`

       | Animatable
       | discrete

- `auto`
    This value indicates that the user agent shall make appropriate tradeoffs to balance speed, crisp edges and geometric precision, but with geometric precision given more importance than speed and crisp edges.
- `optimizeSpeed`
    This value indicates that the user agent shall emphasize rendering speed over geometric precision and crisp edges. This option will sometimes cause the user agent to turn off shape anti-aliasing.
- `crispEdges`
    This value indicates that the user agent shall attempt to emphasize the contrast between clean edges of artwork over rendering speed and geometric precision. To achieve crisp edges, the user agent might turn off anti-aliasing for all lines and curves or possibly just for straight lines which are close to vertical or horizontal. Also, the user agent might adjust line positions and line widths to align edges with device pixels.
- `geometricPrecision`
    Indicates that the user agent shall emphasize geometric precision over speed and crisp edges.

## See also

- CSS `shape-rendering` property
