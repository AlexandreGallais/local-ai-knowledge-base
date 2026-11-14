---
title: "ServiceCollectionContainerBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollectionContainerBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollectionContainerBuilderExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ServiceCollectionContainerBuilderExtensions
```

Extension methods for building a `ServiceProvider` from an `IServiceCollection`.

To be added.

## ServiceCollectionContainerBuilderExtensions.BuildServiceProvider(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceProvider BuildServiceProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Creates a `ServiceProvider` containing services from the provided `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` containing service descriptors.

Returns: The `ServiceProvider`.

To be added.

## ServiceCollectionContainerBuilderExtensions.BuildServiceProvider(IServiceCollection, ServiceProviderOptions) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceProvider BuildServiceProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.DependencyInjection.ServiceProviderOptions options);
```

Creates a `ServiceProvider` containing services from the provided `IServiceCollection`
optionally enabling scope validation.

Parameters:

- `services`: The `IServiceCollection` containing service descriptors.
- `options`: Configures various service provider behaviors.

Returns: The `ServiceProvider`.

To be added.

## ServiceCollectionContainerBuilderExtensions.BuildServiceProvider(IServiceCollection, Boolean) method

```csharp
public static Microsoft.Extensions.DependencyInjection.ServiceProvider BuildServiceProvider (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, bool validateScopes);
```

Creates a `ServiceProvider` containing services from the provided `IServiceCollection`
optionally enabling scope validation.

Parameters:

- `services`: The `IServiceCollection` containing service descriptors.
- `validateScopes`: `true` to perform check verifying that scoped services never gets resolved from root provider; otherwise `false`.

Returns: The `ServiceProvider`.

To be added.
