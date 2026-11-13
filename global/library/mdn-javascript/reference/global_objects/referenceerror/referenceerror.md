---
title: "ReferenceError() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/referenceerror/referenceerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReferenceError() constructor

The **`ReferenceError()`** constructor creates `ReferenceError` objects.

## Syntax

```js
new ReferenceError()
new ReferenceError(message)
new ReferenceError(message, options)
new ReferenceError(message, fileName)
new ReferenceError(message, fileName, lineNumber)

ReferenceError()
ReferenceError(message)
ReferenceError(message, options)
ReferenceError(message, fileName)
ReferenceError(message, fileName, lineNumber)
```

> **Note:**
> `ReferenceError()` can be called with or without `new`. Both create a new `ReferenceError` instance.

### Parameters

- `message` (optional)
    Human-readable description of the error.
- `options` (optional)
    An object that has the following properties:
    - `cause` (optional)
        A property indicating the specific cause of the error.
        When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.
- `fileName` (optional) (non-standard)
    The name of the file containing the code that caused the exception.
- `lineNumber` (optional) (non-standard)
    The line number of the code that caused the exception

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
