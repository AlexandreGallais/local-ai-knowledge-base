---
title: "DOMQuad: getBounds() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/getbounds/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad: getBounds() method

The `DOMQuad` method
`getBounds()` returns a `DOMRect` object representing the smallest rectangle that fully contains the `DOMQuad` object.

## Syntax

```js
getBounds()
```

### Parameters

None.

### Return value

A `DOMRect` with the x, y, width, and height properties, defining the bounding box for the `DOMQuad` based on its corner coordinates.

## Examples

This example creates a `DOMQuad` with four points, then retrieves its bounding rectangle.

```js
const quad = new DOMQuad(
  { x: 40, y: 25 },
  { x: 180, y: 8 },
  { x: 210, y: 150 },
  { x: 10, y: 180 },
);

const quadBounds = quad.getBounds();
```

The figure shows an irregular quadrilateral represented by a `DOMQuad`. The four red colored circles represent the `DOMPoint` attributes `p1` to `p4`. The dashed rectangle represents the bounding rectangle returned by the `getBounds()` method of the `DOMQuad`.
