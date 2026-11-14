---
title: "Math.fround()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/fround/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.fround()

The **`Math.fround()`** static method returns the nearest 32-bit single precision float representation of a number.

```js
console.log(Math.fround(5.5));
// Expected output: 5.5

console.log(Math.fround(5.05));
// Expected output: 5.050000190734863

console.log(Math.fround(5));
// Expected output: 5

console.log(Math.fround(-5.05));
// Expected output: -5.050000190734863
```

## Syntax

```js
Math.fround(doubleFloat)
```

### Parameters

- `doubleFloat`
    A number.

### Return value

The nearest 32-bit single precision float representation of `doubleFloat`.

## Description

JavaScript uses 64-bit double floating-point numbers internally, which offer a very high precision. However, sometimes you may be working with 32-bit floating-point numbers, for example if you are reading values from a `Float32Array`. This can create confusion: checking a 64-bit float and a 32-bit float for equality may fail even though the numbers are seemingly identical.

To solve this, `Math.fround()` can be used to cast the 64-bit float to a 32-bit float. Internally, JavaScript continues to treat the number as a 64-bit float, it just performs a "round to even" on the 23rd bit of the mantissa, and sets all following mantissa bits to `0`. If the number is outside the range of a 32-bit float, `Infinity` or `-Infinity` is returned.

Because `fround()` is a static method of `Math`, you always use it as `Math.fround()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.fround()

The number 1.5 can be precisely represented in the binary numeral system, and is identical in 32-bit and 64-bit:

```js
Math.fround(1.5); // 1.5
Math.fround(1.5) === 1.5; // true
```

However, the number 1.337 cannot be precisely represented in the binary numeral system, so it differs in 32-bit and 64-bit:

```js
Math.fround(1.337); // 1.3370000123977661
Math.fround(1.337) === 1.337; // false
```

<math><semantics><msup><mn>2</mn><mn>150</mn></msup><annotation encoding="TeX">2^150</annotation></semantics></math> is too big for a 32-bit float, so `Infinity` is returned:

```js
2 ** 150; // 1.42724769270596e+45
Math.fround(2 ** 150); // Infinity
```

## See also

- Polyfill of `Math.fround` in `core-js`
- es-shims polyfill of `Math.fround`
- `Math.round()`
