---
title: "ZipFile class (part 8 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 8 of 11)

## ZipFile.ExtractToDirectoryAsync(Stream, String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (System.IO.Stream source, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all the files from the zip archive stored in the specified stream and places them in the specified destination directory on the file system and uses the specified character encoding for entry names.

Parameters:

- `source`: The stream from which the zip archive is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.
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

An archive entry to extract has the same name as an entry that has already been extracted or that exists in `destinationDirectoryName`.
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

## ZipFile.ExtractToDirectoryAsync(String, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceArchiveFileName, string destinationDirectoryName, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all of the files in the specified archive to a directory on the file system.

Parameters:

- `sourceArchiveFileName`: The path to the archive on the file system that is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.
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
- `InvalidDataException`: `sourceArchiveFileName` not a valid ZipArchive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry has been compressed using a compression method that isn't supported.
- `OperationCanceledException`: An asynchronous operation is cancelled.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

If there is an error while extracting the archive, the archive remains partially extracted. Each entry is extracted such that the extracted file has the same relative path to the `destinationDirectoryName` as the entry has to the archive. The path accepts relative or absolute path information; relative paths are interpreted as relative to the current working directory.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.

## ZipFile.ExtractToDirectoryAsync(String, String, ZipExtractionOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceArchiveFileName, string destinationDirectoryName, System.IO.Compression.ZipExtractionOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceArchiveFileName`: To be added.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files. The directory can already exist. Missing directories are created as needed when extracting entries.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Each extracted file has the same relative path to `destinationDirectoryName` as its source entry has to the root of the archive.

The `sourceArchiveFileName` and `destinationDirectoryName` parameters accept relative and absolute paths. A relative path is interpreted as relative to the current working directory.

If an error occurs during extraction, the archive remains partially extracted.

Set `OverwriteFiles` to `true` to overwrite existing files. The default is `false`, which causes extraction to throw an `IOException` if a file to be extracted already exists.

Use `Password` to supply the password for encrypted entries.

Use `EntryNameEncoding` to specify the encoding for entry names and comments when opening the archive. For details about how this encoding is used, see `%23ctor`.

Symbolic links in the archive aren't recreated as symbolic links. If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and extraction writes to the final target folder.

Exceptions that occur during asynchronous extraction are stored in the returned task and are thrown when the task is awaited.

## ZipFile.ExtractToDirectoryAsync(String, String, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceArchiveFileName, string destinationDirectoryName, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts all of the files in the specified archive to a directory on the file system.

Parameters:

- `sourceArchiveFileName`: The path to the archive on the file system that is to be extracted.
- `destinationDirectoryName`: The path to the directory on the file system. The directory can already exist. Missing directories are created as needed when extracting entries.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this ZipArchive.
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

If there is an error while extracting the archive, the archive remains partially extracted. Each entry is extracted such that the extracted file has the same relative path to the `destinationDirectoryName` as the entry has to the archive. The path accepts relative or absolute path information; relative paths are interpreted as relative to the current working directory.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.

If `entryNameEncoding` is set to a value other than `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the specified `entryNameEncoding` to decode the entry name and comment.
- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.

If `entryNameEncoding` is set to `null`, entry names and comments are decoded according to the following rules:

- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the current system default code page (`Encoding.Default`) to decode the entry name and comment.
- For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.

Unicode encodings other than UTF-8 can't be used for `entryNameEncoding`, otherwise an `ArgumentException` is thrown.
