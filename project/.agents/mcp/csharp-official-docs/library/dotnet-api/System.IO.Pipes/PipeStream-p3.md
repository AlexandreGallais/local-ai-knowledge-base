---
title: "PipeStream class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Pipes/PipeStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PipeStream class (part 3 of 3)

## PipeStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Sets the current position of the current stream to the specified value.

Parameters:

- `offset`: The point, relative to `origin`, to begin seeking from.
- `origin`: Specifies the beginning, the end, or the current position as a reference point for `offset`, using a value of type `SeekOrigin`.

Returns: The new position in the stream.

#### Remarks
The `PipeStream.Seek` method is not supported in pipes and raises a `NotSupportedException` when it is called.

## PipeStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the current stream to the specified value.

Parameters:

- `value`: The new length of the stream.

#### Remarks
The `PipeStream` class does not support the `PipeStream.SetLength` method.

## PipeStream.WaitForPipeDrain() method

```csharp
public void WaitForPipeDrain ();
```

Waits for the other end of the pipe to read all sent bytes.

Exceptions:

- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support write operations.
- `IOException`: The pipe is broken or another I/O error occurred.
- `PlatformNotSupportedException`: On Linux and macOS: In all cases.

#### Remarks
The `PipeStream.WaitForPipeDrain` method blocks until the other end of the pipe has read all sent bytes.

## PipeStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes a sequence of bytes to the current stream and advances the current position within this stream by the number of bytes written.

Parameters:

- `buffer`: A region of memory. This method copies the contents of this region to the current stream.

Exceptions:

- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `IOException`: The pipe is broken.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?

#### Remarks

Use the `CanWrite` property to determine whether the current instance supports writing. Use the `PipeStream.WriteAsync` method to write asynchronously to the current stream.

If the write operation is successful, the position within the stream advances by the number of bytes written. If an exception occurs, the position within the stream remains unchanged.

## PipeStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes a block of bytes to the current stream using data from a buffer.

Parameters:

- `buffer`: The buffer that contains data to write to the pipe.
- `offset`: The zero-based byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The maximum number of bytes to write to the current stream.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`count` is less than 0.
- `ArgumentException`: `count` is greater than the number of bytes available in `buffer`.
- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support write operations.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
Use the `CanWrite` property to determine whether the current `PipeStream` object supports write operations.

For asynchronous write operations, see `PipeStream.BeginWrite` and `PipeStream.EndWrite`.

## PipeStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `NotSupportedException`: Stream does not support writing.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `IOException`: The pipe is broken.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `PipeStream.WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in applications where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## PipeStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a specified number of bytes from a byte array starting at a specified position, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: The `offset` is negative.

-or-

The `count` is negative.
- `ArgumentException`: `buffer`.Length - `offset` is less than `count`.
- `NotSupportedException`: Stream does not support writing.
- `ObjectDisposedException`: Cannot access a closed pipe.
- `IOException`: The pipe is broken.
- `InvalidOperationException`: The pipe hasn't been connected yet.

-or-

The pipe is in a disconnected state.

-or-

The pipe handle has not been set. (Did your `PipeStream` implementation call `PipeStream.InitializeHandle`?
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `PipeStream.WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in applications where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## PipeStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current stream.

Parameters:

- `value`: The byte to write to the stream.

Exceptions:

- `ObjectDisposedException`: The pipe is closed.
- `NotSupportedException`: The pipe does not support write operations.
- `InvalidOperationException`: The pipe is disconnected, waiting to connect, or the handle has not been set.
- `IOException`: The pipe is broken or another I/O error occurred.

#### Remarks
Use the `CanWrite` property to determine whether the current `PipeStream` object supports write operations.
