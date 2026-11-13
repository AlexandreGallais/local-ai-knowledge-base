---
title: "CSSUnparsedValue: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cssunparsedvalue/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSUnparsedValue: forEach() method

The **`forEach()`** method of the `CSSUnparsedValue` interface executes a provided function once for each item in the object.

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
        The `CSSUnparsedValue` that `forEach()` is being called on.
- `thisArg` (optional)
    Value to use as `this` when executing `callbackFn`.

### Return value

None (`undefined`).

## Examples

### Iterating with forEach()

```js
const value = new CSSUnparsedValue(["1em", "#445566", "-45px"]);

value.forEach((fragment, index) => {
  console.log(index, fragment);
});
// 0 "1em"
// 1 "#445566"
// 2 "-45px"
```

## See also

- `CSSUnparsedValue()`
- `CSSUnparsedValue.entries()`
- `CSSUnparsedValue.keys()`
- `CSSUnparsedValue.length`
- `CSSUnparsedValue.values()`
- Using the CSS Typed OM
- CSS Typed Object Model API
