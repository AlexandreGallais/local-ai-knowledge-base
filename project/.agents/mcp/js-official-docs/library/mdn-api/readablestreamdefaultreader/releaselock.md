---
title: "ReadableStreamDefaultReader: releaseLock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreamdefaultreader/releaselock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamDefaultReader: releaseLock() method

The **`releaseLock()`** method of the `ReadableStreamDefaultReader` interface releases the reader's lock on the stream.

If the associated stream is errored when the lock is released, the reader will appear errored in that same way subsequently; otherwise, the reader will appear closed.

If the reader's lock is released while it still has pending read requests then the promises returned by the reader's `ReadableStreamDefaultReader.read()` method are immediately rejected with a `TypeError`.
Unread chunks remain in the stream's internal queue and can be read later by acquiring a new reader.

## Syntax

```js
releaseLock()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    Thrown if the source object is not a `ReadableStreamDefaultReader`.

## Examples

```js
function fetchStream() {
  const reader = stream.getReader();

  // …

  reader.releaseLock();

  // …
}
```

## See also

- `ReadableStreamDefaultReader()` constructor
- Using readable streams
