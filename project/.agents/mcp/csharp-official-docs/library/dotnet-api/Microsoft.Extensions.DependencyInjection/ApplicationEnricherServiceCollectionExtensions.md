---
title: "ApplicationEnricherServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ApplicationEnricherServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ApplicationEnricherServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ApplicationEnricherServiceCollectionExtensions
```

Provides extension methods for setting up the service enrichers in an `IServiceCollection`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddApplicationLogEnricher(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddApplicationLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds an instance of the application enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the application enricher to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddApplicationLogEnricher(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddApplicationLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an instance of the application enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the application enricher to.
- `section`: The `IConfigurationSection` to use for configuring `ApplicationLogEnricherOptions` in the application enricher.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddApplicationLogEnricher(IServiceCollection, ApplicationLogEnricherOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddApplicationLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Enrichment.ApplicationLogEnricherOptions> configure);
```

Adds an instance of the application enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the application enricher to.
- `configure`: The `ApplicationLogEnricherOptions` configuration delegate.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddServiceLogEnricher(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds an instance of the service enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service enricher to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddServiceLogEnricher(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an instance of the service enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service enricher to.
- `section`: The `IConfigurationSection` to use for configuring `ApplicationLogEnricherOptions` in the service enricher.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.

## ApplicationEnricherServiceCollectionExtensions.AddServiceLogEnricher(IServiceCollection, ApplicationLogEnricherOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddServiceLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Enrichment.ApplicationLogEnricherOptions> configure);
```

Adds an instance of the service enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the service enricher to.
- `configure`: The `ApplicationLogEnricherOptions` configuration delegate.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.
