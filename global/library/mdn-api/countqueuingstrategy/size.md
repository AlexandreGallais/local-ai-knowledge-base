---
title: "CountQueuingStrategy: size() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/countqueuingstrategy/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CountQueuingStrategy: size() method

The **`size()`** method of the
`CountQueuingStrategy` interface always returns `1`, so that the
total queue size is a count of the number of chunks in the queue.

## Syntax

```js
size()
```

### Parameters

None.

### Return value

`1`.

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

- `CountQueuingStrategy()` constructor
