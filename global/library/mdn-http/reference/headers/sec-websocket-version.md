---
title: "Sec-WebSocket-Version header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-websocket-version/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-WebSocket-Version header

The HTTP **Sec-WebSocket-Version** request and response header is used in the WebSocket opening handshake to indicate the WebSocket protocol supported by the client, and the protocol versions supported by the server if it does _not_ support the version specified in the request.

The header can only appear once in a request, and specifies the WebSocket version that web application is using.
The current version of the protocol at time of writing is 13.
The header is automatically added to requests by user agents when a `WebSocket` connection is established.

The server uses the version to determine if it can understand the protocol.
If the server doesn't support the version, or any header in the handshake is not understood or has an incorrect value, the server should send a response with status `400 Bad Request` and immediately close the socket.
It should also include `Sec-WebSocket-Version` in the `400` response, listing the versions that it does support.
The versions can be specified in individual headers, or as comma-separate values in a single header.

The header should not be sent in responses if the server understands the version specified by the client.

       | Header type
       | Response header

       | Forbidden request header
       | Yes (`Sec-` prefix)

## Syntax

Request

```http
Sec-WebSocket-Version: <version>
```

Response (on error only):

```http
Sec-WebSocket-Version: <server-supported-versions>
```

## Directives

- `<version>`
    The WebSocket protocol version the client wishes to use when communicating with the server.
    This number should be the most recent version possible listed in the IANA WebSocket Version Number Registry.
    The most recent final version of the WebSocket protocol is version 13.
- `<server-supported-versions>`
    On error, a comma-delineated list of the WebSocket protocol versions supported by the server.
    The header is not sent in responses if `<version>` is supported.

## Examples

### WebSocket opening handshake

The version supported by the client is specified in the original `WebSocket` handshake request.
For the current protocol, the version is "13", as shown below.

```http
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <example-value>
Sec-WebSocket-Version: 13
```

If the server supports version 13 of the protocol, then `Sec-WebSocket-Version` will not appear in the response.

## See also

- `Sec-WebSocket-Accept`
- `Sec-WebSocket-Key`
- `Sec-WebSocket-Protocol`
- `Sec-WebSocket-Extensions`
- The WebSocket handshake in _Writing WebSocket servers_
