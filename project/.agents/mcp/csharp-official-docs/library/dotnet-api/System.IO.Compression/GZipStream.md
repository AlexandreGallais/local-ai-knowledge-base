---
title: "GZipStream class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/GZipStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GZipStream class

Namespace: `System.IO.Compression`

```csharp
public class GZipStream : System.IO.Stream
```

Provides methods and properties used to compress and decompress streams by using the GZip data format specification.

This class represents the gzip data format, which uses an industry-standard algorithm for lossless file compression and decompression. The format includes a cyclic redundancy check value for detecting data corruption. The gzip data format uses the same algorithm as the `DeflateStream` class, but can be extended to use other compression formats. The format can be readily implemented in a manner not covered by patents.

This class uses the zlib library for compression and decompression.

Compressed `GZipStream` objects written to a file with an extension of .gz can be decompressed using many common compression tools; however, this class does not inherently provide functionality for adding files to or extracting files from zip archives.

The compression functionality in `DeflateStream` and `GZipStream` is exposed as a stream. Data is read on a byte-by-byte basis, so it's not possible to perform multiple passes to determine the best method for compressing entire files or large blocks of data. The `DeflateStream` and `GZipStream` classes are best used on uncompressed sources of data. If the source data is already compressed, using these classes may actually increase the size of the stream.

#### Examples

The following example shows how to use the `GZipStream` class to compress and decompress a directory of files.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/GZip/FileCompressionModeExample.cs._

## GZipStream.GZipStream(Stream, CompressionLevel) constructor

```csharp
public GZipStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel);
```

Initializes a new instance of the `GZipStream` class by using the specified stream and compression level.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: The stream does not support write operations such as compression. (The `Stream.CanWrite` property on the stream object is `false`.)

#### Remarks

You use this constructor when you want to specify whether compression efficiency or speed is more important for an instance of the `GZipStream` class.

This constructor overload uses the compression mode `Compress`. To set the compression mode to another value, use the `%23ctor` or `%23ctor` overload.

## GZipStream.GZipStream(Stream, CompressionMode) constructor

```csharp
public GZipStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode);
```

Initializes a new instance of the `GZipStream` class by using the specified stream and compression mode.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: `mode` is not a valid `CompressionMode` enumeration value.

-or-

`CompressionMode` is `CompressionMode.Compress` and `Stream.CanWrite` is `false`.

-or-

`CompressionMode` is `CompressionMode.Decompress` and `Stream.CanRead` is `false`.

#### Remarks

By default, `GZipStream` owns the underlying stream, so closing the `stream` parameter also closes the underlying stream. Note that the state of the underlying stream can affect the usability of the stream. Also, no explicit checks are performed, so no additional exceptions are thrown when the new instance is created.

If an instance of the `GZipStream` class is created with the `mode` parameter equal to `Compress` and no further action occurs, the stream will appear as a valid, empty compressed file.

By default, the compression level is set to `Optimal` when the compression mode is `Compress`.

#### Examples

The following example shows how to set the compression mode when creating a `GZipStream` object.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/GZip/FileCompressionModeExample.cs._

## GZipStream.GZipStream(Stream, CompressionLevel, Boolean) constructor

```csharp
public GZipStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel, bool leaveOpen);
```

Initializes a new instance of the `GZipStream` class by using the specified stream and compression level, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.
- `leaveOpen`: `true` to leave the stream object open after disposing the `GZipStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: The stream does not support write operations such as compression. (The `Stream.CanWrite` property on the stream object is `false`.)

#### Remarks

You use this constructor when you want to specify whether compression efficiency or speed is more important for an instance of the `GZipStream` class, and whether to leave the stream object open after disposing the `GZipStream` object.

This constructor overload uses the compression mode `Compress`. To set the compression mode to another value, use the `%23ctor` or `%23ctor` overload.

#### Examples

The following example shows how to set the compression level when creating a `GZipStream` object and how to leave the stream open.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/GZip/MemoryWriteReadExample.cs._

## GZipStream.GZipStream(Stream, CompressionMode, Boolean) constructor

```csharp
public GZipStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode, bool leaveOpen);
```

Initializes a new instance of the `GZipStream` class by using the specified stream and compression mode, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.
- `leaveOpen`: `true` to leave the stream open after disposing the `GZipStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: `mode` is not a valid `CompressionMode` value.

