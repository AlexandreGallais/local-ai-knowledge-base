---
title: "Caching in .NET (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/caching.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Caching in .NET (part 2 of 3)

## Worker Service caching

One common strategy for caching data is updating the cache independently from the consuming data services. The *Worker Service* template is a great example, as the `Microsoft.Extensions.Hosting.BackgroundService` runs independently (or in the background) from the other application code. When an application starts running that hosts an implementation of the `Microsoft.Extensions.Hosting.IHostedService`, the corresponding implementation (in this case the `BackgroundService` or "worker") start running in the same process. These hosted services are registered with DI as singletons, through the `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extension method. Other services can be registered with DI with any service lifetime.

> **Important:**
> The service lifetimes are important to understand. When you call `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*` to register all of the in-memory caching services, the services are registered as singletons.

### Photo service scenario

Imagine you're developing a photo service that relies on third-party API accessible via HTTP. This photo data doesn't change often, but there's a lot of it. Each photo is represented by a simple `record`:

```csharp
﻿namespace CachingExamples.Memory;

public readonly record struct Photo(
    int AlbumId,
    int Id,
    string Title,
    string Url,
    string ThumbnailUrl);
```
In the following example, you see several services being registered with DI. Each service has a single responsibility.

```csharp
﻿using CachingExamples.Memory;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

builder.Services.AddMemoryCache();
builder.Services.AddHttpClient<CacheWorker>();
builder.Services.AddHostedService<CacheWorker>();
builder.Services.AddScoped<PhotoService>();
builder.Services.AddSingleton(typeof(CacheSignal<>));

using IHost host = builder.Build();

await host.StartAsync();
```
In the preceding C# code:

- The generic host is created with defaults.
- In-memory caching services are registered with `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*`.
- An `HttpClient` instance is registered for the `CacheWorker` class with `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`.
- The `CacheWorker` class is registered with `Microsoft.Extensions.DependencyInjection.ServiceCollectionHostedServiceExtensions.AddHostedService``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`.
- The `PhotoService` class is registered with `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddScoped``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)`.
- The `CacheSignal<T>` class is registered with `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddSingleton*`.
- The `host` is instantiated from the builder and started asynchronously.

The `PhotoService` is responsible for getting photos that match given criteria (or `filter`):

```csharp
﻿using Microsoft.Extensions.Caching.Memory;

namespace CachingExamples.Memory;

public sealed class PhotoService(
        IMemoryCache cache,
        CacheSignal<Photo> cacheSignal,
        ILogger<PhotoService> logger)
{
    public async IAsyncEnumerable<Photo> GetPhotosAsync(Func<Photo, bool>? filter = default)
    {
        try
        {
            await cacheSignal.WaitAsync();

            Photo[] photos =
                (await cache.GetOrCreateAsync(
                    "Photos", _ =>
                    {
                        logger.LogWarning("This should never happen!");

                        return Task.FromResult(Array.Empty<Photo>());
                    }))!;

            // If no filter is provided, use a pass-thru.
            filter ??= _ => true;

            foreach (Photo photo in photos)
            {
                if (!default(Photo).Equals(photo) && filter(photo))
                {
                    yield return photo;
                }
            }
        }
        finally
        {
            cacheSignal.Release();
        }
    }
}
```
In the preceding C# code:

- The constructor requires an `IMemoryCache`, `CacheSignal<Photo>`, and `ILogger`.
- The `GetPhotosAsync` method:
  - Defines a `Func<Photo, bool> filter` parameter, and returns an `IAsyncEnumerable<Photo>`.
  - Calls and waits for the `_cacheSignal.WaitAsync()` to release; this ensures that the cache is populated before accessing the cache.
  - Calls `_cache.GetOrCreateAsync()`, asynchronously getting all of the photos in the cache.
  - The `factory` argument logs a warning and returns an empty photo array - this should never happen.
  - Each photo in the cache is iterated, filtered, and materialized with `yield return`.
  - Finally, the cache signal is reset.

Consumers of this service are free to call `GetPhotosAsync` method, and handle photos accordingly. No `HttpClient` is required as the cache contains the photos.

The asynchronous signal is based on an encapsulated `System.Threading.SemaphoreSlim` instance, within a generic-type constrained singleton. The `CacheSignal<T>` relies on an instance of `SemaphoreSlim`:

```csharp
﻿namespace CachingExamples.Memory;

