---
title: "CountQueuingStrategy: CountQueuingStrategy() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/countqueuingstrategy/countqueuingstrategy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CountQueuingStrategy: CountQueuingStrategy() constructor

The **`CountQueuingStrategy()`** constructor
creates and returns a `CountQueuingStrategy` object instance.

## Syntax

```js
new CountQueuingStrategy(options)
```

### Parameters

- `options`
    An object with the following property:
    - `highWaterMark`
        The total number of chunks that can be contained in the internal
        queue before backpressure is applied.

### Return value

An instance of the `CountQueuingStrategy` object.

### Exceptions

None.

## Examples

```js
const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });

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
  queuingStrategy,
);

const size = queuingStrategy.size();
```

## See also

- `CountQueuingStrategy`
