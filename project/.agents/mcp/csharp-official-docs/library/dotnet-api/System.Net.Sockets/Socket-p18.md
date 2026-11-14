---
title: "Socket class (part 18 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 18 of 33)

## Socket.Receive(Byte[]) method

```csharp
public int Receive (byte[] buffer);
```

Receives data from a bound `Socket` into a receive buffer.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer. The buffer offset defaults to 0, the size defaults to the length of the buffer parameter, and the `SocketFlags` value defaults to `None`.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call will throw a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example receives data on a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.Receive(Byte>>) method

```csharp
public int Receive (System.Collections.Generic.IList<ArraySegment<byte>> buffers);
```

Receives data from a bound `Socket` into the list of receive buffers.

Parameters:

- `buffers`: A list of `ArraySegment<T>`s of type `Byte` that contains the received data.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: The `buffers` parameter is `null`.
- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
This method reads data into the buffers parameter and returns the number of bytes successfully read. You can call from both connection-oriented and connectionless sockets.

This overload requires you to provide one or more receive buffers.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host connection established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call will throw a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first enqueued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffers` parameter, `buffers` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Receive(Byte>) method

```csharp
public int Receive (Span<byte> buffer);
```

Receives data from a bound `Socket` into a receive buffer.

Parameters:

- `buffer`: A span of bytes that is the storage location for the received data.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks

The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer. The buffer offset defaults to 0, the size defaults to the length of the buffer parameter, and the `SocketFlags` value defaults to `None`.

If you're using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection before calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you're using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. When the time-out value is exceeded, the `Socket.Receive` call will throw a `SocketException`. If you're in non-blocking mode, and there's no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you're using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you're using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost, and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Receive(Byte[], SocketFlags) method

```csharp
public int Receive (byte[] buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a bound `Socket` into a receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer and the necessary `SocketFlags`. The buffer offset defaults to 0, and the size defaults to the length of the byte parameter.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry your receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first enqueued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example specifies a data buffer, and `SocketFlags` for receiving data on a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._
