---
title: "BrotliStream class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/BrotliStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BrotliStream class

Namespace: `System.IO.Compression`

```csharp
public sealed class BrotliStream : System.IO.Stream
```

Provides methods and properties used to compress and decompress streams by using the Brotli data format specification.

To be added.

## BrotliStream.BrotliStream(Stream, CompressionLevel) constructor

```csharp
public BrotliStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel);
```

Initializes a new instance of the `BrotliStream` class by using the specified stream and compression level.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: `compressionLevel` is not defined in the `CompressionLevel` enumeration.

To be added.

## BrotliStream.BrotliStream(Stream, CompressionMode) constructor

```csharp
public BrotliStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode);
```

Initializes a new instance of the `BrotliStream` class by using the specified stream and compression mode.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.

To be added.

## BrotliStream.BrotliStream(Stream, BrotliCompressionOptions, Boolean) constructor

```csharp
public BrotliStream (System.IO.Stream stream, System.IO.Compression.BrotliCompressionOptions compressionOptions, bool leaveOpen = false);
```

Initializes a new instance of the `BrotliStream` class by using the specified stream and compression options, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionOptions`: The Brotli options for fine tuning the compression stream.
- `leaveOpen`: `true` to leave the stream open after disposing the `BrotliStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` or `compressionOptions` is `null`.

To be added.

## BrotliStream.BrotliStream(Stream, CompressionLevel, Boolean) constructor

```csharp
public BrotliStream (System.IO.Stream stream, System.IO.Compression.CompressionLevel compressionLevel, bool leaveOpen);
```

Initializes a new instance of the `BrotliStream` class by using the specified stream and compression level, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written.
- `compressionLevel`: One of the enumeration values that indicates whether to emphasize speed or compression efficiency when compressing data to the stream.
- `leaveOpen`: `true` to leave the stream open after disposing the `BrotliStream` object; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ArgumentException`: `compressionLevel` is not defined in the `CompressionLevel` enumeration.

To be added.

## BrotliStream.BrotliStream(Stream, CompressionMode, Boolean) constructor

```csharp
public BrotliStream (System.IO.Stream stream, System.IO.Compression.CompressionMode mode, bool leaveOpen);
```

Initializes a new instance of the `BrotliStream` class by using the specified stream and compression mode, and optionally leaves the stream open.

Parameters:

- `stream`: The stream to which compressed data is written or from which data to decompress is read.
- `mode`: One of the enumeration values that indicates whether to compress data to the stream or decompress data from the stream.
- `leaveOpen`: `true` to leave the stream open after the `BrotliStream` object is disposed; otherwise, `false`.

To be added.

## BrotliStream.BaseStream property

```csharp
public System.IO.Stream BaseStream { get; }
```

Gets a reference to the underlying stream.

Returns: A stream object that represents the underlying stream.

Exceptions:

- `ObjectDisposedException`: The underlying stream is closed.

To be added.

## BrotliStream.CanRead property

```csharp
public override bool CanRead { get; }
```

Gets a value indicating whether the stream supports reading while decompressing a file.

Returns: `true` if the `CompressionMode` value is `Decompress,` and the underlying stream supports reading and is not closed; otherwise, `false`.

To be added.

## BrotliStream.CanSeek property

```csharp
public override bool CanSeek { get; }
```

Gets a value indicating whether the stream supports seeking.

Returns: `false` in all cases.

To be added.

## BrotliStream.CanWrite property

```csharp
public override bool CanWrite { get; }
```

Gets a value indicating whether the stream supports writing.

Returns: `true` if the `CompressionMode` value is `Compress`, and the underlying stream supports writing and is not closed; otherwise, `false`.

To be added.

## BrotliStream.Length property

```csharp
public override long Length { get; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: A long value.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## BrotliStream.Position property

```csharp
public override long Position { get; set; }
```

This property is not supported and always throws a `NotSupportedException`.

Returns: A long value.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## BrotliStream.BeginRead(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginRead (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous read operation. (Consider using the `Stream.ReadAsync` method instead.)

Parameters:

- `buffer`: The buffer from which data will be read.
- `offset`: The byte offset in `buffer` at which to begin reading data from the stream.
- `count`: To maximum number of bytes to read.
- `asyncCallback`: An optional asynchronous callback, to be called when the read operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous read request from other requests.

Returns: An object that represents the asynchronous read operation, which could still be pending.

Exceptions:

- `IOException`: The method tried to read asynchronously past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `BrotliStream` implementation does not support the read operation.
- `InvalidOperationException`: This call cannot be completed.

To be added.

## BrotliStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `buffer`: The buffer from which data will be written.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to write.
- `asyncCallback`: An optional asynchronous callback, to be called when the write operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that represents the asynchronous write operation, which could still be pending.

Exceptions:

- `IOException`: The method tried to write asynchronously past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `BrotliStream` implementation does not support the write operation.
- `InvalidOperationException`: The write operation cannot be performed because the stream is closed.

To be added.

## BrotliStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `BrotliStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

To be added.

## BrotliStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `BrotliStream`.

Returns: A task that represents the asynchronous dispose operation.

The `DisposeAsync` method lets you perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the Brotli stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `BrotliStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## BrotliStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using the `Stream.ReadAsync` method instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the stream, between 0 (zero) and the number of bytes you requested. `BrotliStream` returns 0 only at the end of the stream; otherwise, it blocks until at least one byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `BrotliStream.BeginRead` method on the current stream.
- `InvalidOperationException`: The end operation cannot be performed because the stream is closed.

To be added.

## BrotliStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Handles the end of an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `asyncResult`: The object that represents the asynchronous call.

Exceptions:

- `InvalidOperationException`: The underlying stream is closed or `null`.

To be added.

## BrotliStream.Flush() method

```csharp
public override void Flush ();
```

If the stream is not disposed, and the compression mode is set to compress, writes all the remaining encoder's data into this stream.

Exceptions:

- `InvalidDataException`: The encoder ran into invalid data.
- `ObjectDisposedException`: The stream is disposed.

To be added.

## BrotliStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this Brotli stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

If the operation is canceled before it completes, the returned task contains the `TaskStatus.Canceled` value for the `Task.Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `BrotliStream.Flush`.

## BrotliStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current Brotli stream to a byte span and advances the position within the Brotli stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

Use the `BrotliStream.CanRead` property to determine whether the current instance supports reading. Use the `System.IO.Compression.BrotliStream.ReadAsync` method to read asynchronously from the current stream.

This method read a maximum of `buffer.Length` bytes from the current stream and store them in `buffer`. The current position within the Brotli stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the Brotli stream remains unchanged. This method will block until at least one byte of data can be read, in the event that no data is available. `Read` returns 0 only when there is no more data in the stream and no more is expected (such as a closed socket or end of file). The method is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## BrotliStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a number of decompressed bytes into the specified byte array.

Parameters:

- `buffer`: The array used to store decompressed bytes.
- `offset`: The byte offset in `buffer` at which the read bytes will be placed.
- `count`: The maximum number of decompressed bytes to read.

Returns: The number of bytes that were decompressed into the byte array. If the end of the stream has been reached, zero or the number of bytes read is returned.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `InvalidOperationException`: The `CompressionMode` value was `Compress` when the object was created, or there is already an active asynchronous operation on this stream.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than zero.
- `ArgumentException`: The `buffer` length minus the index starting point is less than `count`.
- `InvalidDataException`: The data is in an invalid format.
- `ObjectDisposedException`: The underlying stream is null or closed.

To be added.
