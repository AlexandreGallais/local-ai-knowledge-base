---
title: "HttpStatusCode enum (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpStatusCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpStatusCode enum

Namespace: `System.Net`

```csharp
public enum HttpStatusCode
```

Contains the values of HTTP status codes as defined by RFC 9110, section 15.

To be added.

## HttpStatusCode.Accepted field

```csharp
Accepted
```

Equivalent to HTTP status 202. `HttpStatusCode.Accepted` indicates that the request has been accepted for further processing.

## HttpStatusCode.AlreadyReported field

```csharp
AlreadyReported
```

Equivalent to HTTP status 208. `HttpStatusCode.AlreadyReported` indicates that the members of a WebDAV binding have already been enumerated in a preceding part of the multistatus response, and are not being included again.

## HttpStatusCode.Ambiguous field

```csharp
Ambiguous
```

Equivalent to HTTP status 300. `HttpStatusCode.Ambiguous` indicates that the requested information has multiple representations. The default action is to treat this status as a redirect and follow the contents of the Location header associated with this response. `Ambiguous` is a synonym for `MultipleChoices`.

To be added.

## HttpStatusCode.BadGateway field

```csharp
BadGateway
```

Equivalent to HTTP status 502. `HttpStatusCode.BadGateway` indicates that an intermediate proxy server received a bad response from another proxy or the origin server.

## HttpStatusCode.BadRequest field

```csharp
BadRequest
```

Equivalent to HTTP status 400. `HttpStatusCode.BadRequest` indicates that the request could not be understood by the server. `HttpStatusCode.BadRequest` is sent when no other error is applicable, or if the exact error is unknown or does not have its own error code.

## HttpStatusCode.Conflict field

```csharp
Conflict
```

Equivalent to HTTP status 409. `HttpStatusCode.Conflict` indicates that the request could not be carried out because of a conflict on the server.

## HttpStatusCode.Continue field

```csharp
Continue
```

Equivalent to HTTP status 100. `HttpStatusCode.Continue` indicates that the client can continue with its request.

## HttpStatusCode.Created field

```csharp
Created
```

Equivalent to HTTP status 201. `HttpStatusCode.Created` indicates that the request resulted in a new resource created before the response was sent.

## HttpStatusCode.EarlyHints field

```csharp
EarlyHints
```

Equivalent to HTTP status 103. `HttpStatusCode.EarlyHints` indicates to the client that the server is likely to send a final response with the header fields included in the informational response.

## HttpStatusCode.ExpectationFailed field

```csharp
ExpectationFailed
```

Equivalent to HTTP status 417. `HttpStatusCode.ExpectationFailed` indicates that an expectation given in an Expect header could not be met by the server.

## HttpStatusCode.FailedDependency field

```csharp
FailedDependency
```

Equivalent to HTTP status 424. `HttpStatusCode.FailedDependency` indicates that the method couldn't be performed on the resource because the requested action depended on another action and that action failed.

## HttpStatusCode.Forbidden field

```csharp
Forbidden
```

Equivalent to HTTP status 403. `HttpStatusCode.Forbidden` indicates that the server refuses to fulfill the request.

## HttpStatusCode.Found field

```csharp
Found
```

Equivalent to HTTP status 302. `HttpStatusCode.Found` indicates that the requested information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. `Found` is a synonym for `Redirect`.

To be added.

## HttpStatusCode.GatewayTimeout field

```csharp
GatewayTimeout
```

Equivalent to HTTP status 504. `HttpStatusCode.GatewayTimeout` indicates that an intermediate proxy server timed out while waiting for a response from another proxy or the origin server.

## HttpStatusCode.Gone field

```csharp
Gone
```

Equivalent to HTTP status 410. `HttpStatusCode.Gone` indicates that the requested resource is no longer available.

## HttpStatusCode.HttpVersionNotSupported field

```csharp
HttpVersionNotSupported
```

Equivalent to HTTP status 505. `HttpStatusCode.HttpVersionNotSupported` indicates that the requested HTTP version is not supported by the server.

## HttpStatusCode.IMUsed field

```csharp
IMUsed
```

Equivalent to HTTP status 226. `HttpStatusCode.IMUsed` indicates that the server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.

## HttpStatusCode.InsufficientStorage field

```csharp
InsufficientStorage
```

Equivalent to HTTP status 507. `HttpStatusCode.InsufficientStorage` indicates that the server is unable to store the representation needed to complete the request.

