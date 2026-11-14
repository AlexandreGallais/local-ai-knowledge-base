---
title: "CryptoStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptoStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptoStream class (part 2 of 3)

## CryptoStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `CryptoStream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes the protected `Dispose(Boolean)` method with the disposing parameter set to `true`. `Finalize` invokes `Dispose` with disposing set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `CryptoStream` references. This method invokes the `Dispose()` method of each referenced object.

## CryptoStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `CryptoStream`.

Returns: A task that represents the asynchronous dispose operation.

The `CryptoStream.DisposeAsync` method enables you to perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `CryptoStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## CryptoStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using `ReadAsync` instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the stream, between zero (0) and the number of bytes you requested. Streams return zero (0) only at the end of the stream, otherwise, they should block until at least one byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending read operation is not available.

-or-

The pending operation does not support reading.
- `InvalidOperationException`: `asyncResult` did not originate from a `CryptoStream.BeginRead` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

This method is available to support legacy code; however, the newer async methods, such as `CryptoStream.ReadAsync`, `CryptoStream.WriteAsync`, `Stream.CopyToAsync`, and `CryptoStream.FlushAsync`, help you implement asynchronous I/O operations more easily.

Call `EndRead` to determine how many bytes were read from the stream.

`EndRead` can be called once on every `IAsyncResult` from `CryptoStream.BeginRead`.

This method blocks until the I/O operation has completed.

## CryptoStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation. (Consider using `WriteAsync` instead.)

Parameters:

- `asyncResult`: A reference to the outstanding asynchronous I/O request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending write operation is not available.

-or-

The pending operation does not support writing.
- `InvalidOperationException`: `asyncResult` did not originate from a `Stream.BeginWrite` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

This method is available to support legacy code; however, the newer async methods, such as `CryptoStream.ReadAsync`, `CryptoStream.WriteAsync`, `Stream.CopyToAsync`, and `CryptoStream.FlushAsync`, help you implement asynchronous I/O operations more easily.

`EndWrite` must be called exactly once on every `IAsyncResult` from `CryptoStream.BeginWrite`.

This method blocks until the I/O operation has completed. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and become visible upon a call to `EndWrite`. Exceptions thrown by the thread pool thread will not be visible when calling `EndWrite`.

## CryptoStream.Flush() method

```csharp
public override void Flush ();
```

Clears all buffers for the current stream and causes any buffered data to be written to the underlying device.

Flushing the stream will not flush its underlying encoder unless you explicitly call `CryptoStream.Flush` or `Stream.Close`. Setting `StreamWriter.AutoFlush` to `true` means that data will be flushed from the buffer to the stream, but the encoder state will not be flushed. This allows the encoder to keep its state (partial characters) so that it can encode the next block of characters correctly. This scenario affects UTF8 and UTF7 where certain characters can only be encoded after the encoder receives the adjacent character or characters.

> **Note:**
> You should call either the `Stream.Close` method or the `CryptoStream.FlushFinalBlock` method to complete flushing the buffer.

## CryptoStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Clears all buffers for the current stream asynchronously, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

You must preface your call to `CryptoStream.FlushAsync` with the `await` (C#) or `Await` (Visual Basic) operator to suspend execution of the method until the task is complete. For more information, see Asynchronous programming (C#) or Asynchronous programming with Async and Await (Visual Basic).

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## CryptoStream.FlushFinalBlock() method

```csharp
public void FlushFinalBlock ();
```

Updates the underlying data source or repository with the current state of the buffer, then clears the buffer.

Exceptions:

- `CryptographicException`: The key is corrupt which can cause invalid padding to the stream.
- `NotSupportedException`: The current stream is not writable.

-or-

The final block has already been transformed.

Calling the `Stream.Close` method will call `CryptoStream.FlushFinalBlock`. If you do not call `Stream.Close`, call `CryptoStream.FlushFinalBlock` to complete flushing the buffer. Call `CryptoStream.FlushFinalBlock` only when all stream activity is complete.

## CryptoStream.FlushFinalBlockAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask FlushFinalBlockAsync (System.Threading.CancellationToken <example-value> = default);
```

Asynchronously updates the underlying data source or repository with the current state of the buffer, then clears the buffer.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `CryptoStream.FlushFinalBlock`.

## CryptoStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a sequence of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: An array of bytes. A maximum of `count` bytes are read from the current stream and stored in `buffer`.
- `offset`: The byte offset in `buffer` at which to begin storing the data read from the current stream.
- `count`: The maximum number of bytes to be read from the current stream.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes requested if that many bytes are not currently available, or zero if the end of the stream has been reached.

Exceptions:

- `NotSupportedException`: The `CryptoStreamMode` associated with current `CryptoStream` object does not match the underlying stream. For example, this exception is thrown when using `CryptoStreamMode.Read` with an underlying stream that is write only.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than zero.
- `ArgumentException`: The sum of the `count` and `offset` parameters is longer than the length of the buffer.

This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

## CryptoStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the buffer. The result value can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `NotSupportedException`: The `CryptoStreamMode` associated with the current `CryptoStream` object does not match the underlying stream. For example, this exception is thrown when using `CryptoStreamMode.Read` with an underlying stream that's write only.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

## CryptoStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Reads a sequence of bytes from the current stream asynchronously, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of the task object's `TResult` parameter contains the total number of bytes read into the buffer. The result can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

You must preface your call to `CryptoStream.ReadAsync` with the `await` (C#) or `Await` (Visual Basic) operator to suspend execution of the method until the task is complete. For more information, see Asynchronous programming (C#) or Asynchronous programming with Async and Await (Visual Basic).

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## CryptoStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the stream and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream.

Exceptions:

- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Methods were called after the stream was closed.

Use the `CanRead` property to determine whether the current instance supports reading.

If you attempt to manipulate the stream after the stream has been closed, an `ObjectDisposedException` might be thrown.
