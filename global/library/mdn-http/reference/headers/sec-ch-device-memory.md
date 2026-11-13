---
title: "Sec-CH-Device-Memory header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/sec-ch-device-memory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sec-CH-Device-Memory header

The HTTP **`Sec-CH-Device-Memory`** request header is used in device client hints to indicate the approximate amount of available RAM on the client device, in gigabytes.
The header is part of the `Device Memory API`.

Client hints are accessible only on secure origins.
A server has to opt in to receive the `Sec-CH-Device-Memory` header from the client, by first sending the `Accept-CH` response header.
Servers that opt in to the `Sec-CH-Device-Memory` client hint will typically also specify it in the `Vary` header to inform caches that the server may send different responses based on the header value in a request.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
Sec-CH-Device-Memory: <number>
```

## Directives

- `<number>`
    The approximate amount of device RAM.

    The amount of device RAM can be used as a fingerprinting variable, so values for the header are intentionally coarse to reduce the potential for its misuse.
    Values are only reported in powers of two, and are clamped to an implementation-defined minimum lower value and a maximum upper value.
    These bounds may change over time (see browser compatibility table).

    For example, if a browser does not report below `2` or above `32` then the value is one of: `2`, `4`, `8`, `16`, `32`.

## Examples

The server first needs to opt in to receive `Sec-CH-Device-Memory` header by sending the `Accept-CH` response header containing `Sec-CH-Device-Memory`:

```http
Accept-CH: Sec-CH-Device-Memory
```

Then on subsequent requests the client might send `Sec-CH-Device-Memory` header back:

```http
Sec-CH-Device-Memory: 1
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
- `Device Memory API`
- `Navigator.deviceMemory`
- `WorkerNavigator.deviceMemory`
- Device and responsive image client hints
  - `Sec-CH-DPR`
  - `Sec-CH-Viewport-Height`
  - `Sec-CH-Viewport-Width`
  - `Device-Memory` (deprecated)
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
