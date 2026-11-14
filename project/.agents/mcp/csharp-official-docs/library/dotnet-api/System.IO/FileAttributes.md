---
title: "FileAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileAttributes enum

Namespace: `System.IO`

```csharp
public enum FileAttributes
```

Provides attributes for files and directories.

#### Remarks
You can get attributes for files and directories by calling the `File.GetAttributes` method, and you can set them by calling the `File.SetAttributes` method.

It is not possible to change the compression status of a `File` object by using the `File.SetAttributes` method. Instead, you must actually compress the file using either a compression tool or one of the classes in the `Compression` namespace.

The following attributes are not supported on Linux and macOS:

- `Archive`
- `Compressed`
- `Device`
- `Encrypted`
- `IntegrityStream`
- `NoScrubData`
- `NotContentIndexed`
- `Offline`
- `SparseFile`
- `System`
- `Temporary`

On Unix systems, the value returned by `File.GetAttributes` includes `Hidden` for a file whose name begins with a period ("."). On macOS, you can get or set the hidden flag.

#### Examples
The following example shows how to retrieve the attributes for a file and check if the file is read-only.

_Code sample not included: ~/snippets/csharp/System.IO/FileAttributes/Overview/example.cs._

## FileAttributes.Archive field

```csharp
Archive
```

This file is marked to be included in incremental backup operation. Windows sets this attribute whenever the file is modified, and backup software should clear it when processing the file during incremental backup.

## FileAttributes.Compressed field

```csharp
Compressed
```

The file is compressed.

## FileAttributes.Device field

```csharp
Device
```

Reserved for future use.

## FileAttributes.Directory field

```csharp
Directory
```

The file is a directory. `Directory` is supported on Windows, Linux, and macOS.

## FileAttributes.Encrypted field

```csharp
Encrypted
```

The file or directory is encrypted. For a file, this means that all data in the file is encrypted. For a directory, this means that encryption is the default for newly created files and directories.

## FileAttributes.Hidden field

```csharp
Hidden
```

The file is hidden, and thus is not included in an ordinary directory listing. `Hidden` is supported on Windows, Linux, and macOS.

## FileAttributes.IntegrityStream field

```csharp
IntegrityStream
```

The file or directory includes data integrity support. When this value is applied to a file, all data streams in the file have integrity support. When this value is applied to a directory, all new files and subdirectories within that directory, by default, include integrity support.

## FileAttributes.None field

```csharp
None
```

To be added.

## FileAttributes.Normal field

```csharp
Normal
```

The file is a standard file that has no special attributes. This attribute is valid only if it is used alone. `Normal` is supported on Windows, Linux, and macOS.

## FileAttributes.NoScrubData field

```csharp
NoScrubData
```

The file or directory is excluded from the data integrity scan. When this value is applied to a directory, by default, all new files and subdirectories within that directory are excluded from data integrity.

## FileAttributes.NotContentIndexed field

```csharp
NotContentIndexed
```

The file will not be indexed by the operating system's content indexing service.

## FileAttributes.Offline field

```csharp
Offline
```

The file is offline. The data of the file is not immediately available.

## FileAttributes.ReadOnly field

```csharp
ReadOnly
```

The file is read-only. `ReadOnly` is supported on Windows, Linux, and macOS. On Linux and macOS, changing the `ReadOnly` flag is a permissions operation.

## FileAttributes.ReparsePoint field

```csharp
ReparsePoint
```

The file contains a reparse point, which is a block of user-defined data associated with a file or a directory. `ReparsePoint` is supported on Windows, Linux, and macOS.

## FileAttributes.SparseFile field

```csharp
SparseFile
```

The file is a sparse file. Sparse files are typically large files whose data consists of mostly zeros.

## FileAttributes.System field

```csharp
System
```

The file is a system file. That is, the file is part of the operating system or is used exclusively by the operating system.

## FileAttributes.Temporary field

```csharp
Temporary
```

The file is temporary. A temporary file contains data that is needed while an application is executing but is not needed after the application is finished. File systems try to keep all the data in memory for quicker access rather than flushing the data back to mass storage. A temporary file should be deleted by the application as soon as it is no longer needed.
