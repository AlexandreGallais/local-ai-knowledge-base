---
title: "ZipArchiveMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipArchiveMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipArchiveMode enum

Namespace: `System.IO.Compression`

```csharp
public enum ZipArchiveMode
```

Specifies values for interacting with zip archive entries.

When you set the mode to Read, the underlying file or stream must support reading, but does not have to support seeking. If the underlying file or stream supports seeking, the files are read from the archive as they are requested. If the underlying file or stream does not support seeking, the entire archive is held in memory.

When you set the mode to Create, the underlying file or stream must support writing, but does not have to support seeking. Each entry in the archive can be opened only once for writing. If you create a single entry, the data is written to the underlying stream or file as soon as it is available. If you create multiple entries, such as by calling the `ZipFile.CreateFromDirectory` method, the data is written to the underlying stream or file after all the entries are created.

When you set the mode to Update, the underlying file or stream must support reading, writing, and seeking. The content of the entire archive is held in memory, and no data is written to the underlying file or stream until the archive is disposed.

The following methods include a parameter named `mode` that lets you specify the archive mode:

- `%23ctor`

- `%23ctor`

- `Open`

#### Examples

The following example shows how to specify a `ZipArchiveMode` value when creating a `ZipArchive` object.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program1.cs._

## ZipArchiveMode.Create field

```csharp
Create
```

Only creating new archive entries is permitted.

## ZipArchiveMode.Read field

```csharp
Read
```

Only reading archive entries is permitted.

## ZipArchiveMode.Update field

```csharp
Update
```

Both read and write operations are permitted for archive entries.
