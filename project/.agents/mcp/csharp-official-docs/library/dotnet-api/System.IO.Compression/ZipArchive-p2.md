---
title: "ZipArchive class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZipArchive.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZipArchive class (part 2 of 2)

## ZipArchive.CreateAsync(Stream, ZipArchiveMode, Boolean, Encoding, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.IO.Compression.ZipArchive> CreateAsync (System.IO.Stream stream, System.IO.Compression.ZipArchiveMode mode, bool leaveOpen, System.Text.Encoding? entryNameEncoding, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously initializes and returns a new instance of `ZipArchive` on the given stream in the specified mode, specifying whether to leave the stream open, with an optional encoding and an optional cancellation token.

Parameters:

- `stream`: The input or output stream.
- `mode`: One of the enumeration values that specifies whether the stream supports reading, writing, and seeking.
- `leaveOpen`: `true` to leave the stream open upon disposing the ZipArchive, otherwise `false`.
- `entryNameEncoding`: The encoding to use when reading or writing entry names and comments in this ZipArchive.
- `cancellationToken`: The optional cancellation token to monitor.

Returns: To be added.

Exceptions:

- `ArgumentException`: The stream is already closed.

-or-

`mode` is incompatible with the capabilities of the stream.
- `ArgumentNullException`: The stream is `null`.
- `ArgumentOutOfRangeException`: `mode` specified an invalid value.
- `InvalidDataException`: The contents of the stream could not be interpreted as a ZIP file.

-or-

`mode` is Update and an entry is missing from the archive or is corrupt and cannot be read.

-or-

In .NET 11 and later, `mode` is Read and an archive entry is malformed.

-or-

`mode` is Update and an entry is too large to fit into memory.
- `ArgumentException`: A Unicode encoding other than UTF-8 was specified for `entryNameEncoding`.

Specifying a value for `entryNameEncoding` other than `null` is discouraged. However, this might be necessary for interoperability with ZIP archive tools and libraries that don't correctly support UTF-8 encoding for entry names.

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

In .NET 11 and later, when `mode` is `ZipArchiveMode.Read`, this method reads the archive's central directory and loads its entries asynchronously before it completes. Errors caused by malformed entries are reported by this method; accessing the `ZipArchive.Entries` property afterward doesn't read from the stream.

## ZipArchive.CreateEntry(String) method

```csharp
public System.IO.Compression.ZipArchiveEntry CreateEntry (string entryName);
```

Creates an empty entry that has the specified path and entry name in the zip archive.

Parameters:

- `entryName`: A path, relative to the root of the archive, that specifies the name of the entry to be created.

Returns: An empty entry in the zip archive.

Exceptions:

- `ArgumentException`: `entryName` is `String.Empty`.
- `ArgumentNullException`: `entryName` is `null`.
- `NotSupportedException`: The zip archive does not support writing.
- `ObjectDisposedException`: The zip archive has been disposed.

#### Remarks
The `entryName` string should reflect the relative path of the entry you want to create within the zip archive. There is no restriction on the string you provide. However, if it is not formatted as a relative path, the entry is created, but you may get an exception when you extract the contents of the zip archive. If an entry with the specified path and name already exists in the archive, a second entry is created with the same path and name.

The value of the `LastWriteTime` property for the new entry is set to the current time. The entry is compressed using the default compression level of the underlying compression algorithm. If you want to specify a different compression level, use the `ZipArchive.CreateEntry` method.

#### Examples
The following example shows how to create an entry and write to it by using a stream.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program1.cs._

## ZipArchive.CreateEntry(String, CompressionLevel) method

```csharp
public System.IO.Compression.ZipArchiveEntry CreateEntry (string entryName, System.IO.Compression.CompressionLevel compressionLevel);
```

Creates an empty entry that has the specified entry name and compression level in the zip archive.

Parameters:

- `entryName`: A path, relative to the root of the archive, that specifies the name of the entry to be created.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression effectiveness when creating the entry.

Returns: An empty entry in the zip archive.

Exceptions:

- `ArgumentException`: `entryName` is `String.Empty`.
- `ArgumentNullException`: `entryName` is `null`.
- `NotSupportedException`: The zip archive does not support writing.
- `ObjectDisposedException`: The zip archive has been disposed.

#### Remarks
The `entryName` string should reflect the relative path of the entry you want to create within the zip archive. There is no restriction on the string you provide. However, if it is not formatted as a relative path, the entry is created, but you may get an exception when you extract the contents of the zip archive. If an entry with the specified name already exists in the archive, a second entry is created with the same name.

