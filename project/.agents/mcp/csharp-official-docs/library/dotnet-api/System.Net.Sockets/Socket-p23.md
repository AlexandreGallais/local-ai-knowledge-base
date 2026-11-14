---
title: "Socket class (part 23 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 23 of 33)

## Socket.ReceiveFrom(Byte[], Int32, Int32, SocketFlags, EndPoint) method

```csharp
public int ReceiveFrom (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP);
```

Receives the specified number of bytes of data into the specified location of the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for received data.
- `offset`: The position in the `buffer` parameter to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.

Returns: The number of bytes received.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: `offset` is less than 0.

-or-

`offset` is greater than the length of `buffer`.

-or-

`size` is less than 0.

-or-

`size` is greater than the length of the `buffer` minus the value of the offset parameter.
- `SocketException`: `socketFlags` is not a valid combination of values.

-or-

The `Socket.LocalEndPoint` property was not set.

-or-

An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Socket.ReceiveFrom` method reads data into the `buffer` parameter, returns the number of bytes successfully read, and captures the remote host endpoint from which the data was sent. This method is useful if you intend to receive connectionless datagrams from an unknown host or multiple hosts.

With connectionless protocols, `Socket.ReceiveFrom` will read the first enqueued datagram received into the local network buffer. If the datagram you receive is larger than the size of `buffer`, the `Socket.ReceiveFrom` method will fill `buffer` with as much of the message as is possible, and throw a `SocketException`. If you are using an unreliable protocol, the excess data will be lost. If you are using a reliable protocol, the excess data will be retained by the service provider and you can retrieve it by calling the `Socket.ReceiveFrom` method with a large enough buffer.

If no data is available for reading, the `Socket.ReceiveFrom` method will block until data is available. If you are in non-blocking mode, and there is no data available in the protocol stack buffer, the `Socket.ReceiveFrom` method will complete immediately and throw a `SocketException`. You can use the `Available` property to determine if data is available for reading. When `Socket.Available` is non-zero, retry the receive operation.

Although `Socket.ReceiveFrom` is intended for connectionless protocols, you can use a connection-oriented protocol as well. If you choose to do so, you must first either establish a remote host connection by calling the `Socket.Connect` method or accept an incoming remote host connection by calling the `Socket.Accept` method. If you do not establish or accept a connection before calling the `Socket.ReceiveFrom` method, you will get a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.ReceiveFrom` method.

With connection-oriented sockets, `Socket.ReceiveFrom` will read as much data as is available up to the amount of bytes specified by the `size` parameter. If the remote host shuts down the `Socket` connection with the `Socket.Shutdown` method, and all available data has been Received, the `Socket.ReceiveFrom` method will complete immediately and return zero bytes.

> **Note:**
> Before calling `Socket.ReceiveFrom`, you must explicitly bind the `Socket` to a local endpoint using the `Socket.Bind` method. If you do not, `Socket.ReceiveFrom` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The `AddressFamily` of the `EndPoint` used in `Socket.ReceiveFrom` needs to match the `AddressFamily` of the `EndPoint` used in `Socket.SendTo`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example receives a connectionless datagram from a remote host. The offset, buffer size, and `SocketFlags` are passed to the `Socket.ReceiveFrom` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.ReceiveFromAsync(SocketAsyncEventArgs) method

```csharp
public bool ReceiveFromAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins to asynchronously receive data from a specified network device.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentNullException`: The `SocketAsyncEventArgs.RemoteEndPoint` cannot be null.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
The `Socket.ReceiveFromAsync` method is used primarily to receive data on a connectionless socket. The socket's local address must be known.

The caller must set the `RemoteEndPoint` property to an `EndPoint` of the same type as the endpoint of the remote host. The property will be updated on successful receive to the actual remote endpoint.

