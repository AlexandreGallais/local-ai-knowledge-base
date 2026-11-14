---
title: "ZipFile class (part 10 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipFile.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipFile class (part 10 of 11)

## ZipFile.Open(String, ZipArchiveMode, Encoding) method

```csharp
public static System.IO.Compression.ZipArchive Open (string archiveFileName, System.IO.Compression.ZipArchiveMode mode, System.Text.Encoding? entryNameEncoding);
```

Opens a zip archive at the specified path, in the specified mode, and by using the specified character encoding for entry names and comments.

Parameters:

- `archiveFileName`: The path to the archive to open, specified as a relative or absolute path. A relative path is interpreted as relative to the current working directory.
- `mode`: One of the enumeration values that specifies the actions that are allowed on the entries in the opened archive.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.

Returns: The opened zip archive.

Exceptions:

- `ArgumentException`: `archiveFileName` is `String.Empty`, contains only white space, or contains at least one invalid character.

-or-

`entryNameEncoding` is set to a Unicode encoding other than UTF-8.
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

When you set the `mode` parameter to `Read`, the archive is opened with `Open` as the file mode value. If the archive does not exist, a `FileNotFoundException` exception is thrown. Setting the `mode` parameter to `Read` is equivalent to calling the `ZipFile.OpenRead` method.

When you set the `mode` parameter to `Create`, the archive is opened with `CreateNew` as the file mode value. If the archive already exists, an `IOException` is thrown.

When you set the `mode` parameter to `Update`, the archive is opened with `OpenOrCreate` as the file mode value. If the archive exists, it is opened. The existing entries can be modified and new entries can be created. If the archive does not exist, a new archive is created; however, creating a zip archive in `Update` mode is not as efficient as creating it in `Create` mode.

When you open a zip archive file for reading and `entryNameEncoding` is set to `null`, entry names and comments are decoded according to the following rules:

- When the language encoding flag (in the general-purpose bit flag of the local file header) is not set, the current system default code page is used to decode the entry name and comment.
- When the language encoding flag is set, UTF-8 is used to decode the entry name and comment.

When you open a zip archive file for reading and `entryNameEncoding` is set to a value other than `null`, entry names and comments are decoded according to the following rules:

- When the language encoding flag is not set, the specified `entryNameEncoding` is used to decode the entry name and comment.
- When the language encoding flag is set, UTF-8 is used to decode the entry name and comment.

When you write to archive files and `entryNameEncoding` is set to `null`, entry names and comments are encoded according to the following rules:

- For entry names or comments that contain characters outside the ASCII range, the language encoding flag is set, and entry names and comments are encoded by using UTF-8.
- For entry names or comments that contain only ASCII characters, the language encoding flag is not set, and entry names and comments are encoded by using the current system default code page.

When you write to archive files and `entryNameEncoding` is set to a value other than `null`, the specified `entryNameEncoding` is used to encode the entry names and comments into bytes. The language encoding flag (in the general-purpose bit flag of the local file header) is set only when the specified encoding is a UTF-8 encoding.

## ZipFile.OpenAsync(String, ZipArchiveMode, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchive> OpenAsync (string archiveFileName, System.IO.Compression.ZipArchiveMode mode, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a
```csharp
ZipArchive
```
on the specified `archiveFileName` in the specified
```csharp
ZipArchiveMode
```
mode.

Parameters:

