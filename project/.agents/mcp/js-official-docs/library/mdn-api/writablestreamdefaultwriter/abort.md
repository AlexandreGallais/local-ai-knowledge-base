---
title: "WritableStreamDefaultWriter: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestreamdefaultwriter/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStreamDefaultWriter: abort() method

The **`abort()`** method of the
`WritableStreamDefaultWriter` interface aborts the stream, signaling that
the producer can no longer successfully write to the stream and it is to be immediately
moved to an error state, with any queued writes discarded.

If the writer is active, the `abort()` method behaves the same as that for
the associated stream (`WritableStream.abort()`). If not, it returns a
rejected promise.

## Syntax

```js
abort()
abort(reason)
```

### Parameters

- `reason` (optional)
    A string representing a human-readable reason for the abort.

### Return value

A `Promise`, which fulfills to `undefined` when the stream is aborted, or
rejects with an error if the writer was inactive or the receiver stream is invalid.

### Exceptions

- `TypeError`
    The stream you are trying to abort is not a `WritableStream`, or it is
    locked.

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

// abort the stream when desired
await writer.abort("WritableStream aborted. Reason: ...");
```
