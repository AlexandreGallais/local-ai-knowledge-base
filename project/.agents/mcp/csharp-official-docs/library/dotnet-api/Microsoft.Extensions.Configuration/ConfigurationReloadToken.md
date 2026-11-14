---
title: "ConfigurationReloadToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Configuration/ConfigurationReloadToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ConfigurationReloadToken class

Namespace: `Microsoft.Extensions.Configuration`

```csharp
public class ConfigurationReloadToken : Microsoft.Extensions.Primitives.IChangeToken
```

Propagates notifications that a configuration change has occurred.

To be added.

## ConfigurationReloadToken.ConfigurationReloadToken() constructor

```csharp
public ConfigurationReloadToken ();
```

Initializes a new instance of `ConfigurationReloadToken`.

To be added.

## ConfigurationReloadToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Gets a value that indicates whether this token <example-value> raises callbacks. Callbacks are still guaranteed to be invoked, eventually.

Returns: `true` if the token <example-value> raises callbacks.

To be added.

## ConfigurationReloadToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that indicates if a change has occurred.

Returns: `true` if a change has occurred.

To be added.

## ConfigurationReloadToken.OnReload() method

```csharp
public void OnReload ();
```

Triggers the change token when a reload occurs.

To be added.

## ConfigurationReloadToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Registers for a callback that will be invoked when the entry has changed. `IChangeToken.HasChanged`
MUST be set before the callback is invoked.

Parameters:

- `callback`: The callback to invoke.
- `state`: State to be passed into the callback.

Returns: The `CancellationToken` registration.

To be added.
