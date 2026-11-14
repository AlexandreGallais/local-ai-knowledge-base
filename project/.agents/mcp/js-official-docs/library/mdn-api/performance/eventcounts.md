---
title: "Performance: eventCounts property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/eventcounts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: eventCounts property

The read-only `performance.eventCounts` property is an `EventCounts` map containing the number of events which have been dispatched per event type since the page was loaded.

Not all event types are exposed. You can only get counts for event types supported by the `PerformanceEventTiming` interface.

## Value

An `EventCounts` map.
(A read-only `Map` without the `clear()`, `delete()`, and `set()` methods).

## Examples

### Reporting event types and their counts

If you like to send event counts to your analytics, you may want to implement a function like `sendToEventAnalytics` which takes the event counts from the `performance.eventCounts` map and then uses the Fetch API to post the data to your endpoint.

```js
// Report all exposed events
for (const [type, count] of performance.eventCounts.entries()) {
  // sendToEventAnalytics(type, count);
}

// Report a specific event
const clickCount = performance.eventCounts.get("click");
// sendToEventAnalytics("click", clickCount);

// Check if an event count is exposed for a type
const isExposed = performance.eventCounts.has("mousemove"); // false
```

## See also

- `EventCounts`
- `PerformanceEventTiming`
- `Map`
