---
title: "Socket class (part 20 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 20 of 33)

## Socket.Receive(Byte>, SocketFlags, SocketError) method

```csharp
public int Receive (Span<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Receives data from a bound `Socket` into a receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: A span of bytes that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the enumeration values that specifies send and receive behaviors.
- `errorCode`: When this method returns, contains one of the enumeration values that defines error codes for the socket.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks

The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer. The buffer offset defaults to 0, the size defaults to the length of the buffer parameter, and the `SocketFlags` value defaults to `None`.

If you're using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you're using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. When the time-out value is exceeded, the `Socket.Receive` call will throw a `SocketException`. If you're in non-blocking mode, and there's no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you're using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you're using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Receive(Byte[], Int32, Int32, SocketFlags) method

```csharp
public int Receive (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags);
```

Receives the specified number of bytes from a bound `Socket` into the specified offset position of the receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for received data.
- `offset`: The location in `buffer` to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `SocketException`: `socketFlags` is not a valid combination of values.

-or-

The `Socket.LocalEndPoint` property was not set.

-or-

An operating system error occurs while accessing the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call will throw a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. An error occurred when attempting to access the socket. See Remarks below. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the number of bytes specified by the size parameter. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example specifies a data buffer, an offset, a size, and a socket flag before receiving data on a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.Receive(Byte[], Int32, Int32, SocketFlags, SocketError) method

```csharp
public int Receive (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Receives data from a bound `Socket` into a receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `offset`: The position in the `buffer` parameter to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call will throw a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. An error occurred when attempting to access the socket. See Remarks below. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the number of bytes specified by the size parameter. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.ReceiveAsync(Byte>) method

```csharp
public System.Threading.Tasks.Task<int> ReceiveAsync (ArraySegment<byte> buffer);
```

Receives data from a connected socket.

Parameters:

- `buffer`: The buffer for the received data.

Returns: A task that represents the asynchronous receive operation. The value of its `Task<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

To be added.

## Socket.ReceiveAsync(Byte>>) method

```csharp
public System.Threading.Tasks.Task<int> ReceiveAsync (System.Collections.Generic.IList<ArraySegment<byte>> buffers);
```

Receives data from a connected socket.

Parameters:

- `buffers`: A list of buffers for the received data.

Returns: A task that represents the asynchronous receive operation. The value of its `Task<T>.Result` property contains the total number of bytes read into the buffers between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentNullException`: The `buffers` parameter was null.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Receive`.
