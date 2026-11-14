---
title: "ZipFile class (part 3 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 3 of 11)

## ZipFile.CreateFromDirectoryAsync(String, Stream, CompressionLevel, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive in the specified stream that contains the files and directories from the specified directory, using the specified compression level, and optionally including the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

The `destination` stream does not support writing.
- `ArgumentNullException`: `sourceDirectoryName` or `destination` is `null`.
- `PathTooLongException`: In `sourceDirectoryName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `sourceDirectoryName` is invalid or does not exist (for example, it is on an unmapped drive).
- `IOException`: A file in the specified directory could not be opened.

-or-

An I/O error occurred while opening a file to be archived.
- `NotSupportedException`: `sourceDirectoryName` contains an invalid format.
- `ArgumentOutOfRangeException`: `compressionLevel` is not a valid `CompressionLevel` value.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created.

Use this method overload to specify the compression level and whether to include the base directory in the archive.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

## ZipFile.CreateFromDirectoryAsync(String, String, CompressionLevel, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive at the path `destinationArchiveFileName` that contains the files and directories in the directory specified by `sourceDirectoryName`.

Parameters:

- `sourceDirectoryName`: The path to the directory on the file system to be archived.
- `destinationArchiveFileName`: The name of the archive to be created.
- `compressionLevel`: One of the enumeration values that specifies the level of the compression (speed/memory vs. compressed size trade-off).
- `includeBaseDirectory`: `true` to indicate that a directory named `sourceDirectoryName` should be included at the root of the archive. `false` to indicate that the files and directories in `sourceDirectoryName` should be included directly in the archive.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` or `destinationArchiveFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by
```csharp
InvalidPathChars
```
.
- `ArgumentNullException`: `sourceDirectoryName` or `destinationArchiveFileName` is `null`.
- `PathTooLongException`: In `sourceDirectoryName` or `destinationArchiveFileName`, the specified path, file name, or both exceed the system-defined maximum length.

For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The path specified in `sourceDirectoryName` or `destinationArchiveFileName` is invalid, (for example, it is on an unmapped drive).

-or-

The directory specified by `sourceDirectoryName` does not exist.
- `IOException`: `destinationArchiveFileName` already exists.

-or-

An I/O error occurred while opening a file to be archived.
- `UnauthorizedAccessException`: `destinationArchiveFileName` specified a directory.

-or-

The caller does not have the required permission.
- `NotSupportedException`: `sourceDirectoryName` or `destinationArchiveFileName` is in an invalid format.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The directory structure is preserved in the archive, and a recursive search is done for files to be archived. The archive must not exist. If the directory is empty, an empty archive will be created.

If a file in the directory cannot be added to the archive, the archive will be left incomplete and invalid and the method will throw an exception. This method optionally includes the base directory in the archive.

If an error is encountered while adding files to the archive, this method will stop adding files and leave the archive in an invalid state. The paths are permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. If a file in the archive has data in the last write time field that is not a valid zip timestamp, an indicator value of 1980 January 1 at midnight will be used for the file's last modified time.If an entry with the specified name already exists in the archive, a second entry will be created that has an identical name. Since no
```csharp
CompressionLevel
```
is specified, the default provided by the implementation of the underlying compression algorithm will be used; the
```csharp
ZipArchive
```
will not impose its own default.

(Currently, the underlying compression algorithm is provided by the `DeflateStream` class.)

## ZipFile.CreateFromDirectoryAsync(String, Stream, CompressionLevel, Boolean, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive in the specified stream that contains the files and directories from the specified directory, using the specified compression level and character encoding for entry names, and optionally including the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.
- `entryNameEncoding`: The encoding to use when reading or writing entry names in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

The `destination` stream does not support writing.
- `ArgumentNullException`: `sourceDirectoryName` or `destination` is `null`.
- `PathTooLongException`: In `sourceDirectoryName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `sourceDirectoryName` is invalid or does not exist (for example, it is on an unmapped drive).
- `IOException`: A file in the specified directory could not be opened.

-or-

An I/O error occurred while opening a file to be archived.
- `NotSupportedException`: `sourceDirectoryName` contains an invalid format.
- `ArgumentOutOfRangeException`: `compressionLevel` is not a valid `CompressionLevel` value.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created.

Use this method overload to specify the compression level and character encoding, and whether to include the base directory in the archive.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.
