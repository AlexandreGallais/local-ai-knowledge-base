---
title: "Symbol.dispose"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/dispose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.dispose

The **`Symbol.dispose`** static data property represents the well-known symbol `Symbol.dispose`. The `using` declaration looks up this symbol on the variable initializer for the method to call when the variable goes out of scope.

## Value

The well-known symbol `Symbol.dispose`.

## Description

An object is disposable if it has the `Symbol.dispose` method. The method is expected to have the following semantics:

- Invoking this method notifies the Disposable object that the caller does not intend to continue to use this object. This method should perform any necessary logic to explicit clean up the resource including, but not limited to, file system handles, streams, host objects, etc.
- When an exception is thrown from this method, it typically means that the resource could not be explicitly freed.
- If called more than once on the same object, the function should not throw an exception. However, this requirement is not enforced.

This method should not return a promise, as promises returned by `Symbol.dispose` are not awaited by `await using`. To declare async disposables, use `Symbol.asyncDispose`.

## Examples

### User defined disposables

`[Symbol.dispose]` allows the creation of custom disposables. See the `using` reference for more information.

```js
class Disposable {
  #disposed;
  constructor() {
    this.#disposed = false;
  }

  [Symbol.dispose]() {
    this.#disposed = true;
  }

  get isDisposed() {
    return this.#disposed;
  }
}

const resource = new Disposable();
{
  using resourceUsed = resource;
  console.log(resource.isDisposed); // false
}
console.log(resource.isDisposed); // true
```

## See also

- Polyfill of `Symbol.dispose` in `core-js`
- JavaScript resource management
- `Symbol.asyncDispose`
- `using`
- `DisposableStack.prototype[Symbol.dispose]()`
- `Iterator.prototype[Symbol.dispose]()`
