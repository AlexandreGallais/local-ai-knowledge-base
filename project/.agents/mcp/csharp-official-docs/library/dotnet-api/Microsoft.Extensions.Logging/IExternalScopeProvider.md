---
title: "IExternalScopeProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/IExternalScopeProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IExternalScopeProvider interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface IExternalScopeProvider
```

Represents a storage of common scope data.

To be added.

## IExternalScopeProvider.ForEachScope<TState>(Object,TState>, TState) method

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

## IExternalScopeProvider.Push(Object) method

```csharp
public IDisposable Push (object? state);
```

Adds scope object to the list.

Parameters:

- `state`: The scope object.

Returns: The `IDisposable` token that removes scope on dispose.

To be added.
