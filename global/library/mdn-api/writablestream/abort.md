---
title: "WritableStream: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/writablestream/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WritableStream: abort() method

The **`abort()`** method of the `WritableStream` interface aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be immediately moved to an error state, with any queued writes discarded.

## Syntax

```js
abort(reason)
```

### Parameters

- `reason`
    A string providing a human-readable reason for the abort.

### Return value

A `Promise`, which fulfills with `undefined`.

### Exceptions

- `TypeError`
    The stream you are trying to abort is not a `WritableStream`, or it is locked.

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

// abort the stream later on, when required
writableStream.abort();
```
