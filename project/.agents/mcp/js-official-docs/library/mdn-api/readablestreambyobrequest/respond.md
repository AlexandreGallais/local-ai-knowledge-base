---
title: "ReadableStreamBYOBRequest: respond() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/readablestreambyobrequest/respond/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReadableStreamBYOBRequest: respond() method

The **`respond()`** method of the `ReadableStreamBYOBRequest` interface is used to signal to the associated readable byte stream that the specified number of bytes were written into the `ReadableStreamBYOBRequest.view`.

After this method is called, the `view` will be transferred and no longer modifiable.

## Syntax

```js
respond(bytesWritten)
```

### Parameters

- `bytesWritten`
    The number of bytes written into `ReadableStreamBYOBRequest.view`.

### Return value

None (`undefined`).

### Exceptions

- `TypeError`
    The request does not have an associated `ReadableByteStreamController` or the view buffer is not detached/cannot be transferred into.

## Examples

The code below is taken from the live examples in Using readable byte stream.

The method is called by an underlying byte source as part of making a zero-copy transfer of data to fulfill a pending read request from a consumer.
The underlying source first writes data into the `ReadableStreamBYOBRequest.view` and then calls this `respond()` method to indicate _how_ much data was copied into the buffer, and cause the data to be transferred to the reader.

The code below shows this case using a hypothetical `readInto()` method to copy data into the view:

```js
const v = controller.byobRequest.view;
bytesRead = socket.readInto(v.buffer, v.byteOffset, v.byteLength);
controller.byobRequest.respond(bytesRead);
```

After the operation the `byobRequest.view` is detached and the request should be discarded.

## See also

- Using readable byte stream
