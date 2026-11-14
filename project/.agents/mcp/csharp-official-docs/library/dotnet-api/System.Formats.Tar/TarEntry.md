---
title: "TarEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarEntry class

Namespace: `System.Formats.Tar`

```csharp
public abstract class TarEntry
```

Defines the core behavior of a tar entry from an archive.

All the properties exposed by this class are supported by the `TarEntryFormat.V7`, `TarEntryFormat.Ustar`, `TarEntryFormat.Pax`, and `TarEntryFormat.Gnu` formats.

## TarEntry.Checksum property

```csharp
public int Checksum { get; }
```

The checksum of all the fields in this entry. The value is non-zero either when the entry is read from an existing archive, or after the entry is written to a new archive.

Returns: To be added.

To be added.

## TarEntry.DataOffset property

```csharp
public long DataOffset { get; }
```

Gets the starting position of the data stream respective to the archive stream.

Returns: A number that represents a position in a stream.

If the entry does not come from an archive stream or if the archive stream is not seekable, returns -1.

The position value returned by this property is relative to the absolute start of the archive stream, independent of where the tar archive begins.

## TarEntry.DataStream property

```csharp
public System.IO.Stream? DataStream { get; set; }
```

Gets or sets the data section of this entry. If the `TarEntry.EntryType` does not support containing data, then returns `null`.

Returns: Gets a stream that represents the data section of this entry.

Sets a new stream that represents the data section, if it makes sense for the `TarEntry.EntryType` to contain data. If a stream already exists, the old stream is disposed before substituting it with the new stream. Setting a `null` stream is allowed.

Exceptions:

- `InvalidOperationException`: Setting a data section is not supported because the `TarEntry.EntryType` is not `TarEntryType.RegularFile` (or `TarEntryType.V7RegularFile` for an archive of `TarEntryFormat.V7` format).
- `ArgumentException`: The stream does not support reading.
- `IOException`: An I/O problem occurred.

If you write data to this data stream, make sure to rewind it to the desired start position before writing this entry into an archive using `TarWriter.WriteEntry`.

## TarEntry.EntryType property

```csharp
public System.Formats.Tar.TarEntryType EntryType { get; }
```

Gets the type of filesystem object represented by this entry.

Returns: To be added.

To be added.

## TarEntry.Format property

```csharp
public System.Formats.Tar.TarEntryFormat Format { get; }
```

The format of the entry.

Returns: To be added.

To be added.

## TarEntry.Gid property

```csharp
public int Gid { get; set; }
```

Gets or sets the ID of the group that owns the file represented by this entry.

Returns: To be added.

The value in this field has no effect on Windows platforms.

## TarEntry.Length property

```csharp
public long Length { get; }
```

When the `TarEntry.EntryType` indicates an entry that can contain data, gets the length in bytes of such data.

Returns: To be added.

The entry type that commonly contains data is `TarEntryType.RegularFile` (or `TarEntryType.V7RegularFile` in the `TarEntryFormat.V7` format). Other uncommon entry types that can also contain data are: `TarEntryType.ContiguousFile`, `TarEntryType.DirectoryList`, `TarEntryType.MultiVolume`, and `TarEntryType.SparseFile`.

## TarEntry.LinkName property

```csharp
public string LinkName { get; set; }
```

When the `TarEntry.EntryType` indicates a `TarEntryType.SymbolicLink` or a `TarEntryType.HardLink`, gets or sets the link target path of the link.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The entry type is not `TarEntryType.HardLink` or `TarEntryType.SymbolicLink`.
- `ArgumentNullException`: The specified value is `null`.
- `ArgumentException`: The specified value is empty.

To be added.

## TarEntry.Mode property

```csharp
public System.IO.UnixFileMode Mode { get; set; }
```

Gets or sets the Unix file permissions of the file represented by this entry.

Returns: To be added.

The value in this field has no effect on Windows platforms.

## TarEntry.ModificationTime property

```csharp
public DateTimeOffset ModificationTime { get; set; }
```

Gets or sets the last time the contents of the file represented by this entry were modified.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: The specified value is larger than `DateTimeOffset.UnixEpoch`.

In Unix platforms, this timestamp is commonly known as `mtime`.

## TarEntry.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the name of the entry, which includes the relative path and the filename.

Returns: To be added.

To be added.

## TarEntry.Uid property

```csharp
public int Uid { get; set; }
```

Gets or sets the ID of the user that owns the file represented by this entry.

Returns: To be added.

The value in this field has no effect on Windows platforms.

## TarEntry.ExtractToFile(String, Boolean) method

```csharp
public void ExtractToFile (string destinationFileName, bool overwrite);
```

Extracts the current file or directory to the filesystem. Symbolic links and hard links are not extracted.

Parameters:

- `destinationFileName`: The path to the destination file.
- `overwrite`: `true` if this method should overwrite any existing filesystem object located in the `destinationFileName` path; `false` to prevent overwriting.

Exceptions:

- `ArgumentNullException`: `destinationFileName` is `null`.
- `ArgumentException`: `destinationFileName` is empty.
- `IOException`: The parent directory of `destinationFileName` does not exist.

-or-

`overwrite` is `false` and a file already exists in `destinationFileName`.

-or-

A directory exists with the same name as `destinationFileName`.

-or-

An I/O problem occurred.
- `InvalidOperationException`: Attempted to extract a symbolic link, a hard link, or an unsupported entry type.
- `UnauthorizedAccessException`: Operation not permitted due to insufficient permissions.

Files of type `TarEntryType.BlockDevice`, `TarEntryType.CharacterDevice`, or `TarEntryType.Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `TarEntryType.BlockDevice` or `TarEntryType.CharacterDevice` to disk.

Symbolic links can be recreated using `File.CreateSymbolicLink`, `Directory.CreateSymbolicLink`, or `FileSystemInfo.CreateAsSymbolicLink`.

Hard links can only be extracted when using `TarFile.ExtractToDirectory` or `TarFile.ExtractToDirectory`.

## TarEntry.ExtractToFileAsync(String, Boolean, CancellationToken) method

```csharp
public System.Threading.Tasks.Task ExtractToFileAsync (string destinationFileName, bool overwrite, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts the current entry to the filesystem.

Parameters:

- `destinationFileName`: The path to the destination file.
- `overwrite`: `true` if this method should overwrite any existing filesystem object located in the `destinationFileName` path; `false` to prevent overwriting.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous extraction operation.

Exceptions:

- `ArgumentNullException`: `destinationFileName` is `null`.
- `ArgumentException`: `destinationFileName` is empty.
- `IOException`: The parent directory of `destinationFileName` does not exist.

-or-

`overwrite` is `false` and a file already exists in `destinationFileName`.

-or-

A directory exists with the same name as `destinationFileName`.

-or-

An I/O problem occurred.
- `InvalidOperationException`: The entry type is unsupported.
- `UnauthorizedAccessException`: Permissions are insufficient.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

Files of type `TarEntryType.BlockDevice`, `TarEntryType.CharacterDevice`, or `TarEntryType.Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `TarEntryType.BlockDevice` or `TarEntryType.CharacterDevice` to disk.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarEntry.ExtractToFile`.

## TarEntry.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current entry.

Returns: The `TarEntry.Name` of the current entry.

To be added.
