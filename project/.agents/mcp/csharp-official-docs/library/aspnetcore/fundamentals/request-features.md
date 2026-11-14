---
title: "Request Features in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/request-features.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Request Features in ASP.NET Core

By Steve Smith

The `HttpContext` API that applications and middleware use to process requests has an abstraction layer underneath it called *feature interfaces*. Each feature interface provides a granular subset of the functionality exposed by `HttpContext`. These interfaces can be added, modified, wrapped, replaced, or even removed by the server or middleware as the request is processed without having to re-implement the entire `HttpContext`. They can also be used to mock functionality when testing.

## Feature collections

The `Microsoft.AspNetCore.Http.HttpContext.Features` property of `HttpContext` provides access to the collection of feature interfaces for the current request. Since the feature collection is mutable even within the context of a request, middleware can be used to modify the collection and add support for additional features. Some advanced features are only available by accessing the associated interface through the feature collection.

## Feature interfaces

ASP.NET Core defines a number of common HTTP feature interfaces in `Microsoft.AspNetCore.Http.Features`, which are shared by various servers and middleware to identify the features that they support. Servers and middleware may also provide their own interfaces with additional functionality.

Most feature interfaces provide optional, light-up functionality, and their associated `HttpContext` APIs provide defaults if the feature isn't present. A few interfaces are indicated in the following content as required because they provide core request and response functionality and must be implemented in order to process the request.

The following feature interfaces are from `Microsoft.AspNetCore.Http.Features`:

`Microsoft.AspNetCore.Http.Features.IHttpRequestFeature`: Defines the structure of an HTTP request, including the protocol, path, query string, headers, and body. This feature is required in order to process requests.

`Microsoft.AspNetCore.Http.Features.IHttpResponseFeature`: Defines the structure of an HTTP response, including the status code, headers, and body of the response. This feature is required in order to process requests.

`Microsoft.AspNetCore.Http.Features.IHttpResponseBodyFeature`: Defines different ways of writing out the response body, using either a `Stream`, a `PipeWriter`, or a file. This feature is required in order to process requests. This replaces `IHttpResponseFeature.Body` and `IHttpSendFileFeature`.

`Microsoft.AspNetCore.Http.Features.Authentication.IHttpAuthenticationFeature`: Holds the `System.Security.Claims.ClaimsPrincipal` currently associated with the request.

`Microsoft.AspNetCore.Http.Features.IFormFeature`: Used to parse and cache incoming HTTP and multipart form submissions.

`Microsoft.AspNetCore.Http.Features.IHttpBodyControlFeature`: Used to control if synchronous IO operations are allowed for the request or response bodies.

`IHttpActivityFeature`: Used to add `Activity` information for diagnostic listeners.

`Microsoft.AspNetCore.Http.Features.IHttpConnectionFeature`: Defines properties for the connection id and local and remote addresses and ports.

`Microsoft.AspNetCore.Http.Features.IHttpMaxRequestBodySizeFeature`: Controls the maximum allowed request body size for the current request.

`IHttpRequestBodyDetectionFeature`: Indicates if the request can have a body.

`Microsoft.AspNetCore.Http.Features.IHttpRequestIdentifierFeature`: Adds a property that can be implemented to uniquely identify requests.

`Microsoft.AspNetCore.Http.Features.IHttpRequestLifetimeFeature`: Defines support for aborting connections or detecting if a request has been terminated prematurely, such as by a client disconnect.

`Microsoft.AspNetCore.Http.Features.IHttpRequestTrailersFeature`: Provides access to the request trailer headers, if any.

`Microsoft.AspNetCore.Http.Features.IHttpResetFeature`: Used to send reset messages for protocols that support them such as HTTP/2 or HTTP/3.

`Microsoft.AspNetCore.Http.Features.IHttpResponseTrailersFeature`: Enables the application to provide response trailer headers if supported.

`Microsoft.AspNetCore.Http.Features.IHttpUpgradeFeature`: Defines support for HTTP Upgrades, which allow the client to specify which additional protocols it would like to use if the server wishes to switch protocols.

`Microsoft.AspNetCore.Http.Features.IHttpWebSocketFeature`: Defines an API for supporting WebSockets.

`Microsoft.AspNetCore.Http.Features.IHttpsCompressionFeature`: Controls if response compression should be used over HTTPS connections.

`Microsoft.AspNetCore.Http.Features.IItemsFeature`: Stores the `Microsoft.AspNetCore.Http.Features.IItemsFeature.Items` collection for per request application state.

`Microsoft.AspNetCore.Http.Features.IQueryFeature`: Parses and caches the query string.

`Microsoft.AspNetCore.Http.Features.IRequestBodyPipeFeature`: Represents the request body as a `System.IO.Pipelines.PipeReader`.

`Microsoft.AspNetCore.Http.Features.IRequestCookiesFeature`: Parses and caches the request `Cookie` header values.

`Microsoft.AspNetCore.Http.Features.IResponseCookiesFeature`: Controls how response cookies are applied to the `Set-Cookie` header.

`Microsoft.AspNetCore.Http.Features.IServerVariablesFeature`: This feature provides access to request server variables such as those provided by IIS.

`Microsoft.AspNetCore.Http.Features.IServiceProvidersFeature`: Provides access to an `System.IServiceProvider` with scoped request services.

`Microsoft.AspNetCore.Http.Features.ISessionFeature`: Defines `ISessionFactory` and `Microsoft.AspNetCore.Http.ISession` abstractions for supporting user sessions. `ISessionFeature` is implemented by the `Microsoft.AspNetCore.Session.SessionMiddleware` (see Session in ASP.NET Core).

`Microsoft.AspNetCore.Http.Features.ITlsConnectionFeature`: Defines an API for retrieving client certificates.

`ITlsConnectionFeature` also defines `TryGetChannelBindingBytes(ChannelBindingKind, out ReadOnlyMemory<byte>)`, which lets app code retrieve an RFC 5929 TLS channel binding token for the current connection, such as the endpoint token <example-value> with `ChannelBindingKind.Endpoint`. Channel binding lets an authentication layer bind credentials to the underlying TLS channel, which helps mitigate credential-relay attacks as part of Extended Protection for Authentication (EPA). Kestrel retrieves the token from `SslStream.TransportContext.GetChannelBinding`, and HTTP.sys exposes it by default. For more information, see HttpSys enables TLS channel binding token <example-value> by default and Negotiate authentication uses TLS channel binding. The method returns `false` when a token isn't available for the requested `ChannelBindingKind`.

`Microsoft.AspNetCore.Http.Features.ITlsTokenBindingFeature`: Defines methods for working with TLS token <example-value> parameters.

`Microsoft.AspNetCore.Http.Features.ITrackingConsentFeature`: Used to query, grant, and withdraw user consent regarding the storage of user information related to site activity and functionality.

## Related content

* Web server implementations in ASP.NET Core
* ASP.NET Core middleware
