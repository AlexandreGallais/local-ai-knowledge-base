---
title: "NetworkStream class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/NetworkStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkStream class (part 3 of 4)

## NetworkStream.Read(Byte>) method

```csharp
public override int Read (Span<byte> buffer);
```

Reads data from the `NetworkStream` and stores it to a span of bytes in memory.

Parameters:

- `buffer`: A region of memory to store data read from the `NetworkStream`.

Returns: The total number of bytes read into the buffer, between zero (0) and the length of the buffer. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support reading.
- `IOException`: An error occurred when accessing the socket.

-or-

There is a failure reading from the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
This method reads as much data as is available into the `buffer` parameter and returns the number of bytes successfully read.

> **Note:**
>  Check to see if the `NetworkStream` is readable by calling the `CanRead` property. If you attempt to read from a `NetworkStream` that is not readable, you will get an `InvalidOperationException`.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## NetworkStream.Read(Byte[], Int32, Int32) method

```csharp
public override int Read (byte[] buffer, int offset, int count);
```

Reads data from the `NetworkStream` and stores it to a byte array.

Parameters:

- `buffer`: An array of type `Byte` that is the location in memory to store data read from the `NetworkStream`.
- `offset`: The location in `buffer` to begin storing the data to.
- `count`: The number of bytes to read from the `NetworkStream`.

Returns: The total number of bytes read into the buffer between zero (0) and the requested count. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus `offset`.
- `InvalidOperationException`: The `NetworkStream` does not support reading.
- `IOException`: An error occurred when accessing the socket.

-or-

There is a failure reading from the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
This method reads data into `buffer` and returns the number of bytes successfully read. The `Read` operation reads as much data as is available, up to the number of bytes specified by the `count` parameter.

> **Note:**
>  Check to see if the `NetworkStream` is readable by calling the `CanRead` property. If you attempt to read from a `NetworkStream` that is not readable, you will get an `InvalidOperationException`.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example reads data from the `NetworkStream` into a buffer. If data is available, it continues reading until the end of the stream is reached, appending the received data to a `StringBuilder`.
_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/Overview/source.cs._
## NetworkStream.ReadAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask<int> ReadAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Reads data from the `NetworkStream` and stores it in a byte memory range as an asynchronous operation.

Parameters:

- `buffer`: The buffer to write the data to.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A `ValueTask<T>` that represents the asynchronous read operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, read operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support reading.
- `IOException`: An error occurred when accessing the socket.

-or-

There is a failure reading from the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method reads as much data as is available into `buffer` and returns the number of bytes successfully read.

> **Note:**
>  Check to see if the `NetworkStream` is readable by calling the `CanRead` property. If you attempt to read from a `NetworkStream` that is not readable, you will get an `InvalidOperationException`.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## NetworkStream.ReadAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<int> ReadAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Reads data from the `NetworkStream` and stores it to a specified range of a byte array as an asynchronous operation.

Parameters:

- `buffer`: The buffer to write the data into.
- `offset`: The location in `buffer` to begin storing the data to.
- `count`: The number of bytes to read from the `NetworkStream`.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous read operation. The value of its `Task<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, read operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support reading.
- `IOException`: An error occurred when accessing the socket.

-or-

There is a failure reading from the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method reads data into `buffer` and returns the number of bytes successfully read. The `ReadAsync` operation reads as much data as is available, up to the number of bytes specified by the `count` parameter.

> **Note:**
>  Check to see if the `NetworkStream` is readable by calling the `CanRead` property. If you attempt to read from a `NetworkStream` that is not readable, you will get an `InvalidOperationException`.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Read`.

## NetworkStream.ReadByte() method

```csharp
public override int ReadByte ();
```

Reads a byte from the `NetworkStream` and advances the position within the stream by one byte, or returns -1 if at the end of the stream.

Returns: The unsigned byte cast to an `Int32`, or -1 if at the end of the stream because the peer socket performed a graceful shutdown.

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support reading.
- `IOException`: An error occurred when accessing the socket.

-or-

There is a failure reading from the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks

> **Note:**
>  Check to see if the `NetworkStream` is readable by calling the `CanRead` property. If you attempt to read from a `NetworkStream` that is not readable, you will get an `InvalidOperationException`.

> **Note:**
>  If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## NetworkStream.Seek(Int64, SeekOrigin) method

```csharp
public override long Seek (long offset, System.IO.SeekOrigin origin);
```

Sets the current position of the stream to the given value. This method is not currently supported and always throws a `NotSupportedException`.

Parameters:

- `offset`: This parameter is not used.
- `origin`: This parameter is not used.

Returns: The position in the stream.

Exceptions:

- `NotSupportedException`: Any use of this property.

To be added.

## NetworkStream.SetLength(Int64) method

```csharp
public override void SetLength (long value);
```

Sets the length of the stream. This method always throws a `NotSupportedException`.

Parameters:

- `value`: This parameter is not used.

Exceptions:

- `NotSupportedException`: Any use of this property.

To be added.

## NetworkStream.Write(Byte>) method

```csharp
public override void Write (ReadOnlySpan<byte> buffer);
```

Writes data to the `NetworkStream`  from a read-only byte span.

Parameters:

- `buffer`: The data to write to the `NetworkStream`.

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support writing.
- `IOException`: An error occurred when accessing the socket.

-or-

There was a failure while writing to the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
This method sends all bytes in `buffer` to the network. The `Write` method blocks until the requested number of bytes is sent or a `SocketException` is thrown.

> **Note:**
> Check to see if the `NetworkStream` is writable by calling the `CanWrite` property. If you attempt to write to a `NetworkStream` that is not writable, you will get an `InvalidOperationException`.

> **Note:**
> If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## NetworkStream.Write(Byte[], Int32, Int32) method

```csharp
public override void Write (byte[] buffer, int offset, int count);
```

Writes data to the `NetworkStream` from a specified range of a byte array.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to write to the `NetworkStream`.
- `offset`: The location in `buffer` from which to start writing data.
- `count`: The number of bytes to write to the `NetworkStream`.

Exceptions:

- `ArgumentNullException`: The `buffer` parameter is `null`.
- `ArgumentOutOfRangeException`: The `offset` parameter is less than 0.

-or-

The `offset` parameter is greater than the length of `buffer`.

-or-

The `size` parameter is less than 0.

-or-

The `size` parameter is greater than the length of `buffer` minus the value of the `offset` parameter.
- `InvalidOperationException`: The `NetworkStream` does not support writing.
- `IOException`: An error occurred when accessing the socket.

-or-

There was a failure while writing to the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

#### Remarks
This method starts at the specified `offset` and sends `count` bytes from the contents of `buffer` to the network. The `Write` method blocks until the requested number of bytes is sent or a `SocketException` is thrown.

> **Note:**
> Check to see if the `NetworkStream` is writable by calling the `CanWrite` property. If you attempt to write to a `NetworkStream` that is not writable, you will get an `InvalidOperationException`.

> **Note:**
> If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example checks to see whether the `NetworkStream` is writable. If it is, then `NetworkStream.Write` is used to write a small message.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/Overview/source.cs._
