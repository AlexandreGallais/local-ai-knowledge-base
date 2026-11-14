---
title: "CompositeChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/CompositeChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompositeChangeToken class

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public class CompositeChangeToken : Microsoft.Extensions.Primitives.IChangeToken
```

An `IChangeToken` that represents one or more `IChangeToken` instances.

Callbacks are only propagated from inner tokens whose `IChangeToken.ActiveChangeCallbacks`
is `true`. Changes in other inner tokens are detected only when `CompositeChangeToken.HasChanged`
is polled.

## CompositeChangeToken.CompositeChangeToken(IChangeToken>) constructor

```csharp
public CompositeChangeToken (System.Collections.Generic.IReadOnlyList<Microsoft.Extensions.Primitives.IChangeToken> changeTokens);
```

Creates a new instance of `CompositeChangeToken`.

Parameters:

- `changeTokens`: The list of `IChangeToken` to compose.

To be added.

## CompositeChangeToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Gets a value that indicates whether any of the inner `IChangeToken` instances
will proactively raise callbacks.

Returns: `true` if at least one of the `CompositeChangeToken.ChangeTokens` has active change
callbacks; otherwise, `false`.

To be added.

## CompositeChangeToken.ChangeTokens property

```csharp
public System.Collections.Generic.IReadOnlyList<Microsoft.Extensions.Primitives.IChangeToken> ChangeTokens { get; }
```

Returns the list of `IChangeToken` that compose the current `CompositeChangeToken`.

Returns: The list of `IChangeToken` instances which compose the current `CompositeChangeToken`.

To be added.

## CompositeChangeToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that indicates if a change has occurred.

Returns: ```csharp
true
```
if a change has occured; 
```csharp
false
```
otherwise.

To be added.

## CompositeChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Registers for a callback that will be invoked when the entry has changed.  must be set before the callback is invoked.

Parameters:

- `callback`: The <xref data-throw-if-not-resolved="true" uid="System.Action`1"></xref> to invoke.
- `state`: State to be passed into the callback.

Returns: An <xref data-throw-if-not-resolved="true" uid="System.IDisposable"></xref> that is used to unregister the callback.

To be added.
