---
title: "RenamedEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/RenamedEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RenamedEventArgs class

Namespace: `System.IO`

```csharp
public class RenamedEventArgs : System.IO.FileSystemEventArgs
```

Provides data for the `FileSystemWatcher.Renamed` event.

#### Remarks
This class inherits from `FileSystemEventArgs` and extends it by adding an old name field and an old full path field to specify the previous name and full path of the affected file or directory.

#### Examples
The following example shows how to create a `FileSystemWatcher` to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## RenamedEventArgs.RenamedEventArgs(WatcherChangeTypes, String, String, String) constructor

```csharp
public RenamedEventArgs (System.IO.WatcherChangeTypes changeType, string directory, string? name, string? oldName);
```

Initializes a new instance of the `RenamedEventArgs` class.

Parameters:

- `changeType`: One of the `WatcherChangeTypes` values.
- `directory`: The name of the affected file or directory.
- `name`: The name of the affected file or directory.
- `oldName`: The old name of the affected file or directory.

To be added.

## RenamedEventArgs.OldFullPath property

```csharp
public string OldFullPath { get; }
```

Gets the previous fully qualified path of the affected file or directory.

Returns: The previous fully qualified path of the affected file or directory.

#### Remarks

This property returns the same path that `FileSystemWatcher` is initialized with, even if it's a relative path.

#### Examples

The following example demonstrates the `OldFullPath` property. This code example is part of a larger example provided for the `RenamedEventArgs` class.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## RenamedEventArgs.OldName property

```csharp
public string? OldName { get; }
```

Gets the old name of the affected file or directory.

Returns: The previous name of the affected file or directory.

To be added.
