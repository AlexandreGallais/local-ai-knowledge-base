---
title: "Notification: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notification/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Notification: error event

The **`error`** event of the `Notification` interface fires when something goes wrong with a `Notification` (in many cases an error preventing the notification from being displayed.)

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("error", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onerror = (event) => { }
```

## Event type

A generic `Event`.

## See also

- Using the Notifications API
