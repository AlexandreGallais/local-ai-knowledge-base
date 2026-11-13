---
title: "Math.log1p()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/log1p/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.log1p()

The **`Math.log1p()`** static method returns the natural logarithm (base e) of `1 + x`, where `x` is the argument. That is:

<math display="block">
  <semantics><mrow><mo>∀</mo><mi>x</mi><mo>></mo><mo>−</mo><mn>1</mn><mo>,</mo><mspace width="0.2777777777777778em"></mspace><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚕𝚘𝚐𝟷𝚙</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow><mo>=</mo><mo lspace="0em" rspace="0em">ln</mo><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="TeX">\forall x > -1,\;\mathtt{\operatorname{Math.log1p}(x)} = \ln(1 + x)</annotation></semantics>
</math>

```js
console.log(Math.log1p(1));
// Expected output: 0.6931471805599453

console.log(Math.log1p(0));
// Expected output: 0

console.log(Math.log1p(-1));
// Expected output: -Infinity

console.log(Math.log1p(-2));
// Expected output: NaN
```

## Syntax

```js
Math.log1p(x)
```

### Parameters

- `x`
    A number greater than or equal to -1.

### Return value

The natural logarithm (base e) of `x + 1`. If `x` is -1, returns `-Infinity`. If `x < -1`, returns `NaN`.

## Description

For very small values of _x_, adding 1 can reduce or eliminate precision. The double floats used in JS give you about 15 digits of precision. 1 + 1e-15 \= 1.000000000000001, but 1 + 1e-16 = 1.000000000000000 and therefore exactly 1.0 in that arithmetic, because digits past 15 are rounded off.

When you calculate log(1 + _x_), where _x_ is a small positive number, you should get an answer very close to _x_ because: <math><semantics><mrow><munder><mo movablelimits="true" form="prefix">lim</mo><mrow ><mi>x</mi><mo stretchy="false">→</mo><mn>0</mn></mrow></munder><mfrac><mrow><mi>log</mi><mo>⁡</mo><mo stretchy="false">(</mo><mn>1</mn><mo>+</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><mi>x</mi></mfrac><mo>=</mo><mn>1</mn></mrow><annotation encoding="TeX">\lim_{x \to 0} \frac{\log(1+x)}{x} = 1</annotation></semantics></math>. If you calculate `Math.log(1 + 1.1111111111e-15)`, you should get an answer close to `1.1111111111e-15`. Instead, you will end up taking the logarithm of `1.00000000000000111022` (the roundoff is in binary, so sometimes it gets ugly), and get the answer 1.11022…e-15, with only 3 correct digits. If you calculate `Math.log1p(1.1111111111e-15)` instead, you will get a much more accurate answer, `1.1111111110999995e-15`, with 15 correct digits of precision (actually 16 in this case).

If the value of `x` is less than -1, the return value is always `NaN`.

Because `log1p()` is a static method of `Math`, you always use it as `Math.log1p()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.log1p()

```js
Math.log1p(-2); // NaN
Math.log1p(-1); // -Infinity
Math.log1p(-0); // -0
Math.log1p(0); // 0
Math.log1p(1); // 0.6931471805599453
Math.log1p(Infinity); // Infinity
```

## See also

- Polyfill of `Math.log1p` in `core-js`
- es-shims polyfill of `Math.log1p`
- `Math.exp()`
- `Math.log()`
- `Math.expm1()`
- `Math.log10()`
- `Math.log2()`
- `Math.pow()`
