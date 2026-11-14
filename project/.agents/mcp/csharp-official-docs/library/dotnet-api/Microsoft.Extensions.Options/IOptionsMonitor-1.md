---
title: "IOptionsMonitor<TOptions> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/IOptionsMonitor`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOptionsMonitor<TOptions> interface

Namespace: `Microsoft.Extensions.Options`

```csharp
public interface IOptionsMonitor<out TOptions>
```

Monitors changes on a `TOptions` instance.

Parameters:

- `TOptions`: The options type.

The default implementation, `OptionsMonitor<T>`, recreates and validates options
synchronously after change notifications. It does not invoke
`IAsyncValidateOptions<T>.ValidateAsync`. The built-in asynchronous validators therefore
cause reload to fail and prevent registered change listeners from being called; no asynchronous last-known-good
guarantee is provided.

## IOptionsMonitor<TOptions>.CurrentValue property

```csharp
public TOptions CurrentValue { get; }
```

Gets the current `TOptions` instance with the `Options.DefaultName`.

Returns: To be added.

To be added.

## IOptionsMonitor<TOptions>.Get(String) method

```csharp
public TOptions Get (string? name);
```

Returns a configured `TOptions` instance with the given `name`.

Parameters:

- `name`: The name of the `TOptions` instance. If `null`, `Options.DefaultName`, which is the empty string, is used.

Returns: The `TOptions` instance that matches the given `name`.

To be added.

## IOptionsMonitor<TOptions>.OnChange(String>) method

```csharp
public IDisposable? OnChange (Action<out TOptions,string?> listener);
```

Registers a listener to be called whenever a named `TOptions` changes.

Parameters:

- `listener`: The action to be invoked when `TOptions` has changed.

Returns: An `IDisposable` that should be disposed to stop listening for changes.

To be added.
