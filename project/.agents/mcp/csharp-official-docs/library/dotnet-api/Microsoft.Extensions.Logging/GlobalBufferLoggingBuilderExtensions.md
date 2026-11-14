---
title: "GlobalBufferLoggingBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/GlobalBufferLoggingBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GlobalBufferLoggingBuilderExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class GlobalBufferLoggingBuilderExtensions
```

Lets you register log buffering in a dependency injection container.

To be added.

## GlobalBufferLoggingBuilderExtensions.AddGlobalBuffer(ILoggingBuilder, IConfiguration) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddGlobalBuffer (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

Adds global log buffering to the logging infrastructure.

Parameters:

- `builder`: The `ILoggingBuilder`.
- `configuration`: The `IConfiguration` to add.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

Matched logs will be buffered and can optionally be flushed and emitted.

## GlobalBufferLoggingBuilderExtensions.AddGlobalBuffer(ILoggingBuilder, GlobalLogBufferingOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddGlobalBuffer (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Diagnostics.Buffering.GlobalLogBufferingOptions> configure);
```

Adds global log buffering to the logging infrastructure.

Parameters:

- `builder`: The `ILoggingBuilder`.
- `configure`: Configure buffer options.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

Matched logs will be buffered and can optionally be flushed and emitted.

## GlobalBufferLoggingBuilderExtensions.AddGlobalBuffer(ILoggingBuilder, LogLevel>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddGlobalBuffer (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Microsoft.Extensions.Logging.LogLevel? logLevel = default);
```

Adds global log buffering to the logging infrastructure.

Parameters:

- `builder`: The `ILoggingBuilder`.
- `logLevel`: The log level (and below) to apply the buffer to.

Returns: The value of `builder`.

Exceptions:

- `ArgumentNullException`: `builder` is `null`.

Matched logs will be buffered and can optionally be flushed and emitted.
