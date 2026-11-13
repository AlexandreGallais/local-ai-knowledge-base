---
title: "What's new in ASP.NET Core in .NET 9 (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9.0.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 9 (part 5 of 6)

## Miscellaneous

The following sections describe miscellaneous new features.

### New `HybridCache` library

> **Important:**
> `HybridCache` is currently still in preview but will be fully released *after* .NET 9 in a future minor release of .NET Extensions.

The `Microsoft.Extensions.Caching.Hybrid.HybridCache` API bridges some gaps in the existing `Microsoft.Extensions.Caching.Distributed.IDistributedCache` and `Microsoft.Extensions.Caching.Memory.IMemoryCache` APIs. It also adds new capabilities, such as:

* **"Stampede" protection** to prevent parallel fetches of the same work.
* Configurable serialization.

`HybridCache` is designed to be a drop-in replacement for existing `IDistributedCache` and `IMemoryCache` usage, and it provides a simple API for adding new caching code. It provides a unified API for both in-process and out-of-process caching.

To see how the `HybridCache` API is simplified, compare it to code that uses `IDistributedCache`. Here's an example of what using `IDistributedCache` looks like:

```csharp
public class SomeService(IDistributedCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = <example-value>)
    {
        var key = $"someinfo:{name}:{id}"; // Unique key for this combination.
        var bytes = await cache.GetAsync(key, token); // Try to get from cache.
        SomeInformation info;
        if (bytes is null)
        {
            // Cache miss; get the data from the real source.
            info = await SomeExpensiveOperationAsync(name, id, token);

            // Serialize and cache it.
            bytes = SomeSerializer.Serialize(info);
            await cache.SetAsync(key, bytes, token);
        }
        else
        {
            // Cache hit; deserialize it.
            info = SomeSerializer.Deserialize<SomeInformation>(bytes);
        }
        return info;
    }

    // This is the work we're trying to cache.
    private async Task<SomeInformation> SomeExpensiveOperationAsync(string name, int id,
        CancellationToken token = <example-value>)
    { /* ... */ }
}
```

That's a lot of work to get right each time, including things like serialization. And in the cache miss scenario, you could end up with multiple concurrent threads, all getting a cache miss, all fetching the underlying data, all serializing it, and all sending that data to the cache.

To simplify and improve this code with `HybridCache`, we first need to add the new library `Microsoft.Extensions.Caching.Hybrid`:

```xml
<PackageReference Include="Microsoft.Extensions.Caching.Hybrid" Version="9.0.0" />
```

Register the `HybridCache` service, like you would register an `IDistributedCache` implementation:

```csharp
builder.Services.AddHybridCache(); // Not shown: optional configuration API.
```

