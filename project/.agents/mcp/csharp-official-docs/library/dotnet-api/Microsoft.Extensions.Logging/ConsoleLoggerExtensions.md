---
title: "ConsoleLoggerExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ConsoleLoggerExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleLoggerExtensions class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class ConsoleLoggerExtensions
```

Provides extension methods for the `ILoggingBuilder` and `ILoggerProviderConfiguration<T>` classes.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Adds a console logger named 'Console' to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to use.

Returns: To be added.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, IConfiguration) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Configuration.IConfiguration configuration);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `configuration`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, IConsoleLoggerSettings) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.Console.IConsoleLoggerSettings settings);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `settings`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, LogLevel) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.LogLevel minLevel);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `minLevel`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, Boolean) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, bool includeScopes);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `includeScopes`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, Boolean>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Func<string,Microsoft.Extensions.Logging.LogLevel,bool> filter);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `filter`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggingBuilder, ConsoleLoggerOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.Console.ConsoleLoggerOptions> configure);
```

Adds a console logger named 'Console' to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to use.
- `configure`: A delegate to configure the `ConsoleLogger`.

Returns: To be added.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, LogLevel, Boolean) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Microsoft.Extensions.Logging.LogLevel minLevel, bool includeScopes);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `minLevel`: This method is retained only for compatibility.
- `includeScopes`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsole(ILoggerFactory, Boolean>, Boolean) method

```csharp
public static Microsoft.Extensions.Logging.ILoggerFactory AddConsole (this Microsoft.Extensions.Logging.ILoggerFactory factory, Func<string,Microsoft.Extensions.Logging.LogLevel,bool> filter, bool includeScopes);
```

This method is retained only for compatibility.

Parameters:

- `factory`: This method is retained only for compatibility.
- `filter`: This method is retained only for compatibility.
- `includeScopes`: This method is retained only for compatibility.

Returns: This method is retained only for compatibility.

To be added.

## ConsoleLoggerExtensions.AddConsoleFormatter<TFormatter,TOptions>(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddConsoleFormatter<TFormatter,TOptions> (this Microsoft.Extensions.Logging.ILoggingBuilder builder) where TFormatter : Microsoft.Extensions.Logging.Console.ConsoleFormatter where TOptions : Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions;
```

Adds a custom console logger formatter 'TFormatter' to be configured with options 'TOptions'.

Parameters:

- `TFormatter`: The custom console logger formatter.
- `TOptions`: The configuration options.
- `builder`: The `ILoggingBuilder` to use.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddConsoleFormatter<TFormatter,TOptions>(ILoggingBuilder, Action<TOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddConsoleFormatter<TFormatter,TOptions> (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<TOptions> configure) where TFormatter : Microsoft.Extensions.Logging.Console.ConsoleFormatter where TOptions : Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions;
```

Adds a custom console logger formatter 'TFormatter' to be configured with options 'TOptions'.

Parameters:

- `TFormatter`: The custom console logger formatter.
- `TOptions`: The configuration options.
- `builder`: The `ILoggingBuilder` to use.
- `configure`: A delegate to configure options 'TOptions' for custom formatter 'TFormatter'.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddJsonConsole(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddJsonConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Add a console log formatter named 'json' to the factory with default properties.

Parameters:

- `builder`: The `ILoggingBuilder` to use.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddJsonConsole(ILoggingBuilder, JsonConsoleFormatterOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddJsonConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.Console.JsonConsoleFormatterOptions> configure);
```

Add and configure a console log formatter named 'json' to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to use.
- `configure`: A delegate to configure the `ConsoleLogger` options for the built-in json log formatter.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddSimpleConsole(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSimpleConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Add the default console log formatter named 'simple' to the factory with default properties.

Parameters:

- `builder`: The `ILoggingBuilder` to use.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddSimpleConsole(ILoggingBuilder, SimpleConsoleFormatterOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSimpleConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.Console.SimpleConsoleFormatterOptions> configure);
```

Add and configure a console log formatter named 'simple' to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to use.
- `configure`: A delegate to configure the `ConsoleLogger` options for the built-in default log formatter.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddSystemdConsole(ILoggingBuilder) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSystemdConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder);
```

Add a console log formatter named 'systemd' to the factory with default properties.

Parameters:

- `builder`: The `ILoggingBuilder` to use.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.

## ConsoleLoggerExtensions.AddSystemdConsole(ILoggingBuilder, ConsoleFormatterOptions>) method

```csharp
public static Microsoft.Extensions.Logging.ILoggingBuilder AddSystemdConsole (this Microsoft.Extensions.Logging.ILoggingBuilder builder, Action<Microsoft.Extensions.Logging.Console.ConsoleFormatterOptions> configure);
```

Add and configure a console log formatter named 'systemd' to the factory.

Parameters:

- `builder`: The `ILoggingBuilder` to use.
- `configure`: A delegate to configure the `ConsoleLogger` options for the built-in systemd log formatter.

Returns: The current logging builder instance so that additional calls can be chained.

To be added.
