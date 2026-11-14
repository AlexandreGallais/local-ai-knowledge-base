---
title: "LoggingEnrichmentExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggingEnrichmentExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggingEnrichmentExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggingEnrichmentExtensions
```

Extensions for configuring logging enrichment features.

To be added.

## LoggingEnrichmentExtensions.EnableEnrichment(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableEnrichment (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Enables enrichment functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.

Returns: The value of `builder`.

To be added.

## LoggingEnrichmentExtensions.EnableEnrichment(ILoggingBuilder, IConfigurationSection) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableEnrichment (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfigurationSection section);
```

Enables enrichment functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `section`: Configuration section that contains `LoggerEnrichmentOptions`.

Returns: The value of `builder`.

To be added.

## LoggingEnrichmentExtensions.EnableEnrichment(ILoggingBuilder, LoggerEnrichmentOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder EnableEnrichment (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.LoggerEnrichmentOptions> configure);
```

Enables enrichment functionality within the logging infrastructure.

Parameters:

- `builder`: The dependency injection container to add logging to.
- `configure`: Delegate the fine-tune the options.

Returns: The value of `builder`.

To be added.
