---
title: "MemoryStream class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/MemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryStream class (part 3 of 3)

## MemoryStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads a sequence of bytes from the current stream, advances the position within the stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The byte offset in `buffer` at which to begin writing data from the stream.
- `count`: The maximum number of bytes to read.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of the `TResult` parameter contains the total number of bytes read into the buffer. The result value can be less than the number of bytes requested if the number of bytes currently available is less than the requested number, or it can be 0 (zero) if the end of the stream has been reached.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support reading.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous read operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

You can create a cancellation token by creating an instance of the `CancellationTokenSource` class and passing the `Token` property as the `cancellationToken` parameter.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## MemoryStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the current stream.

Returns: The byte cast to a `Int32`, or -1 if the end of the stream has been reached.

Exceptions:

- `ObjectDisposedException`: The current stream instance is closed.

#### Remarks
This method overrides `Stream.ReadByte`.

If the read operation is successful, the current position within the stream is advanced by one byte. If an exception occurs, the current position within the stream is unchanged.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin loc);
```

Sets the position within the current stream to the specified value.

Parameters:

- `offset`: The new position within the stream. This is relative to the `loc` parameter, and can be positive or negative.
- `loc`: A value of type `SeekOrigin`, which acts as the seek reference point.

Returns: The new position within the stream, calculated by combining the initial reference point and the offset.

Exceptions:

- `IOException`: Seeking is attempted before the beginning of the stream.
- `ArgumentOutOfRangeException`: `offset` is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.
- `ArgumentException`: There is an invalid `SeekOrigin`.

-or-

`offset` caused an arithmetic overflow.
- `ObjectDisposedException`: The current stream instance is closed.

#### Remarks
This method overrides `Stream.Seek`.

Seeking to any location beyond the length of the stream is supported.

Do not use the `MemoryStream.Seek` method to determine the new position in the stream if the `MemoryStream` was initialized with a non-zero offset. If you do, `MemoryStream.Seek` will return an inaccurate value. Instead, use the `Position` property to get the new position of the stream.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the current stream to the specified value.

Parameters:

- `value`: The length to set.

Exceptions:

- `NotSupportedException`: The current stream is not resizable and `value` is larger than the current capacity.

-or-

The current stream does not support writing.
- `ArgumentOutOfRangeException`: `value` is negative

-or-

In .NET 11 and later versions, `value` is greater than <see cref="P:System.Array.MaxLength">Array.MaxLength</see>.

-or-

In .NET 10 and earlier versions, `value` is greater than the maximum length of the `MemoryStream`, where the maximum length is (<see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> -
```csharp
origin
```
), and
```csharp
origin
```
is the index into the underlying buffer at which the stream starts.

This method overrides `Stream.SetLength`.

If the specified value is less than the current length of the stream, the stream is truncated. If after the truncation the current position within the stream is past the end of the stream, the `MemoryStream.ReadByte` method returns -1, the `MemoryStream.Read` method reads zero bytes into the provided byte array, and `MemoryStream.Write` and `MemoryStream.WriteByte` methods append specified bytes at the end of the stream, increasing its length. If the specified value is larger than the current capacity and the stream is resizable, the capacity is increased, and the current position within the stream is unchanged. If the length is increased, the contents of the stream between the old and the new length are initialized to zeros.

> **Note:**
> A `MemoryStream` instance must support writing for this method to work. Use the `CanWrite` property to determine whether the current instance supports writing. For additional information, see `CanWrite`.

## MemoryStream.ToArray() method

```csharp
public virtual byte[] ToArray ();
```

Writes the stream contents to a byte array, regardless of the `MemoryStream.Position` property.

Returns: A new byte array.

#### Remarks
This method omits unused bytes in `MemoryStream` from the array. To get the entire buffer, use the `MemoryStream.GetBuffer` method.

This method returns a copy of the contents of the `MemoryStream` as a byte array. If the current instance was constructed on a provided byte array, a copy of the section of the array to which this instance has access is returned. See the `MemoryStream.%23ctor` constructor for details.

> **Note:**
> This method works when the `MemoryStream` is closed.

## MemoryStream.TryGetBuffer(Byte>) method

```csharp
public virtual bool TryGetBuffer (out ArraySegment<byte> buffer);
```

Returns the array of unsigned bytes from which this stream was created. The return value indicates whether the conversion succeeded.

Parameters:

- `buffer`: When this method returns `true`, the byte array segment from which this stream was created; when this method returns `false`, this parameter is set to `default`.

Returns: `true` if the buffer is exposable; otherwise, `false`.

#### Remarks

This method returns `true` when the underlying buffer is marked as exposable, which happens when the current `MemoryStream` instance is created with:

- `%23ctor`.
- `%23ctor`.
- `%23ctor` with the parameter `publiclyVisible` set to `true`.

The underlying buffer will not be exposed if the current `MemoryStream` instance is created with:

- `%23ctor`
- `%23ctor` with the parameter `publiclyVisible` set to `false`.

> **Note:**
>  This method works when the memory stream is closed.

## MemoryStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes the sequence of bytes contained in `source` into the current memory stream and advances the current position within this memory stream by the number of bytes written.

Parameters:

- `buffer`: To be added.

To be added.

## MemoryStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes a block of bytes to the current stream using data read from a buffer.

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The zero-based byte offset in `buffer` at which to begin copying bytes to the current stream.
- `count`: The maximum number of bytes to write.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `NotSupportedException`: The stream does not support writing. For additional information see `Stream.CanWrite`.

-or-

The current position is closer than `count` bytes to the end of the stream, and the capacity cannot be modified.
- `ArgumentException`: `offset` subtracted from the buffer length is less than `count`.
- `ArgumentOutOfRangeException`: `offset` or `count` are negative.
- `IOException`: An I/O error occurs.
- `ObjectDisposedException`: The current stream instance is closed.

#### Remarks
This method overrides `Stream.Write`.

The `offset` parameter gives the offset of the first byte in `buffer` to write from, and the `count` parameter gives the number of bytes to write. If the write operation is successful, the current position within the stream is advanced by the number of bytes written. If an exception occurs, the current position within the stream is unchanged.

Except for a `MemoryStream` constructed with a byte[] parameter, write operations at the end of a `MemoryStream` expand the `MemoryStream`.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously writes the sequence of bytes contained in `source` into the current memory stream, advances the current position within this memory stream by the number of bytes written, and monitors cancellation requests.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## MemoryStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

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

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: The sum of `offset` and `count` is larger than the buffer length.
- `NotSupportedException`: The stream does not support writing.
- `ObjectDisposedException`: The stream has been disposed.
- `InvalidOperationException`: The stream is currently in use by a previous write operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

You can create a cancellation token by creating an instance of the `CancellationTokenSource` class and passing the `Token` property as the `cancellationToken` parameter.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## MemoryStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current stream at the current position.

Parameters:

- `value`: The byte to write.

Exceptions:

- `NotSupportedException`: The stream does not support writing. For additional information see `Stream.CanWrite`.

-or-

The current position is at the end of the stream, and the capacity cannot be modified.
- `ObjectDisposedException`: The current stream is closed.

#### Remarks
This method overrides `Stream.WriteByte`.

Except for a `MemoryStream` constructed with a byte[] parameter, write operations at the end of a `MemoryStream` expand the `MemoryStream`.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.WriteTo(Stream) method

```csharp
public virtual void WriteTo (System.IO.Stream stream);
```

Writes the entire contents of this memory stream to another stream.

Parameters:

- `stream`: The stream to write this memory stream to.

Exceptions:

- `ArgumentNullException`: `stream` is `null`.
- `ObjectDisposedException`: The current or target stream is closed.

#### Remarks
When the current stream is open, this method is equivalent to calling `Stream.Write` on the underlying buffer of this stream.
