---
title: "Stream class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class (part 3 of 6)

## Stream.CreateWaitHandle() method

```csharp
protected virtual System.Threading.WaitHandle CreateWaitHandle ();
```

Allocates a `WaitHandle` object.

Returns: A reference to the allocated `WaitHandle`.

To be added.

## Stream.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the `Stream`.

#### Remarks
This method disposes the stream, by writing any changes to the backing store and closing the stream to release resources.

Calling `Dispose` allows the resources used by the `Stream` to be reallocated for other purposes. For more information about `Dispose`, see Cleaning Up Unmanaged Resources.

## Stream.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Stream` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
You should release all resources by specifying `true` for `disposing`. When `disposing` is `true`, the stream can also ensure data is flushed to the underlying buffer, and access other finalizable objects.  This may not be possible when called from a finalizer due a lack of ordering among finalizers.

If your stream is using an operating system handle to communicate with its source, consider using a subclass of `SafeHandle` for this purpose.

This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `Stream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `Stream.Dispose` with `disposing` set to `false`.

## Stream.DisposeAsync() method

```csharp
public virtual System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the `Stream`.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks
The `Stream.DisposeAsync` method enables you to perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `Stream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Dispose`.

## Stream.EndRead(IAsyncResult) method

```csharp
public virtual int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using `Stream.ReadAsync` instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the stream, between zero (0) and the number of bytes requested. ReadAsync returns zero (0) only if zero bytes were requested or if no more bytes will be available because it's at the end of the stream; otherwise, read operations do not complete until at least one byte is available. If zero bytes are requested, read operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending read operation is not available.

-or-

The pending operation does not support reading.
- `InvalidOperationException`: `asyncResult` did not originate from a `Stream.BeginRead` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `Stream.ReadAsync`, `Stream.WriteAsync`, `Stream.CopyToAsync`, and `Stream.FlushAsync`, help you implement asynchronous I/O operations more easily.

Call `EndRead` to determine how many bytes were read from the stream.

`EndRead` can be called once on every `IAsyncResult` from `Stream.BeginRead`.

This method blocks until the I/O operation has completed.

## Stream.EndWrite(IAsyncResult) method

```csharp
public virtual void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation. (Consider using `Stream.WriteAsync` instead.)

Parameters:

- `asyncResult`: A reference to the outstanding asynchronous I/O request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending write operation is not available.

-or-

The pending operation does not support writing.
- `InvalidOperationException`: `asyncResult` did not originate from a `Stream.BeginWrite` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `Stream.ReadAsync`, `Stream.WriteAsync`, `Stream.CopyToAsync`, and `Stream.FlushAsync`, help you implement asynchronous I/O operations more easily.

`EndWrite` must be called exactly once on every `IAsyncResult` from `Stream.BeginWrite`.

This method blocks until the I/O operation has completed. Errors that occur during an asynchronous write request, such as a disk failure during the I/O request, occur on the thread pool thread and become visible upon a call to `EndWrite`. Exceptions thrown by the thread pool thread will not be visible when calling `EndWrite`.

## Stream.Flush() method

```csharp
public abstract void Flush ();
```

When overridden in a derived class, clears all buffers for this stream and causes any buffered data to be written to the underlying device.

Exceptions:

- `IOException`: An I/O error occurs.

#### Remarks
Override `Flush` on streams that implement a buffer. Use this method to move any information from an underlying buffer to its destination, clear the buffer, or both. Depending upon the state of the object, you might have to modify the current position within the stream (for example, if the underlying stream supports seeking). For additional information see `Stream.CanSeek`.

In a class derived from `Stream` that doesn't support writing, `Stream.Flush` is typically implemented as an empty method to ensure full compatibility with other `Stream` types since it's valid to flush a read-only stream.

When using the `StreamWriter` or `BinaryWriter` class, do not flush the base `Stream` object. Instead, use the class's `Stream.Flush` or `Stream.Close` method, which makes sure that the data is flushed to the underlying stream first and then written to the file.

## Stream.FlushAsync() method

```csharp
public System.Threading.Tasks.Task FlushAsync ();
```

Asynchronously clears all buffers for this stream and causes any buffered data to be written to the underlying device.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.

#### Remarks
If a derived class, such as `DeflateStream` or `GZipStream`, does not flush the buffer in its implementation of the `Stream.Flush` method, the `Stream.FlushAsync` method will not flush the buffer.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## Stream.FlushAsync(CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

If a derived class, such as `DeflateStream` or `GZipStream`, does not flush the buffer in its implementation of the `Stream.Flush` method, the `Stream.FlushAsync` method will not flush the buffer.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## Stream.ObjectInvariant() method

```csharp
protected virtual void ObjectInvariant ();
```

Provides support for a `Contract`.

To be added.

## Stream.Read(Byte>) method

```csharp
public virtual int Read (Span<byte> buffer);
```

When overridden in a derived class, reads a sequence of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the size of the buffer if that many bytes are not currently available, or zero (0) if the buffer's length is zero or the end of the stream has been reached.

#### Remarks
Use the `CanRead` property to determine whether the current instance supports reading. Use the `Stream.ReadAsync` method to read asynchronously from the current stream.

Implementations of this method read a maximum of `buffer.Length` bytes from the current stream and store them in `buffer`. The current position within the stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the stream remains unchanged. Implementations return the number of bytes read. If more than zero bytes are requested, the implementation will not complete the operation until at least one byte of data can be read (if zero bytes were requested, some implementations may similarly not complete until at least one byte is available, but no data will be consumed from the stream in such a case). `Stream.Read` returns 0 only if zero bytes were requested or when there is no more data in the stream and no more is expected (such as a closed socket or end of file). An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## Stream.Read(Byte[], Int32, Int32) method

```csharp
public abstract int Read (byte[] buffer, int offset, int count);
```

When overridden in a derived class, reads a sequence of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: An array of bytes. When this method returns, the buffer contains the specified byte array with the values between `offset` and (`offset` + `count` - 1) replaced by the bytes read from the current source.
- `offset`: The zero-based byte offset in `buffer` at which to begin storing the data read from the current stream.
- `count`: The maximum number of bytes to be read from the current stream.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes requested if that many bytes are not currently available, or zero (0) if `count` is 0 or the end of the stream has been reached.

Exceptions:

- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
Use the `CanRead` property to determine whether the current instance supports reading. Use the `Stream.ReadAsync` method to read asynchronously from the current stream.

Implementations of this method read a maximum of `count` bytes from the current stream and store them in `buffer` beginning at `offset`. The current position within the stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the stream remains unchanged. Implementations return the number of bytes read. If more than zero bytes are requested, the implementation will not complete the operation until at least one byte of data can be read (some implementations may similarly not complete until at least one byte is available even if zero bytes were requested, but no data will be consumed from the stream in such a case). `Stream.Read` returns 0 only if zero bytes were requested or when there is no more data in the stream and no more is expected (such as a closed socket or end of file). An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

#### Examples
The following example shows how to use `Stream.Read` to read a block of data.

_Code sample not included: ~/snippets/csharp/System.IO/Stream/Read/source.cs._
