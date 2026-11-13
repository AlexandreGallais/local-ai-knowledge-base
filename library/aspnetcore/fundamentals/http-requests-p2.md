---
title: "HTTP requests with IHttpClientFactory - ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/http-requests.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# HTTP requests with IHttpClientFactory - ASP.NET Core (part 2 of 3)

## Use outgoing request middleware

`HttpClient` has the concept of delegating handlers that can be linked together for outgoing HTTP requests. The `IHttpClientFactory` interface provides the following benefits:

* Define the handlers to apply for each named client by using a simplified process.
* Register and chain multiple handlers to build an outgoing request middleware pipeline. Each handler can perform work before and after the outgoing request. This pattern is similar to the inbound middleware pipeline in ASP.NET Core.
* Manage cross-cutting concerns around HTTP requests, such as caching, error handling, serialization, and logging.

To create a delegating handler:

* Derive from the `System.Net.Http.DelegatingHandler`.
* Override the `System.Net.Http.DelegatingHandler.SendAsync*`. Execute code before passing the request to the next handler in the pipeline:

```csharp
public class ValidateHeaderHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        if (!request.Headers.Contains("X-API-KEY"))
        {
            return new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(
                    "The API key header X-API-KEY is required.")
            };
        }

        return await base.SendAsync(request, cancellationToken);
    }
}
```
The code snippet checks if the `X-API-KEY` header is in the request. If `X-API-KEY` is missing, the code returns the `System.Net.HttpStatusCode.BadRequest` status code.

More than one handler can be added to the configuration for an `HttpClient` instance by using the `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*`:

```csharp
builder.Services.AddTransient<ValidateHeaderHandler>();

builder.Services.AddHttpClient("HttpMessageHandler")
    .AddHttpMessageHandler<ValidateHeaderHandler>();
```
In the code snippet, `ValidateHeaderHandler` is registered with DI as a transient service. A delegating handler **must** be registered in DI as a transient service, rather than singleton or scoped. Delegating handlers can't be reused across multiple HTTP client pipelines, and registering a handler as a singleton results in an `System.InvalidOperationException` when the handler is reused. After registration, `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*` can be called, passing in the type for the handler.

Multiple handlers can be registered in the order they should execute. Each handler wraps the next handler until the final `HttpClientHandler` executes the request:

```csharp
builder.Services.AddTransient<SampleHandler1>();
builder.Services.AddTransient<SampleHandler2>();

builder.Services.AddHttpClient("MultipleHttpMessageHandlers")
    .AddHttpMessageHandler<SampleHandler1>()
    .AddHttpMessageHandler<SampleHandler2>();
```
In the code snippet, `SampleHandler1` runs first, before `SampleHandler2`.

### Use DI in outgoing request middleware

When `IHttpClientFactory` creates a new delegating handler, it uses DI to fulfill the handler's constructor parameters. `IHttpClientFactory` creates a **separate** DI scope for each handler, which can lead to surprising behavior when a handler consumes a *scoped* service.

Consider the following interface and its implementation, which represents a task as an operation with an identifier, `OperationId`:

```csharp
public interface IOperationScoped
{
    string OperationId { get; }
}

public class OperationScoped : IOperationScoped
{
    public string OperationId { get; } = Guid.NewGuid().ToString()[^4..];
}
```
As the name suggests, `IOperationScoped` is registered with DI by using a *scoped* lifetime:

```csharp
builder.Services.AddScoped<IOperationScoped, OperationScoped>();
```
The following delegating handler consumes and uses `IOperationScoped` to set the `X-OPERATION-ID` header for the outgoing request:

```csharp
public class OperationHandler : DelegatingHandler
{
    private readonly IOperationScoped _operationScoped;

    public OperationHandler(IOperationScoped operationScoped) =>
        _operationScoped = operationScoped;

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        request.Headers.Add("X-OPERATION-ID", _operationScoped.OperationId);

        return await base.SendAsync(request, cancellationToken);
    }
}
```
In the HttpRequestsSample download, run the app and browse to the /Operation page, then refresh. The request scope value changes for each request, but the handler scope value only changes every 5 seconds.

Handlers can depend upon services of any scope. Services that handlers depend upon are disposed when the handler is disposed.

Use one of the following approaches to share per-request state with message handlers:

