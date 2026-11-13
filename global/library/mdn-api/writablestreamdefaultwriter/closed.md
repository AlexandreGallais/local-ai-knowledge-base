---
title: "WritableStreamDefaultWriter: closed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/closed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: closed property

The **`closed`** read-only property of the
`WritableStreamDefaultWriter` interface returns a
`Promise` that fulfills if the stream becomes closed, or rejects if
the stream errors or the writer's lock is released.

## Value

A `Promise`.

## Examples

```js
const writableStream = new WritableStream(
  {
    start(controller) {},
    write(chunk, controller) {
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

// ..

// check if the stream is closed
writer.closed.then(() => {
  console.log("writer closed");
});
```
