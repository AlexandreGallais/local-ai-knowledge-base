---
title: "FileMode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/FileMode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileMode enum

Namespace: `System.IO`

```csharp
public enum FileMode
```

Specifies how the operating system should open a file.

#### Remarks
For an example of creating a file and writing text to a file, see How to: Write Text to a File. For an example of reading text from a file, see How to: Read Text from a File. For an example of reading from and writing to a binary file, see How to: Read and Write to a Newly Created Data File.

A `FileMode` parameter is specified in many of the constructors for `FileStream`, `IsolatedStorageFileStream`, and in the `Open` methods of `File` and `FileInfo` to control how a file is opened.

`FileMode` parameters control whether a file is overwritten, created, opened, or some combination thereof. Use `Open` to open an existing file. To append to a file, use `Append`. To truncate a file or create a file if it doesn't exist, use `Create`.

#### Examples
The following `FileStream` constructor opens an existing file (`FileMode.Open`).

_Code sample not included: ~/snippets/csharp/System.IO/FileAccess/Overview/source.cs._

## FileMode.Append field

```csharp
Append
```

Opens the file if it exists and seeks to the end of the file, or creates a new file. This requires `FileIOPermissionAccess.Append` permission. `FileMode.Append` can be used only in conjunction with `FileAccess.Write`. Trying to seek to a position before the end of the file throws an `IOException` exception, and any attempt to read fails and throws a `NotSupportedException` exception.

## FileMode.Create field

```csharp
Create
```

Specifies that the operating system should create a new file. If the file already exists, it will be overwritten. This requires `FileIOPermissionAccess.Write` permission. `FileMode.Create` is equivalent to requesting that if the file does not exist, use `FileMode.CreateNew`; otherwise, use `FileMode.Truncate`. If the file already exists but is a hidden file, an `UnauthorizedAccessException` exception is thrown.

## FileMode.CreateNew field

```csharp
CreateNew
```

Specifies that the operating system should create a new file. This requires `FileIOPermissionAccess.Write` permission. If the file already exists, an `IOException` exception is thrown.

## FileMode.Open field

```csharp
Open
```

Specifies that the operating system should open an existing file. The ability to open the file is dependent on the value specified by the `FileAccess` enumeration. A `FileNotFoundException` exception is thrown if the file does not exist.

## FileMode.OpenOrCreate field

```csharp
OpenOrCreate
```

Specifies that the operating system should open a file if it exists; otherwise, a new file should be created. If the file is opened with `FileAccess.Read`, `FileIOPermissionAccess.Read` permission is required. If the file access is `FileAccess.Write`, `FileIOPermissionAccess.Write` permission is required. If the file is opened with `FileAccess.ReadWrite`, both `FileIOPermissionAccess.Read` and `FileIOPermissionAccess.Write` permissions are required.

## FileMode.Truncate field

```csharp
Truncate
```

Specifies that the operating system should open an existing file. When the file is opened, it should be truncated so that its size is zero bytes. This requires `FileIOPermissionAccess.Write` permission. Attempts to read from a file opened with `FileMode.Truncate` cause an `ArgumentException` exception.
