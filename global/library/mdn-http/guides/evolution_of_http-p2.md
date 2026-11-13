---
title: "Evolution of HTTP (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/evolution_of_http/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Evolution of HTTP (part 2 of 2)

## HTTP/3 - HTTP over QUIC

The next major version of HTTP, HTTP/3 has the same semantics as earlier versions of HTTP but uses QUIC instead of TCP for the transport layer portion. By October 2022, 26% of all websites were using HTTP/3.

QUIC is designed to provide much lower latency for HTTP connections. Like HTTP/2, it is a multiplexed protocol, but HTTP/2 runs over a single TCP connection, so packet loss detection and retransmission handled at the TCP layer can block all streams. QUIC runs multiple streams over UDP and implements packet loss detection and retransmission independently for each stream, so that if an error occurs, only the stream with data in that packet is blocked.

Defined in 9114, HTTP/3 is supported by most major browsers including Chromium (and its variants such as Chrome and Edge) and Firefox.

## See also

- Connection management in HTTP/1.x
- Protocol upgrade mechanism
- HTTP resources and specifications
- Glossary terms:
  - HTTP
  - HTTP/2
  - QUIC
  - Round Trip Time (RTT)
  - TCP slow start
  - Transmission Control Protocol (TCP)
