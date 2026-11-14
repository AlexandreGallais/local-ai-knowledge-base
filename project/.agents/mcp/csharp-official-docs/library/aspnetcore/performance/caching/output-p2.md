---
title: "Output caching middleware in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/caching/output.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Output caching middleware in ASP.NET Core (part 2 of 2)

## Enable cache revalidation

Cache revalidation means the server can return a _304 Not Modified_ HTTP status code instead of the full response body. This status code informs the client that the response to the request is unchanged from what the client previously received.

The following code illustrates the use of an ETag header to enable cache revalidation. If the client sends an If-None-Match header with the value for the `ETag` from an earlier response, and the cache entry is fresh, the server returns the 304 Not Modified code instead of the full response.

The following code sets the `ETag` value in a policy in a Minimal API app:

```csharp
app.MapGet("/etag", async (context) =>
{
    var etag = $"\"{Guid.NewGuid():n}\"";
    context.Response.Headers.ETag = etag;
    await Gravatar.WriteGravatar(context);

}).CacheOutput();
```
The following code does the same for a controller-based API:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache]
public class EtagController : ControllerBase
{
    public async Task GetAsync()
    {
        var etag = $"\"{Guid.NewGuid():n}\"";
        HttpContext.Response.Headers.ETag = etag;
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
Another way to do cache revalidation is to check the date of the cache entry creation compared to the date requested by the client. When the request header `If-Modified-Since` is provided, output caching returns the 304 code if the cached entry is older and isn't expired.

Cache revalidation is automatic in response to these headers sent from the client. No special configuration is required on the server to enable this behavior, aside from enabling output caching.

## Use tags to evict cache entries

You can use tags to identify a group of endpoints and evict all cache entries for the group. For example, the following Minimal API code creates a pair of endpoints whose URLs begin with the text `blog` and applies the `tag-blog` tag:

```csharp
app.MapGet("/blog", Gravatar.WriteGravatar)
    .CacheOutput(builder => builder.Tag("tag-blog"));
app.MapGet("/blog/post/{id}", Gravatar.WriteGravatar)
    .CacheOutput(builder => builder.Tag("tag-blog"));
```
The following code shows how to assign tags to an endpoint in a controller-based API:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache(Tags = new[] { "tag-blog", "tag-all" })]
public class TagEndpointController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
An alternative way to assign tags for endpoints with routes that begin with `blog` is to define a base policy that applies to all endpoints with that route. The following code demonstrates this approach:

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
Another alternative for Minimal API apps is to call the MapGroup method:

```csharp
var blog = app.MapGroup("blog")
    .CacheOutput(builder => builder.Tag("tag-blog"));
blog.MapGet("/", Gravatar.WriteGravatar);
blog.MapGet("/post/{id}", Gravatar.WriteGravatar);
```
In the preceding tag assignment examples, both endpoints are identified by the `tag-blog` tag. You can then evict the cache entries for those endpoints with a single statement that references that tag:

```csharp
app.MapPost("/purge/{tag}", async (IOutputCacheStore cache, string tag) =>
{
    await cache.EvictByTagAsync(tag, default);
});
```
With this code, an HTTP POST request sent to the `https://localhost:<port>/purge/tag-blog` URL evicts cache entries for these endpoints.

You might want a way to evict all cache entries for all endpoints. You can create a base policy for all endpoints as demonstrated in the following code:

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
This base policy enables you to use the `tag-all` tag to evict everything in cache.

## Disable resource locking

By default, resource locking is enabled to mitigate the risk of cache stampede and thundering herd. For more information, see Output Caching.

To disable resource locking, call the SetLocking(false) method while creating a policy, as shown in the following example:

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
The next example selects the no-locking policy for an endpoint in a Minimal API app:

```csharp
app.MapGet("/nolock", Gravatar.WriteGravatar)
    .CacheOutput("NoLock");
```
In a controller-based API, use the attribute to select the policy:

```csharp
[ApiController]
[Route("/[controller]")]
[OutputCache(PolicyName = "NoLock")]
public class NoLockController : ControllerBase
{
    public async Task GetAsync()
    {
        await Gravatar.WriteGravatar(HttpContext);
    }
}
```
## Configure limits

The following properties of the `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions` class let you configure limits that apply to all endpoints:

* The `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.SizeLimit` property sets the maximum size for the cache storage. When the limit is reached, no new responses are cached until older entries are evicted. The default value is 100 MB.
* The `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.MaximumBodySize` property sets the maximum size for the response body. If the response body exceeds the limit, it isn't cached. The default value is 64 MB.
* The `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.DefaultExpirationTimeSpan` property sets the maximum duration a response is cached, when a time isn't specified in a policy. The default value is 60 seconds.

## Explore cache storage options

The `Microsoft.AspNetCore.OutputCaching.IOutputCacheStore` interface is used for storage. By default, it's used with the `System.Runtime.Caching.MemoryCache` class. Cached responses are stored in-process, so each server has a separate cache that is lost whenever the server process restarts.

### Alternative: Redis cache

An alternative is to use Redis cache. Redis cache provides consistency between server nodes via a shared cache that outlives individual server processes. To use Redis for output caching:

* Install the Microsoft.AspNetCore.OutputCaching.StackExchangeRedis NuGet package.

* Call the `builder.Services.AddStackExchangeRedisOutputCache` method (not the `AddStackExchangeRedisCache` method), and provide a connection string that points to a Redis server.

  For example:

```csharp
builder.Services.AddStackExchangeRedisOutputCache(options =>
{
    options.Configuration = 
        builder.Configuration.GetConnectionString("MyRedisConStr");
    options.InstanceName = "SampleInstance";
});

builder.Services.AddOutputCache(options =>
{
    options.AddBasePolicy(builder => 
        builder.Expire(TimeSpan.FromSeconds(10)));
});
```
  * The options.Configuration property is a connection string to an on-premises Redis server or to a hosted offering such as Azure Cache for Redis. For example, `<instance_name>.redis.cache.windows.net:6380,password=,pw,ssl=True,abortConnect=False` for Azure Cache for Redis.

  * (Optional) The options.InstanceName property specifies a logical partition for the cache.

  The configuration options are identical to the Redis-based distributed caching options.

### Not recommended: IDistributedCache

The `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface isn't recommended for use with output caching. This interface doesn't provide atomic features, which are required for tagging.

The recommended approach is to use the built-in support for Redis or create a custom `Microsoft.AspNetCore.OutputCaching.IOutputCacheStore` implementation by using direct dependencies on the underlying storage mechanism.

## Related content

* Overview of caching in ASP.NET Core
* ASP.NET Core middleware
* `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions`
* `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder`
