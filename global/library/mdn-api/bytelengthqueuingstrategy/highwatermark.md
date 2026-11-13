---
title: "ByteLengthQueuingStrategy: highWaterMark property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bytelengthqueuingstrategy/highwatermark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ByteLengthQueuingStrategy: highWaterMark property

The read-only **`ByteLengthQueuingStrategy.highWaterMark`** property returns the total number of bytes that can be contained in the internal queue before backpressure is applied.

> **Note:**
> Unlike `CountQueuingStrategy()` where the `highWaterMark` property specifies a simple count of the number of chunks, with `ByteLengthQueuingStrategy()`, the `highWaterMark` parameter specifies a number of _bytes_ — specifically, given a stream of chunks, how many bytes worth of those chunks (rather than a count of how many of those chunks) can be contained in the internal queue before backpressure is applied.

## Values

An integer.

## Examples

```js
const queuingStrategy = new ByteLengthQueuingStrategy({
  highWaterMark: 1 * 1024,
});

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

- `ByteLengthQueuingStrategy()` constructor
