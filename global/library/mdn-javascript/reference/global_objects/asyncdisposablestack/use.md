---
title: "AsyncDisposableStack.prototype.use()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/use/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype.use()

The **`use()`** method of `AsyncDisposableStack` instances registers a value that implements the async disposable protocol to the stack.

See `DisposableStack.prototype.use()` for general information about the `use()` method.

## Syntax

```js
use(value)
```

### Parameters

- `value`
    The value to register to the stack. Must either contain a `Symbol.asyncDispose` or `Symbol.dispose` method, or be `null` or `undefined`.

### Return value

The same `value` that was passed in.

### Exceptions

- `TypeError`
    Thrown if `value` is not `null` or `undefined`, and does not contain a `Symbol.asyncDispose` or `Symbol.dispose` method.
- `ReferenceError`
    Thrown if the stack is already disposed.

## Examples

### Using use()

This function reads a file (as a Node.js `FileHandle`) and returns its contents. The file handle is automatically closed when the function completes, given that the `FileHandle` class implements a `Symbol.asyncDispose` method that asynchronously closes the file.

```js
async function readFileContents(path) {
  await using disposer = new AsyncDisposableStack();
  const handle = disposer.use(await fs.open(path));
  const data = await handle.read();
  return data;
  // The disposer is disposed here, which causes handle to be closed too
}
```

## See also

- Polyfill of `AsyncDisposableStack.prototype.use` in `core-js`
- JavaScript resource management
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.adopt()`
- `AsyncDisposableStack.prototype.defer()`
