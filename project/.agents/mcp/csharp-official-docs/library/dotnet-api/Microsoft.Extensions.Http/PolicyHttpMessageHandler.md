---
title: "PolicyHttpMessageHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http/PolicyHttpMessageHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PolicyHttpMessageHandler class

Namespace: `Microsoft.Extensions.Http`

```csharp
public class PolicyHttpMessageHandler : System.Net.Http.DelegatingHandler
```

A `DelegatingHandler` implementation that executes request processing surrounded by a `Policy`.

This message handler implementation supports the use of policies provided by the Polly library for
transient-fault handling and resiliency.

The documentation provided here is focused guidance for using Polly together with the `IHttpClientFactory`.
For authoritative information on Polly, see the Polly project and its documentation ().

The extension methods on `PollyHttpClientBuilderExtensions` are designed as a convenient and correct
way to create a `PolicyHttpMessageHandler`.

The `PollyHttpClientBuilderExtensions.AddPolicyHandler`
method supports the creation of a `PolicyHttpMessageHandler` for any kind of policy. This includes
non-reactive policies, such as Timeout or Cache, which don't require the underlying request to fail first.

`PolicyHttpMessageHandler` and the `PollyHttpClientBuilderExtensions` convenience methods
only accept the generic `IAsyncPolicy<T>`. Generic policy instances can be created
by using the generic methods on `Policy` such as `Policy.TimeoutAsync<T>`.

To adapt an existing non-generic `IAsyncPolicy`, use code like the following that converts a
non-generic `IAsyncPolicy policy` to `IAsyncPolicy<T>`:

```csharp

            policy.AsAsyncPolicy<HttpResponseMessage>()
            
```

The `PollyHttpClientBuilderExtensions.AddTransientHttpErrorPolicy`
method is an opinionated convenience method that supports the application of a policy for requests that fail due
to a connection failure or server error (5XX HTTP status code). This kind of method supports only reactive policies
such as Retry, Circuit-Breaker, or Fallback. This method is only provided for convenience; we recommend creating
your own policies as needed if this does not meet your requirements.

Take care when using policies such as Retry or Timeout together as HttpClient provides its own timeout via
`HttpClient.Timeout`.  When combining Retry and Timeout, `HttpClient.Timeout` will act as a
timeout across all tries; a Polly Timeout policy can be configured after a Retry policy in the configuration sequence,
to provide a timeout-per-try.

All policies provided by Polly are designed to be efficient when used in a long-lived way. Certain policies such as the
Bulkhead and Circuit-Breaker maintain state and should be scoped across calls you wish to share the Bulkhead or Circuit-Breaker state.
Take care to ensure the correct lifetimes when using policies and message handlers together in custom scenarios. The extension
methods provided by `PollyHttpClientBuilderExtensions` are designed to assign a long lifetime to policies
and ensure that they can be used when the handler rotation feature is active.

The `PolicyHttpMessageHandler` attaches a context to the `HttpRequestMessage` prior
to executing a `Policy`, if one does not already exist. The `Context` is provided
to the policy for use inside the `Policy` and in other message handlers.

## PolicyHttpMessageHandler.PolicyHttpMessageHandler(HttpResponseMessage>) constructor

```csharp
public PolicyHttpMessageHandler (Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage> policy);
```

Creates a new `PolicyHttpMessageHandler`.

Parameters:

- `policy`: The policy.

To be added.

## PolicyHttpMessageHandler.PolicyHttpMessageHandler(HttpResponseMessage>>) constructor

```csharp
public PolicyHttpMessageHandler (Func<System.Net.Http.HttpRequestMessage,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> policySelector);
```

Creates a new `PolicyHttpMessageHandler`.

Parameters:

- `policySelector`: A function which can select the desired policy for a given `HttpRequestMessage`.

To be added.

## PolicyHttpMessageHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

To be added.

Parameters:

- `request`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

Executes request processing surrounded by a `Policy`.

## PolicyHttpMessageHandler.SendCoreAsync(HttpRequestMessage, Context, CancellationToken) method

```csharp
protected virtual System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendCoreAsync (System.Net.Http.HttpRequestMessage request, Polly.Context context, System.Threading.CancellationToken <example-value>);
```

Called inside the execution of the `Policy` to perform request processing.

Parameters:

- `request`: The `HttpRequestMessage`.
- `context`: The `Context`.
- `cancellationToken`: The `CancellationToken`.

Returns: Returns a `Task<T>` that will yield a response when completed.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
