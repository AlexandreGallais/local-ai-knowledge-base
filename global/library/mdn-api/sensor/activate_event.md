---
title: "Sensor: activate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sensor/activate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sensor: activate event

The **`activate`** event is fired when a sensor becomes activated. It means that it will start obtaining readings.

The `Sensor` interface is a base class, `onactivate` and the `activate` event may only be used
on one of the derived classes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("activate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onactivate = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

### Log when an accelerometer is ready to measure

This example adds an event listener to log the activation of an `Accelerometer`.

```js
const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("activate", () => console.log("Ready to measure."));
acl.start();
```

## See also

- Sensor `error` event
- Sensor `reading` event
