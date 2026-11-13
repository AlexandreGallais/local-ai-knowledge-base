---
title: "ECT header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/ect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ECT header

The HTTP **`ECT`** request header is used in Client Hints to indicate the effective connection type: `slow-2g`, `2g`, `3g`, or `4g`.

The value represents the "network profile" that best matches the connection's latency and bandwidth, rather than the actual mechanisms used for transferring the data.
For example, `2g` might be used to represent a slow Wi-Fi connection with high latency and low bandwidth, while `4g` might represent a fast fiber-based broadband network.

The hint allows a server to choose what information is sent based on the broad characteristics of the network. For example, a server might choose to send smaller versions of images and other resources on less capable connections. The value might also be used as a starting point for determining what information is sent, which is further refined using information in `RTT` and `Downlink` hints.

> **Note:**
> A server that specifies `ECT` in `Accept-CH` may also specify it in `Vary` to indicate that responses should be cached for different ECT values.

       | Header type
       |
        Request header,
        Client hint

       | Forbidden request header
       | No

## Syntax

```http
ECT: <value>
```

## Directives

- `<value>`
    A value indicating effective connection type. Can be one of: `slow-2g`, `2g`, `3g`, or `4g`.

## Examples

A server first needs to opt in to receive the `ECT` header by sending the `Accept-CH` response header containing `ECT`.

```http
Accept-CH: ECT
```

Then on subsequent requests the client might send an `ECT` header back:

```http
ECT: 2g
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints (developer.chrome.com)
- Network client hints
  - `Downlink`
  - `RTT`
  - `Save-Data`

- `Accept-CH`
- HTTP Caching > Vary and `Vary`
- `NetworkInformation.effectiveType`
