---
title: "Build resilient HTTP apps: Key development patterns (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/resilience/http-resilience.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build resilient HTTP apps: Key development patterns (part 2 of 2)

## Add standard hedging handler

The standard hedging handler wraps the execution of the request with a standard hedging mechanism. Hedging retries slow requests in parallel.

To use the standard hedging handler, call `AddStandardHedgingHandler` extension method. The following example configures the `ExampleClient` to use the standard hedging handler.

```csharp
httpClientBuilder.AddStandardHedgingHandler();
```
The preceding code adds the standard hedging handler to the `System.Net.Http.HttpClient`.

### Standard hedging handler defaults

The standard hedging uses a pool of circuit breakers to ensure that unhealthy endpoints aren't hedged against. By default, the selection from the pool is based on the URL authority (scheme + host + port).

> **Tip:**
> It's recommended that you configure the way the strategies are selected by calling `StandardHedgingHandlerBuilderExtensions.SelectPipelineByAuthority` or `StandardHedgingHandlerBuilderExtensions.SelectPipelineBy` for more advanced scenarios.

The preceding code adds the standard hedging handler to the `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder`. The default configuration chains five resilience strategies in the following order (from the outermost to the innermost):

| Order | Strategy | Description | Defaults |
|--:|--|--|--|
| **1** | Total request timeout | The total request timeout pipeline applies an overall timeout to the execution, ensuring that the request, including hedging attempts, doesn't exceed the configured limit. | Total timeout: 30s |
| **2** | Hedging | The hedging strategy executes the requests against multiple endpoints in case the dependency is slow or returns a transient error. Routing is options, by default it just hedges the URL provided by the original `System.Net.Http.HttpRequestMessage`. | Min attempts: `1`Max attempts: `10`Delay: 2s |
| **3** | Rate limiter (per endpoint) | The rate limiter pipeline limits the maximum number of concurrent requests being sent to the dependency. | Queue: `0`Permit: `1_000` |
| **4** | Circuit breaker (per endpoint) | The circuit breaker blocks the execution if too many direct failures or timeouts are detected. | Failure ratio: 10%Min throughput: `100`Sampling duration: 30sBreak duration: 5s |
| **5** | Attempt timeout (per endpoint) | The attempt timeout pipeline limits each request attempt duration and throws if it's exceeded. | Timeout: 10s |

### Customize hedging handler route selection

When using the standard hedging handler, you can customize the way the request endpoints are selected by calling various extensions on the `IRoutingStrategyBuilder` type. This can be useful for scenarios such as A/B testing, where you want to route a percentage of the requests to a different endpoint:

```csharp
httpClientBuilder.AddStandardHedgingHandler(static (IRoutingStrategyBuilder builder) =>
{
    // Hedging allows sending multiple concurrent requests
    builder.ConfigureOrderedGroups(static options =>
    {
        options.Groups.Add(new UriEndpointGroup()
        {
            Endpoints =
            {
                // Imagine a scenario where 3% of the requests are 
                // sent to the experimental endpoint.
                new() { Uri = new("https://example.net/api/experimental"), Weight = 3 },
                new() { Uri = new("https://example.net/api/stable"), Weight = 97 }
            }
        });
    });
});
```
The preceding code:

- Adds the hedging handler to the `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder`.
- Configures the `IRoutingStrategyBuilder` to use the `ConfigureOrderedGroups` method to configure the ordered groups.
- Adds an `EndpointGroup` to the `orderedGroup` that routes 3% of the requests to the `https://example.net/api/experimental` endpoint and 97% of the requests to the `https://example.net/api/stable` endpoint.
- Configures the `IRoutingStrategyBuilder` to use the `ConfigureWeightedGroups` method to configure the

To configure a weighted group, call the `ConfigureWeightedGroups` method on the `IRoutingStrategyBuilder` type. The following example configures the `IRoutingStrategyBuilder` to use the `ConfigureWeightedGroups` method to configure the weighted groups.

```csharp
httpClientBuilder.AddStandardHedgingHandler(static (IRoutingStrategyBuilder builder) =>
{
    // Hedging allows sending multiple concurrent requests
    builder.ConfigureWeightedGroups(static options =>
    {
        options.SelectionMode = WeightedGroupSelectionMode.EveryAttempt;

        options.Groups.Add(new WeightedUriEndpointGroup()
        {
            Endpoints =
            {
                // Imagine A/B testing
                new() { Uri = new("https://example.net/api/a"), Weight = 33 },
                new() { Uri = new("https://example.net/api/b"), Weight = 33 },
                new() { Uri = new("https://example.net/api/c"), Weight = 33 }
            }
        });
    });
});
```
The preceding code:

