---
title: "ResilienceServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ResilienceServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResilienceServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ResilienceServiceCollectionExtensions
```

Extension class for the Service Collection DI container.

To be added.

## ResilienceServiceCollectionExtensions.AddResilienceEnricher(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddResilienceEnricher (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Adds resilience enrichers.

Parameters:

- `services`: The services.

Returns: The input `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

This method adds additional dimensions on top of the default ones that are built-in to the Polly library. These include:

Exception enrichment based on `IExceptionSummarizer`.

Request metadata enrichment based on `RequestMetadata`.
