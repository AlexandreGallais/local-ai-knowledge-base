---
title: "Math.LOG2E"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/log2e/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.LOG2E

The **`Math.LOG2E`** static data property represents the base 2 logarithm of e, approximately 1.443.

```js
function getLog2e() {
  return Math.LOG2E;
}

console.log(getLog2e());
// Expected output: 1.4426950408889634
```

## Value

<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙻𝙾𝙶𝟸𝙴</mi><mo>=</mo><msub><mo lspace="0em" rspace="0em">log</mo><mn>2</mn></msub><mo stretchy="false">(</mo><mi mathvariant="normal">e</mi><mo stretchy="false">)</mo><mo>≈</mo><mn>1.443</mn></mrow><annotation encoding="TeX">\mathtt{Math.LOG2E} = \log_2(\mathrm{e}) \approx 1.443</annotation></semantics>
</math>

## Description

Because `LOG2E` is a static property of `Math`, you always use it as `Math.LOG2E`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.LOG2E

The following function returns the base 2 logarithm of e:

```js
function getLog2e() {
  return Math.LOG2E;
}

getLog2e(); // 1.4426950408889634
```

## See also

- `Math.exp()`
- `Math.log()`
- `Math.log2()`
