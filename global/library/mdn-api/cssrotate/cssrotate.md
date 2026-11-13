---
title: "CSSRotate: CSSRotate() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssrotate/cssrotate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSRotate: CSSRotate() constructor

The **`CSSRotate()`** constructor creates a new `CSSRotate` object representing the `rotate()` value of the individual `transform` property in CSS.

This can be specified as either a 2D rotation by a particular angle, or as a 3D rotation by an angle around a particular axis.

## Syntax

```js
new CSSRotate(angle)
new CSSRotate(x, y, z, angle)
```

### Parameters

- `angle`
    A value for the angle of rotation of the `CSSRotate` object to be constructed.
    This must be a `CSSNumericValue`.
- `x` (optional)
    A number or `CSSNumericValue` value indicating the x-coordinate of the rotation axis vector of the `CSSRotate` object to be constructed.
    Only used, and required, when constructing a 3D rotation; the 2-argument form implies a rotation axis of `(0, 0, 1)` (the z-axis).
- `y` (optional)
    A number or `CSSNumericValue` value indicating the y-coordinate of the rotation axis vector of the `CSSRotate` object to be constructed.
    Only used, and required, when constructing a 3D rotation.
- `z` (optional)
    A number or `CSSNumericValue` value indicating the z-coordinate of the rotation axis vector of the `CSSRotate` object to be constructed.
    Only used, and required, when constructing a 3D rotation.

### Exceptions

- `TypeError`
    Raised if the value of the `angle` property is not an `<angle>` value or `CSSRotate.x`, `CSSRotate.y`, `CSSRotate.z` are not `<number>` values.

## Examples

### Constructing a 2D rotation

The 2-argument form takes only an angle, and implies a rotation around the z-axis (equivalent to `rotate3d(0, 0, 1, angle)`):

```js
const rotate2D = new CSSRotate(CSS.deg(45));

console.log(rotate2D.is2D); // true
console.log(rotate2D.toString()); // "rotate(45deg)"
```

### Constructing a 3D rotation

The 4-argument form takes the rotation axis coordinates followed by the angle:

```js
const rotate3D = new CSSRotate(1, 1, 0, CSS.deg(45));

console.log(rotate3D.is2D); // false
console.log(rotate3D.toString()); // "rotate3d(1, 1, 0,45deg)"
```

### Handling an invalid angle

```js
try {
  const rotate = new CSSRotate(CSS.px(45));
} catch (e) {
  console.log(e); // TypeError: px is not an angle
}
```

## See also

- `CSSRotate.angle`
- `CSSRotate.x`
- `CSSRotate.y`
- `CSSRotate.z`
- `CSSTransformComponent`
- Using the CSS Typed OM
- CSS Typed Object Model API
