---
title: "CSSNumericArray: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssnumericarray/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSNumericArray: forEach() method

The **`forEach()`** method of the `CSSNumericArray` interface executes a provided function once for each item in the object.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    The function to execute for each element, taking three arguments:
    - `currentValue`
        The item being processed.
    - `index` (optional)
        The index of the current element being processed.
    - `array` (optional)
        The `CSSNumericArray` that `forEach()` is being called on.
- `thisArg` (optional)
    Value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Examples

### Iterating with forEach()

```js
const sum = new CSSMathSum(CSS.px(10), CSS.em(5), CSS.percent(50));

sum.values.forEach((value, index) => {
  console.log(index, value.toString());
});
// 0 "10px"
// 1 "5em"
// 2 "50%"
```

## See also

- `CSSNumericArray.entries()`
- `CSSNumericArray.keys()`
- `CSSNumericArray.length`
- `CSSNumericArray.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
