---
title: "FakeLoggerBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/FakeLoggerBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FakeLoggerBuilderExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class FakeLoggerBuilderExtensions
```

Extensions for configuring fake logging, used in unit tests.

To be added.

## FakeLoggerBuilderExtensions.AddFakeLogging(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFakeLogging (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Configures fake logging with default options.

Parameters:

- `builder`: Logging builder.

Returns: Logging `builder`.

To be added.

## FakeLoggerBuilderExtensions.AddFakeLogging(ILoggingBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFakeLogging (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Configures fake logging.

Parameters:

- `builder`: Logging builder.
- `section`: Configuration section that contains `FakeLogCollectorOptions`.

Returns: Logging `builder`.

To be added.

## FakeLoggerBuilderExtensions.AddFakeLogging(ILoggingBuilder, FakeLogCollectorOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddFakeLogging (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.Testing.FakeLogCollectorOptions> configure);
```

Configures fake logging.

Parameters:

- `builder`: Logging builder.
- `configure`: Logging configuration options.

Returns: Logging `builder`.

To be added.
