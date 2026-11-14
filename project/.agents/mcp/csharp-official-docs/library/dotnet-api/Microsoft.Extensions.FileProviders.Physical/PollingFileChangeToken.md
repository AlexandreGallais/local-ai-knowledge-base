---
title: "PollingFileChangeToken class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/PollingFileChangeToken.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PollingFileChangeToken class

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public class PollingFileChangeToken : Microsoft.Extensions.Primitives.IChangeToken
```

A change token that polls for file system changes.

Polling occurs every 4 seconds.

By default, this change token does not raise change callbacks. Callers should watch for `PollingFileChangeToken.HasChanged` to turn
from `false` to `true`.
When `PollingFileChangeToken.ActiveChangeCallbacks` is `true`, callbacks registered via
`PollingFileChangeToken.RegisterChangeCallback` will be invoked when the file or directory changes.

## PollingFileChangeToken.PollingFileChangeToken(FileInfo) constructor

```csharp
public PollingFileChangeToken (System.IO.FileInfo fileInfo);
```

Initializes a new instance of the `PollingFileChangeToken` class that polls the specified file or directory
for changes as determined by `FileSystemInfo.LastWriteTimeUtc`.

Parameters:

- `fileInfo`: The `FileInfo` containing the path to poll.

To be added.

## PollingFileChangeToken.ActiveChangeCallbacks property

```csharp
public bool ActiveChangeCallbacks { get; }
```

Gets a value that indicates whether this token will proactively raise callbacks. If `false`, the token
consumer must poll `PollingFileChangeToken.HasChanged` to detect changes.

Returns: `true` if the token will proactively raise callbacks; `false` otherwise.

To be added.

## PollingFileChangeToken.HasChanged property

```csharp
public bool HasChanged { get; }
```

Gets a value that indicates whether the file or directory has changed since the change token was created.

Returns: `true` if a change has occurred; `false` otherwise.

Once the file or directory changes, this value is always `true`. Change tokens should not be reused once expired. The caller should discard this
instance once it sees `PollingFileChangeToken.HasChanged` is true.

## PollingFileChangeToken.RegisterChangeCallback(Object>, Object) method

```csharp
public IDisposable RegisterChangeCallback (Action<object?> callback, object? state);
```

Registers a callback that will be invoked when the token <example-value>, if `PollingFileChangeToken.ActiveChangeCallbacks` is `true`.
If `PollingFileChangeToken.ActiveChangeCallbacks` is `false`, no callback is registered and an empty disposable is returned.

Parameters:

- `callback`: The callback to invoke. This parameter is ignored when `PollingFileChangeToken.ActiveChangeCallbacks` is `false`.
- `state`: The state to pass to `callback`. This parameter is ignored when `PollingFileChangeToken.ActiveChangeCallbacks` is `false`.

Returns: A disposable object that no-ops when disposed.

To be added.
