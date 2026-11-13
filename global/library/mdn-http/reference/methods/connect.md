---
title: "CONNECT request method"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/methods/connect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CONNECT request method

The **`CONNECT`** HTTP method requests that a proxy establish an HTTP tunnel to a destination server, and if successful, blindly forward data in both directions until the tunnel is closed.
In HTTP/2 and HTTP/3, an extended `CONNECT` request is also used to run protocols such as WebSockets and WebTransport over an HTTP stream.

       | Request has body
       | No

       | Successful response has body
       | No

       | Safe
       | No

       | Idempotent
       | No

       | Cacheable
       | No

       |
        Allowed in HTML forms

       | No

## Syntax

```http
CONNECT <host>:<port> HTTP/1.1
```

- `<host>`
    A host which may be a registered hostname (e.g., `example.com`) or an IP address (IPv4, IPv6).
- `<port>`
    A port number in decimal (e.g., `80`, `443`). There is no default port, so a client **must** send one.

## Description

The request target is unique to this method in that it consists of only the host and port number of the tunnel destination, separated by a colon (see Syntax for details).
Any 2XX successful response status code means that the proxy will switch to 'tunnel mode' and any data in the success response body is from the server identified by the request target.

If a website is behind a proxy and it's enforced via network rules that all external traffic must pass <example-value> the proxy, the `CONNECT` method allows you to establish a TLS (HTTPS) connection with that website:

- The client asks the proxy to tunnel the TCP connection to the desired destination.
- The proxy server makes a secure connection to the server on behalf of the client.
- Once the connection is established, the proxy server continues to relay the TCP stream to and from the client.

Aside from enabling secure access to websites behind proxies, an HTTP tunnel provides a way to allow traffic that would otherwise be restricted (SSH or FTP) over the HTTP(S) protocol.

`CONNECT` is a hop-by-hop method, meaning proxies will only forward the `CONNECT` request if there is another inbound proxy in front of the origin server since most origin servers do not implement `CONNECT`.

> **Warning:**
> If you are running a proxy that supports `CONNECT`, restrict its use to a set of known ports or a configurable list of safe request targets.
> There are significant risks in establishing a tunnel to arbitrary servers, particularly when the destination is a well-known or reserved TCP port that is not intended for Web traffic.
> A loosely-configured proxy may be abused to forward traffic such as SMTP to relay spam email, for example.

### Extended CONNECT

HTTP/2 and HTTP/3 also define an _extended_ `CONNECT` request, which is used to run another protocol over a single HTTP stream (8441 and 9220).
The request includes a `:protocol` pseudo-header naming the protocol, along with the `:scheme`, `:authority`, and `:path` pseudo-headers that identify the target resource.
The request is sent to the origin server, which must first advertise support using the `SETTINGS_ENABLE_CONNECT_PROTOCOL` setting.
If the server responds with a 2XX successful response status code, the named protocol takes over the stream.

Extended `CONNECT` is used to open WebSocket connections over HTTP/2 and HTTP/3 (with `:protocol` set to `websocket`), and to establish WebTransport sessions (with `:protocol` set to `webtransport`).

## Examples

### Proxy authorization

A request for proxy servers that require authorization to create a tunnel looks as follows.
See the `Proxy-Authorization` header for more information.

```http
CONNECT server.example.com:80 HTTP/1.1
Host: server.example.com:80
Proxy-Authorization: basic <example-value>
```

## See also

- HTTP request methods
- HTTP response status codes
- HTTP headers
- Proxy server glossary entry
- `Proxy-Authorization` header
- WebSockets API
- WebTransport API
