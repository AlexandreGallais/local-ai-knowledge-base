---
title: "BufferedStream class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/BufferedStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BufferedStream class (part 3 of 3)

## BufferedStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Sets the position within the current buffered stream.

Parameters:

- `offset`: A byte offset relative to `origin`.
- `origin`: A value of type `SeekOrigin` indicating the reference point from which to obtain the new position.

Returns: The new position within the current buffered stream.

Exceptions:

- `IOException`: The stream is not open or is `null`.
- `NotSupportedException`: The stream does not support seeking.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
If `offset` is negative, the new position will precede the position specified by `origin` by the number of bytes specified by `offset`. If `offset` is 0, the new position will be the position specified by `origin`. If `offset` is positive, the new position will follow the position specified by `origin` by the number of bytes specified by `offset`.

When a `BufferedStream` object is the base stream for a `StreamReader` object, calling the `BufferedStream.Seek` method can cause the position of the stream to no longer match the position of the internal buffer in the reader. To reset the internal buffer, call the `StreamReader.DiscardBufferedData` method; however, this method slows performance and should be called only when absolutely necessary.

Seeking to any location beyond the length of the stream is supported.

## BufferedStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the buffered stream.

Parameters:

- `value`: An integer indicating the desired length of the current buffered stream in bytes.

Exceptions:

- `ArgumentOutOfRangeException`: `value` is negative.
- `IOException`: The stream is not open or is `null`.
- `NotSupportedException`: The stream does not support both writing and seeking.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks
The buffer is flushed before setting the length of the underlying data source or repository. If the specified value is less than the current length of the buffered stream, the buffered stream is truncated. If the specified value is larger than the current length of the buffered stream, the buffered stream is expanded. If the buffered stream is expanded, the contents of the buffered stream between the old and the new lengths are not defined.

`SetLength` flushes any buffered writes if necessary.

A stream must support both writing and seeking for `SetLength` to work.

## BufferedStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes a sequence of bytes to the current buffered stream and advances the current position within this buffered stream by the number of bytes written.

Parameters:

- `buffer`: A region of memory. This method copies the contents of this region to the current buffered stream.

#### Remarks

Use the `CanWrite` property to determine whether the current instance supports writing. Use the `BufferedStream.WriteAsync` method to write asynchronously to the current buffered stream.

If the write operation is successful, the position within the buffered stream advances by the number of bytes written. If an exception occurs, the position within the buffered stream remains unchanged.

## BufferedStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Copies bytes to the buffered stream and advances the current position within the buffered stream by the number of bytes written.

Parameters:

- `buffer`: To be added.
- `offset`: The offset in the buffer at which to begin copying bytes to the current buffered stream.
- `count`: The number of bytes to be written to the current buffered stream.

Exceptions:

- `ArgumentException`: Length of `array` minus `offset` is less than `count`.
- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `IOException`: The stream is closed or `null`.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Examples
This code example is part of a larger example provided for the `BufferedStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/BufferedStream/Overview/client.cs._

## BufferedStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes to the current buffered stream, advances the current position within this buffered stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in a desktop app where a time-consuming stream operation can block the UI thread and make your app appear as if it is not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## BufferedStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests.

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
You can create a cancellation token by creating an instance of the `CancellationTokenSource` class and passing the `Token` property as the `cancellationToken` parameter.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## BufferedStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the buffered stream.

Parameters:

- `value`: A byte to write to the stream.

Exceptions:

- `NotSupportedException`: The stream does not support writing.
- `ArgumentNullException`: `value` is `null`.
- `ObjectDisposedException`: Methods were called after the stream was closed.

#### Remarks

Use the `CanWrite` property to determine whether the current instance supports writing.
