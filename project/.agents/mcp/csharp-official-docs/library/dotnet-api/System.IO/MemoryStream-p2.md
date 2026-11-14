---
title: "MemoryStream class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/MemoryStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MemoryStream class (part 2 of 3)

## MemoryStream.BeginWrite(Byte[], Int32, Int32, AsyncCallback, Object) method

```csharp
public override IAsyncResult BeginWrite (byte[] buffer, int offset, int count, AsyncCallback? callback, object? state);
```

Begins an asynchronous write operation. (Consider using `MemoryStream.WriteAsync` instead.)

Parameters:

- `buffer`: The buffer to write data from.
- `offset`: The byte offset in `buffer` from which to begin writing.
- `count`: The maximum number of bytes to write.
- `callback`: An optional asynchronous callback, to be called when the write is complete.
- `state`: A user-provided object that distinguishes this particular asynchronous write request from other requests.

Returns: An `IAsyncResult` that represents the asynchronous write, which could still be pending.

Exceptions:

- `IOException`: Attempted an asynchronous write past the end of the memory stream, or a disk error occurred.
- `ArgumentException`: One or more of the arguments is invalid.
- `ObjectDisposedException`: Methods were called after the memory stream was closed.
- `NotSupportedException`: The current memory stream implementation does not support the write operation.

#### Remarks

Refer to the `Stream.BeginWrite` remarks for additional usage information for this method.

## MemoryStream.CopyTo(Stream, Int32) method

```csharp
public override void CopyTo (System.IO.Stream destination, int bufferSize);
```

Reads the bytes from the current memory stream and writes them to another stream, using a specified buffer size.

Parameters:

- `destination`: The stream to which the contents of the current memory stream will be copied.
- `bufferSize`: The size of the buffer. This value must be greater than zero. The default size is 81920.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is not a positive number.
- `ObjectDisposedException`: Either the underlying memory stream or the `destination` stream is closed.
- `NotSupportedException`: The underlying memory stream is unreadable.

-or-

The `destination` stream is unwritable.

To be added.

## MemoryStream.CopyToAsync(Stream, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task CopyToAsync (System.IO.Stream destination, int bufferSize, System.Threading.CancellationToken <example-value>);
```

Asynchronously reads all the bytes from the current stream and writes them to another stream, using a specified buffer size and cancellation token.

Parameters:

- `destination`: The stream to which the contents of the current stream will be copied.
- `bufferSize`: The size, in bytes, of the buffer. This value must be greater than zero.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous copy operation.

Exceptions:

- `ArgumentNullException`: `destination` is `null`.
- `ArgumentOutOfRangeException`: `bufferSize` is negative or zero.
- `ObjectDisposedException`: Either the current stream or the destination stream is disposed.
- `NotSupportedException`: The current stream does not support reading, or the destination stream does not support writing.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `MemoryStream.CopyTo`.

## MemoryStream.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `MemoryStream` class and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose` method and the `Finalize` method, if it has been overridden. `Dispose` invokes the protected `MemoryStream.Dispose` method with the `disposing` parameter set to `true`. `Finalize` invokes `MemoryStream.Dispose` with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `MemoryStream` references. This method invokes the `Dispose` method of each referenced object.

## MemoryStream.EndRead(IAsyncResult) method

```csharp
public override int EndRead (IAsyncResult asyncResult);
```

Waits for the pending asynchronous read to complete. (Consider using `MemoryStream.ReadAsync` instead.)

Parameters:

- `asyncResult`: The reference to the pending asynchronous request to finish.

Returns: The number of bytes read from the memory stream, between zero (0) and the number of bytes you requested. Returns zero (0) only at the end of the memory stream, otherwise, it should block until at least one byte is available.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending read operation is not available.

-or-

The pending operation does not support reading.
- `InvalidOperationException`: `asyncResult` did not originate from a `MemoryStream.BeginRead` method on the current memory stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

Refer to the `Stream.EndRead` remarks for additional usage information for this method.

## MemoryStream.EndWrite(IAsyncResult) method

```csharp
public override void EndWrite (IAsyncResult asyncResult);
```

Ends an asynchronous write operation. (Consider using `MemoryStream.WriteAsync` instead.)

Parameters:

- `asyncResult`: A reference to the outstanding asynchronous I/O request.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: A handle to the pending write operation is not available.

-or-

The pending operation does not support writing.
- `InvalidOperationException`: `asyncResult` did not originate from a `Stream.BeginWrite` method on the current stream.
- `IOException`: The stream is closed or an internal error has occurred.

#### Remarks

Refer to the `Stream.EndWrite` remarks for additional usage information for this method.

## MemoryStream.Flush() method

```csharp
public override void Flush ();
```

