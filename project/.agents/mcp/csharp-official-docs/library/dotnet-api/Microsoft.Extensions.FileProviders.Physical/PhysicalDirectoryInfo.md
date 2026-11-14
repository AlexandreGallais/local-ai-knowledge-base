---
title: "PhysicalDirectoryInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.FileProviders.Physical/PhysicalDirectoryInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PhysicalDirectoryInfo class

Namespace: `Microsoft.Extensions.FileProviders.Physical`

```csharp
public class PhysicalDirectoryInfo : Microsoft.Extensions.FileProviders.IDirectoryContents, Microsoft.Extensions.FileProviders.IFileInfo, System.Collections.Generic.IEnumerable<Microsoft.Extensions.FileProviders.IFileInfo>
```

Represents a directory on a physical file system.

To be added.

## PhysicalDirectoryInfo.PhysicalDirectoryInfo(DirectoryInfo) constructor

```csharp
public PhysicalDirectoryInfo (System.IO.DirectoryInfo info);
```

Initializes a new instance of the `PhysicalDirectoryInfo` class that wraps an instance of `DirectoryInfo`.

Parameters:

- `info`: The directory to represent.

To be added.

## PhysicalDirectoryInfo.Exists property

```csharp
public bool Exists { get; }
```

Gets a value that indicates if the resource exists in the underlying storage system.

Returns: ```csharp
true
```
if the resource exists in the underlying storage system; 
```csharp
false
```
otherwise.

To be added.

## PhysicalDirectoryInfo.IsDirectory property

```csharp
public bool IsDirectory { get; }
```

Gets a value that's always `true`.

Returns: `true`.

To be added.

## PhysicalDirectoryInfo.LastModified property

```csharp
public DateTimeOffset LastModified { get; }
```

Gets the time when the directory was last written to.

Returns: To be added.

To be added.

## PhysicalDirectoryInfo.Length property

```csharp
public long Length { get; }
```

Gets a value that's always -1.

Returns: -1.

To be added.

## PhysicalDirectoryInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the file or directory, excluding the path.

Returns: The name of the file or directory.

To be added.

## PhysicalDirectoryInfo.PhysicalPath property

```csharp
public string PhysicalPath { get; }
```

Gets the full path to the file, including the file name.

Returns: The full path to the file, or
```csharp
null
```
if the file is not directly accessible.

To be added.

## PhysicalDirectoryInfo.CreateReadStream() method

```csharp
public System.IO.Stream CreateReadStream ();
```

Always throws an exception because read streams are not support on directories.

Returns: Never returns.

Exceptions:

- `InvalidOperationException`: In all cases.

To be added.

## PhysicalDirectoryInfo.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<Microsoft.Extensions.FileProviders.IFileInfo> GetEnumerator ();
```

To be added.

Returns: To be added.

To be added.

## PhysicalDirectoryInfo.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

To be added.

Returns: To be added.

To be added.
