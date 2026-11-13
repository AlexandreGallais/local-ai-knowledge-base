---
title: "AsyncDisposableStack"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack

The **`AsyncDisposableStack`** object represents a stack of async disposers to run when the stack itself is disposed. Disposer functions are executed in reverse order of registration, with strong error handling guarantees. Calling its `move()` method will transfer responsibility for calling the current registered disposers to a new `AsyncDisposableStack` and prevent registering any additional disposers.

See `DisposableStack` for general information about using disposable stacks.

## Constructor

- `AsyncDisposableStack()`
    Creates a new `AsyncDisposableStack` object.

## Instance properties

These properties are defined on `AsyncDisposableStack.prototype` and shared by all `AsyncDisposableStack` instances.

- `AsyncDisposableStack.prototype.constructor`
    The constructor function that created the instance object. For `AsyncDisposableStack` instances, the initial value is the `AsyncDisposableStack` constructor.
- `AsyncDisposableStack.prototype.disposed`
    Read-only. Returns `true` if the `AsyncDisposableStack` has been disposed, or `false` if not.
- `AsyncDisposableStack.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"AsyncDisposableStack"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `AsyncDisposableStack.prototype.adopt()`
    Registers a value that doesn't implement the async disposable protocol to the stack by providing a custom disposer function.
- `AsyncDisposableStack.prototype.disposeAsync()`
    Disposes this stack by calling all disposers registered to it in reverse order of registration.
- `AsyncDisposableStack.prototype.defer()`
    Takes a callback function to be called when the stack is disposed.
- `AsyncDisposableStack.prototype.move()`
    Creates a new `AsyncDisposableStack` instance that contains the same disposers as this stack, and then marks this stack as disposed, without calling any disposers.
- `AsyncDisposableStack.prototype.use()`
    Registers a value that implements the async disposable protocol to the stack.
- `AsyncDisposableStack.prototype[Symbol.asyncDispose]`
    An alias for the `disposeAsync()` method.

## See also

- Polyfill of `AsyncDisposableStack` in `core-js`
- JavaScript resource management
- `Symbol.asyncDispose`
- `await using`
- `DisposableStack`
