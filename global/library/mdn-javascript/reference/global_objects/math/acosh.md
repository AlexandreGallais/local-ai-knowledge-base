---
title: "Math.acosh()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/acosh/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.acosh()

The **`Math.acosh()`** static method returns the inverse hyperbolic cosine of a number. That is,

<math display="block">
  <semantics><mtable columnalign="right left right left right left right left right left" columnspacing="0em" displaystyle="true"><mtr><mtd><mo>∀</mo><mi>x</mi><mo>≥</mo><mn>1</mn><mo>,</mo><mspace width="0.2777777777777778em"></mspace><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚊𝚌𝚘𝚜𝚑</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow></mtd><mtd><mo>=</mo><mo lspace="0em" rspace="0.16666666666666666em">arcosh</mo><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mtext>the unique </mtext><mi>y</mi><mo>≥</mo><mn>0</mn><mtext> such that </mtext><mo lspace="0em" rspace="0em">cosh</mo><mo stretchy="false">(</mo><mi>y</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi></mtd></mtr><mtr><mtd></mtd><mtd><mo>=</mo><mo lspace="0em" rspace="0em">ln</mo><mrow><mo>(</mo><mrow><mi>x</mi><mo>+</mo><msqrt><mrow><msup><mi>x</mi><mn>2</mn></msup><mo>−</mo><mn>1</mn></mrow></msqrt></mrow><mo>)</mo></mrow></mtd></mtr></mtable><annotation encoding="TeX">\begin{aligned}\forall x \geq 1,\;\mathtt{\operatorname{Math.acosh}(x)} &= \operatorname{arcosh}(x) = \text{the unique } y \geq 0 \text{ such that } \cosh(y) = x\\&= \ln\left(x + \sqrt{x^2 - 1}\right)\end{aligned}</annotation></semantics>
</math>

```js
console.log(Math.acosh(0.999999999999));
// Expected output: NaN

console.log(Math.acosh(1));
// Expected output: 0

console.log(Math.acosh(2));
// Expected output: 1.3169578969248166

console.log(Math.acosh(2.5));
// Expected output: 1.566799236972411
```

## Syntax

```js
Math.acosh(x)
```

### Parameters

- `x`
    A number greater than or equal to 1.

### Return value

The inverse hyperbolic cosine of `x`. If `x` is less than 1, returns `NaN`.

## Description

Because `acosh()` is a static method of `Math`, you always use it as `Math.acosh()`, rather than as a method of a `Math` object you created (`Math` is no constructor).

## Examples

### Using Math.acosh()

```js
Math.acosh(0); // NaN
Math.acosh(1); // 0
Math.acosh(2); // 1.3169578969248166
Math.acosh(Infinity); // Infinity
```

## See also

- Polyfill of `Math.acosh` in `core-js`
- es-shims polyfill of `Math.acosh`
- `Math.asinh()`
- `Math.atanh()`
- `Math.cosh()`
- `Math.sinh()`
- `Math.tanh()`
