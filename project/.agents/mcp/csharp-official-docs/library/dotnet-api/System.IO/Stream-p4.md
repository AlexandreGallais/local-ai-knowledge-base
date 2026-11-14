---
title: "Stream class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/Stream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Stream class (part 4 of 6)

## Stream.ReadAsync(Byte>, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the buffer. The result value can be less than the length of the buffer if that many bytes are not currently available, or it can be 0 (zero) if the length of the buffer is 0 or if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

For an example, see the `ReadAsync` overload.

## Stream.ReadAsync(Byte[], Int32, Int32) method

```csharp
public System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count);
```

Asynchronously reads a sequence of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if `count` is 0 or if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.

#### Remarks
The `Stream.ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

#### Examples
The following example shows how to read from a file asynchronously. The example uses the `FileStream` class, which derives from the `Stream` class.

_Code sample not included: ~/snippets/csharp/System.IO/FileStream/Overview/example4.cs._

## Stream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if `count` is 0 or if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
The `Stream.ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

For an example, see the `ReadAsync` overload.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## Stream.ReadAtLeast(Byte>, Int32, Boolean) method

```csharp
public int ReadAtLeast (Span<byte> buffer, int minimumBytes, bool throwOnEndOfStream = true);
```

Reads at least a minimum number of bytes from the current stream and advances the position within the stream by the number of bytes read.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current stream.
- `minimumBytes`: The minimum number of bytes to read into the buffer.
- `throwOnEndOfStream`: `true` to throw an exception if the end of the stream is reached before reading `minimumBytes` of bytes; `false` to return less than `minimumBytes` when the end of the stream is reached.
The default is `true`.

Returns: The total number of bytes read into the buffer. This is guaranteed to be greater than or equal to `minimumBytes` when `throwOnEndOfStream` is `true`. This will be less than `minimumBytes` when the end of the stream is reached and `throwOnEndOfStream` is `false`. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available.

Exceptions:

- `ArgumentOutOfRangeException`: `minimumBytes` is negative, or is greater than the length of `buffer`.
- `EndOfStreamException`: `throwOnEndOfStream` is `true` and the end of the stream is reached before reading
`minimumBytes` bytes of data.

#### Remarks

When `minimumBytes` is 0 (zero), this read operation will be completed without waiting for available data in the stream.

## Stream.ReadAtLeastAsync(Byte>, Int32, Boolean, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> ReadAtLeastAsync (Memory<byte> buffer, int minimumBytes, bool throwOnEndOfStream = true, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads at least a minimum number of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `minimumBytes`: The minimum number of bytes to read into the buffer.
- `throwOnEndOfStream`: `true` to throw an exception if the end of the stream is reached before reading `minimumBytes` of bytes; `false` to return less than `minimumBytes` when the end of the stream is reached.
The default is `true`.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the buffer. This is guaranteed to be greater than or equal to `minimumBytes` when `throwOnEndOfStream` is `true`. This will be less than `minimumBytes` when the end of the stream is reached and `throwOnEndOfStream` is `false`. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available.

Exceptions:

- `ArgumentOutOfRangeException`: `minimumBytes` is negative, or is greater than the length of `buffer`.
- `EndOfStreamException`: `throwOnEndOfStream` is `true` and the end of the stream is reached before reading
`minimumBytes` bytes of data.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

When `minimumBytes` is 0 (zero), this read operation will be completed without waiting for available data in the stream.

## Stream.ReadByte() method

```csharp
public virtual int ReadByte ();
```

Reads a byte from the stream and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream.

Exceptions:

- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
Use the `CanRead` property to determine whether the current instance supports reading.

Attempts to manipulate the stream after the stream has been closed could throw an `ObjectDisposedException`.

## Stream.ReadExactly(Byte>) method

```csharp
public void ReadExactly (Span<byte> buffer);
```

Reads bytes from the current stream and advances the position within the stream until the `buffer` is filled.

Parameters:

- `buffer`: A region of memory. When this method returns, the contents of this region are replaced by the bytes read from the current stream.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached before filling the `buffer`.

#### Remarks

When `buffer` is empty, this read operation will be completed without waiting for available data in the stream.

## Stream.ReadExactly(Byte[], Int32, Int32) method

```csharp
public void ReadExactly (byte[] buffer, int offset, int count);
```

Reads `count` number of bytes from the current stream and advances the position within the stream.

Parameters:

- `buffer`: An array of bytes. When this method returns, the buffer contains the specified byte array with the values between `offset` and (`offset` + `count` - 1) replaced by the bytes read from the current stream.
- `offset`: The byte offset in `buffer` at which to begin storing the data read from the current stream.
- `count`: The number of bytes to be read from the current stream.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is outside the bounds of `buffer`.

-or-

`count` is negative.

-or-

The range specified by the combination of `offset` and `count` exceeds the
length of `buffer`.
- `EndOfStreamException`: The end of the stream is reached before reading `count` number of bytes.

#### Remarks

When `count` is 0 (zero), this read operation will be completed without waiting for available data in the stream.

## Stream.ReadExactlyAsync(Byte>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ReadExactlyAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads bytes from the current stream, advances the position within the stream until the `buffer` is filled, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation.

Exceptions:

- `EndOfStreamException`: The end of the stream is reached before filling the `buffer`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

When `buffer` is empty, this read operation will be completed without waiting for available data in the stream.
