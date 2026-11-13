---
title: "Math.tan()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/tan/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.tan()

The **`Math.tan()`** static method returns the tangent of a number in radians.

```js
function getTanFromDegrees(degrees) {
  return Math.tan((degrees * Math.PI) / 180);
}

console.log(getTanFromDegrees(0));
// Expected output: 0

console.log(getTanFromDegrees(45));
// Expected output: 0.9999999999999999

console.log(getTanFromDegrees(90));
// Expected output: 16331239353195370
```

## Syntax

```js
Math.tan(x)
```

### Parameters

- `x`
    A number representing an angle in radians.

### Return value

The tangent of `x`. If `x` is `Infinity`, `-Infinity`, or `NaN`, returns `NaN`.

> **Note:**
> Due to floating point precision, it's not possible to obtain the exact value π/2, so the result is always finite if not `NaN`.

## Description

Because `tan()` is a static method of `Math`, you always use it as `Math.tan()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.tan()

```js
Math.tan(-Infinity); // NaN
Math.tan(-0); // -0
Math.tan(0); // 0
Math.tan(1); // 1.5574077246549023
Math.tan(Math.PI / 4); // 0.9999999999999999 (Floating point error)
Math.tan(Infinity); // NaN
```

### Math.tan() and π/2

It's not possible to calculate `tan(π/2)` exactly.

```js
Math.tan(Math.PI / 2); // 16331239353195370
Math.tan(Math.PI / 2 + Number.EPSILON); // -6218431163823738
```

### Using Math.tan() with a degree value

Because the `Math.tan()` function accepts radians, but it is often easier to work with degrees, the following function accepts a value in degrees, converts it to radians and returns the tangent.

```js
function getTanDeg(deg) {
  const rad = (deg * Math.PI) / 180;
  return Math.tan(rad);
}
```

## See also

- `Math.acos()`
- `Math.asin()`
- `Math.atan()`
- `Math.atan2()`
- `Math.cos()`
- `Math.sin()`
- CSS `tan()` function
