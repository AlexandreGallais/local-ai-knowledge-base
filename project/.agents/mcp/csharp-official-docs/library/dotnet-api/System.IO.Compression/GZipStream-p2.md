---
title: "GZipStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/GZipStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GZipStream class (part 2 of 3)

## GZipStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the bytes from the current GZip stream and writes them to another stream, using a specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current GZip stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero. The default size is 81920.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `GZipStream.CopyToAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

Copying begins at the current position in the current GZip stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CopyTo`.

## GZipStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `GZipStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks

This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `GZipStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `GZipStream.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `DeflateStream` references. This method invokes the `Dispose` method of each referenced object.

## GZipStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `GZipStream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks

The `DisposeAsync` method enables you to perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the GZip stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `GZipStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## GZipStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using the `Stream.ReadAsync` method instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the stream, between 0 (zero) and the number of bytes you requested. `GZipStream` returns 0 only at the end of the stream; otherwise, it blocks until at least one byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `GZipStream.BeginRead` method on the current stream.
- `InvalidOperationException`: The end operation cannot be performed because the stream is closed.

#### Remarks

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.ReadAsync`. For more information, see Asynchronous File I/O.

Call this method to determine how many bytes were read from the stream. This method can be called once to return the amount of bytes read between calls to `GZipStream.BeginRead` and `GZipStream.EndRead`.

This method blocks until the I/O operation has completed.

## GZipStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Handles the end of an asynchronous write operation. (Consider using the `Stream.WriteAsync` method instead.)

Parameters:

- `asyncResult`: The object that represents the asynchronous call.

Exceptions:

- `InvalidOperationException`: The underlying stream is `null`.

-or-

The underlying stream is closed.

#### Remarks

This method is available to support legacy code; however, you can implement asynchronous I/O operations more easily by using the newer async methods such as `Stream.WriteAsync`. For more information, see Asynchronous File I/O.

The `GZipStream.EndWrite` method completes the asynchronous write operation started in the `GZipStream.BeginWrite` method.

## GZipStream.Flush() method

```csharp
public override void Flush ();
```

Flushes the internal buffers.

Exceptions:

- `ObjectDisposedException`: The underlying stream is closed.

#### Remarks

This method flushes only if the current compression mode is `Compress` and the underlying stream still has some input left to write.

## GZipStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this GZip stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## GZipStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current GZip stream into a byte span and advances the position within the GZip stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

Use the `CanRead` property to determine whether the current instance supports reading. Use the `GZipStream.ReadAsync` method to read asynchronously from the current stream.

This method reads a maximum of `buffer.Length` bytes from the current stream and stores them in `buffer`. The current position within the GZip stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the GZip stream remains unchanged. In the event that no data is available, this method blocks until at least one byte of data can be read. `Read` returns 0 only when there is no more data in the stream and no more is expected (such as a closed socket or end of file). The method is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## GZipStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a number of decompressed bytes into the specified byte array.

Parameters:

- `buffer`: The array used to store decompressed bytes.
- `offset`: The byte offset at which the read bytes will be placed.
- `count`: The maximum number of decompressed bytes to read.

Returns: The number of bytes that were decompressed into the byte array. If the end of the stream has been reached, zero or the number of bytes read is returned.

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

#### Remarks

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

If data is found in an invalid format, an `InvalidDataException` is thrown. A cyclic redundancy check (CRC) is performed as one of the last operations of this method.

#### Examples

The following example shows how to compress and decompress bytes by using the `GZipStream.Read` and `GZipStream.Write` methods.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/GZip/MemoryWriteReadExample.cs._

## GZipStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current GZip stream into a byte memory region, advances the position within the GZip stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the total number of bytes read into the buffer. The result value can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or it can be 0 (zero) if the end of the GZip stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

The `ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## GZipStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current GZip stream into a byte array, advances the position within the GZip stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset at which to begin writing data from the GZip stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the total number of bytes read. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the GZip stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

The `ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.
