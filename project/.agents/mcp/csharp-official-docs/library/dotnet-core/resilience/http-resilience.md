---
title: "Build resilient HTTP apps: Key development patterns (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/resilience/http-resilience.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build resilient HTTP apps: Key <example-value> patterns

Building robust HTTP apps that can recover from transient fault errors is a common requirement. This article assumes that you've already read Introduction to resilient app development, as this article extends the core concepts conveyed. To help build resilient HTTP apps, the Microsoft.Extensions.Http.Resilience NuGet package provides resilience mechanisms specifically for the `System.Net.Http.HttpClient`. This NuGet package relies on the `Microsoft.Extensions.Resilience` library and _Polly_, which is a popular open-source project. For more information, see Polly.

## Get started

To use resilience-patterns in HTTP apps, install the Microsoft.Extensions.Http.Resilience NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Http.Resilience
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.Http.Resilience" />
```

---

For more information, see dotnet package add or Manage package dependencies in .NET applications.

## Add resilience to an HTTP client

To add resilience to an `System.Net.Http.HttpClient`, you chain a call on the `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` type that is returned from calling any of the available `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` methods. For more information, see IHttpClientFactory with .NET.

There are several resilience-centric extensions available. Some are standard, thus employing various industry best practices, and others are more customizable. When adding resilience, you should only add one resilience handler and avoid stacking handlers. If you need to add multiple resilience handlers, you should consider using the `AddResilienceHandler` extension method, which allows you to customize the resilience strategies.

> **Important:**
> All examples within this article rely on the `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` API, from the Microsoft.Extensions.Http library, which returns an `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` instance. The `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` instance is used to configure the `System.Net.Http.HttpClient` and add the resilience handler. If you need to add resilience to a `static` or *singleton* `HttpClient` without a DI container, see Resilience with static clients.

## Add standard resilience handler

The standard resilience handler uses multiple resilience strategies stacked atop one another, with default options to send the requests and handle any transient errors. The standard resilience handler is added by calling the `AddStandardResilienceHandler` extension method on an `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` instance.

```csharp
var services = new ServiceCollection();

var httpClientBuilder = services.AddHttpClient<ExampleClient>(
    configureClient: static client =>
    {
        client.BaseAddress = new("https://jsonplaceholder.typicode.com");
    });
```
The preceding code:

- Creates a `Microsoft.Extensions.DependencyInjection.ServiceCollection` instance.
- Adds an `System.Net.Http.HttpClient` for the `ExampleClient` type to the service container.
- Configures the `System.Net.Http.HttpClient` to use `"https://jsonplaceholder.typicode.com"` as the base address.
- Creates the `httpClientBuilder` that's used throughout the other examples within this article.

A more real-world example would rely on hosting, such as that described in the .NET Generic Host article. Using the Microsoft.Extensions.Hosting NuGet package, consider the following updated example:

```csharp
using Http.Resilience.Example;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);

IHttpClientBuilder httpClientBuilder = builder.Services.AddHttpClient<ExampleClient>(
    configureClient: static client =>
    {
        client.BaseAddress = new("https://jsonplaceholder.typicode.com");
    });
```
The preceding code is similar to the manual `ServiceCollection` creation approach, but instead relies on the `Microsoft.Extensions.Hosting.Host.CreateApplicationBuilder` to build out a host that exposes the services.

The `ExampleClient` is defined as follows:

```csharp
﻿using System.Net.Http.Json;

namespace Http.Resilience.Example;

/// <summary>
/// An example client service, that relies on the <see cref="HttpClient"/> instance.
/// </summary>
/// <param name="client">The given <see cref="HttpClient"/> instance.</param>
internal sealed class ExampleClient(HttpClient client)
{
    /// <summary>
    /// Returns an <see cref="IAsyncEnumerable{T}"/> of <see cref="Comment"/>s.
    /// </summary>
    public IAsyncEnumerable<Comment?> GetCommentsAsync()
    {
        return client.GetFromJsonAsAsyncEnumerable<Comment>("/comments");
    }
}
```
The preceding code:

- Defines an `ExampleClient` type that has a constructor that accepts an `System.Net.Http.HttpClient`.
- Exposes a `GetCommentsAsync` method that sends a GET request to the `/comments` endpoint and returns the response.

The `Comment` type is defined as follows:

```csharp
﻿namespace Http.Resilience.Example;

public record class Comment(
    int PostId, int Id, string Name, string Email, string Body);
