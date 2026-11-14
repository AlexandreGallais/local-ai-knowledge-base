---
title: "RangeError() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/rangeerror/rangeerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RangeError() constructor

The **`RangeError()`** constructor creates `RangeError` objects.

## Syntax

```js
new RangeError()
new RangeError(message)
new RangeError(message, options)
new RangeError(message, fileName)
new RangeError(message, fileName, lineNumber)

RangeError()
RangeError(message)
RangeError(message, options)
RangeError(message, fileName)
RangeError(message, fileName, lineNumber)
```

> **Note:**
> `RangeError()` can be called with or without `new`. Both create a new `RangeError` instance.

### Parameters

- `message` (optional)
    Human-readable description of the error.
- `options` (optional)
    An object that has the following properties:
    - `cause` (optional)
        A property indicating the specific cause of the error.
        When catching and re-throwing an error with a more-specific or useful error message, this property can be used to pass the original error.
- `fileName` (optional) (non-standard)
    The name of the file containing the code that caused the exception
- `lineNumber` (optional) (non-standard)
    The line number of the code that caused the exception

## Examples

### Using RangeError (for numeric values)

```js
function check(n) {
  if (!(n >= -500 && n <= 500)) {
    throw new RangeError("The argument must be between -500 and 500.");
  }
}

try {
  check(2000);
} catch (error) {
  if (error instanceof RangeError) {
    // Handle the error
  }
}
```

### Using RangeError (for non-numeric values)

```js
function check(value) {
  if (!["apple", "banana", "carrot"].includes(value)) {
    throw new RangeError(
      'The argument must be an "apple", "banana", or "carrot".',
    );
  }
}

try {
  check("cabbage");
} catch (error) {
  if (error instanceof RangeError) {
    // Handle the error
  }
}
```

## See also

- `Error`
- `Array`
- `Number.prototype.toExponential()`
- `Number.prototype.toFixed()`
- `Number.prototype.toPrecision()`
- `String.prototype.normalize()`
