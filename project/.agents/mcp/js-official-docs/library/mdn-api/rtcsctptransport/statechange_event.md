---
title: "RTCSctpTransport: statechange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcsctptransport/statechange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCSctpTransport: statechange event

A **`statechange`** event is sent to an `RTCSctpTransport` to provide notification when the `RTCSctpTransport.state` property has changed.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("statechange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onstatechange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Given an `RTCSctpTransport`, `transport`, and an `updateStatus()` function that presents connection state information to the user, this code sets up an event handler to let the user know when the transport is connected.

```js
transport.addEventListener("statechange", (event) => {
  switch (transport.state) {
    case "connected":
      updateStatus("Connection started");
      break;
  }
});
```

Using `onstatechange`, it looks like this (but note that this replaces other event listeners added using `onstatechange`, if any):

```js
transport.onstatechange = (event) => {
  switch (transport.state) {
    case "connected":
      updateStatus("Connection started");
      break;
  }
};
```

## See also

- WebRTC API
- `RTCSctpTransport.state`
