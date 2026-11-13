---
title: "Sec-WebSocket-Extensions header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-websocket-extensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-WebSocket-Extensions header

The HTTP **Sec-WebSocket-Extensions** request and response header is used in the WebSocket opening handshake to negotiate a protocol extension used by the client and server.

In a request the header specifies one or more extensions that the web application would like to use, in order of preference.
These can be added as in multiple headers, or as comma separated values added to a single header.
Each extension can also have one or more parameters — these are semicolon-separated values listed after the extension.

In a response the header can only appear once, where it specifies the extension selected by the server from the client's preferences.
This value must be the first extension that the server supports from the list provided in the request header.

The request header is automatically added by the browser based on its own capabilities, and does not depend on parameters passed to the constructor when the `WebSocket` is created.

       | Header type
       | Request header, Response header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-WebSocket-Extensions: <extensions>
```

## Directives

- `<extensions>`
    A comma-separated list of extensions to request (or for the server to agree to support).
    These are commonly selected from the IANA WebSocket Extension Name Registry (custom extensions may also be used).
    Extensions which take parameters delineate them with semicolons.

## Examples

### WebSocket opening handshake

The HTTP request below shows the opening handshake where a client supports the `permessage-deflate` extension (with `client_max_window_bits` parameter), and the `bbf-usp-protocol` extension.

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits, bbf-usp-protocol
```

The request below with separate headers for each extension is equivalent:

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Extensions: bbf-usp-protocol
```

The response below might be sent from a server to indicate that it will support the `permessage-deflate` extension:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: <example-value>
Sec-WebSocket-Extensions: permessage-deflate
```

## See also

- `Sec-WebSocket-Accept`
- `Sec-WebSocket-Key`
- `Sec-WebSocket-Version`
- `Sec-WebSocket-Protocol`
- The WebSocket handshake and Subprotocols in _Writing WebSocket servers_
