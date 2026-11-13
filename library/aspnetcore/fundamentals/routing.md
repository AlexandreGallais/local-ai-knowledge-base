---
title: "Routing in ASP.NET Core (part 1 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/routing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core

By Ryan Nowak, Kirk Larkin, and Rick Anderson

-->
-->

Routing is responsible for matching incoming HTTP requests and dispatching those requests to the app's executable endpoints. Endpoints are the app's units of executable request-handling code. Endpoints are defined in the app and configured when the app starts. The endpoint matching process can extract values from the request's URL and provide those values for request processing. Using endpoint information from the app, routing is also able to generate URLs that map to endpoints.

Apps can configure routing using:

* Controllers
* Razor Pages
* SignalR
* gRPC Services
* Endpoint-enabled middleware such as Health Checks.
* Delegates and lambdas registered with routing.

This article covers low-level details of ASP.NET Core routing. For information on configuring routing:

* For controllers, see Routing to controller actions in ASP.NET Core.
* For Razor Pages conventions, see Razor Pages route and app conventions in ASP.NET Core.
* For Blazor routing and navigation guidance, which adds to or supersedes the guidance in this article, see ASP.NET Core Blazor routing and ASP.NET Core Blazor navigation.

## Routing basics

The following code shows a basic example of routing:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
The preceding example includes a single endpoint using the `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGet*` method:

* When an HTTP `GET` request is sent to the root URL `/`:
  * The request delegate executes.
  * `Hello World!` is written to the HTTP response.
* If the request method is not `GET` or the root URL is not `/`, no route matches and an HTTP 404 is returned.

Routing uses a pair of middleware, registered by `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`:

* `UseRouting` adds route matching to the middleware pipeline. This middleware looks at the set of endpoints defined in the app, and selects the best match based on the request.
* `UseEndpoints` adds endpoint execution to the middleware pipeline. It runs the delegate associated with the selected endpoint.

Apps typically don't need to call `UseRouting` or `UseEndpoints`. `Microsoft.AspNetCore.Builder.WebApplicationBuilder` configures a middleware pipeline that wraps middleware added in `Program.cs` with `UseRouting` and `UseEndpoints`. However, apps can change the order in which `UseRouting` and `UseEndpoints` run by calling these methods explicitly. For example, the following code makes an explicit call to `UseRouting`:

```csharp
app.Use(async (context, next) =>
{
    // ...
    await next(context);
});

app.UseRouting();

app.MapGet("/", () => "Hello World!");
```
In the preceding code:

* The call to `app.Use` registers a custom middleware that runs at the start of the pipeline.
* The call to `UseRouting` configures the route matching middleware to run *after* the custom middleware.
* The endpoint registered with `MapGet` runs at the end of the pipeline.

If the preceding example didn't include a call to `UseRouting`, the custom middleware would run *after* the route matching middleware.

**Note:** Routes added directly to the `Microsoft.AspNetCore.Builder.WebApplication` execute at the ***end*** of the pipeline.

### Endpoints

The `MapGet` method is used to define an **endpoint**. An endpoint is something that can be:

* Selected, by matching the URL and HTTP method.
* Executed, by running the delegate.

Endpoints that can be matched and executed by the app are configured in `UseEndpoints`. For example, `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapGet*`, `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions.MapPost*`, and similar methods connect request delegates to the routing system. Additional methods can be used to connect ASP.NET Core framework features to the routing system:

* MapRazorPages for Razor Pages
* MapControllers for controllers
* MapHub\<THub> for SignalR
* MapGrpcService\<TService> for gRPC

The following example shows routing with a more sophisticated route template:

```csharp
app.MapGet("/hello/{name:alpha}", (string name) => $"Hello {name}!");
```
The string `/hello/{name:alpha}` is a **route template**. A route template is used to configure how the endpoint is matched. In this case, the template matches:

* A URL like `/hello/Docs`
* Any URL path that begins with `/hello/` followed by a sequence of alphabetic characters. `:alpha` applies a route constraint that matches only alphabetic characters. Route constraints are explained later in this article.

The second segment of the URL path, `{name:alpha}`:

* Is bound to the `name` parameter.
* Is captured and stored in `Microsoft.AspNetCore.Http.HttpRequest.RouteValues`.

The following example shows routing with health checks and authorization:

```csharp
app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/healthz").RequireAuthorization();
app.MapGet("/", () => "Hello World!");
```
The preceding example demonstrates how:

* The authorization middleware can be used with routing.
* Endpoints can be used to configure authorization behavior.

The `Microsoft.AspNetCore.Builder.HealthCheckEndpointRouteBuilderExtensions.MapHealthChecks*` call adds a health check endpoint. Chaining `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` on to this call attaches an authorization policy to the endpoint.

Calling `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` adds the authentication and authorization middleware. These middleware are placed between `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and `UseEndpoints` so that they can:

* See which endpoint was selected by `UseRouting`.
* Apply an authorization policy before `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` dispatches to the endpoint.

### Endpoint metadata

In the preceding example, there are two endpoints, but only the health check endpoint has an authorization policy attached. If the request matches the health check endpoint, `/healthz`, an authorization check is performed. This demonstrates that endpoints can have extra data attached to them. This extra data is called endpoint **metadata**:

* The metadata can be processed by routing-aware middleware.
* The metadata can be of any .NET type.
