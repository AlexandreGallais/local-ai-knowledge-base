---
title: "Output caching middleware in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/output.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Output caching middleware in ASP.NET Core

By Tom Dykstra

-->
-->

This article explains how to configure output caching middleware in an ASP.NET Core app. For an introduction to output caching, see Output caching.

The output caching middleware can be used in all types of ASP.NET Core apps: Minimal APIs, Web API with controllers, MVC, and Razor Pages. Code examples are provided for Minimal APIs and controller-based APIs. The controller-based API examples show how to use attributes to configure caching. These attributes can also be used in MVC and Razor Pages apps.

The code examples refer to a Gravatar class that generates an image and provides a "generated at" date and time. The class is defined and used only in the sample app. Its purpose is to make it easy to see when cached output is being used. For more information, see How to download a sample and Preprocessor directives.

## Add the middleware to the app

Add the output caching middleware to the service collection by calling the `Microsoft.Extensions.DependencyInjection.OutputCacheServiceCollectionExtensions.AddOutputCache*` method. For example:

```csharp
builder.Services.AddOutputCache();
```
Add the middleware to the request processing pipeline by calling the `Microsoft.AspNetCore.Builder.OutputCacheApplicationBuilderExtensions.UseOutputCache*` method. For example:

```csharp
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.UseOutputCache();
```
Calling the `AddOutputCache`and `UseOutputCache` methods doesn't start caching behavior, it makes caching available. To make the app cache responses, caching must be configured as described in the following sections.

> **Note:**
> * In apps that use Cross-Origin Requests (CORS) middleware, the `UseOutputCache` method must be called after the `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` method.
> * In Razor Pages apps and apps with controllers, the `UseOutputCache` method must be called after the `UseRouting` method.
> * In apps that use authentication or authorization, the `UseOutputCache` method must be called after the `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*` methods. Otherwise, the output caching middleware can serve content cached for unauthorized users instead of content for authorized users.

## Configure one endpoint or page

For Minimal API apps, configure an endpoint to do caching by calling the CacheOutput method, or by applying the [OutputCache] attribute, as shown in the following examples:

```csharp
app.MapGet("/cached", Gravatar.WriteGravatar).CacheOutput();
app.MapGet("/attribute", [OutputCache] (context) => 
    Gravatar.WriteGravatar(context));
```
For apps with controllers, apply the `[OutputCache]` attribute to the action method as shown in the following code:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache]
public class CachedController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
For Razor Pages apps, apply the attribute to the Razor page class.

## Configure multiple endpoints or pages

Create *policies* when calling the `AddOutputCache` method to specify caching configuration that applies to multiple endpoints. A policy can be selected for specific endpoints, while a base policy provides default caching configuration for a collection of endpoints.

The following highlighted code configures caching for all of the app's endpoints, with an expiration time of 10 seconds. If an expiration time isn't specified, it defaults to one minute.

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => 
        builder.Expire(TimeSpan.FromSeconds(10)));
    options.AddPolicy("Expire20", builder => 
        builder.Expire(TimeSpan.FromSeconds(20)));
    options.AddPolicy("Expire30", builder => 
        builder.Expire(TimeSpan.FromSeconds(30)));
});
```
The following highlighted code creates two policies, each specifying a different expiration time. Selected endpoints can use the 20-second expiration, and others can use the 30-second expiration.

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => 
        builder.Expire(TimeSpan.FromSeconds(10)));
    options.AddPolicy("Expire20", builder => 
        builder.Expire(TimeSpan.FromSeconds(20)));
    options.AddPolicy("Expire30", builder => 
        builder.Expire(TimeSpan.FromSeconds(30)));
});
```
You can select a policy for an endpoint when calling the `CacheOutput` method or by using the `[OutputCache]` attribute.

In a Minimal API app, the following code configures one endpoint with a 20-second expiration and one with a 30-second expiration:

