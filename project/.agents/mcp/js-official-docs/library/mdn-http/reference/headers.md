---
title: "HTTP headers (part 1 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTTP headers

**HTTP headers** let the client and the server pass <example-value> information with a message in a request or response.
In HTTP/1.X, a header is a case-insensitive name followed by a colon, then optional whitespace which will be ignored, and finally by its value (for example: `Allow: POST`).
In HTTP/2 and above, headers are displayed in lowercase when viewed in developer tools (`accept: */*`), and prefixed with a colon for a special group of pseudo-headers (`:status: 200`).
You can find more information on the syntax in each protocol version in the HTTP messages page.

Custom proprietary headers have historically been used with an `X-` prefix, but this convention was deprecated in 2012 because of the inconveniences it caused when nonstandard fields became standard in RFC 6648; others are listed in the IANA HTTP Field Name Registry, whose original content was defined in RFC 4229.
The IANA registry lists headers, including information about their status.

Headers can be grouped according to their contexts:

- Request headers
    Contain more information about the resource to be fetched, or about the client requesting the resource.
- Response headers
    Hold additional information about the response, like its location or about the server providing it.
- Representation headers
    Contain information about the body of the resource, like its MIME type, or encoding/compression applied.
- Payload headers
    Contain representation-independent information about payload data, including content length and the encoding used for transport.

Headers can also be grouped according to how proxies handle them:

- End-to-end headers
    These headers _must_ be transmitted to the final recipient of the message: the server for a request, or the client for a response. Intermediate proxies must retransmit these headers unmodified and caches must store them.
- Hop-by-hop headers
    These headers are meaningful only for a single transport-level connection, and _must not_ be retransmitted by proxies or cached. Note that only hop-by-hop headers may be set using the `Connection` header.

## Authentication

- `WWW-Authenticate`
    Defines the authentication method that should be used to access a resource.
- `Authorization`
    Contains the credentials to authenticate a user-agent with a server.
- `Proxy-Authenticate`
    Defines the authentication method that should be used to access a resource behind a proxy server.
- `Proxy-Authorization`
    Contains the credentials to authenticate a user agent with a proxy server.

## Caching

- `Age`
    The time, in seconds, that the object has been in a proxy cache.
- `Cache-Control`
    Directives for caching mechanisms in both requests and responses.
- `Clear-Site-Data`
    Clears browsing data (e.g., cookies, storage, cache) associated with the requesting website.
- `Expires`
    The date/time after which the response is considered stale.
- `No-Vary-Search` (experimental)
    Specifies a set of rules that define how a URL's query parameters will affect cache matching. These rules dictate whether the same URL with different URL parameters should be saved as separate browser cache entries.

## Conditionals

- `Last-Modified`
    The last modification date of the resource, used to compare several versions of the same resource. It is less accurate than `ETag`, but easier to calculate in some environments. Conditional requests using `If-Modified-Since` and `If-Unmodified-Since` use this value to change the behavior of the request.
- `ETag`
    A unique string identifying the version of the resource. Conditional requests using `If-Match` and `If-None-Match` use this value to change the behavior of the request.
- `If-Match`
    Makes the request conditional, and applies the method only if the stored resource matches one of the given ETags.
- `If-None-Match`
    Makes the request conditional, and applies the method only if the stored resource _doesn't_ match any of the given ETags. This is used to update caches (for safe requests), or to prevent uploading a new resource when one already exists.
- `If-Modified-Since`
    Makes the request conditional, and expects the resource to be transmitted only if it has been modified after the given date. This is used to transmit data only when the cache is out of date.
- `If-Unmodified-Since`
    Makes the request conditional, and expects the resource to be transmitted only if it has not been modified after the given date. This ensures the coherence of a new fragment of a specific range with previous ones, or to implement an optimistic concurrency control system when modifying existing documents.
- `Vary`
    Determines how to match request headers to decide whether a cached response can be used rather than requesting a fresh one from the origin server.

## Connection management

- `Connection`
    Controls whether the network connection stays open after the current transaction finishes.
- `Keep-Alive`
    Controls how long a persistent connection should stay open.

## Content negotiation

For more details, refer to the Content negotiation article.

- `Accept`
    Informs the server about the types of data that can be sent back.
- `Accept-Encoding`
    The encoding algorithm, usually a compression algorithm, that can be used on the resource sent back.
- `Accept-Language`
    Informs the server about the human language the server is expected to send back. This is a hint and is not necessarily under the full control of the user: the server should always pay attention not to override an explicit user choice (like selecting a language from a dropdown).
- `Accept-Patch`
    A _request content negotiation_ response header that advertises which media type the server is able to understand in a `PATCH` request.
- `Accept-Post`
    A _request content negotiation_ response header that advertises which media type the server is able to understand in a `POST` request.
- `Accept-Query`
    A _request content negotiation_ response header that advertises which media type the server is able to understand in a `QUERY` request.

## Controls

- `Expect`
    Indicates expectations that need to be fulfilled by the server to properly handle the request.
- `Max-Forwards`
    When using `TRACE`, indicates the maximum number of hops the request can do before being reflected to the sender.

## Cookies

- `Cookie`
    Contains stored HTTP cookies previously sent by the server with the `Set-Cookie` header.
- `Set-Cookie`
    Send cookies from the server to the user-agent.

## CORS

For more information, refer to the CORS documentation.

- `Access-Control-Allow-Credentials`
    Indicates whether the response to the request can be exposed when the credentials flag is true.
- `Access-Control-Allow-Headers`
    Used in response to a preflight request to indicate which HTTP headers can be used when making the actual request.
