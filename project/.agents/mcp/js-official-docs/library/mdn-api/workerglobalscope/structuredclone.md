---
title: "WorkerGlobalScope: structuredClone() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/structuredclone/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: structuredClone() method

The **`structuredClone()`** method of the `WorkerGlobalScope` interface creates a deep copy of a given value using the structured clone algorithm.

The method also allows transferable objects in the original value to be _transferred_ rather than cloned to the new object.
Transferred objects are detached from the original object and attached to the new object; they are no longer accessible in the original object.

## Syntax

```js
structuredClone(value)
structuredClone(value, options)
```

### Parameters

- `value`
    The object to be cloned.
    This can be any structured-cloneable type.
- `options` (optional)
    An object with the following properties:
    - `transfer`
        An array of transferable objects that will be moved rather than cloned to the returned object.

### Return value

A deep copy of the original `value`.

### Exceptions

- `DataCloneError` `DOMException`
    Thrown if any part of the input value is not serializable.

## Description

See `Window.structuredClone()` for details of this function.

## Examples

See `Window.structuredClone()` for examples.

## See also

- A polyfill of `structuredClone` is available in `core-js`
- Structured clone algorithm