The value of the `LastWriteTime` property for the new entry is set to the current time. Set the `compressionLevel` parameter to `Optimal` if you want the file to be compressed as much as possible. Set the `compressionLevel` parameter to `Fastest` only if you are concerned that the compression operation will not complete quickly enough for your scenario.

#### Examples
The following example shows how to create an entry with the optimal compression level. It also writes to the new entry by using a stream.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/CreateEntry/program2.cs._

## ZipArchive.CreateEntry(String, Char>, ZipEncryptionMethod) method

```csharp
public System.IO.Compression.ZipArchiveEntry CreateEntry (string entryName, ReadOnlySpan<char> password, System.IO.Compression.ZipEncryptionMethod encryptionMethod);
```

To be added.

Parameters:

- `entryName`: To be added.
- `password`: To be added.
- `encryptionMethod`: To be added.

Returns: To be added.

To be added.

## ZipArchive.CreateEntry(String, CompressionLevel, Char>, ZipEncryptionMethod) method

```csharp
public System.IO.Compression.ZipArchiveEntry CreateEntry (string entryName, System.IO.Compression.CompressionLevel compressionLevel, ReadOnlySpan<char> password, System.IO.Compression.ZipEncryptionMethod encryptionMethod);
```

To be added.

Parameters:

- `entryName`: To be added.
- `compressionLevel`: To be added.
- `password`: To be added.
- `encryptionMethod`: To be added.

Returns: To be added.

To be added.

## ZipArchive.Dispose() method

```csharp
public void Dispose ();
```

Releases the resources used by the current instance of the `ZipArchive` class.

#### Remarks
This method finishes writing the archive and releases all resources used by the `ZipArchive` object. Unless you construct the object by using the `%23ctor` constructor overload and set its `leaveOpen` parameter to `true`, all underlying streams are closed and no longer available for subsequent write operations.

When you are finished using this instance of `ZipArchive`, call `Dispose` to release all resources used by this instance. You should eliminate further references to this `ZipArchive` instance so that the garbage collector can reclaim the memory of the instance instead of keeping it alive for finalization.

`Dispose` calls the `Dispose` method, which contains the code to release managed and unmanaged resources. For more information, see Implementing a Dispose method.

## ZipArchive.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Called by the `ZipArchive.Dispose` and `Object.Finalize` methods to release the unmanaged resources used by the current instance of the `ZipArchive` class, and optionally finishes writing the archive and releases the managed resources.

Parameters:

- `disposing`: `true` to finish writing the archive and release unmanaged and managed resources; `false` to release only unmanaged resources.

#### Remarks
If `disposing` is set to `true`, all underlying streams are closed and no longer available for subsequent write operations, unless you construct the object by using the `%23ctor` constructor overload and set its `leaveOpen` parameter to `true`.

This method is called only by the public `Dispose` and `Finalize` methods; do not call this method directly.

When you implement the dispose pattern, the Boolean parameter of the `Dispose` method should be used as follows:

- The `Dispose` method of the current object should call `Dispose` with the Boolean parameter set to `true` to release both managed and unmanaged resources.

- The `Finalize` method of the current object should call `Dispose` with the Boolean parameter set to `false` to release only unmanaged resources.

For more information, see Implementing a Dispose method.

## ZipArchive.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

To be added.

Returns: To be added.

To be added.

## ZipArchive.DisposeAsyncCore() method

```csharp
protected virtual System.Threading.Tasks.ValueTask DisposeAsyncCore ();
```

To be added.

Returns: To be added.

To be added.

## ZipArchive.GetEntry(String) method

```csharp
public System.IO.Compression.ZipArchiveEntry? GetEntry (string entryName);
```

Retrieves a wrapper for the specified entry in the zip archive.

Parameters:

- `entryName`: A path, relative to the root of the archive, that identifies the entry to retrieve.

Returns: A wrapper for the specified entry in the archive; `null` if the entry does not exist in the archive.

Exceptions:

- `ArgumentException`: `entryName` is `String.Empty`.
- `ArgumentNullException`: `entryName` is `null`.
- `NotSupportedException`: The zip archive does not support reading.
- `ObjectDisposedException`: The zip archive has been disposed.
- `InvalidDataException`: The zip archive is corrupt, and its entries cannot be retrieved.

#### Remarks
If multiple entries that have the specified name exist in the archive, the first one is returned. The name of the entry is compared to `entryName` using ordinal comparison.

#### Examples
The following example shows how to use the `ZipArchive.GetEntry` method to retrieve an entry.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/ZipArchive/GetEntry/program2.cs._
