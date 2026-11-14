---
title: "EventSource: open event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/open_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: open event

The **`open`** event of the `EventSource` interface is fired when a connection with an event source is opened.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("open", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onopen = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
const evtSource = new EventSource("sse.php");

// addEventListener version
evtSource.addEventListener("open", (e) => {
  console.log("The connection has been established.");
});

// onopen version (but note that this replaces other event listeners
// added using onopen, if any)
evtSource.onopen = (e) => {
  console.log("The connection has been established.");
};
```

## See also

- Using server-sent events
- `error`
- `message`
