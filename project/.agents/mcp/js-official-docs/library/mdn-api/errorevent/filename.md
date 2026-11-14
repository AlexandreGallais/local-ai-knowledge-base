---
title: "ErrorEvent: filename property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/filename/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent: filename property

The **`filename`** read-only property of the `ErrorEvent` interface returns a string containing the name of the script file in which the error occurred.

## Value

A string.

## Examples

```js
window.addEventListener("error", (ev) => {
  console.log(`The error occur in file: ${ev.filename}`);
});
```
