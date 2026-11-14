---
title: "Performance: resourcetimingbufferfull event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/resourcetimingbufferfull_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: resourcetimingbufferfull event

The `resourcetimingbufferfull` event is fired when the browser's resource timing buffer is full.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("resourcetimingbufferfull", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresourcetimingbufferfull = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Increasing size when buffer is full

The following example listens for the `resourcetimingbufferfull` event and increases the buffer size using the `setResourceTimingBufferSize()` method.

```js
function increaseFilledBufferSize(event) {
  console.log(
    "WARNING: Resource Timing Buffer is FULL! Increasing buffer size to 500.",
  );
  performance.setResourceTimingBufferSize(500);
}

performance.addEventListener(
  "resourcetimingbufferfull",
  increaseFilledBufferSize,
);
```

## See also

- `Performance.clearResourceTimings()`
- `Performance.setResourceTimingBufferSize()`
