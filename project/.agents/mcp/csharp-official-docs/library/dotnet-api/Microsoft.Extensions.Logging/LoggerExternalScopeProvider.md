---
title: "LoggerExternalScopeProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerExternalScopeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerExternalScopeProvider class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public class LoggerExternalScopeProvider : Microsoft.Extensions.Logging.IExternalScopeProvider
```

Default implementation of `IExternalScopeProvider`.

To be added.

## LoggerExternalScopeProvider.LoggerExternalScopeProvider() constructor

```csharp
public LoggerExternalScopeProvider ();
```

Creates a new `LoggerExternalScopeProvider`.

To be added.

## LoggerExternalScopeProvider.ForEachScope<TState>(Object,TState>, TState) method

```csharp
public void ForEachScope<TState> (Action<object?,TState> callback, TState state);
```

Executes callback for each currently active scope objects in order of creation.
All callbacks are guaranteed to be called inline from this method.

Parameters:

- `TState`: The type of state to accept.
- `callback`: The callback to be executed for every scope object.
- `state`: The state object to be passed into the callback.

To be added.

## LoggerExternalScopeProvider.Push(Object) method

```csharp
public IDisposable Push (object? state);
```

Adds scope object to the list.

Parameters:

- `state`: The scope object.

Returns: The <xref data-throw-if-not-resolved="<example-value>" uid="<example-value>"></xref> token that removes scope on dispose.

To be added.
