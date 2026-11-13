---
title: "Error: fileName"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/error/filename/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Error: fileName

The **`fileName`** data property of an `Error` instance contains the path to the file that raised this error.

## Value

A string.

## Description

This non-standard property contains the path to the file that raised this error. If called from a debugger context, the Firefox Developer Tools for example, "debugger eval code" is returned.

## Examples

### Using fileName

```js
const e = new Error("Could not parse input");
throw e;
// e.fileName could look like "file:///C:/example.html"
```

## Specifications

Not part of any standard.

## See also

- `Error.prototype.stack`
- `Error.prototype.columnNumber`
- `Error.prototype.lineNumber`
