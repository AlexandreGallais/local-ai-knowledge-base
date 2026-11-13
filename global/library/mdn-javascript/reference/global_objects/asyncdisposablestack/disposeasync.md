---
title: "AsyncDisposableStack.prototype.disposeAsync()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/disposeasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype.disposeAsync()

The **`disposeAsync()`** method of `AsyncDisposableStack` instances disposes this stack by calling all disposers registered to it in reverse order of registration, awaiting for each one's completion before calling the next one. If the stack is already disposed, this method does nothing.

It performs the same action as `await using disposer = new AsyncDisposableStack()` at scope exit. It can be used if you need to clean up at a point other than scope exit.

## Syntax

```js
disposeAsync()
```

### Parameters

None.

### Return value

A new `Promise` that resolves with `undefined` when all registered disposers have completed in sequence.

### Exceptions

`disposeAsync()` never synchronously throws an error. The returned promise may reject with one of the following errors:

- `SuppressedError`
    Thrown if multiple disposers in the stack threw an error. If only one error is thrown, it is rethrown as-is. Otherwise, for each additional error, a new `SuppressedError` is created, with the original error as the `suppressed` property, and the new error as the `error` property.

## Examples

### Disposing a stack

Here we push three disposers to the stack, using the `use()`, `adopt()`, and `defer()` methods. When `disposeAsync()` is called, the disposers are called in reverse order of registration.

Note that usually you don't need to call `disposeAsync()` manually. Declare the stack with `await using`, and its `[Symbol.asyncDispose]()` method will be automatically called when the stack goes out of scope.

```js
class Resource {
  #doDisposal() {
    // Imagine more meaningful disposal logic here
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  }
  async dispose() {
    await this.#doDisposal();
    console.log("Resource disposed");
  }
  async [Symbol.asyncDispose]() {
    await this.#doDisposal();
    console.log("Resource disposed via Symbol.asyncDispose");
  }
}

async function doSomething() {
  const disposer = new AsyncDisposableStack();
  const resource = disposer.use(new Resource());
  const resource2 = disposer.adopt(new Resource(), (resource) =>
    resource.dispose(),
  );
  disposer.defer(() => console.log("Deferred disposer"));
  disposer.disposeAsync();
  // Logs in order:
  // Deferred disposer
  // Resource disposed
  // Resource disposed via Symbol.dispose
}

doSomething();
```

## See also

- Polyfill of `AsyncDisposableStack.prototype.disposeAsync` in `core-js`
- JavaScript resource management
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.adopt()`
- `AsyncDisposableStack.prototype.defer()`
- `AsyncDisposableStack.prototype.use()`
- `AsyncDisposableStack.prototype[Symbol.asyncDispose]()`
