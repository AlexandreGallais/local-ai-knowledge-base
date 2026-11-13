---
title: "CountQueuingStrategy"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/countqueuingstrategy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CountQueuingStrategy

The **`CountQueuingStrategy`** interface of the Streams API provides a built-in chunk counting queuing strategy that can be used when constructing streams.

## Constructor

- `CountQueuingStrategy()`
    Creates a new `CountQueuingStrategy` object instance.

## Instance properties

- `CountQueuingStrategy.highWaterMark` (read-only)
    The total number of chunks that can be contained in the internal queue before backpressure is applied.

## Instance methods

- `CountQueuingStrategy.size()`
    Always returns `1`.

## Examples

```js
const queueingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });

const writableStream = new WritableStream(
  {
    // Implement the sink
    write(chunk) {
      // …
    },
    close() {
      // …
    },
    abort(err) {
      console.log("Sink error:", err);
    },
  },
  queueingStrategy,
);

const size = queueingStrategy.size();
```

## See also

- `Streams API`
- `CountQueuingStrategy()` constructor
- Internal queues and queuing strategies
