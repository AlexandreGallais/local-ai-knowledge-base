---
title: "FakeLoggerServiceCollectionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/FakeLoggerServiceCollectionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeLoggerServiceCollectionExtensions class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public static class FakeLoggerServiceCollectionExtensions
```

Extensions for configuring fake logging, used in unit tests.

To be added.

## FakeLoggerServiceCollectionExtensions.AddFakeLogging(IServiceCollection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddFakeLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services);
```

Configures fake logging with default options.

Parameters:

- `services`: Service collection.

Returns: The value of `services`.

To be added.

## FakeLoggerServiceCollectionExtensions.AddFakeLogging(IServiceCollection, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddFakeLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures fake logging.

Parameters:

- `services`: Service collection.
- `section`: Configuration section that contains `FakeLogCollectorOptions`.

Returns: The value of `services`.

To be added.

## FakeLoggerServiceCollectionExtensions.AddFakeLogging(IServiceCollection, FakeLogCollectorOptions>) method

```csharp
public static Microsoft.Extensions.DependencyInjection.IServiceCollection AddFakeLogging (this Microsoft.Extensions.DependencyInjection.IServiceCollection services, Action<Microsoft.Extensions.Logging.Testing.FakeLogCollectorOptions> configure);
```

Configures fake logging.

Parameters:

- `services`: Service collection.
- `configure`: Logging configuration options.

Returns: The value of `services`.

To be added.
