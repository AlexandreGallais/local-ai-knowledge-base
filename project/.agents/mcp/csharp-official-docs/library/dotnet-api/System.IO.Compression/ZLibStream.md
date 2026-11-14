---
title: "ZLibStream class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/ZLibStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ZLibStream class

Namespace: `System.IO.Compression`

```csharp
public sealed class ZLibStream : System.IO.Stream
```

Provides methods and properties used to compress and decompress streams by using the zlib data format specification.

To be added.

## ZLibStream.ZLibStream(Stream, CompressionLevel) constructor

```csharp
public ZLibStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel);
```

Initializes a new instance of the `ZLibStream` class by using the specified stream and compression level.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.

To be added.

## ZLibStream.ZLibStream(Stream, CompressionMode) constructor

```csharp
public ZLibStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode);
```

Initializes a new instance of the `ZLibStream` class by using the specified stream and compression mode.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.

To be added.

## ZLibStream.ZLibStream(Stream, CompressionLevel, Boolean) constructor

```csharp
public ZLibStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel, bool leaveOpen);
```

Initializes a new instance of the `ZLibStream` class by using the specified stream, compression level, and whether to leave the `stream` open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.
- `leaveOpen`: `true` to leave the stream object open after disposing the `ZLibStream` object; otherwise, `false`.

To be added.

## ZLibStream.ZLibStream(Stream, CompressionMode, Boolean) constructor

```csharp
public ZLibStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode, bool leaveOpen);
```

Initializes a new instance of the `ZLibStream` class by using the specified stream, compression mode, and whether to leave the `stream` open.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.
- `leaveOpen`: `true` to leave the stream object open after disposing the `ZLibStream` object; otherwise, `false`.

To be added.

## ZLibStream.ZLibStream(Stream, ZLibCompressionOptions, Boolean) constructor

```csharp
public ZLibStream (System.IO.Stream stream, System.IO.Compression.ZLibCompressionOptions compressionOptions, bool leaveOpen = false);
```

Initializes a new instance of the `ZLibStream` class by using the specified stream and compression options, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionOptions`: The ZLib options for fine tuning the compression stream.
- `leaveOpen`: `true` to leave the stream object open after disposing the `ZLibStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` or `compressionOptions` is `null`.

To be added.

## ZLibStream.BaseStream property

```csharp
public System.IO.Stream BaseStream { get; }
```

Gets a reference to the underlying stream.

Returns: To be added.

To be added.

## ZLibStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the stream supports reading.

Returns: `true` if the stream supports reading; `false` otherwise.

To be added.

## ZLibStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the stream supports seeking.

Returns: `true` if the stream supports seeking; `false` otherwise.

To be added.

## ZLibStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the stream supports writing.

Returns: `true` if the stream supports writing; `false` otherwise.

To be added.

## ZLibStream.Length property

```csharp
public override long Length { get; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: This property is not supported and always throws a `NotSupportedException`.

To be added.

## ZLibStream.Position property

```csharp
public override long Position { get; set; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: This property is not supported and always throws a `NotSupportedException`.

To be added.

## ZLibStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous read operation.

Parameters:

- `buffer`: The byte array to read the data into.
- `offset`: The byte offset in `buffer` at which to begin reading data from the stream.
- `count`: The maximum number of bytes to read.
- `asyncCallback`: An optional asynchronous callback, to be called when the read operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An object that represents the asynchronous read operation, which could still be pending.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`offset` and `count` were out of bounds for the array.

-or-

`count` is greater than the number of elements from `offset` to the end of `buffer`.

To be added.

## ZLibStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in `buffer` to begin writing from.
- `count`: The maximum number of bytes to write.
- `asyncCallback`: An optional asynchronous callback, to be called when the write operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that represents the asynchronous write operation, which could still be pending.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than zero.

-or-

`offset` and `count` were out of bounds for the array.

-or-

`count` is greater than the number of elements from `offset` to the end of `buffer`.

To be added.

## ZLibStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current stream and writes them to another stream, using the specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is not a positive number.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream is closed.

To be added.

## ZLibStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current stream and writes them to another stream, using a specified buffer size and cancellation token.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is not a positive number.
- `NotSupportedException`: The stream does not support reading or writing.
- `ObjectDisposedException`: The stream is closed.
- `InvalidOperationException`: Only one asynchronous reader or writer is allowed at a time.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ZLibStream.CopyTo`.

## ZLibStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases all resources used by the stream.

Parameters:

- `disposing`: Whether this method is being called from Dispose.

To be added.

## ZLibStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases all resources used by the stream.

Returns: A task that represents the completion of the disposal operation.

To be added.

## ZLibStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete.

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes that were read into the byte array.

To be added.

## ZLibStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation.

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

To be added.

## ZLibStream.Flush() method

```csharp
public override void Flush ();
```

Flushes the internal buffers.

To be added.

## ZLibStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ZLibStream.Flush`.

## ZLibStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a number of decompressed bytes into the specified byte span.

Parameters:

- `buffer`: The span to read the data into.

Returns: The number of bytes that were read into the byte span.

To be added.

## ZLibStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a number of decompressed bytes into the specified byte array.

Parameters:

- `buffer`: The byte array to read the data into.
- `offset`: The byte offset in array at which to begin reading data from the stream.
- `count`: The maximum number of bytes to read.

Returns: The number of bytes that were read into the byte array.

To be added.

## ZLibStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The byte span to read the data into.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous completion of the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## ZLibStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The byte array to read the data into.
- `offset`: The byte offset in array at which to begin reading data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous completion of the operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ZLibStream.Read`.

## ZLibStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the stream and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream.

To be added.

## ZLibStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

This method is not supported and always throws a `NotSupportedException`.

Parameters:

- `offset`: Not supported.
- `origin`: Not supported.

Returns: This method is not supported and always throws a `NotSupportedException`.

To be added.
