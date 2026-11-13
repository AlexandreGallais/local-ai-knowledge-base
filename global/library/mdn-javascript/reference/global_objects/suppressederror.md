---
title: "SuppressedError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/suppressederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SuppressedError

The **`SuppressedError`** object represents an error generated while handing another error. It is generated during resource disposal using `using` or `await using`.

Compared to `AggregateError`, `SuppressedError` represents an error that happened during the handling of another error, while `AggregateError` represents a list of unrelated errors. It is possible, though, for a `SuppressedError` to contain a chain of suppressed errors (`e.suppressed.suppressed.suppressed...`). It is also semantically different from `cause` because the error is not _caused_ by another error, but _happens when_ handling another error.

`SuppressedError` is a subclass of `Error`.

## Constructor

- `SuppressedError()`
    Creates a new `SuppressedError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `SuppressedError.prototype` and shared by all `SuppressedError` instances.

- `SuppressedError.prototype.constructor`
    The constructor function that created the instance object. For `SuppressedError` instances, the initial value is the `SuppressedError` constructor.
- `SuppressedError.prototype.name`
    Represents the name for the type of error. For `SuppressedError.prototype.name`, the initial value is `"SuppressedError"`.

> **Note:**
> `SuppressedError` never has the `cause` property, because the semantics of `cause` overlaps with `suppressed`.

These properties are own properties of each `SuppressedError` instance.

- `error`
    A reference to the error that results in the suppression.
- `suppressed`
    A reference to the error that is suppressed by `error`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Catching a SuppressedError

A `SuppressedError` is thrown when an error occurs during resource disposal. Throwing an error causes scope cleanup, and each disposer during the cleanup can throw its own error. All these errors are collected into a chain of `SuppressedError` instances, with the original error as the `suppressed` property and the new error thrown by the next disposer as the `error` property.

```js
try {
  using resource1 = {
    [Symbol.dispose]() {
      throw new Error("resource1 disposal failed");
    },
  };
  using resource2 = {
    [Symbol.dispose]() {
      throw new Error("resource2 disposal failed");
    },
  };
  throw new TypeError("Original error");
} catch (e) {
  console.log(e instanceof SuppressedError); // true
  console.log(e.message); // "An error was suppressed during disposal"
  console.log(e.name); // "SuppressedError"
  console.log(e.error); // Error: resource1 disposal failed
  console.log(e.suppressed); // SuppressedError: An error was suppressed during disposal
  console.log(e.suppressed.error); // Error: resource2 disposal failed
  console.log(e.suppressed.suppressed); // TypeError: Original error
}
```

The chain looks like this:

```plain
     SuppressedError --suppressed--> SuppressedError --suppressed--> TypeError
            |                               |
          error                           error
            |                               |
            v                               v
resource1 disposal failed       resource2 disposal failed
 (Disposal happens later)       (Disposal happens earlier)
```

### Creating a SuppressedError

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e instanceof SuppressedError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "SuppressedError"
  console.log(e.error); // Error: "New error"
  console.log(e.suppressed); // Error: "Original error"
}
```

## See also

- Polyfill of `SuppressedError` in `core-js`
- `Error`
- `using`
- `await using`
- `DisposableStack`
- `AsyncDisposableStack`