Now most caching concerns can be offloaded to `HybridCache`:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync
        (string name, int id, CancellationToken token = <example-value>)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // Unique key for this combination.
            async cancel => await SomeExpensiveOperationAsync(name, id, cancel),
            token: token
        );
    }
}
```

We provide a concrete implementation of the `HybridCache` abstract class via dependency injection, but it's intended that developers can provide custom implementations of the API. The `HybridCache` implementation deals with everything related to caching, including concurrent operation handling. The `cancel` token here represents the combined cancellation of *all* concurrent callers—not just the cancellation of the caller we can see (that is, `token`).

High throughput scenarios can be further optimized by using the `TState` pattern, to avoid some overhead from captured variables and per-instance callbacks:

```csharp
public class SomeService(HybridCache cache)
{
    public async Task<SomeInformation> GetSomeInformationAsync(string name, int id, CancellationToken token = <example-value>)
    {
        return await cache.GetOrCreateAsync(
            $"someinfo:{name}:{id}", // unique key for this combination
            (name, id), // all of the state we need for the final call, if needed
            static async (state, token) =>
                await SomeExpensiveOperationAsync(state.name, state.id, token),
            token: token
        );
    }
}
```

`HybridCache` uses the configured `IDistributedCache` implementation, if any, for secondary out-of-process caching, for example, using
Redis. But even without an `IDistributedCache`, the `HybridCache` service will still provide in-process caching and "stampede" protection.

#### A note on object reuse

In typical existing code that uses `IDistributedCache`, every retrieval of an object from the cache results in deserialization. This behavior means that each concurrent caller gets a separate instance of the object, which cannot interact with other instances. The result is thread safety, as there's no risk of concurrent modifications to the same object instance.

Because a lot of `HybridCache` usage will be adapted from existing `IDistributedCache` code, `HybridCache` preserves this behavior by default to avoid introducing concurrency bugs. However, a given use case is inherently thread-safe:

* If the types being cached are immutable.
* If the code doesn't modify them.

In such cases, inform `HybridCache` that it's safe to reuse instances by making both of the following changes:

* Marking the type as `sealed`. The `sealed` keyword in C# means that the class can't be inherited.
* Applying the `[ImmutableObject(true)]` attribute to it. The `[ImmutableObject(true)]` attribute indicates that the object's state can't be changed after it's created.

By reusing instances, `HybridCache` can reduce the overhead of CPU and object allocations associated with per-call deserialization. This can lead to performance improvements in scenarios where the cached objects are large or accessed frequently.

#### Other `HybridCache` features

Like `IDistributedCache`, `HybridCache` supports removal by key with a `RemoveKeyAsync` method.

`HybridCache` also provides optional APIs for `IDistributedCache` implementations, to avoid `byte[]` allocations. This feature is implemented
by the preview versions of the `Microsoft.Extensions.Caching.StackExchangeRedis`,  `Microsoft.Extensions.Caching.SqlServer`, and `Microsoft.Extensions.Caching.Postgres` packages.

Serialization is configured as part of registering the service, with support for type-specific and generalized serializers via the
`WithSerializer` and `.WithSerializerFactory` methods, chained from the `AddHybridCache` call. By default, the library
handles `string` and `byte[]` internally, and uses `System.Text.Json` for everything else, but you can use protobuf, xml, or anything
else.

`HybridCache` supports older .NET runtimes, down to .NET Framework 4.7.2 and .NET Standard 2.0.

For more information about `HybridCache`, see HybridCache library in ASP.NET Core

### Developer exception page improvements

The ASP.NET Core developer exception page is displayed when an app throws an unhandled exception during development. The developer exception page provides detailed information about the exception and request.

Preview 3 added endpoint metadata to the developer exception page. ASP.NET Core uses endpoint metadata to control endpoint behavior, such as routing, response caching, rate limiting, OpenAPI generation, and more. The following image shows the new metadata information in the `Routing` section of the developer exception page:

While testing the developer exception page, small quality of life improvements were identified. They shipped in Preview 4:

* Better text wrapping. Long cookies, query string values, and method names no longer add horizontal browser scroll bars.
* Bigger text which is found in modern designs.
* More consistent table sizes.

The following animated image shows the new developer exception page:

### Dictionary debugging improvements

The debugging display of dictionaries and other key-value collections has an improved layout. The key is displayed in the debugger's key <example-value> instead of being concatenated with the value. The following images show the old and new display of a dictionary in the debugger.

Before:

After:

ASP.NET Core has many key-value collections. This improved debugging experience applies to:

* HTTP headers
* Query strings
* Forms
* Cookies
* View data
* Route data
* Features

### Fix for 503's during app recycle in IIS

By default there is now a 1 second delay between when IIS is notified of a recycle or shutdown and when ANCM tells the managed server to start shutting down. The delay is configurable via the `ANCM_shutdownDelay` environment variable or by setting the `shutdownDelay` handler setting. Both values are in milliseconds. The delay is mainly to reduce the likelihood of a race where:

* IIS hasn't started queuing requests to go to the new app.
* ANCM starts rejecting new requests that come into the old app.

Slower machines or machines with heavier CPU usage may want to adjust this value to reduce 503 likelihood.

Example of setting `shutdownDelay`:

```xml
<aspNetCore processPath="dotnet" arguments="myapp.dll" stdoutLogEnabled="false" stdoutLogFile=".logsstdout">
  <handlerSettings>
    <!-- Milliseconds to delay shutdown by.
    this doesn't mean incoming requests will be delayed by this amount,
    but the old app instance will start shutting down after this timeout occurs -->
    <handlerSetting name="shutdownDelay" value="5000" />
  </handlerSettings>
