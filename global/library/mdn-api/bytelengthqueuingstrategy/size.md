---
title: "ByteLengthQueuingStrategy: size() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bytelengthqueuingstrategy/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ByteLengthQueuingStrategy: size() method

The **`size()`** method of the
`ByteLengthQueuingStrategy` interface returns the given chunk's
`byteLength` property.

## Syntax

```js
size(chunk)
```

### Parameters

- `chunk`
    A chunk of data being passed through the stream.

### Return value

An integer representing the byte length of the given chunk.

## Examples

```js
const queuingStrategy = new ByteLengthQueuingStrategy({ highWaterMark: 1 });

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
```

## See also

- `ByteLengthQueuingStrategy()` constructor
