---
title: "ReadableStreamBYOBReader: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobreader/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBReader: closed property

The **`closed`** read-only property of the `ReadableStreamBYOBReader` interface returns a `Promise` that fulfills when the stream closes, or rejects if the stream throws an error or the reader's lock is released.

This property enables you to write code that responds to an end to the streaming process.

## Value

A `Promise`.

## Examples

The code below shows the pattern for handling the closed/error state of a BYOBReader.

```js
const reader = stream.getReader({ mode: "byob" });
reader.closed
  .then(() => {
    // Resolved - code to handle stream closing
  })
  .catch(() => {
    // Rejected - code to handle error
  });
```

## See also

- `ReadableStreamBYOBReader()` constructor
- Using readable byte stream
