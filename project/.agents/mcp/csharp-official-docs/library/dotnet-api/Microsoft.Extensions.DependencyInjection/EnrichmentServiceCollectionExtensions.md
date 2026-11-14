---
title: "EnrichmentServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/EnrichmentServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnrichmentServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class EnrichmentServiceCollectionExtensions
```

Lets you register telemetry enrichers in a dependency injection container.

To be added.

## EnrichmentServiceCollectionExtensions.AddLogEnricher(IServiceCollection, ILogEnricher) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher enricher);
```

Registers a log enricher instance.

Parameters:

- `services`: The dependency injection container to add the enricher instance to.
- `enricher`: The enricher instance to add.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `enricher` is `null`.

To be added.

## EnrichmentServiceCollectionExtensions.AddLogEnricher<T>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddLogEnricher<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where T : class, Microsoft.Extensions.Diagnostics.Enrichment.ILogEnricher;
```

Registers a log enricher type.

Parameters:

- `T`: Enricher type.
- `services`: The dependency injection container to add the enricher type to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## EnrichmentServiceCollectionExtensions.AddStaticLogEnricher(IServiceCollection, IStaticLogEnricher) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddStaticLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Diagnostics.Enrichment.IStaticLogEnricher enricher);
```

Registers a static log enricher instance.

Parameters:

- `services`: The dependency injection container to add the enricher instance to.
- `enricher`: The enricher instance to add.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `enricher` is `null`.

To be added.

## EnrichmentServiceCollectionExtensions.AddStaticLogEnricher<T>(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddStaticLogEnricher<T> (this Microsoft.Extensions.DependencyInjection.IServiceCollection services) where T : class, Microsoft.Extensions.Diagnostics.Enrichment.IStaticLogEnricher;
```

Registers a static log enricher type.

Parameters:

- `T`: Enricher type.
- `services`: The dependency injection container to add the enricher type to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.
