---
title: "ReadableStreamBYOBReader: ReadableStreamBYOBReader() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobreader/readablestreambyobreader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBReader: ReadableStreamBYOBReader() constructor

The **`ReadableStreamBYOBReader()`** constructor creates and returns a `ReadableStreamBYOBReader` object instance.

> **Note:**
> You generally wouldn't use this constructor manually;
> instead, you'd use the `ReadableStream.getReader()` method with the argument `"byob"`.

## Syntax

```js
new ReadableStreamBYOBReader(stream)
```

### Parameters

- `stream`
    The `ReadableStream` to be read.

### Return value

An instance of the `ReadableStreamBYOBReader` object.

### Exceptions

- `TypeError`
    Thrown if the supplied `stream` parameter is not a `ReadableStream`, or it is already locked for reading by another reader, or its stream controller is not a `ReadableByteStreamController`.

## Examples

The constructor is rarely called directly.
Instead call `ReadableStream.getReader()` as shown:

```js
const reader = stream.getReader({ mode: "byob" });
```

## See also

- `ReadableStreamBYOBReader`
- Using readable byte stream
