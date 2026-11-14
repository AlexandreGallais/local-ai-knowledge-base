---
title: "IFileInfo interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders/IFileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFileInfo interface

Namespace: `Microsoft.Extensions.FileProviders`

```csharp
public interface IFileInfo
```

Represents a file in the given file provider.

To be added.

## IFileInfo.Exists property

```csharp
public bool Exists { get; }
```

Gets a value that indicates if the resource exists in the underlying storage system.

Returns: To be added.

To be added.

## IFileInfo.IsDirectory property

```csharp
public bool IsDirectory { get; }
```

Gets a value that indicates whether `TryGetDirectoryContents` has enumerated a subdirectory.

Returns: To be added.

To be added.

## IFileInfo.LastModified property

```csharp
public DateTimeOffset LastModified { get; }
```

Gets the time when the file was last modified.

Returns: To be added.

To be added.

## IFileInfo.Length property

```csharp
public long Length { get; }
```

Gets the length of the file in bytes, or -1 for a directory or nonexistent file.

Returns: To be added.

To be added.

## IFileInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the file or directory, not including any path.

Returns: To be added.

To be added.

## IFileInfo.PhysicalPath property

```csharp
public string? PhysicalPath { get; }
```

Gets the path to the file, including the file name. Returns `null` if the file is not directly accessible.

Returns: To be added.

To be added.

## IFileInfo.CreateReadStream() method

```csharp
public System.IO.Stream CreateReadStream ();
```

Returns file contents as a read-only stream.

Returns: The file stream.

The caller should dispose the stream when complete.
