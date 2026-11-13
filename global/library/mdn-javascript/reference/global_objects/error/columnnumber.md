---
title: "Error: columnNumber"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/columnnumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error: columnNumber

The **`columnNumber`** data property of an `Error` instance contains the column number in the line of the file that raised this error.

## Value

A positive integer.

## Examples

### Using columnNumber

```js
try {
  throw new Error("Could not parse input");
} catch (err) {
  console.log(err.columnNumber); // 9
}
```

## Specifications

Not part of any standard.

## See also

- `Error.prototype.stack`
- `Error.prototype.lineNumber`
- `Error.prototype.fileName`
