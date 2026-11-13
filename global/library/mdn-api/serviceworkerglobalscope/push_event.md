---
title: "ServiceWorkerGlobalScope: push event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/push_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: push event

The **`push`** event is sent to a service worker's global scope (represented by the `ServiceWorkerGlobalScope` interface) when the service worker has received a push message.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("push", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpush = (event) => { }
```

## Event type

A `PushEvent`. Inherits from `Event`.

## Example

This example sets up a handler for `push` events that takes JSON data, parses it, and dispatches the message for handling based on information contained within the message.

```js
self.addEventListener("push", (event) => {
  let message = event.data.json();

  switch (message.type) {
    case "init":
      doInit();
      break;
    case "shutdown":
      doShutdown();
      break;
  }
});
```

## See also

- Using the Push API
- `pushsubscriptionchange` event
