---
title: "HTTP headers (part 2 of 3)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTTP headers (part 2 of 3)

## Security

- `Cross-Origin-Embedder-Policy` (COEP)
    Allows a server to declare an embedder policy for a given document.
- `Cross-Origin-Opener-Policy` (COOP)
    Prevents other domains from opening/controlling a window.
- `Cross-Origin-Resource-Policy` (CORP)
    Prevents other domains from reading the response of the resources to which this header is applied. See also CORP explainer article.
- `Content-Security-Policy` (CSP)
    Controls resources the user agent is allowed to load for a given page.
- `Content-Security-Policy-Report-Only`
    Allows web developers to experiment with policies by monitoring, but not enforcing, their effects. These violation reports consist of JSON documents sent via an HTTP `POST` request to the specified URI.
- `Expect-CT` (deprecated)
    Lets sites opt in to reporting and enforcement of Certificate Transparency to detect use of misissued certificates for that site.
- `Permissions-Policy`
    Provides a mechanism to allow and deny the use of browser features in a website's own frame, and in ``s that it embeds.
- `Reporting-Endpoints` (experimental)
    Response header that allows website owners to specify one or more endpoints used to receive errors such as CSP violation reports, `Cross-Origin-Opener-Policy` reports, or other generic violations.
- `Strict-Transport-Security` (HSTS)
    Force communication using HTTPS instead of HTTP.
- `Upgrade-Insecure-Requests`
    Sends a signal to the server expressing the client's preference for an encrypted and authenticated response, and that it can successfully handle the  directive.
- `X-Content-Type-Options`
    Disables MIME sniffing and forces browser to use the type given in `Content-Type`.
- `X-Frame-Options` (XFO)
    Indicates whether a browser should be allowed to render a page in a `<frame>`, ``, `` or `<object>`.
- `X-Permitted-Cross-Domain-Policies`
    A cross-domain policy file may grant clients, such as Adobe Acrobat or Apache Flex (among others), permission to handle data across domains that would otherwise be restricted due to the Same-Origin Policy.
    The `X-Permitted-Cross-Domain-Policies` header overrides such policy files so that clients still block unwanted requests.
- `X-Powered-By`
    May be set by hosting environments or other frameworks and contains information about them while not providing any usefulness to the application or its visitors. Unset this header to avoid exposing potential vulnerabilities.
- `X-XSS-Protection`
    Enables cross-site scripting filtering.

### Fetch metadata request headers

Fetch metadata request headers provide information about the context from which the request originated. A server can use them to make decisions about whether a request should be allowed, based on where the request came from and how the resource will be used.

- `Sec-Fetch-Site`
    Indicates the relationship between a request initiator'<example-value>'s origin. It is a Structured Header whose value is a token with possible values `cross-site`, `same-origin`, `same-site`, and `none`.
- `Sec-Fetch-Mode`
    Indicates the request's mode to a server. It is a Structured Header whose value is a token with possible values `cors`, `navigate`, `no-cors`, `same-origin`, and `websocket`.
- `Sec-Fetch-User`
    Indicates whether or not a navigation request was triggered by user activation. It is a Structured Header whose value is a boolean so possible values are `?0` for false and `?1` for true.
- `Sec-Fetch-Dest`
    Indicates the request's destination. It is a Structured Header whose value is a token with possible values `audio`, `audioworklet`, `document`, `embed`, `empty`, `font`, `image`, `manifest`, `object`, `paintworklet`, `report`, `script`, `serviceworker`, `sharedworker`, `style`, `track`, `video`, `worker`, and `xslt`.

The following request headers are not _strictly_ "fetch metadata request headers", but similarly provide information about the context of how a resource will be used. A server might use them to modify its caching behavior, or the information that is returned:

- `Sec-Purpose`
    Indicates the purpose of the request, when the purpose is something other than immediate use by the user-agent. The header currently has one possible value, `prefetch`, which indicates that the resource is being fetched preemptively for a possible future navigation.
- `Service-Worker-Navigation-Preload`
    A request header sent in preemptive request to `fetch()` a resource during service worker boot. The value, which is set with `NavigationPreloadManager.setHeaderValue()`, can be used to inform a server that a different resource should be returned than in a normal `fetch()` operation.

## Fetch storage access headers

These headers enable an enhanced workflow for the Storage Access API.

- `Sec-Fetch-Storage-Access`
    Indicates the "storage access status" for the current fetch context, which will be one of `none`, `inactive`, or `active`.
    The server may respond with `Activate-Storage-Access` to request that the browser activate an `inactive` permission and retry the request, or to load a resource with access to its third-party cookies if the status is `active`.
- `Activate-Storage-Access`
    Used in response to `Sec-Fetch-Storage-Access` to indicate that the browser can activate an existing permission for secure access and retry the request with cookies, or load a resource with cookie access if it already has an activated permission.

## Server-sent events

- `Reporting-Endpoints`
    Response header used to specify server endpoints where the browser should send warning and error reports when using the Reporting API.
- `Report-To` (deprecated) (non-standard)
    Response header used to specify server endpoints where the browser should send warning and error reports when using the Reporting API.

## Transfer coding

- `Transfer-Encoding`
    Specifies the form of encoding used to safely transfer the resource to the user.
- `TE`
    Specifies the transfer encodings the user agent is willing to accept.
- `Trailer`
    Allows the sender to include additional fields at the end of chunked message.

## WebSockets

Headers used by the WebSockets API in the WebSocket handshake:

- `Sec-WebSocket-Accept`
    Response header that indicates that the server is willing to upgrade to a WebSocket connection.
- `Sec-WebSocket-Extensions`
    In requests, this header indicates the WebSocket extensions supported by the client in preferred order.
    In responses, it indicates the extension selected by the server from the client's preferences.
- `Sec-WebSocket-Key`
    Request header containing a key that verifies that the client explicitly intends to open a `WebSocket`.
- `Sec-WebSocket-Protocol`
    In requests, this header indicates the sub-protocols supported by the client in preferred order.
    In responses, it indicates the sub-protocol selected by the server from the client's preferences.
- `Sec-WebSocket-Version`
    In requests, this header indicates the version of the WebSocket protocol used by the client.
    In responses, it is sent only if the requested protocol version is not supported by the server, and lists the versions that the server supports.

## Other

- `Alt-Svc`
    Used to list alternate ways to reach this service.
- `Alt-Used`
    Used to identify the alternative service in use.
- `Date`
    Contains the date and time at which the message was originated.
- `Link`
    This entity-header field provides a means for serializing one or more links in HTTP headers. It is semantically equivalent to the HTML `<link>` element.
- `Retry-After`
    Indicates how long the user agent should wait before making a follow-up request.
- `Server-Timing`
    Communicates one or more metrics and descriptions for the given request-response cycle.
- `Service-Worker`
    Included in fetches for a service worker's script resource.
    This header helps administrators log service worker script requests for monitoring purposes.
- `Service-Worker-Allowed`
    Used to remove the path restriction by including this header in the response of the Service Worker script.
- `SourceMap`
    Links to a source map so that debuggers can step through original source code instead of generated or transformed code.
- `Upgrade`
    This HTTP/1.1 (only) header can be used to upgrade an already established client/server connection to a different protocol (over the same transport protocol). For example, it can be used by a client to upgrade a connection from HTTP 1.1 to HTTP 2.0, or an HTTP or HTTPS connection into a WebSocket.
- `Priority`
    Provides a hint from about the priority of a particular resource request on a particular connection.
    The value can be sent in a request to indicate the client priority, or in a response if the server chooses to reprioritize the request.
