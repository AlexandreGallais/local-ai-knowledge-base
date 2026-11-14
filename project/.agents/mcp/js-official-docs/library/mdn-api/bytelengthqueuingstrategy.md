---
title: "ByteLengthQueuingStrategy"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bytelengthqueuingstrategy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ByteLengthQueuingStrategy

The **`ByteLengthQueuingStrategy`** interface of the Streams API provides a built-in byte length queuing strategy that can be used when constructing streams.

## Constructor

- `ByteLengthQueuingStrategy()`
    Creates a new `ByteLengthQueuingStrategy` object instance.

## Instance properties

- `ByteLengthQueuingStrategy.highWaterMark` (read-only)
    The total number of bytes that can be contained in the internal queue before backpressure is applied.

## Instance methods

- `ByteLengthQueuingStrategy.size()`
    Returns the given chunk's `byteLength` property.

## Examples

```js
const queueingStrategy = new ByteLengthQueuingStrategy({ highWaterMark: 1024 });

const readableStream = new ReadableStream(
  {
    start(controller) {
      // …
    },
    pull(controller) {
      // …
    },
    cancel(err) {
      console.log("stream error:", err);
    },
  },
  queueingStrategy,
);

const size = queueingStrategy.size(chunk);
```

## See also

- `Streams API`
- Internal queues and queuing strategies
- `ByteLengthQueuingStrategy()` constructor
