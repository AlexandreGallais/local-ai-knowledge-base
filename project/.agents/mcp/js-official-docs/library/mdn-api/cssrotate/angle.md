---
title: "CSSRotate: angle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrotate/angle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRotate: angle property

The **`angle`** property of the `CSSRotate` interface represents the angle of rotation.
A positive angle denotes a clockwise rotation, a negative angle a counter-clockwise one.

## Value

A `CSSNumericValue`

## Examples

### Reading and setting the angle

```js
const rotate = new CSSRotate(CSS.deg(45));

console.log(rotate.angle.value); // 45
console.log(rotate.angle.unit); // "deg"

rotate.angle = CSS.deg(90);
console.log(rotate.toString()); // "rotate(90deg)"
```

## See also

- `CSSRotate()`
- `CSSRotate.x`
- `CSSRotate.y`
- `CSSRotate.z`
- Using the CSS Typed OM
- CSS Typed Object Model API
