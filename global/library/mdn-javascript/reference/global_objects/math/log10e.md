---
title: "Math.LOG10E"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/log10e/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.LOG10E

The **`Math.LOG10E`** static data property represents the base 10 logarithm of e, approximately 0.434.

```js
function getLog10e() {
  return Math.LOG10E;
}

console.log(getLog10e());
// Expected output: 0.4342944819032518
```

## Value

<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙾𝙶𝟷𝟶𝙴</mi><mo>=</mo><msub><mo lspace="0em" rspace="0em">log</mo><mn>10</mn></msub><mo stretchy="false">(</mo><mi mathvariant="normal">e</mi><mo stretchy="false">)</mo><mo>≈</mo><mn>0.434</mn></mrow><annotation encoding="TeX">\mathtt{Math.LOG10E} = \log_{10}(\mathrm{e}) \approx 0.434</annotation></semantics>
</math>

## Description

Because `LOG10E` is a static property of `Math`, you always use it as `Math.LOG10E`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LOG10E

The following function returns the base 10 logarithm of e:

```js
function getLog10e() {
  return Math.LOG10E;
}

getLog10e(); // 0.4342944819032518
```

## See also

- `Math.exp()`
- `Math.log()`
- `Math.log10()`
