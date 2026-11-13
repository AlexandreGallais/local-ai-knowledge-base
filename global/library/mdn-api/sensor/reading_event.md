---
title: "Sensor: reading event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sensor/reading_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sensor: reading event

The **`reading`** event is fired when a new reading is available on a sensor.

The `Sensor` interface is a base class, `onreading` and the `reading` event may only be used
on one of the derived classes.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("reading", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onreading = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

### Reading acceleration

This example adds an event listener to read acceleration values of an `Accelerometer`. It reads sixty times a second.

```js
const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
  console.log(`Acceleration along the X-axis ${acl.x}`);
  console.log(`Acceleration along the Y-axis ${acl.y}`);
  console.log(`Acceleration along the Z-axis ${acl.z}`);
});
acl.start();
```

## See also

- Sensor `activate` event
- Sensor `error` event
