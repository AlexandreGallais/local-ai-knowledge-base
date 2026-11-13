---
title: "Blob: stream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/stream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: stream() method

The **`stream()`** method of the `Blob` interface returns a `ReadableStream` which upon reading returns the data contained within the `Blob` as chunks of raw bytes.

## Syntax

```js
stream()
```

### Parameters

None.

### Return value

A `ReadableStream` which, upon reading, returns the contents of the
`Blob`.

## Usage notes

With `stream()` and the returned `ReadableStream`, you gain
several interesting capabilities:

- Call `getReader()` on the returned stream
  to get an object to use to read the data from the blob using methods such as the
  `ReadableStreamDefaultReader` interface's
  `read()` method.
- Call the returned stream's `pipeTo()` method
  to pipe the blob's data to a writable stream.
- Call the returned stream's `tee()` method to
  **tee** the readable stream. This returns an array containing two new
  `ReadableStream` objects, each of which returns the contents of the
  `Blob`.
- Call the returned stream's `pipeThrough()` method to pipe the stream through a `TransformStream` or any other readable and writable pair.
  > **Note:**
  > `Blob.textStream()` is a useful shortcut that immediately returns a `ReadableStream` of UTF-8 text chunks.

## See also

- `Response.body`
- Streams API