## HttpStatusCode.InternalServerError field

```csharp
InternalServerError
```

Equivalent to HTTP status 500. `HttpStatusCode.InternalServerError` indicates that a generic error has occurred on the server.

## HttpStatusCode.LengthRequired field

```csharp
LengthRequired
```

Equivalent to HTTP status 411. `HttpStatusCode.LengthRequired` indicates that the required Content-length header is missing.

## HttpStatusCode.Locked field

```csharp
Locked
```

Equivalent to HTTP status 423. `HttpStatusCode.Locked` indicates that the source or destination resource is locked.

## HttpStatusCode.LoopDetected field

```csharp
LoopDetected
```

Equivalent to HTTP status 508. `HttpStatusCode.LoopDetected` indicates that the server terminated an operation because it encountered an infinite loop while processing a WebDAV request with "Depth: infinity". This status code is meant for backward compatibility with clients not aware of the 208 status code `HttpStatusCode.AlreadyReported` appearing in multistatus response bodies.

## HttpStatusCode.MethodNotAllowed field

```csharp
MethodNotAllowed
```

Equivalent to HTTP status 405. `HttpStatusCode.MethodNotAllowed` indicates that the request method (POST or GET) is not allowed on the requested resource.

## HttpStatusCode.MisdirectedRequest field

```csharp
MisdirectedRequest
```

Equivalent to HTTP status 421. `HttpStatusCode.MisdirectedRequest` indicates that the request was directed at a server that is not able to produce a response.

## HttpStatusCode.Moved field

```csharp
Moved
```

Equivalent to HTTP status 301. `HttpStatusCode.Moved` indicates that the requested information has been moved to the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. `Moved` is a synonym for `MovedPermanently`.

To be added.

## HttpStatusCode.MovedPermanently field

```csharp
MovedPermanently
```

Equivalent to HTTP status 301. `HttpStatusCode.MovedPermanently` indicates that the requested information has been moved to the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. `MovedPermanently` is a synonym for `Moved`.

To be added.

## HttpStatusCode.MultipleChoices field

```csharp
MultipleChoices
```

Equivalent to HTTP status 300. `HttpStatusCode.MultipleChoices` indicates that the requested information has multiple representations. The default action is to treat this status as a redirect and follow the contents of the Location header associated with this response. `MultipleChoices` is a synonym for `Ambiguous`.

To be added.

## HttpStatusCode.MultiStatus field

```csharp
MultiStatus
```

Equivalent to HTTP status 207. `HttpStatusCode.MultiStatus` indicates multiple status codes for a single response during a Web Distributed Authoring and Versioning (WebDAV) operation. The response body contains XML that describes the status codes.

## HttpStatusCode.NetworkAuthenticationRequired field

```csharp
NetworkAuthenticationRequired
```

Equivalent to HTTP status 511. `HttpStatusCode.NetworkAuthenticationRequired` indicates that the client needs to authenticate to gain network access; it's intended for use by intercepting proxies used to control access to the network.

## HttpStatusCode.NoContent field

```csharp
NoContent
```

Equivalent to HTTP status 204. `HttpStatusCode.NoContent` indicates that the request has been successfully processed and that the response is intentionally blank.

## HttpStatusCode.NonAuthoritativeInformation field

```csharp
NonAuthoritativeInformation
```

Equivalent to HTTP status 203. `HttpStatusCode.NonAuthoritativeInformation` indicates that the returned meta information is from a cached copy instead of the origin server and therefore may be incorrect.

## HttpStatusCode.NotAcceptable field

```csharp
NotAcceptable
```

Equivalent to HTTP status 406. `HttpStatusCode.NotAcceptable` indicates that the client has indicated with Accept headers that it will not accept any of the available representations of the resource.

## HttpStatusCode.NotExtended field

```csharp
NotExtended
```

Equivalent to HTTP status 510. `HttpStatusCode.NotExtended` indicates that further extensions to the request are required for the server to fulfill it.

## HttpStatusCode.NotFound field

```csharp
NotFound
```

Equivalent to HTTP status 404. `HttpStatusCode.NotFound` indicates that the requested resource does not exist on the server.

## HttpStatusCode.NotImplemented field

```csharp
NotImplemented
```

Equivalent to HTTP status 501. `HttpStatusCode.NotImplemented` indicates that the server does not support the requested function.

## HttpStatusCode.NotModified field

```csharp
NotModified
```

Equivalent to HTTP status 304. `HttpStatusCode.NotModified` indicates that the client's cached copy is up to date. The contents of the resource are not transferred.

