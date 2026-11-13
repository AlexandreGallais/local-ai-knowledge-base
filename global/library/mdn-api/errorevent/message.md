---
title: "ErrorEvent: message property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/message/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent: message property

The **`message`** read-only property of the `ErrorEvent` interface returns a string containing a human-readable error message describing the problem.

## Value

A string.

## Examples

```js
window.addEventListener("error", (ev) => {
  console.log(`The error message: ${ev.message}`);
});
```
