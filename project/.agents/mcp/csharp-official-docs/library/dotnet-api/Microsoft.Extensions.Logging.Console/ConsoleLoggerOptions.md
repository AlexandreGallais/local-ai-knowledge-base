---
title: "ConsoleLoggerOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Console/ConsoleLoggerOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConsoleLoggerOptions class

Namespace: `Microsoft.Extensions.Logging.Console`

```csharp
public class ConsoleLoggerOptions
```

Options for a `ConsoleLogger`.

To be added.

## ConsoleLoggerOptions.ConsoleLoggerOptions() constructor

```csharp
public ConsoleLoggerOptions ();
```

To be added.

To be added.

## ConsoleLoggerOptions.DisableColors property

```csharp
public bool DisableColors { get; set; }
```

Gets or sets a value that indicates whether colors are disabled.

Returns: `true` if colors are disabled.

To be added.

## ConsoleLoggerOptions.Format property

```csharp
public Microsoft.Extensions.Logging.Console.ConsoleLoggerFormat Format { get; set; }
```

Gets or sets the log message format.

Returns: The default value is `ConsoleLoggerFormat.Default`.

To be added.

## ConsoleLoggerOptions.FormatterName property

```csharp
public string? FormatterName { get; set; }
```

Gets or sets the name of the log message formatter to use.

Returns: The default value is `simple`.

To be added.

## ConsoleLoggerOptions.IncludeScopes property

```csharp
public bool IncludeScopes { get; set; }
```

Gets or sets a value that indicates whether scopes are included.

Returns: `true` if scopes are included.

To be added.

## ConsoleLoggerOptions.LogToStandardErrorThreshold property

```csharp
public Microsoft.Extensions.Logging.LogLevel LogToStandardErrorThreshold { get; set; }
```

Gets or sets value indicating the minimum level of messages that get written to `Console.Error`.

Returns: To be added.

To be added.

## ConsoleLoggerOptions.MaxQueueLength property

```csharp
public int MaxQueueLength { get; set; }
```

Gets or sets the maximum number of enqueued messages.

Returns: The default value is 2500.

To be added.

## ConsoleLoggerOptions.QueueFullMode property

```csharp
public Microsoft.Extensions.Logging.Console.ConsoleLoggerQueueFullMode QueueFullMode { get; set; }
```

Gets or sets the desired console logger behavior when the queue becomes full.

Returns: The default value is `wait`.

To be added.

## ConsoleLoggerOptions.TimestampFormat property

```csharp
public string? TimestampFormat { get; set; }
```

Gets or sets the format string used to format timestamp in logging messages.

Returns: The default value is `null`.

To be added.

## ConsoleLoggerOptions.UseUtcTimestamp property

```csharp
public bool UseUtcTimestamp { get; set; }
```

Gets or sets a value that indicates whether UTC timezone should be used to format timestamps in logging messages.

Returns: `true` if the UTC timezone should be used to format timestamps. The default value is `false`.

To be added.
