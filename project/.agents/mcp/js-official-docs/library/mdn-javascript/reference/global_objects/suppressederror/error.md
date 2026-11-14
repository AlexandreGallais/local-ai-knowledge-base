---
title: "SuppressedError: error"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/suppressederror/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SuppressedError: error

The **`error`** data property of a `SuppressedError` instance contains a reference to the error that results in the suppression.

## Value

Any value. Like `cause`, you cannot assume it's an `Error` instance, although it usually is the case.

## Examples

### Using error

```js
try {
  throw new SuppressedError(
    new Error("New error"),
    new Error("Original error"),
    "Hello",
  );
} catch (e) {
  console.log(e.error); // Error: "New error"
}
```

## See also

- Polyfill of `SuppressedError` in `core-js`
- Control flow and error handling guide
- `SuppressedError`
- `Error`: `cause`
