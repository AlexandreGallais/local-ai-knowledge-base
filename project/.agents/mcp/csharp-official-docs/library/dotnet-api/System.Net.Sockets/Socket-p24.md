---
title: "Socket class (part 24 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 24 of 33)

## Socket.ReceiveMessageFrom(Byte[], Int32, Int32, SocketFlags, EndPoint, IPPacketInformation) method

```csharp
public int ReceiveMessageFrom (byte[] buffer, int offset, int size, ref System.Net.Sockets.SocketFlags socketFlags, ref System.Net.EndPoint remoteEP, out System.Net.Sockets.IPPacketInformation ipPacketInformation);
```

Receives the specified number of bytes of data into the specified location of the data buffer, using the specified `SocketFlags`, and stores the endpoint and packet information.

Parameters:

- `buffer`: An array of type `Byte` that is the storage location for received data.
- `offset`: The position in the `buffer` parameter to store the received data.
- `size`: The number of bytes to receive.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: A reference to an `EndPoint` of the same type as the endpoint of the remote host to be updated on successful receive.
- `ipPacketInformation`: An `IPPacketInformation` holding address and interface information.

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

.NET is running on an AMD 64-bit processor.

-or-

An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Socket.ReceiveMessageFrom` method reads data into the `buffer` parameter, returns the number of bytes successfully read, and captures the remote host endpoint from which the data was sent, as well as information about the received packet.

The `Socket.ReceiveMessageFrom` method is used primarily to receive message data on a connectionless socket. The socket's local address must be known. This method can only be used with datagram and raw sockets. The socket must be initialized with the socket type set to `Dgram` or `Raw` before calling this method. This can be done when the socket is constructed using `Socket.%23ctor`.

For message-oriented sockets, an incoming message is placed into the `buffer` parameter up to the total size specified in the `size` parameter. The `offset` parameter determines where in the `buffer` the data is placed. The actual amount of data placed into the `buffer` is returned by the `Socket.ReceiveMessageFrom` method.

The `Socket.ReceiveMessageFrom` method automatically method sets the `PacketInformation` socket option to `true` the first time it is called for a given `Socket`. However, the returned `IPPacketInformation` object will only be valid for packets which arrive at the local computer after the socket option has been set. If a socket is sent packets between when it is bound to a local endpoint (explicitly by the `Socket.Bind` method or implicitly by one of the `Socket.Connect`, `Socket.ConnectAsync`, `Socket.SendTo`, or `Socket.SendToAsync` methods) and its first call to the `Socket.ReceiveMessageFrom` method, calls to `Socket.ReceiveMessageFrom` method will return invalid `IPPacketInformation` objects for these packets.

To ensure that all `IPPacketInformation` objects are valid, an application should set the `PacketInformation` socket option to `true` before it is bound to a local endpoint using the `SetSocketOption` method.

An application can examine the `ipPacketInformation` parameter if it needs to know if the datagram was sent using a unicast, multicast, or broadcast address.

> **Note:**
> The `AddressFamily` of the `EndPoint` used in `Socket.ReceiveFrom` needs to match the `AddressFamily` of the `EndPoint` used in `Socket.SendTo`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.ReceiveMessageFromAsync(SocketAsyncEventArgs) method

```csharp
public bool ReceiveMessageFromAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins to asynchronously receive the specified number of bytes of data into the specified location in the data buffer, using the specified `SocketAsyncEventArgs.SocketFlags`, and stores the endpoint and packet information.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentNullException`: The `SocketAsyncEventArgs.RemoteEndPoint` cannot be null.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
The `Socket.ReceiveMessageFromAsync` method is used primarily to receive message data on a connectionless socket. The socket's local address must be known. This method can only be used with datagram and raw sockets. The socket must be initialized with the socket type set to `Dgram` or `Raw` before calling this method. This can be done when the socket is constructed using `Socket.%23ctor`.

The caller must set the `RemoteEndPoint` property to an `EndPoint` of the same type as the endpoint of the remote host. The property will be updated on successful receive to the actual remote endpoint.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.Buffer`

- `SocketAsyncEventArgs.Count`

- `SocketAsyncEventArgs.Offset`

- `SocketAsyncEventArgs.RemoteEndPoint`

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.ReceiveMessageFromAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

For message-oriented sockets, an incoming message is placed into the buffer up to the total size of the buffer. The `SocketAsyncEventArgs.Count` and `SocketAsyncEventArgs.Offset` properties determine where in the buffer the data is placed and the amount of data.

The `Socket.ReceiveMessageFromAsync` method automatically sets the `PacketInformation` socket option to `true` the first time it is called for a given `Socket`. However, the `IPPacketInformation` object will only be valid for packets which arrive at the local computer after the socket option has been set. If a socket is sent packets between when the socket is bound to a local endpoint (explicitly by the `Socket.Bind` method or implicitly by one of the `Socket.Connect`, `Socket.ConnectAsync`, `Socket.SendTo`, or `Socket.SendToAsync` methods) and the first call to the `Socket.ReceiveMessageFromAsync` method, calls to `Socket.ReceiveMessageFromAsync` method will result in invalid `IPPacketInformation` objects for these packets.

To ensure that all `IPPacketInformation` objects are valid, an application should set the `PacketInformation` socket option to`true` before it is bound to a local endpoint using the `SetSocketOption` method.

An application can examine the resulting `IPPacketInformation` objects if it needs to know if the datagram was sent using a unicast, multicast, or broadcast address.

## Socket.ReceiveMessageFromAsync(Byte>, EndPoint) method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveMessageFromResult> ReceiveMessageFromAsync (ArraySegment<byte> buffer, System.Net.EndPoint remoteEndPoint);
```

Receives data and returns additional information about the sender of the message.

Parameters:

- `buffer`: The buffer for the received data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.

Returns: An asynchronous task that completes with a `SocketReceiveMessageFromResult` containing the number of bytes received and additional information about the sending host.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `InvalidOperationException`: You must call the Bind method before performing this operation.

To be added.

## Socket.ReceiveMessageFromAsync(Byte>, SocketFlags, EndPoint) method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveMessageFromResult> ReceiveMessageFromAsync (ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint);
```

Receives data and returns additional information about the sender of the message.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.

Returns: An asynchronous task that completes with a `SocketReceiveMessageFromResult` containing the number of bytes received and additional information about the sending host.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `InvalidOperationException`: You must call the Bind method before performing this operation.

To be added.

## Socket.ReceiveMessageFromAsync(Byte>, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.SocketReceiveMessageFromResult> ReceiveMessageFromAsync (Memory<byte> buffer, System.Net.EndPoint remoteEndPoint, System.Threading.CancellationToken <example-value> = default);
```

Receives data and returns additional information about the sender of the message.

Parameters:

- `buffer`: The buffer for the received data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: An asynchronous task that completes with a `SocketReceiveMessageFromResult` containing the number of bytes received and additional information about the sending host.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `InvalidOperationException`: You must call the Bind method before performing this operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.ReceiveMessageFromAsync(Byte>, SocketFlags, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.SocketReceiveMessageFromResult> ReceiveMessageFromAsync (Memory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint, System.Threading.CancellationToken <example-value> = default);
```

Receives data and returns additional information about the sender of the message.

Parameters:

- `buffer`: The buffer for the received data.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when receiving the data.
- `remoteEndPoint`: An endpoint of the same type as the endpoint of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: An asynchronous task that completes with a `SocketReceiveMessageFromResult` containing the number of bytes received and additional information about the sending host.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: `remoteEndPoint` is `null`.
- `InvalidOperationException`: You must call the Bind method before performing this operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
