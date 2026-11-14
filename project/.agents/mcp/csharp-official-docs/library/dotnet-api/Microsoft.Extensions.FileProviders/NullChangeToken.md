---
title: "NullChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/NullChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullChangeToken class

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public sealed class NullChangeToken : Microsoft.Extensions.Primitives.IChangeToken
```

An empty change token that doesn't raise any change callbacks.

To be added.

## NullChangeToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Gets a value that's always `false`.

Returns: `true` if the token will proactively raise callbacks; `false` otherwise.

To be added.

## NullChangeToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that's always `false`.

Returns: `true` if a change has occurred; `false` otherwise.

To be added.

## NullChangeToken.Singleton property

```csharp
public static Microsoft.Extensions.FileProviders.NullChangeToken <example-value> { get; }
```

Gets a singleton instance of `NullChangeToken`.

Returns: To be added.

To be added.

## NullChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Always returns an empty disposable object. Callbacks will never be called.

Parameters:

- `callback`: This parameter is ignored.
- `state`: This parameter is ignored.

Returns: A disposable object that no-ops on dispose.

To be added.
