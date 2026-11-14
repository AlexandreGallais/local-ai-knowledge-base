---
title: "FileHandleType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileHandleType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileHandleType enum

Namespace: `System.IO`

```csharp
public enum FileHandleType
```

Specifies the type of a file.

Use the `Type` property to determine the type of a file represented by a handle.

## FileHandleType.BlockDevice field

```csharp
BlockDevice
```

The file is a block device.

## FileHandleType.CharacterDevice field

```csharp
CharacterDevice
```

The file is a character device.

## FileHandleType.Directory field

```csharp
Directory
```

The file is a directory.

## FileHandleType.Pipe field

```csharp
Pipe
```

The file is a pipe (FIFO).

## FileHandleType.RegularFile field

```csharp
RegularFile
```

The file is a regular file.

## FileHandleType.Socket field

```csharp
Socket
```

The file is a socket.

## FileHandleType.SymbolicLink field

```csharp
SymbolicLink
```

The file is a symbolic link.

## FileHandleType.Unknown field

```csharp
Unknown
```

The file type is unknown.
