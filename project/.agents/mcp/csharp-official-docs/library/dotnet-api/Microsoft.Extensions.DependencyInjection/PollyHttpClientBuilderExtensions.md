---
title: "PollyHttpClientBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/PollyHttpClientBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PollyHttpClientBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class PollyHttpClientBuilderExtensions
```

Provides extensions methods for configuring `PolicyHttpMessageHandler` message handlers as part of
and `HttpClient` message handler pipeline.

To be added.

## PollyHttpClientBuilderExtensions.AddPolicyHandler(IHttpClientBuilder, HttpResponseMessage>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage> policy);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with the provided
`IAsyncPolicy<T>`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policy`: The `IAsyncPolicy<T>`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddPolicyHandler(IHttpClientBuilder, HttpResponseMessage>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<IServiceProvider,System.Net.Http.HttpRequestMessage,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> policySelector);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a policy returned
by the `policySelector`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policySelector`: Selects an `IAsyncPolicy<T>` to apply to the current request.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddPolicyHandler(IHttpClientBuilder, HttpResponseMessage>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<System.Net.Http.HttpRequestMessage,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> policySelector);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a policy returned
by the `policySelector`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policySelector`: Selects an `IAsyncPolicy<T>` to apply to the current request.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddPolicyHandler(IHttpClientBuilder, HttpResponseMessage>>, String>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandler (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<IServiceProvider,System.Net.Http.HttpRequestMessage,string,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> policyFactory, Func<System.Net.Http.HttpRequestMessage,string> keySelector);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a policy returned
by executing provided key <example-value> logic `keySelector` and `policyFactory`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policyFactory`: Selects an `IAsyncPolicy<T>` to apply to the current request based on key selection.
- `keySelector`: A delegate used to generate a policy key based on the `HttpRequestMessage`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

Key <example-value> by `policyFactory` is first used to lookup existing policies from IPolicyRegistry. If policy does not exist in the registry, create a new policy with `policyFactory` and add it in IPolicyRegistry.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddPolicyHandlerFromRegistry(IHttpClientBuilder, HttpResponseMessage>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandlerFromRegistry (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<Polly.Registry.IReadOnlyPolicyRegistry<string>,System.Net.Http.HttpRequestMessage,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> policySelector);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a policy returned
by the `IReadOnlyPolicyRegistry<T>`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policySelector`: Selects an `IAsyncPolicy<T>` to apply to the current request.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddPolicyHandlerFromRegistry(IHttpClientBuilder, String) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddPolicyHandlerFromRegistry (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, string policyKey);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a policy returned
by the `IReadOnlyPolicyRegistry<T>`.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `policyKey`: The key used to resolve a policy from the `IReadOnlyPolicyRegistry<T>`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

## PollyHttpClientBuilderExtensions.AddTransientHttpErrorPolicy(IHttpClientBuilder, HttpResponseMessage>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IHttpClientBuilder AddTransientHttpErrorPolicy (this Microsoft.Extensions.DependencyInjection.IHttpClientBuilder builder, Func<Polly.PolicyBuilder<System.Net.Http.HttpResponseMessage>,Polly.IAsyncPolicy<System.Net.Http.HttpResponseMessage>> configurePolicy);
```

Adds a `PolicyHttpMessageHandler` that will surround request execution with a `Policy`
created by executing the provided configuration delegate. The policy builder will be preconfigured to trigger
application of the policy for requests that fail with conditions that indicate a transient failure.

Parameters:

- `builder`: The `IHttpClientBuilder`.
- `configurePolicy`: A delegate used to create a `IAsyncPolicy<T>`.

Returns: An `IHttpClientBuilder` that can be used to configure the client.

See the remarks on `PolicyHttpMessageHandler` for guidance on configuring policies.

The `PolicyBuilder<T>` provided to `configurePolicy` has been
preconfigured errors to handle errors in the following categories:

- Network failures (as `HttpRequestException`)
- HTTP 5XX status codes (server errors)
- HTTP 408 status code (request timeout)

The policy created by `configurePolicy` will be cached indefinitely per named client. Policies
are generally designed to act as singletons and can be shared when appropriate. To share a policy across multiple
named clients, first create the policy and then pass it to multiple calls to
`PollyHttpClientBuilderExtensions.AddPolicyHandler` as desired.
