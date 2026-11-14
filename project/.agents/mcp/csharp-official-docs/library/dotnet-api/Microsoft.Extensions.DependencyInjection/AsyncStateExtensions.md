---
title: "AsyncStateExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/AsyncStateExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncStateExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class AsyncStateExtensions
```

Extensions to manipulate async state.

To be added.

## AsyncStateExtensions.AddAsyncState(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddAsyncState (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds default implementations for `IAsyncState`, `IAsyncContext<T>`, and `IAsyncLocalContext<T>` services.
Please note that implementations of these interfaces are not thread safe.

Parameters:

- `services`: The dependency injection container to add the implementations to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.
