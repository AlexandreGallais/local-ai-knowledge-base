---
title: "PerformanceEntry: startTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceentry/starttime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEntry: startTime property

The read-only **`startTime`** property returns the first `timestamp` recorded for this `PerformanceEntry`. The meaning of this property depends on the value of this entry's `entryType`.

## Value

A `DOMHighResTimeStamp` representing the first timestamp when the
`PerformanceEntry` was created.

The meaning of this property depends on the value of this performance entry's `entryType`:

- `container`
    The value of this entry's `paintTime`.
- `element`
    Either the value of this entry's `renderTime` if it is not `0`, otherwise the value of this entry's `loadTime`.
- `event`
    The time the event was created, i.e., the event's `timeStamp` property.
- `first-input`
    The time the first input event was created, i.e., that event's `timeStamp`.
- `largest-contentful-paint`
    The value of this entry's `renderTime` if it is not `0`, otherwise the value of this entry's `loadTime`.
- `layout-shift`
    The time when the layout shift started.
- `longtask`
    The time when the task started.
- `mark`
    The time at which the mark was created by a call to `performance.mark()`.
- `measure`
    The time at which the measure was created by a call to `performance.measure()`.
- `navigation`
    Always `0`.
- `paint`
    The time when the paint occurred.
- `resource`
    The time the resource fetch started, including redirects. If there are no HTTP redirects or their timing information is not exposed, this value is equivalent to `PerformanceResourceTiming.fetchStart`. Otherwise, this value can be earlier than `fetchStart`.
- `taskattribution`
    Always `0`.
- `visibility-state`
    The time when the visibility state change occurred.

## Examples

### Using the startTime property

The following example shows the use of the `startTime` property which you can log during performance observation.

Note: The `performance.mark()` method allows you to set your own `startTime`, and the `performance.measure()` method allows you to set the start of the measure.

```js
performance.mark("my-mark");
performance.mark("my-other-mark", { startTime: 12.5 });

loginButton.addEventListener("click", (clickEvent) => {
  performance.measure("login-click", { start: clickEvent.timeStamp });
});

function perfObserver(list, observer) {
  list.getEntries().forEach((entry) => {
    if (entry.entryType === "mark") {
      console.log(`${entry.name}'s startTime: ${entry.startTime}`);
    }
    if (entry.entryType === "measure") {
      console.log(`${entry.name}'s duration: ${entry.duration}`);
    }
  });
}
const observer = new PerformanceObserver(perfObserver);
observer.observe({ entryTypes: ["measure", "mark"] });
```
