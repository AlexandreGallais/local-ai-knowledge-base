---
title: "Socket class (part 31 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 31 of 33)

## Socket.SendTo(Byte[], Int32, SocketFlags, EndPoint) method

```csharp
public int SendTo (byte[] buffer, int size, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends the specified number of bytes of data to the specified endpoint using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `size`: The number of bytes to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: The `EndPoint` that represents the destination location for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `ArgumentOutOfRangeException`: The specified `size` exceeds the size of `buffer`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
In this overload, the buffer offset defaults to 0. If you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.Connect` method prior to calling `Socket.SendTo`. You only need to do this if you intend to call the `Socket.Send` method. If you do call the `Socket.Connect` method prior to calling `Socket.SendTo`, the `remoteEP` parameter will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method, because the underlying service provider will assign the most appropriate local network address and port number. If you need to identify the assigned local network address and port number, you can use the `LocalEndPoint` property after the `Socket.SendTo` method successfully completes.

Although intended for connectionless protocols, `Socket.SendTo` also works with connection-oriented protocols. If you are using a connection-oriented protocol, you must first establish a remote host connection by calling the `Socket.Connect` method or accept an incoming connection request using the `Socket.Accept` method. If you do not establish or accept a remote host connection, `Socket.SendTo` will throw a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.SendTo` method. In either of these cases, `Socket.SendTo` will ignore the `remoteEP` parameter and only send data to the connected or default remote host.

Blocking sockets will block until the requested number of bytes are sent. Since a nonblocking `Socket` completes immediately, it might not send all of the bytes requested in a single operation. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the requested number of bytes. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of out-going data is collected. A successful completion of the `Socket.SendTo` method means that the underlying system has had room to buffer your data for a network send.

If you are using a connectionless protocol in blocking mode, `Socket.SendTo` will block until the datagram is sent. If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`. You must also be sure that the number of bytes sent does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.SendTo` will throw a `SocketException`.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example sends a connectionless datagram to the specified remote host. The size and `SocketFlags` are passed to the `Socket.SendTo` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.SendTo(Byte[], Int32, Int32, SocketFlags, EndPoint) method

```csharp
public int SendTo (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends the specified number of bytes of data to the specified endpoint, starting at the specified location in the buffer, and using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `offset`: The position in the data buffer at which to begin sending data.
- `size`: The number of bytes to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: The `EndPoint` that represents the destination location for the data.

Returns: The number of bytes sent.

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

`size` is greater than the length of `buffer` minus the value of the `offset` parameter.
- `SocketException`: `socketFlags` is not a valid combination of values.

-or-

An operating system error occurs while accessing the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

#### Remarks
In this overload, if you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.Connect` method prior to calling `Socket.SendTo`. You only need to do this if you intend to call the `Socket.Send` method. If you do call the `Socket.Connect` method prior to calling `Socket.SendTo`, the `remoteEP` parameter will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method, because the underlying service provider will assign the most appropriate local network address and port number. If you need to identify the assigned local network address and port number, you can use the `LocalEndPoint` property after the `Socket.SendTo` method successfully completes.

Although intended for connectionless protocols, `Socket.SendTo` also works with connection-oriented protocols. If you are using a connection-oriented protocol, you must first establish a remote host connection by calling the `Socket.Connect` method or accept an incoming connection request using the `Socket.Accept` method. If you do not establish or accept a remote host connection, `Socket.SendTo` will throw a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.SendTo` method. In either of these cases, `Socket.SendTo` will ignore the `remoteEP` parameter and only send data to the connected or default remote host.

Blocking sockets will block until the requested number of bytes are sent. Since a non-blocking `Socket` completes immediately, it might not send all of the bytes requested in a single operation. It is your applications responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the requested number of bytes. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of out-going data is collected. A successful completion of the `Socket.SendTo` method means that the underlying system has had room to buffer your data for a network send.

If you are using a connectionless protocol in blocking mode, `Socket.SendTo` will block until the datagram is sent. If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`. You must also be sure that the size does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.SendTo` will throw a `SocketException`.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example sends a connectionless datagram to the specified remote host. The offset, size, and `SocketFlags` are passed to the `Socket.SendTo` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.SendToAsync(SocketAsyncEventArgs) method

```csharp
public bool SendToAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Sends data asynchronously to a specific remote host.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentNullException`: The `SocketAsyncEventArgs.RemoteEndPoint` cannot be null.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: The protocol specified is connection-oriented, but the `Socket` is not yet connected.

#### Remarks
The `Socket.SendToAsync` method starts an asynchronous send operation to the remote host specified in the `RemoteEndPoint` property of the `e` parameter. Calling the `Socket.SendToAsync` method gives you the ability to send data within a separate execution thread. Although this method is intended for connectionless protocols, `Socket.SendToAsync` works with both connectionless and connection-oriented protocols.

To be notified of completion, you must create a callback method that implements the EventHandler\<SocketAsyncEventArgs> delegate and attach the callback to the `Completed` event.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.Buffer`

- `SocketAsyncEventArgs.Count`

- `SocketAsyncEventArgs.Offset`

- `SocketAsyncEventArgs.RemoteEndPoint`

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.SendToAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

If you are using a connection-oriented protocol, you must first call the `Socket.Accept`, `Socket.AcceptAsync`, `Socket.BeginAccept`, `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method. Otherwise `Socket.SendToAsync` will throw a `SocketException`. When using a connection-oriented protocol, the `Socket.SendToAsync` method will ignore the `RemoteEndPoint` property and send data to the `EndPoint` established in the `Socket.Accept`, `Socket.AcceptAsync`, `Socket.BeginAccept`, `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method prior to calling `Socket.SendToAsync`. You only need to do this if you intend to call the `Socket.BeginSend` or `Socket.SendAsync` methods. If you do call the `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method prior to calling `Socket.SendToAsync`, the `RemoteEndPoint` property will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method. In this case, the underlying service provider will assign the most appropriate local network IP address and port number. Use a port number of zero if you want the underlying service provider to select a free port. If you need to identify the assigned local network IP address and port number, you can use the `LocalEndPoint` property after the `Completed` event is signaled and the associated delegates are called.

If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option for `Broadcast` to true. You must also be sure that the size of your buffer does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.SendToAsync` will throw a `SocketException`.

If you specify the DontRoute flag in the `SocketFlags` property, the data you are sending will not be routed.

For message-oriented sockets, care must be taken not to exceed the maximum message size of the underlying transport. If the size of the buffer exceeds the maximum packet size of the underlying service provider, the datagram is not sent and `Socket.SendToAsync` will throw a `SocketException`. The successful completion of a `Socket.SendToAsync` method does not indicate that the data was successfully delivered.

## Socket.SendToAsync(Byte>, EndPoint) method

```csharp
public System.Threading.Tasks.Task<int> SendToAsync (ArraySegment<byte> buffer, System.Net.EndPoint remoteEP);
```

Sends data to the specified remote host.

Parameters:

- `buffer`: The buffer for the data to send.
- `remoteEP`: The remote host to which to send the data.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
