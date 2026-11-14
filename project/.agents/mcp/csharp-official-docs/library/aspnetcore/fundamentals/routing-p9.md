---
title: "Routing in ASP.NET Core (part 9 of 10)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/routing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Routing in ASP.NET Core (part 9 of 10)

## Performance guidance for routing

When an app has performance problems, routing is often suspected as the problem. The reason routing is suspected is that frameworks like controllers and Razor Pages report the amount of time spent inside the framework in their logging messages. When there's a significant difference between the time reported by controllers and the total time of the request:

* Developers eliminate their app code as the source of the problem.
* It's common to assume routing is the cause.

Routing is performance tested using thousands of endpoints. It's unlikely that a typical app will encounter a performance problem just by being too large. The most common root cause of slow routing performance is usually a badly-behaving custom middleware.

This following code sample demonstrates a basic <example-value> for narrowing down the source of delay:

```csharp
var logger = app.Services.GetRequiredService<ILogger<Program>>();

app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();
    await next(context);
    stopwatch.Stop();

    logger.LogInformation("Time 1: {ElapsedMilliseconds}ms", stopwatch.ElapsedMilliseconds);
});

app.UseRouting();

app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();
    await next(context);
    stopwatch.Stop();

    logger.LogInformation("Time 2: {ElapsedMilliseconds}ms", stopwatch.ElapsedMilliseconds);
});

app.UseAuthorization();

app.Use(async (context, next) =>
{
    var stopwatch = Stopwatch.StartNew();
    await next(context);
    stopwatch.Stop();

    logger.LogInformation("Time 3: {ElapsedMilliseconds}ms", stopwatch.ElapsedMilliseconds);
});

app.MapGet("/", () => "Timing Test.");
```
To time routing:

* Interleave each middleware with a copy of the timing middleware shown in the preceding code.
* Add a unique identifier to correlate the timing data with the code.

This is a basic way to narrow down the delay when it's significant, for example, more than `10ms`. Subtracting `Time 2` from `Time 1` reports the time spent inside the `UseRouting` middleware.

The following code uses a more compact approach to the preceding timing code:

```csharp
public sealed class AutoStopwatch : IDisposable
{
    private readonly ILogger _logger;
    private readonly string _message;
    private readonly Stopwatch _stopwatch;
    private bool _disposed;

    public AutoStopwatch(ILogger logger, string message) =>
        (_logger, _message, _stopwatch) = (logger, message, Stopwatch.StartNew());

    public void Dispose()
    {
        if (_disposed)
        {
            return;
        }

        _logger.LogInformation("{Message}: {ElapsedMilliseconds}ms",
            _message, _stopwatch.ElapsedMilliseconds);

        _disposed = true;
    }
}
```
```csharp
var logger = app.Services.GetRequiredService<ILogger<Program>>();
var timerCount = 0;

app.Use(async (context, next) =>
{
    using (new AutoStopwatch(logger, $"Time {++timerCount}"))
    {
        await next(context);
    }
});

app.UseRouting();

app.Use(async (context, next) =>
{
    using (new AutoStopwatch(logger, $"Time {++timerCount}"))
    {
        await next(context);
    }
});

app.UseAuthorization();

app.Use(async (context, next) =>
{
    using (new AutoStopwatch(logger, $"Time {++timerCount}"))
    {
        await next(context);
    }
});

app.MapGet("/", () => "Timing Test.");
```
### Potentially expensive routing features

The following list provides some insight into routing features that are relatively expensive compared with basic route templates:

* Regular expressions: It's possible to write regular expressions that are complex, or have long running time with a small amount of input.
* Complex segments (`{x}-{y}-{z}`):
  * Are significantly more expensive than parsing a regular URL path segment.
  * Result in many more substrings being allocated.
* Synchronous data access: Many complex apps have database access as part of their routing. Use extensibility points such as `Microsoft.AspNetCore.Routing.MatcherPolicy` and `Microsoft.AspNetCore.Routing.EndpointSelectorContext`, which are asynchronous.

### Guidance for large route tables

By default ASP.NET Core uses a routing algorithm that trades memory for CPU time. This has the nice effect that route matching time is dependent only on the length of the path to match and not the number of routes. However, this approach can be potentially problematic in some cases, when the app has a large number of routes (in the thousands) and there is a high amount of variable prefixes in the routes. For example, if the routes have parameters in early segments of the route, like `{parameter}/some/literal`.

It is unlikely for an app to run into a situation where this is a problem unless:

* There are a high number of routes in the app using this pattern.
* There is a large number of routes in the app.

#### How to determine if an app is running into the large route table problem

* There are two symptoms to look for:
  * The app is slow to start on the first request.
    * Note that this is required but not sufficient. There are many other non-route problems than can cause slow app startup. Check for the condition below to accurately determine the app is running into this situation.
  * The app consumes a lot of memory during startup and a memory dump shows a large number of `Microsoft.AspNetCore.Routing.Matching.DfaNode` instances.

#### How to address this issue

There are several techniques and optimizations that can be applied to routes that largely improve this scenario:
* Apply route constraints to your parameters, for example `{parameter:int}`, `{parameter:guid}`, `{parameter:regex(\\d+)}`, etc. where possible.
  * This allows the routing algorithm to internally optimize the structures used for matching and drastically reduce the memory used.
  * In the vast majority of cases this will suffice to get back to an acceptable behavior.
