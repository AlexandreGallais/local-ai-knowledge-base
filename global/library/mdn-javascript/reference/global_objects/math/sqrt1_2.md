---
title: "Math.SQRT1_2"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/sqrt1_2/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.SQRT1_2

The **`Math.SQRT1_2`** static data property represents the square root of 1/2, which is approximately 0.707.

```js
function getRoot1Over2() {
  return Math.SQRT1_2;
}

console.log(getRoot1Over2());
// Expected output: 0.7071067811865476
```

## Value

<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝚂𝚀𝚁𝚃𝟷_𝟸</mi><mo>=</mo><msqrt><mfrac><mn>1</mn><mn>2</mn></mfrac></msqrt><mo>≈</mo><mn>0.707</mn></mrow><annotation encoding="TeX">\mathtt{Math.SQRT1_2} = \sqrt{\frac{1}{2}} \approx 0.707</annotation></semantics>
</math>

## Description

`Math.SQRT1_2` is a constant and a more performant equivalent to `Math.sqrt(0.5)`.

Because `SQRT1_2` is a static property of `Math`, you always use it as `Math.SQRT1_2`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.SQRT1_2

The following function calculates the side length of a square given its diagonal length:

```js
function getSquareSideLength(diagonalLength) {
  return diagonalLength * Math.SQRT1_2;
}
```

## See also

- `Math.pow()`
- `Math.sqrt()`