Overrides the `Stream.Flush` method so that no action is performed.

#### Remarks
This method overrides the `Stream.Flush` method.

Because any data written to a `MemoryStream` object is written into RAM, this method is redundant.

## MemoryStream.FlushAsync(CancellationToken) method

```csharp
public override System.Threading.Tasks.Task FlushAsync (System.Threading.CancellationToken <example-value>);
```

Asynchronously clears all buffers for this stream, and monitors cancellation requests.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous flush operation.

Exceptions:

- `ObjectDisposedException`: The stream has been disposed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
Because any data written to a `MemoryStream` object is written into RAM, this method is redundant.

If the operation is canceled before it completes, the returned task contains the `Canceled` value for the `Status` property.

You can create a cancellation token by creating an instance of the `CancellationTokenSource` class and passing the `Token` property as the `cancellationToken` parameter.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Flush`.

## MemoryStream.GetBuffer() method

```csharp
public virtual byte[] GetBuffer ();
```

Returns the array of unsigned bytes from which this stream was created.

Returns: The byte array from which this stream was created, or the underlying array if a byte array was not provided to the `MemoryStream` constructor during construction of the current instance.

Exceptions:

- `UnauthorizedAccessException`: The `MemoryStream` instance was not created with a publicly visible buffer.

#### Remarks
Note that the buffer contains allocated bytes which might be unused. For example, if the string "test" is written into the `MemoryStream` object, the length of the buffer returned from `MemoryStream.GetBuffer` is 256, not 4, with 252 bytes unused. To obtain only the data in the buffer, use the `MemoryStream.ToArray` method; however, `MemoryStream.ToArray` creates a copy of the data in memory.

The buffer can also be `null`.

To create a `MemoryStream` instance with a publicly visible buffer, use `MemoryStream.%23ctor`, `%23ctor`, or `%23ctor`. If the current stream is resizable, two calls to this method do not return the same array if the underlying byte array is resized between calls. For additional information, see `MemoryStream.Capacity`.

> **Note:**
>  This method works when the memory stream is closed.

## MemoryStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads a sequence of bytes from the current memory stream and advances the position within the memory stream by the number of bytes read.

Parameters:

- `buffer`: To be added.

Returns: The total number of bytes read into the buffer. This can be less than the number of bytes allocated in the buffer if that many bytes are not currently available, or zero (0) if the end of the memory stream has been reached.

To be added.

## MemoryStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads a block of bytes from the current stream and writes the data to a buffer.

Parameters:

- `buffer`: When this method returns, contains the specified byte array with the values between `offset` and (`offset` + `count` - 1) replaced by the characters read from the current stream.
- `offset`: The zero-based byte offset in `buffer` at which to begin storing data from the current stream.
- `count`: The maximum number of bytes to read.

Returns: The total number of bytes written into the buffer. This can be less than the number of bytes requested if that number of bytes are not currently available, or zero if the end of the stream is reached before any bytes are read.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` or `count` is negative.
- `ArgumentException`: `offset` subtracted from the buffer length is less than `count`.
- `ObjectDisposedException`: The current stream instance is closed.

#### Remarks
This method overrides `Stream.Read`.

The `offset` parameter gives the offset of the first byte in `buffer` to which data from the current stream is written. The `count` parameter gives the maximum number of bytes to read from the current stream. The returned value is the actual number of bytes read, or zero if the end of the stream is reached.

If the read operation is successful, the current position within the stream advances by the number of bytes read. If an exception occurs, the current position within the stream remains unchanged.

The `Read` method will return zero only if the end of the stream is reached. In all other cases, `Read` always reads at least one byte from the stream before returning. By definition, if no data is available from the stream upon a call to `Read`, the `Read` method returns zero (the end of the stream is reached automatically). An implementation is free to return fewer bytes than requested even if the end of the stream has not been reached.

Use `BinaryReader` for reading primitive data types.

> **Caution:**
>  If the byte array specified in the `buffer` parameter is the underlying buffer returned by the `MemoryStream.GetBuffer` method, the array contents are overwritten, and no exception is thrown.

#### Examples
This code example is part of a larger example provided for the `MemoryStream` class.

_Code sample not included: ~/snippets/csharp/System.IO/MemoryStream/Overview/memstream.cs._

## MemoryStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Asynchronously reads a sequence of bytes from the current memory stream, writes the sequence into `destination`, advances the position within the memory stream by the number of bytes read, and monitors cancellation requests.

Parameters:

- `buffer`: To be added.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: A task that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into the `destination`. The result value can be less than the number of bytes allocated in `destination` if that many bytes are not currently available, or it can be 0 (zero) if the end of the memory stream has been reached.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
