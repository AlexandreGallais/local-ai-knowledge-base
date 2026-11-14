---
title: "TarFile class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarFile class

Namespace: `System.Formats.Tar`

```csharp
public static class TarFile
```

Provides static methods for creating and extracting tar archives.

To be added.

## TarFile.CreateFromDirectory(String, Stream, Boolean) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory);
```

Creates a tar stream that contains all the filesystem entries from the specified directory.

Parameters:

- `sourceDirectoryName`: The path of the directory to archive.
- `destination`: The destination stream for the archive.
- `includeBaseDirectory`: `true` to include the base directory name as the first segment in all the names of the archive entries. `false` to exclude the base directory name from the archive entry names.

Exceptions:

- `ArgumentNullException`: `sourceDirectoryName` or `destination` is `null`.
- `ArgumentException`: `sourceDirectoryName` is empty.

-or-

`destination` does not support writing.
- `DirectoryNotFoundException`: The `sourceDirectoryName` directory path is not found.
- `IOException`: An I/O exception occurred.

To be added.

## TarFile.CreateFromDirectory(String, String, Boolean) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory);
```

Creates a tar file that contains all the filesystem entries from the specified directory.

Parameters:

- `sourceDirectoryName`: The path of the directory to archive.
- `destinationFileName`: The path of the destination archive file.
- `includeBaseDirectory`: `true` to include the base directory name as the first path segment in all the names of the archive entries. `false` to exclude the base directory name from the entry name paths.

Exceptions:

- `ArgumentNullException`: `sourceDirectoryName` or `destinationFileName` is `null`.
- `ArgumentException`: `sourceDirectoryName` or `destinationFileName` is empty.
- `DirectoryNotFoundException`: The `sourceDirectoryName` directory path is not found.
- `IOException`: An I/O exception occurred.

To be added.

## TarFile.CreateFromDirectory(String, Stream, Boolean, TarEntryFormat) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory, System.Formats.Tar.TarEntryFormat format);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `includeBaseDirectory`: To be added.
- `format`: To be added.

To be added.

## TarFile.CreateFromDirectory(String, Stream, Boolean, TarWriterOptions) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory, System.Formats.Tar.TarWriterOptions options);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `includeBaseDirectory`: To be added.
- `options`: To be added.

To be added.

## TarFile.CreateFromDirectory(String, String, Boolean, TarEntryFormat) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory, System.Formats.Tar.TarEntryFormat format);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationFileName`: To be added.
- `includeBaseDirectory`: To be added.
- `format`: To be added.

To be added.

## TarFile.CreateFromDirectory(String, String, Boolean, TarWriterOptions) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory, System.Formats.Tar.TarWriterOptions options);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationFileName`: To be added.
- `includeBaseDirectory`: To be added.
- `options`: To be added.

To be added.

## TarFile.CreateFromDirectoryAsync(String, Stream, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a tar stream that contains all the filesystem entries from the specified directory.

Parameters:

- `sourceDirectoryName`: The path of the directory to archive.
- `destination`: The destination stream of the archive.
- `includeBaseDirectory`: `true` to include the base directory name as the first path segment in all the names of the archive entries. `false` to exclude the base directory name from the entry name paths.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous creation operation.

Exceptions:

- `ArgumentNullException`: `sourceDirectoryName` or `destination` is `null`.
- `ArgumentException`: `sourceDirectoryName` is empty.

-or-

`destination` does not support writing.
- `DirectoryNotFoundException`: The `sourceDirectoryName` directory path is not found.
- `IOException`: An I/O exception occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarFile.CreateFromDirectory`.

## TarFile.CreateFromDirectoryAsync(String, String, Boolean, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously creates a tar archive from the contents of the specified directory, and outputs them into the specified path. Can optionally include the base directory as the prefix for the entry names.

Parameters:

- `sourceDirectoryName`: The path of the directory to archive.
- `destinationFileName`: The path of the destination archive file.
- `includeBaseDirectory`: `true` to include the base directory name as the first path segment in all the names of the archive entries. `false` to exclude the base directory name from the entry name paths.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous creation operation.

Exceptions:

- `ArgumentNullException`: `sourceDirectoryName` or `destinationFileName` is `null`.
- `ArgumentException`: `sourceDirectoryName` or `destinationFileName` is empty.
- `DirectoryNotFoundException`: The `sourceDirectoryName` directory path is not found.
- `IOException`: An I/O exception occurred.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `TarFile.CreateFromDirectory`.

## TarFile.CreateFromDirectoryAsync(String, Stream, Boolean, TarEntryFormat, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory, System.Formats.Tar.TarEntryFormat format, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `includeBaseDirectory`: To be added.
- `format`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TarFile.CreateFromDirectoryAsync(String, Stream, Boolean, TarWriterOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, System.IO.Stream destination, bool includeBaseDirectory, System.Formats.Tar.TarWriterOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `includeBaseDirectory`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TarFile.CreateFromDirectoryAsync(String, String, Boolean, TarEntryFormat, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory, System.Formats.Tar.TarEntryFormat format, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationFileName`: To be added.
- `includeBaseDirectory`: To be added.
- `format`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TarFile.CreateFromDirectoryAsync(String, String, Boolean, TarWriterOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task CreateFromDirectoryAsync (string sourceDirectoryName, string destinationFileName, bool includeBaseDirectory, System.Formats.Tar.TarWriterOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationFileName`: To be added.
- `includeBaseDirectory`: To be added.
- `options`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## TarFile.ExtractToDirectory(Stream, String, Boolean) method

```csharp
public static void ExtractToDirectory (System.IO.Stream source, string destinationDirectoryName, bool overwriteFiles);
```

Extracts the contents of a stream that represents a tar archive into the specified directory.

Parameters:

- `source`: The stream containing the tar archive.
- `destinationDirectoryName`: The path of the destination directory where the filesystem entries should be extracted. In .NET 11 and earlier versions, the directory must already exist. In .NET 12 and later versions, missing destination and parent directories are created as needed when entries are extracted. An empty archive does not create any directories.
- `overwriteFiles`: `true` to overwrite files and directories in `destinationDirectoryName`; `false` to avoid overwriting, and throw if any files or directories are found with existing names.

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

In .NET 11 and earlier versions, the directory specified by `destinationDirectoryName` must already exist. If it doesn't exist, this method throws an `DirectoryNotFoundException`, even if the archive is empty.

In .NET 12 and later versions, the destination directory can already exist. Missing destination and parent directories are created as needed when entries are extracted. An empty archive doesn't create any directories.

If a symbolic link or junction in the tar archive results in a file being extracted outside the specified `destinationDirectoryName`, an `IOException` is thrown to ensure extraction remains within the same directory.

If `destinationDirectoryName` or any of its parent directories is a pre-existing junction or symbolic link, the link is followed and the extraction writes to the final target folder.

Files of type `BlockDevice`, `CharacterDevice`, or `Fifo` can only be extracted in Unix platforms.

Elevation is required to extract a `BlockDevice` or `CharacterDevice` to disk.

## TarFile.ExtractToDirectory(Stream, String, TarExtractOptions) method

```csharp
public static void ExtractToDirectory (System.IO.Stream source, string destinationDirectoryName, System.Formats.Tar.TarExtractOptions options);
```

To be added.

Parameters:

- `source`: To be added.
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

The `source` stream is left open after extraction.
