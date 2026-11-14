---
title: "MediaKeySession: keystatuseschange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediakeysession/keystatuseschange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaKeySession: keystatuseschange event

The **`keystatuseschange`** event of the `MediaKeySession` API fires when there has been a change in the keys or their statuses within a session.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("keystatuseschange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onkeystatuseschange = (event) => { }
```

## Event type

An `ExtendableEvent`. Inherits from `Event`.
