---
title: "ErrorEvent: error property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/errorevent/error/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ErrorEvent: error property

The **`error`** read-only property of the `ErrorEvent` interface returns a JavaScript value, such as an `Error` or `DOMException`, representing the error associated with this event.

## Value

Any valid JavaScript value.

## Examples

```js
window.addEventListener("error", (ev) => {
  console.log(`The error instance: ${ev.error}`);
});
```
