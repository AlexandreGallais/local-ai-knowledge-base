---
title: "Response caching in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/response.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Response caching in ASP.NET Core (part 2 of 2)

## ResponseCache attribute

The `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute` class specifies the parameters necessary for setting appropriate headers in response caching.

> **Warning:**
> Disable caching for content that contains information for authenticated clients. Caching should only be enabled for content that doesn't change based on a user's identity or whether a user is signed in.

The `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByQueryKeys` property varies the stored response by the values of the given list of query keys. When a single value of the wildcard asterisk (`*`) is provided, the middleware varies responses by all request query string parameters.

Response caching middleware must be enabled to set the `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByQueryKeys` property. Otherwise, a runtime exception is thrown. There isn't a corresponding HTTP header for the `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByQueryKeys` property. The property is an HTTP feature handled by response caching middleware. For the middleware to serve a cached response, the query string and query string value must match a previous request. For example, consider the sequence of requests and results shown in the following table.

| Request                          | Returned from                    |
| -------------------------------- | ------------------------- |
| `http://example.com?key1=value1` | Server |
| `http://example.com?key1=value1` | Middleware |
| `http://example.com?key1=NewValue` | Server |

The server returns the first request and the middleware caches the request. The middleware returns the second request because the query string matches the previous (first) request. The third request isn't in the middleware cache because the query string value doesn't match a previous request.

The `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute` class is used to configure and create (via the `Microsoft.AspNetCore.Mvc.Filters.IFilterFactory` interface) a `Microsoft.AspNetCore.Mvc.Internal.ResponseCacheFilter`. The `ResponseCacheFilter` performs the work of updating the appropriate HTTP headers and features of the response. The filter:

* Removes any existing headers for `Vary`, `Cache-Control`, and `Pragma`.
* Writes out the appropriate headers based on the properties set in the `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute`.
* Updates the response caching HTTP feature if the `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByQueryKeys` property is set.

### Vary header

This header is only written when the `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByHeader` property is set. The property is set to the `Vary` property's value. The following sample uses the `Microsoft.AspNetCore.Mvc.CacheProfile.VaryByHeader` property:

```csharp
[ApiController]
public class TimeController : ControllerBase
{
    [Route("api/[controller]")]
    [HttpGet]
    [ResponseCache(VaryByHeader = "User-Agent", Duration = 30)]
    public ContentResult GetTime() => Content(
                      DateTime.Now.Millisecond.ToString());
```

View the response headers with Fiddler or another tool. The response headers include:

```text
Cache-Control: public,max-age=30
Vary: User-Agent
```

The preceding code requires adding the response caching middleware services `Microsoft.Extensions.DependencyInjection.ResponseCachingServicesExtensions.AddResponseCaching*` method to the service collection. The code configures the app to use the middleware with the `Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*` extension method.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddResponseCaching();

var app = builder.Build();

app.UseHttpsRedirection();

// UseCors must be called before UseResponseCaching
//app.UseCors();

app.UseResponseCaching();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

### NoStore and Location.None properties

The `Microsoft.AspNetCore.Mvc.CacheProfile.NoStore` property overrides most of the other properties. When this property is set to `true`, the `Cache-Control` header is set to `no-store`. If the `Microsoft.AspNetCore.Mvc.CacheProfile.Location` property is set to `None`:

* The `Cache-Control` header is set to `no-store,no-cache`.
* The `Pragma` header is set to `no-cache`.

If the `Microsoft.AspNetCore.Mvc.CacheProfile.NoStore` property is set to `false` and the `Microsoft.AspNetCore.Mvc.CacheProfile.Location` property is set to `None`, the `Cache-Control` and `Pragma` headers are set to `no-cache`.

The `Microsoft.AspNetCore.Mvc.CacheProfile.NoStore` property is typically set to `true` for error pages. The following code produces response headers that instruct the client not to store the response.

```csharp
[Route("api/[controller]/ticks")]
[HttpGet]
[ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
public ContentResult GetTimeTicks() => Content(
                  DateTime.Now.Ticks.ToString());
```

The preceding code includes the following headers in the response:

```text
Cache-Control: no-store,no-cache
Pragma: no-cache
```

To apply the `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute` to all of the app's MVC controller or Razor Pages page responses, add the attribute with an MVC filter or Razor Pages filter.

In an MVC app, add the following code:

```csharp
builder.Services.AddControllersWithViews().AddMvcOptions(options => 
    options.Filters.Add(
        new ResponseCacheAttribute
        {
            NoStore = true, 
            Location = ResponseCacheLocation.None
        }));
```

For an approach that applies to Razor Pages apps, see GitHub dotnet/aspnetcore issue #18890) - _Adding ResponseCacheAttribute to MVC global filter list does not apply to Razor Pages_. The comment example in the issue applies to ASP.NET Core apps that predate the release of Minimal APIs (ASP.NET Core version 6.0). For apps that target version 6.0 and later, change the service registration used in the example to `builder.Services.AddSingleton...` in the _Program.cs_ file.