* Pass data into the handler by using the `System.Net.Http.HttpRequestMessage.Options`.
* Use the `Microsoft.AspNetCore.Http.IHttpContextAccessor` to access the current request.
* Create a custom `System.Threading.AsyncLocal`1` storage object for passing the data.

## Use Polly-based handlers

The `IHttpClientFactory` interface integrates with the third-party library Polly. Polly is a comprehensive resilience and transient fault-handling library for .NET. It allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, and Fallback in a fluent and thread-safe manner.

Extension methods are provided to enable the use of Polly policies with configured `HttpClient` instances. The Polly extensions support adding Polly-based handlers to clients. Polly requires the Microsoft.Extensions.Http.Polly NuGet package.

### Handle transient faults

Faults typically occur when external HTTP calls are transient. `Microsoft.Extensions.DependencyInjection.PollyHttpClientBuilderExtensions.AddTransientHttpErrorPolicy*` allows a policy to be defined to handle transient errors. Policies configured with the `AddTransientHttpErrorPolicy` method handle the following responses:

* `System.Net.Http.HttpRequestException`
* HTTP 5xx
* HTTP 408

`AddTransientHttpErrorPolicy` provides access to a `PolicyBuilder` object configured to handle errors representing a possible transient fault:

```csharp
builder.Services.AddHttpClient("PollyWaitAndRetry")
    .AddTransientHttpErrorPolicy(policyBuilder =>
        policyBuilder.WaitAndRetryAsync(
            3, retryNumber => TimeSpan.FromMilliseconds(600)));
```
In the code snippet, a `WaitAndRetryAsync` policy is defined. Failed requests are retried up to three times with a delay of 600 ms between attempts.

### Dynamically select policies

Extension methods are provided to add Polly-based handlers, for example, the `Microsoft.Extensions.DependencyInjection.PollyHttpClientBuilderExtensions.AddPolicyHandler*`. The following `AddPolicyHandler` overload inspects the request to decide which policy to apply:

```csharp
var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(
    TimeSpan.FromSeconds(10));
var longTimeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(
    TimeSpan.FromSeconds(30));

builder.Services.AddHttpClient("PollyDynamic")
    .AddPolicyHandler(httpRequestMessage =>
        httpRequestMessage.Method == HttpMethod.Get ? timeoutPolicy : longTimeoutPolicy);
```
In the code snippet, if the outgoing request is an HTTP GET, a 10-second timeout is applied. For any other HTTP method, a 30-second timeout is used.

### Add multiple Polly handlers

It's common practice to nest Polly policies:

```csharp
builder.Services.AddHttpClient("PollyMultiple")
    .AddTransientHttpErrorPolicy(policyBuilder =>
        policyBuilder.RetryAsync(3))
    .AddTransientHttpErrorPolicy(policyBuilder =>
        policyBuilder.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));
```
This example adds two handlers:

* The first handler uses the `Microsoft.Extensions.DependencyInjection.PollyHttpClientBuilderExtensions.AddTransientHttpErrorPolicy*` to add a retry policy. Failed requests are retried up to three times.

* The second `AddTransientHttpErrorPolicy` call adds a circuit breaker policy. Further external requests are blocked for 30 seconds if five failed attempts occur sequentially. Circuit breaker policies are stateful. All calls through this client share the same circuit state.

### Add policies from the Polly registry

An approach to managing regularly used policies is to define them once and register them with a `PolicyRegistry`. For example:

```csharp
var timeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(
    TimeSpan.FromSeconds(10));
var longTimeoutPolicy = Policy.TimeoutAsync<HttpResponseMessage>(
    TimeSpan.FromSeconds(30));

var policyRegistry = builder.Services.AddPolicyRegistry();

policyRegistry.Add("Regular", timeoutPolicy);
policyRegistry.Add("Long", longTimeoutPolicy);

builder.Services.AddHttpClient("PollyRegistryRegular")
    .AddPolicyHandlerFromRegistry("Regular");

builder.Services.AddHttpClient("PollyRegistryLong")
    .AddPolicyHandlerFromRegistry("Long");
