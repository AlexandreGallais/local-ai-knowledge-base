---
title: "LoggingRedactionExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggingRedactionExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggingRedactionExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggingRedactionExtensions
```

Extensions for configuring logging redaction features.

To be added.

## LoggingRedactionExtensions.EnableRedaction(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableRedaction (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Enables redaction functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.

Returns: The value of `builder`.

To be added.

## LoggingRedactionExtensions.EnableRedaction(ILoggingBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableRedaction (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Enables redaction functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `section`: Configuration section that contains `LoggerRedactionOptions`.

Returns: The value of `builder`.

To be added.

## LoggingRedactionExtensions.EnableRedaction(ILoggingBuilder, LoggerRedactionOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableRedaction (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.LoggerRedactionOptions> configure);
```

Enables redaction functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `configure`: Delegate the fine-tune the options.

Returns: The value of `builder`.

To be added.