-or-

`CompressionMode` is `CompressionMode.Compress` and `Stream.CanWrite` is `false`.

-or-

`CompressionMode` is `CompressionMode.Decompress` and `Stream.CanRead` is `false`.

#### Remarks

By default, `GZipStream` owns the underlying stream, so closing the `stream` parameter also closes the underlying stream. The state of the underlying stream can affect the usability of the stream. Also, no explicit checks are performed, so no additional exceptions are thrown when the new instance is created.

If an instance of the `GZipStream` class is created with the `mode` parameter equal to `Compress` and no further action occurs, the stream will appear as a valid, empty compressed file.

By default, the compression level is set to `Optimal` when the compression mode is `Compress`.

## GZipStream.GZipStream(Stream, ZLibCompressionOptions, Boolean) constructor

```csharp
public GZipStream (System.IO.Stream stream, System.IO.Compression.ZLibCompressionOptions compressionOptions, bool leaveOpen = false);
```

Initializes a new instance of the `GZipStream` class by using the specified stream, compression options, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionOptions`: The options for fine tuning the compression stream.
- `leaveOpen`: `true` to leave the stream object open after disposing the `GZipStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` or `compressionOptions` is `null`.

To be added.

## GZipStream.BaseStream property

```csharp
public System.IO.Stream BaseStream { get; }
```

Gets a reference to the underlying stream.

Returns: A stream object that represents the underlying stream.

Exceptions:

- `ObjectDisposedException`: The underlying stream is closed.

To be added.

## GZipStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the stream supports reading while decompressing a file.

Returns: `true` if the `CompressionMode` value is `Decompress` and the underlying stream supports reading and is not closed; otherwise, `false`.

To be added.

## GZipStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the stream supports seeking.

Returns: `false` in all cases.

To be added.

## GZipStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the stream supports writing.

Returns: `true` if the `CompressionMode` value is `Compress` and the underlying stream supports writing and is not closed; otherwise, `false`.

To be added.

## GZipStream.Length property

```csharp
public override long Length { get; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: A long value.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## GZipStream.Position property

```csharp
public override long Position { get; set; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: A long value.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## GZipStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous read operation. (Consider using the `Stream.ReadAsync` method instead.)

Parameters:

- `buffer`: The byte array to read the data into.
- `offset`: The byte offset at which to begin reading data from the stream.
- `count`: The maximum number of bytes to read.
- `asyncCallback`: An optional asynchronous callback, to be called when the read operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An object that represents the asynchronous read operation, which could still be pending.

Exceptions:

- `IOException`: The method tried to read asynchronously past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `GZipStream` implementation does not support the read operation.
- `InvalidOperationException`: A read operation cannot be performed because the stream is closed.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.ReadAsync`. For more information, see Asynchronous file I/O.

Pass the `IAsyncResult` return value to the `GZipStream.EndRead` method of the stream to determine how many bytes were read and to release operating system resources used for reading. You can do this either by using the same code that called `GZipStream.BeginRead` or in a callback passed to `GZipStream.BeginRead`.

The current position in the stream is updated when the asynchronous read or write is issued, not when the I/O operation completes.

Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanRead` property to determine whether the current `GZipStream` object supports reading.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `GZipStream.BeginRead`. Errors that occur during an asynchronous read request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `GZipStream.EndRead`.

## GZipStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `buffer`: The buffer containing data to write to the current stream.
- `offset`: The byte offset at which to begin writing.
- `count`: The maximum number of bytes to write.
- `asyncCallback`: An optional asynchronous callback to be called when the write operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that represents the asynchronous write operation, which could still be pending.

Exceptions:

- `InvalidOperationException`: The underlying stream is `null`.

-or-

The underlying stream is closed.

#### Remarks

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.WriteAsync`. For more information, see Asynchronous File I/O.

The `GZipStream.BeginWrite` method starts an asynchronous write operation to a `GZipStream` stream object.

You must create a callback method that implements the `AsyncCallback` delegate and pass its name to the `GZipStream.BeginWrite` method.

## GZipStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current GZip stream and writes them to another stream, using the specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current GZip stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero. The default size is 81920.

#### Remarks

Copying begins at the current position in the current GZip stream, and does not reset the position of the destination stream after the copy operation is complete.
