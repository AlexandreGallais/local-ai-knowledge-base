---
title: "marker-start"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/marker-start/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# marker-start

The **`marker-start`** attribute defines the arrowhead or polymarker that will be drawn at the first vertex of the given shape.

For all shape elements, except `<polyline>` and ``, the last vertex is the same as the first vertex. In this case, if the value of `marker-start` and `marker-end` are both not `none`, then two markers will be rendered on that final vertex. For `` elements, for each closed subpath, the last vertex is the same as the first vertex. `marker-start` is only rendered on the first vertex of the path data.

> **Note:**
> As a presentation attribute, `marker-start` also has a CSS property counterpart: `marker-start`. When both are specified, the CSS property takes priority.

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
<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker
      id="triangle"
      viewBox="0 0 10 10"
      refX="1"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="10"
      markerHeight="10"
      orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
    </marker>
  </defs>
  <polyline
    fill="none"
    stroke="black"
    points="20,100 40,60 70,80 100,20"
    marker-start="url(#triangle)" />
</svg>
```

## Usage notes

       | Value
       | `none` | `&#x3C;marker-ref>`

       | Default value
       | `none`

       | Animatable
       | discrete

- `none`
    Indicates that no marker symbol shall be drawn at the first vertex.
- `<marker-ref>`
    This value is a reference to a `<marker>` element, which will be drawn at the first vertex. If the reference is not valid, then no marker will be drawn.

## See also

- `<marker>`
- `marker-end`
- `marker-mid`
- CSS `marker-start` property
