---
title: "HttpStatusCode enum (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpStatusCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpStatusCode enum (part 2 of 2)

## HttpStatusCode.SeeOther field

```csharp
SeeOther
```

Equivalent to HTTP status 303. `HttpStatusCode.SeeOther` automatically redirects the client to the URI specified in the Location header as the result of a POST. The request to the resource specified by the Location header will be made with a GET. `SeeOther` is a synonym for `RedirectMethod`.

To be added.

## HttpStatusCode.ServiceUnavailable field

```csharp
ServiceUnavailable
```

Equivalent to HTTP status 503. `HttpStatusCode.ServiceUnavailable` indicates that the server is temporarily unavailable, usually due to high load or maintenance.

## HttpStatusCode.SwitchingProtocols field

```csharp
SwitchingProtocols
```

Equivalent to HTTP status 101. `HttpStatusCode.SwitchingProtocols` indicates that the protocol version or protocol is being changed.

## HttpStatusCode.TemporaryRedirect field

```csharp
TemporaryRedirect
```

Equivalent to HTTP status 307. `HttpStatusCode.TemporaryRedirect` indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will also use the POST method. `TemporaryRedirect` is a synonym for `RedirectKeepVerb`.

To be added.

## HttpStatusCode.TooManyRequests field

```csharp
TooManyRequests
```

Equivalent to HTTP status 429. `HttpStatusCode.TooManyRequests` indicates that the user has sent too many requests in a given amount of time.

## HttpStatusCode.Unauthorized field

```csharp
Unauthorized
```

Equivalent to HTTP status 401. `HttpStatusCode.Unauthorized` indicates that the requested resource requires authentication. The WWW-Authenticate header contains the details of how to perform the authentication.

## HttpStatusCode.UnavailableForLegalReasons field

```csharp
UnavailableForLegalReasons
```

Equivalent to HTTP status 451. `HttpStatusCode.UnavailableForLegalReasons` indicates that the server is denying access to the resource as a consequence of a legal demand.

## HttpStatusCode.UnprocessableContent field

```csharp
UnprocessableContent
```

Equivalent to HTTP status 422. `HttpStatusCode.UnprocessableContent` indicates that the request was well-formed but was unable to be followed due to semantic errors.
`UnprocessableContent` is a synonym for `UnprocessableEntity`.

## HttpStatusCode.UnprocessableEntity field

```csharp
UnprocessableEntity
```

Equivalent to HTTP status 422. `HttpStatusCode.UnprocessableEntity` indicates that the request was well-formed but was unable to be followed due to semantic errors.
`UnprocessableEntity` is a synonym for `UnprocessableContent`.

## HttpStatusCode.UnsupportedMediaType field

```csharp
UnsupportedMediaType
```

Equivalent to HTTP status 415. `HttpStatusCode.UnsupportedMediaType` indicates that the request is an unsupported type.

## HttpStatusCode.Unused field

```csharp
Unused
```

Equivalent to HTTP status 306. `HttpStatusCode.Unused` is a proposed extension to the HTTP/1.1 specification that is not fully specified.

## HttpStatusCode.UpgradeRequired field

```csharp
UpgradeRequired
```

Equivalent to HTTP status 426. `HttpStatusCode.UpgradeRequired` indicates that the client should switch to a different protocol such as TLS/1.0.

## HttpStatusCode.UseProxy field

```csharp
UseProxy
```

Equivalent to HTTP status 305. `HttpStatusCode.UseProxy` indicates that the request should use the proxy server at the URI specified in the Location header.

## HttpStatusCode.VariantAlsoNegotiates field

```csharp
VariantAlsoNegotiates
```

Equivalent to HTTP status 506. `HttpStatusCode.VariantAlsoNegotiates` indicates that the chosen variant resource is configured to engage in transparent content negotiation itself and, therefore, isn't a proper endpoint in the negotiation process.
