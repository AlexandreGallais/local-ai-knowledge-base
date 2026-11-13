---
title: "CloseEvent: wasClean property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closeevent/wasclean/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseEvent: wasClean property

The **`wasClean`** read-only property of the `CloseEvent` interface returns `true` if the connection closed cleanly.

## Value

A boolean value. True if the connection closed cleanly, false otherwise.

## Examples

The following example prints the value of `wasClean` to the console.

```js
WebSocket.onclose = (event) => {
  console.log(event.wasClean);
};
```
