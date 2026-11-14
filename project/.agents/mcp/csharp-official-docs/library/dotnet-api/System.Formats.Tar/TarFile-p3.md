---
title: "TarFile class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Formats.Tar/TarFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TarFile class (part 3 of 3)

## TarFile.ExtractToDirectoryAsync(String, String, TarExtractOptions, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task ExtractToDirectoryAsync (string sourceFileName, string destinationDirectoryName, System.Formats.Tar.TarExtractOptions options, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `sourceFileName`: To be added.
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

Exceptions that occur during asynchronous extraction are stored in the returned task and are thrown when the task is awaited.