```
Given that you've created an `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder` (`httpClientBuilder`), and you now understand the `ExampleClient` implementation and corresponding `Comment` model, consider the following example:

```csharp
httpClientBuilder.AddStandardResilienceHandler();
```
The preceding code adds the standard resilience handler to the `System.Net.Http.HttpClient`. Like most resilience APIs, there are overloads that allow you to customize the default options and applied resilience strategies.

## Remove standard resilience handlers

There's a method `Microsoft.Extensions.DependencyInjection.ResilienceHttpClientBuilderExtensions.RemoveAllResilienceHandlers*` which removes all previously registered resilience handlers. It's useful when you need to clear existing resilience handlers to add your custom one.
The following example demonstrates how to configure a custom `System.Net.Http.HttpClient` using the `AddHttpClient` method, remove all predefined resilience strategies, and replace them with new handlers.
This approach allows you to clear existing configurations and define new ones according to your specific requirements.

```csharp
// By default, we want all HttpClient instances to include the StandardResilienceHandler.
      services.ConfigureHttpClientDefaults(builder => builder.AddStandardResilienceHandler());
      // For a named HttpClient "custom" we want to remove the StandardResilienceHandler and add the StandardHedgingHandler instead.
services.AddHttpClient("custom")
          .RemoveAllResilienceHandlers()
          .AddStandardHedgingHandler();
```
The preceding code:

- Creates a `Microsoft.Extensions.DependencyInjection.ServiceCollection` instance.
- Adds the standard resilience handler to all `System.Net.Http.HttpClient` instances.
- For the "custom" `System.Net.Http.HttpClient`:
  - Removes all predefined resilience handlers that were previously registered. This is useful when you want to start with a clean state to add your own custom strategies.
  - Adds a `StandardHedgingHandler` to the `System.Net.Http.HttpClient`. You can replace `AddStandardHedgingHandler()` with any strategy that suits your application's needs, such as retry mechanisms, circuit breakers, or other resilience techniques.

### Standard resilience handler defaults

The default configuration chains five resilience strategies in the following order (from the outermost to the innermost):

| Order | Strategy | Description | Defaults |
|--:|--|--|--|
| **1** | Rate limiter | The rate limiter pipeline limits the maximum number of concurrent requests being sent to the dependency. | Queue: `0`Permit: `1_000` |
| **2** | Total timeout | The total request timeout pipeline applies an overall timeout to the execution, ensuring that the request, including retry attempts, doesn't exceed the configured limit. | Total timeout: 30s |
| **3** | Retry | The retry pipeline retries the request in case the dependency is slow or returns a transient error. | Max retries: `3`Backoff: `Exponential`Use jitter: `true`Delay:2s |
| **4** | Circuit breaker | The circuit breaker blocks the execution if too many direct failures or timeouts are detected. | Failure ratio: 10%Min throughput: `100`Sampling duration: 30sBreak duration: 5s |
| **5** | Attempt timeout | The attempt timeout pipeline limits each request attempt duration and throws if it's exceeded. | Attempt timeout: 10s |

#### Retries and circuit breakers

The retry and circuit breaker strategies both handle a set of specific HTTP status codes and exceptions. Consider the following HTTP status codes:

- HTTP 500 and above (Server errors)
- HTTP 408 (Request timeout)
- HTTP 429 (Too many requests)

Additionally, these strategies handle the following exceptions:

- `HttpRequestException`
- `TimeoutRejectedException`

#### Disable retries for a given list of HTTP methods

By default, the standard resilience handler is configured to make retries for all HTTP methods. For some applications, such behavior could be undesirable or even harmful. For example, if a POST request inserts a new record to a database, then making retries for such a request could lead to data duplication. If you need to disable retries for a given list of HTTP methods you can use the `Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptionsExtensions.DisableFor(Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions,System.Net.Http.HttpMethod[])` method:

```csharp
httpClientBuilder.AddStandardResilienceHandler(options =>
{
    options.Retry.DisableFor(HttpMethod.Post, HttpMethod.Delete);
});
```
Alternatively, you can use the `Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptionsExtensions.DisableForUnsafeHttpMethods(Microsoft.Extensions.Http.Resilience.HttpRetryStrategyOptions)` method, which disables retries for `POST`, `PATCH`, `PUT`, `DELETE`, and `CONNECT` requests. According to RFC, these methods are considered unsafe; meaning their semantics aren't read-only:

```csharp
httpClientBuilder.AddStandardResilienceHandler(options =>
{
    options.Retry.DisableForUnsafeHttpMethods();
});
```
