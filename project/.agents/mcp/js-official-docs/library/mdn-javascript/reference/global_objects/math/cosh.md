---
title: "Math.cosh()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/cosh/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.cosh()

The **`Math.cosh()`** static method returns the hyperbolic cosine of a number. That is,

<math display="block">
  <semantics><mrow><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚌𝚘𝚜𝚑</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow><mo>=</mo><mo lspace="0em" rspace="0em">cosh</mo><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mrow><msup><mi mathvariant="normal">e</mi><mi>x</mi></msup><mo>+</mo><msup><mi mathvariant="normal">e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow><mn>2</mn></mfrac></mrow><annotation encoding="TeX">\mathtt{\operatorname{Math.cosh}(x)} = \cosh(x) = \frac{\mathrm{e}^x + \mathrm{e}^{-x}}{2}</annotation></semantics>
</math>

```js
console.log(Math.cosh(0));
// Expected output: 1

console.log(Math.cosh(1));
// Expected output: 1.543080634815244 (approximately)

console.log(Math.cosh(-1));
// Expected output: 1.543080634815244 (approximately)

console.log(Math.cosh(2));
// Expected output: 3.7621956910836314
```

## Syntax

```js
Math.cosh(x)
```

### Parameters

- `x`
    A number.

### Return value

The hyperbolic cosine of `x`.

## Description

Because `cosh()` is a static method of `Math`, you always use it as `Math.cosh()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.cosh()

```js
Math.cosh(-Infinity); // Infinity
Math.cosh(-1); // 1.5430806348152437
Math.cosh(-0); // 1
Math.cosh(0); // 1
Math.cosh(1); // 1.5430806348152437
Math.cosh(Infinity); // Infinity
```

## See also

- Polyfill of `Math.cosh` in `core-js`
- es-shims polyfill of `Math.cosh`
- `Math.acosh()`
- `Math.asinh()`
- `Math.atanh()`
- `Math.sinh()`
- `Math.tanh()`
