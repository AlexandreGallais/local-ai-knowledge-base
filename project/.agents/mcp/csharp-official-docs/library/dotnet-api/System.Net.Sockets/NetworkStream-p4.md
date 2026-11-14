---
title: "NetworkStream class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/NetworkStream.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkStream class (part 4 of 4)

## NetworkStream.WriteAsync(Byte>, CancellationToken) method

```csharp
public override System.Threading.Tasks.ValueTask WriteAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Writes data to the `NetworkStream` from a read-only memory byte memory range as an asynchronous operation.

Parameters:

- `buffer`: A region of memory that contains the data to write to the `NetworkStream`.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous write operation.

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support writing.
- `IOException`: An error occurred when accessing the socket.

-or-

There was a failure while writing to the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method sends all bytes in `buffer` to the network.

> **Note:**
> Check to see if the `NetworkStream` is writable by calling the `CanWrite` property. If you attempt to write to a `NetworkStream` that is not writable, you will get an `InvalidOperationException`.

> **Note:**
> If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## NetworkStream.WriteAsync(Byte[], Int32, Int32, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteAsync (byte[] buffer, int offset, int count, System.Threading.CancellationToken <example-value>);
```

Writes data to the `NetworkStream` from the specified range of a byte array as an asynchronous operation.

Parameters:

- `buffer`: A byte array that contains the data to write to the `NetworkStream`.
- `offset`: The location in `buffer` from which to start writing data.
- `count`: The number of bytes to write to the `NetworkStream`.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A task that represents the asynchronous write operation.

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
- `IOException`: There was a failure while writing to the network.

-or-

An error occurred when accessing the socket.
- `ObjectDisposedException`: The `NetworkStream` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This method starts at the specified `offset` and sends `count` bytes from the contents of `buffer` to the network.

> **Note:**
> Check to see if the `NetworkStream` is writable by calling the `CanWrite` property. If you attempt to write to a `NetworkStream` that is not writable, you will get an `InvalidOperationException`.

> **Note:**
> If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Write`.

## NetworkStream.WriteByte(Byte) method

```csharp
public override void WriteByte (byte value);
```

Writes a byte to the current position in the `NetworkStream` and advances the position within the stream by one byte.

Parameters:

- `value`: The byte to write to the stream.

Exceptions:

- `InvalidOperationException`: The `NetworkStream` does not support writing.
- `IOException`: An error occurred when accessing the socket.

-or-

There was a failure while writing to the network.
- `ObjectDisposedException`: The `NetworkStream` is closed.

> **Note:**
> Check to see if the `NetworkStream` is writable by calling the `CanWrite` property. If you attempt to write to a `NetworkStream` that is not writable, you will get an `InvalidOperationException`.

> **Note:**
> If you receive an `IOException`, check the `InnerException` property to determine if it was caused by a `SocketException`. If so, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.