```csharp
app.MapGet("/20", Gravatar.WriteGravatar).CacheOutput("Expire20");
app.MapGet("/30", [OutputCache(PolicyName = "Expire30")] (context) => 
    Gravatar.WriteGravatar(context));
```
For apps with controllers, apply the `[OutputCache]` attribute to the action method to select a policy:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache(PolicyName = "Expire20")]
public class Expire20Controller : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
For Razor Pages apps, apply the attribute to the Razor page class.

### Resolve policies dynamically with `IOutputCachePolicyProvider`

Implement the `Microsoft.AspNetCore.OutputCaching.IOutputCachePolicyProvider` interface when named or base policies must be resolved dynamically, such as from external configuration, a database, or tenant-specific rules. `GetBasePolicies` returns the base policies to apply to requests, and `GetPolicyAsync` resolves a named policy. Return `null` when a named policy isn't found. For tenant-specific responses, ensure the cache key varies by tenant so that one tenant's cached response isn't served to another tenant.

The default provider uses policies configured with `AddPolicy` and `AddBasePolicy`. To replace it, register a custom provider after calling `AddOutputCache`:

```csharp
builder.Services.AddOutputCache();
builder.Services.AddTransient<IOutputCachePolicyProvider, TenantOutputCachePolicyProvider>();
```

## Work with the default output caching policy

By default, output caching follows these rules:

* Only HTTP 200 responses are cached.
* Only HTTP GET or HEAD requests are cached.
* Responses that set cookies aren't cached.
* Responses to authenticated requests aren't cached.

The following code applies all of the default caching rules to all of an app's endpoints:

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder.Cache());
});
```
### Override the default policy

The following code shows how to override the default policy rules. The highlighted lines in the following custom policy code enable caching for HTTP POST methods and HTTP 301 responses:

```csharp
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Primitives;

namespace OCMinimal;

public sealed class MyCustomPolicy : IOutputCachePolicy
{
    public static readonly MyCustomPolicy Instance = new();

    private MyCustomPolicy()
    {
    }

    ValueTask IOutputCachePolicy.CacheRequestAsync(
        OutputCacheContext context, 
        CancellationToken cancellationToken)
    {
        var attemptOutputCaching = AttemptOutputCaching(context);
        context.EnableOutputCaching = true;
        context.AllowCacheLookup = attemptOutputCaching;
        context.AllowCacheStorage = attemptOutputCaching;
        context.AllowLocking = true;

        // Vary by any query by default
        context.CacheVaryByRules.QueryKeys = "*";

        return ValueTask.CompletedTask;
    }

    ValueTask IOutputCachePolicy.ServeFromCacheAsync
        (OutputCacheContext context, CancellationToken cancellationToken)
    {
        return ValueTask.CompletedTask;
    }

    ValueTask IOutputCachePolicy.ServeResponseAsync
        (OutputCacheContext context, CancellationToken cancellationToken)
    {
        var response = context.HttpContext.Response;

        // Verify existence of cookie headers
        if (!StringValues.IsNullOrEmpty(response.Headers.SetCookie))
        {
            context.AllowCacheStorage = false;
            return ValueTask.CompletedTask;
        }

        // Check response code
        if (response.StatusCode != StatusCodes.Status200OK && 
            response.StatusCode != StatusCodes.Status301MovedPermanently)
        {
            context.AllowCacheStorage = false;
            return ValueTask.CompletedTask;
        }

        return ValueTask.CompletedTask;
    }

    private static bool AttemptOutputCaching(OutputCacheContext context)
    {
        // Check if the current request fulfills the requirements
        // to be cached
        var request = context.HttpContext.Request;

        // Verify the method
        if (!HttpMethods.IsGet(request.Method) && 
            !HttpMethods.IsHead(request.Method) && 
            !HttpMethods.IsPost(request.Method))
        {
            return false;
        }

        // Verify existence of authorization headers
        if (!StringValues.IsNullOrEmpty(request.Headers.Authorization) || 
            request.HttpContext.User?.Identity?.IsAuthenticated == true)
        {
            return false;
        }

        return true;
    }
}
```
To use this custom policy, create a named policy:

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddPolicy("CachePost", MyCustomPolicy.Instance);
});
```
And, select the named policy for an endpoint. The following code selects the custom policy for an endpoint in a Minimal API app:

