---
title: "CSSNumericArray: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray: entries() method

The **`entries()`** method of the `CSSNumericArray` interface returns a new _array iterator_ that yields `[index, value]` pairs for each item in the object.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over index/value pairs

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

for (const [index, value] of sum.values.entries()) {
  console.log(index, value.toString());
}
// 0 "10px"
// 1 "5em"
// 2 "50%"
```

## See also

- `CSSNumericArray.forEach()`
- `CSSNumericArray.keys()`
- `CSSNumericArray.length`
- `CSSNumericArray.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
