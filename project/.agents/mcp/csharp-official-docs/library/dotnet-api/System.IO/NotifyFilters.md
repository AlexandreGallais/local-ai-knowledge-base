---
title: "NotifyFilters enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/NotifyFilters.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotifyFilters enum

Namespace: `System.IO`

```csharp
public enum NotifyFilters
```

Specifies changes to watch for in a file or folder.

#### Remarks
You can combine the members of this enumeration to watch for more than one kind of change. For example, you can watch for changes in the size of a file or folder, and for changes in security settings. This raises an event anytime there is a change in size or security settings of a file or folder.

#### Examples
The following example creates a `FileSystemWatcher` to watch the directory that is specified at runtime. The component is set to watch for any changes in LastWrite and LastAccess time, the creation, deletion, or renaming of text files in the directory. If a file is changed, created, or deleted, the path to the file prints to the console. When a file is renamed, the old and new paths print to the console.

_Code sample not included: ~/snippets/csharp/System.IO/FileSystemWatcher/Overview/source.cs._

## NotifyFilters.Attributes field

```csharp
Attributes
```

The attributes of the file or folder.

## NotifyFilters.CreationTime field

```csharp
CreationTime
```

The time the file or folder was created.

## NotifyFilters.DirectoryName field

```csharp
DirectoryName
```

The name of the directory.

## NotifyFilters.FileName field

```csharp
FileName
```

The name of the file.

## NotifyFilters.LastAccess field

```csharp
LastAccess
```

The date the file or folder was last opened.

## NotifyFilters.LastWrite field

```csharp
LastWrite
```

The date the file or folder last had anything written to it.

## NotifyFilters.Security field

```csharp
Security
```

The security settings of the file or folder.

## NotifyFilters.Size field

```csharp
Size
```

The size of the file or folder.
