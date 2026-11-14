---
title: "CustomStateSet: forEach() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/customstateset/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CustomStateSet: forEach() method

The **`forEach()`** method of the `CustomStateSet` interface executes a provided function for each value in the `CustomStateSet` object.

## Syntax

```js
forEach(callbackFn)
forEach(callbackFn, thisArg)
```

### Parameters

- `callbackFn`
    Function to execute for each element, taking three arguments:
    - `value`, `key`
        The current element being processed in the `CustomStateSet`. As there are no keys in a `CustomStateSet`, the value is passed for both arguments.
    - `set`
        The `CustomStateSet` which `forEach()` was called upon.
- `thisArg`
    Value to use as `this` when executing `callbackFn`.

### Return value

Undefined.
