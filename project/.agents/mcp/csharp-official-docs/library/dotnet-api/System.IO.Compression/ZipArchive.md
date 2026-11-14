---
title: "ZipArchive class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipArchive.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipArchive class

Namespace: `System.IO.Compression`

```csharp
public class ZipArchive : IAsyncDisposable, IDisposable
```

Represents a package of compressed files in the zip archive format.

The methods for manipulating zip archives and their file entries are spread across three classes: `ZipFile`, `ZipArchive`, and `ZipArchiveEntry`.

|To|Use|
|--------|--------|
|Create a zip archive from a directory|`ZipFile.CreateFromDirectory`|
|Extract the contents of a zip archive to a directory|`ZipFile.ExtractToDirectory`|
|Add new files to an existing zip archive|`ZipArchive.CreateEntry`|
|Retrieve a file from a zip archive|`ZipArchive.GetEntry`|
|Retrieve all the files from a zip archive|`ZipArchive.Entries`|
|Open a stream to a single file contained in a zip archive|`ZipArchiveEntry.Open`|
|Delete a file from a zip archive|`ZipArchiveEntry.Delete`|

When you create a new entry, the file is compressed and added to the zip package. The `ZipArchive.CreateEntry` method enables you to specify a directory hierarchy when adding the entry. You include the relative path of the new entry within the zip package. For example, creating a new entry with a relative path of `AddedFolder\NewFile.txt` creates a compressed text file in a directory named AddedFolder.

The `ZipFileExtensions` class provides four extension methods for the `ZipArchive` type: `CreateEntryFromFile`, `CreateEntryFromFile`, `ExtractToDirectory`, and `ExtractToDirectory`. These extension methods enable you to compress and decompress the contents of the entry to a file.

#### Examples

The first example shows how to create a new entry and write to it by using a stream.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program1.cs._

The following example shows how to open a zip archive and iterate through the collection of entries.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

The third example shows how to use extension methods to create a new entry in a zip archive from an existing file and extract the archive contents.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program3.cs._

## ZipArchive.ZipArchive(Stream) constructor

```csharp
public ZipArchive (System.IO.Stream stream);
```

Initializes a new instance of the `ZipArchive` class from the specified stream.

Parameters:

- `stream`: The stream that contains the archive to be read.

Exceptions:

- `ArgumentException`: The stream is already closed or does not support reading.
- `ArgumentNullException`: `stream` is `null`.
- `InvalidDataException`: The contents of the stream are not in the zip archive format.

To be added.

## ZipArchive.ZipArchive(Stream, ZipArchiveMode) constructor

```csharp
public ZipArchive (System.IO.Stream stream, System.IO.Compression.ZipArchiveMode mode);
```

Initializes a new instance of the `ZipArchive` class from the specified stream and with the specified mode.

Parameters:

- `stream`: The input or output stream.
- `mode`: One of the enumeration values that indicates whether the zip archive is used to read, create, or update entries.

Exceptions:

- `ArgumentException`: The stream is already closed, or the capabilities of the stream do not match the mode.
- `ArgumentNullException`: `stream` is `null`.
- `ArgumentOutOfRangeException`: `mode` is an invalid value.
- `InvalidDataException`: The contents of the stream could not be interpreted as a zip archive.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is missing from the archive or is corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is too large to fit into memory.

#### Remarks
If the `mode` parameter is set to `Read`, the stream must support reading. If the `mode` parameter is set to `Create`, the stream must support writing. If the `mode` parameter is set to `Update`, the stream must support reading, writing, and seeking.

## ZipArchive.ZipArchive(Stream, ZipArchiveMode, Boolean) constructor

```csharp
public ZipArchive (System.IO.Stream stream, System.IO.Compression.ZipArchiveMode mode, bool leaveOpen);
```

Initializes a new instance of the `ZipArchive` class on the specified stream for the specified mode, and optionally leaves the stream open.

Parameters:

- `stream`: The input or output stream.
- `mode`: One of the enumeration values that indicates whether the zip archive is used to read, create, or update entries.
- `leaveOpen`: `true` to leave the stream open after the `ZipArchive` object is disposed; otherwise, `false`.

Exceptions:

- `ArgumentException`: The stream is already closed, or the capabilities of the stream do not match the mode.
- `ArgumentNullException`: `stream` is `null`.
- `ArgumentOutOfRangeException`: `mode` is an invalid value.
- `InvalidDataException`: The contents of the stream could not be interpreted as a zip archive.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is missing from the archive or is corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is too large to fit into memory.

