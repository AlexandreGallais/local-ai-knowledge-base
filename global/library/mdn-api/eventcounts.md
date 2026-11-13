---
title: "EventCounts"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/eventcounts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# EventCounts

The **`EventCounts`** interface of the Performance API provides the number of events that have been dispatched for each event type.

An `EventCounts` instance is a read-only `Map`-like object, in which each key is the name string for an event type, and the corresponding value is an integer indicating the number of events that have been dispatched for that event type.

## Constructor

This interface has no constructor. You typically get an instance of this object using the `performance.eventCounts` property.

## Instance properties

- `size`
    See `Map.prototype.size` for details.

## Instance methods

- `entries()`
    See `Map.prototype.entries()` for details.
- `forEach()`
    See `Map.prototype.forEach()` for details.
- `get()`
    See `Map.prototype.get()` for details.
- `has()`
    See `Map.prototype.has()` for details.
- `keys()`
    See `Map.prototype.keys()` for details.
- `values()`
    See `Map.prototype.values()` for details.

## Examples

### Working with EventCount maps

Below are a few examples to get information from an `EventCounts` map. Note that the map is read-only and the `clear()`, `delete()`, and `set()` methods aren't available.

```js
for (const [type, count] of performance.eventCounts.entries()) {
  console.log(type, count);
}

const clickCount = performance.eventCounts.get("click");

const isExposed = performance.eventCounts.has("mousemove");
const exposedEventsCount = performance.eventCounts.size;
const exposedEventsList = [...performance.eventCounts.keys()];
```

## See also

- `performance.eventCounts`
- `PerformanceEventTiming`
- `Map`
