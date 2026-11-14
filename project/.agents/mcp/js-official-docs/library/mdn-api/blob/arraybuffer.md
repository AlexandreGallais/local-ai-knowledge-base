---
title: "Blob: arrayBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/blob/arraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Blob: arrayBuffer() method

The **`arrayBuffer()`** method of the `Blob`
interface returns a `Promise` that resolves with the contents of the blob as
binary data contained in an `ArrayBuffer`.

## Syntax

```js
arrayBuffer()
```

### Parameters

None.

### Return value

A promise that resolves with an `ArrayBuffer` that contains the blob's
data in binary form.

### Exceptions

While this method doesn't throw exceptions, it may reject the promise. This can happen,
for example, if the reader used to fetch the blob's data throws an exception. Any
exceptions thrown while getting the data will be converted into rejections.

## Usage notes

While similar to the `FileReader.readAsArrayBuffer()` method,
`arrayBuffer()` returns a promise rather than being an event-based API, as is
the case with the `FileReader` interface's method.

## See also

- `Response.arrayBuffer()`
- Streams API
- `FileReader.readAsArrayBuffer()`