## HttpStatusCode.OK field

```csharp
OK
```

Equivalent to HTTP status 200. `HttpStatusCode.OK` indicates that the request succeeded and that the requested information is in the response. This is the most common status code to receive.

## HttpStatusCode.PartialContent field

```csharp
PartialContent
```

Equivalent to HTTP status 206. `HttpStatusCode.PartialContent` indicates that the response is a partial response as requested by a GET request that includes a byte range.

## HttpStatusCode.PaymentRequired field

```csharp
PaymentRequired
```

Equivalent to HTTP status 402. `HttpStatusCode.PaymentRequired` is reserved for future use.

## HttpStatusCode.PermanentRedirect field

```csharp
PermanentRedirect
```

Equivalent to HTTP status 308. `HttpStatusCode.PermanentRedirect` indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will also use the POST method.

## HttpStatusCode.PreconditionFailed field

```csharp
PreconditionFailed
```

Equivalent to HTTP status 412. `HttpStatusCode.PreconditionFailed` indicates that a condition set for this request failed, and the request cannot be carried out. Conditions are set with conditional request headers like If-Match, If-None-Match, or If-Unmodified-Since.

## HttpStatusCode.PreconditionRequired field

```csharp
PreconditionRequired
```

Equivalent to HTTP status 428. `HttpStatusCode.PreconditionRequired` indicates that the server requires the request to be conditional.

## HttpStatusCode.Processing field

```csharp
Processing
```

Equivalent to HTTP status 102. `HttpStatusCode.Processing` indicates that the server has accepted the complete request but hasn't completed it yet.

## HttpStatusCode.ProxyAuthenticationRequired field

```csharp
ProxyAuthenticationRequired
```

Equivalent to HTTP status 407. `HttpStatusCode.ProxyAuthenticationRequired` indicates that the requested proxy requires authentication. The Proxy-authenticate header contains the details of how to perform the authentication.

## HttpStatusCode.Redirect field

```csharp
Redirect
```

Equivalent to HTTP status 302. `HttpStatusCode.Redirect` indicates that the requested information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. `Redirect` is a synonym for `Found`.

To be added.

## HttpStatusCode.RedirectKeepVerb field

```csharp
RedirectKeepVerb
```

Equivalent to HTTP status 307. `HttpStatusCode.RedirectKeepVerb` indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will also use the POST method. `RedirectKeepVerb` is a synonym for `TemporaryRedirect`.

To be added.

## HttpStatusCode.RedirectMethod field

```csharp
RedirectMethod
```

Equivalent to HTTP status 303. `HttpStatusCode.RedirectMethod` automatically redirects the client to the URI specified in the Location header as the result of a POST. The request to the resource specified by the Location header will be made with a GET. `RedirectMethod` is a synonym for `SeeOther`.

To be added.

## HttpStatusCode.RequestedRangeNotSatisfiable field

```csharp
RequestedRangeNotSatisfiable
```

Equivalent to HTTP status 416. `HttpStatusCode.RequestedRangeNotSatisfiable` indicates that the range of data requested from the resource cannot be returned, either because the beginning of the range is before the beginning of the resource, or the end of the range is after the end of the resource.

## HttpStatusCode.RequestEntityTooLarge field

```csharp
RequestEntityTooLarge
```

Equivalent to HTTP status 413. `HttpStatusCode.RequestEntityTooLarge` indicates that the request is too large for the server to process.

## HttpStatusCode.RequestHeaderFieldsTooLarge field

```csharp
RequestHeaderFieldsTooLarge
```

Equivalent to HTTP status 431. `HttpStatusCode.RequestHeaderFieldsTooLarge` indicates that the server is unwilling to process the request because its header fields (either an individual header field or all the header fields collectively) are too large.

## HttpStatusCode.RequestTimeout field

```csharp
RequestTimeout
```

Equivalent to HTTP status 408. `HttpStatusCode.RequestTimeout` indicates that the client did not send a request within the time the server was expecting the request.

## HttpStatusCode.RequestUriTooLong field

```csharp
RequestUriTooLong
```

Equivalent to HTTP status 414. `HttpStatusCode.RequestUriTooLong` indicates that the URI is too long.

## HttpStatusCode.ResetContent field

```csharp
ResetContent
```

Equivalent to HTTP status 205. `HttpStatusCode.ResetContent` indicates that the client should reset (not reload) the current resource.
