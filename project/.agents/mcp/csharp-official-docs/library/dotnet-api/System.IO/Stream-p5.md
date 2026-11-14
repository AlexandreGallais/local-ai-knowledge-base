---
title: "Stream class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class (part 5 of 6)

## Stream.ReadExactlyAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ReadExactlyAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads `count` number of bytes from the current stream, advances the position within the stream, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The number of bytes to be read from the current stream.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is outside the bounds of `buffer`.

-or-

`count` is negative.

-or-

The range specified by the combination of `offset` and `count` exceeds the
length of `buffer`.
- `EndOfStreamException`: The end of the stream is reached before reading `count` number of bytes.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

When `count` is 0 (zero), this read operation will be completed without waiting for available data in the stream.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `ReadExactly`.

## Stream.Seek(Int64, SeekOrigin) method

```csharp
public abstract long Seek (long offset, System.IO.SeekOrigin origin);
```

When overridden in a derived class, sets the position within the current stream.

Parameters:

- `offset`: A byte offset relative to the `origin` parameter.
- `origin`: A value of type `SeekOrigin` indicating the reference point used to obtain the new position.

Returns: The new position within the current stream.

Exceptions:

- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support seeking, such as if the stream is constructed from a pipe or console output.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
Use the `CanSeek` property to determine whether the current instance supports seeking.

If `offset` is negative, the new position is required to precede the position specified by `origin` by the number of bytes specified by `offset`. If `offset` is zero (0), the new position is required to be the position specified by `origin`. If `offset` is positive, the new position is required to follow the position specified by `origin` by the number of bytes specified by `offset`.

Classes derived from `Stream` that support seeking must override this method to provide the functionality described above.

Seeking to any location beyond the length of the stream is supported.

## Stream.SetLength(Int64) method

```csharp
public abstract void SetLength (long value);
```

When overridden in a derived class, sets the length of the current stream.

Parameters:

- `value`: The desired length of the current stream in bytes.

Exceptions:

- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support both writing and seeking, such as if the stream is constructed from a pipe or console output.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
If the specified value is less than the current length of the stream, the stream is truncated. If the specified value is larger than the current length of the stream, the stream is expanded. If the stream is expanded, the contents of the stream between the old and the new length are not defined.

A stream must support both writing and seeking for `SetLength` to work.

Use the `CanWrite` property to determine whether the current instance supports writing, and the `CanSeek` property to determine whether seeking is supported.

## Stream.Synchronized(Stream) method

```csharp
public static System.IO.Stream Synchronized (System.IO.Stream stream);
```

Creates a thread-safe (synchronized) wrapper around the specified `Stream` object.

Parameters:

- `stream`: The `Stream` object to synchronize.

Returns: A thread-safe `Stream` object.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.

#### Remarks
This method returns a class that wraps the specified `Stream` object and restricts access to it from multiple threads. All access to the `Stream` object will be thread safe.

## Stream.ValidateBufferArguments(Byte[], Int32, Int32) method

```csharp
protected static void ValidateBufferArguments (byte[] buffer, int offset, int count);
```

Validates arguments provided to reading and writing methods on `Stream`.

Parameters:

- `buffer`: The array "buffer" argument passed to the reading or writing method.
- `offset`: The integer "offset" argument passed to the reading or writing method.
- `count`: The integer "count" argument passed to the reading or writing method.

Exceptions:

- `ArgumentNullException`: `buffer` was `null`.
- `ArgumentOutOfRangeException`: `offset` was outside the bounds of `buffer`, or `count` was negative, or the range specified by the combination of `offset` and `count` exceed the length of `buffer`.

To be added.

## Stream.ValidateCopyToArguments(Stream, Int32) method

```csharp
protected static void ValidateCopyToArguments (System.IO.Stream destination, int bufferSize);
```

Validates arguments provided to the `Stream.CopyTo` or `Stream.CopyToAsync` methods.

Parameters:

- `destination`: The `Stream` "destination" argument passed to the copy method.
- `bufferSize`: The integer "bufferSize" argument passed to the copy method.

Exceptions:

- `ArgumentNullException`: `destination` was `null`.
- `ArgumentOutOfRangeException`: `bufferSize` was not a positive value.
- `NotSupportedException`: `destination` does not support writing.
- `ObjectDisposedException`: `destination` does not support writing or reading.

To be added.

## Stream.Write(Byte>) method

```csharp
public virtual void Write (ReadOnlySpan<byte> buffer);
```

When overridden in a derived class, writes a sequence of bytes to the current stream and advances the current position within this stream by the number of bytes written.

Parameters:

- `buffer`: A region of memory. This method copies the contents of this region to the current stream.

#### Remarks
Use the `CanWrite` property to determine whether the current instance supports writing. Use the `Stream.WriteAsync` method to write asynchronously to the current stream.

If the write operation is successful, the position within the stream advances by the number of bytes written. If an exception occurs, the position within the stream remains unchanged.

## Stream.Write(Byte[], Int32, Int32) method

```csharp
public abstract void Write (byte[] buffer, int offset, int count);
```

When overridden in a derived class, writes a sequence of bytes to the current stream and advances the current position within this stream by the number of bytes written.

Parameters:

- `buffer`: An array of bytes. This method copies `count` bytes from `buffer` to the current stream.
- `offset`: The zero-based byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The number of bytes to be written to the current stream.

Exceptions:

- `ArgumentException`: The sum of `offset` and `count` is greater than the buffer length.
- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: An I/O error occurred, such as the specified file cannot be found.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: `Stream.Write` was called after the stream was closed.

#### Remarks
Use the `CanWrite` property to determine whether the current instance supports writing. Use the `Stream.WriteAsync` method to write asynchronously to the current stream.

If the write operation is successful, the position within the stream advances by the number of bytes written. If an exception occurs, the position within the stream remains unchanged.

## Stream.WriteAsync(Byte>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

For an example, see the `WriteAsync` overload.

## Stream.WriteAsync(Byte[], Int32, Int32) method

```csharp
public System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count);
```

Asynchronously writes a sequence of bytes to the current stream and advances the current position within this stream by the number of bytes written.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous write operation.

#### Remarks
The `Stream.WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

#### Examples
The following example shows how to write asynchronously to a file. The example uses the `FileStream` class, which derives from the `Stream` class.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example3.cs._

## Stream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous write operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

For an example, see the `WriteAsync` overload.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.
