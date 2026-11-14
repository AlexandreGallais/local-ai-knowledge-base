---
title: "PhysicalFileInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/PhysicalFileInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PhysicalFileInfo class

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public class PhysicalFileInfo : Microsoft.Extensions.FileProviders.IFileInfo
```

Represents a file on a physical file system.

To be added.

## PhysicalFileInfo.PhysicalFileInfo(FileInfo) constructor

```csharp
public PhysicalFileInfo (System.IO.FileInfo info);
```

Initializes a new instance of the `PhysicalFileInfo` class that wraps an instance of `FileInfo`.

Parameters:

- `info`: The `FileInfo`.

To be added.

## PhysicalFileInfo.Exists property

```csharp
public bool Exists { get; }
```

Determines if the resource exists in the underlying system.

Returns: ```csharp
true
```
if the resource exists in the underlying storage system; 
```csharp
false
```
otherwise.

To be added.

## PhysicalFileInfo.IsDirectory property

```csharp
public bool IsDirectory { get; }
```

Gets a value that's always `false`.

Returns: To be added.

To be added.

## PhysicalFileInfo.LastModified property

```csharp
public DateTimeOffset LastModified { get; }
```

Gets the last time the file was modified.

Returns: A datetime offset representing the last time the file was modified.

To be added.

## PhysicalFileInfo.Length property

```csharp
public long Length { get; }
```

The length of the file in bytes, or -1 for a directory or non-existing files.

Returns: To be added.

To be added.

## PhysicalFileInfo.Name property

```csharp
public string Name { get; }
```

The name of the file or directory, not including any path.

Returns: To be added.

To be added.

## PhysicalFileInfo.PhysicalPath property

```csharp
public string PhysicalPath { get; }
```

The path to the file, including the file name. Return
```csharp
null
```
if the file is not directly accessible.

Returns: To be added.

To be added.

## PhysicalFileInfo.CreateReadStream() method

```csharp
public System.IO.Stream CreateReadStream ();
```

Returns the file contents as a read-only stream.

Returns: A read-only stream.

#### Remarks

The caller should dispose the stream when done with it.
