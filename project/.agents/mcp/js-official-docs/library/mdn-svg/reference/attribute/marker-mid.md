---
title: "marker-mid"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/marker-mid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# marker-mid

The **`marker-mid`** attribute defines the arrowhead or polymarker that will be drawn at all interior vertices of the given shape.

The marker is rendered on every vertex other than the first and last vertices of the path data.

> **Note:**
> As a presentation attribute, `marker-mid` also has a CSS property counterpart: `marker-mid`. When both are specified, the CSS property takes priority.

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
    <marker id="circle" markerWidth="8" markerHeight="8" refX="4" refY="4">
      <circle cx="4" cy="4" r="4" stroke="none" fill="red" />
    </marker>
  </defs>
  <polyline
    fill="none"
    stroke="black"
    points="20,100 40,60 70,80 100,20"
    marker-mid="url(#circle)" />
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
    Indicates that no marker symbol shall be drawn at the given vertices.
- `<marker-ref>`
    This value is a reference to a `<marker>` element, which will be drawn at the given vertices. If the reference is not valid, then no marker will be drawn.

## See also

- `<marker>`
- `marker-start`
- `marker-end`
- CSS `marker-mid` property
