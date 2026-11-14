---
title: "IChangeToken <example-value>"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/IChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IChangeToken <example-value>

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public interface IChangeToken
```

Propagates notifications that a change has occurred.

To be added.

## IChangeToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Gets a value that indicates whether this token will proactively raise callbacks. If `false`, the token <example-value> must
poll `IChangeToken.HasChanged` to detect changes.

Returns: `true` if the token will proactively raise callbacks; `false` otherwise.

A `true` value does not guarantee that callbacks will be raised for all changes.
Consumers should also check `IChangeToken.HasChanged` when complete accuracy is required.

## IChangeToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that indicates if a change has occurred.

Returns: `true` if a change has occurred; `false` otherwise.

To be added.

## IChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Registers for a callback that will be invoked when the entry has changed.
`IChangeToken.HasChanged` MUST be set before the callback is invoked.

Parameters:

- `callback`: The `Action<T>` to invoke.
- `state`: State to be passed into the callback.

Returns: An `IDisposable` that is used to unregister the callback.

To be added.
