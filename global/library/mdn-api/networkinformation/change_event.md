---
title: "NetworkInformation: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/networkinformation/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NetworkInformation: change event

The **`change`** event of the `NetworkInformation` interface fires when connection information changes, and the event is received by the `NetworkInformation` object.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
// Get the connection type.
const type = navigator.connection.type;

function changeHandler(e) {
  // Handle change of connection type here.
}

// Register for event changes (but note that this replaces other event listeners
// added using onchange, if any):
navigator.connection.onchange = changeHandler;

// Another way: navigator.connection.addEventListener('change', changeHandler);
```
