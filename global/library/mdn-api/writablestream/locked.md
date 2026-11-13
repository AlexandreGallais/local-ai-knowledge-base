---
title: "WritableStream: locked property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestream/locked/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStream: locked property

The **`locked`** read-only property of the `WritableStream` interface returns a boolean indicating whether the `WritableStream` is locked to a writer.

## Value

A boolean value indicating whether or not the writable stream is locked.

## Examples

```js
const writableStream = new WritableStream(
  {
    write(chunk) {
      // …
    },
    close() {
      // …
    },
    abort(err) {
      // …
    },
  },
  queuingStrategy,
);

// …

const writer = writableStream.getWriter();

writableStream.locked;
// should return true, as the stream has been locked to a writer
```
