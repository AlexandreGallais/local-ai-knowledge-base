---
title: "WritableStreamDefaultWriter: desiredSize property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/desiredsize/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: desiredSize property

The **`desiredSize`** read-only property of the
`WritableStreamDefaultWriter` interface returns the desired size required
to fill the stream's internal queue.

## Value

A number, or `null`.

The number can be negative if the queue is over-full. When a custom queuing strategy is used, its chunk sizes can cause the number to have a fractional component. The value is `null` if the stream is erroring or errored, and `0` if it is closed.

### Exceptions

- `TypeError`
    The writer's lock is released.

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

// …

// return stream's desired size
const size = writer.desiredSize;
```
