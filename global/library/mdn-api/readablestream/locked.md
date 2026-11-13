---
title: "ReadableStream: locked property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestream/locked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStream: locked property

The **`locked`** read-only property of the `ReadableStream` interface returns whether or not the readable stream is locked to a reader.

A readable stream can have at most one active reader at a time, and is locked to that reader until it is released.
A reader might be obtained using `ReadableStream.getReader()` and released using the reader's `releaseLock()` method.

## Value

A boolean value indicating whether or not the readable stream is locked.

## Examples

```js
const stream = new ReadableStream({
  // …
});

const reader = stream.getReader();

stream.locked;
// should return true, as the stream has been locked to a reader
```

## See also

- `ReadableStream()` constructor
- Using readable streams
