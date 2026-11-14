---
title: "FileAccess enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileAccess enum

Namespace: `System.IO`

```csharp
public enum FileAccess
```

Defines constants for read, write, or read/write access to a file.

#### Remarks
For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

A `FileAccess` parameter is specified in many of the constructors for `File`, `FileInfo`, `FileStream`, and other constructors where it is important to control the kind of access users have to a file.

#### Examples
The following `FileStream` constructor grants read-only access to an existing file (`FileAccess.Read`).

_Code sample not included: ~/snippets/csharp/System.IO/FileAccess/Overview/source.cs._

## FileAccess.Read field

```csharp
Read
```

Read access to the file. Data can be read from the file. Combine with `Write` for read/write access.

## FileAccess.ReadWrite field

```csharp
ReadWrite
```

Read and write access to the file. Data can be written to and read from the file.

## FileAccess.Write field

```csharp
Write
```

Write access to the file. Data can be written to the file. Combine with `Read` for read/write access.
