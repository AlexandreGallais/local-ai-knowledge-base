---
title: "PollingWildCardChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/PollingWildCardChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PollingWildCardChangeToken class

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public class PollingWildCardChangeToken : Microsoft.Extensions.Primitives.IChangeToken
```

A polling based `IChangeToken` for wildcard patterns.

To be added.

## PollingWildCardChangeToken.PollingWildCardChangeToken(String, String) constructor

```csharp
public PollingWildCardChangeToken (string root, string pattern);
```

Initializes a new instance of the `PollingWildCardChangeToken` class.

Parameters:

- `root`: The root of the file system.
- `pattern`: The pattern to watch.

To be added.

## PollingWildCardChangeToken.ActiveChangeCallbacks property

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

## PollingWildCardChangeToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that indicates if a change has occurred.

Returns: ```csharp
true
```
if a change has occurred; 
```csharp
false
```
otherwise.

To be added.

## PollingWildCardChangeToken.GetLastWriteUtc(String) method

```csharp
protected virtual DateTime GetLastWriteUtc (string path);
```

Gets the last write time of the file at the specified `path`.

Parameters:

- `path`: The root relative path.

Returns: The `DateTime` that the file was last modified.

To be added.

## PollingWildCardChangeToken.Microsoft.Extensions.Primitives.IChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
IDisposable IChangeToken.RegisterChangeCallback (Action<object> callback, object state);
```

Registers for a callback that will be invoked when the entry has changed.
`IChangeToken.HasChanged` MUST be set before the callback is invoked.

Parameters:

- `callback`: The `Action<T>` to invoke.
- `state`: State to be passed into the callback.

Returns: An `IDisposable` that is used to unregister the callback.

To be added.
