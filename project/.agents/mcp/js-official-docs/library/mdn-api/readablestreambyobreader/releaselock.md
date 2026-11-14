---
title: "ReadableStreamBYOBReader: releaseLock() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobreader/releaselock/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBReader: releaseLock() method

The **`releaseLock()`** method of the `ReadableStreamBYOBReader` interface releases the reader's lock on the stream.
After the lock is released, the reader is no longer active.

The reader will appear errored if the associated stream is errored when the lock is released; otherwise, the reader will appear closed.

If the reader's lock is released while it still has pending read requests then the promises returned by the reader's `ReadableStreamBYOBReader.read()` method are immediately rejected with a `TypeError`.
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
    Thrown if the source object is not a `ReadableStreamBYOBReader`.

## Examples

A trivial examples is shown below.
A lock is created as soon as the reader is created on the stream.

```js
const reader = stream.getReader({ mode: "byob" });
reader.releaseLock();
```

## See also

- `ReadableStreamBYOBReader()` constructor
- Using readable byte stream
