---
title: "Math.cbrt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/cbrt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.cbrt()

The **`Math.cbrt()`** static method returns the cube root of a number. That is

<math display="block">
  <semantics><mrow><mrow><mo lspace="0em" rspace="0.16666666666666666em">𝙼𝚊𝚝𝚑.𝚌𝚋𝚛𝚝</mo><mo stretchy="false">(</mo><mi>𝚡</mi><mo stretchy="false">)</mo></mrow><mo>=</mo><mroot><mi>x</mi><mn>3</mn></mroot><mo>=</mo><mtext>the unique </mtext><mi>y</mi><mtext> such that </mtext><msup><mi>y</mi><mn>3</mn></msup><mo>=</mo><mi>x</mi></mrow><annotation encoding="TeX">\mathtt{\operatorname{Math.cbrt}(x)} = \sqrt[3]{x} = \text{the unique } y \text{ such that } y^3 = x</annotation></semantics>
</math>

```js
console.log(Math.cbrt(-1));
// Expected output: -1

console.log(Math.cbrt(1));
// Expected output: 1

console.log(Math.cbrt(Infinity));
// Expected output: Infinity

console.log(Math.cbrt(64));
// Expected output: 4
```

## Syntax

```js
Math.cbrt(x)
```

### Parameters

- `x`
    A number.

### Return value

The cube root of `x`.

## Description

Because `cbrt()` is a static method of `Math`, you always use it as `Math.cbrt()`, rather than as a method of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.cbrt()

```js
Math.cbrt(-Infinity); // -Infinity
Math.cbrt(-1); // -1
Math.cbrt(-0); // -0
Math.cbrt(0); // 0
Math.cbrt(1); // 1
Math.cbrt(2); // 1.2599210498948732
Math.cbrt(Infinity); // Infinity
```

## See also

- Polyfill of `Math.cbrt` in `core-js`
- es-shims polyfill of `Math.cbrt`
- `Math.pow()`
- `Math.sqrt()`
