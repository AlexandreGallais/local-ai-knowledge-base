---
title: "PipeStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeStream class (part 2 of 3)

## PipeStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Ends a pending asynchronous read request.

Parameters:

- `asyncResult`: The reference to the pending asynchronous request.

Returns: The number of bytes that were read. A return value of 0 indicates the end of the stream (the pipe has been closed).

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `PipeStream.BeginRead` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks
This method returns the number of bytes read into the byte array specified by the earlier call to `PipeStream.BeginRead`.

Pass the returned `IAsyncResult` object to the `PipeStream.EndRead` method to determine how many bytes were read and to release operating system resources used for reading. `PipeStream.EndRead` must be called once for every call to `PipeStream.BeginRead`. This can be done either in the same code that called `PipeStream.BeginRead` or in a callback that is passed to `PipeStream.BeginRead`.

Use the `CanRead` property to determine whether the current `PipeStream` object supports read operations.

If the pipe is closed or an invalid argument is passed to `PipeStream.BeginRead`, the appropriate exceptions are raised immediately. Errors that occur during an asynchronous read request occur on the thread pool thread that is performing the request. The exceptions are raised when the code calls the `PipeStream.EndRead` method.

## PipeStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends a pending asynchronous write request.

Parameters:

- `asyncResult`: The reference to the pending asynchronous request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` did not originate from a `PipeStream.BeginWrite` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks
`PipeStream.EndWrite` must be called once for every call to `PipeStream.BeginWrite`. This can be done either in the same code that called `PipeStream.BeginWrite` or in a callback that is passed to `PipeStream.BeginWrite`.

Use the `CanWrite` property to determine whether the current `PipeStream` object supports write operations.

If the pipe is closed or an invalid argument is passed to `PipeStream.BeginWrite`, the appropriate exceptions are raised immediately. Errors that occur during an asynchronous write request occur on the thread pool thread that is performing the request. The exceptions are raised when the code the calls `PipeStream.EndWrite` method.

## PipeStream.Flush() method

```csharp
public override void Flush ();
```

Clears the buffer for the current stream and causes any buffered data to be written to the underlying device.

Exceptions:

- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support write operations.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
The `PipeStream.Flush` method is not supported in the `PipeStream` class and does nothing when it is called.

## PipeStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears the buffer for the current stream and causes any buffered data to be written to the underlying device.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represent the asynchronous flush operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `PipeStream.Flush`.

## PipeStream.InitializeHandle(SafePipeHandle, Boolean, Boolean) method

```csharp
protected void InitializeHandle (Microsoft.Win32.SafeHandles.SafePipeHandle? handle, bool isExposed, bool isAsync);
```

Initializes a `PipeStream` object from the specified `SafePipeHandle` object.

Parameters:

- `handle`: The `SafePipeHandle` object of the pipe to initialize.
- `isExposed`: `true` to expose the handle; otherwise, `false`.
- `isAsync`: `true` to indicate that the handle was opened asynchronously; otherwise, `false`.

Exceptions:

- `IOException`: A handle cannot be bound to the pipe.

#### Remarks
If the pipe is in a connected state, this method also sets the `IsConnected` property to `true`.

## PipeStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current stream, writes them to a byte array, and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current source.

Returns: The total number of bytes read into the `buffer`. This can be less than the number of bytes allocated in `buffer` if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: The number of bytes read was longer than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?

#### Remarks

Use the `CanRead` property to determine whether the current `PipeStream` object supports read operations.

Use the `PipeStream.ReadAsync` method to read asynchronously from the current stream.

This method reads a maximum of `buffer.Length` bytes from the current stream and stores them in `buffer`. The current position within the stream is advanced by the number of bytes read; however, if an exception occurs, the current position within the stream remains unchanged.

This method will block until at least one byte of data can be read, in the event that no data is available.

This method returns 0 only when there is no more data in the stream and no more is expected (such as a closed socket or end of file).

This method is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

## PipeStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a block of bytes from a stream and writes the data to a specified buffer starting at a specified position for a specified length.

Parameters:

- `buffer`: When this method returns, contains the specified byte array with the values between `offset` and (`offset` + `count` - 1) replaced by the bytes read from the current source.
- `offset`: The byte offset in the `buffer` array at which the bytes that are read will be placed.
- `count`: The maximum number of bytes to read.

Returns: The total number of bytes that are read into `buffer`. This might be less than the number of bytes requested if that number of bytes is not currently available, or 0 if the end of the stream is reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `count` is greater than the number of bytes available in `buffer`.
- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support read operations.
- `InvalidOperationException`: The pipe is disconnected, waiting to connect, or the handle has not been set.
- `IOException`: Any I/O error occurred.

#### Remarks
Use the `CanRead` property to determine whether the current `PipeStream` object supports read operations.

Calling the `PipeStream.Read` method blocks until `count` bytes are read or the end of the stream is reached. For asynchronous read operations, see `PipeStream.BeginRead` and `PipeStream.EndRead`.

#### Examples
The following example creates an anonymous pipe client and pipe server. The pipe server uses the `PipeStream.Read` method to read a series of bytes from the pipe client as a validation code. Both the pipe client and the pipe server are part of the same example. The server portion of the example creates a client process and passes it an anonymous pipe handle as an argument.

_Code sample not included: ~/snippets/csharp/System.IO.Pipes/PipeStream/Read/sample.cs._

## PipeStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current stream, writes them to a byte memory range, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the buffer. The result value can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `PipeStream.ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in applications where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## PipeStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current stream to a byte array starting at a specified position for a specified number of bytes, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `Task<T>.Result` property contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `PipeStream.ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in applications where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## PipeStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from a pipe.

Returns: The byte, cast to `Int32`, or -1 indicates the end of the stream (the pipe has been closed).

Exceptions:

- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support read operations.
- `InvalidOperationException`: The pipe is disconnected, waiting to connect, or the handle has not been set.
- `IOException`: Any I/O error occurred.

#### Remarks
Use the `CanRead` property to determine whether the current `PipeStream` object supports read operations.