- `archiveFileName`: The path on the filesystem to open the archive on.
- `mode`: One of the enumeration values that specifies the actions that are allowed on the entries in the opened archive.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `archiveFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.
- `ArgumentNullException`: `archiveFileName` is `null`.
- `PathTooLongException`: `archiveFileName` exceeds the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: The specified `archiveFileName` is invalid, (for example, it is on an unmapped drive).
- `IOException`: An unspecified I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `archiveFileName` specified a directory.

-or-

The caller does not have the required permission.
- `ArgumentOutOfRangeException`: `mode` specified an invalid value.
- `FileNotFoundException`: The file specified in `archiveFileName` was not found.
- `NotSupportedException`: `archiveFileName` is in an invalid format.
- `InvalidDataException`: The specified file could not be interpreted as a zip file.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is missing from the archive or is corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is too large to fit into memory.
- `OperationCanceledException`: An asynchronous operation is cancelled.

For `archiveFileName`:

The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

For `mode`:

If `ZipArchiveMode.Read` is specified, the file is opened with
```csharp
System.IO.FileMode.Open
```
, and will throw a
```csharp
FileNotFoundException
```
if the file does not exist.

If `ZipArchiveMode.Create` is specified, the file is opened with
```csharp
System.IO.FileMode.CreateNew
```
, and will throw a
```csharp
System.IO.IOException
```
if the file already exists.

If `ZipArchiveMode.Update` is specified, the file is opened with
```csharp
System.IO.FileMode.OpenOrCreate
```
.

If the file exists and is a zip file, its entries will become accessible and can be modified, and new entries can be created.

If the file exists and is not a zip file, a `InvalidDataException` is thrown.

If the file exists and is empty or does not exist, a new zip file will be created.

Creating a zip file with the `ZipArchiveMode.Create` mode is more efficient when creating a new zip file.

## ZipFile.OpenAsync(String, ZipArchiveMode, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchive> OpenAsync (string archiveFileName, System.IO.Compression.ZipArchiveMode mode, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens a
```csharp
ZipArchive
```
on the specified `archiveFileName` in the specified
```csharp
ZipArchiveMode
```
mode.

Parameters:

- `archiveFileName`: The path on the filesystem to open the archive on.
- `mode`: One of the enumeration values that specifies the actions that are allowed on the entries in the opened archive.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this ZipArchive.
- `cancellationToken`: The cancellation token to monitor for cancellation requests.

Returns: To be added.

Exceptions:

- `ArgumentException`: `archiveFileName` is a zero-length string, contains only whitespace, or contains one or more invalid characters as defined by InvalidPathChars.
- `ArgumentNullException`: `archiveFileName` is `null`.
- `PathTooLongException`: `archiveFileName` exceeds the system-defined maximum length. For example, on Windows-based platforms, paths must be less than 248 characters, and file names must be less than 260 characters.
- `DirectoryNotFoundException`: `archiveFileName` is invalid, (for example, it is on an unmapped drive).
- `IOException`: An unspecified I/O error occurred while opening the file.
- `UnauthorizedAccessException`: `archiveFileName` specified a directory.

-or-

The caller does not have the required permission.
- `ArgumentOutOfRangeException`: `mode` specified an invalid value.
- `FileNotFoundException`: The file specified in `archiveFileName` was not found.
- `NotSupportedException`: `archiveFileName` is in an invalid format.
- `InvalidDataException`: The specified file could not be interpreted as a zip file.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is missing from the archive or is corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is too large to fit into memory.
- `OperationCanceledException`: An asynchronous operation is cancelled.

For `archiveFileName`:

The path is permitted to specify relative or absolute path information. Relative path information is interpreted as relative to the current working directory.

For `mode`:

If `ZipArchiveMode.Read` is specified, the file is opened with
```csharp
System.IO.FileMode.Open
```
, and will throw a
```csharp
FileNotFoundException
```
if the file does not exist.

If `ZipArchiveMode.Create` is specified, the file is opened with
```csharp
System.IO.FileMode.CreateNew
```
, and will throw a
```csharp
System.IO.IOException
```
if the file already exists.

If `ZipArchiveMode.Update` is specified, the file is opened with
```csharp
System.IO.FileMode.OpenOrCreate
```
.

If the file exists and is a zip file, its entries will become accessible and can be modified, and new entries can be created.

If the file exists and is not a zip file, a `InvalidDataException` is thrown.

If the file exists and is empty or does not exist, a new zip file will be created.

Creating a zip file with the `ZipArchiveMode.Create` mode is more efficient when creating a new zip file.

Specifying a value other than `null` for `entryNameEncoding` is discouraged. However, this might be necessary for interoperability with zip archive tools and libraries that do not correctly support UTF-8 encoding for entry names or comments.

This value is used as follows:

Reading (opening) ZIP archive files:

If `entryNameEncoding` is not specified (`== null`):
For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the current system default code page (`Encoding.Default`) to decode the entry name and comment.For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.
If `entryNameEncoding` is specified (`!= null`):
For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is not set, use the specified `entryNameEncoding` to decode the entry name and comment.For entries where the language encoding flag (EFS) in the general purpose bit flag of the local file header is set, use UTF-8 (`Encoding.UTF8`) to decode the entry name and comment.

Writing (saving) ZIP archive files:

If `entryNameEncoding` is not specified (`== null`):
For entry names and comments that contain characters outside the ASCII range, the language encoding flag (EFS) will be set in the general purpose bit flag of the local file header, and UTF-8 (`Encoding.UTF8`) will be used to encode the entry name and comment into bytes.For entry names and comments that don't contain characters outside the ASCII range, the language encoding flag (EFS) will not be set in the general purpose bit flag of the local file header, and the current system default code page (`Encoding.Default`) will be used to encode the entry names and comments into bytes.
If `entryNameEncoding` is specified (`!= null`):
The specified `entryNameEncoding` will always be used to encode the entry names and comments into bytes.The language encoding flag (EFS) in the general purpose bit flag of the local file header will be set if and only if the specified `entryNameEncoding` is a UTF-8 encoding.

Unicode encodings other than UTF-8 can't be used for the `entryNameEncoding`, otherwise an `ArgumentException` is thrown.