public sealed class CacheSignal<T>
{
    private readonly SemaphoreSlim _semaphore = new(1, 1);

    /// <summary>
    /// Exposes a <see cref="Task"/> that represents the asynchronous wait operation.
    /// When signaled (consumer calls <see cref="Release"/>), the 
    /// <see cref="Task.Status"/> is set as <see cref="TaskStatus.RanToCompletion"/>.
    /// </summary>
    public Task WaitAsync() => _semaphore.WaitAsync();

    /// <summary>
    /// Exposes the ability to signal the release of the <see cref="WaitAsync"/>'s operation.
    /// Callers who were waiting, will be able to continue.
    /// </summary>
    public void Release() => _semaphore.Release();
}
```
In the preceding C# code, the decorator pattern is used to wrap an instance of the `SemaphoreSlim`. Since the `CacheSignal<T>` is registered as a singleton, it can be used across all service lifetimes with any generic type—in this case, the `Photo`. It's responsible for signaling the seeding of the cache.

The `CacheWorker` is a subclass of `Microsoft.Extensions.Hosting.BackgroundService`:

```csharp
﻿using System.Net.Http.Json;
using Microsoft.Extensions.Caching.Memory;

namespace CachingExamples.Memory;

public sealed class CacheWorker(
    ILogger<CacheWorker> logger,
    HttpClient httpClient,
    CacheSignal<Photo> cacheSignal,
    IMemoryCache cache) : BackgroundService
{
    private readonly TimeSpan _updateInterval = TimeSpan.FromHours(3);

    private bool _isCacheInitialized = false;

    private const string Url = "https://jsonplaceholder.typicode.com/photos";

    public override async Task StartAsync(CancellationToken <example-value>)
    {
        await cacheSignal.WaitAsync();
        await base.StartAsync(cancellationToken);
    }

    protected override async Task ExecuteAsync(CancellationToken <example-value>)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Updating cache.");

            try
            {
                Photo[]? photos =
                    await httpClient.GetFromJsonAsync<Photo[]>(
                        Url, stoppingToken);

                if (photos is { Length: > 0 })
                {
                    cache.Set("Photos", photos);
                    logger.LogInformation(
                        "Cache updated with {Count:#,#} photos.", photos.Length);
                }
                else
                {
                    logger.LogWarning(
                        "Unable to fetch photos to update cache.");
                }
            }
            finally
            {
                if (!_isCacheInitialized)
                {
                    cacheSignal.Release();
                    _isCacheInitialized = true;
                }
            }

            try
            {
                logger.LogInformation(
                    "Will attempt to update the cache in {Hours} hours from now.",
                    _updateInterval.Hours);

                await Task.Delay(_updateInterval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                logger.LogWarning("Cancellation acknowledged: shutting down.");
                break;
            }
        }
    }
}
```
In the preceding C# code:

- The constructor requires an `ILogger`, `HttpClient`, and `IMemoryCache`.
- The `_updateInterval` is defined for three hours.
- The `ExecuteAsync` method:
  - Loops while the app is running.
  - Makes an HTTP request to `"https://jsonplaceholder.typicode.com/photos"`, and maps the response as an array of `Photo` objects.
  - The array of photos is placed in the `IMemoryCache` under the `"Photos"` key.
  - The `_cacheSignal.Release()` is called, releasing any consumers who were waiting for the signal.
  - The call to `System.Threading.Tasks.Task.Delay*` is awaited, given the update interval.
  - After delaying for three hours, the cache is again updated.

Consumers in the same process could ask the `IMemoryCache` for the photos, but the `CacheWorker` is responsible for updating the cache.
