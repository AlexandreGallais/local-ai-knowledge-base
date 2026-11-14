---
title: "FileSystemEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileSystemEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEventArgs class

Namespace: `System.IO`

```csharp
public class FileSystemEventArgs : EventArgs
```

Provides data for the directory events: `FileSystemWatcher.Changed`, `FileSystemWatcher.Created`, `FileSystemWatcher.Deleted`.

#### Remarks

The `FileSystemEventArgs` class is passed as a parameter to event handlers for these events:

- The `Changed` event occurs when changes are made to the size, system attributes, last write time, last access time, or security permissions in a file or directory in the specified `FileSystemWatcher.Path` of a `FileSystemWatcher`.

- The `Created` event occurs when a file or directory in the specified `FileSystemWatcher.Path` of a `FileSystemWatcher` is created.

- The `Deleted` event occurs when a file or directory in the specified `FileSystemWatcher.Path` of a `FileSystemWatcher` is deleted. For more information, see `FileSystemWatcher`.

#### Examples
The following example shows how to create a `FileSystemWatcher` to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## FileSystemEventArgs.FileSystemEventArgs(WatcherChangeTypes, String, String) constructor

```csharp
public FileSystemEventArgs (System.IO.WatcherChangeTypes changeType, string directory, string? name);
```

Initializes a new instance of the `FileSystemEventArgs` class.

Parameters:

- `changeType`: One of the `WatcherChangeTypes` values, which represents the kind of change detected in the file system.
- `directory`: The root directory of the affected file or directory.
- `name`: The name of the affected file or directory.

To be added.

## FileSystemEventArgs.ChangeType property

```csharp
public System.IO.WatcherChangeTypes ChangeType { get; }
```

Gets the type of directory event that occurred.

Returns: One of the `WatcherChangeTypes` values that represents the kind of change detected in the file system.

#### Examples
The following example demonstrates the `ChangeType` property. This code example is part of a larger example provided for the `FileSystemEventArgs` class.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## FileSystemEventArgs.FullPath property

```csharp
public string FullPath { get; }
```

Gets the fully qualified path of the affected file or directory.

Returns: The path of the affected file or directory.

#### Remarks

This property returns the same path that `FileSystemWatcher` is initialized with, even if it's a relative path.

#### Examples

The following example demonstrates the `FullPath` property. This code example is part of a larger example provided for the `FileSystemEventArgs` class.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## FileSystemEventArgs.Name property

```csharp
public string? Name { get; }
```

Gets the name of the affected file or directory.

Returns: The name of the affected file or directory.

#### Remarks
The name returned by the `Name` property is the relative path of the affected file or directory, with respect to the directory being watched. For example, if a `FileSystemWatcher` object is watching the directory "C:\temp" and the file at "C:\temp\test\file.txt" changes, the `Name` property will return "test\file.txt".

The `Name` property may be null for renamed events if the `FileSystemWatcher` does not get matching old and new name events from the OS.
