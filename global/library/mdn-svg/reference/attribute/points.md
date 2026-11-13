---
title: "points"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/points/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# points

The **`points`** attribute defines a list of points. Each point is defined by a pair of number representing a X and a Y coordinate in the user coordinate system. If the attribute contains an odd number of coordinates, the last one will be ignored.

You can use this attribute with the following SVG elements:

- `<polyline>`
- `<polygon>`

## polygon

For `<polygon>`, `points` defines a list of points, each representing a vertex of the shape to be drawn. Each point is define by a X and Y coordinate in the user coordinate system.

> **Note:**
> A polygon is a closed shape, meaning the last point is connected to the first point.

       | Value
       | [ `number`+ ]#

       | Default value
       | none

       | Animatable
       | Yes

## polyline

For `<polyline>`, `points` defines a list of points, each representing a vertex of the line to be drawn. Each point is define by a X and Y coordinate in the user coordinate system.

> **Note:**
> A polyline is an open shape, meaning the last point is not connected to the first point.

       | Value
       | [ `number`+ ]#

       | Default value
       | none

       | Animatable
       | Yes

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="-10 -10 120 120" xmlns="http://www.w3.org/2000/svg">
  <!-- polyline is an open shape -->
  <polyline stroke="black" fill="none" points="50,0 21,90 98,35 2,35 79,90" />
</svg>
```

## Examples

### Usage with polyline

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="-10 -10 220 120" xmlns="http://www.w3.org/2000/svg">
  <!-- polyline is an open shape -->
  <polyline stroke="black" fill="none" points="50,0 21,90 98,35 2,35 79,90" />

  <!-- polygon is a closed shape -->
  <polygon
    stroke="black"
    fill="none"
    transform="translate(100,0)"
    points="50,0 21,90 98,35 2,35 79,90" />

  <!--
  It is usually considered best practices to separate a X and Y
  coordinate with a comma and a group of coordinates by a space.
  It makes things more readable for human beings.
  -->
</svg>
```

### Usage with polygon

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="-10 -10 120 120" xmlns="http://www.w3.org/2000/svg">
  <!-- polygon is a closed shape -->
  <polygon stroke="black" fill="none" points="50,0 21,90 98,35 2,35 79,90" />
</svg>
```
