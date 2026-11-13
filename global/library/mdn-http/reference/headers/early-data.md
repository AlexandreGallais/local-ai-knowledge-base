---
title: "Early-Data header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/early-data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Early-Data header

The HTTP **`Early-Data`** request header is set by an intermediary to indicate that the request has been conveyed in TLS early data, and also indicates that the intermediary understands the `425 Too Early` status code.

If a client has interacted with a server recently, early data (also known as zero round-trip time (0-RTT) data) allows the client to send data to a server in the first round trip of a connection, without waiting for the TLS handshake to complete.
This reduces latency for repeat connections between a client and server, but has security implications, as early data is susceptible to replay attacks.

The `Early-Data` header is **not** set by the originator of the request (i.e., a browser).

       | Header type
       | Request header

       | Forbidden request header
       | No

## Syntax

```http
Early-Data: 1
```

## Examples

### A GET request with an Early-Data header

A client that wants to use early data can send HTTP requests immediately after sending the TLS `ClientHello`.
Sending a request in early data implies that the client is willing to retry a request in response to a `425 Too Early` status code, so the `Early-Data` header is not included:

```http
GET /resource HTTP/1.1
Host: example.com
```

An intermediary that forwards a request prior to the completion of the TLS handshake with its client sends it with the `Early-Data` header set to `1`:

```http
GET /resource HTTP/1.1
Host: example.com
Early-Data: 1
```

## See also

- `425 Too Early`
- Replay Attacks on 0-RTT
