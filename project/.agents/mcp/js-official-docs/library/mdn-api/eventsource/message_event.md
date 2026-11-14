---
title: "EventSource: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventsource/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventSource: message event

The **`message`** event of the `EventSource` interface is fired when data is received through an event source.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("message", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessage = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

In this basic <example-value>, an `EventSource` is created to receive events from the server; a page with the name `sse.php` is responsible for generating the events.

```js
const evtSource = new EventSource("sse.php");
const eventList = document.querySelector("ul");

evtSource.addEventListener("message", (e) => {
  const newElement = document.createElement("li");

  newElement.textContent = `message: ${e.data}`;
  eventList.appendChild(newElement);
});
```

### Using the `onmessage` event handler property

You can also use the `onmessage` event handler property (but note that this replaces other event listeners added using `onmessage`, if any):

```js
evtSource.onmessage = (e) => {
  const newElement = document.createElement("li");

  newElement.textContent = `message: ${e.data}`;
  eventList.appendChild(newElement);
};
```

## See also

- Using server-sent events
- `open`
- `error`
