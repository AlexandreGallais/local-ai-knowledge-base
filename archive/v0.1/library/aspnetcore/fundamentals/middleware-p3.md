---
title: "ASP.NET Core middleware (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/middleware/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core middleware (part 3 of 3)

## Built-in middleware

The latest release of ASP.NET Core includes the following middleware. The *UI stack* column shows the typical UI stack where the middleware is used: [All, Blazor Web App (BWA), Razor Pages and MVC (RP/MVC)]. The *Order* column provides notes on middleware placement in the request processing pipeline and under what conditions the middleware might stop request processing. When a middleware short-circuits the request processing pipeline and prevents further downstream middleware from processing a request, it's called a *terminal middleware*. For more information about short-circuiting, see the Create a middleware pipeline with `WebApplication` section.

| Middleware | Description | UI stack | Order |
|------------|-------------|----------|-------|
| Antiforgery | Provides anti-request-forgery support. | All | After authentication and authorization, before endpoints. |
| Authentication | Provides authentication support. | All | Before `HttpContext.User` is required. Terminal for OAuth callbacks. |
| Authorization | Provides authorization support. | All | Immediately after the authentication middleware. |
| Cookie Policy | Tracks consent from users for storing personal information and enforces minimum standards for cookie fields, such as `secure` and `SameSite`. | All | Before middleware that issues cookies. Examples: Authentication, Session, MVC (TempData). |
| CORS | Configures Cross-Origin Resource Sharing. | All | Before middleware that use CORS. `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` must go before `Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*`. For more information, see It is not clear that UseCORS must come before UseResponseCaching (`dotnet/aspnetcore` #23218. |
| Developer Exception Page | Generates a page with error information that's intended for use only in the `Development` environment. | All | Before middleware that generate errors. The project templates automatically register this middleware as the first middleware in the pipeline when the environment is `Development`. |
| Diagnostics | Several separate middlewares that provide a developer exception page, exception handling, status code pages, and the default web page for new apps. | All | Before middleware that generate errors. Terminal for exceptions or serving the default web page for new apps. |
| Forwarded Headers | Forwards proxied headers onto the current request. | All | Before middleware that consume the updated fields. Examples: scheme, host, client IP, method. |
| Health Check | Checks the health of an ASP.NET Core app and its dependencies, such as checking database availability. | All | Terminal if a request matches a health check endpoint. |
| Header Propagation | Propagates HTTP headers from the incoming request to the outgoing HTTP Client requests. |
| All |
| HTTP Logging | Logs HTTP Requests and Responses. | All | At the beginning of the middleware pipeline. |
| HTTP Method Override | Allows an incoming POST request to override the method. | All | Before middleware that consume the updated method. |
| HTTPS Redirection | Redirects all HTTP requests to HTTPS. | All | Before middleware that consume the URL. |
| HTTP Strict Transport Security (HSTS) | Security enhancement middleware that adds a special response header. | All | Before responses are sent and after middleware that modify requests. Examples: Forwarded Headers, URL Rewriting. |
| MVC | Processes requests with MVC and Razor Pages. | RP/MVC | Terminal if a request matches a route. |
| OWIN | Interop with OWIN-based apps, servers, and middleware. | RP/MVC | Terminal if the OWIN middleware fully processes the request. |
| Output Caching | Provides support for caching responses based on configuration. | RP/MVC | Before middleware that require caching. `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`, `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*`, `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`, and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` must come before `Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache*`. |
| Response Caching | Provides support for caching responses. This middleware requires client participation to work. Use output caching for complete server control. | RP/MVC | Before middleware that require caching. `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` must come before `Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*`. Response caching isn't typically beneficial for UI apps, such as Razor Pages, because browsers generally set request headers that prevent caching. Output caching benefits UI apps. |
| Request Decompression | Provides support for decompressing requests. | All | Before middleware that read the request body. |
| Response Compression | Provides support for compressing responses. | All | Before middleware that require compression. |
| Request Localization | Provides localization support. | All | Before localization sensitive middleware. Must appear after routing middleware when using `Microsoft.AspNetCore.Localization.Routing.RouteDataRequestCultureProvider`. |
| Request Timeouts | Provides support for configuring request timeouts, global and per endpoint. | All | `Microsoft.AspNetCore.Builder.RequestTimeoutsIApplicationBuilderExtensions.UseRequestTimeouts*` must come after `Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`, `Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage*`, and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`. |
| Endpoint Routing. | Defines and constrains request routes. | All | Terminal for matching routes. |
| SPA | Handles all requests from this point in the middleware chain by returning the default page for the Single Page Application (SPA). | All | Appears late in the pipeline, so other middleware for serving static files, such as MVC actions, take precedence. |
| Session | Provides support for managing user sessions. | RP/MVC | Before middleware that require Session. |
| Static File | Provides support for serving static files and directory browsing. | All | Terminal if a request matches a file. |
| URL Rewrite | Provides support for rewriting URLs and redirecting requests. | All | Before middleware that consume the URL. |
| W3C Logging | Generates server access logs in the W3C Extended Log File Format. | All | At the beginning of the middleware pipeline. |
| Blazor WebAssembly Debugging | Debugs Blazor Web Apps that use client-side rendering (CSR) inside Chromium developer tools. | BWA | At the beginning of the middleware pipeline. |
| WebSockets | Enables the WebSockets protocol. | All | Before middleware that are required to accept WebSocket requests. |

## Related content

* Lifetime and registration options (includes middleware sample)
* Write custom ASP.NET Core middleware
* Test ASP.NET Core middleware
* Configure gRPC-Web in ASP.NET Core
* Migrate HTTP modules to ASP.NET Core middleware
* App startup in ASP.NET Core
* Request Features in ASP.NET Core
* Factory-based middleware activation in ASP.NET Core
* Middleware activation with a third-party container in ASP.NET Core
* APIs overview
