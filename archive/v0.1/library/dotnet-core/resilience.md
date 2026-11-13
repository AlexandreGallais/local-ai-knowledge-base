---
title: "Introduction to resilient app development"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/resilience/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Introduction to resilient app development

Resiliency is the ability of an app to recover from transient failures and continue to function. In the context of .NET programming, resilience is achieved by designing apps that can handle failures gracefully and recover quickly. To help build resilient apps in .NET, the following two packages are available on NuGet:

| NuGet package | Description |
|---------------|-------------|
| 📦 Microsoft.Extensions.Resilience | Provides mechanisms to harden apps against transient failures. The 10.x.x versions of this package support apps that target .NET, .NET Framework, and .NET Standard. |
| 📦 Microsoft.Extensions.Http.Resilience | Provides resilience mechanisms specifically for the `System.Net.Http.HttpClient` class. |

These two NuGet packages are built on top of Polly, which is a popular open-source project. Polly is a .NET resilience and transient fault-handling library that allows developers to express strategies such as retry, circuit breaker, timeout, bulkhead isolation, rate-limiting, fallback, and hedging in a fluent and thread-safe manner.

> **Important:**
> The Microsoft.Extensions.Http.Polly NuGet package is deprecated. Use either of the aforementioned packages instead.

## Get started

To get started with resilience in .NET, install the latest version of the Microsoft.Extensions.Resilience NuGet package.

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Resilience
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.Resilience" />
```

---

For more information, see dotnet package add or Manage package dependencies in .NET applications.

## Build a resilience pipeline

To use resilience, you must first build a pipeline of resilience-based strategies. Each configured strategy executes in order of configuration. In other words, order is important. The entry point is an extension method on the `Microsoft.Extensions.DependencyInjection.IServiceCollection` type, named `AddResiliencePipeline`. This method takes an identifier of the pipeline and a delegate that configures the pipeline. The delegate is passed an instance of `ResiliencePipelineBuilder`, which is used to add resilience strategies to the pipeline.

Consider the following string-based `key` example:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.CircuitBreaker;
using Polly.Registry;
using Polly.Retry;
using Polly.Timeout;

var services = new ServiceCollection();

const string key = "Retry-Timeout";

services.AddResiliencePipeline(key, static builder =>
{
    // See: https://www.pollydocs.org/strategies/retry.html
    builder.AddRetry(new RetryStrategyOptions
    {
        ShouldHandle = new PredicateBuilder().Handle<TimeoutRejectedException>()
    });

    // See: https://www.pollydocs.org/strategies/timeout.html
    builder.AddTimeout(TimeSpan.FromSeconds(1.5));
});
```
The preceding code:

- Creates a new `ServiceCollection` instance.
- Defines a `key` to identify the pipeline.
- Adds a resilience pipeline to the `ServiceCollection` instance.
- Configures the pipeline with a retry and timeout strategies.

Each pipeline is configured for a given `key`, and each `key` is used to identify its corresponding `ResiliencePipeline` when getting the pipeline from the provider. The `key` is a generic type parameter of the `AddResiliencePipeline` method.

### Resilience pipeline builder extensions

To add a strategy to the pipeline, call any of the available `Add*` extension methods on the `ResiliencePipelineBuilder` instance.

- `AddRetry`: Try again if something fails, which is useful when the problem is temporary and might go away.
- `AddCircuitBreaker`: Stop trying if something is broken or busy, which benefits you by avoiding wasted time and making things worse.
- `AddTimeout`: Give up if something takes too long, which can improve performance by freeing up resources.
- `AddRateLimiter`: Limit how many requests you accept, which enables you to control inbound load.
- `AddConcurrencyLimiter`: Limit how many requests you make, which enables you to control outbound load.
- `AddFallback`: Do something else when experiencing failures, which improves user experience.
- `AddHedging`: Issue multiple requests in case of high latency or failure, which can improve responsiveness.

For more information, see Resilience strategies. For examples, see Build resilient HTTP apps: Key <example-value> patterns.

## Metrics enrichment

_Enrichment_ is the automatic augmentation of telemetry with well-known state, in the form of name/value pairs. For example, an app might emit a log that includes the _operation_ and _result code_ as columns to represent the outcome of some operation. In this situation and depending on peripheral context, enrichment adds _Cluster name_, _Process name_, _Region_, _Tenant ID_, and more to the log as it's sent to the telemetry backend. When enrichment is added, the app code doesn't need to do anything extra to benefit from enriched metrics.

### How enrichment works

Imagine 1,000 globally distributed service instances generating logs and metrics. When you encounter an issue on your service dashboard, it's crucial to quickly identify the problematic region or data center. Enrichment ensures that metric records contain the necessary information to pinpoint failures in distributed systems. Without enrichment, the burden falls on the app code to internally manage this state, integrate it into the logging process, and manually transmit it. Enrichment simplifies this process, seamlessly handling it without affecting the app's logic.

In the case of resiliency, when you add enrichment the following dimensions are added to the outgoing telemetry:

- `error.type`: Low-cardinality version of an exception's information.
- `request.name`: The name of the request.
- `request.dependency.name`: The name of the dependency.

Under the covers, resilience enrichment is built on top of Polly's Telemetry `MeteringEnricher`. For more information, see Polly: Metering enrichment.

### Add resilience enrichment

In addition to registering a resilience pipeline, you can also register resilience enrichment. To add enrichment, call the `Microsoft.Extensions.DependencyInjection.ResilienceServiceCollectionExtensions.AddResilienceEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection)` extensions method on the `IServiceCollection` instance.

```csharp
services.AddResilienceEnricher();
```
By calling the `AddResilienceEnricher` extension method, you're adding dimensions on top of the default ones that are built into the underlying Polly library. The following enrichment dimensions are added:

- Exception enrichment based on the `Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizer`, which provides a mechanism to summarize exceptions for use in telemetry. For more information, see Exception summarization.
- Request metadata enrichment based on `Microsoft.Extensions.Http.Diagnostics.RequestMetadata`, which holds the request metadata for telemetry. For more information, see Polly: Telemetry metrics.

## Use resilience pipeline

To use a configured resilience pipeline, you must get the pipeline from a `ResiliencePipelineProvider<TKey>`. When you added the pipeline earlier, the `key` was of type `string`, so you must get the pipeline from the `ResiliencePipelineProvider<string>`.

```csharp
using ServiceProvider provider = services.BuildServiceProvider();

ResiliencePipelineProvider<string> pipelineProvider =
    provider.GetRequiredService<ResiliencePipelineProvider<string>>();

ResiliencePipeline pipeline = pipelineProvider.GetPipeline(key);
```
The preceding code:

- Builds a `ServiceProvider` from the `ServiceCollection` instance.
- Gets the `ResiliencePipelineProvider<string>` from the service provider.
- Retrieves the `ResiliencePipeline` from the `ResiliencePipelineProvider<string>`.

## Execute resilience pipeline

To use the resilience pipeline, call any of the available `Execute*` methods on the `ResiliencePipeline` instance. For example, consider an example call to `ExecuteAsync` method:

```csharp
await pipeline.ExecuteAsync(static cancellationToken =>
{
    // Code that could potentially fail.

    return ValueTask.CompletedTask;
});
```
The preceding code executes the delegate within the `ExecuteAsync` method. When there are failures, the configured strategies are executed. For example, if the `RetryStrategy` is configured to retry three times, the delegate is executed four times (one initial attempt plus three retry attempts) before the failure is propagated.

## See also

- Build resilient HTTP apps: Key <example-value> patterns
- Challenges of idempotent handling of retried calls
