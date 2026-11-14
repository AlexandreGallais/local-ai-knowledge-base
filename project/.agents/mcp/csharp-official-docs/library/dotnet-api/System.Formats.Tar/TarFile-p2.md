---
title: "TarFile class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarFile class (part 2 of 3)

## TarFile.ExtractToDirectory(String, String, Boolean) method

```csharp
public static void ExtractToDirectory (string sourceFileName, string destinationDirectoryName, bool overwriteFiles);
```

Extracts the contents of a tar file into the specified directory.

Parameters:

- `sourceFileName`: The path of the tar file to extract.
- `destinationDirectoryName`: The path of the destination directory where the filesystem entries should be extracted. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `overwriteFiles`: `true` to overwrite files and directories in `destinationDirectoryName`; `false` to avoid overwriting, and throw if any files or directories are found with existing names.

Exceptions:

- `ArgumentNullException`: `sourceFileName` or `destinationDirectoryName` is `null`.
- `DirectoryNotFoundException`: .NET 11 and earlier versions: The `destinationDirectoryName` directory does not exist.
- `FileNotFoundException`: The `sourceFileName` file path is not found.
- `UnauthorizedAccessException`: Permissions are insufficient.
- `ArgumentException`: Extracting one of the tar entries would have resulted in a file outside the specified destination directory.

-or-

`sourceFileName` or `destinationDirectoryName` is empty.
- `InvalidDataException`: .NET 11 and later versions only: An entry's checksum is invalid.
- `IOException`: An I/O exception occurred.

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

## TarFile.ExtractToDirectory(String, String, TarExtractOptions) method

```csharp
public static void ExtractToDirectory (string sourceFileName, string destinationDirectoryName, System.Formats.Tar.TarExtractOptions options);
```

To be added.

Parameters:

- `sourceFileName`: To be added.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `options`: To be added.

Exceptions:

- `DirectoryNotFoundException`: .NET 11 and earlier versions: The `destinationDirectoryName` directory does not exist.

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

The path can be relative or absolute. A relative path is interpreted as relative to the current working directory.

If an error occurs during extraction, the archive remains partially extracted.

Set `OverwriteFiles` to `true` to overwrite existing files. The default is `false`. Use `HardLinkMode` to control how hard link entries are extracted.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

## TarFile.ExtractToDirectoryAsync(Stream, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (System.IO.Stream source, string destinationDirectoryName, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts the contents of a stream that represents a tar archive into the specified directory.

Parameters:

- `source`: The stream containing the tar archive.
- `destinationDirectoryName`: The path of the destination directory where the filesystem entries should be extracted. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `overwriteFiles`: `true` to overwrite files and directories in `destinationDirectoryName`; `false` to avoid overwriting, and throw if any files or directories are found with existing names.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous extraction operation.

Exceptions:

- `ArgumentNullException`: `source` or `destinationDirectoryName` is `null`.
- `DirectoryNotFoundException`: .NET 11 and earlier versions: The `destinationDirectoryName` directory does not exist.
- `UnauthorizedAccessException`: Permissions are insufficient.
- `ArgumentException`: Extracting one of the tar entries would have resulted in a file outside the specified destination directory.

-or-

`destinationDirectoryName` is empty.

-or-

`source` does not support reading.
- `InvalidDataException`: .NET 11 and later versions only: An entry's checksum is invalid.
- `IOException`: An I/O exception occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ExtractToDirectory`.

## TarFile.ExtractToDirectoryAsync(Stream, String, TarExtractOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (System.IO.Stream source, string destinationDirectoryName, System.Formats.Tar.TarExtractOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `source`: To be added.
- `destinationDirectoryName`: The path to the directory in which to place the extracted files. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

Exceptions:

- `DirectoryNotFoundException`: .NET 11 and earlier versions: The `destinationDirectoryName` directory does not exist.

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

The path can be relative or absolute. A relative path is interpreted as relative to the current working directory.

If an error occurs during extraction, the archive remains partially extracted.

Set `OverwriteFiles` to `true` to overwrite existing files. The default is `false`. Use `HardLinkMode` to control how hard link entries are extracted.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

The `source` stream is left open after extraction.

Exceptions that occur during asynchronous extraction are stored in the returned task and are thrown when the task is awaited.

## TarFile.ExtractToDirectoryAsync(String, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceFileName, string destinationDirectoryName, bool overwriteFiles, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously extracts the contents of a tar file into the specified directory.

Parameters:

- `sourceFileName`: The path of the tar file to extract.
- `destinationDirectoryName`: The path of the destination directory where the filesystem entries should be extracted. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `overwriteFiles`: `true` to overwrite files and directories in `destinationDirectoryName`; `false` to avoid overwriting, and throw if any files or directories are found with existing names.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous extraction operation.

Exceptions:

- `ArgumentNullException`: `sourceFileName` or `destinationDirectoryName` is `null`.
- `DirectoryNotFoundException`: .NET 11 and earlier versions: The `destinationDirectoryName` directory does not exist.
- `FileNotFoundException`: The `sourceFileName` file path is not found.
- `UnauthorizedAccessException`: Permissions are insufficient.
- `ArgumentException`: Extracting one of the tar entries would have resulted in a file outside the specified destination directory.

-or-

`sourceFileName` or `destinationDirectoryName` is empty.
- `InvalidDataException`: .NET 11 and later versions only: An entry's checksum is invalid.
- `IOException`: An I/O exception occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ExtractToDirectory`.
