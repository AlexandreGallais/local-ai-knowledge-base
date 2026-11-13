---
title: "PerformanceEventTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming

The `PerformanceEventTiming` interface of the Event Timing API provides insights into the latency of certain event types triggered by user interaction.

This interface inherits methods and properties from its parent, `PerformanceEntry`:

## Constructor

This interface has no constructor on its own. See the example below for how to typically get the information the `PerformanceEventTiming` interface holds.

## Instance properties

This interface extends the following `PerformanceEntry` properties for event timing performance entry types by qualifying them as follows:

- `PerformanceEntry.duration` (read-only)
    Returns a `DOMHighResTimeStamp` representing the time from `startTime` to the next rendering paint (rounded to the nearest 8ms).
- `PerformanceEntry.entryType` (read-only)
    Returns `"event"` (for long events) or `"first-input"` (for the first user interaction).
- `PerformanceEntry.name` (read-only)
    Returns the associated event's type.
- `PerformanceEntry.startTime` (read-only)
    Returns a `DOMHighResTimeStamp` representing the associated event's `timestamp` property. This is the time the event was created and can be considered as a proxy for the time the user interaction occurred.

This interface also supports the following properties:

- `PerformanceEventTiming.cancelable` (read-only)
    Returns the associated event's `cancelable` property.
- `PerformanceEventTiming.interactionId` (read-only)
    Returns the ID that uniquely identifies the user interaction which triggered the associated event.
- `PerformanceEventTiming.processingStart` (read-only)
    Returns a `DOMHighResTimeStamp` representing the time at which event dispatch started. To measure the time between a user action and the time the event handler starts to run, calculate `processingStart-startTime`.
- `PerformanceEventTiming.processingEnd` (read-only)
    Returns a `DOMHighResTimeStamp` representing the time at which the event dispatch ended. To measure the time the event handler took to run, calculate `processingEnd-processingStart`.
- `PerformanceEventTiming.target` (read-only)
    Returns the associated event's last target, if it is not removed.

## Instance methods

- `PerformanceEventTiming.toJSON()`
    Overrides the `PerformanceEntry.toJSON()` method to return a JSON representation of the `PerformanceEventTiming` object.

## Description

This API enables visibility into slow events by providing event timestamps and duration for certain event types (see below). For example, you can monitor the time between a user action and the start of its event handler, or the time an event handler takes to run.

This API is particularly useful for measuring the Interaction to Next Paint (INP): the longest time (minus some outliers) from the point when a user interacts with your app to the point until the browser was actually able to respond to that interaction.

You typically work with `PerformanceEventTiming` objects by creating a `PerformanceObserver` instance and then calling its `observe()` method, passing in `"event"` or `"first-input"` as the value of the `type` option. The `PerformanceObserver` object's callback will then be called with a list of `PerformanceEventTiming` objects which you can analyze. See the example below for more.

By default, `PerformanceEventTiming` entries are exposed when their `duration` is 104ms or greater. Research suggests that user input that is not handled within 100ms is considered slow and 104ms is the first multiple of 8 greater than 100ms (for security reasons, this API is rounded to the nearest multiple of 8ms).
However, you can set the `PerformanceObserver` to a different threshold using the `durationThreshold` option in the `observe()` method.

Note that entries are buffered only when their `duration` is 104ms or more, and setting `durationThreshold` doesn't change this.
The `"first-input"` entry is an exception: it is reported even if its `duration` is below the threshold, and it is buffered even if its `duration` is below 104ms.

### Events exposed

The following event types are exposed by the Event Timing API:

       | Click events
       |
        `auxclick`,
        `click`,
        `contextmenu`,
        `dblclick`

       | Composition events
       |
        `compositionend`,
        `compositionstart`,
        `compositionupdate`

       | Drag & drop events
       |
        `dragend`,
        `dragenter`,
        `dragleave`,
        `dragover`,
        `dragstart`,
        `drop`

       | Input events
       |
        `beforeinput`,
        `input`

       | Keyboard events
       |
        `keydown`,
        `keypress`,
        `keyup`

       | Mouse events
       |
        `mousedown`,
        `mouseenter`,
        `mouseleave`,
        `mouseout`,
        `mouseover`,
        `mouseup`

       | Pointer events
       |
        `pointerover`,
        `pointerenter`,
        `pointerdown`,
        `pointerup`,
        `pointercancel`,
        `pointerout`,
        `pointerleave`,
        `gotpointercapture`,
        `lostpointercapture`

       | Touch events
       |
        `touchstart`,
        `touchend`,
        `touchcancel`

Note that the following events are not included in the list because they are continuous events and no meaningful event counts or performance metrics can be obtained at this point: `mousemove`, `pointermove`,
`pointerrawupdate`, `touchmove`, `wheel`, `drag`.

To get a list of all exposed events, you can also look up keys in the `performance.eventCounts` map:

```js
const exposedEventsList = [...performance.eventCounts.keys()];
```

## Examples

### Getting event timing information

To get event timing information, create a `PerformanceObserver` instance and then call its `observe()` method, passing in `"event"` or `"first-input"` as the value of the `type` option. You also need to set `buffered` to `true` to get access to events the user agent buffered while constructing the document. The `PerformanceObserver` object's callback will then be called with a list of `PerformanceEventTiming` objects which you can analyze.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    // Full duration
    const duration = entry.duration;

    // Input delay (before processing event)
    const delay = entry.processingStart - entry.startTime;

    // Synchronous event processing time
    // (between start and end dispatch)
    const eventHandlerTime = entry.processingEnd - entry.processingStart;
    console.log(`Total duration: ${duration}`);
    console.log(`Event delay: ${delay}`);
    console.log(`Event handler duration: ${eventHandlerTime}`);
  });
});

// Register the observer for events
observer.observe({ type: "event", buffered: true });
```

You can also set a different `durationThreshold`. The default is 104ms and the minimum possible duration threshold is 16ms.
This call gets past entries of 104ms or more and new entries of 16ms or more, because the buffer always uses the 104ms default.

```js
observer.observe({ type: "event", durationThreshold: 16, buffered: true });
```

## See also

- Intersection Observer API
- Page Visibility API
