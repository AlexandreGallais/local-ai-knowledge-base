---
title: "FileReader: readAsArrayBuffer() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/filereader/readasarraybuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FileReader: readAsArrayBuffer() method

The **`readAsArrayBuffer()`** method of the `FileReader` interface is used to start reading the
contents of a specified `Blob` or `File`. When the read
operation is finished, the `readyState` property becomes
`DONE`, and the `loadend` event is
triggered. At that time, the `result` property
contains an `ArrayBuffer` representing the file's data.

> **Note:**
> The `Blob.arrayBuffer()` method is a newer promise-based API to read a
> file as an array buffer.

## Syntax

```js
readAsArrayBuffer(blob)
```

### Parameters

- `blob`
    The `Blob` or `File` from which to read.

### Return value

None (`undefined`).

## See also

- `FileReader`
