---
title: "CSSRotate: z property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrotate/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRotate: z property

The **`z`** property of the `CSSRotate` interface represents the z-coordinate of the vector denoting the axis of rotation.

## Value

A `CSSNumericValue`. If set to a number, this is wrapped in a `CSSUnitValue` of `unit: "number"`.

## Examples

### Reading and setting the rotation axis

```js
const rotate = new CSSRotate(1, 1, 0, CSS.deg(45));

console.log(rotate.z.value); // 0

rotate.z = 1;
console.log(rotate.z); // CSSUnitValue {value: 1, unit: "number"}
```

## See also

- `CSSRotate()`
- `CSSRotate.x`
- `CSSRotate.y`
- `CSSRotate.angle`
- Using the CSS Typed OM
- CSS Typed Object Model API
