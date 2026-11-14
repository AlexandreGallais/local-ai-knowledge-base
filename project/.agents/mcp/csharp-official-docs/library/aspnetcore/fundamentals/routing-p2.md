---
title: "Routing in ASP.NET Core (part 2 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/routing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 2 of 10)

## Routing concepts

The routing system builds on top of the middleware pipeline by adding the powerful **endpoint** concept. Endpoints represent units of the app's functionality that are distinct from each other in terms of routing, authorization, and any number of ASP.NET Core's systems.

### ASP.NET Core endpoint definition

An ASP.NET Core endpoint is:

* Executable: Has a `Microsoft.AspNetCore.Http.Endpoint.RequestDelegate`.
* Extensible: Has a Metadata collection.
* Selectable: Optionally, has routing information.
* Enumerable: The collection of endpoints can be listed by retrieving the `Microsoft.AspNetCore.Routing.EndpointDataSource` from DI.

The following code shows how to retrieve and inspect the endpoint matching the current request:

```csharp
app.Use(async (context, next) =>
{
    var currentEndpoint = context.GetEndpoint();

    if (currentEndpoint is null)
    {
        await next(context);
        return;
    }

    Console.WriteLine($"Endpoint: {currentEndpoint.DisplayName}");

    if (currentEndpoint is RouteEndpoint routeEndpoint)
    {
        Console.WriteLine($"  - Route Pattern: {routeEndpoint.RoutePattern}");
    }

    foreach (var endpointMetadata in currentEndpoint.Metadata)
    {
        Console.WriteLine($"  - Metadata: {endpointMetadata}");
    }

    await next(context);
});

app.MapGet("/", () => "Inspect Endpoint.");
```
The endpoint, if selected, can be retrieved from the `HttpContext`. Its properties can be inspected. Endpoint objects are immutable and cannot be modified after creation. The most common type of endpoint is a `Microsoft.AspNetCore.Routing.RouteEndpoint`. `RouteEndpoint` includes information that allows it to be selected by the routing system.

In the preceding code, app.Use configures an inline middleware.

The following code shows that, depending on where `app.Use` is called in the pipeline, there may not be an endpoint:

```csharp
// Location 1: before routing runs, endpoint is always null here.
app.Use(async (context, next) =>
{
    Console.WriteLine($"1. Endpoint: {context.GetEndpoint()?.DisplayName ?? "(null)"}");
    await next(context);
});

app.UseRouting();

// Location 2: after routing runs, endpoint will be non-null if routing found a match.
app.Use(async (context, next) =>
{
    Console.WriteLine($"2. Endpoint: {context.GetEndpoint()?.DisplayName ?? "(null)"}");
    await next(context);
});

// Location 3: runs when this endpoint matches
app.MapGet("/", (HttpContext context) =>
{
    Console.WriteLine($"3. Endpoint: {context.GetEndpoint()?.DisplayName ?? "(null)"}");
    return "Hello World!";
}).WithDisplayName("Hello");

app.UseEndpoints(_ => { });

// Location 4: runs after UseEndpoints - will only run if there was no match.
app.Use(async (context, next) =>
{
    Console.WriteLine($"4. Endpoint: {context.GetEndpoint()?.DisplayName ?? "(null)"}");
    await next(context);
});
```
The preceding sample adds `Console.WriteLine` statements that display whether or not an endpoint has been selected. For clarity, the sample assigns a display name to the provided `/` endpoint.

The preceding sample also includes calls to `UseRouting` and `UseEndpoints` to control exactly when these middleware run within the pipeline.

Running this code with a URL of `/` displays:

```txt
1. Endpoint: (null)
2. Endpoint: Hello
3. Endpoint: Hello
```

Running this code with any other URL displays:

```txt
1. Endpoint: (null)
2. Endpoint: (null)
4. Endpoint: (null)
```

This output demonstrates that:

* The endpoint is always null before `UseRouting` is called.
* If a match is found, the endpoint is non-null between `UseRouting` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`.
* The `UseEndpoints` middleware is **terminal** when a match is found. Terminal middleware is defined later in this article.
* The middleware after `UseEndpoints` execute only when no match is found.

The `UseRouting` middleware uses the `Microsoft.AspNetCore.Http.EndpointHttpContextExtensions.SetEndpoint*` method to attach the endpoint to the current context. It's possible to replace the `UseRouting` middleware with custom logic and still get the benefits of using endpoints. Endpoints are a low-level primitive like middleware, and aren't coupled to the routing implementation. Most apps don't need to replace `UseRouting` with custom logic.

The `UseEndpoints` middleware is designed to be used in tandem with the `UseRouting` middleware. The core logic to execute an endpoint isn't complicated. Use `Microsoft.AspNetCore.Http.EndpointHttpContextExtensions.GetEndpoint*` to retrieve the endpoint, and then invoke its `Microsoft.AspNetCore.Http.Endpoint.RequestDelegate` property.

The following code demonstrates how middleware can influence or react to routing:

```csharp
app.UseHttpMethodOverride();
app.UseRouting();

app.Use(async (context, next) =>
{
    if (context.GetEndpoint()?.Metadata.GetMetadata<RequiresAuditAttribute>() is not null)
    {
        Console.WriteLine($"ACCESS TO SENSITIVE DATA AT: {DateTime.UtcNow}");
    }

    await next(context);
});

app.MapGet("/", () => "Audit isn't required.");
app.MapGet("/sensitive", () => "Audit required for sensitive data.")
    .WithMetadata(new RequiresAuditAttribute());
