---
title: "CancellationChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Primitives/CancellationChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CancellationChangeToken class

Namespace: `Microsoft.Extensions.Primitives`

```csharp
public class CancellationChangeToken : Microsoft.Extensions.Primitives.IChangeToken
```

A `IChangeToken` implementation using `CancellationToken`.

To be added.

## CancellationChangeToken.CancellationChangeToken(CancellationToken) constructor

```csharp
public CancellationChangeToken (System.Threading.CancellationToken <example-value>);
```

Initializes a new instance of `CancellationChangeToken`.

Parameters:

- `cancellationToken`: The `CancellationToken`.

To be added.

## CancellationChangeToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Indicates if this token will pro-actively raise callbacks. If
```csharp
false
```
, the token <example-value> must poll  to detect changes.

Returns: ```csharp
true
```
if the token will proactively raise callbacks; 
```csharp
false
```
otherwise.

To be added.

## CancellationChangeToken.HasChanged property

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

## CancellationChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Registers for a callback that will be invoked when the entry has changed.  must be set before the callback is invoked.

Parameters:

- `callback`: The <xref data-throw-if-not-resolved="true" uid="System.Action`1"></xref> to invoke.
- `state`: State to be passed into the callback.

Returns: An <xref data-throw-if-not-resolved="true" uid="System.IDisposable"></xref> that is used to unregister the callback.

To be added.
