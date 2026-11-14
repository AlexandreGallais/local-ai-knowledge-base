---
title: "ZipFileExtensions class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFileExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFileExtensions class (part 2 of 3)

## ZipFileExtensions.CreateEntryFromFileAsync(ZipArchive, String, String, CompressionLevel, Char>, ZipEncryptionMethod, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchiveEntry> CreateEntryFromFileAsync (this System.IO.Compression.ZipArchive destination, string sourceFileName, string entryName, System.IO.Compression.CompressionLevel compressionLevel, ReadOnlyMemory<char> password, System.IO.Compression.ZipEncryptionMethod encryption, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `destination`: To be added.
- `sourceFileName`: To be added.
- `entryName`: To be added.
- `compressionLevel`: To be added.
- `password`: To be added.
- `encryption`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## ZipFileExtensions.ExtractToDirectory(ZipArchive, String) method

```csharp
public static void ExtractToDirectory (this System.IO.Compression.ZipArchive source, string destinationDirectoryName);
```

Extracts all the files in the zip archive to a directory on the file system.

Parameters:

- `source`: The zip archive to extract files from.
- `destinationDirectoryName`: The path to the directory to place the extracted files in. You can specify either a relative or an absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.
- `ArgumentNullException`: `destinationDirectoryName` is `null`.
- `PathTooLongException`: The specified path exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of an entry in the archive is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

Extracting an entry from the archive would create a file that is outside the directory specified by `destinationDirectoryName`. (For example, this might happen if the entry name contains parent directory accessors.)

-or-

Two or more entries in the archive have the same name.
- `UnauthorizedAccessException`: The caller does not have the required permission to write to the destination directory.
- `NotSupportedException`: `destinationDirectoryName` contains an invalid format.
- `InvalidDataException`: An archive entry cannot be found or is corrupt.

-or-

An archive entry was compressed by using a compression method that is not supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

If an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

#### Examples
The following example shows how to create a new entry in a zip archive from an existing file, and extract the archive to a new directory.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program3.cs._

## ZipFileExtensions.ExtractToDirectory(ZipArchive, String, Boolean) method

```csharp
public static void ExtractToDirectory (this System.IO.Compression.ZipArchive source, string destinationDirectoryName, bool overwriteFiles);
```

Extracts all of the files in the archive to a directory on the file system.

Parameters:

- `source`: The `ZipArchive` to extract.
- `destinationDirectoryName`: The path to the destination directory on the file system. The path can be relative or absolute. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `overwriteFiles`: `true` to overwrite existing files; `false` otherwise.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is a zero-length string, contains only whitespace,
or contains one or more invalid characters as defined by `Path.InvalidPathChars`.
- `ArgumentNullException`: `destinationDirectoryName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of a `ZipArchiveEntry` is zero-length, contains only whitespace, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.

-or-

Extracting a `ZipArchiveEntry` would have resulted in a destination file that is outside `destinationDirectoryName` (for example, if the entry name contains parent directory accessors).

-or-

A `ZipArchiveEntry` has the same name as an already extracted entry from the same archive.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `destinationDirectoryName` is in an invalid format.
- `InvalidDataException`: A `ZipArchiveEntry` was not found or was corrupt.

-or-

A `ZipArchiveEntry` has been compressed using a compression method that is not supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

If there is an error while extracting the archive, the archive will remain partially extracted.

Each entry is extracted such that the extracted file has the same relative path to `destinationDirectoryName` as the entry has to the root of the archive.

If a file to be archived has an invalid last modified time, the first date and time representable in the Zip timestamp format (midnight on January 1, 1980) is used.

## ZipFileExtensions.ExtractToDirectory(ZipArchive, String, ZipExtractionOptions) method

```csharp
public static void ExtractToDirectory (this System.IO.Compression.ZipArchive source, string destinationDirectoryName, System.IO.Compression.ZipExtractionOptions options);
```

To be added.

Parameters:

- `source`: To be added.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files. The directory can already exist. Missing directories are created as needed when extracting entries.
- `options`: To be added.

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Each extracted file has the same relative path to `destinationDirectoryName` as its source entry has to the root of the archive.

The `destinationDirectoryName` parameter accepts relative and absolute paths. A relative path is interpreted as relative to the current working directory.

If an error occurs during extraction, the archive remains partially extracted.

Set `OverwriteFiles` to `true` to overwrite existing files. The default is `false`, which causes extraction to throw an `IOException` if a file to be extracted already exists.

Use `Password` to supply the password for encrypted entries.

`EntryNameEncoding` isn't used by this overload. Entry names and comments are decoded using the encoding specified when the `source` archive is opened.

Symbolic links in the archive aren't recreated as symbolic links. If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and extraction writes to the final target folder.

## ZipFileExtensions.ExtractToDirectoryAsync(ZipArchive, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (this System.IO.Compression.ZipArchive source, string destinationDirectoryName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all of the files in the archive to a directory on the file system. The specified directory can already exist.

Parameters:

- `source`: The zip archive to extract files from.
- `destinationDirectoryName`: The path to the directory on the file system. The directory can already exist. Missing directories are created as needed when extracting entries.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.
- `ArgumentNullException`: `destinationDirectoryName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `IOException`: An archive entry's name is zero-length, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

Extracting an archive entry would have resulted in a destination file that is outside `destinationDirectoryName` (for example, if the entry name contains parent directory accessors).

-or-

An archive entry has the same name as an already extracted entry from the same archive.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `destinationDirectoryName` is in an invalid format.
- `InvalidDataException`: An archive entry was not found or is corrupt.

-or-

An archive entry has been compressed using a compression method that is not supported.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

If there is an error while extracting the archive, the archive remains partially extracted.

Each entry is extracted such that the extracted file has the same relative path to `destinationDirectoryName` as the entry has to the root of the archive. If a file to be archived has an invalid last modified time, the first datetime representable in the Zip timestamp format (midnight on January 1, 1980) will be used.

## ZipFileExtensions.ExtractToDirectoryAsync(ZipArchive, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (this System.IO.Compression.ZipArchive source, string destinationDirectoryName, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Extracts all of the files in the archive to a directory on the file system. The specified directory can already exist.

Parameters:

- `source`: The zip archive to extract files from.
- `destinationDirectoryName`: The path to the directory on the file system. The directory can already exist. Missing directories are created as needed when extracting entries.
- `overwriteFiles`: `true` to overwrite files; `false` otherwise.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

This method creates missing directories as needed when extracting entries.

If there is an error while extracting the archive, the archive will remain partially extracted.

Each entry is extracted such that the extracted file has the same relative path to `destinationDirectoryName` as the entry has to the root of the archive. If a file to be archived has an invalid last modified time, the first datetime representable in the Zip timestamp format (midnight on January 1, 1980) will be used.
- `ArgumentNullException`: `destinationDirectoryName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.

For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified path is invalid, (for example, it is on an unmapped drive).
- `IOException`: An archive entry's name is zero-length, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

Extracting an archive entry would have resulted in a destination file that is outside `destinationDirectoryName` (for example, if the entry name contains parent directory accessors).

-or-

An archive entry has the same name as an already extracted entry from the same archive.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `destinationDirectoryName` is in an invalid format.
- `InvalidDataException`: An archive entry was not found or was corrupt.

-or-

An archive entry has been compressed using a compression method that is not supported.

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.
