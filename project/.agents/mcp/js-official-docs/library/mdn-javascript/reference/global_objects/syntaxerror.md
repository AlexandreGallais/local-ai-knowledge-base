---
title: "SyntaxError"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/syntaxerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError

The **`SyntaxError`** object represents an error when trying to interpret syntactically invalid code. It is thrown when the JavaScript engine encounters tokens or token order that does not conform to the syntax of the language when parsing code.

`SyntaxError` is a serializable object, so it can be cloned with `structuredClone()` or copied between Workers using `postMessage()`.

`SyntaxError` is a subclass of `Error`.

## Constructor

- `SyntaxError()`
    Creates a new `SyntaxError` object.

## Instance properties

_Also inherits instance properties from its parent `Error`_.

These properties are defined on `SyntaxError.prototype` and shared by all `SyntaxError` instances.

- `SyntaxError.prototype.constructor`
    The constructor function that created the instance object. For `SyntaxError` instances, the initial value is the `SyntaxError` constructor.
- `SyntaxError.prototype.name`
    Represents the name for the type of error. For `SyntaxError.prototype.name`, the initial value is `"SyntaxError"`.

## Instance methods

_Inherits instance methods from its parent `Error`_.

## Examples

### Catching a SyntaxError

```js
try {
  eval("hoo bar");
} catch (e) {
  console.log(e instanceof SyntaxError); // true
  console.log(e.message);
  console.log(e.name); // "SyntaxError"
  console.log(e.stack); // Stack of the error
}
```

### Creating a SyntaxError

```js
try {
  throw new SyntaxError("Hello");
} catch (e) {
  console.log(e instanceof SyntaxError); // true
  console.log(e.message); // "Hello"
  console.log(e.name); // "SyntaxError"
  console.log(e.stack); // Stack of the error
}
```

## See also

- `Error`