```
The code snippet adds two policies to the Polly registry, `Regular` and `Long`. The code calls the `Microsoft.Extensions.DependencyInjection.PollyHttpClientBuilderExtensions.AddPolicyHandlerFromRegistry*` to configure individual named clients to use these policies from the Polly registry.

For more information on `IHttpClientFactory` and Polly integrations, see the Polly wiki.

## HttpClient and lifetime management

A new `HttpClient` instance is returned each time `CreateClient` is called on the `IHttpClientFactory`. An `System.Net.Http.HttpMessageHandler` is created for each named client. The factory manages the lifetimes of the `HttpMessageHandler` instances.

`IHttpClientFactory` pools the `HttpMessageHandler` instances created by the factory to reduce resource consumption. An `HttpMessageHandler` instance might be reused from the pool when creating a new `HttpClient` instance, if its lifetime isn't expired.

Pooling of handlers is desirable as each handler typically manages its own underlying HTTP connections. Creating more handlers than necessary can result in connection delays. Some handlers also keep connections open indefinitely, which can prevent the handler from reacting to DNS changes.

The default handler lifetime is 2 minutes. The default value can be overridden on a per-named client basis:

```csharp
builder.Services.AddHttpClient("HandlerLifetime")
    .SetHandlerLifetime(TimeSpan.FromMinutes(5));
```
`HttpClient` instances can generally be treated as .NET objects that **don't** require disposal. Disposal cancels outgoing requests and guarantees the given `HttpClient` instance can't be used after calling `System.IDisposable.Dispose*`. `IHttpClientFactory` tracks and disposes resources used by `HttpClient` instances.

Keeping a single `HttpClient` instance alive for a long duration is a common pattern used before the inception of `IHttpClientFactory`. This pattern becomes unnecessary after migrating to `IHttpClientFactory`.

### Explore alternatives to IHttpClientFactory

Using `IHttpClientFactory` in a DI-enabled app avoids:

* Resource exhaustion problems by pooling `HttpMessageHandler` instances.
* Stale DNS problems by cycling `HttpMessageHandler` instances at regular intervals.

There are alternative ways to solve the preceding problems by using a long-lived `System.Net.Http.SocketsHttpHandler` instance.

* Create an instance of `SocketsHttpHandler` when the app starts and use it for the life of the app.
* Configure `System.Net.Http.SocketsHttpHandler.PooledConnectionLifetime` to an appropriate value based on DNS refresh times.
* Create `HttpClient` instances by using `new HttpClient(handler, disposeHandler: false)` as needed.

The alternate approaches solve the resource management problems that `IHttpClientFactory` solves in a similar way.

* The `SocketsHttpHandler` shares connections across `HttpClient` instances. This sharing prevents socket exhaustion.
* The `SocketsHttpHandler` cycles connections according to `PooledConnectionLifetime` to avoid stale DNS problems.

## Log messages and response status

Clients created via `IHttpClientFactory` record log messages for all requests. Enable the appropriate information level in the logging configuration so you can see the default log messages. Other logging, such as the logging of request headers, is only included at trace level.

The log category used for each client includes the name of the client. A client named *MyNamedClient*, for example, logs messages with a category of "System.Net.Http.HttpClient.**MyNamedClient**.LogicalHandler." Messages that have the *LogicalHandler* suffix occur outside the request handler pipeline. On the request, messages are logged before any other handlers in the pipeline process them. On the response, messages are logged after any other pipeline handlers receive the response.

Logging also occurs inside the request handler pipeline. In the *MyNamedClient* example, those messages are logged with the log category "System.Net.Http.HttpClient.**MyNamedClient**.ClientHandler." For the request, the logging occurs after all other handlers run and immediately before the request is sent. On the response, the logging includes the state of the response before it passes back through the handler pipeline.

Enabling logging outside and inside the pipeline enables inspection of the changes made by the other pipeline handlers. The logging might include changes to request headers or to the response status code.

Including the name of the client in the log category enables log filtering for specific named clients.

## Configure the HttpMessageHandler

It might be necessary to control the configuration of the inner `HttpMessageHandler` used by a client.

An `IHttpClientBuilder` is returned when adding named or typed clients. The `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.ConfigurePrimaryHttpMessageHandler*` extension method can be used to define a delegate. The delegate is used to create and configure the primary `HttpMessageHandler` used by that client:

```csharp
builder.Services.AddHttpClient("ConfiguredHttpMessageHandler")
    .ConfigurePrimaryHttpMessageHandler(() =>
        new HttpClientHandler
        {
            AllowAutoRedirect = true,
            UseDefaultCredentials = true
        });
```
