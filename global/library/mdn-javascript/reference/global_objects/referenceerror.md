---
title: "ReferenceError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/referenceerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReferenceError

The **`ReferenceError`** object represents an error when a variable that doesn't exist (or hasn't yet been initialized) in the current scope is referenced.

`ReferenceError` is a serializable object, so it can be cloned with `structuredClone()` or copied between Workers using `postMessage()`.

`ReferenceError` is a subclass of `Error`.

## Constructor

- `ReferenceError()`
    Creates a new `ReferenceError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `ReferenceError.prototype` and shared by all `ReferenceError` instances.

- `ReferenceError.prototype.constructor`
    The constructor function that created the instance object. For `ReferenceError` instances, the initial value is the `ReferenceError` constructor.
- `ReferenceError.prototype.name`
    Represents the name for the type of error. For `ReferenceError.prototype.name`, the initial value is `"ReferenceError"`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Catching a ReferenceError

```js
try {
  let a = undefinedVariable;
} catch (e) {
  console.log(e instanceof ReferenceError); // true
  console.log(e.message); // "undefinedVariable is not defined"
  console.log(e.name); // "ReferenceError"
  console.log(e.stack); // Stack of the error
}
```

### Creating a ReferenceError

```js
try {
  throw new ReferenceError("Hello");
} catch (e) {
  console.log(e instanceof ReferenceError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "ReferenceError"
  console.log(e.stack); // Stack of the error
}
```

## See also

- `Error`
