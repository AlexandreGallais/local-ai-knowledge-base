---
title: "Math.E"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/math/e/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Math.E

The **`Math.E`** static data property represents Euler's number, the base of natural logarithms, e, which is approximately 2.718.

```js
function compoundOneYear(interestRate, currentVal) {
  return currentVal * Math.E ** interestRate;
}

console.log(Math.E);
// Expected output: 2.718281828459045

console.log((1 + 1 / 1000000) ** 1000000);
// Expected output: 2.718280469 (approximately)

console.log(compoundOneYear(0.05, 100));
// Expected output: 105.12710963760242
```

## Value

<math display="block">
  <semantics><mrow><mi>𝙼𝚊𝚝𝚑.𝙴</mi><mo>=</mo><mi>e</mi><mo>≈</mo><mn>2.718</mn></mrow><annotation encoding="TeX">\mathtt{Math.E} = e \approx 2.718</annotation></semantics>
</math>

## Description

Because `E` is a static property of `Math`, you always use it as `Math.E`, rather than as a property of a `Math` object you created (`Math` is not a constructor).

## Examples

### Using Math.E

The following function returns e:

```js
function getNapier() {
  return Math.E;
}

getNapier(); // 2.718281828459045
```

## See also

- `Math.exp()`
- `Math.log()`
- `Math.log1p()`
