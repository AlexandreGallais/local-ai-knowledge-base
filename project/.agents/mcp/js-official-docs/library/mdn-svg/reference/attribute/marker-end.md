---
title: "marker-end"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/marker-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# marker-end

The **`marker-end`** attribute defines the arrowhead or polymarker that will be drawn at the final vertex of the given shape.

For all shape elements, except `<polyline>` and ``, the last vertex is the same as the first vertex. In this case, if the value of `marker-start` and `marker-end` are both not `none`, then two markers will be rendered on that final vertex. For `` elements, for each closed subpath, the last vertex is the same as the first vertex. `marker-end` is only rendered on the final vertex of the path data.

> **Note:**
> As a presentation attribute, `marker-end` also has a CSS property counterpart: `marker-end`. When both are specified, the CSS property takes priority.

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
    marker-end="url(#triangle)" />
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
    Indicates that no marker symbol shall be drawn at the final vertex.
- `<marker-ref>`
    This value is a reference to a `<marker>` element, which will be drawn at the final vertex. If the reference is not valid, then no marker will be drawn.

## See also

- `<marker>`
- `marker-start`
- `marker-mid`
- CSS `marker-end` property
