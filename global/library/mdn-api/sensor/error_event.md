---
title: "Sensor: error event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sensor/error_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sensor: error event

The **`error`** event is fired when an exception occurs on a sensor.

The `Sensor` interface is a base class, `onerror` and the `error` event may only be used
on one of the derived classes.

After this event has occurred, the `Sensor` object becomes idle. If the sensor was reading values, it will stop until it restarts.

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

A `SensorErrorEvent`. Inherits from `Event`.

## Examples

### Log accelerometer exceptions

This example adds an event listener to log errors that occurred on an `Accelerometer`.

```js
const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("error", (error) => console.log(`Error: ${error.name}`));
acl.start();
```

## See also

- Sensor `activate` event
- Sensor `reading` event
