---
title: "LocalizationServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/LocalizationServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalizationServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class LocalizationServiceCollectionExtensions
```

Extension methods for setting up localization services in an `IServiceCollection`.

To be added.

## LocalizationServiceCollectionExtensions.AddLocalization(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLocalization (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds services required for application localization.

Parameters:

- `services`: The `IServiceCollection` to add the services to.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.

## LocalizationServiceCollectionExtensions.AddLocalization(IServiceCollection, LocalizationOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLocalization (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Localization.LocalizationOptions> setupAction);
```

Adds services required for application localization.

Parameters:

- `services`: The `IServiceCollection` to add the services to.
- `setupAction`: An `Action<T>` to configure the `LocalizationOptions`.

Returns: The `IServiceCollection` so that additional calls can be chained.

To be added.