```
```csharp
public class RequiresAuditAttribute : Attribute { }
```
The preceding example demonstrates two important concepts:

* Middleware can run before `UseRouting` to modify the data that routing operates upon.
  * Usually middleware that appears before routing modifies some property of the request, such as `Microsoft.AspNetCore.Builder.RewriteBuilderExtensions.UseRewriter*`, `Microsoft.AspNetCore.Builder.HttpMethodOverrideExtensions.UseHttpMethodOverride*`, or `Microsoft.AspNetCore.Builder.UsePathBaseExtensions.UsePathBase*`.
* Middleware can run between `UseRouting` and `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` to process the results of routing before the endpoint is executed.
  * Middleware that runs between `UseRouting` and `UseEndpoints`:
    * Usually inspects metadata to understand the endpoints.
    * Often makes security decisions, as done by `UseAuthorization` and `UseCors`.
  * The combination of middleware and metadata allows configuring policies per-endpoint.

The preceding code shows an example of a custom middleware that supports per-endpoint policies. The middleware writes an *audit log* of access to sensitive data to the console. The middleware can be configured to *audit* an endpoint with the `RequiresAuditAttribute` metadata. This sample demonstrates an *opt-in* pattern where only endpoints that are marked as sensitive are audited. It's possible to define this logic in reverse, auditing everything that isn't marked as safe, for example. The endpoint metadata system is flexible. This logic could be designed in whatever way suits the use case.

The preceding sample code is intended to demonstrate the basic <example-value> of endpoints. **The sample is not intended for production use**. A more complete version of an *audit log* middleware would:

* Log to a file or database.
* Include details such as the user, IP address, name of the sensitive endpoint, and more.

The audit policy metadata `RequiresAuditAttribute` is defined as an `Attribute` for easier use with class-based frameworks such as controllers and SignalR. When using *route to code*:

* Metadata is attached with a builder API.
* Class-based frameworks include all attributes on the corresponding method and class when creating endpoints.

The best practices for metadata types are to define them either as interfaces or attributes. Interfaces and attributes allow code reuse. The metadata system is flexible and doesn't impose any limitations.

### Compare terminal middleware with routing

The following example demonstrates both terminal middleware and routing:

```csharp
// Approach 1: Terminal Middleware.
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        await context.Response.WriteAsync("Terminal Middleware.");
        return;
    }

    await next(context);
});

app.UseRouting();

// Approach 2: Routing.
app.MapGet("/Routing", () => "Routing.");
```
The style of middleware shown with `Approach 1:` is **terminal middleware**. It's called terminal middleware because it does a matching operation:

* The matching operation in the preceding sample is `Path == "/"` for the middleware and `Path == "/Routing"` for routing.
* When a match is successful, it executes some functionality and returns, rather than invoking the `next` middleware.

It's called terminal middleware because it terminates the search, executes some functionality, and then returns.

The following list compares terminal middleware with routing:

* Both approaches allow terminating the processing pipeline:
  * Middleware terminates the pipeline by returning rather than invoking `next`.
  * Endpoints are always terminal.
* Terminal middleware allows positioning the middleware at an arbitrary place in the pipeline:
  * Endpoints execute at the position of `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*`.
* Terminal middleware allows arbitrary code to determine when the middleware matches:
  * Custom route matching code can be verbose and difficult to write correctly.
  * Routing provides straightforward solutions for typical apps. Most apps don't require custom route matching code.
* Endpoints interface with middleware such as `UseAuthorization` and `UseCors`.
  * Using a terminal middleware with `UseAuthorization` or `UseCors` requires manual interfacing with the authorization system.

An endpoint defines both:

* A delegate to process requests.
* A collection of arbitrary metadata. The metadata is used to implement cross-cutting concerns based on policies and configuration attached to each endpoint.

Terminal middleware can be an effective tool, but can require:

* A significant amount of coding and testing.
* Manual integration with other systems to achieve the desired level of flexibility.

Consider integrating with routing before writing a terminal middleware.

Existing terminal middleware that integrates with Map or `Microsoft.AspNetCore.Builder.MapWhenExtensions.MapWhen*` can usually be turned into a routing aware endpoint. MapHealthChecks demonstrates the pattern for router-ware:

* Write an extension method on `Microsoft.AspNetCore.Routing.IEndpointRouteBuilder`.
* Create a nested middleware pipeline using `Microsoft.AspNetCore.Routing.IEndpointRouteBuilder.CreateApplicationBuilder*`.
* Attach the middleware to the new pipeline. In this case, `Microsoft.AspNetCore.Builder.HealthCheckApplicationBuilderExtensions.UseHealthChecks*`.
* `Microsoft.AspNetCore.Builder.IApplicationBuilder.Build*` the middleware pipeline into a `Microsoft.AspNetCore.Http.RequestDelegate`.
* Call `Map` and provide the new middleware pipeline.
* Return the builder object provided by `Map` from the extension method.

The following code shows use of MapHealthChecks:

```csharp
app.UseAuthentication();
app.UseAuthorization();

app.MapHealthChecks("/healthz").RequireAuthorization();
```
The preceding sample shows why returning the builder object is important. Returning the builder object allows the app developer to configure policies such as authorization for the endpoint. In this example, the health checks middleware has no direct integration with the authorization system.

The metadata system was created in response to the problems encountered by extensibility authors using terminal middleware. It's problematic for each middleware to implement its own integration with the authorization system.
