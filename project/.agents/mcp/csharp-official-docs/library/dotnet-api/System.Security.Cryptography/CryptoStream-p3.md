---
title: "CryptoStream class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptoStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptoStream class (part 3 of 3)

## CryptoStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Sets the position within the current stream.

Parameters:

- `offset`: A byte offset relative to the `origin` parameter.
- `origin`: A `SeekOrigin` object indicating the reference point used to obtain the new position.

Returns: This method is not supported.

Exceptions:

- `NotSupportedException`: This method is not supported.

This method exists only to support inheritance from `Stream`, and cannot be used.

## CryptoStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the current stream.

Parameters:

- `value`: The desired length of the current stream in bytes.

Exceptions:

- `NotSupportedException`: This property exists only to support inheritance from `Stream`, and cannot be used.

This property exists only to support inheritance from `Stream`, and cannot be used.

## CryptoStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes a sequence of bytes to the current `CryptoStream` and advances the current position within the stream by the number of bytes written.

Parameters:

- `buffer`: An array of bytes. This method copies `count` bytes from `buffer` to the current stream.
- `offset`: The byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The number of bytes to be written to the current stream.

Exceptions:

- `NotSupportedException`: The `CryptoStreamMode` associated with current `CryptoStream` object does not match the underlying stream. For example, this exception is thrown when using `CryptoStreamMode.Write` with an underlying stream that is read only.
- `ArgumentOutOfRangeException`: `offset` or `count` is less than zero.
- `ArgumentException`: The sum of the `count` and `offset` parameters is longer than the length of the buffer.

To be added.

## CryptoStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `NotSupportedException`: The `CryptoStreamMode` associated with current `CryptoStream` object does not match the underlying stream. For example, this exception is thrown when using `CryptoStreamMode.Write` with an underlying stream that is read only.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## CryptoStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Writes a sequence of bytes to the current stream asynchronously, advances the current position within the stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin writing bytes to the stream.
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

You must preface your call to `CryptoStream.WriteAsync` with the `await` (C#) or `Await` (Visual Basic) operator to suspend execution of the method until the task is complete. For more information, see Asynchronous programming (C#) or Asynchronous programming with Async and Await (Visual Basic).

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## CryptoStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the stream and advances the position within the stream by one byte.

Parameters:

- `value`: The byte to write to the stream.

Exceptions:

- `IOException`: An I/O error occurs.
- `NotSupportedException`: The stream does not support writing, or the stream is already closed.
- `ObjectDisposedException`: Methods were called after the stream was closed.

Use the `CanWrite` property to determine whether the current instance supports writing.
