---
title: "ZipFile class (part 9 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 9 of 11)

## ZipFile.ExtractToDirectoryAsync(Stream, String, Encoding, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (System.IO.Stream source, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all the files from the zip archive stored in the specified stream and places them in the specified destination directory on the file system, uses the specified character encoding for entry names, and optionally allows choosing if the files in the destination directory should be overwritten.

Parameters:

- `source`: The stream from which the zip archive is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.
- `overwriteFiles`: `true` to overwrite files; `false` otherwise.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
- `ArgumentNullException`: `destinationDirectoryName` or `source` is `null`.
- `PathTooLongException`: The specified path in `destinationDirectoryName` exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of an entry in the archive is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

Extracting an archive entry would create a file that is outside the directory specified by `destinationDirectoryName`. (For example, this might happen if the entry name contains parent directory accessors.)

-or-

`overwriteFiles` is `false` and an archive entry to extract has the same name as an entry that has already been extracted or that exists in `destinationDirectoryName`.
- `UnauthorizedAccessException`: The caller does not have the required permission to access the archive or the destination directory.
- `NotSupportedException`: `destinationDirectoryName` contains an invalid format.
- `InvalidDataException`: The archive contained in the `source` stream is not a valid zip archive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry was compressed by using a compression method that isn't supported.
- `OperationCanceledException`: An asynchronous operation is cancelled.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Exceptions related to validating the paths in the `destinationDirectoryName` or the files in the zip archive contained in the `source` parameters are thrown before extraction. Otherwise, if an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.

## ZipFile.ExtractToDirectoryAsync(String, String, Encoding, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceArchiveFileName, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all of the files in the specified archive to a directory on the file system.

The specified directory can already exist. Missing directories are created as needed when extracting entries.

If there is an error while extracting the archive, the archive will remain partially extracted. Each entry will be extracted such that the extracted file has the same relative path to the destinationDirectoryName as the entry has to the archive. The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory. If a file to be archived has an invalid last modified time, the first datetime representable in the zip timestamp format (midnight on January 1, 1980) will be used.

Parameters:

- `sourceArchiveFileName`: The path to the archive on the file system that is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this ZipArchive.
- `overwriteFiles`: `true` to overwrite files; `false` otherwise.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `sourceArchiveFileName` or `destinationDirectoryName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.
- `ArgumentNullException`: `sourceArchiveFileName` or `destinationDirectoryName` is `null`.
- `PathTooLongException`: `sourceArchiveFileName` or `destinationDirectoryName` specifies a path, file name, or both that exceeds the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The path specified by `sourceArchiveFileName` or `destinationDirectoryName` is invalid, (for example, it is on an unmapped drive).
- `IOException`: An I/O error has occurred.

-or-

An archive entry's name is zero-length, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

Extracting an archive entry would result in a file destination that is outside the destination directory (for example, because of parent directory accessors).

-or-

An archive entry has the same name as an already extracted entry from the same archive.
- `UnauthorizedAccessException`: The caller does not have the required permission.
- `NotSupportedException`: `sourceArchiveFileName` or `destinationDirectoryName` is in an invalid format.
- `FileNotFoundException`: `sourceArchiveFileName` was not found.
- `InvalidDataException`: The archive specified by `sourceArchiveFileName` is not a valid ZipArchive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry has been compressed using a compression method that isn't supported.
- `OperationCanceledException`: An asynchronous operation is cancelled.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

If `entryNameEncoding` is set to a value other than `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the specified `entryNameEncoding` to decode the entry name and comment.
- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.

If `entryNameEncoding` is set to `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the current system default code page (`Encoding.Default`) to decode the entry name and comment.
- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.

Unicode encodings other than UTF-8 can't be used for `entryNameEncoding`, otherwise an `ArgumentException` is thrown.

## ZipFile.Open(String, ZipArchiveMode) method

```csharp
public static System.IO.Compression.ZipArchive Open (string archiveFileName, System.IO.Compression.ZipArchiveMode mode);
```

Opens a zip archive at the specified path and in the specified mode.

Parameters:

- `archiveFileName`: The path to the archive to open, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `mode`: One of the enumeration values that specifies the actions that are allowed on the entries in the opened archive.

Returns: The opened zip archive.

Exceptions:

- `ArgumentException`: `archiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.
- `ArgumentNullException`: `archiveFileName` is `null`.
- `PathTooLongException`: In `archiveFileName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `archiveFileName` is invalid or does not exist (for example, it is on an unmapped drive).
- `IOException`: `archiveFileName` could not be opened.

-or-

`mode` is set to `ZipArchiveMode.Create`, but the file specified in `archiveFileName` already exists.

-or-

An unspecified I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `archiveFileName` specifies a directory.

-or-

The caller does not have the required permission to access the file specified in `archiveFileName`.
- `ArgumentOutOfRangeException`: `mode` specifies an invalid value.
- `FileNotFoundException`: `mode` is set to `ZipArchiveMode.Read`, but the file specified in `archiveFileName` is not found.
- `NotSupportedException`: `archiveFileName` contains an invalid format.
- `InvalidDataException`: `archiveFileName` could not be interpreted as a zip archive.

-or-

`mode` is `ZipArchiveMode.Update`, but an entry is missing or corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update`, but an entry is too large to fit into memory.

#### Remarks
When you set the `mode` parameter to `Read`, the archive is opened with `Open` from the `FileMode` enumeration as the file mode value. If the archive does not exist, a `FileNotFoundException` exception is thrown. Setting the `mode` parameter to `Read` is equivalent to calling the `ZipFile.OpenRead` method.

When you set the `mode` parameter to `Create`, the archive is opened with `CreateNew` as the file mode value. If the archive already exists, an `IOException` is thrown.

When you set the `mode` parameter to `Update`, the archive is opened with `OpenOrCreate` as the file mode value. If the archive exists, it is opened. The existing entries can be modified and new entries can be created. If the archive does not exist, a new archive is created; however, creating a zip archive in `Update` mode is not as efficient as creating it in `Create` mode.

#### Examples
The following example shows how to open a zip archive in the update mode and add an entry to the archive.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program3.cs._
