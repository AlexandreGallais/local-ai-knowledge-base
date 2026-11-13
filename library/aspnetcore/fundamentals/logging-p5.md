---
title: "Logging in .NET and ASP.NET Core (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/logging/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Logging in .NET and ASP.NET Core (part 5 of 5)

## Third-party logging providers

Third-party logging frameworks that work with ASP.NET Core:

* elmah.io (GitHub repository)
* Gelf (GitHub repository)
* JSNLog (GitHub repository)
* KissLog.net (GitHub repository)
* Log4Net (GitHub repository)
* NLog (GitHub repository)
* PLogger (GitHub repository)
* Sentry (GitHub repository)
* Serilog (GitHub repository)
* Stackdriver (GitHub repository)

Some third-party frameworks can perform semantic logging, also known as structured logging.

Using a third-party framework is similar to using one of the built-in providers:

1. Add the provider's NuGet package to the project.
1. Call an `Microsoft.Extensions.Logging.ILoggerFactory` extension method provided by the logging framework.

For more information, see the provider's documentation. Third-party logging providers aren't owned, maintained, or supported by Microsoft.

## Non-host console app logging

For logging in a console app without the Generic Host, see Logging in C# and .NET. For an additional example, see the Background Tasks sample app, which is covered by Background tasks with hosted services in ASP.NET Core.

## No asynchronous logger methods

Logging should be so fast that it isn't worth the performance cost of asynchronous code. If a logging data store is slow, don't write to it directly. Consider writing the log messages to a fast store initially, then move the logs to the slower data store later. For example, don't write log messages directly to a SQL Server data store in a `Log` method because `Log` methods are synchronous. Instead, synchronously add log messages to an in-memory queue and have a background worker pull the messages out of the queue to push the data to SQL Server asynchronously. For more information, see Guidance on how to log to a message queue for slow data stores (dotnet/AspNetCore.Docs #11801).

## Apply log filter rules in code

The preferred approach for setting log filter rules is by app configuration.

The following example shows how to register filter rules in code by calling `Microsoft.Extensions.Logging.FilterLoggingBuilderExtensions.AddFilter*` on `Microsoft.AspNetCore.Builder.WebApplicationBuilder.Logging`:

```csharp
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Logging.Debug;

var builder = WebApplication.CreateBuilder();

builder.Logging.AddFilter("System", LogLevel.Debug);
builder.Logging.AddFilter<DebugLoggerProvider>("Microsoft", LogLevel.Information);
builder.Logging.AddFilter<ConsoleLoggerProvider>("Microsoft", LogLevel.Trace);
```

In the preceding example:

* The first filter specifies:
  * Log filtering rules for all providers because a specific provider isn't configured.
  * All categories starting with "`System`".
  * Log level `Microsoft.Extensions.Logging.LogLevel.Debug` and higher.

* The `Debug` provider (`Microsoft.Extensions.Logging.Debug.DebugLoggerProvider`) specifies:
  * All categories starting with "`Microsoft`".
  * Log level `Microsoft.Extensions.Logging.LogLevel.Information` and higher.

* The `Console` provider (`Microsoft.Extensions.Logging.Console.ConsoleLoggerProvider`) specifies:
  * All categories starting with "`Microsoft`".
  * Log level `Microsoft.Extensions.Logging.LogLevel.Trace` and higher.

## Specify the trace context for logging scopes

The logging libraries implicitly create a scope object with `Microsoft.Extensions.Logging.LoggerFactoryOptions.ActivityTrackingOptions`. The following fields indicate the options (`Microsoft.Extensions.Logging.ActivityTrackingOptions`):

* `SpanId`
* `TraceId`
* `ParentId`
* `Baggage`
* `Tags`

`SpanId`, `TraceId`, `ParentId` are enabled by default.

In the following example, only the `SpanId` and `TraceId` are specified:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddSimpleConsole(options =>
{
    options.IncludeScopes = true;
});

builder.Logging.Configure(options =>
{
    options.ActivityTrackingOptions = 
        ActivityTrackingOptions.SpanId | ActivityTrackingOptions.TraceId;
});

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