</aspNetCore>
```

The fix is in the globally installed ANCM module that comes from the hosting bundle.

### ASP0026: Analyzer to warn when [Authorize] is overridden by [AllowAnonymous] from "farther away"

It seems intuitive that an `[Authorize]` attribute placed "closer" to an MVC action than an `[AllowAnonymous]` attribute would override the `[AllowAnonymous]` attribute and force authorization. However, this is not necessarily the case. What does matter is the relative order of the attributes.

> **Note:**
> The `[AllowAnonymous]` attribute doesn't disable authentication entirely. When credentials are sent to an endpoint with `[AllowAnonymous]`, the endpoint still authenticates those credentials and establishes the user's identity. The `[AllowAnonymous]` attribute only means that authentication is **not required**—the endpoint will run as anonymous only when no credentials are provided. This behavior can be useful for endpoints that need to work for both authenticated and anonymous users.

The following code shows examples where a closer `[Authorize]` attribute gets overridden by an `[AllowAnonymous]` attribute that is farther away.

```csharp
[AllowAnonymous]
public class MyController
{
    [Authorize] // Overridden by the [AllowAnonymous] attribute on the class
    public IActionResult Private() => null;
}
```

```csharp
[AllowAnonymous]
public class MyControllerAnon : ControllerBase
{
}

[Authorize] // Overridden by the [AllowAnonymous] attribute on MyControllerAnon
public class MyControllerInherited : MyControllerAnon
{
}

public class MyControllerInherited2 : MyControllerAnon
{
    [Authorize] // Overridden by the [AllowAnonymous] attribute on MyControllerAnon
    public IActionResult Private() => null;
}
```

```csharp
[AllowAnonymous]
[Authorize] // Overridden by the preceding [AllowAnonymous]
public class MyControllerMultiple : ControllerBase
{
}
```

In .NET 9 Preview 6, we've introduced an analyzer that will highlight instances like these where a closer `[Authorize]` attribute gets overridden by an `[AllowAnonymous]` attribute that is farther away from an MVC action. The warning points to the overridden `[Authorize]` attribute with the following message:

```
ASP0026 [Authorize] overridden by [AllowAnonymous] from farther away
```

The correct action to take if you see this warning depends on the intention behind the attributes. The farther away `[AllowAnonymous]` attribute should be removed if it's unintentionally exposing the endpoint to anonymous users. If the `[AllowAnonymous]` attribute was intended to override a closer `[Authorize]` attribute, you can repeat the `[AllowAnonymous]` attribute after the `[Authorize]` attribute to clarify the intent.

```csharp
[AllowAnonymous]
public class MyController
{
    // This produces no warning because the second, "closer" [AllowAnonymous]
    // clarifies that [Authorize] is intentionally overridden.
    // Specifying AuthenticationSchemes can be useful for endpoints that
    // allow but don't require authenticated users. When credentials are sent,
    // they will be authenticated; when no credentials are sent, the endpoint
    // allows anonymous access.
    [Authorize(AuthenticationSchemes = "Cookies")]
    [AllowAnonymous]
    public IActionResult Privacy() => null;
}
```

### Improved Kestrel connection metrics

We've made a significant improvement to Kestrel's connection metrics by including metadata about why a connection failed. The `kestrel.connection.duration` metric now includes the connection close reason in the `error.type` attribute.

Here is a small sample of the `error.type` values:

* `tls_handshake_failed` - The connection requires TLS, and the TLS handshake failed.
* `connection_reset` - The connection was unexpectedly closed by the client while requests were in progress.
* `request_headers_timeout` - Kestrel closed the connection because it didn't receive request headers in time.
* `max_request_body_size_exceeded` - Kestrel closed the connection because uploaded data exceeded max size.

Previously, diagnosing Kestrel connection issues required a server to record detailed, low-level logging. However, logs can be expensive to generate and store, and it can be difficult to find the right information among the noise.

Metrics are a much cheaper alternative that can be left on in a production environment with minimal impact. Collected metrics can drive dashboards and alerts. Once a problem is identified at a high-level with metrics, further investigation using logging and other tooling can begin.

We expect improved connection metrics to be useful in many scenarios:

* Investigating performance issues caused by short connection lifetimes.
* Observing ongoing external attacks on Kestrel that impact performance and stability.
* Recording attempted external attacks on Kestrel that Kestrel's built-in security hardening prevented.

For more information, see ASP.NET Core metrics.
