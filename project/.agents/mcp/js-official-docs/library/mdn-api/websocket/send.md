---
title: "WebSocket: send() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/send/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: send() method

The **`WebSocket.send()`** method enqueues the specified data
to be transmitted to the server over the WebSocket connection, increasing the value of
`bufferedAmount` by the number of bytes needed to contain the data. If the
data can't be sent (for example, because it needs to be buffered but the buffer is
full), the socket is closed automatically.
The browser will throw an exception if you call `send()` when the connection is in the `CONNECTING` state. If you call `send()` when the connection is in the `CLOSING` or `CLOSED` states, the browser will silently discard the data.

## Syntax

```js
send(data)
```

### Parameters

- `data`
    The data to send to the server. It may be one of the following types:
    - `string`
        A text string. The string is added to the buffer in UTF-8 format, and the value
        of `bufferedAmount` is increased by the number of bytes required to
        represent the UTF-8 string.
    - `ArrayBuffer`
        You can send the underlying binary data used by a typed array object; its binary
        data contents are queued in the buffer, increasing the value of
        `bufferedAmount` by the requisite number of bytes.
    - `Blob`
        Specifying a `Blob` enqueues the blob's raw data to be transmitted in
        a binary frame (the `Blob.type` is ignored).
        The value of `bufferedAmount` is increased by the byte size of that raw data.
    - `TypedArray` or a `DataView`
        You can send any JavaScript typed array object as a binary frame;
        its binary data contents are queued in the buffer,
        increasing the value of `bufferedAmount` by the requisite number of bytes.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if `WebSocket.readyState` is `CONNECTING`.
