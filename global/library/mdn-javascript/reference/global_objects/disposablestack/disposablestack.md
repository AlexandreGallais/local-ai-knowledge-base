---
title: "DisposableStack() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/disposablestack/disposablestack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DisposableStack() constructor

The **`DisposableStack()`** constructor creates `DisposableStack` objects.

## Syntax

```js
new DisposableStack()
```

> **Note:**
> `DisposableStack()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

None.

### Return value

A new `DisposableStack` object.

## Examples

### Creating a DisposableStack

```js
const disposer = new DisposableStack();
disposer.defer(() => console.log("Disposed!"));
disposer.dispose();
// Logs: Disposed!
```

## See also

- Polyfill of `DisposableStack` in `core-js`
- JavaScript resource management
