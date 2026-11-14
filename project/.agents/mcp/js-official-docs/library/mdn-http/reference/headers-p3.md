---
title: "HTTP headers (part 3 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTTP headers (part 3 of 3)

## Experimental headers

### Attribution reporting headers

The Attribution Reporting API enables developers to measure conversions — for example when a user clicks an ad embedded on one site and then proceeds to purchase the item over on the vendor's site — and then access reports on those conversions. It does this without relying on third-party tracking cookies, instead relying on various headers to register **sources** and **triggers** that are matched to indicate a conversion.

- `Attribution-Reporting-Eligible`
    Used to indicate that the response corresponding to the current request is eligible to take part in attribution reporting, by registering either an attribution source or trigger.
- `Attribution-Reporting-Register-Source`
    Included as part of a response to a request that included an `Attribution-Reporting-Eligible` header, this is used to register an attribution source.
- `Attribution-Reporting-Register-Trigger`
    Included as part of a response to a request that included an `Attribution-Reporting-Eligible` header, this is used to register an attribution trigger.

### Client hints

HTTP Client hints are a set of request headers that provide useful information about the client such as device type and network conditions, and allow servers to optimize what is served for those conditions.

Servers proactively requests the client hint headers they are interested in from the client using `Accept-CH`. The client may then choose to include the requested headers in subsequent requests.

- `Accept-CH`
    Servers can advertise support for Client Hints using the `Accept-CH` header field or an equivalent HTML `<meta>` element with `http-equiv` attribute.
- `Critical-CH` (experimental)
    Servers use `Critical-CH` along with `Accept-CH` to specify that accepted client hints are also critical client hints.

The different categories of client hints are listed below.

#### User agent client hints

The UA client hints are request headers that provide information about the user agent, the platform/architecture it is running on, and user preferences set on the user agent or platform:

- `Sec-CH-UA` (experimental)
    User agent's branding and version.
- `Sec-CH-UA-Arch` (experimental)
    User agent's underlying platform architecture.
- `Sec-CH-UA-Bitness` (experimental)
    User agent's underlying CPU architecture bitness (for example "64" bit).
- `Sec-CH-UA-Form-Factors` (experimental)
    User agent's form-factors, describing how the user interacts with the user-agent.
- `Sec-CH-UA-Full-Version` (deprecated)
    User agent's full version string.
- `Sec-CH-UA-Full-Version-List` (experimental)
    Full version for each brand in the user agent's brand list.
- `Sec-CH-UA-Mobile` (experimental)
    User agent is running on a mobile device or, more generally, prefers a "mobile" user experience.
- `Sec-CH-UA-Model` (experimental)
    User agent's device model.
- `Sec-CH-UA-Platform` (experimental)
    User agent's underlying operation system/platform.
- `Sec-CH-UA-Platform-Version` (experimental)
    User agent's underlying operation system version.
- `Sec-CH-UA-WoW64` (experimental)
    Whether or not the user agent binary is running in 32-bit mode on 64-bit Windows.
- `Sec-CH-Prefers-Color-Scheme` (experimental)
    User's preference of dark or light color scheme.
- `Sec-CH-Prefers-Reduced-Motion` (experimental)
    User's preference to see fewer animations and content layout shifts.
- `Sec-CH-Prefers-Reduced-Transparency` (experimental)
    Request header indicates the user agent's preference for reduced transparency.

> **Note:**
> User-agent client hints are not available inside fenced frames because they rely on permissions policy delegation, which could be used to leak data.

#### Device and responsive image client hints

- `Sec-CH-Device-Memory` (experimental)
    Approximate amount of available client RAM memory. This is part of the Device Memory API.
- `Sec-CH-DPR` (experimental)
    Request header that provides the client device pixel ratio (the number of physical device pixels for each CSS pixel).
- `Sec-CH-Viewport-Height` (experimental)
    Request header provides the client's layout viewport height in CSS pixels.
- `Sec-CH-Viewport-Width` (experimental)
    Request header provides the client's layout viewport width in CSS pixels.
- `Sec-CH-Width` (experimental)
    Request header provides the image's width in CSS pixels.

##### Deprecated device and responsive image client hints

- `Device-Memory` (deprecated) (non-standard)
    Standardized as `Sec-CH-Device-Memory`
- `DPR` (deprecated) (non-standard)
    Standardized as `Sec-CH-DPR`
- `Viewport-Width` (deprecated) (non-standard)
    Standardized as `Sec-CH-Viewport-Width`
- `Width` (deprecated) (non-standard)
    Standardized as `Sec-CH-Width`

#### Network client hints

Network client hints allow a server to choose what information is sent based on the user choice and network bandwidth and latency.

- `Downlink` (experimental)
    Approximate bandwidth of the client's connection to the server, in Mbps. This is part of the Network Information API.
- `ECT` (experimental)
    The effective connection type ("network profile") that best matches the connection's latency and bandwidth. This is part of the Network Information API.
