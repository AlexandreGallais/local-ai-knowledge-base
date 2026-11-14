---
title: "WebSocket: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: close() method

The **`WebSocket.close()`** method closes the
`WebSocket` connection or connection attempt, if any. If the connection is
already `CLOSED`, this method does nothing.

> **Note:**
> The process of closing the connection begins with a closing handshake, and the `close()` method does not discard previously-sent messages before starting that closing handshake; even if the user agent is still busy sending those messages, the handshake will only start after the messages are sent.

## Syntax

```js
close()
close(code)
close(code, reason)
```

### Parameters

- `code` (optional)
    An integer WebSocket connection close code value indicating a reason for closure:
    - If unspecified, a close code for the connection is automatically set: to `1000` for a normal closure, or otherwise to another standard value in the range `1001`-`1015` that indicates the actual reason the connection was closed.
    - If specified, the value of this `code` parameter overrides the automatic setting of the close code for the connection, and instead sets a custom code.
      The value must be an integer: either `1000`, or else a custom code of your choosing in the range `3000`-`4999`. If you specify a `code` value, you should also specify a `reason` value.

- `reason` (optional)
    A string providing a custom WebSocket connection close reason (a concise human-readable prose explanation for the closure). The value must be no longer than 123 bytes (encoded in UTF-8).

    > **Note:**
    > Because UTF-8 uses two to four bytes to encode any non-ASCII characters, a 123-character `reason` value containing non-ASCII characters would exceed the 123-byte limit.

    If you specify a `reason` value, you should also specify a `code` value.

### Return value

None (`undefined`).

### Exceptions

- `InvalidAccessError` `DOMException`
    Thrown if `code` is neither an integer equal to `1000` nor an integer in the range `3000` – `4999`.
- `SyntaxError` `DOMException`
    Thrown if the UTF-8-encoded `reason` value is longer than 123 bytes.

## See also

- RFC 6455 (the WebSocket Protocol specification)
