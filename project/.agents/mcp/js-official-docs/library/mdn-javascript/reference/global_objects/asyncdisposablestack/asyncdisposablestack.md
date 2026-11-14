---
title: "AsyncDisposableStack() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/asyncdisposablestack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack() constructor

The **`AsyncDisposableStack()`** constructor creates `AsyncDisposableStack` objects.

## Syntax

```js
new AsyncDisposableStack()
```

> **Note:**
> `AsyncDisposableStack()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

None.

### Return value

A new `AsyncDisposableStack` object.

## Examples

### Creating an AsyncDisposableStack

```js
const disposer = new AsyncDisposableStack();
disposer.defer(() => console.log("Disposed!"));
await disposer.disposeAsync();
// Logs: Disposed!
```

## See also

- Polyfill of `AsyncDisposableStack` in `core-js`
- JavaScript resource management