- Adds the hedging handler to the `Microsoft.Extensions.DependencyInjection.IHttpClientBuilder`.
- Configures the `IRoutingStrategyBuilder` to use the `ConfigureWeightedGroups` method to configure the weighted groups.
- Sets the `SelectionMode` to `WeightedGroupSelectionMode.EveryAttempt`.
- Adds a `WeightedEndpointGroup` to the `weightedGroup` that routes 33% of the requests to the `https://example.net/api/a` endpoint, 33% of the requests to the `https://example.net/api/b` endpoint, and 33% of the requests to the `https://example.net/api/c` endpoint.

> **Tip:**
> The maximum number of hedging attempts directly correlates to the number of configured groups. For example, if you have two groups, the maximum number of attempts is two.

For more information, see Polly docs: Hedging resilience strategy.

It's common to configure either an ordered group or weighted group, but it's valid to configure both. Using ordered and weighted groups is helpful in scenarios where you want to send a percentage of the requests to a different endpoint, such is the case with A/B testing.

## Add custom resilience handlers

To have more control, you can customize the resilience handlers by using the `AddResilienceHandler` API. This method accepts a delegate that configures the `ResiliencePipelineBuilder<HttpResponseMessage>` instance that is used to create the resilience strategies.

To configure a named resilience handler, call the `AddResilienceHandler` extension method with the name of the handler. The following example configures a named resilience handler called `"CustomPipeline"`.

```csharp
httpClientBuilder.AddResilienceHandler(
    "CustomPipeline",
    static builder =>
{
    // See: https://www.pollydocs.org/strategies/retry.html
    builder.AddRetry(new HttpRetryStrategyOptions
    {
        // Customize and configure the retry logic.
        BackoffType = DelayBackoffType.Exponential,
        MaxRetryAttempts = 5,
        UseJitter = true
    });

    // See: https://www.pollydocs.org/strategies/circuit-breaker.html
    builder.AddCircuitBreaker(new HttpCircuitBreakerStrategyOptions
    {
        // Customize and configure the circuit breaker logic.
        SamplingDuration = TimeSpan.FromSeconds(10),
        FailureRatio = 0.2,
        MinimumThroughput = 3,
        ShouldHandle = static args =>
        {
            return ValueTask.FromResult(args is
            {
                Outcome.Result.StatusCode:
                    HttpStatusCode.RequestTimeout or
                        HttpStatusCode.TooManyRequests
            });
        }
    });

    // See: https://www.pollydocs.org/strategies/timeout.html
    builder.AddTimeout(TimeSpan.FromSeconds(5));
});
```
The preceding code:

- Adds a resilience handler with the name `"CustomPipeline"` as the `pipelineName` to the service container.
- Adds a retry strategy with exponential backoff, five retries, and jitter preference to the resilience builder.
- Adds a circuit breaker strategy with a sampling duration of 10 seconds, a failure ratio of 0.2 (20%), a minimum throughput of three, and a predicate that handles `RequestTimeout` and `TooManyRequests` HTTP status codes to the resilience builder.
- Adds a timeout strategy with a timeout of five seconds to the resilience builder.

There are many options available for each of the resilience strategies. For more information, see the Polly docs: Strategies. For more information about configuring `ShouldHandle` delegates, see Polly docs: Fault handling in reactive strategies.

> **Warning:**
> If you're using both retry and timeout strategies, and you want to configure the `ShouldHandle` delegate in your retry strategy, make sure to consider whether it should handle Polly's timeout exception. Polly throws a `TimeoutRejectedException` (which inherits from `System.Exception`), not the standard `System.TimeoutException`.

### Dynamic reload

Polly supports dynamic reloading of the configured resilience strategies. This means that you can change the configuration of the resilience strategies at runtime. To enable dynamic reload, use the appropriate `AddResilienceHandler` overload that exposes the `ResilienceHandlerContext`. Given the context, call `EnableReloads` of the corresponding resilience strategy options:

```csharp
httpClientBuilder.AddResilienceHandler(
    "AdvancedPipeline",
    static (ResiliencePipelineBuilder<HttpResponseMessage> builder,
        ResilienceHandlerContext context) =>
    {
        // Enable reloads whenever the named options change
        context.EnableReloads<HttpRetryStrategyOptions>("RetryOptions");

        // Retrieve the named options
        var retryOptions =
            context.GetOptions<HttpRetryStrategyOptions>("RetryOptions");

        // Add retries using the resolved options
        builder.AddRetry(retryOptions);
    });
```
The preceding code:

