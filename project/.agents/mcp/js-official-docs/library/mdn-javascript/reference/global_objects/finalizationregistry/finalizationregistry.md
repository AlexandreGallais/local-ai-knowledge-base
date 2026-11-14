---
title: "FinalizationRegistry() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/finalizationregistry/finalizationregistry/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FinalizationRegistry() constructor

The **`FinalizationRegistry()`** constructor creates `FinalizationRegistry` objects.

## Syntax

```js
new FinalizationRegistry(callbackFn)
```

> **Note:**
> `FinalizationRegistry()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `callback`
    A function to be invoked each time a registered target value is garbage collected. Its return value is ignored. The function is called with the following arguments:
    - `heldValue`
        The value that was passed to the second parameter of the `register()` method when the `target` object was registered.

## Examples

### Creating a new registry

You create the registry passing in the callback:

```js
const registry = new FinalizationRegistry((heldValue) => {
  // …
});
```

## See also

- `FinalizationRegistry`
