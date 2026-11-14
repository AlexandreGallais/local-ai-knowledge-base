---
title: "ZipFileExtensions class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFileExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFileExtensions class (part 3 of 3)

## ZipFileExtensions.ExtractToDirectoryAsync(ZipArchive, String, ZipExtractionOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (this System.IO.Compression.ZipArchive source, string destinationDirectoryName, System.IO.Compression.ZipExtractionOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `source`: To be added.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files. The directory can already exist. Missing directories are created as needed when extracting entries.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

The directory specified by `destinationDirectoryName` can already exist. This method creates the destination directory, its missing parent directories, and subdirectories as needed when extracting entries. If the archive is empty, this method doesn't create the destination directory.

Each extracted file has the same relative path to `destinationDirectoryName` as its source entry has to the root of the archive.

The `destinationDirectoryName` parameter accepts relative and absolute paths. A relative path is interpreted as relative to the current working directory.

If an error occurs during extraction, the archive remains partially extracted.

Set `OverwriteFiles` to `true` to overwrite existing files. The default is `false`, which causes extraction to throw an `IOException` if a file to be extracted already exists.

Use `Password` to supply the password for encrypted entries.

`EntryNameEncoding` isn't used by this overload. Entry names and comments are decoded using the encoding specified when the `source` archive is opened.

Symbolic links in the archive aren't recreated as symbolic links. If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and extraction writes to the final target folder.

Exceptions that occur during asynchronous extraction are stored in the returned task and are thrown when the task is awaited.

## ZipFileExtensions.ExtractToFile(ZipArchiveEntry, String) method

```csharp
public static void ExtractToFile (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName);
```

Extracts an entry in the zip archive to a file.

Parameters:

- `source`: The zip archive entry to extract a file from.
- `destinationFileName`: The path of the file to create from the contents of the entry. You can specify either a relative or an absolute path. A relative path is interpreted as relative to the current working directory.

Exceptions:

- `ArgumentException`: `destinationFileName` is a zero-length string, contains only white space, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.

-or-

`destinationFileName` specifies a directory.
- `ArgumentNullException`: `destinationFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: `destinationFileName` already exists.

-or-

An I/O error occurred.

-or-

The entry is currently open for writing.

-or-

The entry has been deleted from the archive.
- `UnauthorizedAccessException`: The caller does not have the required permission to create the new file.
- `InvalidDataException`: The entry is missing from the archive, or is corrupt and cannot be read.

-or-

The entry has been compressed by using a compression method that is not supported.
- `ObjectDisposedException`: The zip archive that this entry belongs to has been disposed.
- `NotSupportedException`: `destinationFileName` is in an invalid format.

-or-

The zip archive for this entry was opened in `ZipArchiveMode.Create` mode, which does not permit the retrieval of entries.

#### Remarks
If the destination file already exists, this method does not overwrite it; it throws an `IOException` exception. To overwrite an existing file, use the `ExtractToFile` method overload instead.

The last write time of the file is set to the last time the entry in the zip archive was changed; this value is stored in the `LastWriteTime` property.

You cannot use this method to extract a directory; use the `ZipFileExtensions.ExtractToDirectory` method instead.

#### Examples
The following example shows how to iterate through the contents of a zip archive file and extract files that have a .txt extension.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipFileExtensions.ExtractToFile(ZipArchiveEntry, String, Boolean) method

```csharp
public static void ExtractToFile (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName, bool overwrite);
```

Extracts an entry in the zip archive to a file, and optionally overwrites an existing file that has the same name.

Parameters:

- `source`: The zip archive entry to extract a file from.
- `destinationFileName`: The path of the file to create from the contents of the entry. You can specify either a relative or an absolute path. A relative path is interpreted as relative to the current working directory.
- `overwrite`: `true` to overwrite an existing file that has the same name as the destination file; otherwise, `false`.

Exceptions:

- `ArgumentException`: `destinationFileName` is a zero-length string, contains only white space, or contains one or more invalid characters as defined by `Path.InvalidPathChars`.

-or-

`destinationFileName` specifies a directory.
- `ArgumentNullException`: `destinationFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: The specified path is invalid (for example, it is on an unmapped drive).
- `IOException`: `destinationFileName` already exists and `overwrite` is `false`.

-or-

An I/O error occurred.

-or-

The entry is currently open for writing.

-or-