- Adds a resilience handler with the name `"AdvancedPipeline"` as the `pipelineName` to the service container.
- Enables the reloads of the `"AdvancedPipeline"` pipeline whenever the named `RetryStrategyOptions` options change.
- Retrieves the named options from the `Microsoft.Extensions.Options.IOptionsMonitor`1` service.
- Adds a retry strategy with the retrieved options to the resilience builder.

For more information, see Polly docs: Advanced dependency injection.

This example relies on an options section that is capable of change, such as an _appsettings.json_ file. Consider the following _appsettings.json_ file:

```json
{
    "RetryOptions": {
        "Retry": {
            "BackoffType": "Linear",
            "UseJitter": false,
            "MaxRetryAttempts": 7
        }
    }
}
```
Now imagine that these options were bound to the app's configuration, binding the `HttpRetryStrategyOptions` to the `"RetryOptions"` section:

```csharp
var section = builder.Configuration.GetSection("RetryOptions");

builder.Services.Configure<HttpStandardResilienceOptions>(section);
```
For more information, see Options pattern in .NET.

## Example usage

Your app relies on dependency injection to resolve the `ExampleClient` and its corresponding `System.Net.Http.HttpClient`. The code builds the `System.IServiceProvider` and resolves the `ExampleClient` from it.

```csharp
IHost host = builder.Build();

ExampleClient client = host.Services.GetRequiredService<ExampleClient>();

await foreach (Comment? comment in client.GetCommentsAsync())
{
    Console.WriteLine(comment);
}
```
The preceding code:

- Builds the `System.IServiceProvider` from the `Microsoft.Extensions.DependencyInjection.ServiceCollection`.
- Resolves the `ExampleClient` from the `System.IServiceProvider`.
- Calls the `GetCommentsAsync` method on the `ExampleClient` to get the comments.
- Writes each comment to the console.

Imagine a situation where the network goes down or the server becomes unresponsive. The following diagram shows how the resilience strategies would handle the situation, given the `ExampleClient` and the `GetCommentsAsync` method:

The preceding diagram depicts:

- The `ExampleClient` sends an HTTP GET request to the `/comments` endpoint.
- The `System.Net.Http.HttpResponseMessage` is evaluated:
  - If the response is successful (HTTP 200), the response is returned.
  - If the response is unsuccessful (HTTP non-200), the resilience pipeline employs the configured resilience strategies.

While this is a simple example, it demonstrates how the resilience strategies can be used to handle transient errors. For more information, see Polly docs: Strategies.

## Known issues

The following sections detail various known issues.

### Compatibility with the `Grpc.Net.ClientFactory` package

If you're using `Grpc.Net.ClientFactory` version `2.63.0` or earlier, then enabling the standard resilience or hedging handlers for a gRPC client could cause a runtime exception. Specifically, consider the following code sample:

```csharp
services
    .AddGrpcClient<Greeter.GreeterClient>()
    .AddStandardResilienceHandler();
```

The preceding code results in the following exception:

```output
System.InvalidOperationException: The ConfigureHttpClient method isn't supported when creating gRPC clients. Unable to create client with name 'GreeterClient'.
```

To resolve this issue, we recommend upgrading to `Grpc.Net.ClientFactory` version `2.64.0` or later.

There's a build time check that verifies if you're using `Grpc.Net.ClientFactory` version `2.63.0` or earlier, and if you are the check produces a compilation warning. You can suppress the warning by setting the following property in your project file:

```xml
<PropertyGroup>
  <SuppressCheckGrpcNetClientFactoryVersion>true</SuppressCheckGrpcNetClientFactoryVersion>
</PropertyGroup>
```

### Compatibility with .NET Application Insights

If you're using .NET Application Insights version **2.22.0** or lower, then enabling resilience functionality in your application could cause all Application Insights telemetry to be missing. The issue occurs when resilience functionality is registered before Application Insights services. Consider the following sample causing the issue:

```csharp
// At first, we register resilience functionality.
services.AddHttpClient().AddStandardResilienceHandler();

// And then we register Application Insights. As a result, Application Insights doesn't work.
services.AddApplicationInsightsTelemetry();
```

The issue can be fixed by updating .NET Application Insights to version **2.23.0** or higher. If you can't update it, then registering Application Insights services before resilience functionality, as shown below, will fix the issue:

```csharp
// We register Application Insights first, and now it is working correctly.
services.AddApplicationInsightsTelemetry();
services.AddHttpClient().AddStandardResilienceHandler();
```
