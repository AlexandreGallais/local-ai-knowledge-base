---
title: "Math.log10()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/log10/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.log10()

The **`Math.log10()`** static method returns the base 10 logarithm of a number. That is

<math display="block">
  <semantics><mrow><mo>∀</mo><mi>x</mi><mo>></mo><mn>0</mn><mo>,</mo><mspace width="0.2777777777777778em"></mspace><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚕𝚘𝚐𝟷𝟶</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow><mo>=</mo><msub><mo lspace="0em" rspace="0em">log</mo><mn>10</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mtext>the unique </mtext><mi>y</mi><mtext> such that </mtext><msup><mn>10</mn><mi>y</mi></msup><mo>=</mo><mi>x</mi></mrow><annotation encoding="TeX">\forall x > 0,\;\mathtt{\operatorname{Math.log10}(x)} = \log_{10}(x) = \text{the unique } y \text{ such that } 10^y = x</annotation></semantics>
</math>

```js
console.log(Math.log10(100000));
// Expected output: 5

console.log(Math.log10(2));
// Expected output: 0.3010299956639812

console.log(Math.log10(1));
// Expected output: 0

console.log(Math.log10(0));
// Expected output: -Infinity
```

## Syntax

```js
Math.log10(x)
```

### Parameters

- `x`
    A number greater than or equal to 0.

### Return value

The base 10 logarithm of `x`. If `x < 0`, returns `NaN`.

## Description

Because `log10()` is a static method of `Math`, you always use it as `Math.log10()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

This function is the equivalent of `Math.log(x) / Math.log(10)`. For `log10(e)`, use the constant `Math.LOG10E`, which is 1 / `Math.LN10`.

## Examples

### Using Math.log10()

```js
Math.log10(-2); // NaN
Math.log10(-0); // -Infinity
Math.log10(0); // -Infinity
Math.log10(1); // 0
Math.log10(2); // 0.3010299956639812
Math.log10(100000); // 5
Math.log10(Infinity); // Infinity
```

## See also

- Polyfill of `Math.log10` in `core-js`
- es-shims polyfill of `Math.log10`
- `Math.exp()`
- `Math.log()`
- `Math.log1p()`
- `Math.log2()`
- `Math.pow()`
