---
title: "XRRay: origin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrray/origin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRay: origin property

The _read-only_ **`origin`** property of the `XRRay` interface is a `DOMPointReadOnly` representing the 3-dimensional point in space that the ray originates from, in meters.

## Value

A `DOMPointReadOnly` object.

## Examples

### Using the `origin` property

The `origin` property contains the 3-dimensional point in space that the ray originates from, in meters.

```js
let origin = { x: 10.0, y: 10.0, z: 10.0, w: 1.0 };
let direction = { x: 10.0, y: 0.0, z: 0.0, w: 0.0 };
let ray = new XRRay(origin, direction);

ray.origin;
// returns DOMPointReadOnly {x : 10.0, y : 10.0, z : 10.0, w : 1.0}
```

## See also

- `DOMPointReadOnly`
