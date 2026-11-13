---
title: "MediaKeyStatusMap: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeystatusmap/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeyStatusMap: forEach() method

The **`forEach()`** method of the
`MediaKeyStatusMap` interface calls callback once for each key-value pair
in the status map, in insertion order. If an argument is present it will be passed to
the callback.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    Function to execute for each element, taking three arguments:
    - `currentValue`
        The current element being processed in the array.
    - `index` (optional)
        The index of the current element being processed in the array.
    - `array` (optional)
        Which array `forEach()` is being applied to.

- `thisArg` (optional)
    Value used as `this` when executing `callback`.

### Return value

None (`undefined`).
