---
title: "ExtendableMessageEvent: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablemessageevent/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableMessageEvent: data property

The **`data`** read-only property of the
`ExtendableMessageEvent` interface returns the event's data. It can be any
data type.

## Value

Any data type.

## Examples

When the following code is used inside a service worker to respond to a push messages
by sending the data received via `PushMessageData` to the main context via
a channel message, the event
object of `onmessage` will be an `ExtendableMessageEvent`.

```js
let port;

self.addEventListener("push", (e) => {
  const obj = e.data.json();

  if (obj.action === "subscribe" || obj.action === "unsubscribe") {
    port.postMessage(obj);
  } else if (obj.action === "init" || obj.action === "chatMsg") {
    port.postMessage(obj);
  }
});

self.onmessage = (e) => {
  console.log(e.data);
  port = e.ports[0];
};
```

## See also

- Using Service Workers
- Service workers basic code example
- Channel Messaging
