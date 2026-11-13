---
title: "InternalError() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/internalerror/internalerror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# InternalError() constructor

The **`InternalError()`** constructor creates `InternalError` objects.

## Syntax

```js
new InternalError()
new InternalError(message)
new InternalError(message, options)
new InternalError(message, fileName)
new InternalError(message, fileName, lineNumber)

InternalError()
InternalError(message)
InternalError(message, options)
InternalError(message, fileName)
InternalError(message, fileName, lineNumber)
```

> **Note:**
> `InternalError()` can be called with or without `new`. Both create a new `InternalError` instance.

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

### Creating a new InternalError

```js
new InternalError("Engine failure");
```

## Specifications

Not part of any standard.

## See also

- `Error`
