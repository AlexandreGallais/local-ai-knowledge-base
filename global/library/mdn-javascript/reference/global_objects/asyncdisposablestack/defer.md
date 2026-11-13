---
title: "AsyncDisposableStack.prototype.defer()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/defer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype.defer()

The **`defer()`** method of `AsyncDisposableStack` instances takes a callback function to be called and awaited when the stack is disposed.

See `DisposableStack.prototype.defer()` for general information about the `defer()` method.

## Syntax

```js
defer(onDispose)
```

### Parameters

- `onDispose`
    A function that will be called when the stack is disposed. The function receives no arguments and can return a promise which gets awaited.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if `onDispose` is not a function.
- `ReferenceError`
    Thrown if the stack is already disposed.

## Examples

### Using defer()

One use case of `defer()` is to do something unrelated to resource freeing during scope exit, such as logging a message.

```js
async function doSomething() {
  await using disposer = new AsyncDisposableStack();
  disposer.defer(async () => {
    await fs.writeFile("log.txt", "All resources freed successfully");
  });
  // Other code that claims and frees more data
}
```

## See also

- Polyfill of `AsyncDisposableStack.prototype.defer` in `core-js`
- JavaScript resource management
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.adopt()`
- `AsyncDisposableStack.prototype.use()`