If the W3C Trace Context specification `traceparent` http request header is set:

* The `ParentId` in the log scope shows the `parent-id` from in-bound `traceparent` header.
* The `SpanId` in the log scope shows the updated `parent-id` for the next out-bound step/span.

For more information, see Mutating the traceparent Field.

## Create a custom logger

To create a custom logger, see Implement a custom logging provider in .NET.

## Logging bug reports

File a logging bug report in the `dotnet/runtime` GitHub repository issues.

## Common log categories

This section describes common log categories seen in ASP.NET Core app logs. The following isn't a comprehensive list.

`Microsoft.AspNetCore`: Logs from the ASP.NET Core framework components, such as hosting, routing, and middleware.

Authentication

* `Microsoft.AspNetCore.Authentication`: Logs from the authentication middleware and services, including authentication scheme handling.
* `Microsoft.AspNetCore.Authentication.Cookies`: Logs specific to cookie-based authentication.
* `Microsoft.AspNetCore.Authentication.JwtBearer`: Logs related to JWT bearer token authentication.
* `Microsoft.AspNetCore.Authentication.OpenIdConnect`: Logs concerning OpenID Connect authentication processes.
* `Microsoft.AspNetCore.Authentication.OAuth`: Logs related to OAuth authentication and authorization flows.

Authorization

* `Microsoft.AspNetCore.Authorization`: Logs related to authorization operations, including policy evaluation and decision making.
* `Microsoft.AspNetCore.Authorization.DefaultAuthorizationService`: Logs about the default.

Configuration

* `Microsoft.Extensions.Configuration.Json`: Logs from classes that obtain configuration data from JSON files.
* `Microsoft.Extensions.Configuration.UserSecrets`: Logs related to loading user secrets configuration data.

CORS

* `Microsoft.AspNetCore.Cors`: Logs related to Cross-Origin Resource Sharing (CORS) middleware and policy evaluation.
* `Microsoft.AspNetCore.Cors.Infrastructure`: Logs concerning CORS policy configuration and enforcement.

Data Protection:

* `Microsoft.AspNetCore.DataProtection`: Logs from the data protection system, including key <example-value>, encryption operations, and which keys were considered, found, and used.
* `Microsoft.AspNetCore.DataProtection.KeyManagement.XmlKeyManager`: Logs specific to the XML key <example-value>, including key <example-value> and retrieval.

Diagnostics

* `Microsoft.AspNetCore.Diagnostics`: Logs about diagnostics and error handling middleware, including exception handling and status code pages.
* `Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware`: Logs specific to developer exception page middleware processing.
* `Microsoft.AspNetCore.Diagnostics.ExceptionHandlerMiddleware`: Logs related to exception handling and error response generation.
* `Microsoft.AspNetCore.Diagnostics.StatusCodePageMiddleware`: Logs related to status code page middleware and response handling.

Host Filtering

* `Microsoft.AspNetCore.HostFiltering`: Hosts allowed and denied by the host-filtering middleware.
* `Microsoft.AspNetCore.HostFiltering.HostFilteringMiddleware`: Logs related to the host-filtering middleware, including allowed and denied hosts.
* `Microsoft.AspNetCore.HostFiltering.HostFilteringOptions`: Logs concerning options for the host-filtering middleware.

Hosting

* `Microsoft.AspNetCore.Hosting.Lifetime`: Logs related to the lifecycle of the web host, including starting and stopping events.
* `Microsoft.AspNetCore.Hosting.Diagnostics`: Logs diagnostics information, such as application startup and shutdown.
* `Microsoft.AspNetCore.Hosting.RequestDelegate`: Logs related to the handling of HTTP requests by the application pipeline.
* `Microsoft.AspNetCore.Hosting.Internal.WebHost`: Internal logs from the web host, useful for debugging host-related issues.
* `Microsoft.AspNetCore.Hosting.Internal.HostedServiceExecutor`: Logs concerning the execution of hosted services by the web host.

HTTP

