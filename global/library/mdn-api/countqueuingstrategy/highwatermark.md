---
title: "CountQueuingStrategy: highWaterMark property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/countqueuingstrategy/highwatermark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CountQueuingStrategy: highWaterMark property

The read-only **`CountQueuingStrategy.highWaterMark`** property returns the total number of chunks that can be contained in the internal queue before backpressure is applied.

## Values

An integer representing a number of chunks.

## Examples

```js
const queueingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });

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
  queuingStrategy,
);

const size = queuingStrategy.size(chunk);
console.log(`highWaterMark value: ${queuingStrategy.highWaterMark}$`);
```

## See also

- `CountQueuingStrategy()` constructor
