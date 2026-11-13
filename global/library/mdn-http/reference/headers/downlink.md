---
title: "Downlink header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/downlink/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Downlink header

The HTTP **`Downlink`** request header is used in Client Hints to provide the approximate bandwidth in Mbps of the client's connection to the server.

The hint allows a server to choose what information is sent based on the network bandwidth.
For example, a server might choose to send smaller versions of images and other resources on low bandwidth networks.

> **Note:**
> The `Vary` header is used in responses to indicate that a different resource is sent for every different value of the header (see HTTP Caching Vary).
> Even if `Downlink` is used to configure what resources are sent, consider omitting it in the `Vary` header — it is likely to change often, which effectively makes the resource uncacheable.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
Downlink: <number>
```

## Directives

- `<number>`
    The downlink rate in Mbps, rounded to the nearest 25 kilobits.
    The downlink rate may be used as a fingerprinting variable, so values for the header are intentionally coarse to reduce the potential for its misuse.

## Examples

A server first needs to opt in to receive the `Downlink` header by sending the `Accept-CH` response header containing `Downlink`.

```http
Accept-CH: Downlink
```

Then on subsequent requests the client might send a `Downlink` header back:

```http
Downlink: 1.7
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
- Network client hints
  - `RTT`
  - `ECT`
  - `Save-Data`
- `Accept-CH`
- HTTP Caching: Vary and `Vary`
- `NetworkInformation.effectiveType`
