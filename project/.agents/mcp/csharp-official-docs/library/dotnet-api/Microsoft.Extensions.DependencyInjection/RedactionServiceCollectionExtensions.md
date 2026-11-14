---
title: "RedactionServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/RedactionServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RedactionServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class RedactionServiceCollectionExtensions
```

Extensions to register redaction functionality.

To be added.

## RedactionServiceCollectionExtensions.AddRedaction(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddRedaction (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Registers an implementation of `IRedactorProvider` in the `IServiceCollection`.

Parameters:

- `services`: Instance of `IServiceCollection` used to configure redaction.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `services` is `null`.

To be added.

## RedactionServiceCollectionExtensions.AddRedaction(IServiceCollection, IRedactionBuilder>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddRedaction (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Compliance.Redaction.IRedactionBuilder> configure);
```

Registers an implementation of `IRedactorProvider` in the `IServiceCollection` and configures available redactors.

Parameters:

- `services`: Instance of `IServiceCollection` used to configure redaction.
- `configure`: Configuration function for `IRedactionBuilder`.

Returns: The value of `services`.

Exceptions:

- `ArgumentNullException`: `configure` is `null`.

To be added.
