---
title: "Error: lineNumber"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/linenumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error: lineNumber

The **`lineNumber`** data property of an `Error` instance contains the line number in the file that raised this error.

## Value

A positive integer.

## Examples

### Using lineNumber

```js
try {
  throw new Error("Could not parse input");
} catch (err) {
  console.log(err.lineNumber); // 2
}
```

### Alternative example using error event

```js
window.addEventListener("error", (e) => {
  console.log(e.lineNumber); // 5
});
const e = new Error("Could not parse input");
throw e;
```

This is not a standard feature and lacks widespread support. See the browser compatibility table below.

## Specifications

Not part of any standard.

## See also

- `Error.prototype.stack`
- `Error.prototype.columnNumber`
- `Error.prototype.fileName`
