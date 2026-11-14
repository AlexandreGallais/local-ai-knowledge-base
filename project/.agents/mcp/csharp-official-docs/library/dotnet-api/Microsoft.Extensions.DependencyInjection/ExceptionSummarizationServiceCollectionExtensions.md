---
title: "ExceptionSummarizationServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ExceptionSummarizationServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ExceptionSummarizationServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class ExceptionSummarizationServiceCollectionExtensions
```

Extensions to register exception summarization.

To be added.

## ExceptionSummarizationServiceCollectionExtensions.AddExceptionSummarizer(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddExceptionSummarizer (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers an exception summarizer into a dependency injection container.

Parameters:

- `services`: The dependency injection container to add the summarizer to.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## ExceptionSummarizationServiceCollectionExtensions.AddExceptionSummarizer(IServiceCollection, IExceptionSummarizationBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddExceptionSummarizer (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Diagnostics.ExceptionSummarization.IExceptionSummarizationBuilder> configure);
```

Registers an exception summarizer into a dependency injection container.

Parameters:

- `services`: The dependency injection container to add the summarizer to.
- `configure`: Delegates that configures the set of registered summary providers.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` or `configure` is `null`.

To be added.
