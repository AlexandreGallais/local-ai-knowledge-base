---
title: "EventSource: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: error event

The **`error`** event of the `EventSource` API is fired when a connection with an event source fails to be opened.

This event is not cancelable and does not bubble.

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

## Examples

```js
const evtSource = new EventSource("sse.php");

// addEventListener version
evtSource.addEventListener("error", (e) => {
  console.log("An error occurred while attempting to connect.");
});

// onerror version (but note that this replaces other event listeners
// added using onerror, if any)
evtSource.onerror = (e) => {
  console.log("An error occurred while attempting to connect.");
};
```

## See also

- Using server-sent events
- `open`
- `message`
