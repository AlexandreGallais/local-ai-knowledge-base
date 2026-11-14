---
title: "ZipArchiveEntry class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipArchiveEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipArchiveEntry class

Namespace: `System.IO.Compression`

```csharp
public class ZipArchiveEntry
```

Represents a compressed file within a zip archive.

A zip archive contains an entry for each compressed file. The `ZipArchiveEntry` class enables you to examine the properties of an entry, and open or delete the entry. When you open an entry, you can modify the compressed file by writing to the stream for that compressed file.

The methods for manipulating zip archives and their file entries are spread across three classes: `ZipFile`, `ZipArchive`, and `ZipArchiveEntry`.

| To...                                 | Use... |
|---------------------------------------|--------|
| Create a zip archive from a directory | `ZipFile.CreateFromDirectory` |
|Extract the contents of a zip archive to a directory|`ZipFile.ExtractToDirectory`|
|Add new files to an existing zip archive|`ZipArchive.CreateEntry`|
|Retrieve a file in a zip archive|`ZipArchive.GetEntry`|
|Retrieve all of the files in a zip archive|`ZipArchive.Entries`|
|To open a stream to an individual file contained in a zip archive|`ZipArchiveEntry.Open`|
|Delete a file from a zip archive|`ZipArchiveEntry.Delete`|

The `ZipFileExtensions` class provides extension methods for `ZipArchiveEntry`, such as `ExtractToFile` and `ExtractToFile`, which enable you to decompress the contents of the entry to a file.

#### Examples

The first example shows how to create a new entry in a zip archive and write to it.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program1.cs._

The second example shows how to use the `ExtractToFile` extension method.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipArchiveEntry.Archive property

```csharp
public System.IO.Compression.ZipArchive Archive { get; }
```

Gets the zip archive that the entry belongs to.

Returns: The zip archive that the entry belongs to, or `null` if the entry has been deleted.

To be added.

## ZipArchiveEntry.Comment property

```csharp
public string Comment { get; set; }
```

Gets or sets the optional entry comment.

Returns: To be added.

#### Remarks

The comment encoding is determined by the `entryNameEncoding` parameter of the `%23ctor` constructor.

If the comment byte length is larger than `MaxValue`, it will be truncated when disposing the archive.

## ZipArchiveEntry.CompressedLength property

```csharp
public long CompressedLength { get; }
```

Gets the compressed size, expressed in bytes, of the entry in the zip archive.

Returns: The compressed size of the entry in the zip archive.

Exceptions:

- `InvalidOperationException`: The value of the property is not available because the entry has been modified.

#### Remarks
This property cannot be retrieved when the mode is set to `Create`, or the mode is set to `Update` and the entry has been opened.

#### Examples
The following example shows how to retrieve entries in a zip archive, and evaluate the properties of the entries. It uses the `Name` property to display the name of the entry, and the `ZipArchiveEntry.Length` and `ZipArchiveEntry.CompressedLength` properties to calculate how much the file was compressed.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/GetEntry/program1.cs._

## ZipArchiveEntry.CompressionMethod property

```csharp
public System.IO.Compression.ZipCompressionMethod CompressionMethod { get; }
```

To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.Crc32 property

```csharp
public uint Crc32 { get; }
```

The 32-bit Cyclic Redundant Check.

Returns: An unsigned integer (4 bytes) representing the CRC-32 field.

To be added.

## ZipArchiveEntry.EncryptionMethod property

```csharp
public System.IO.Compression.ZipEncryptionMethod EncryptionMethod { get; }
```

To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.ExternalAttributes property

```csharp
public int ExternalAttributes { get; set; }
```

OS and application specific file attributes.

Returns: The external attributes written by the application when this entry was written. It is both host OS and application dependent.

#### Remarks
The mapping of the external attributes is host-system dependent. For MS-DOS, the low order byte is the MS-DOS directory attribute byte. For Unix, the high Order byte is frequently used to store the file permissions. If input came from standard input, this field is set to zero.

## ZipArchiveEntry.FullName property

```csharp
public string FullName { get; }
```

Gets the relative path of the entry in the zip archive.

Returns: The relative path of the entry in the zip archive.

