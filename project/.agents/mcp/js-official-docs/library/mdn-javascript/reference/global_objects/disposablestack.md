---
title: "DisposableStack"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/disposablestack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DisposableStack

The **`DisposableStack`** object represents a stack of disposers to run when the stack itself is disposed. Disposer functions are executed in reverse order of registration, with strong error handling guarantees. Calling its `move()` method will transfer responsibility for calling the current registered disposers to a new `DisposableStack` and prevent registering any additional disposers.

## Description

A `DisposableStack` is not exactly a "stack" in terms of its interface. It has several methods for pushing disposers to it, but it has no way to pop one disposer off. Rather, _all_ disposers are popped and executed one-by-one when the stack is disposed.

You register disposable resources to the `DisposableStack` using its `use()`, `adopt()`, or `defer()` methods.

```js
using disposer = new DisposableStack();
const reader = disposer.use(stream.getReader());
```

Then, when the `disposer` goes out of scope, all resources registered to it are disposed in reverse order of registration, unless they have been moved out with `move()`.

It is good practice to _not_ extract the resource acquisition expression to a separate statement, no matter how long the expression is. You should always wrap the `use()` or `adopt()` call around the resource acquisition expression to ensure that the resource is registered to the stack immediately.

```js
using disposer = new DisposableStack();
const reader = stream.getReader();
disposer.use(reader);
```

Functionally, these two code snippets are equivalent. However, the first one is less error-prone because the resource is declared and registered in a single line. If someone puts more code between the second and third lines of the second snippet, an error could occur, causing the resource to leak.

## Constructor

- `DisposableStack()`
    Creates a new `DisposableStack` object.

## Instance properties

These properties are defined on `DisposableStack.prototype` and shared by all `DisposableStack` instances.

- `DisposableStack.prototype.constructor`
    The constructor function that created the instance object. For `DisposableStack` instances, the initial value is the `DisposableStack` constructor.
- `DisposableStack.prototype.disposed`
    Read-only. Returns `true` if the `DisposableStack` has been disposed, or `false` if not.
- `DisposableStack.prototype[Symbol.toStringTag]`
    The initial value of the `[Symbol.toStringTag]` property is the string `"DisposableStack"`. This property is used in `Object.prototype.toString()`.

## Instance methods

- `DisposableStack.prototype.adopt()`
    Registers a value that doesn't implement the disposable protocol to the stack by providing a custom disposer function.
- `DisposableStack.prototype.defer()`
    Takes a callback function to be called when the stack is disposed.
- `DisposableStack.prototype.dispose()`
    Disposes this stack by calling all disposers registered to it in reverse order of registration.
- `DisposableStack.prototype.move()`
    Creates a new `DisposableStack` instance that contains the same disposers as this stack, and then marks this stack as disposed, without calling any disposers.
- `DisposableStack.prototype.use()`
    Registers a value that implements the disposable protocol to the stack.
- `DisposableStack.prototype[Symbol.dispose]`
    An alias for the `dispose()` method.

## See also

- Polyfill of `DisposableStack` in `core-js`
- JavaScript resource management
- `Symbol.dispose`
- `using`
- `AsyncDisposableStack`
