---
title: "PollyServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/PollyServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PollyServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class PollyServiceCollectionExtensions
```

Provides convenience extension methods to register `IPolicyRegistry<T>` and
`IReadOnlyPolicyRegistry<T>` in the service collection.

To be added.

## PollyServiceCollectionExtensions.AddPolicyRegistry(IServiceCollection) method

```csharp
public static Polly.Registry.IPolicyRegistry<string> AddPolicyRegistry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers an empty `PolicyRegistry` in the service collection with service types
`IPolicyRegistry<T>`, `IReadOnlyPolicyRegistry<T>`, and
`IConcurrentPolicyRegistry<T>` if the service types haven't already been registered
and returns the existing or newly created registry.

Parameters:

- `services`: The `IServiceCollection`.

Returns: The existing or newly created `IPolicyRegistry<T>`.

To be added.

## PollyServiceCollectionExtensions.AddPolicyRegistry(IServiceCollection, String>) method

```csharp
public static Polly.Registry.IPolicyRegistry<string> AddPolicyRegistry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Polly.Registry.IPolicyRegistry<string> registry);
```

Registers the provided `IPolicyRegistry<T>` in the service collection with service types
`IPolicyRegistry<T>`, `IReadOnlyPolicyRegistry<T>`, and
`IConcurrentPolicyRegistry<T>` and returns the provided registry.

Parameters:

- `services`: The `IServiceCollection`.
- `registry`: The `IPolicyRegistry<T>`.

Returns: The provided `IPolicyRegistry<T>`.

To be added.

## PollyServiceCollectionExtensions.AddPolicyRegistry(IServiceCollection, String>>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddPolicyRegistry (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<IServiceProvider,Polly.Registry.IPolicyRegistry<string>> configureRegistry);
```

Registers an empty `PolicyRegistry` in the service collection with service types
`IPolicyRegistry<T>`, `IReadOnlyPolicyRegistry<T>`, and
`IConcurrentPolicyRegistry<T>` and uses the specified delegate to configure it.

Parameters:

- `services`: The `IServiceCollection`.
- `configureRegistry`: A delegate that is used to configure an `IPolicyRegistry<T>`.

Returns: The provided `IServiceCollection`.

To be added.