The `ZipArchiveEntry.FullName` property contains the relative path, including the subdirectory hierarchy, of an entry in a zip archive. (In contrast, the `ZipArchiveEntry.Name` property contains only the name of the entry and does not include the subdirectory hierarchy.) For example, if you create two entries in a zip archive by using the `ZipFileExtensions.CreateEntryFromFile` method and provide `NewEntry.txt` as the name for the first entry and `AddedFolder\NewEntry.txt` for the second entry, both entries will have `NewEntry.txt` in the `ZipArchiveEntry.Name` property. The first entry will also have `NewEntry.txt` in the `ZipArchiveEntry.FullName` property, but the second entry will have `AddedFolder\NewEntry.txt` in the `ZipArchiveEntry.FullName` property.

You can specify any string as the path of an entry, including strings that specify invalid and absolute paths. Therefore, the `ZipArchiveEntry.FullName` property might contain a value that is not correctly formatted. An invalid or absolute path might result in an exception when you extract the contents of the zip archive.

#### Examples

The following example shows how to iterate through the contents of a .zip file, and extract files that contain the .txt extension.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/Entries/program1.cs._

## ZipArchiveEntry.IsEncrypted property

```csharp
public bool IsEncrypted { get; }
```

Gets a value that indicates whether the entry is encrypted.

Returns: To be added.

To be added.

## ZipArchiveEntry.LastWriteTime property

```csharp
public DateTimeOffset LastWriteTime { get; set; }
```

Gets or sets the last time the entry in the zip archive was changed.

Returns: The last time the entry in the zip archive was changed.

Exceptions:

- `NotSupportedException`: The attempt to set this property failed, because the zip archive for the entry is in `ZipArchiveMode.Read` mode.
- `IOException`: The archive mode is set to `ZipArchiveMode.Create`.

-or-

The archive mode is set to `ZipArchiveMode.Update` and the entry has been opened.
- `ArgumentOutOfRangeException`: An attempt was made to set this property to a value that is either earlier than 1980 January 1 0:00:00 (midnight) or later than 2107 December 31 23:59:58 (two seconds before midnight).

When you create a new entry from an existing file by calling the `ZipFileExtensions.CreateEntryFromFile` method, the `ZipArchiveEntry.LastWriteTime` property for the entry is automatically set to the last time the file was modified. When you create a new entry programmatically by calling the `ZipArchive.CreateEntry` method, the `ZipArchiveEntry.LastWriteTime` property for the entry is automatically set to the time of execution. If you modify the entry, you must explicitly set the `ZipArchiveEntry.LastWriteTime` property if you want the value to reflect the time of the latest change.

When you set this property, the `DateTimeOffset` value is converted to a timestamp format that is specific to zip archives. This format supports a resolution of two seconds. The earliest permitted value is 1980 January 1 0:00:00 (midnight). The latest permitted value is 2107 December 31 23:59:58 (one second before midnight). If the value for the last write time is not valid, the property returns a default value of 1980 January 1 0:00:00 (midnight).

#### Examples

The following example shows how to open an entry in a zip archive, modify it, and set the `ZipArchiveEntry.LastWriteTime` property to the current time.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/GetEntry/program2.cs._

## ZipArchiveEntry.Length property

```csharp
public long Length { get; }
```

Gets the uncompressed size, expressed in bytes, of the entry in the zip archive.

Returns: The uncompressed size of the entry in the zip archive.

Exceptions:

- `InvalidOperationException`: The value of the property is not available because the entry has been modified.

#### Remarks
This property cannot be retrieved when the mode is set to `Create`, or the mode is set to `Update` and the entry has been opened.

#### Examples
The following example shows how to retrieve entries from a zip archive, and evaluate the properties of the entries. It uses the `Name` property to display the name of the entry, and the `ZipArchiveEntry.Length` and `ZipArchiveEntry.CompressedLength` properties to calculate how much the file was compressed.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/GetEntry/program1.cs._

## ZipArchiveEntry.Name property

```csharp
public string Name { get; }
```

Gets the file name of the entry in the zip archive.

Returns: The file name of the entry in the zip archive.

