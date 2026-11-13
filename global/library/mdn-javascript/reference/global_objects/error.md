---
title: "Error"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error

**`Error`** objects are thrown when runtime errors occur. The `Error` object can also be used as a base object for user-defined exceptions. See below for standard built-in error types.

## Description

Runtime errors result in new `Error` objects being created and thrown.

`Error` is a serializable object, so it can be cloned with `structuredClone()` or copied between Workers using `postMessage()`.

### Error types

Besides the generic `Error` constructor, there are other core error constructors in JavaScript. For client-side exceptions, see Exception handling statements.

- `EvalError`
    Creates an instance representing an error that occurs regarding the global function `eval()`.
- `RangeError`
    Creates an instance representing an error that occurs when a numeric variable or parameter is outside its valid range.
- `ReferenceError`
    Creates an instance representing an error that occurs when de-referencing an invalid reference.
- `SyntaxError`
    Creates an instance representing a syntax error.
- `TypeError`
    Creates an instance representing an error that occurs when a variable or parameter is not of a valid type.
- `URIError`
    Creates an instance representing an error that occurs when `encodeURI()` or `decodeURI()` are passed invalid parameters.
- `AggregateError`
    Creates an instance representing several errors wrapped in a single error when multiple errors need to be reported by an operation, for example by `Promise.any()`.
- `InternalError` (non-standard)
    Creates an instance representing an error that occurs when an internal error in the JavaScript engine is thrown. E.g. "too much recursion".

## Constructor

- `Error()`
    Creates a new `Error` object.

## Static properties

- `Error.stackTraceLimit` (non-standard)
    A non-standard numerical property that limits how many stack frames to include in an error stack trace.

## Static methods

- `Error.captureStackTrace()`
    A non-standard function that creates the `stack` property on the provided object.
- `Error.isError()`
    Returns `true` if the argument is an error, or `false` otherwise.
- `Error.prepareStackTrace()` (non-standard) (optional)
    A non-standard function that, if provided by user code, is called by the JavaScript engine for thrown exceptions, allowing the user to provide custom formatting for stack traces. See the V8 Stack Trace API docs.

## Instance properties

These properties are defined on `Error.prototype` and shared by all `Error` instances.

- `Error.prototype.constructor`
    The constructor function that created the instance object. For `Error` instances, the initial value is the `Error` constructor.
- `Error.prototype.name`
    Represents the name for the type of error. For `Error.prototype.name`, the initial value is `"Error"`. Subclasses like `TypeError` and `SyntaxError` provide their own `name` properties.
- `Error.prototype.stack` (non-standard)
    A non-standard property for a stack trace.

These properties are own properties of each `Error` instance.

- `cause`
    Error cause indicating the reason why the current error is thrown — usually another caught error. For user-created `Error` objects, this is the value provided as the `cause` property of the constructor's second argument.
- `columnNumber` (non-standard)
    A non-standard Mozilla property for the column number in the line that raised this error.
- `fileName` (non-standard)
    A non-standard Mozilla property for the path to the file that raised this error.
- `lineNumber` (non-standard)
    A non-standard Mozilla property for the line number in the file that raised this error.
- `message`
    Error message. For user-created `Error` objects, this is the string provided as the constructor's first argument.

## Instance methods

- `Error.prototype.toString()`
    Returns a string representing the specified object. Overrides the `Object.prototype.toString()` method.

## Examples

### Throwing a generic error

Usually you create an `Error` object with the intention of raising it using the `throw` keyword.
You can handle the error using the `try...catch` construct:

```js
try {
  throw new Error("Whoops!");
} catch (e) {
  console.error(`${e.name}: ${e.message}`);
}
```

### Handling a specific error type

You can choose to handle only specific error types by testing the error type with the `instanceof` keyword:

```js
try {
  foo.bar();
} catch (e) {
  if (e instanceof EvalError) {
    console.error(`${e.name}: ${e.message}`);
  } else if (e instanceof RangeError) {
    console.error(`${e.name}: ${e.message}`);
  }
  // etc.
  else {
    // If none of our cases matched leave the Error unhandled
    throw e;
  }
}
```

### Differentiate between similar errors

Sometimes a block of code can fail for reasons that require different handling, but which throw very similar errors (i.e., with the same type and message).

If you don't have control over the original errors that are thrown, one option is to catch them and throw new `Error` objects that have more specific messages.
The original error should be passed to the new `Error` in the constructor's `options` parameter as its `cause` property. This ensures that the original error and stack trace are available to higher-level try/catch blocks.

The example below shows this for two methods that would otherwise fail with similar errors (`doFailSomeWay()` and `doFailAnotherWay()`):

```js
function doWork() {
  try {
    doFailSomeWay();
  } catch (err) {
    throw new Error("Failed in some way", { cause: err });
  }
  try {
    doFailAnotherWay();
  } catch (err) {
    throw new Error("Failed in another way", { cause: err });
  }
}

try {
  doWork();
} catch (err) {
  switch (err.message) {
    case "Failed in some way":
      handleFailSomeWay(err.cause);
      break;
    case "Failed in another way":
      handleFailAnotherWay(err.cause);
      break;
  }
}
```

> **Note:**
> If you are making a library, you should prefer to use error cause to discriminate between different errors emitted — rather than asking your consumers to parse the error message. See the error cause page for an example.

Custom error types can also use the `cause` property, provided the subclasses' constructor passes the `options` parameter when calling `super()`. The `Error()` base class constructor will read `options.cause` and define the `cause` property on the new error instance.

```js
class MyError extends Error {
  constructor(message, options) {
    // Need to pass `options` as the second parameter to install the "cause" property.
    super(message, options);
  }
}

console.log(new MyError("test", { cause: new Error("cause") }).cause);
// Error: cause
```

### Custom error types

You might want to define your own error types deriving from `Error` to be able to `throw new MyError()` and use `instanceof MyError` to check the kind of error in the exception handler. This results in cleaner and more consistent error handling code.

See "What's a good way to extend Error in JavaScript?" on Stack Overflow for an in-depth discussion.

> **Warning:**
> Builtin subclassing cannot be reliably transpiled to pre-ES6 code, because there's no way to construct the base class with a particular `new.target` without `Reflect.construct()`. You need additional configuration or manually call `Object.setPrototypeOf(this, CustomError.prototype)` at the end of the constructor; otherwise, the constructed instance will not be a `CustomError` instance. See the TypeScript FAQ for more information.

> **Note:**
> Some browsers include the `CustomError` constructor in the stack trace when using ES2015 classes.

```js
class CustomError extends Error {
  constructor(foo = "bar", ...params) {
    // Pass <example-value> arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (non-standard)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = "CustomError";
    // Custom debugging information
    this.foo = foo;
    this.date = new Date();
  }
}

try {
  throw new CustomError("baz", "bazMessage");
} catch (e) {
  console.error(e.name); // CustomError
  console.error(e.foo); // baz
  console.error(e.message); // bazMessage
  console.error(e.stack); // stack trace
}
```

## See also

- Polyfill of `Error` with `cause` support in `core-js`
- es-shims polyfill of Error `cause`
- `throw`
- `try...catch`
- Stack trace API in the V8 docs
