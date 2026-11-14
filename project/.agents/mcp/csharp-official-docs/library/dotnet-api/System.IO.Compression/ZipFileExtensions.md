---
title: "ZipFileExtensions class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFileExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFileExtensions class

Namespace: `System.IO.Compression`

```csharp
public static class ZipFileExtensions
```

Provides extension methods for the `ZipArchive` and `ZipArchiveEntry` classes.

The `ZipFileExtensions` class contains four methods that extend `ZipArchive`:

- `CreateEntryFromFile`
- `CreateEntryFromFile`
- `ExtractToDirectory`
- `ExtractToDirectory`

The `ZipFileExtensions` class contains two methods that extend `ZipArchiveEntry`:

- `ExtractToFile`
- `ExtractToFile`

#### Examples

The following example shows how to create a new entry in a zip archive from an existing file, and extract the contents of the archive to a directory.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program3.cs._

The following example shows how to iterate through the contents of a zip archive and extract files that have a .txt extension.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipFileExtensions.CreateEntryFromFile(ZipArchive, String, String) method

```csharp
public static System.IO.Compression.ZipArchiveEntry CreateEntryFromFile (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName);
```

Archives a file by compressing it and adding it to the zip archive.

Parameters:

- `destination`: The zip archive to add the file to.
- `sourceFileName`: The path to the file to be archived. You can specify either a relative or an absolute path. A relative path is interpreted as relative to the current working directory.
- `entryName`: The name of the entry to create in the zip archive.

Returns: A wrapper for the new entry in the zip archive.

Exceptions:

- `ArgumentException`: `sourceFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryName` is `String.Empty`.
- `ArgumentNullException`: `sourceFileName` or `entryName` is `null`.
- `PathTooLongException`: In `sourceFileName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `sourceFileName` is invalid (for example, it is on an unmapped drive).
- `IOException`: The file specified by `sourceFileName` cannot be opened, or is too large to be updated (current limit is <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `UnauthorizedAccessException`: `sourceFileName` specifies a directory.

-or-

The caller does not have the required permission to access the file specified by `sourceFileName`.
- `FileNotFoundException`: The file specified by `sourceFileName` is not found.
- `NotSupportedException`: The `sourceFileName` parameter is in an invalid format.

-or-

The zip archive does not support writing.
- `ObjectDisposedException`: The zip archive has been disposed.

#### Remarks
The new entry in the archive contains the contents of the file specified by `sourceFileName`. If an entry with the specified name (`entryName`) already exists in the archive, a second entry is created with an identical name. The `LastWriteTime` property of the entry is set to the last time the file on the file system was changed.

When `ZipArchiveMode.Update` is present, the size limit of an entry is limited to `MaxValue`. This limit is because update mode uses a `MemoryStream` internally to allow the seeking required when updating an archive, and `MemoryStream` has a maximum equal to the size of an int.

#### Examples
The following example shows how to create a new entry in a zip archive from an existing file.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program3.cs._

## ZipFileExtensions.CreateEntryFromFile(ZipArchive, String, String, CompressionLevel) method

```csharp
public static System.IO.Compression.ZipArchiveEntry CreateEntryFromFile (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, System.IO.Compression.CompressionLevel compressionLevel);
```

Archives a file by compressing it using the specified compression level and adding it to the zip archive.

Parameters:

- `destination`: The zip archive to add the file to.
- `sourceFileName`: The path to the file to be archived. You can specify either a relative or an absolute path. A relative path is interpreted as relative to the current working directory.
- `entryName`: The name of the entry to create in the zip archive.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.

Returns: A wrapper for the new entry in the zip archive.

Exceptions:

- `ArgumentException`: `sourceFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryName` is `String.Empty`.
- `ArgumentNullException`: `sourceFileName` or `entryName` is `null`.
- `DirectoryNotFoundException`: `sourceFileName` is invalid (for example, it is on an unmapped drive).
- `PathTooLongException`: In `sourceFileName`, the specified path, file name, or both exceed the system-defined maximum length.
- `IOException`: The file specified by `sourceFileName` cannot be opened, or is too large to be updated (current limit is <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `UnauthorizedAccessException`: `sourceFileName` specifies a directory.

-or-

The caller does not have the required permission to access the file specified by `sourceFileName`.
- `FileNotFoundException`: The file specified by `sourceFileName` is not found.
- `NotSupportedException`: The `sourceFileName` parameter is in an invalid format.

-or-

The zip archive does not support writing.
- `ObjectDisposedException`: The zip archive has been disposed.

#### Remarks
The new entry in the archive contains the contents of the file specified by `sourceFileName`. If an entry with the specified name (`entryName`) already exists in the archive, a second entry is created with an identical name. The `LastWriteTime` property of the entry is set to the last time the file on the file system was changed.

When `ZipArchiveMode.Update` is present, the size limit of an entry is limited to `MaxValue`. This limit is because update mode uses a `MemoryStream` internally to allow the seeking required when updating an archive, and `MemoryStream` has a maximum equal to the size of an int.

#### Examples
The following example shows how to create a new entry in a zip archive from an existing file, and specify the compression level.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program4.cs._

## ZipFileExtensions.CreateEntryFromFile(ZipArchive, String, String, Char>, ZipEncryptionMethod) method

```csharp
public static System.IO.Compression.ZipArchiveEntry CreateEntryFromFile (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, ReadOnlySpan<char> password, System.IO.Compression.ZipEncryptionMethod encryption);
```

To be added.

Parameters:

- `destination`: To be added.
- `sourceFileName`: To be added.
- `entryName`: To be added.
- `password`: To be added.
- `encryption`: To be added.

Returns: To be added.

To be added.

## ZipFileExtensions.CreateEntryFromFile(ZipArchive, String, String, CompressionLevel, Char>, ZipEncryptionMethod) method

```csharp
public static System.IO.Compression.ZipArchiveEntry CreateEntryFromFile (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, System.IO.Compression.CompressionLevel compressionLevel, ReadOnlySpan<char> password, System.IO.Compression.ZipEncryptionMethod encryption);
```

To be added.

Parameters:

- `destination`: To be added.
- `sourceFileName`: To be added.
- `entryName`: To be added.
- `compressionLevel`: To be added.
- `password`: To be added.
- `encryption`: To be added.

Returns: To be added.

To be added.

## ZipFileExtensions.CreateEntryFromFileAsync(ZipArchive, String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchiveEntry> CreateEntryFromFileAsync (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously adds a file from the file system to the archive under the specified entry name.

Parameters:

- `destination`: The zip archive to add the file to.
- `sourceFileName`: The path to the file on the file system to be copied from. The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.
- `entryName`: The name of the entry to be created.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: A wrapper for the newly created entry.

Exceptions:

- `ArgumentException`: `sourceFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