```csharp
app.MapPost("/cachedpost", Gravatar.WriteGravatar)
    .CacheOutput("CachePost");
```
The following code does the same for a controller action:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache(PolicyName = "CachePost")]
public class PostController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
### Use an alternative default policy override

Alternatively, use Dependency Injection (DI) to initialize an instance with the following changes to the custom policy class:

* Use a public constructor instead of a private constructor.
* Eliminate the `Instance` property in the custom policy class.

For example:

```csharp
public sealed class MyCustomPolicy2 : IOutputCachePolicy
{

    public MyCustomPolicy2()
    {
    }
```
The remainder of the class is the same as shown previously. Add the custom policy as shown in the following example:

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddPolicy("CachePost", builder => 
        builder.AddPolicy<MyCustomPolicy2>(), true);
});
```
The preceding code uses DI to create the instance of the custom policy class. Any public arguments in the constructor are resolved.

When using a custom policy as a base policy, don't call the `OutputCache()` method (with no arguments) or use the `[OutputCache]` attribute on any endpoint that the base policy should apply to. Calling the `OutputCache()` method or using the attribute adds the default policy to the endpoint.

## Specify the cache key

By default, every part of the URL is included as the key to a cache entry, that is, the scheme, host, port, path, and query string. However, you might want to explicitly control the cache key. For example, suppose you have an endpoint that returns a unique response only for each unique value of the `culture` query string. Variation in other parts of the URL, such as other query strings, shouldn't result in different cache entries. You can specify such rules in a policy, as shown in the following highlighted code:

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder
        .With(c => c.HttpContext.Request.Path.StartsWithSegments("/blog"))
        .Tag("tag-blog"));
    options.AddBasePolicy(builder => builder.Tag("tag-all"));
    options.AddPolicy("Query", builder => builder.SetVaryByQuery("culture"));
    options.AddPolicy("NoCache", builder => builder.NoCache());
    options.AddPolicy("NoLock", builder => builder.SetLocking(false));
});
```
You can then select the `VaryByQuery` policy for an endpoint. In a Minimal API app, the following code selects the `VaryByQuery` policy for an endpoint that returns a unique response only for each unique value of the `culture` query string:

```csharp
app.MapGet("/query", Gravatar.WriteGravatar).CacheOutput("Query");
```
The following code does the same for a controller action:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache(PolicyName = "Query")]
public class QueryController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
Here are some of the options for controlling the cache key:

* The `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery*` method specifies one or more query string names to add to the cache key.
* The `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader*` method specifies one or more HTTP headers to add to the cache key.
* The `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByValue*` method provides a value to add to the cache key. The following example uses a value that indicates whether the current server time in seconds is odd or even. A new response is generated only when the number of seconds changes from an odd to even value, or vice versa.

```csharp
builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => builder
        .With(c => c.HttpContext.Request.Path.StartsWithSegments("/blog"))
        .Tag("tag-blog"));
    options.AddBasePolicy(builder => builder.Tag("tag-all"));
    options.AddPolicy("Query", builder => builder.SetVaryByQuery("culture"));
    options.AddPolicy("NoCache", builder => builder.NoCache());
    options.AddPolicy("NoLock", builder => builder.SetLocking(false));
    options.AddPolicy("VaryByValue", builder => 
        builder.VaryByValue((context) =>
            new KeyValuePair<string, string>(
            "time", (DateTime.Now.Second % 2)
                .ToString(CultureInfo.InvariantCulture))));
});
```
Use the `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.UseCaseSensitivePaths` property to specify that the path part of the key is case sensitive. The default is case insensitive.

For more options, see the `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder` class.
