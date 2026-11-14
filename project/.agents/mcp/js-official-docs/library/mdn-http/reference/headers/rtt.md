---
title: "RTT header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/rtt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTT header

The HTTP **`RTT`** request header is a network client hint which provides the approximate round trip time on the application layer, in milliseconds.
The RTT hint includes server processing time, unlike transport layer RTT.

The RTT value is rounded to the nearest 25 milliseconds to prevent fingerprinting, although there are many other mechanisms an attacker might use to obtain similar round-trip information.

The hint allows a server to choose what information is sent based on the network responsiveness/latency. For example, it might choose to send fewer resources.

> **Note:**
> The `Vary` header is used in responses to indicate that a different resource is sent for every different value of the header (see HTTP Caching Vary). Even if `RTT` is used to configure what resources are sent consider omitting it in the `Vary` header — it is likely to change often, which effectively makes the resource uncacheable.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
RTT: <number>
```

## Directives

- `<number>`
    The approximate round trip time in milliseconds, rounded to the nearest 25 milliseconds.

## Examples

### Using RTT client hints

A server first needs to opt in to receive the `RTT` header by sending the `Accept-CH` response header containing `RTT`.

```http
Accept-CH: RTT
```

Then on subsequent requests the client might send an `RTT` header back:

```http
RTT: 125
```

## See also

- `Downlink`, `ECT`, `Save-Data` network client hints
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
- `NetworkInformation.effectiveType`
- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
