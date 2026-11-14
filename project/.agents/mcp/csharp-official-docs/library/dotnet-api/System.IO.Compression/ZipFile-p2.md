---
title: "ZipFile class (part 2 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 2 of 11)

## ZipFile.CreateFromDirectory(String, Stream, CompressionLevel, Boolean, Encoding) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Text.Encoding? entryNameEncoding);
```

Creates a zip archive in the specified stream that contains the files and directories from the specified directory, uses the specified compression level and character encoding for entry names and comments, and optionally includes the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.

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

The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created.
Use this method overload to specify the compression level and character encoding, and whether to include the base directory in the archive.
If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

## ZipFile.CreateFromDirectory(String, String, CompressionLevel, Boolean, Encoding) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Text.Encoding? entryNameEncoding);
```

Creates a zip archive that contains the files and directories from the specified directory, uses the specified compression level and character encoding for entry names and comments, and optionally includes the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destinationArchiveFileName`: The path of the archive to be created, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` or `destinationArchiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
- `ArgumentNullException`: `sourceDirectoryName` or `destinationArchiveFileName` is `null`.
- `PathTooLongException`: In `sourceDirectoryName` or `destinationArchiveFileName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `sourceDirectoryName` is invalid or does not exist (for example, it is on an unmapped drive).
- `IOException`: `destinationArchiveFileName` already exists.

-or-

A file in the specified directory could not be opened.

-or-

An I/O error occurred while opening a file to be archived.
- `UnauthorizedAccessException`: `destinationArchiveFileName` specifies a directory.

-or-

The caller does not have the required permission to access the directory specified in `sourceDirectoryName` or the file specified in `destinationArchiveFileName`.
- `NotSupportedException`: `sourceDirectoryName` or `destinationArchiveFileName` contains an invalid format.

-or-

The zip archive does not support writing.

#### Remarks
The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created. Use this method overload to specify the compression level and character encoding, and whether to include the base directory in the archive.

If the archive already exists, an `IOException` exception is thrown. If an entry with the specified name already exists in the archive, a second entry is created with an identical name.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

If `entryNameEncoding` is set to a value other than `null`, the entry names and comments are encoded by using the specified encoding. If the specified encoding is a UTF-8 encoding, the language encoding flag (in the general-purpose bit flag of the local file header) is set for each entry.

If `entryNameEncoding` is set to `null`, the entry names and comments are encoded according to the following rules:

- For entry names and comments that contain characters outside the ASCII range, the language encoding flag is set, and UTF-8 is used to encode the entry name and comment.

- For entry names and comments that contain only ASCII characters, the language encoding flag is not set, and the current system default code page is used to encode the entry names and comments.

## ZipFile.CreateFromDirectoryAsync(String, Stream, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive in the specified stream that contains the files and directories from the specified directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.
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
- `OperationCanceledException`: An asynchronous operation is cancelled.

The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created.

This method overload does not include the base directory in the archive and does not allow you to specify a compression level.

If you want to include the base directory or specify a compression level, call the `ZipFile.CreateFromDirectory` method overload.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

## ZipFile.CreateFromDirectoryAsync(String, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationArchiveFileName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive at the path `destinationArchiveFileName` that contains the files and directories from the directory specified by `sourceDirectoryName`.

Parameters:

- `sourceDirectoryName`: The path to the directory on the file system to be archived.
- `destinationArchiveFileName`: The name of the archive to be created.
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

The directory structure is preserved in the archive, and a recursive search is done for files to be archived. The archive must not exist. If the directory is empty, an empty archive is created. If a file in the directory cannot be added to the archive, the archive will be left incomplete and invalid and the method will throw an exception. This method does not include the base directory into the archive.

If an error is encountered while adding files to the archive, this method stops adding files and leaves the archive in an invalid state. The paths are permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. If a file in the archive has data in the last write time field that is not a valid zip timestamp, an indicator value of 1980 January 1 at midnight will be used for the file's last modified time.If an entry with the specified name already exists in the archive, a second entry is created that has an identical name. Since no
```csharp
CompressionLevel
```
is specified, the default provided by the implementation of the underlying compression algorithm is used; the
```csharp
ZipArchive
```
will not impose its own default.

(Currently, the underlying compression algorithm is provided by the `DeflateStream` class.)

## ZipFile.CreateFromDirectoryAsync(String, Stream, ZipFileCreationOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.ZipFileCreationOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZipFile.CreateFromDirectoryAsync(String, String, ZipFileCreationOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.ZipFileCreationOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationArchiveFileName`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
