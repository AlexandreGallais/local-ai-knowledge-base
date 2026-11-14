---
title: "Error() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error() constructor

The **`Error()`** constructor creates `Error` objects.

## Syntax

```js
new Error()
new Error(message)
new Error(message, options)
new Error(message, fileName)
new Error(message, fileName, lineNumber)

Error()
Error(message)
Error(message, options)
Error(message, fileName)
Error(message, fileName, lineNumber)
```

> **Note:**
> `Error()` can be called with or without `new`. Both create a new `Error` instance.

### Parameters

- `message` (optional)
    A human-readable description of the error.
- `options` (optional)
    An object that has the following properties:
    - `cause` (optional)
        A value indicating the specific cause of the error, reflected in the `cause` property. When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.
- `fileName` (optional) (non-standard)
    The path to the file that raised this error, reflected in the `fileName` property. Defaults to the name of the file containing the code that called the `Error()` constructor.
- `lineNumber` (optional) (non-standard)
    The line number within the file on which the error was raised, reflected in the `lineNumber` property. Defaults to the line number containing the `Error()` constructor invocation.

## Examples

### Function call or new construction

When `Error` is used like a function, that is without `new`, it will return an `Error` object.
Therefore, a mere call to `Error` will produce the same output that constructing an `Error` object via the `new` keyword would.

```js
const x = Error("I was created using a function call!");

// above has the same functionality as following
const y = new Error('I was constructed via the "new" keyword!');
```

### Rethrowing an error with a cause

It is sometimes useful to catch an error and re-throw it with a new message.
In this case you should pass the original error into the constructor for the new `Error`, as shown.

```js
try {
  frameworkThatCanThrow();
} catch (err) {
  throw new Error("New error message", { cause: err });
}
```

For a more detailed example see Error > Differentiate between similar errors.

### Omitting options argument

JavaScript only tries to read `options.cause` if `options` is an object — this avoids ambiguity with the other non-standard `Error(message, fileName, lineNumber)` signature, which requires the second parameter to be a string. If you omit `options`, pass a primitive value as `options`, or pass an object without the `cause` property, then the created `Error` object will have no `cause` property.

```js
// Omitting options
const error1 = new Error("Error message");
console.log("cause" in error1); // false

// Passing a primitive value
const error2 = new Error("Error message", "");
console.log("cause" in error2); // false

// Passing an object without a cause property
const error3 = new Error("Error message", { details: "http error" });
console.log("cause" in error3); // false
```

## See also

- Polyfill of `Error` with `cause` support in `core-js`
- es-shims polyfill of Error `cause`
- `throw`
- `try...catch`
- Error causes on v8.dev (2021)
