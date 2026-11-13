---
title: "Sec-WebSocket-Protocol header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-websocket-protocol/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-WebSocket-Protocol header

The HTTP **`Sec-WebSocket-Protocol`** request and response header is used in the WebSocket opening handshake to negotiate a sub-protocol to use in the communication.
This can be a well understood protocol, such as SOAP or WAMP, or a custom protocol understood by the client and server.

In a request the header specifies one or more WebSocket sub-protocols that the web application would like to use, in order of preference.
These can be added as protocol values in multiple headers, or as comma separate values added to a single header.

In a response it specifies the sub-protocol selected by the server.
This must be the first sub-protocol that the server supports from the list provided in the request header.

The request header is automatically added and populated by the browser using values specified by the application in the `protocols` argument to the `WebSocket()`.
The sub-protocol selected by the server is made available to the web application in `WebSocket.protocol`.

       | Header type
       | Request header, Response header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

```http
Sec-WebSocket-Protocol: <sub-protocols>
```

## Directives

- ``
    A comma-separated list of sub-protocol names, in the order of preference.
    The sub-protocols may be selected from the IANA WebSocket Subprotocol Name Registry, or may be a custom name jointly understood by the client and the server.

    As a response header, this is a single sub-protocol that the server selected.

## Examples

### WebSocket opening handshake

The sub-protocol is specified in the original WebSocket handshake request.
The request below shows that the client prefers `soap`, but also supports `wamp`.

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: soap, wamp
```

Specifying the protocols like this has the same effect:

```http
Sec-WebSocket-Protocol: soap
Sec-WebSocket-Protocol: wamp
```

The response from the server will include the `Sec-WebSocket-Protocol` header, selecting the first sub-protocol that it supports from the client's preferences.
Below that is shown as `soap`:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: <example-value>
Sec-WebSocket-Protocol: soap
```

## See also

- `Sec-WebSocket-Accept`
- `Sec-WebSocket-Key`
- `Sec-WebSocket-Version`
- `Sec-WebSocket-Extensions`
- The WebSocket handshake and Subprotocols in _Writing WebSocket servers_