- `RTT` (experimental)
    Application layer round trip time (RTT) in milliseconds, which includes the server processing time. This is part of the Network Information API.
- `Save-Data` (experimental)
    A string `on` that indicates the user agent's preference for reduced data usage.

### Compression Dictionary Transport

Compression Dictionary Transport is a way of using a shared compression dictionary to reduce the transport size of HTTP responses rather than using the standard static dictionary in Brotli compression or Zstandard compression.

- `Available-Dictionary` (experimental)
    A browser can use this request header to indicate the best dictionary it has available for the server to use for compression.
- `Dictionary-ID` (experimental)
    Used when a browser already has a dictionary available for a resource and the server provided an `id` for the dictionary in the `Use-As-Dictionary` header.
    Requests for resources that can use the dictionary have an `Available-Dictionary` header and the server-provided dictionary `id` in the `Dictionary-ID` header.
- `Use-As-Dictionary` (experimental)
    Lists the matching criteria that the dictionary can be used for in future requests.

### Privacy

- `DNT` (deprecated) (non-standard)
    Request header that indicates the user's tracking preference (Do Not Track).
    Deprecated in favor of Global Privacy Control (GPC), which is communicated to servers using the `Sec-GPC` header, and accessible to clients via `navigator.globalPrivacyControl`.
- `Tk` (deprecated) (non-standard)
    Response header that indicates the tracking status that applied to the corresponding request. Used in conjunction with DNT.
- `Sec-GPC` (non-standard) (experimental)
    Indicates whether the user consents to a website or service selling or sharing their personal information with third parties.

### Security

- `Origin-Agent-Cluster` (experimental)
    Response header used to indicate that the associated `Document` should be placed in an _origin-keyed agent cluster_.
    This isolation allows user agents to allocate implementation-specific resources for agent clusters, such as processes or threads, more efficiently.

### Server-sent events

- `NEL` (experimental)
    Defines a mechanism that enables developers to declare a network error reporting policy.

### Topics API

The Topics API provides a mechanism for developers to implement use cases such as interest-based advertising (IBA).
See the Topics API documentation for more information.

- `Observe-Browsing-Topics` (experimental) (non-standard)
    Response header used to mark topics of interest inferred from a calling site's URL as observed in the response to a request generated by a feature that enables the Topics API.
- `Sec-Browsing-Topics` (experimental) (non-standard)
    Request header that sends the selected topics for the current user along with the associated request, which are used by an ad tech platform to choose a personalized ad to display.

### Other

- `Early-Data` (experimental)
    Indicates that the request has been conveyed in TLS early data.
- `Idempotency-Key` (experimental)
    Provides a unique key for `POST` and `PATCH` requests, allowing them to be made idempotent.
- `Set-Login` (experimental)
    Response header sent by a federated identity provider (IdP) to set its login status, meaning whether any users are logged into the IdP on the current browser or not.
    This is stored by the browser and used by the FedCM API.
- `Speculation-Rules` (experimental)
    Provides a list of URLs pointing to text resources containing speculation rule JSON definitions. When the response is an HTML document, these rules will be added to the document's speculation rule set.
- `Sec-Speculation-Tags` (experimental)
    Contains one or more tag values from the speculation rules that resulted in the speculation so a server can identify which rule(s) caused a speculation and potentially block them.
- `Supports-Loading-Mode` (experimental)
    Set by a navigation target to opt-in to using various higher-risk loading modes. For example, cross-origin, same-site prerendering requires a `Supports-Loading-Mode` value of `credentialed-prerender`.

## Non-standard headers

- `X-Forwarded-For` (non-standard)
    Identifies the originating IP addresses of a client connecting to a web server through an HTTP proxy or a load balancer.
- `X-Forwarded-Host` (non-standard)
    Identifies the original host requested that a client used to connect to your proxy or load balancer.
- `X-Forwarded-Proto` (non-standard)
    Identifies the protocol (HTTP or HTTPS) that a client used to connect to your proxy or load balancer.
- `X-DNS-Prefetch-Control` (non-standard)
    Controls DNS prefetching, a feature by which browsers proactively perform domain name resolution on both links that the user may choose to follow and URLs for items referenced by the document, including images, CSS, JavaScript, and so forth.
- `X-Robots-Tag` (non-standard)
    The `X-Robots-Tag` HTTP header is used to indicate how a web page is to be indexed within public search engine results. The header is equivalent to `<meta name="robots">` elements.

## Deprecated headers

- `Pragma` (deprecated)
    Implementation-specific header that may have various effects anywhere along the request-response chain. Used for backwards compatibility with HTTP/1.0 caches where the `Cache-Control` header is not yet present.
- `Warning` (deprecated)
    General warning information about possible problems.

## See also

- Wikipedia page on List of HTTP headers
- IANA registry
- HTTP Working Group
