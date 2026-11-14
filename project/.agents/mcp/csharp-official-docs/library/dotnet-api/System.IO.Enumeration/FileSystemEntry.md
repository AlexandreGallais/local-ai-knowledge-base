---
title: "FileSystemEntry struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Enumeration/FileSystemEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# FileSystemEntry struct

Namespace: `System.IO.Enumeration`

```csharp
public ref struct FileSystemEntry
```

Provides a lower level view of `FileSystemInfo` to help process and filter find results.

To be added.

## FileSystemEntry.Attributes property

```csharp
public System.IO.FileAttributes Attributes { get; }
```

Gets the attributes for this entry.

Returns: The attributes for this entry.

To be added.

## FileSystemEntry.CreationTimeUtc property

```csharp
public DateTimeOffset CreationTimeUtc { get; }
```

Gets the creation time for the entry or the oldest available time stamp if the operating system does not support creation time stamps.

Returns: The creation time for the entry.

To be added.

## FileSystemEntry.Directory property

```csharp
public ReadOnlySpan<char> Directory { get; }
```

Gets the full path of the directory this entry resides in.

Returns: The full path of this entry's directory.

To be added.

## FileSystemEntry.FileName property

```csharp
public ReadOnlySpan<char> FileName { get; }
```

Gets the file name for this entry.

Returns: This entry's file name.

To be added.

## FileSystemEntry.IsDirectory property

```csharp
public bool IsDirectory { get; }
```

Gets a value that indicates whether this entry is a directory.

Returns: `true` if the entry is a directory; otherwise, `false`.

To be added.

## FileSystemEntry.IsHidden property

```csharp
public bool IsHidden { get; }
```

Gets a value that indicates whether the file has the hidden attribute.

Returns: `true` if the file has the hidden attribute; otherwise, `false`.

To be added.

## FileSystemEntry.LastAccessTimeUtc property

```csharp
public DateTimeOffset LastAccessTimeUtc { get; }
```

Gets a datetime offset that represents the last access time in UTC.

Returns: The last access time in UTC.

To be added.

## FileSystemEntry.LastWriteTimeUtc property

```csharp
public DateTimeOffset LastWriteTimeUtc { get; }
```

Gets a datetime offset that represents the last write time in UTC.

Returns: The last write time in UTC.

To be added.

## FileSystemEntry.Length property

```csharp
public long Length { get; }
```

Gets the length of the file, in bytes.

Returns: The file length in bytes.

To be added.

## FileSystemEntry.OriginalRootDirectory property

```csharp
public ReadOnlySpan<char> OriginalRootDirectory { get; }
```

Gets the root directory for the enumeration as specified in the constructor.

Returns: The original root directory.

To be added.

## FileSystemEntry.RootDirectory property

```csharp
public ReadOnlySpan<char> RootDirectory { get; }
```

Gets the full path of the root directory used for the enumeration.

Returns: The root directory.

To be added.

## FileSystemEntry.ToFileSystemInfo() method

```csharp
public System.IO.FileSystemInfo ToFileSystemInfo ();
```

Converts the value of this instance to a `FileSystemInfo`.

Returns: The value of this instance as a `FileSystemInfo`.

To be added.

## FileSystemEntry.ToFullPath() method

```csharp
public string ToFullPath ();
```

Returns the full path of the find result.

Returns: A string representing the full path.

To be added.

## FileSystemEntry.ToSpecifiedFullPath() method

```csharp
public string ToSpecifiedFullPath ();
```

Returns the full path for the find results, based on the initially provided path.

Returns: A string representing the full path.

To be added.