### Location and Duration properties

To enable caching, the `Microsoft.AspNetCore.Mvc.CacheProfile.Duration` property must be set to a positive value and `Microsoft.AspNetCore.Mvc.CacheProfile.Location` must be either `Any` (the default) or `Client`. The framework sets the `Cache-Control` header to the location value followed by the `max-age` of the response.

The `Microsoft.AspNetCore.Mvc.CacheProfile.Location` property options of `Any` and `Client` translate into `Cache-Control` header values of `public` and `private`, respectively. As noted in the NoStore and Location.None section, setting the `Microsoft.AspNetCore.Mvc.CacheProfile.Location` property to `None` sets both the `Cache-Control` and `Pragma` headers to `no-cache`.

The `Location.Any` (`Cache-Control` set to `public`) property setting indicates that the *client or any intermediate proxy* can cache the value, including response caching middleware.

The `Location.Client` (`Cache-Control` set to `private`) property setting indicates that *only the client* can cache the value. No intermediate cache should cache the value, including response caching middleware.

Cache control headers provide guidance to clients and intermediary proxies about when and how to cache responses. There's no guarantee that clients and proxies honor the RFC 9111: HTTP Caching specification. Response caching middleware always follows the caching rules laid out by the specification.

The following example shows the headers produced by setting the `Microsoft.AspNetCore.Mvc.CacheProfile.Duration` property and leaving the default `Microsoft.AspNetCore.Mvc.CacheProfile.Location` property value:

```csharp
[Route("api/[controller]/ms")]
[HttpGet]
[ResponseCache(Duration = 10, Location = ResponseCacheLocation.Any, NoStore = false)]
public ContentResult GetTimeMS() => Content(
                  DateTime.Now.Millisecond.ToString());
```

The preceding code includes the following headers in the response:

```text
Cache-Control: public,max-age=10
```

### Cache profiles

Instead of duplicating response cache settings on many controller action attributes, cache profiles can be configured as options when setting up MVC pages or Razor Pages. Values found in a referenced cache profile are used as the defaults by the `Microsoft.AspNetCore.Mvc.ResponseCacheAttribute`. Any properties specified on the attribute override the referenced cache profile values.

The following example shows a 30-second cache profile:

```csharp
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCaching();
builder.Services.AddControllers(options =>
{
    options.CacheProfiles.Add("Default30",
        new CacheProfile()
        {
            Duration = 30
        });
});

var app = builder.Build();

app.UseHttpsRedirection();

// UseCors must be called before UseResponseCaching
//app.UseCors();

app.UseResponseCaching();

app.UseAuthorization();

app.MapControllers();

app.Run();
```

The following code references the `Default30` cache profile:

```csharp
[ApiController]
[ResponseCache(CacheProfileName = "Default30")]
public class Time2Controller : ControllerBase
{
    [Route("api/[controller]")]
    [HttpGet]
    public ContentResult GetTime() => Content(
                      DateTime.Now.Millisecond.ToString());

    [Route("api/[controller]/ticks")]
    [HttpGet]
    public ContentResult GetTimeTicks() => Content(
                      DateTime.Now.Ticks.ToString());
}
```

The resulting header response by the `Default30` cache profile includes:

```text
Cache-Control: public,max-age=30
```

You can apply the [ResponseCache] attribute to Razor Pages, MVC controllers, and MVC action methods.

In Razor Pages, you can't apply attributes to handler methods because browsers used with UI apps prevent response caching. In an MVC action method, the method-level attributes override the settings specified in class-level attributes.

The following code applies the `[ResponseCache]` attribute at the controller level and method level:

```csharp
[ApiController]
[ResponseCache(VaryByHeader = "User-Agent", Duration = 30)]
public class Time4Controller : ControllerBase
{
    [Route("api/[controller]")]
    [HttpGet]
    public ContentResult GetTime() => Content(
                      DateTime.Now.Millisecond.ToString());

    [Route("api/[controller]/ticks")]
    [HttpGet]
    public ContentResult GetTimeTicks() => Content(
                  DateTime.Now.Ticks.ToString());

    [Route("api/[controller]/ms")]
    [HttpGet]
    [ResponseCache(Duration = 10, Location = ResponseCacheLocation.Any, NoStore = false)]
    public ContentResult GetTimeMS() => Content(
                      DateTime.Now.Millisecond.ToString());
}
```

## Related content

* Storing Responses in Caches - RFC 9111: HTTP Caching (Section 3)
* Cache-Control - RFC 9111: HTTP Caching (Section 5.2)
* Cache in-memory in ASP.NET Core
* Distributed caching in ASP.NET Core
* Response caching middleware in ASP.NET Core
