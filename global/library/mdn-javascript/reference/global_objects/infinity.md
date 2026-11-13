---
title: "Infinity"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/infinity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Infinity

The **`Infinity`** global property is a numeric value representing infinity.

```js
const maxNumber = 10 ** 1000; // Max positive number

if (maxNumber === Infinity) {
  console.log("Let's call it Infinity!");
  // Expected output: "Let's call it Infinity!"
}

console.log(1 / maxNumber);
// Expected output: 0
```

## Value

The same number value as `Number.POSITIVE_INFINITY`.

## Description

`Infinity` is a property of the _global object_. In other words, it is a variable in global scope.

The value `Infinity` (positive infinity) is greater than any other number.

This value behaves slightly differently than mathematical infinity; see `Number.POSITIVE_INFINITY` for details.

## Examples

### Using Infinity

```js
console.log(Infinity); /* Infinity */
console.log(Infinity + 1); /* Infinity */
console.log(10 ** 1000); /* Infinity */
console.log(Math.log(0)); /* -Infinity */
console.log(1 / Infinity); /* 0 */
console.log(1 / 0); /* Infinity */
```

## See also

- `Number.NEGATIVE_INFINITY`
- `Number.POSITIVE_INFINITY`
- `Number.isFinite`
