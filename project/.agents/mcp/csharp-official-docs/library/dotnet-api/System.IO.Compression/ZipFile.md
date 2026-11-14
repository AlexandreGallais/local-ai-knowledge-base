---
title: "ZipFile class (part 1 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class

Namespace: `System.IO.Compression`

```csharp
public static class ZipFile
```

Provides static methods for creating, extracting, and opening zip archives.

The methods for manipulating zip archives and their files are spread across three classes: `ZipFile`, `ZipArchive`, and `ZipArchiveEntry`.

| To...                                 | Use... |
|---------------------------------------|--------|
| Create a zip archive from a directory | `ZipFile.CreateFromDirectory` |
| Extract the contents of a zip archive to a directory | `ZipFile.ExtractToDirectory` |
| Add new files to an existing zip archive | `ZipArchive.CreateEntry` |
| Retrieve a file in a zip archive      | `ZipArchive.GetEntry` |
| Retrieve all of the files in a zip archive | `ZipArchive.Entries` |
| Open a stream to an individual file contained in a zip archive|`ZipArchiveEntry.Open` |
| Delete a file from a zip archive      | `ZipArchiveEntry.Delete` |

#### Examples

This example shows how to create and extract a zip archive by using the `ZipFile` class. It compresses the contents of a folder into a zip archive, and then extracts that content to a new folder.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipFile/CreateFromDirectory/program1.cs._

## ZipFile.CreateFromDirectory(String, Stream) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination);
```

Creates a zip archive in the specified stream that contains the files and directories from the specified directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.

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

The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created.
This method overload does not include the base directory in the archive and does not allow you to specify a compression level.
If you want to include the base directory or specify a compression level, call the `ZipFile.CreateFromDirectory` method overload.
If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

## ZipFile.CreateFromDirectory(String, String) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationArchiveFileName);
```

Creates a zip archive that contains the files and directories from the specified directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destinationArchiveFileName`: The path of the archive to be created, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` or `destinationArchiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.
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
The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created. This method overload does not include the base directory in the archive and does not allow you to specify a compression level. If you want to include the base directory or specify a compression level, call the `CreateFromDirectory` method overload.

If the archive already exists, an `IOException` exception is thrown. If an entry with the specified name already exists in the archive, a second entry is created with an identical name.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

#### Examples
This example shows how to create and extract a zip archive by using the `ZipFile` class. It compresses the contents of a folder into a zip archive, and then extracts that content to a new folder. To use the `ZipFile` class, you must reference the `System.IO.Compression.FileSystem` assembly in your project.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipFile/CreateFromDirectory/program1.cs._

## ZipFile.CreateFromDirectory(String, Stream, ZipFileCreationOptions) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.ZipFileCreationOptions options);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destination`: To be added.
- `options`: To be added.

To be added.

## ZipFile.CreateFromDirectory(String, String, ZipFileCreationOptions) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.ZipFileCreationOptions options);
```

To be added.

Parameters:

- `sourceDirectoryName`: To be added.
- `destinationArchiveFileName`: To be added.
- `options`: To be added.

To be added.

## ZipFile.CreateFromDirectory(String, Stream, CompressionLevel, Boolean) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, System.IO.Stream destination, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory);
```

Creates a zip archive in the specified stream that contains the files and directories from the specified directory, uses the specified compression level, and optionally includes the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destination`: The stream where the zip archive is to be stored.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.

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
Use this method overload to specify the compression level and whether to include the base directory in the archive.
If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

## ZipFile.CreateFromDirectory(String, String, CompressionLevel, Boolean) method

```csharp
public static void CreateFromDirectory (string sourceDirectoryName, string destinationArchiveFileName, System.IO.Compression.CompressionLevel compressionLevel, bool includeBaseDirectory);
```

Creates a zip archive that contains the files and directories from the specified directory, uses the specified compression level, and optionally includes the base directory.

Parameters:

- `sourceDirectoryName`: The path to the directory to be archived, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `destinationArchiveFileName`: The path of the archive to be created, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.
- `includeBaseDirectory`: `true` to include the directory name from `sourceDirectoryName` at the root of the archive; `false` to include only the contents of the directory.

Exceptions:

- `ArgumentException`: `sourceDirectoryName` or `destinationArchiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.
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
The directory structure from the file system is preserved in the archive. If the directory is empty, an empty archive is created. Use this method overload to specify the compression level and whether to include the base directory in the archive.

If the archive already exists, an `IOException` exception is thrown. If an entry with the specified name already exists in the archive, a second entry is created with an identical name.

If a file in the directory cannot be added to the archive, the archive is left incomplete and invalid, and the method throws an `IOException` exception.

#### Examples
This example shows how to create and extract a zip archive by using the `ZipFile` class. It compresses the contents of a folder into a zip archive, and then extracts that content to a new folder. When compressing the archive, the base directory is included and the compression level is set to emphasize the speed of the operation over efficiency. To use the `ZipFile` class, you must reference the `System.IO.Compression.FileSystem` assembly in your project.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipFile/CreateFromDirectory/program2.cs._
