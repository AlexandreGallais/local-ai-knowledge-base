---
title: "DeflateStream class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO.Compression/DeflateStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeflateStream class (part 3 of 3)

## DeflateStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current Deflate stream, writes them to a byte memory range, advances the position within the Deflate stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The region of memory to write the data into.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the total number of bytes read into the buffer. The result value can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or it can be 0 (zero) if the end of the Deflate stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

The `ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## DeflateStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current Deflate stream, writes them to a byte array, advances the position within the Deflate stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset at which to begin writing data from the Deflate stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, which wraps the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the Deflate stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

> **Important:**
> This method might not read as many bytes as were requested. For more information, see Partial and zero-byte reads in DeflateStream, GZipStream, and CryptoStream.

The `ReadAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanRead` property to determine whether the current instance supports reading.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## DeflateStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the Deflate stream and advances the position within the stream by one byte, or returns -1 if at the end of the Deflate stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream.

Use the `CanRead` property to determine whether the current instance supports reading.

## DeflateStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

This operation is not supported and always throws a `NotSupportedException`.

Parameters:

- `offset`: The location in the stream.
- `origin`: One of the `SeekOrigin` values.

Returns: A long value.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## DeflateStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

This operation is not supported and always throws a `NotSupportedException`.

Parameters:

- `value`: The length of the stream.

Exceptions:

- `NotSupportedException`: This property is not supported on this stream.

To be added.

## DeflateStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes a sequence of bytes to the current Deflate stream and advances the current position within this Deflate stream by the number of bytes written.

Parameters:

- `buffer`: A region of memory. This method copies the contents of this region to the current Deflate stream.

Use the `CanWrite` property to determine whether the current instance supports writing. Use the `DeflateStream.WriteAsync` method to write asynchronously to the current stream.

If the write operation is successful, the position within the Deflate stream advances by the number of bytes written. If an exception occurs, the position within the Deflate stream remains unchanged.

## DeflateStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes compressed bytes to the underlying stream from the specified byte array.

Parameters:

- `buffer`: The buffer that contains the data to compress.
- `offset`: The byte offset from which the bytes will be read.
- `count`: The maximum number of bytes to write.

The following example shows how to compress and decompress bytes by using the `DeflateStream.Read` and `DeflateStream.Write` methods.

_Code sample not included: ~/snippets/csharp/System.IO.Compression/Deflate/MemoryWriteReadExample.cs._

## DeflateStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes compressed bytes to the underlying Deflate stream from the specified read-only memory region.

Parameters:

- `buffer`: The region of memory to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

The `WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

## DeflateStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes compressed bytes to the underlying Deflate stream from the specified byte array.

Parameters:

- `buffer`: The buffer that contains the data to compress.
- `offset`: The zero-based byte offset from which to begin copying bytes to the Deflate stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

The `WriteAsync` method enables you to perform resource-intensive I/O operations without blocking the main thread. This performance consideration is particularly important in desktop apps where a time-consuming stream operation can block the UI thread and make the app appear as if it's not working. The async methods are used in conjunction with the `async` and `await` keywords in Visual Basic and C#.

Use the `CanWrite` property to determine whether the current instance supports writing.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## DeflateStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current Deflate stream and advances the current position within this Deflate stream by one.

Parameters:

- `value`: A byte to write to the stream.

Writing one byte at a time in a loop is less efficient than writing multiple bytes at once. Prefer using the `DeflateStream.Write` or `DeflateStream.WriteAsync` method for writing multiple bytes at once.
