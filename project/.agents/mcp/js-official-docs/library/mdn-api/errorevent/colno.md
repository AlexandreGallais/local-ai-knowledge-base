---
title: "ErrorEvent: colno property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/colno/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent: colno property

The **`colno`** read-only property of the `ErrorEvent` interface returns an integer containing the column number of the script file on which the error occurred.

## Value

An integer.

## Examples

```js
window.addEventListener("error", (ev) => {
  console.log(`The error occur in column: ${ev.colno}`);
});
```
