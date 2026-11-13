---
title: "FontFaceSet: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfaceset/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSet: forEach() method

The **`forEach()`** method of the `FontFaceSet` interface executes a provided function for each value in the `FontFaceSet` object.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    Function to execute for each element, taking three arguments:
    - `value`, `key`
        The current element being processed in the `FontFaceSet`. As there are no keys in a `FontFaceSet`, the value is passed for both arguments.
    - `set`
        The `FontFaceSet` which `forEach()` was called on.
- `thisArg` (optional)
    Value to use as `this` when executing `callbackFn`. Defaults to `undefined`.

### Return value

`undefined`.
