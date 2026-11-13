---
title: "Math.ceil()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/ceil/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.ceil()

The **`Math.ceil()`** static method always rounds up and returns the smallest integer greater than or equal to a given number.

```js
console.log(Math.ceil(0.95));
// Expected output: 1

console.log(Math.ceil(4));
// Expected output: 4

console.log(Math.ceil(7.004));
// Expected output: 8

console.log(Math.ceil(-7.004));
// Expected output: -7
```

## Syntax

```js
Math.ceil(x)
```

### Parameters

- `x`
    A number.

### Return value

The smallest integer greater than or equal to `x`. It's the same value as `-Math.floor(-x)`.

## Description

Because `ceil()` is a static method of `Math`, you always use it as `Math.ceil()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.ceil()

```js
Math.ceil(-Infinity); // -Infinity
Math.ceil(-7.004); // -7
Math.ceil(-4); // -4
Math.ceil(-0.95); // -0
Math.ceil(-0); // -0
Math.ceil(0); // 0
Math.ceil(0.95); // 1
Math.ceil(4); // 4
Math.ceil(7.004); // 8
Math.ceil(Infinity); // Infinity
```

## See also

- `Math.abs()`
- `Math.floor()`
- `Math.round()`
- `Math.sign()`
- `Math.trunc()`
