---
title: "LatencyRegistryServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/LatencyRegistryServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LatencyRegistryServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class LatencyRegistryServiceCollectionExtensions
```

Extensions to configure a latency context.

To be added.

## LatencyRegistryServiceCollectionExtensions.RegisterCheckpointNames(IServiceCollection, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RegisterCheckpointNames (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, params string[] names);
```

Registers a set of checkpoint names for a latency context.

Parameters:

- `services`: The dependency injection container to add the names to.
- `names`: Set of checkpoint names.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `names` is `null`.

To be added.

## LatencyRegistryServiceCollectionExtensions.RegisterMeasureNames(IServiceCollection, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RegisterMeasureNames (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, params string[] names);
```

Registers a set of measure names for a latency context.

Parameters:

- `services`: The dependency injection container to add the names to.
- `names`: Set of measure names.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `names` is `null`.

To be added.

## LatencyRegistryServiceCollectionExtensions.RegisterTagNames(IServiceCollection, String[]) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection RegisterTagNames (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, params string[] names);
```

Registers a set of tag names for a latency context.

Parameters:

- `services`: The dependency injection container to add the names to.
- `names`: Set of tag names.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `names` is `null`.

To be added.
