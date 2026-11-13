---
title: "CSSRotate: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrotate/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRotate: y property

The **`y`** property of the `CSSRotate` interface represents the y-coordinate of the vector denoting the axis of rotation.

## Value

A `CSSNumericValue`. If set to a number, this is wrapped in a `CSSUnitValue` of `unit: "number"`.

## Examples

### Reading and setting the rotation axis

```js
const rotate = new CSSRotate(1, 1, 0, CSS.deg(45));

console.log(rotate.y.value); // 1

rotate.y = 0;
console.log(rotate.y); // CSSUnitValue {value: 0, unit: "number"}
```

## See also

- `CSSRotate()`
- `CSSRotate.x`
- `CSSRotate.z`
- `CSSRotate.angle`
- Using the CSS Typed OM
- CSS Typed Object Model API
