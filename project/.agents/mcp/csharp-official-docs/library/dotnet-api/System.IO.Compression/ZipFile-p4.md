---
title: "ZipFile class (part 4 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 4 of 11)

## ZipFile.CreateFromDirectoryAsync(String, String, CompressionLevel, Boolean, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a zip archive at the path `destinationArchiveFileName` that contains the files and directories in the directory specified by `sourceDirectoryName`.

Parameters:

- `sourceDirectoryName`: The path to the directory on the file system to be archived.
- `destinationArchiveFileName`: The name of the archive to be created.
- `compressionLevel`: One of the enumeration values that specifies the level of the compression (speed/memory vs. compressed size trade-off).
- `includeBaseDirectory`: `true` to indicate that a directory named `sourceDirectoryName` should be included at the root of the archive. `false` to indicate that the files and directories in `sourceDirectoryName` should be included directly in the archive.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this ZipArchive.
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

Specifying a value for `entryNameEncoding` other than `null` is discouraged.

However, this may be necessary for interoperability with zip archive tools and libraries that do not correctly support UTF-8 encoding for entry names or comments.

If `entryNameEncoding` is not specified (
```csharp
== null
```
):
For file names or comments that contain characters outside the ASCII range:
The language encoding flag (EFS) will be set in the general purpose bit flag of the local file header of the corresponding entry, and UTF-8 (
```csharp
Encoding.UTF8
```
) will be used to encode the entry name and comment into bytes.For file names or comments that do not contain characters outside the ASCII range:
The language encoding flag (EFS) will not be set in the general purpose bit flag of the local file header of the corresponding entry, and the current system default code page (
```csharp
Encoding.Default
```
) will be used to encode the entry names and comments into bytes.
If `entryNameEncoding` is specified (
```csharp
!= null
```
):
The specified `entryNameEncoding` will always be used to encode the entry names and comments into bytes.
The language encoding flag (EFS) in the general purpose bit flag of the local file header for each entry will be set if and only if the specified `entryNameEncoding` is a UTF-8 encoding.

Unicode encodings other than UTF-8 can't be used for the `entryNameEncoding`, otherwise an `ArgumentException` is thrown.

## ZipFile.ExtractToDirectory(Stream, String) method

```csharp
public static void ExtractToDirectory (System.IO.Stream source, string destinationDirectoryName);
```

Extracts all the files from the zip archive stored in the specified stream and places them in the specified destination directory on the file system.

Parameters:

- `source`: The stream from which the zip archive is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` is `String.Empty`, contains only white space, or contains at least one invalid character.
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

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Exceptions related to validating the paths in the `destinationDirectoryName` or the files in the zip archive contained in the `source` parameters are thrown before extraction. Otherwise, if an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

If an entry in the zip archive is a symbolic link, it's extracted as a regular folder since symbolic link information isn't preserved in the ZIP format. If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

If a file to be archived has an invalid last modified time, the first date and time representable in the zip timestamp format (midnight on January 1, 1980) will be used.

## ZipFile.ExtractToDirectory(String, String) method

```csharp
public static void ExtractToDirectory (string sourceArchiveFileName, string destinationDirectoryName);
```

Extracts all the files in the specified zip archive to a directory on the file system.

Parameters:

- `sourceArchiveFileName`: The path to the archive that is to be extracted.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory. The directory can already exist. Missing directories are created as needed when extracting entries.

Exceptions:

- `ArgumentException`: `destinationDirectoryName` or `sourceArchiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.
- `ArgumentNullException`: `destinationDirectoryName` or `sourceArchiveFileName` is `null`.
- `PathTooLongException`: The specified path in `destinationDirectoryName` or `sourceArchiveFileName` exceeds the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: The name of an entry in the archive is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

Extracting an archive entry would create a file that is outside the directory specified by `destinationDirectoryName`. (For example, this might happen if the entry name contains parent directory accessors.)

-or-

An archive entry to extract has the same name as an entry that has already been extracted or that exists in `destinationDirectoryName`.
- `UnauthorizedAccessException`: The caller does not have the required permission to access the archive or the destination directory.
- `NotSupportedException`: `destinationDirectoryName` or `sourceArchiveFileName` contains an invalid format.
- `FileNotFoundException`: `sourceArchiveFileName` was not found.
- `InvalidDataException`: The archive specified by `sourceArchiveFileName` is not a valid zip archive.

-or-

An archive entry was not found or was corrupt.

-or-

An archive entry was compressed by using a compression method that isn't supported.

#### Remarks

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Exceptions related to validating the paths in the `destinationDirectoryName` or `sourceArchiveFileName` parameters are thrown before extraction. Otherwise, if an error occurs during extraction, the archive remains partially extracted. Each extracted file has the same relative path to the directory specified by `destinationDirectoryName` as its source entry has to the root of the archive.

If an entry in the zip archive is a symbolic link, it's extracted as a regular folder since symbolic link information isn't preserved in the ZIP format.
If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

#### Examples
This example shows how to create and extract a zip archive by using the `ZipFile` class. It compresses the contents of a folder into a zip archive and extracts that content to a new folder. To use the `ZipFile` class, you must reference the `System.IO.Compression.FileSystem` assembly in your project.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipFile/CreateFromDirectory/program1.cs._
