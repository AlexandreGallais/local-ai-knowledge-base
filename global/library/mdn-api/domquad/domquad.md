---
title: "DOMQuad: DOMQuad() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/domquad/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad: DOMQuad() constructor

The **`DOMQuad()`** constructor creates and returns a new `DOMQuad` object, given the values for some or all of its properties.

You can also create a `DOMQuad` by calling the `DOMQuad.fromRect()` or `DOMQuad.fromQuad()` static function. These functions accept any object with the required parameters, including a `DOMRect`, `DOMRectReadOnly`, or another `DOMQuad`.

## Syntax

```js
new DOMQuad()
new DOMQuad(p1)
new DOMQuad(p1, p2)
new DOMQuad(p1, p2, p3)
new DOMQuad(p1, p2, p3, p4)
```

### Parameters

- `p1` (optional), `p2` (optional), `p3` (optional), `p4` (optional)
    Each a `DOMPoint` or an object with the same properties representing one corner of the quad.

## Examples

This example creates a `DOMQuad` using a `DOMPoint` and three additional points defined as objects.

```js
const point = new DOMPoint(2, 0);
const quad = new DOMQuad(
  point,
  { x: 12, y: 0 },
  { x: 12, y: 10 },
  { x: 2, y: 10 },
);
```

## See also

- `DOMPoint`
- `DOMRect`
- `DOMMatrix`
