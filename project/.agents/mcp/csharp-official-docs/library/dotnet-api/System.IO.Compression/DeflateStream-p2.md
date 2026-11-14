---
title: "DeflateStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/DeflateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeflateStream class (part 2 of 3)

## DeflateStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? asyncCallback, object? asyncState);
```

Begins an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset to begin writing from.
- `count`: The maximum number of bytes to write.
- `asyncCallback`: An optional asynchronous callback, to be called when the write operation is complete.
- `asyncState`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An object that represents the asynchronous write operation, which could still be pending.

Exceptions:

- `IOException`: The method tried to write asynchronously past the end of the stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the stream was closed.
- `NotSupportedException`: The current `DeflateStream` implementation does not support the write operation.
- `InvalidOperationException`: The write operation cannot be performed because the stream is closed.

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.WriteAsync`. For more information, see Asynchronous File I/O.

Pass the `IAsyncResult` object returned by the current method to `DeflateStream.EndWrite` to ensure that the write completes and frees resources appropriately. You can do this either by using the same code that called `DeflateStream.BeginWrite` or in a callback passed to `DeflateStream.BeginWrite`. If an error occurs during an asynchronous write operation, an exception will not be thrown until `DeflateStream.EndWrite` is called with the `IAsyncResult` returned by this method.

If a stream is writable, writing at the end of the stream expands the stream.

The current position in the stream is updated when you issue the asynchronous read or write operation, not when the I/O operation completes. Multiple simultaneous asynchronous requests render the request completion order uncertain.

Use the `CanWrite` property to determine whether the current `DeflateStream` object supports writing.

If a stream is closed or you pass an invalid argument, exceptions are thrown immediately from `DeflateStream.BeginWrite`. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and throw exceptions when calling `DeflateStream.EndWrite`.

## DeflateStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current Deflate stream and writes them to another stream, using a specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current Deflate stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero. The default size is 81920.

#### Remarks

Copying begins at the current position in the current Deflate stream and does not reset the position of the destination stream after the copy operation is complete.

## DeflateStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current Deflate stream and writes them to another stream, using a specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current Deflate stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero. The default size is 81920.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current Deflate stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.

## DeflateStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `DeflateStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks

This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `DeflateStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `DeflateStream.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `DeflateStream` references. This method invokes the `Dispose` method of each referenced object.

## DeflateStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `DeflateStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks

The `DisposeAsync` method enables you to perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the Deflate stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `DeflateStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## DeflateStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using the `Stream.ReadAsync` method instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the stream, between 0 (zero) and the number of bytes you requested. `DeflateStream` returns 0 only at the end of the stream; otherwise, it blocks until at least one byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `DeflateStream.BeginRead` method on the current stream.
- `SystemException`: An exception was thrown during a call to `WaitHandle.WaitOne`.
- `InvalidOperationException`: The end call is invalid because asynchronous read operations for this stream are not yet complete.

-or-

The stream is `null`.

#### Remarks

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.ReadAsync`. For more information, see Asynchronous File I/O.

Call this method to determine how many bytes were read from the stream. This method can be called once to return the amount of bytes read between calls to `DeflateStream.BeginRead` and `DeflateStream.EndRead`.

This method blocks until the I/O operation has completed.

## DeflateStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `asyncResult`: A reference to the outstanding asynchronous I/O request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `DeflateStream.BeginWrite` method on the current stream.
- `Exception`: An exception was thrown during a call to `WaitHandle.WaitOne`.
- `InvalidOperationException`: The stream is `null`.

-or-

The end write call is invalid.

#### Remarks

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.WriteAsync`. For more information, see Asynchronous File I/O.

`DeflateStream.EndWrite` must be called only once for every call to the `DeflateStream.BeginWrite` method.

This method blocks until the I/O operation has completed. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and become visible upon a call to `DeflateStream.EndWrite`. Exceptions thrown by the thread pool thread will not be visible when calling `DeflateStream.EndWrite`.

## DeflateStream.Flush() method

```csharp
public override void Flush ();
```

Flushes the internal buffer to the underlying stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.

If the compression mode is set to `Compress`, this method flushes the internal buffer to the underlying stream. If the compression mode is set to `Decompress`, this method has no effect.

## DeflateStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this Deflate stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## DeflateStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current Deflate stream into a byte span and advances the position within the Deflate stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

Use the `CanRead` property to determine whether the current instance supports reading. Use the `DeflateStream.ReadAsync` method to read asynchronously from the current stream.

This method read a maximum of `buffer.Length` bytes from the current stream and store them in `buffer`. The current position within the Deflate stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the Deflate stream remains unchanged. This method will block until at least one byte of data can be read, in the event that no data is available. `Read` returns 0 only when there is no more data in the stream and no more is expected (such as a closed socket or end of file). The method is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## DeflateStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a number of decompressed bytes into the specified byte array.

Parameters:

- `buffer`: The array to store decompressed bytes.
- `offset`: The byte offset at which the read bytes will be placed.
- `count`: The maximum number of decompressed bytes to read.

Returns: The number of bytes that were read into the byte array.

Exceptions:

- `ArgumentNullException`: `array` or `buffer` is `null`.
- `InvalidOperationException`: The `CompressionMode` value was `Compress` when the object was created.

-or-

The underlying stream does not support reading.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than zero.

-or-

`array` or `buffer` length minus the index starting point is less than `count`.
- `InvalidDataException`: The data is in an invalid format.
- `ObjectDisposedException`: The stream is closed.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

The following example shows how to compress and decompress bytes by using the `DeflateStream.Read` and `DeflateStream.Write` methods.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/Deflate/MemoryWriteReadExample.cs._
