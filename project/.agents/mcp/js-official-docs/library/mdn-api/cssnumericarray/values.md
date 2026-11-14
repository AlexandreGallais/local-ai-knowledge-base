---
title: "CSSNumericArray: values() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray: values() method

The **`values()`** method of the `CSSNumericArray` interface returns a new _array iterator_ that yields each item in the object.

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Iterating over values

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

for (const value of sum.values.values()) {
  console.log(value.toString());
}
// "10px"
// "5em"
// "50%"
```

## See also

- `CSSNumericArray.entries()`
- `CSSNumericArray.forEach()`
- `CSSNumericArray.keys()`
- `CSSNumericArray.length`
- Using the CSS Typed OM
- CSS Typed Object Model API
