---
title: "`marker-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/marker-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `marker-end` CSS property

The **`marker-end`** CSS property points to a marker that will be drawn on the last vertex of the element's path; that is, at its ending vertex. The marker must have been defined using an SVG `<marker>` element, and can only be referenced with a `<url>` value. The value of the CSS property overrides any values of the `marker-end` attribute in the SVG.

For many marker-supporting shapes, the first and last vertices are the same point: for example, the top left corner of a `<rect>`. In such shapes, if both the first and last markers are defined, two markers will be drawn at that point, though they may not face the same direction.

> **Note:**
> The `marker-end` property will only have an effect for elements that can use SVG markers. See `marker-end` for a list.

## Syntax

```css
marker-end: none;
marker-end: url("markers.svg#arrow");

/* Global values */
marker-end: inherit;
marker-end: initial;
marker-end: revert;
marker-end: revert-layer;
marker-end: unset;
```

### Values

- `none`
    This means no marker will be drawn at the last vertex of the element's path.

- `<marker-ref>`
    A `<url>` that refers to a marker defined by an SVG `<marker>` element, to be drawn at the last vertex of the element's path. If the URL reference is invalid, no marker will be drawn at the path's last vertex.

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
      markerWidth="10"
      markerHeight="10"
      refX="1"
      refY="5"
      markerUnits="strokeWidth"
      orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
    </marker>
  </defs>
  <polyline
    id="test"
    fill="none"
    stroke="black"
    points="20,100 40,60 70,80 100,20" />
</svg>
```

```css
polyline#test {
  marker-end: url("#triangle");
}
```

## See also

- `marker-start`
- `marker-mid`
- `marker`
- SVG `marker-end` attribute
