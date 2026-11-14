---
title: "SuppressedError() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/suppressederror/suppressederror/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SuppressedError() constructor

The **`SuppressedError()`** constructor creates `SuppressedError` objects.

## Syntax

```js
new SuppressedError(error, suppressed)
new SuppressedError(error, suppressed, message)

SuppressedError(error, suppressed)
SuppressedError(error, suppressed, message)
```

> **Note:**
> `SuppressedError()` can be called with or without `new`. Both create a new `SuppressedError` instance.

### Parameters

- `error`
    The new error that results in the suppression of `suppressed`.
- `suppressed`
    The error that was originally thrown and is now suppressed.
- `message` (optional)
    An optional human-readable description of the aggregate error.

> **Note:**
> `SuppressedError()` does not accept `options` like `Error()` and other subclasses do, because the semantics of `cause` overlaps with `suppressed`.

## Examples

### Creating a SuppressedError

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e.suppressed); // Error: "Original error"
  console.log(e.error); // Error: "New error"
}
```

## See also

- Polyfill of `SuppressedError` in `core-js`
