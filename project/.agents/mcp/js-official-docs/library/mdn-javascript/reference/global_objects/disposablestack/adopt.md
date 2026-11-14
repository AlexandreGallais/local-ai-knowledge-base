---
title: "DisposableStack.prototype.adopt()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/disposablestack/adopt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DisposableStack.prototype.adopt()

The **`adopt()`** method of `DisposableStack` instances registers a value that doesn't implement the disposable protocol to the stack by providing a custom disposer function.

## Syntax

```js
adopt(value, onDispose)
```

### Parameters

- `value`
    Any value to be registered to the stack.
- `onDispose`
    A function that will be called when the stack is disposed. The function receives `value` as its only argument.

### Return value

The same `value` that was passed in.

### Exceptions

- `TypeError`
    Thrown if `onDispose` is not a function.
- `ReferenceError`
    Thrown if the stack is already disposed.

## Description

The primary purpose of `adopt()` is to register a value that doesn't implement the disposable protocol to the stack. If the value is already disposable, you can use `use()` instead, which automatically uses the value's `Symbol.dispose` method as the disposer.

`adopt(value, onDispose)` is almost the same as `defer(() => onDispose(value))`, but it allows you to declare the resource and register it on the same line. This way, there's minimal chance of an error happening between the resource creation and registration, which will cause the resource to leak.

```js
using disposer = new DisposableStack();
const reader = disposer.adopt(stream.getReader(), (reader) =>
  reader.releaseLock(),
);
```

```js
using disposer = new DisposableStack();
const reader = stream.getReader();
// If someone adds code in between these lines and an error occurs,
// the stream will be locked forever.
disposer.defer(() => reader.close());
```

In the same spirit of "make your resource registered as soon as it's declared", you should always wrap your resource acquisition expression in `adopt()`, instead of extracting it to a separate statement.

```js
using disposer = new DisposableStack();
const reader = stream.getReader();
disposer.adopt(reader, (reader) => reader.close());
```

## Examples

### Using adopt()

This code consumes a `ReadableStream` via a `ReadableStreamDefaultReader`. The reader does not implement the disposable protocol, so we use `adopt()` to register it to the stack.

```js
{
  using disposer = new DisposableStack();
  const reader = disposer.adopt(stream.getReader(), (reader) =>
    reader.releaseLock(),
  );
  const { value, done } = reader.read();
  if (!done) {
    // Process the value
  }
  // The reader.releaseLock() method is called here before exiting
}
```

## See also

- Polyfill of `DisposableStack.prototype.adopt` in `core-js`
- JavaScript resource management
- `DisposableStack`
- `DisposableStack.prototype.defer()`
- `DisposableStack.prototype.use()`
