---
title: "PerformanceEventTiming: interactionId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceeventtiming/interactionid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceEventTiming: interactionId property

The read-only **`interactionId`** property of the `PerformanceEventTiming` interface returns an ID that uniquely identifies a user interaction which triggered a series of associated events.

## Value

A number. For event types where an interaction ID is not calculated the value is 0.

## Description

When a user interacts with a web page, a user interaction (for example a click) usually triggers a sequence of events, such as `pointerdown`, `pointerup`, and `click` events.
To measure the latency of this series of events, the events share the same `interactionId`.

An `interactionId` is only computed for the following event types belonging to a user interaction. It is `0` otherwise.

| Event types                                                                                                                                               | User interaction      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `pointerdown`, `pointerup`, `click` | click / tap / drag    |
| `contextmenu`                                                                                                   | context menu          |
| `input`                                                                                                               | IME composition input |
| `keydown`, `keyup`                                                              | key press             |

The `interactionId` is also needed to calculate the Interaction to next paint metric, which helps analyze responsiveness to user interaction over the lifetime of a page.

## Examples

### Using interactionId

The following example groups the durations of observed events by interaction ID.
By default, only events with a duration of at least 104 milliseconds are reported.
The `eventLatencies` map can then be used to find events with maximum duration for a user interaction, for example.

```js
// The key is the interaction ID.
const eventLatencies = new Map();

const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.interactionId > 0) {
      const interactionId = entry.interactionId;
      if (!eventLatencies.has(interactionId)) {
        eventLatencies.set(interactionId, []);
      }
      eventLatencies.get(interactionId).push(entry.duration);
    }
  });

  // Log the maximum observed event duration for each interaction.
  eventLatencies.forEach((durations, interactionId) => {
    console.log(interactionId, Math.max(...durations));
  });
});

observer.observe({ type: "event", buffered: true });
```
