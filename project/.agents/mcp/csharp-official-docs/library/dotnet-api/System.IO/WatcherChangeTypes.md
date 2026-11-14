---
title: "WatcherChangeTypes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/WatcherChangeTypes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WatcherChangeTypes enum

Namespace: `System.IO`

```csharp
public enum WatcherChangeTypes
```

Changes that might occur to a file or directory.

#### Remarks
Each `WatcherChangeTypes` member is associated with an event in `FileSystemWatcher`. For more information on the events, see `Created`, `Deleted`, `Changed`, and `Renamed`.

#### Examples
The following example shows how to create a FileSystemWatcher to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## WatcherChangeTypes.All field

```csharp
All
```

The creation, deletion, change, or renaming of a file or folder.

## WatcherChangeTypes.Changed field

```csharp
Changed
```

The change of a file or folder. The types of changes include: changes to size, attributes, security settings, last write, and last access time.

## WatcherChangeTypes.Created field

```csharp
Created
```

The creation of a file or folder.

## WatcherChangeTypes.Deleted field

```csharp
Deleted
```

The deletion of a file or folder.

## WatcherChangeTypes.Renamed field

```csharp
Renamed
```

The renaming of a file or folder.
