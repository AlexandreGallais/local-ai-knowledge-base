---
title: "DOMQuad: fromQuad() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/domquad/fromquad_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DOMQuad: fromQuad() static method

The **`fromQuad()`** static method of the `DOMQuad` interface returns a new `DOMQuad` object based on the provided set of coordinates in the shape of another `DOMQuad` object.

## Syntax

```js
DOMQuad.fromQuad()
DOMQuad.fromQuad(quad)
```

### Parameters

- `quad` (optional)
    A `DOMQuad` or an object with the same properties. All properties default to `(0, 0, 0, 1)`. The properties are:
    - `p1` (optional), `p2` (optional), `p3` (optional), `p4` (optional)
        Each a `DOMPoint` or an object with the same properties representing one corner of the quad.

    This object should usually be another `DOMQuad` instance, or an existing object retrieved from some data storage. If you are creating this object from scratch, you should use the `DOMQuad()` constructor, which accepts the four points separately, avoiding creating the intermediate object.

### Return value

A `DOMQuad` object.

## Examples

### Creating a quad from an existing DOMQuad

This example shows how to create a new `DOMQuad` from an existing one.

```js
const originalQuad = new DOMQuad(
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 50 },
  { x: 0, y: 50 },
);

const newQuad = DOMQuad.fromQuad(originalQuad);

console.log(newQuad.p1.x, newQuad.p1.y); // 0 0
console.log(newQuad.p2.x, newQuad.p2.y); // 50 0
```

## See also

- `DOMQuad()` constructor
- `DOMPoint`
- `DOMRect`
