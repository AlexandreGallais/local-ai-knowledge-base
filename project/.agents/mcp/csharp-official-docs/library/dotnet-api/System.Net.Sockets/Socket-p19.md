---
title: "Socket class (part 19 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 19 of 33)

## Socket.Receive(Byte>>, SocketFlags) method

```csharp
public int Receive (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a bound `Socket` into the list of receive buffers, using the specified `SocketFlags`.

Parameters:

- `buffers`: A list of `ArraySegment<T>`s of type `Byte` that contains the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.

-or-

`buffers`.Count is zero.
- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
This method reads data into the `buffers` parameter and returns the number of bytes successfully read. You can call from both connection-oriented and connectionless sockets.

This overload requires you to provide one or more receive buffers. The `SocketFlags` value defaults to `None`.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host connection established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call throws a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first enqueued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffers` parameter, `buffers` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to receive data on a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/sendgeneric.cs._
## Socket.Receive(Byte>, SocketFlags) method

```csharp
public int Receive (Span<byte> buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a bound `Socket` into a receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: A span of bytes that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the enumeration values that specifies send and receive behaviors.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks

The `Socket.Receive` method reads data into the buffer parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer. The buffer offset defaults to 0, the size defaults to the length of the buffer parameter, and the `SocketFlags` value defaults to `None`.

If you're using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you're using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. When the time-out value is exceeded, the `Socket.Receive` call will throw a `SocketException`. If you're in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you're using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you're using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost, and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Receive(Byte[], Int32, SocketFlags) method

```csharp
public int Receive (byte[] buffer, int size, System.Net.Sockets.SocketFlags socketFlags);
```

Receives the specified number of bytes of data from a bound `Socket` into a receive buffer, using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.
- `ArgumentOutOfRangeException`: `size` exceeds the size of `buffer`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.Receive` method reads data into the `buffer` parameter and returns the number of bytes successfully read. You can call `Socket.Receive` from both connection-oriented and connectionless sockets.

This overload only requires you to provide a receive buffer, the number of bytes you want to receive, and the necessary `SocketFlags`.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call will throw a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, The `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry your receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the number of bytes specified by the `size` parameter. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`, `Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffer` parameter, `buffer` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following receives the data found into `buffer`, and specifies `None` for `SocketFlags`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/AddressFamily/Overview/source.cs._

## Socket.Receive(Byte>>, SocketFlags, SocketError) method

```csharp
public int Receive (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Receives data from a bound `Socket` into the list of receive buffers, using the specified `SocketFlags`.

Parameters:

- `buffers`: A list of `ArraySegment<T>`s of type `Byte` that contains the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: The total number of bytes received. The method returns zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.

-or-

`buffers`.Count is zero.
- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
This method reads data into the `buffers` parameter and returns the number of bytes successfully read. You can call from both connection-oriented and connectionless sockets.

This overload requires you to provide one or more receive buffers. The `SocketFlags` value defaults to `None`.

If you are using a connection-oriented protocol, you must either call `Socket.Connect` to establish a remote host connection, or `Socket.Accept` to accept an incoming connection prior to calling `Socket.Receive`. The `Socket.Receive` method will only read data that arrives from the remote host connection established in the `Socket.Connect` or `Socket.Accept` method. If you are using a connectionless protocol, you can also use the `Socket.ReceiveFrom` method. `Socket.ReceiveFrom` will allow you to receive data arriving from any host.

If no data is available for reading, the `Socket.Receive` method will block until data is available, unless a time-out value was set by using `Socket.ReceiveTimeout`. If the time-out value was exceeded, the `Socket.Receive` call throws a `SocketException`. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.Receive` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

If you are using a connection-oriented `Socket`, the `Socket.Receive` method will read as much data as is available, up to the size of the buffer. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.Receive` method will complete immediately and return zero bytes.

If you are using a connectionless `Socket`,`Socket.Receive` will read the first queued datagram from the destination address you specify in the `Socket.Connect` method. If the datagram you receive is larger than the size of the `buffers` parameter, `buffers` gets filled with the first part of the message, the excess data is lost and a `SocketException` is thrown.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
