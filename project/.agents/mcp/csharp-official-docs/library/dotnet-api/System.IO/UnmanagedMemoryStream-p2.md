---
title: "UnmanagedMemoryStream class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/UnmanagedMemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnmanagedMemoryStream class (part 2 of 2)

## UnmanagedMemoryStream.Initialize(SafeBuffer, Int64, Int64, FileAccess) method

```csharp
protected void Initialize (System.Runtime.InteropServices.SafeBuffer buffer, long offset, long length, System.IO.FileAccess access);
```

Initializes a new instance of the `UnmanagedMemoryStream` class in a safe buffer with a specified offset, length, and file access.

Parameters:

- `buffer`: The buffer to contain the unmanaged memory stream.
- `offset`: The byte position in the buffer at which to start the unmanaged memory stream.
- `length`: The length of the unmanaged memory stream.
- `access`: The mode of file access to the unmanaged memory stream.

To be added.

## UnmanagedMemoryStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads all the bytes of this unmanaged memory stream into the specified span of bytes.

Parameters:

- `buffer`: To be added.

Returns: The total number of bytes read into the destination.

To be added.

## UnmanagedMemoryStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads the specified number of bytes into the specified array.

Parameters:

- `buffer`: When this method returns, contains the specified byte array with the values between `offset` and (`offset` + `count` - 1) replaced by the bytes read from the current source. This parameter is passed uninitialized.
- `offset`: The zero-based byte offset in `buffer` at which to begin storing the data read from the current stream.
- `count`: The maximum number of bytes to read from the current stream.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes requested if that many bytes are not currently available, or zero (0) if the end of the stream has been reached.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The underlying memory does not support reading.

-or-

The `UnmanagedMemoryStream.CanRead` property is set to `false`.
- `ArgumentNullException`: The `buffer` parameter is set to `null`.
- `ArgumentOutOfRangeException`: The `offset` parameter is less than zero.

-or-

The `count` parameter is less than zero.
- `ArgumentException`: The length of the buffer array minus the `offset` parameter is less than the `count` parameter.

#### Remarks
The `offset` parameter gives the offset of the byte in the `array` parameter (the buffer index) at which to begin reading, and the `count` parameter gives the maximum number of bytes to be read from this stream. The returned value is the actual number of bytes read, or zero if the end of the stream is reached. If the read operation is successful, the current position of the stream is advanced by the number of bytes read. If an exception occurs, the current position of the stream is unchanged.

The `UnmanagedMemoryStream.Read` method returns zero only after reaching the end of the stream. Otherwise, `UnmanagedMemoryStream.Read` always reads at least one byte from the stream before returning. If no data is available from the stream upon a call to `UnmanagedMemoryStream.Read`, the method will block until at least one byte of data can be returned. An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class.  A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/Overview/sample.cs._
## UnmanagedMemoryStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads the unmanaged memory stream bytes into the memory region.

Parameters:

- `buffer`: When the asynchronous method finishes, this memory region contains all the bytes read from the unmanaged memory stream.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation, and wraps the total number of bytes read into the buffer.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## UnmanagedMemoryStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads the specified number of bytes into the specified array.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If an exception occurs during the read operation, it will be set as the `Task.Exception` of the property of the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## UnmanagedMemoryStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from a stream and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32` object, or -1 if at the end of the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The underlying memory does not support reading.

-or-

The current position is at the end of the stream.

#### Remarks
Use this method to return integer values from the stream.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class. In this example, an `UnmanagedMemoryStream` object is passed to a method that checks the `CanRead` property before attempting to read and display the contents to the console.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
## UnmanagedMemoryStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin loc);
```

Sets the current position of the current stream to the given value.

Parameters:

- `offset`: The point relative to `origin` to begin seeking from.
- `loc`: Specifies the beginning, the end, or the current position as a reference point for `origin`, using a value of type `SeekOrigin`.

Returns: The new position in the stream.

Exceptions:

- `IOException`: An attempt was made to seek before the beginning of the stream.
- `ArgumentOutOfRangeException`: The `offset` value is larger than the maximum size of the stream.
- `ArgumentException`: `loc` is invalid.
- `ObjectDisposedException`: The stream is closed.

#### Remarks
For more information about seeking, see `FileStream.Seek`.

## UnmanagedMemoryStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of a stream to a specified value.

Parameters:

- `value`: The length of the stream.

Exceptions:

- `IOException`: An I/O error has occurred.
- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The underlying memory does not support writing.

-or-

An attempt is made to write to the stream and the `UnmanagedMemoryStream.CanWrite` property is `false`.
- `ArgumentOutOfRangeException`: The specified `value` exceeds the capacity of the stream.

-or-

The specified `value` is negative.

#### Remarks
If the given value is less than the current length of the stream, the stream is truncated. If the given value is larger than the current length of the stream, the stream is expanded. If the stream is expanded, the contents of the stream between the old and the new lengths are undefined.

A stream must support both writing and seeking for `UnmanagedMemoryStream.SetLength` to work.

## UnmanagedMemoryStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes a block of bytes to the current unmanaged memory stream using data from the provided span of bytes.

Parameters:

- `buffer`: To be added.

To be added.

## UnmanagedMemoryStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes a block of bytes to the current stream using data from a buffer.

Parameters:

- `buffer`: The byte array from which to copy bytes to the current stream.
- `offset`: The offset in the buffer at which to begin copying bytes to the current stream.
- `count`: The number of bytes to write to the current stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The underlying memory does not support writing.

-or-

An attempt is made to write to the stream and the `UnmanagedMemoryStream.CanWrite` property is `false`.

-or-

The `count` value is greater than the capacity of the stream.

-or-

The position is at the end of the stream capacity.
- `IOException`: An I/O error occurs.
- `ArgumentOutOfRangeException`: One of the specified parameters is less than zero.
- `ArgumentException`: The `offset` parameter minus the length of the `buffer` parameter is less than the `count` parameter.
- `ArgumentNullException`: The `buffer` parameter is `null`.

#### Remarks
Writing occurs at the current position in the stream.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class.  A block of unmanaged memory is allocated and de-allocated using the `Marshal` class.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/Overview/sample.cs._
## UnmanagedMemoryStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes a span of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

If an exception occurs during the write operation, it will be set as the `Task.Exception` of the property of the returned task.

## UnmanagedMemoryStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously writes a sequence of bytes to the current stream, advances the current position within this stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` from which to begin copying bytes to the stream.
- `count`: The maximum number of bytes to write.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If an exception occurs during the write operation, it will be set as the `Task.Exception` of the property of the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## UnmanagedMemoryStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the file stream.

Parameters:

- `value`: A byte value written to the stream.

Exceptions:

- `ObjectDisposedException`: The stream is closed.
- `NotSupportedException`: The underlying memory does not support writing.

-or-

An attempt is made to write to the stream and the `UnmanagedMemoryStream.CanWrite` property is `false`.

-or-

The current position is at the end of the capacity of the stream.
- `IOException`: The supplied `value` causes the stream exceed its maximum capacity.

#### Examples
The following code example demonstrates how to read from and write to unmanaged memory using the `UnmanagedMemoryStream` class. A block of unmanaged memory is allocated and de-allocated using the `Marshal` class. In this example, an `UnmanagedMemoryStream` object is passed to a method that checks the `CanWrite` property before attempting to write the data to the stream.

_Code sample not included: ~/snippets/csharp/System.IO/UnmanagedMemoryStream/.ctor/program.cs._
