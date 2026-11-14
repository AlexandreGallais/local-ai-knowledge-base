---
title: "LoggerMessageAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerMessageAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerMessageAttribute class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public sealed class LoggerMessageAttribute : Attribute
```

Provides information to guide the production of a strongly typed logging method.

The method this attribute is applied to:

- Must be a partial method.

- Must return `void`.

- Must have a `LogLevel` as one of its parameters, if the attribute does not specify it.

- Must have access to an `ILogger`: as a parameter (which is required when the method is `static`), or, for an instance method, through an `ILogger` field or primary constructor parameter on the containing type.

- Must not have a name that starts with an underscore, or any parameter whose name starts with an underscore.

- Can be generic, but its type parameters cannot use the `allows ref struct` constraint.

- Must not have parameters that use the `params`, `scoped`, or `out` modifiers, or that are `ref struct` types.

```csharp
            static partial class Log
            {
                [LoggerMessage(EventId = 0, Message = "Could not open socket for {hostName}")]
                static partial void CouldNotOpenSocket(ILogger logger, LogLevel level, string hostName);
            }
```

## LoggerMessageAttribute.LoggerMessageAttribute() constructor

```csharp
public LoggerMessageAttribute ();
```

Initializes a new instance of the `LoggerMessageAttribute` class
that's used to guide the production of a strongly typed logging method.

To be added.

## LoggerMessageAttribute.LoggerMessageAttribute(LogLevel) constructor

```csharp
public LoggerMessageAttribute (Microsoft.Extensions.Logging.LogLevel level);
```

Initializes a new instance of the `LoggerMessageAttribute` class
that's used to guide the production of a strongly typed logging method.

Parameters:

- `level`: The log level.

To be added.

## LoggerMessageAttribute.LoggerMessageAttribute(String) constructor

```csharp
public LoggerMessageAttribute (string message);
```

Initializes a new instance of the `LoggerMessageAttribute` class
that's used to guide the production of a strongly typed logging method.

Parameters:

- `message`: Format string of the log message.

To be added.

## LoggerMessageAttribute.LoggerMessageAttribute(LogLevel, String) constructor

```csharp
public LoggerMessageAttribute (Microsoft.Extensions.Logging.LogLevel level, string message);
```

Initializes a new instance of the `LoggerMessageAttribute` class
that's used to guide the production of a strongly typed logging method.

Parameters:

- `level`: The log level.
- `message`: Format string of the log message.

To be added.

## LoggerMessageAttribute.LoggerMessageAttribute(Int32, LogLevel, String) constructor

```csharp
public LoggerMessageAttribute (int eventId, Microsoft.Extensions.Logging.LogLevel level, string message);
```

Initializes a new instance of the `LoggerMessageAttribute` class
that's used to guide the production of a strongly typed logging method.

Parameters:

- `eventId`: The log event ID.
- `level`: The log level.
- `message`: Format string of the log message.

To be added.

## LoggerMessageAttribute.EventId property

```csharp
public int EventId { get; set; }
```

Gets or sets the logging event ID for the logging method.

Returns: To be added.

To be added.

## LoggerMessageAttribute.EventName property

```csharp
public string? EventName { get; set; }
```

Gets or sets the logging event name for the logging method.

Returns: To be added.

This will equal the method name if not specified.

## LoggerMessageAttribute.Level property

```csharp
public Microsoft.Extensions.Logging.LogLevel Level { get; set; }
```

Gets or sets the logging level for the logging method.

Returns: To be added.

To be added.

## LoggerMessageAttribute.Message property

```csharp
public string Message { get; set; }
```

Gets or sets the message text for the logging method.

Returns: To be added.

To be added.

## LoggerMessageAttribute.SkipEnabledCheck property

```csharp
public bool SkipEnabledCheck { get; set; }
```

Gets or sets the flag to skip IsEnabled check for the logging method.

Returns: To be added.

To be added.