- `Access-Control-Allow-Methods`
    Specifies the methods allowed when accessing the resource in response to a preflight request.
- `Access-Control-Allow-Origin`
    Indicates whether the response can be shared.
- `Access-Control-Expose-Headers`
    Indicates which headers can be exposed as part of the response by listing their names.
- `Access-Control-Max-Age`
    Indicates how long the results of a preflight request can be cached.
- `Access-Control-Request-Headers`
    Used when issuing a preflight request to let the server know which HTTP headers will be used when the actual request is made.
- `Access-Control-Request-Method`
    Used when issuing a preflight request to let the server know which HTTP method will be used when the actual request is made.
- `Origin`
    Indicates where a fetch originates from.
- `Timing-Allow-Origin`
    Specifies origins that are allowed to see values of attributes retrieved via features of the Resource Timing API, which would otherwise be reported as zero due to cross-origin restrictions.

## Downloads

- `Content-Disposition`
    Indicates if the resource transmitted should be displayed inline (default behavior without the header), or if it should be handled like a download and the browser should present a "Save As" dialog.

## Integrity digests

- `Content-Digest` (experimental)
    Provides a digest of the stream of octets framed in an HTTP message (the message content) dependent on `Content-Encoding` and `Content-Range`.
- `Repr-Digest` (experimental)
    Provides a digest of the selected representation of the target resource before transmission.
    Unlike the `Content-Digest`, the digest does not consider `Content-Encoding` or `Content-Range`.
- `Want-Content-Digest` (experimental)
    States the wish for a `Content-Digest` header.
    It is the `Content-` analogue of `Want-Repr-Digest`.
- `Want-Repr-Digest` (experimental)
    States the wish for a `Repr-Digest` header.
    It is the `Repr-` analogue of `Want-Content-Digest`.

## Integrity policy

- `Integrity-Policy`
    Ensures that all resources the user agent loads (of a certain type) have Subresource Integrity guarantees.
- `Integrity-Policy-Report-Only`
    Reports on resources that the user agent loads that would violate Subresource Integrity guarantees if the integrity policy were enforced (using the `Integrity-Policy` header).

## Message body information

- `Content-Length`
    The size of the resource, in decimal number of bytes.
- `Content-Type`
    Indicates the media type of the resource.
- `Content-Encoding`
    Used to specify the compression algorithm.
- `Content-Language`
    Describes the human language(s) intended for the audience, so that it allows a user to differentiate according to the users' own preferred language.
- `Content-Location`
    Indicates an alternate location for the returned data.

## Message signatures

- `Accept-Signature`
    The `Accept-Signature` header requests a signed response or subsequent request, specifying the components to sign and signature parameters.
- `Signature`
    The `Signature` header contains one or more labeled signature values. Each label corresponds to an entry in `Signature-Input`.
- `Signature-Input`
    The `Signature-Input` header identifies the ordered list of message components covered by each signature and its metadata, such as the creation time and key identifier.

> **Note:**
> These definitions follow RFC 9421. The Signed HTTP Exchanges (SXG) draft also defines `Accept-Signature` and `Signature` with incompatible semantics, plus a distinct `Signed-Headers` header. However, the only browser SXG implementation, Chromium, does not support these as HTTP headers.

## Preferences

Preferences can be sent by clients in requests to indicate optional behaviors for requests and responses.
The server response may indicate if a preference is applied, in cases where it would otherwise be ambiguous for the client.
Browsers have no native handling for sending preferences via these headers; they are used in custom, implementation-specific clients.

- `Prefer`
    Indicates preferences for specific server behaviors during request processing. For example, it can request minimal response content (`return=minimal`) or asynchronous processing (`respond-async`). The server processes the request normally if the header is unsupported.
- `Preference-Applied`
    Informs the client which preferences specified in the `Prefer` header were applied by the server. It is a response-only header providing transparency about preference handling.

## Proxies

- `Forwarded`
    Contains information from the client-facing side of proxy servers that is altered or lost when a proxy is involved in the path of the request.
- `Via`
    Added by proxies, both forward and reverse proxies, and can appear in the request headers and the response headers.

## Range requests

HTTP range requests allow the client to request a portion of a resource from the server.
Range requests are useful for applications like media players that support random access, data tools that know they need only part of a large file, and download managers that let the user pause and resume a download.

- `Accept-Ranges`
    Indicates if the server supports range requests, and if so in which unit the range can be expressed.
- `Range`
    Indicates the part of a document that the server should return.
- `If-Range`
    Creates a conditional range request that is only fulfilled if the given etag or date matches the remote resource. Used to prevent downloading two ranges from incompatible version of the resource.
- `Content-Range`
    Indicates where in a full body message a partial message belongs.

## Redirects

- `Location`
    Indicates the URL to redirect a page to.
- `Refresh`
    Directs the browser to reload the page or redirect to another. Takes the same value as the `meta` element with `http-equiv="refresh"`.

## Request context

- `From`
    Contains an Internet email address for a human user who controls the requesting user agent.
- `Host`
    Specifies the domain name of the server (for virtual hosting), and (optionally) the TCP port number on which the server is listening.
- `Referer`
    The address of the previous web page from which a link to the currently requested page was followed.
- `Referrer-Policy`
    Governs which referrer information sent in the `Referer` header should be included with requests made.
- `User-Agent`
    Contains a characteristic string that allows the network protocol peers to identify the application type, operating system, software vendor or software version of the requesting software user agent.

## Response context

- `Allow`
    Lists the set of HTTP request methods supported by a resource.
- `Server`
    Contains information about the software used by the origin server to handle the request.
