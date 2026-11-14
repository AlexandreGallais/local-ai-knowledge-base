---
title: "CloseEvent: reason property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closeevent/reason/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseEvent: reason property

The **`reason`** read-only property of the `CloseEvent` interface returns the WebSocket connection close reason the server gave for closing the connection; that is, a concise human-readable prose explanation for the closure.

## Value

A string.

## Examples

The following example prints the value of `reason` to the console.

```js
WebSocket.onclose = (event) => {
  console.log(event.reason);
};
```

## See also

- RFC 6455 (the WebSocket Protocol specification)