The entry has been deleted from the archive.
- `UnauthorizedAccessException`: The caller does not have the required permission to create the new file.
- `InvalidDataException`: The entry is missing from the archive or is corrupt and cannot be read.

-or-

The entry has been compressed by using a compression method that is not supported.
- `ObjectDisposedException`: The zip archive that this entry belongs to has been disposed.
- `NotSupportedException`: `destinationFileName` is in an invalid format.

-or-

The zip archive for this entry was opened in `ZipArchiveMode.Create` mode, which does not permit the retrieval of entries.

#### Remarks
The last write time of the file is set to the last time the entry in the zip archive was changed; this value is stored in the `LastWriteTime` property.

You cannot use this method to extract a directory; use the `ZipFileExtensions.ExtractToDirectory` method instead.

#### Examples
The following example shows how to iterate through the contents of a zip archive file, and extract files that have a .txt extension. It overwrites an existing file that has the same name in the destination folder. In order to compiler this code example, you must reference the `System.IO.Compression` and `System.IO.Compression.FileSystem` assemblies in your project.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program2.cs._

## ZipFileExtensions.ExtractToFile(ZipArchiveEntry, String, ZipExtractionOptions) method

```csharp
public static void ExtractToFile (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName, System.IO.Compression.ZipExtractionOptions options);
```

To be added.

Parameters:

- `source`: To be added.
- `destinationFileName`: To be added.
- `options`: To be added.

To be added.

## ZipFileExtensions.ExtractToFileAsync(ZipArchiveEntry, String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToFileAsync (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a file on the file system with the entry's contents and the specified name.

Parameters:

- `source`: The zip archive entry to extract a file from.
- `destinationFileName`: The name of the file that will hold the contents of the entry.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `destinationFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

`destinationFileName` specifies a directory.
- `ArgumentNullException`: `destinationFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The path specified in `destinationFileName` is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error has occurred.

-or-

The entry is currently open for writing.

-or-

The entry has been deleted from the archive.
- `NotSupportedException`: `destinationFileName` is in an invalid format.

-or-

The ZipArchive that this entry belongs to was opened in a write-only mode.
- `InvalidDataException`: The entry is missing from the archive or is corrupt and cannot be read.

-or-

The entry has been compressed using a compression method that is not supported.
- `ObjectDisposedException`: The ZipArchive that this entry belongs to has been disposed.

The specified path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

The last write time of the file is set to the entry's last write time. This method does not allow overwriting of an existing file with the same name. Attempting to extract explicit directories (entries with names that end in directory separator characters) will not result in the creation of a directory.

## ZipFileExtensions.ExtractToFileAsync(ZipArchiveEntry, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToFileAsync (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName, bool overwrite, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a file on the file system with the entry's contents and the specified name.

Parameters:

- `source`: The zip archive entry to extract a file from.
- `destinationFileName`: The name of the file that will hold the contents of the entry.
- `overwrite`: `true` to overwrite files; `false` otherwise.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `UnauthorizedAccessException`: The caller does not have the required permission.
- `ArgumentException`: `destinationFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.

-or-

`destinationFileName` specifies a directory.
- `ArgumentNullException`: `destinationFileName` is `null`.
- `PathTooLongException`: The specified path, file name, or both exceed the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The path specified in `destinationFileName` is invalid (for example, it is on an unmapped drive).
- `IOException`: An I/O error has occurred.

-or-

The entry is currently open for writing.

-or-

The entry has been deleted from the archive.
- `NotSupportedException`: `destinationFileName` is in an invalid format.

-or-

The ZipArchive that this entry belongs to was opened in a write-only mode.
- `InvalidDataException`: The entry is missing from the archive or is corrupt and cannot be read.

-or-

The entry has been compressed using a compression method that is not supported.
- `ObjectDisposedException`: The ZipArchive that this entry belongs to has been disposed.
- `OperationCanceledException`: An asynchronous operation is cancelled.

The specified path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

The last write time of the file is set to the entry's last write time.

This method does allows overwriting of an existing file with the same name.

## ZipFileExtensions.ExtractToFileAsync(ZipArchiveEntry, String, ZipExtractionOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToFileAsync (this System.IO.Compression.ZipArchiveEntry source, string destinationFileName, System.IO.Compression.ZipExtractionOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `source`: To be added.
- `destinationFileName`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
