---
title: "XRRay: direction property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrray/direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRay: direction property

The _read-only_ **`direction`** property of the `XRRay` interface is a `DOMPointReadOnly` representing the ray's 3-dimensional directional vector, normalized to a unit vector with a length of 1.0.

## Value

A `DOMPointReadOnly` object.

## Examples

### Using the `direction` property

The `direction` property contains the normalized ray's 3-dimensional directional vector.

```js
let origin = { x: 10.0, y: 10.0, z: 10.0, w: 1.0 };
let direction = { x: 10.0, y: 0.0, z: 0.0, w: 0.0 };
let ray = new XRRay(origin, direction);

ray.direction;
// returns DOMPointReadOnly {x : 1.0, y : 0.0, z : 0.0, w : 0.0}
```

## See also

- `DOMPointReadOnly`
