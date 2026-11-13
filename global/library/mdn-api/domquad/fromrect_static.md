---
title: "DOMQuad: fromRect() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/fromrect_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad: fromRect() static method

The **`fromRect()`** static method of the `DOMQuad` interface returns a new `DOMQuad` object based on the provided set of coordinates in the shape of a `DOMRect` object.

## Syntax

```js
DOMQuad.fromRect()
DOMQuad.fromRect(rect)
```

### Parameters

- `rect` (optional)
    A `DOMRect`, `DOMRectReadOnly`, or an object with the same properties. All properties default to `0`. The properties are:
    - `x` (optional)
        The x coordinate of the rectangle's origin (top-left corner).
    - `y` (optional)
        The y coordinate of the rectangle's origin (top-left corner).
    - `width` (optional)
        The width of the rectangle.
    - `height` (optional)
        The height of the rectangle.

### Return value

A `DOMQuad` object.

## Examples

### Creating a rectangular quad

This example creates a `DOMQuad` from scratch that happens to be rectangular. Using `fromRect()` is more convenient than using the `DOMQuad()` constructor.

```js
const quad = DOMQuad.fromRect({ x: 10, y: 20, width: 100, height: 50 });

console.log(quad.p1); // DOMPoint {x: 10, y: 20, z: 0, w: 1}
console.log(quad.p2); // DOMPoint {x: 110, y: 20, z: 0, w: 1}
console.log(quad.p3); // DOMPoint {x: 110, y: 70, z: 0, w: 1}
console.log(quad.p4); // DOMPoint {x: 10, y: 70, z: 0, w: 1}
```

### Creating a quad from DOMRect

This example shows how to create a `DOMQuad` from a `DOMRect` object.

```js
const domRect = new DOMRect(50, 60, 200, 100);
const quad = DOMQuad.fromRect(domRect);

console.log(quad.p1); // DOMPoint {x: 50, y: 60, z: 0, w: 1}
console.log(quad.p2); // DOMPoint {x: 250, y: 60, z: 0, w: 1}
console.log(quad.p3); // DOMPoint {x: 250, y: 160, z: 0, w: 1}
console.log(quad.p4); // DOMPoint {x: 50, y: 160, z: 0, w: 1}
```

## See also

- `DOMQuad()` constructor
- `DOMRect`
- `DOMPoint`
