---
title: "WritableStreamDefaultWriter: releaseLock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/releaselock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: releaseLock() method

The **`releaseLock()`** method of the
`WritableStreamDefaultWriter` interface releases the writer's lock on the
corresponding stream. After the lock is released, the writer is no longer active. If the
associated stream is errored when the lock is released, the writer will appear errored
in the same way from now on; otherwise, the writer will appear closed.

## Syntax

```js
releaseLock()
```

### Parameters

None.

### Return value

None (`undefined`).

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

// release writer's lock on the stream when desired
writer.releaseLock();
```
