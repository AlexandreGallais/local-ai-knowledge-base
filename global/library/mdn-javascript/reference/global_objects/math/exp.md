---
title: "Math.exp()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/exp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.exp()

The **`Math.exp()`** static method returns e raised to the power of a number. That is

<math display="block">
  <semantics><mrow><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚎𝚡𝚙</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow><mo>=</mo><msup><mi mathvariant="normal">e</mi><mi>x</mi></msup></mrow><annotation encoding="TeX">\mathtt{\operatorname{Math.exp}(x)} = \mathrm{e}^x</annotation></semantics>
</math>

```js
console.log(Math.exp(0));
// Expected output: 1

console.log(Math.exp(1));
// Expected output: 2.718281828459 (approximately)

console.log(Math.exp(-1));
// Expected output: 0.36787944117144233

console.log(Math.exp(2));
// Expected output: 7.38905609893065
```

## Syntax

```js
Math.exp(x)
```

### Parameters

- `x`
    A number.

### Return value

A nonnegative number representing ex, where e is the base of the natural logarithm.

## Description

Because `exp()` is a static method of `Math`, you always use it as `Math.exp()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

Beware that `e` to the power of a number very close to 0 will be very close to 1 and suffer from loss of precision. In this case, you may want to use `Math.expm1` instead, and obtain a much higher-precision fractional part of the answer.

## Examples

### Using Math.exp()

```js
Math.exp(-Infinity); // 0
Math.exp(-1); // 0.36787944117144233
Math.exp(0); // 1
Math.exp(1); // 2.718281828459045
Math.exp(Infinity); // Infinity
```

## See also

- `Math.E`
- `Math.expm1()`
- `Math.log()`
- `Math.log10()`
- `Math.log1p()`
- `Math.log2()`
- `Math.pow()`
