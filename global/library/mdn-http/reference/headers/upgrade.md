---
title: "Upgrade header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/upgrade/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Upgrade header

The HTTP **`Upgrade`** request and response header can be used to upgrade an already-established client/server connection to a different protocol (over the same transport protocol).
For example, it can be used by a client to upgrade a connection from HTTP/1.1 to HTTP/2, or an HTTP(S) connection to a WebSocket connection.

> **Warning:**
> HTTP/2 explicitly disallows the use of this mechanism and header; it is specific to HTTP/1.1.

       | Header type
       |
        Request header,
        Response header

       | Forbidden request header
       | Yes

## Syntax

```http
Upgrade: <protocol>[/<protocol_version>]
Upgrade: <protocol>[/<protocol_version>], …, <protocolN>[/<protocol_versionN>]
```

## Directives

- `<protocol>`
    Protocols are listed, comma-separated, in order of descending preference.
- `<protocol_version>` (optional)
    An optional protocol version may be provided prefixed with a `/` forward slash.

## Description

The `Upgrade` header field may be used by clients to invite a server to switch to one (or more) of the listed protocols, in descending preference order.
For example, the client might send a `GET` request as shown, listing the preferred protocols to switch to (in this case `example/1` and `foo/2`):

```http
GET /index.html HTTP/1.1
Host: www.example.com
Connection: upgrade
Upgrade: example/1, foo/2
```

> **Note:**
> The `Connection` header with type `upgrade` must _always_ be sent with the `Upgrade` header.

The server can ignore the request, for any reason, in which case it should respond as though the `Upgrade` header had not been sent (for example, with a `200 OK`).
If the server will upgrade the connection, it must:

1. Send back a `101 Switching Protocols` response status with an `Upgrade` header that specifies the protocol(s) being switched to. For example:

   ```http
   HTTP/1.1 101 Switching Protocols
   Upgrade: foo/2
   Connection: Upgrade
   ```

2. Send a response to the original request _using the new protocol_ (the server may only switch to a protocol with which it can complete the original request).

A server may also send the header as part of a `426` `Upgrade Required` response, to indicate that the server won't perform the request using the current protocol, but might do so if the protocol is changed. The client can then request a protocol change using the process above.

More detail and examples are provided in the topic Protocol upgrade mechanism.

## Examples

### Upgrade header with multiple protocols

The following request lists multiple protocols in descending preference:

```http
Connection: upgrade
Upgrade: HTTP/2.0, SHTTP/1.3, IRC/6.9, RTA/x11
```

### Upgrading to WebSocket

This is a common combination of headers to use to begin upgrading an HTTP connection to WebSockets.
See Upgrading to a WebSocket connection for more information.

```http
Connection: Upgrade
Upgrade: websocket
```

## See also

- Protocol upgrade mechanism
- `101 Switching Protocols`
- `426 Upgrade Required`
- `Connection`