`entryName` is a zero-length string.
- `ArgumentNullException`: `sourceFileName` or `entryName` is `null`.
- `PathTooLongException`: In `sourceFileName`, the specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified `sourceFileName` is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file specified by `sourceFileName`.
- `UnauthorizedAccessException`: `sourceFileName` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `sourceFileName` was not found.
- `NotSupportedException`: `sourceFileName` is in an invalid format or the ZipArchive does not support writing.
- `ObjectDisposedException`: The ZipArchive has already been closed.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The new entry in the archive will contain the contents of the file.

The last write time of the archive entry is set to the last write time of the file on the file system.

If an entry with the specified name already exists in the archive, a second entry will be created that has an identical name.

If the specified source file has an invalid last modified time, the first datetime representable in the Zip timestamp format (midnight on January 1, 1980) will be used. If an entry with the specified name already exists in the archive, a second entry will be created that has an identical name. Since no
```csharp
CompressionLevel
```
is specified, the default provided by the implementation of the underlying compression algorithm will be used; the
```csharp
ZipArchive
```
will not impose its own default.

(Currently, the underlying compression algorithm is provided by the `DeflateStream` class.)

## ZipFileExtensions.CreateEntryFromFileAsync(ZipArchive, String, String, CompressionLevel, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchiveEntry> CreateEntryFromFileAsync (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, System.IO.Compression.CompressionLevel compressionLevel, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously adds a file from the file system to the archive under the specified entry name.

Parameters:

- `destination`: The zip archive to add the file to.
- `sourceFileName`: The path to the file on the file system to be copied from. The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.
- `entryName`: The name of the entry to be created.
- `compressionLevel`: The level of the compression (speed/memory vs. compressed size trade-off).
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: A wrapper for the newly created entry.

Exceptions:

- `ArgumentException`: `sourceFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

`entryName` is a zero-length string.
- `ArgumentNullException`: `sourceFileName` or `entryName` is `null`.
- `PathTooLongException`: In `sourceFileName`, the specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified `sourceFileName` is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error occurred while opening the file specified by `sourceFileName`.
- `UnauthorizedAccessException`: `sourceFileName` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in `sourceFileName` was not found.
- `NotSupportedException`: `sourceFileName` is in an invalid format or the ZipArchive does not support writing.
- `ObjectDisposedException`: The ZipArchive has already been closed.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The new entry in the archive will contain the contents of the file.

The last write time of the archive entry is set to the last write time of the file on the file system.

If an entry with the specified name already exists in the archive, a second entry will be created that has an identical name.

If the specified source file has an invalid last modified time, the first datetime representable in the Zip timestamp format (midnight on January 1, 1980) will be used. If an entry with the specified name already exists in the archive, a second entry will be created that has an identical name.

## ZipFileExtensions.CreateEntryFromFileAsync(ZipArchive, String, String, Char>, ZipEncryptionMethod, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchiveEntry> CreateEntryFromFileAsync (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, ReadOnlyMemory<char> password, System.IO.Compression.ZipEncryptionMethod encryption, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `destination`: To be added.
- `sourceFileName`: To be added.
- `entryName`: To be added.
- `password`: To be added.
- `encryption`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
