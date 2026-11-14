---
title: "Symbol.asyncDispose"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/asyncdispose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.asyncDispose

The **`Symbol.asyncDispose`** static data property represents the well-known symbol `Symbol.asyncDispose`. The `await using` declaration looks up this symbol on the variable initializer for the method to call when the variable goes out of scope.

## Value

The well-known symbol `Symbol.asyncDispose`.

## Description

An object is async disposable if it has the `Symbol.asyncDispose` method. The method is expected to have the following semantics:

- Invoking this method notifies the AsyncDisposable object that the caller does not intend to continue to use this object. This method should perform any necessary logic to explicit clean up the resource including, but not limited to, file system handles, streams, host objects, etc.
- This method can return a promise, which will be awaited before continuing.
- When an exception is thrown from this method, it typically means that the resource could not be explicitly freed. An AsyncDisposable object is not considered "disposed" until the resulting Promise has been fulfilled.
- If called more than once on the same object, the function should not throw an exception. However, this requirement is not enforced.

## Examples

### User defined async disposables

`[Symbol.asyncDispose]` allows the creation of custom async disposables. See the `await using` reference for more information.

```js
class Disposable {
  #fileHandle;
  #disposed;

  constructor(handle) {
    this.#disposed = false;
    this.#fileHandle = handle;
  }

  async [Symbol.asyncDispose]() {
    await this.#fileHandle.close();
    this.#disposed = true;
  }

  get isDisposed() {
    return this.#disposed;
  }
}

const resource = new Disposable(await fs.open("my-file.txt", "r"));
{
  await using resourceUsed = resource;
  console.log(resource.isDisposed); // false
}
console.log(resource.isDisposed); // true
```

## See also

- Polyfill of `Symbol.asyncDispose` in `core-js`
- JavaScript resource management
- `Symbol.dispose`
- `await using`
- `AsyncDisposableStack.prototype[Symbol.asyncDispose]()`
- `AsyncIterator.prototype[Symbol.asyncDispose]()`
