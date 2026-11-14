---
title: "BufferedStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BufferedStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BufferedStream class (part 2 of 3)

## BufferedStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the buffered stream and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks

You should release all resources by specifying `true` for `disposing`. When `disposing` is `true`, the stream can also ensure data is flushed to the underlying buffer, and access other finalizable objects. This may not be possible when called from a finalizer due a lack of ordering among finalizers.

If your stream is using an operating system handle to communicate with its source, consider using a subclass of `SafeHandle` for this purpose.

This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `Dispose(Boolean)` method with the `disposing` parameter set to `true`. `Finalize` invokes `Dispose(Boolean)` with `disposing` set to `false`.

## BufferedStream.DisposeAsync() method

```csharp
public override System.Threading.Tasks.ValueTask DisposeAsync ();
```

Asynchronously releases the unmanaged resources used by the buffered stream.

Returns: A task that represents the asynchronous dispose operation.

#### Remarks

The `DisposeAsync` method enables you to perform a resource-intensive dispose operation without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

This method disposes the stream by writing any changes to the backing store and closing the stream to release resources.

Calling `DisposeAsync` allows the resources used by the `BufferedStream` to be reallocated for other purposes. For more information, see Cleaning Up Unmanaged Resources.

## BufferedStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read operation to complete. (Consider using `BufferedStream.ReadAsync` instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to wait for.

Returns: The number of bytes read from the stream, between 0 (zero) and the number of bytes you requested. Streams only return 0 only at the end of the stream, otherwise, they should block until at least 1 byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: This `IAsyncResult` object was not created by calling `BufferedStream.BeginRead` on this class.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `BufferedStream.ReadAsync`, `BufferedStream.WriteAsync`, and `BufferedStream.FlushAsync`, help you implement asynchronous file operations more easily.

`BufferedStream.EndRead` must be called with this `IAsyncResult` to find out how many bytes were read.

## BufferedStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation and blocks until the I/O operation is complete. (Consider using `BufferedStream.WriteAsync` instead.)

Parameters:

- `asyncResult`: The pending asynchronous request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: This `IAsyncResult` object was not created by calling `BufferedStream.BeginWrite` on this class.

#### Remarks

This method is available to support legacy code; however, the newer async methods, such as `BufferedStream.ReadAsync`, `BufferedStream.WriteAsync`, and `BufferedStream.FlushAsync`, help you implement asynchronous file operations more easily.

`BufferedStream.EndWrite` must be called exactly once for every call to `BufferedStream.BeginWrite`. Failing to end a read process before beginning another write operation can cause deadlock or other undesirable behavior.

## BufferedStream.Flush() method

```csharp
public override void Flush ();
```

Clears all buffers for this stream and causes any buffered data to be written to the underlying device.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `IOException`: The data source or repository is not open.

#### Remarks
Flushing the stream will not flush its underlying encoder unless you explicitly call `Flush` or `Stream.Close`.

If you use the `BufferedStream.%23ctor` constructor, thus specifying the buffer size while creating the `BufferedStream` object, the content is flushed when it reaches the buffer size. For example, code such as `BufferedStream bs = new BufferedStream(bs, 5)` will flush the content when the buffer size reaches 5 bytes.

All the read and write methods of `BufferedStream` automatically maintain the buffer, so there is no need to invoke `Flush` when switching back and forth between reading and writing.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this stream, causes any buffered data to be written to the underlying device, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `BufferedStream.Flush`.

## BufferedStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> destination);
```

Copies bytes from the current buffered stream to a byte span and advances the position within the buffered stream by the number of bytes read.

Parameters:

- `destination`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

#### Remarks

Use the `CanRead` property to determine whether the current instance supports reading. Use the `BufferedStream.ReadAsync` method to read asynchronously from the current stream.

Implementations of this method read a maximum of `buffer.Length` bytes from the current stream and store them in `buffer`. The current position within the stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the stream remains unchanged. Implementations return the number of bytes read. The implementation will block until at least one byte of data can be read, in the event that no data is available. `Read` returns 0 only when there is no more data in the stream and no more is expected (such as a closed socket or end of file). An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## BufferedStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Copies bytes from the current buffered stream to an array.

Parameters:

- `buffer`: To be added.
- `offset`: The byte offset in the buffer at which to begin reading bytes.
- `count`: The number of bytes to be read.

Returns: The total number of bytes read into `array`. This can be less than the number of bytes requested if that many bytes are not currently available, or 0 if the end of the stream has been reached before any data can be read.

Exceptions:

- `ArgumentException`: Length of `array` minus `offset` is less than `count`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: The stream is not open or is `null`.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
The `Read` method will return 0 only if the end of the stream is reached. In all other cases, `Read` always reads at least one byte from the stream before returning. By definition, if no data is available from the stream upon a call to `Read`, the `Read` method returns 0 (the end of the stream is reached automatically). An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current buffered stream and advances the position within the buffered stream by the number of bytes read.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the buffer. The result value can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## BufferedStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The returned task contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
You can create a cancellation token by creating an instance of the `CancellationTokenSource` class and passing the `Token` property as the `cancellationToken` parameter.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## BufferedStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the underlying stream and returns the byte cast to an `int`, or returns -1 if reading from the end of the stream.

Returns: The byte cast to an `int`, or -1 if reading from the end of the stream.

Exceptions:

- `IOException`: An I/O error occurs, such as the stream being closed.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Methods were called after the stream was closed.

To be added.