The `SocketFlags` property on the `e` parameter provides the Window Sockets service provider with additional information about the read request. For more information about how to use this parameter, see `SocketFlags`.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.Buffer`

- `SocketAsyncEventArgs.Count`

- `SocketAsyncEventArgs.Offset`

- `SocketAsyncEventArgs.RemoteEndPoint`

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.ReceiveFromAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

For message-oriented sockets, an incoming message is placed into the buffer up to the total size of the buffer. The `SocketAsyncEventArgs.Count` and `SocketAsyncEventArgs.Offset` properties determine where in the buffer the data is placed and the amount of data.

For byte stream-style sockets, incoming data is placed into the buffer until the buffer is filled, the connection is closed, or the internally buffered data is exhausted. The `SocketAsyncEventArgs.Count` and `SocketAsyncEventArgs.Offset` properties determine where in the buffer the data is placed and the amount of data.

## Socket.ReceiveFromAsync(Byte>, EndPoint) method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveFromResult> ReceiveFromAsync (ArraySegment<byte> buffer, System.Net.EndPoint remoteEndPoint);
```

Receives data and returns the endpoint of the sending host.

Parameters:

- `buffer`: The buffer for the received data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.

Returns: An asynchronous task that completes with a `SocketReceiveFromResult` containing the number of bytes received and the endpoint of the sending host.

Exceptions:

- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

To be added.

## Socket.ReceiveFromAsync(Byte>, SocketFlags, EndPoint) method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveFromResult> ReceiveFromAsync (ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint);
```

Receives data and returns the endpoint of the sending host.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.

Returns: An asynchronous task that completes with a `SocketReceiveFromResult` containing the number of bytes received and the endpoint of the sending host.

Exceptions:

- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

To be added.

## Socket.ReceiveFromAsync(Byte>, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.SocketReceiveFromResult> ReceiveFromAsync (Memory<byte> buffer, System.Net.EndPoint remoteEndPoint, System.Threading.CancellationToken <example-value> = default);
```

Receives data and returns the endpoint of the sending host.

Parameters:

- `buffer`: The buffer for the received data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: An asynchronous task that completes with a `SocketReceiveFromResult` containing the number of bytes received and the endpoint of the sending host.

Exceptions:

- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveFromAsync(Byte>, SocketFlags, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.SocketReceiveFromResult> ReceiveFromAsync (Memory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint, System.Threading.CancellationToken <example-value> = default);
```

Receives data and returns the endpoint of the sending host.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: An asynchronous task that completes with a `SocketReceiveFromResult` containing the number of bytes received and the endpoint of the sending host.

Exceptions:

- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveFromAsync(Byte>, SocketFlags, SocketAddress, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> ReceiveFromAsync (Memory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.SocketAddress receivedAddress, System.Threading.CancellationToken <example-value> = default);
```

Receives a datagram into the data buffer, using the specified `SocketFlags`, and stores the endpoint.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values that will be used when receiving the data.
- `receivedAddress`: A `SocketAddress` instance that gets updated with the value of the remote peer when this method returns.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: An asynchronous task that completes with a `SocketReceiveFromResult` containing the number of bytes received and the endpoint of the sending host.

Exceptions:

- `ArgumentNullException`: `receivedAddress` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveMessageFrom(Byte>, SocketFlags, EndPoint, IPPacketInformation) method

```csharp
public int ReceiveMessageFrom (Span<byte> buffer, ref System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP, out System.Net.Sockets.IPPacketInformation ipPacketInformation);
```

Receives the specified number of bytes of data into the specified location of the data buffer, using the specified `socketFlags`, and stores the endpoint and packet information.

Parameters:

- `buffer`: An `Span<T>` of type `Byte` that is the storage location for received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.
- `ipPacketInformation`: An `IPPacketInformation` holding address and interface information.

Returns: The number of bytes received.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: The `EndPoint` remoteEP is `null`.
- `ArgumentException`: The `Socket.AddressFamily` of the `EndPoint` used in `Socket.ReceiveMessageFrom` needs to match the `Socket.AddressFamily` of the `EndPoint` used in SendTo.
- `InvalidOperationException`: The `Socket` object is not in blocking mode and cannot accept this synchronous call.
You must call the Bind method before performing this operation.

To be added.
