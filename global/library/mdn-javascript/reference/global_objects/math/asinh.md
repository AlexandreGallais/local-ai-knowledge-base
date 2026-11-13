---
title: "Math.asinh()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/asinh/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.asinh()

The **`Math.asinh()`** static method returns the inverse hyperbolic sine of a number. That is,

<math display="block">
  <semantics><mtable columnalign="right left right left right left right left right left" columnspacing="0em" displaystyle="true"><mtr><mtd><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚊𝚜𝚒𝚗𝚑</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow></mtd><mtd><mo>=</mo><mo lspace="0em" rspace="0.16666666666666666em">arsinh</mo><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mtext>the unique </mtext><mi>y</mi><mtext> such that </mtext><mo lspace="0em" rspace="0em">sinh</mo><mo stretchy="false">(</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi></mtd></mtr><mtr><mtd></mtd><mtd><mo>=</mo><mo lspace="0em" rspace="0em">ln</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>+</mo><mn>1</mn></mrow></msqrt></mrow><mo>)</mo></mrow></mtd></mtr></mtable><annotation encoding="TeX">\begin{aligned}\mathtt{\operatorname{Math.asinh}(x)} &= \operatorname{arsinh}(x) = \text{the unique } y \text{ such that } \sinh(y) = x \\&= \ln\left(x + \sqrt{x^2 + 1}\right)\end{aligned}</annotation></semantics>
</math>

```js
console.log(Math.asinh(1));
// Expected output: 0.881373587019543

console.log(Math.asinh(0));
// Expected output: 0

console.log(Math.asinh(-1));
// Expected output: -0.881373587019543

console.log(Math.asinh(2));
// Expected output: 1.4436354751788103
```

## Syntax

```js
Math.asinh(x)
```

### Parameters

- `x`
    A number.

### Return value

The inverse hyperbolic sine of `x`.

## Description

Because `asinh()` is a static method of `Math`, you always use it as `Math.asinh()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.asinh()

```js
Math.asinh(-Infinity); // -Infinity
Math.asinh(-1); // -0.881373587019543
Math.asinh(-0); // -0
Math.asinh(0); // 0
Math.asinh(1); // 0.881373587019543
Math.asinh(Infinity); // Infinity
```

## See also

- Polyfill of `Math.asinh` in `core-js`
- es-shims polyfill of `Math.asinh`
- `Math.acosh()`
- `Math.atanh()`
- `Math.cosh()`
- `Math.sinh()`
- `Math.tanh()`