The `ZipArchiveEntry.Name` property contains the portion of the `ZipArchiveEntry.FullName` property that follows the final directory separator character (\\), and does not include the subdirectory hierarchy. For example, if you create two entries in a zip archive by using the `ZipFileExtensions.CreateEntryFromFile` method and provide `NewEntry.txt` as the name for the first entry and `AddedFolder\NewEntry.txt` for the second entry, both entries will have `NewEntry.txt` in the `ZipArchiveEntry.Name` property. The first entry will also have `NewEntry.txt` in the `ZipArchiveEntry.FullName` property, but the second entry will have `AddedFolder\NewEntry.txt` in the `ZipArchiveEntry.FullName` property.

On Windows, colons (`:`) are also treated as separators due to NTFS rules, which can cause `ZipArchiveEntry.Name` to differ across platforms. For platform-independent behavior, you can use `ZipArchiveEntry.FullName`, which always reflects the complete entry name as stored in the archive.

#### Examples

The following example shows how to retrieve entries from a zip archive and evaluate the properties of the entries. It uses the `ZipArchiveEntry.Name` property to display the name of the entry, and the `ZipArchiveEntry.Length` and `ZipArchiveEntry.CompressedLength` properties to calculate how much the file was compressed.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/GetEntry/program1.cs._

## ZipArchiveEntry.VersionMadeBy property

```csharp
public ushort VersionMadeBy { get; }
```

To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.Delete() method

```csharp
public void Delete ();
```

Deletes the entry from the zip archive.

Exceptions:

- `IOException`: The entry is already open for reading or writing.
- `NotSupportedException`: The zip archive for this entry was opened in a mode other than `ZipArchiveMode.Update`.
- `ObjectDisposedException`: The zip archive for this entry has been disposed.

To be added.

## ZipArchiveEntry.Open() method

```csharp
public System.IO.Stream Open ();
```

Opens the entry from the zip archive.

Returns: The stream that represents the contents of the entry.

Exceptions:

- `IOException`: The entry is already currently open for writing.

-or-

The entry has been deleted from the archive.

-or-

The archive for this entry was opened with the `ZipArchiveMode.Create` mode, and this entry has already been written to.
- `InvalidDataException`: The entry is either missing from the archive or is corrupt and cannot be read.

-or-

The entry has been compressed by using a compression method that is not supported.
- `ObjectDisposedException`: The zip archive for this entry has been disposed.

#### Remarks
You use this method to access the stream for an entry in a zip archive. After retrieving the stream, you can read from or write to the stream. When you write to the stream, the modifications you make to the entry will appear in the zip archive.

#### Examples
The following example shows how to create a new entry, open it with the `ZipArchiveEntry.Open` method, and write to the stream.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program1.cs._

## ZipArchiveEntry.Open(FileAccess) method

```csharp
public System.IO.Stream Open (System.IO.FileAccess access);
```

To be added.

Parameters:

- `access`: To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.Open(Char>) method

```csharp
public System.IO.Stream Open (ReadOnlySpan<char> password);
```

To be added.

Parameters:

- `password`: To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.Open(FileAccess, Char>) method

```csharp
public System.IO.Stream Open (System.IO.FileAccess access, ReadOnlySpan<char> password);
```

To be added.

Parameters:

- `access`: To be added.
- `password`: To be added.

Returns: To be added.

To be added.

## ZipArchiveEntry.OpenAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously opens the entry.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A Stream that represents the contents of the entry.

Exceptions:

- `IOException`: The entry is already currently open for writing.

-or-

The entry has been deleted from the archive.

-or-

The archive that this entry belongs to was opened in `ZipArchiveMode.Create` mode, and this entry has already been written to once.
- `InvalidDataException`: The entry is missing from the archive or is corrupt and cannot be read.

-or-

The entry has been compressed using a compression method that isn't supported.
- `ObjectDisposedException`: The ZipArchive that this entry belongs to has been disposed.

If the archive that the entry belongs to was opened in Read mode, the returned stream will be readable, and it might or might not be seekable. If opened in Create mode, the returned stream will be writable and not seekable. If opened in Update mode, the returned stream will be readable, writable, and seekable, and support SetLength.

## ZipArchiveEntry.OpenAsync(FileAccess, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.IO.Stream> OpenAsync (System.IO.FileAccess access, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `access`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