#### Remarks
If the `mode` parameter is set to `Read`, the stream must support reading. If the `mode` parameter is set to `Create`, the stream must support writing. If the `mode` parameter is set to `Update`, the stream must support reading, writing, and seeking.

## ZipArchive.ZipArchive(Stream, ZipArchiveMode, Boolean, Encoding) constructor

```csharp
public ZipArchive (System.IO.Stream stream, System.IO.Compression.ZipArchiveMode mode, bool leaveOpen, System.Text.Encoding? entryNameEncoding);
```

Initializes a new instance of the `ZipArchive` class on the specified stream for the specified mode, uses the specified encoding for entry names, and optionally leaves the stream open.

Parameters:

- `stream`: The input or output stream.
- `mode`: One of the enumeration values that indicates whether the zip archive is used to read, create, or update entries.
- `leaveOpen`: `true` to leave the stream open after the `ZipArchive` object is disposed; otherwise, `false`.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this archive. Specify a value for this parameter only when an encoding is required for interoperability with zip archive tools and libraries that do not support UTF-8 encoding for entry names or comments.

Exceptions:

- `ArgumentException`: The stream is already closed, or the capabilities of the stream do not match the mode.

-or-

An encoding other than UTF-8 is specified for the `entryNameEncoding`.
- `ArgumentNullException`: `stream` is `null`.
- `ArgumentOutOfRangeException`: `mode` is an invalid value.
- `InvalidDataException`: The contents of the stream could not be interpreted as a zip archive.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is missing from the archive or is corrupt and cannot be read.

-or-

`mode` is `ZipArchiveMode.Update` and an entry is too large to fit into memory.

If the `mode` parameter is set to `Read`, the stream must support reading. If the `mode` parameter is set to `Create`, the stream must support writing. If the `mode` parameter is set to `Update`, the stream must support reading, writing, and seeking.

When you open a zip archive file for reading and `entryNameEncoding` is set to `null`, entry names and comments are decoded according to the following rules:

- When the language encoding flag (in the general-purpose bit flag of the local file header) is not set, the current system default code page is used to decode the entry name and comment.
- When the language encoding flag is set, UTF-8 is used to decode the entry name and comment.

When you open a zip archive file for reading and `entryNameEncoding` is set to a value other than `null`, entry names and comments are decoded according to the following rules:

- When the language encoding flag is not set, the specified `entryNameEncoding` is used to decode the entry name and comment.
- When the language encoding flag is set, UTF-8 is used to decode the entry name and comment.

When you write to archive files and `entryNameEncoding` is set to `null`, entry names and comments are encoded according to the following rules:

- For entry names and comments that contain characters outside the ASCII range, the language encoding flag is set, and entry names and comments are encoded by using UTF-8.
- For entry names and comments that contain only ASCII characters, the language encoding flag is not set, and entry names and comments are encoded by using the current system default code page.

When you write to archive files and `entryNameEncoding` is set to a value other than `null`, the specified `entryNameEncoding` is used to encode the entry names and comments into bytes. The language encoding flag (in the general-purpose bit flag of the local file header) is set only when the specified encoding is a UTF-8 encoding.

## ZipArchive.Comment property

```csharp
public string Comment { get; set; }
```

Gets or sets the optional archive comment.

Returns: To be added.

#### Remarks

The comment encoding is determined by the `entryNameEncoding` parameter of the `%23ctor` constructor.

If the comment byte length is larger than `MaxValue`, it will be truncated when disposing the archive.

## ZipArchive.Entries property

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<System.IO.Compression.ZipArchiveEntry> Entries { get; }
```

Gets the collection of entries that are currently in the zip archive.

Returns: The collection of entries that are currently in the zip archive.

Exceptions:

- `NotSupportedException`: The zip archive does not support reading.
- `ObjectDisposedException`: The zip archive has been disposed.
- `InvalidDataException`: The zip archive is corrupt, and its entries cannot be retrieved.

#### Remarks
Use the `Entries` property to retrieve the entire collection of entries. Use the `ZipArchive.GetEntry` method to retrieve a single entry by name.

#### Examples
The following example shows how to open a zip archive and iterate through the collection of entries.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipArchive.Mode property

```csharp
public System.IO.Compression.ZipArchiveMode Mode { get; }
```

Gets a value that describes the type of action the zip archive can perform on entries.

Returns: One of the enumeration values that describes the type of action (read, create, or update) the zip archive can perform on entries.

#### Remarks
You specify a value for the `ZipArchive` property when you create an instance of the `ZipArchive` class. Use the `%23ctor` or `%23ctor` constructor to provide a value for the `Mode` property.
