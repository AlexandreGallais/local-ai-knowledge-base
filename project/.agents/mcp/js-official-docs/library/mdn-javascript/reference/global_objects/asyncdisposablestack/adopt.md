---
title: "AsyncDisposableStack.prototype.adopt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/adopt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype.adopt()

The **`adopt()`** method of `AsyncDisposableStack` instances registers a value that doesn't implement the async disposable protocol to the stack by providing a custom disposer function.

See `DisposableStack.prototype.adopt()` for general information about the `adopt()` method.

## Syntax

```js
adopt(value, onDispose)
```

### Parameters

- `value`
    Any value to be registered to the stack.
- `onDispose`
    A function that will be called when the stack is disposed. The function receives `value` as its only argument, and it can return a promise which gets awaited.

### Return value

The same `value` that was passed in.

### Exceptions

- `TypeError`
    Thrown if `onDispose` is not a function.
- `ReferenceError`
    Thrown if the stack is already disposed.

## Examples

### Using adopt()

This function creates a file handle (as a Node.js `FileHandle`), that gets closed when the function completes. We suppose that the file handle does not implement the async disposable protocol (in reality it does), so we use `adopt()` to register it to the stack. Because the `handle.close()` method returns a promise, we need to use an `AsyncDisposableStack` so that the disposal gets awaited.

```js
async function readFile(path) {
  await using disposer = new AsyncDisposableStack();
  const handle = disposer.adopt(
    await fs.open(path),
    async (handle) => await handle.close(),
  );
  const data = await handle.read();
  // The handle.close() method is called and awaited here before exiting
  return data;
}
```

## See also

- Polyfill of `AsyncDisposableStack.prototype.adopt` in `core-js`
- JavaScript resource management
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.defer()`
- `AsyncDisposableStack.prototype.use()`
