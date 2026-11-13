---
title: "CSSNumericArray: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray: keys() method

The **`keys()`** method of the `CSSNumericArray` interface returns a new _array iterator_ that yields the index of each item in the object.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over indexes

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

for (const index of sum.values.keys()) {
  console.log(index);
}
// 0
// 1
// 2
```

## See also

- `CSSNumericArray.entries()`
- `CSSNumericArray.forEach()`
- `CSSNumericArray.length`
- `CSSNumericArray.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
