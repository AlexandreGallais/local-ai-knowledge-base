---
title: "AggregateError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/aggregateerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AggregateError

The **`AggregateError`** object represents an error when several errors need to be wrapped in a single error. It is thrown when multiple errors need to be reported by an operation, for example by `Promise.any()`, when all promises passed to it reject.

Compared to `SuppressedError`, `AggregateError` represents a list of unrelated errors, while `SuppressedError` represents an error that happened during the handling of another error.

`AggregateError` is a subclass of `Error`.

## Constructor

- `AggregateError()`
    Creates a new `AggregateError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `AggregateError.prototype` and shared by all `AggregateError` instances.

- `AggregateError.prototype.constructor`
    The constructor function that created the instance object. For `AggregateError` instances, the initial value is the `AggregateError` constructor.
- `AggregateError.prototype.name`
    Represents the name for the type of error. For `AggregateError.prototype.name`, the initial value is `"AggregateError"`.

These properties are own properties of each `AggregateError` instance.

- `errors`
    An array representing the errors that were aggregated.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Catching an AggregateError

```js
Promise.any([Promise.reject(new Error("some error"))]).catch((e) => {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "All Promises rejected"
  console.log(e.name); // "AggregateError"
  console.log(e.errors); // [ Error: "some error" ]
});
```

### Creating an AggregateError

```js
try {
  throw new AggregateError([new Error("some error")], "Hello");
} catch (e) {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "AggregateError"
  console.log(e.errors); // [ Error: "some error" ]
}
```

## See also

- Polyfill of `AggregateError` in `core-js`
- es-shims polyfill of `AggregateError`
- `Error`
- `Promise.any`
