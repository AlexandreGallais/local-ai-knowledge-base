---
title: "ZipFile class (part 11 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 11 of 11)

## ZipFile.OpenRead(String) method

```csharp
public static System.IO.Compression.ZipArchive OpenRead (string archiveFileName);
```

Opens a zip archive for reading at the specified path.

Parameters:

- `archiveFileName`: The path to the archive to open, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.

Returns: The opened zip archive.

Exceptions:

- `ArgumentException`: `archiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.
- `ArgumentNullException`: `archiveFileName` is `null`.
- `PathTooLongException`: In `archiveFileName`, the specified path, file name, or both exceed the system-defined maximum length.
- `DirectoryNotFoundException`: `archiveFileName` is invalid or does not exist (for example, it is on an unmapped drive).
- `IOException`: `archiveFileName` could not be opened.

-or-

An unspecified I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `archiveFileName` specifies a directory.

-or-

The caller does not have the required permission to access the file specified in `archiveFileName`.
- `FileNotFoundException`: The file specified in `archiveFileName` is not found.
- `NotSupportedException`: `archiveFileName` contains an invalid format.
- `InvalidDataException`: `archiveFileName` could not be interpreted as a zip archive.

This method is equivalent to calling the `ZipFile.Open` method and setting the `mode` parameter to `Read`. The archive is opened with `Open` as the file mode value. If the archive does not exist, a `FileNotFoundException` exception is thrown.

#### Examples

The following example shows how to open a zip archive for reading.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipFile.OpenReadAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchive> OpenReadAsync (string archiveFileName, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a
```csharp
ZipArchive
```
on the specified path for reading. The specified file is opened with
```csharp
FileMode.Open
```
.

Parameters:

- `archiveFileName`: A string specifying the path on the filesystem to open the archive on. The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `archiveFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.
- `ArgumentNullException`: archiveFileName is `null`.
- `PathTooLongException`: The specified archiveFileName exceeds the system-defined maximum length.

For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified archiveFileName is invalid, (for example, it is on an unmapped drive).
- `IOException`: An unspecified I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `archiveFileName` specified a directory.

-or-

The caller does not have the required permission.
- `FileNotFoundException`: The file specified in archiveFileName was not found.
- `NotSupportedException`: archiveFileName is in an invalid format.
- `InvalidDataException`: The specified file could not be interpreted as a zip file.
- `OperationCanceledException`: An asynchronous operation is cancelled.

To be added.
