---
title: "ProcessEnricherServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ProcessEnricherServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessEnricherServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ProcessEnricherServiceCollectionExtensions
```

Provides extension methods for setting up Process enrichers in an `IServiceCollection`.

To be added.

## ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddProcessLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds an instance of the process enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the process enricher to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddProcessLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Adds an instance of the host enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the process enricher to.
- `section`: The `IConfigurationSection` to use for configuring `ProcessLogEnricherOptions` in the process enricher.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.

## ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher(IServiceCollection, ProcessLogEnricherOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddProcessLogEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.Enrichment.ProcessLogEnricherOptions> configure);
```

Adds an instance of the process enricher to the `IServiceCollection`.

Parameters:

- `services`: The `IServiceCollection` to add the process enricher to.
- `configure`: The `ProcessLogEnricherOptions` configuration delegate.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: Any of the arguments is `null`.

To be added.
