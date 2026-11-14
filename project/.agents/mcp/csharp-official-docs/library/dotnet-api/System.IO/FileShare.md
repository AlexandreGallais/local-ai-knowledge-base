---
title: "FileShare enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileShare.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileShare enum

Namespace: `System.IO`

```csharp
public enum FileShare
```

Contains constants for controlling the kind of access other operations can have to the same file.

#### Remarks
For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

A typical use of this enumeration is to define whether two processes can simultaneously read from the same file. For example, if a file is opened and `Read` is specified, other users can open the file for reading but not for writing.

A `FileShare` parameter is specified in some of the constructors for `FileStream`, `IsolatedStorageFileStream`, and in some of the `Open` methods of `File` and `FileInfo` to control how a file is opened.

#### Examples
The following `FileStream` constructor opens an existing file and grants read-only access to other users (`Read`).

_Code sample not included: ~/snippets/csharp/System.IO/FileAccess/Overview/source.cs._

## FileShare.Delete field

```csharp
Delete
```

Allows subsequent deleting of a file.

## FileShare.Inheritable field

```csharp
Inheritable
```

Makes the file handle inheritable by child processes. This is not directly supported by Win32.

## FileShare.None field

```csharp
None
```

Declines sharing of the current file. Any request to open the file (by this process or another process) will fail until the file is closed.

## FileShare.Read field

```csharp
Read
```

Allows subsequent opening of the file for reading. If this flag is not specified, any request to open the file for reading (by this process or another process) will fail until the file is closed. However, even if this flag is specified, additional permissions might still be needed to access the file.

## FileShare.ReadWrite field

```csharp
ReadWrite
```

Allows subsequent opening of the file for reading or writing. If this flag is not specified, any request to open the file for reading or writing (by this process or another process) will fail until the file is closed. However, even if this flag is specified, additional permissions might still be needed to access the file.

## FileShare.Write field

```csharp
Write
```

Allows subsequent opening of the file for writing. If this flag is not specified, any request to open the file for writing (by this process or another process) will fail until the file is closed. However, even if this flag is specified, additional permissions might still be needed to access the file.
