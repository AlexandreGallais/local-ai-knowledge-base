---
title: "Sec-WebSocket-Key header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-websocket-key/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-WebSocket-Key header

The HTTP **Sec-WebSocket-Key** request header is used in the WebSocket opening handshake to allow a client (user agent) to confirm that it "really wants" to request that an HTTP client is upgraded to become a WebSocket.

The value of the key is computed using an algorithm defined in the WebSocket specification, so this _does not provide security_.
Instead, it helps to prevent non-WebSocket clients from inadvertently, or through misuse, requesting a WebSocket connection.

This header is automatically added by user agents when a script opens a WebSocket; it cannot be added using the `fetch()` or `XMLHttpRequest.setRequestHeader()` methods.

The server's `Sec-WebSocket-Accept` response header should include a value computed based upon the specified key value.
The user agent can then validate this before this before confirming the connection.

       | Header type
       | Request header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-WebSocket-Key: <key>
```

## Directives

- `<key>`
    The key for this request to upgrade.
    This is a randomly selected 16-byte nonce that has been base64-encoded and isomorphic encoded.
    The user agent adds this when initiating the WebSocket connection.

## Examples

### WebSocket opening handshake

The client will initiate a WebSocket handshake with a request like the following.
Note that this starts as an HTTP `GET` request (HTTP/1.1 or later), in addition to `Sec-WebSocket-Key`, the request includes the `Upgrade` header, indicating the intent to upgrade from HTTP to a WebSocket connection.

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
```

The response from the server should include the `Sec-WebSocket-Accept` header with a value that is calculated from the `Sec-WebSocket-Key` header in the request, and confirms the intent to upgrade the connection to a WebSocket connection:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: <example-value>
```

## See also

- `Sec-WebSocket-Accept`
- `Sec-WebSocket-Version`
- `Sec-WebSocket-Protocol`
- `Sec-WebSocket-Extensions`
- The WebSocket handshake in _Writing WebSocket servers_
- HTTP Protocol upgrade mechanism
