---
title: "NullLogger<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging.Abstractions/NullLogger`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullLogger<T> class

Namespace: `Microsoft.Extensions.Logging.Abstractions`

```csharp
public class NullLogger<T> : Microsoft.Extensions.Logging.ILogger<T>
```

Minimalistic logger that does nothing.

To be added.

## NullLogger<T>.NullLogger() constructor

```csharp
public NullLogger ();
```

To be added.

To be added.

## NullLogger<T>.BeginScope<TState>(TState) method

```csharp
public IDisposable BeginScope<TState> (TState state);
```

Begins a logical operation scope.

Parameters:

- `TState`: The type of the state to begin scope for.
- `state`: The identifier for the scope.

Returns: A disposable object that ends the logical operation scope on dispose.

To be added.

## NullLogger<T>.IsEnabled(LogLevel) method

```csharp
public bool IsEnabled (Microsoft.Extensions.Logging.LogLevel logLevel);
```

Checks if the given
```csharp
logLevel
```
is enabled.

Parameters:

- `logLevel`: level to be checked.

Returns: ```csharp
true
```
if enabled; 
```csharp
false
```
otherwise.

To be added.

## NullLogger<T>.Log<TState>(LogLevel, EventId, TState, Exception, String>) method

```csharp
public void Log<TState> (Microsoft.Extensions.Logging.LogLevel logLevel, Microsoft.Extensions.Logging.EventId eventId, TState state, Exception? exception, Func<TState,Exception?,string> formatter);
```

Writes a log entry.

Parameters:

- `TState`: The type of the object to be written.
- `logLevel`: Entry will be written on this level.
- `eventId`: Id of the event.
- `state`: The entry to be written. Can be also an object.
- `exception`: The exception related to this entry.
- `formatter`: Function to create a <xref data-throw-if-not-resolved="true" uid="System.String"></xref> message of the
```csharp
state
```
and
```csharp
exception
```
.

This method ignores the parameters and does nothing.

## NullLogger<T>.Instance field

```csharp
public static readonly Microsoft.Extensions.Logging.Abstractions.NullLogger<T> Instance;
```

Returns an instance of `NullLogger<T>`.

Returns: An instance of `NullLogger<T>`.

To be added.