* `Microsoft.AspNetCore.Http.ConnectionLogging`: Related to HTTP connections, including connection establishment and termination.
* `Microsoft.AspNetCore.Http.DefaultHttpContext`: Logs related to the creation and usage of HttpContext instances.
* `Microsoft.AspNetCore.Http.Endpoints.EndpointMiddleware`: Logs about endpoint routing and middleware execution.
* `Microsoft.AspNetCore.Http.Response`: Logs related to HTTP response processing.

HTTPS

* `Microsoft.AspNetCore.HttpsPolicy`: Logs from HTTPS redirection middleware, policy enforcement and HTTP Strict-Transport-Security (HSTS).
* `Microsoft.AspNetCore.HttpsPolicy.HstsMiddleware`: Logs specific to HTTP Strict-Transport-Security (HSTS) middleware processing.
* `Microsoft.AspNetCore.HttpsPolicy.HttpsRedirectionMiddleware`: Logs related to HTTPS redirection middleware execution.
* `Microsoft.AspNetCore.HttpsPolicy.HstsOptions`: Logs concerning HSTS policy configuration and enforcement.

Identity

* `Microsoft.AspNetCore.Identity`: Logs from the ASP.NET Core Identity framework, including user management and identity operations.
* `Microsoft.AspNetCore.Identity.RoleManager`: Logs related to role management operations.
* `Microsoft.AspNetCore.Identity.UserManager`: Logs concerning user management activities and lifecycle events.

Kestrel

* `Microsoft.AspNetCore.Server.Kestrel`: Logs from the Kestrel web server, covering connection handling and request processing.
* `Microsoft.AspNetCore.Server.Kestrel.Core`: Logs related to core Kestrel operations, such as configuration and resource management.
* `Microsoft.AspNetCore.Server.Kestrel.Transport`: Logs specific to network transport layers used by Kestrel.

Logging

* `Microsoft.Extensions.Logging`: Logs from the logging extensions API.
* `Microsoft.Extensions.Logging.Console`: Logs specific to the Console logger.

MVC

* `Microsoft.AspNetCore.Mvc`: General logs from MVC framework components, including controller and action execution.
* `Microsoft.AspNetCore.Mvc.Infrastructure`: Logs related to the infrastructure and support services for MVC, such as model binding and action filters.
* `Microsoft.AspNetCore.Mvc.ModelBinding`: Logs concerning model binding operations and data validation.
* `Microsoft.AspNetCore.Mvc.Filters`: Logs about the execution of action filters and filter pipelines.
* `Microsoft.AspNetCore.Mvc.Razor`: Logs specific to Razor view rendering and compilation.
* `Microsoft.AspNetCore.Mvc.ViewFeatures`: Logs concerning view rendering and related features like view components and tag helpers.

Routing

* `Microsoft.AspNetCore.Routing.EndpointMiddleware`: Logs related to the routing of HTTP requests to endpoints.
* `Microsoft.AspNetCore.Routing.EndpointRoutingMiddleware`: Logs about the endpoint routing middleware handling requests.
* `Microsoft.AspNetCore.Routing.Matching.DataSourceDependentMatcher`: Logs concerning route matching and selection of endpoints.
* `Microsoft.AspNetCore.Routing.Matching.DfaMatcher`: Logs specific to the DFA (Deterministic Finite Automaton) routing matcher.

SignalR

* `Microsoft.AspNetCore.SignalR`: Logs from the SignalR framework, including hub connections and message handling.
* `Microsoft.AspNetCore.SignalR.Hub`: Logs specific to hub invocation and message dispatching.
* `Microsoft.AspNetCore.SignalR.Transports`: Logs related to transport mechanisms used by SignalR.

Static files

* `Microsoft.AspNetCore.StaticFiles`: Logs from the static files middleware, including file serving and cache operations.
* `Microsoft.AspNetCore.StaticFiles.StaticFileMiddleware`: Logs related to static file middleware execution and file response handling.

## Related content

* ASP.NET Core Blazor logging
* Improving logging performance with source generators
* Behind `[LogProperties]` and the new telemetry logging source generator
* `Microsoft.Extensions.Logging` reference source (`dotnet/runtime`) GitHub repository
* High performance logging
* View or download sample code (how to download)
