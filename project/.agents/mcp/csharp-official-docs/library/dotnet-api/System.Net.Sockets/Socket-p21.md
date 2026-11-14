---
title: "Socket class (part 21 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 21 of 33)

## Socket.ReceiveAsync(SocketAsyncEventArgs) method

```csharp
public bool ReceiveAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins an asynchronous request to receive data from a connected `Socket` object.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentException`: An argument was invalid. The `SocketAsyncEventArgs.Buffer` or `SocketAsyncEventArgs.BufferList` properties on the `e` parameter must reference valid buffers. One or the other of these properties may be set, but not both at the same time.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
The `Socket.ReceiveAsync` method is used on connected sockets or bound connectionless sockets and is used to read incoming data. The socket's local address must be known.

For bound connectionless sockets, this function restricts the addresses from which received messages are accepted. The function only returns messages from the remote address specified in the connection. Messages from other addresses are silently discarded.

The `SocketFlags` property on the `e` parameter provides the Window Sockets service provider with additional information about the read request. For more information about how to use this parameter, see `SocketFlags`.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.Buffer` or `SocketAsyncEventArgs.BufferList`

- `SocketAsyncEventArgs.Count` if `SocketAsyncEventArgs.Buffer` is set

- `SocketAsyncEventArgs.Offset` if `SocketAsyncEventArgs.Buffer` is set

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.ReceiveAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

For byte stream-style sockets, incoming data is placed into the buffer until the buffer is filled, the connection is closed, or the internally buffered data is exhausted.

For message-oriented sockets, an incoming message is placed into the buffer up to the total size of the buffer associated with the `e` parameter. If the message is larger than the buffer, the buffer is filled with the first part of the message.

For connection-oriented sockets, the `Socket.ReceiveAsync` method can indicate the graceful termination of the virtual circuit in one of two ways that depend on whether the socket is byte stream or message oriented. For byte streams, zero bytes having been read indicates graceful closure and that no more bytes will ever be read. For message-oriented sockets, where a zero byte message is often allowable, a `SocketException` with the `SocketAsyncEventArgs.SocketError` set to the native Winsock WSAEDISCON error code (10101) is used to indicate graceful closure. In any case, a `SocketException` with the `SocketAsyncEventArgs.SocketError` set to the native Winsock WSAECONNRESET error code (10054) indicates an abortive close has occurred.

## Socket.ReceiveAsync(Byte>, SocketFlags) method

```csharp
public System.Threading.Tasks.Task<int> ReceiveAsync (ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a connected socket.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.

Returns: A task that represents the asynchronous receive operation. The value of its `Task<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

To be added.

## Socket.ReceiveAsync(Byte>>, SocketFlags) method

```csharp
public System.Threading.Tasks.Task<int> ReceiveAsync (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a connected socket.

Parameters:

- `buffers`: A list of buffers for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.

Returns: A task that represents the asynchronous receive operation. The value of its `Task<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ArgumentNullException`: The `buffers` parameter was null.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Receive`.

## Socket.ReceiveAsync(Byte>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> ReceiveAsync (Memory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Receives data from a connected socket.

Parameters:

- `buffer`: The buffer for the received data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: A `ValueTask<T>` that represents the asynchronous receive operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveAsync(Byte>, SocketFlags, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> ReceiveAsync (Memory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Threading.CancellationToken <example-value> = default);
```

Receives data from a connected socket.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: A `ValueTask<T>` that represents the asynchronous receive operation. The value of its `ValueTask<T>.Result` property contains the total number of bytes read into `buffer` between zero (0) and the number of bytes requested. The result value is zero (0) only if zero bytes were requested or if no more bytes are available because the peer socket performed a graceful shutdown. If zero bytes are requested, receive operations may complete immediately or may not complete until at least one byte is available (but without consuming any data).

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveFrom(Byte[], EndPoint) method

```csharp
public int ReceiveFrom (byte[] buffer, ref System.Net.EndPoint remoteEP);
```

Receives a datagram into the data buffer and stores the endpoint.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for received data.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
The `Socket.ReceiveFrom` method reads data into the `buffer` parameter, returns the number of bytes successfully read, and captures the remote host endpoint from which the data was sent. This method is useful if you intend to receive connectionless datagrams from an unknown host or multiple hosts.

This overload only requires you to provide a receive `buffer`, and an `EndPoint` that represents the remote host. The buffer offset defaults to 0. The size defaults to the length of the `buffer` parameter and the `socketFlags` value defaults to `None`.

> **Note:**
> Before calling `Socket.ReceiveFrom`, you must explicitly bind the `Socket` to a local endpoint using the `Socket.Bind` method. If you do not, `Socket.ReceiveFrom` will throw a `SocketException`.

With connectionless protocols, `Socket.ReceiveFrom` will read the first enqueued datagram received into the local network buffer. If the datagram you receive is larger than the size of `buffer`, the `Socket.ReceiveFrom` method will fill `buffer` with as much of the message as is possible, and throw a `SocketException`. If you are using an unreliable protocol, the excess data will be lost. If you are using a reliable protocol, the excess data will be retained by the service provider and you can retrieve it by calling the `Socket.ReceiveFrom` method with a large enough buffer.

If no data is available for reading, the `Socket.ReceiveFrom` method will block until data is available. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.ReceiveFrom` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

Although `Socket.ReceiveFrom` is intended for connectionless protocols, you can use a connection-oriented protocol as well. If you choose to do so, you must first either establish a remote host connection by calling the `Socket.Connect` method or accept an incoming remote host connection by calling the `Socket.Accept` method. If you do not establish or accept a connection before calling the `Socket.ReceiveFrom` method, you will get a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.ReceiveFrom` method.

With connection-oriented sockets, `Socket.ReceiveFrom` will read as much data as is available up to the size of `buffer`. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been received, the `Socket.ReceiveFrom` method will complete immediately and return zero bytes.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The `AddressFamily` of the `EndPoint` used in `Socket.ReceiveFrom` needs to match the `AddressFamily` of the `EndPoint` used in `Socket.SendTo`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example receives a connectionless datagram from a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.ReceiveFrom(Byte>, EndPoint) method

```csharp
public int ReceiveFrom (Span<byte> buffer, ref System.Net.EndPoint remoteEP);
```

Receives a datagram into the data buffer and stores the endpoint.

Parameters:

- `buffer`: A span of bytes that is the storage location for received data.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