* Change the routes to move parameters to later segments in the template.
  * This reduces the number of possible "paths" to match an endpoint given a path.
* Use a dynamic route and perform the mapping to a controller/page dynamically.
  * This can be achieved using `MapDynamicControllerRoute` and `MapDynamicPageRoute`.

## Short-circuit middleware after routing

When routing matches an endpoint, it typically lets the rest of the middleware pipeline run before invoking the endpoint logic. Services can reduce resource usage by filtering out known requests early in the pipeline. Use the `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` extension method to cause routing to invoke the endpoint logic immediately and then end the request. For example, a given route might not need to go through authentication or CORS middleware. The following example short-circuits requests that match the `/short-circuit` route:

```csharp
app.MapGet("/short-circuit", () => "Short circuiting!").ShortCircuit();
```
The `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit(Microsoft.AspNetCore.Builder.IEndpointConventionBuilder,System.Nullable{System.Int32})` method can optionally take a status code.

Use the `Microsoft.AspNetCore.Routing.RouteShortCircuitEndpointRouteBuilderExtensions.MapShortCircuit*` method to set up short-circuiting for multiple routes at once, by passing to it a params array of URL prefixes. For example, browsers and bots often probe servers for well known paths like `robots.txt` and `favicon.ico`. If the app doesn't have those files, one line of code can configure both routes:

```csharp
app.MapShortCircuit(404, "robots.txt", "favicon.ico");
```
`MapShortCircuit` returns `Microsoft.AspNetCore.Builder.IEndpointConventionBuilder` so that additional route constraints like host filtering can be added to it.

Short-circuiting doesn't affect middleware placed before `UseRouting`. Short-circuiting an endpoint that also has `[Authorize]` or `[RequireCors]` metadata causes requests to fail with an `InvalidOperationException`. This metadata is applied by `[Authorize]` or `[EnableCors]` attributes or by `Microsoft.AspNetCore.Builder.CorsEndpointConventionBuilderExtensions.RequireCors*` or `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` methods. This restriction applies however the endpoint is short-circuited.

To see the effect of short-circuiting middleware, set the "Microsoft" logging category to "Information" in `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}
```
Run the following code:

```csharp
var app = WebApplication.Create();

app.UseHttpLogging();

app.MapGet("/", () => "No short-circuiting!");
app.MapGet("/short-circuit", () => "Short circuiting!").ShortCircuit();
app.MapShortCircuit(404, "robots.txt", "favicon.ico");

app.Run();
```
The following example is from the console logs produced by running the `/` endpoint. It includes output from the logging middleware:

```
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[0]
      Executing endpoint 'HTTP: GET /'
info: Microsoft.AspNetCore.Routing.EndpointMiddleware[1]
      Executed endpoint 'HTTP: GET /'
info: Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware[2]
      Response:
      StatusCode: 200
      Content-Type: text/plain; charset=utf-8
      Date: Wed, 03 May 2023 21:05:59 GMT
      Server: Kestrel
      Alt-Svc: h3=":5182"; ma=86400
      Transfer-Encoding: chunked
```

The following example is from running the `/short-circuit` endpoint. It doesn't have anything from the logging middleware because the middleware was short-circuited:

```
info: Microsoft.AspNetCore.Routing.EndpointRoutingMiddleware[4]
      The endpoint 'HTTP: GET /short-circuit' is being executed without running additional middleware.
info: Microsoft.AspNetCore.Routing.EndpointRoutingMiddleware[5]
      The endpoint 'HTTP: GET /short-circuit' has been executed without running additional middleware.
```

Instead of calling `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` on the endpoint builder, you can apply the `Microsoft.AspNetCore.Routing.ShortCircuitAttribute` to short-circuit an endpoint declaratively. The attribute is in the `Microsoft.AspNetCore.Routing` namespace and has the same effect as the extension method: routing invokes the endpoint in `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` and ends the request without running the remaining middleware.

The attribute is valid on a method or a class. It isn't inherited, and it can't be applied more than once to the same target.

On a Minimal API route handler:

```csharp
app.MapGet("/health-probe", [ShortCircuit] () => Results.Ok());
```

On an MVC action or an entire controller:

```csharp
[ApiController]
[Route("robots.txt")]
[ShortCircuit]
public class RobotsController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Content("User-agent: *\nDisallow:", "text/plain");
}
```

You can optionally specify a status code:

```csharp
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    [HttpGet]
    [ShortCircuit(StatusCodes.Status200OK)]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
```

When a status code isn't supplied, `Microsoft.AspNetCore.Routing.ShortCircuitAttribute.StatusCode` is `null` and the endpoint runs normally before the request ends. The attribute implements `Microsoft.AspNetCore.Routing.IShortCircuitMetadata`, so custom endpoint conventions and metadata inspection can detect short-circuited endpoints through that interface.

> **Warning:**
> The same restriction that applies to the `Microsoft.AspNetCore.Builder.RouteShortCircuitEndpointConventionBuilderExtensions.ShortCircuit*` and `Microsoft.AspNetCore.Routing.RouteShortCircuitEndpointRouteBuilderExtensions.MapShortCircuit*` methods applies to the attribute. An endpoint that's short-circuited and also has `[Authorize]` or `[RequireCors]` metadata fails with an `System.InvalidOperationException`. Because `[ShortCircuit]` can be applied to a class, take particular care when placing it on an MVC controller that carries an `[Authorize]` attribute, including one applied through a base class.
