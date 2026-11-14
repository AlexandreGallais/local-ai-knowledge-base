---
title: "PerformanceEntry: duration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceentry/duration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEntry: duration property

The read-only **`duration`** property returns a `timestamp` that is the duration of the `performance entry`. The meaning of this property depends on the value of this entry's `entryType`.

## Value

A `DOMHighResTimeStamp` representing the duration of the `performance entry`. If the duration concept doesn't apply for a particular performance metric, a duration of `0` is returned.

The meaning of this property depends on the value of this performance entry's `entryType`:

- `event`
    The time from the event's `startTime` to the next rendering paint (rounded to the nearest 8ms).
- `first-input`
    The time from the first input event's `startTime` to the next rendering paint (rounded to the nearest 8ms).
- `longtask`
    The elapsed time between the start and end of task, with a 1ms granularity.
- `measure`
    The duration of the measure.
- `navigation`
    The difference between the entry's `loadEventEnd` and `startTime` properties.
- `resource`
    The entry's `responseEnd` value minus the entry's `startTime` value.

For the following entry types, `duration` is not applicable, and in this case the value is always `0`:

- `container`
- `element`
- `largest-contentful-paint`
- `layout-shift`
- `mark`
- `paint`
- `taskattribution`
- `visibility-state`

## Examples

### Using the duration property

The following example logs all observed performance entries with a `duration` larger than `0`.

```js
function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.duration > 0) {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["measure", "mark", "resource"] });
```
