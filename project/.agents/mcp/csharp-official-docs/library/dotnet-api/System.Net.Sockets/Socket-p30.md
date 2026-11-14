---
title: "Socket class (part 30 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 30 of 33)

## Socket.SendPacketsAsync(SocketAsyncEventArgs) method

```csharp
public bool SendPacketsAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Sends a collection of files or in memory data buffers asynchronously to a connected `Socket` object.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `FileNotFoundException`: The file specified in the `SendPacketsElement.FilePath` property was not found.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `NotSupportedException`: The `Socket` is not connected to a remote host.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: A connectionless `Socket` is being used and the file being sent exceeds the maximum packet size of the underlying transport.

#### Remarks
The `Socket.SendPacketsAsync` method is used to send a collection of files or in memory data buffers to remote host. The `Socket` must already be connected to the remote host.

If a `SendPacketsElement` references a file in the working directory, it may be identified with just the name of the file; otherwise, the full path and name of the file must be specified. Wildcards and UNC share names are supported. If the file is not found, `FileNotFoundException` is thrown.

To be notified of completion, you must create a callback method that implements the EventHandler\<SocketAsyncEventArgs> delegate and attach the callback to the `Completed` event.

The `SendPacketsFlags` property on the `e` parameter provides the Window Sockets service provider with additional information about the file transfer. For more information about how to use this parameter, see `TransmitFileOptions`.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.SendPacketsElements`

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.SendPacketsAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

This method uses the TransmitPackets function found in the Windows Sockets 2 API. For more information about the TransmitPackets function and its flags, see the Windows Sockets documentation.

Although intended for connection-oriented protocols, the `Socket.SendPacketsAsync` method also works for connectionless protocols, provided that you first call the `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method to establish a default remote host. With connectionless protocols, you must also be sure that the size of your file does not exceed the maximum packet size of the underlying service provider. If it does, the datagram is not sent and `Socket.SendPacketsAsync` throws a `SocketException` exception.

The `Socket.SendPacketsAsync` method is optimized according to the operating system on which it is used. On Windows server editions, the `Socket.SendPacketsAsync` method is optimized for high performance.

On Windows client editions, the `Socket.SendPacketsAsync` method is optimized for minimum memory and resource utilization.

Use of the `UseKernelApc` flag in the `SendPacketsFlags` property on the `e` parameter can deliver significant performance benefits. If the thread initiating the `Socket.SendPacketsAsync` method call is being used for heavy computations, it is possible, though unlikely, that APCs could be prevented from launching. Note that there is a difference between kernel and user-mode APCs. Kernel APCs launch when a thread is in a wait state. User-mode APCs launch when a thread is in an alertable wait state

## Socket.SendTo(Byte[], EndPoint) method

```csharp
public int SendTo (byte[] buffer, System.Net.EndPoint remoteEP);
```

Sends data to the specified endpoint.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `remoteEP`: The `EndPoint` that represents the destination for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
In this overload, the buffer offset defaults to 0, the number of bytes to send defaults to the size of the `buffer` parameter, and the `SocketFlags` value defaults to 0.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.Connect` method prior to calling `Socket.SendTo`. You only need to do this if you intend to call the `Socket.Send` method. If you do call the `Socket.Connect` method prior to calling `Socket.SendTo`, the `remoteEP` parameter will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method, because the underlying service provider will assign the most appropriate local network address and port number. If you need to identify the assigned local network address and port number, you can use the `LocalEndPoint` property after the `Socket.SendTo` method successfully completes.

Although intended for connectionless protocols, `Socket.SendTo` also works with connection-oriented protocols. If you are using a connection-oriented protocol, you must first establish a remote host connection by calling the `Socket.Connect` method or accept an incoming connection request using the `Socket.Accept` method. If you do not establish or accept a remote host connection, `Socket.SendTo` will throw a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.SendTo` method. In either of these cases, `Socket.SendTo` will ignore the `remoteEP` parameter and only send data to the connected or default remote host.

Blocking sockets will block until the all of the bytes in the buffer are sent. Since a nonblocking `Socket` completes immediately, it might not send all of the bytes in the `buffer`. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends all of the bytes in the `buffer`. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.SendTo` method means that the underlying system has had room to buffer your data for a network send.

If you are using a connectionless protocol in blocking mode, `Socket.SendTo` will block until the datagram is sent. If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`. You must also be sure that the number of bytes sent does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.SendTo` will throw a `SocketException`.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example sends a connectionless datagram to the specified remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.SendTo(Byte>, EndPoint) method

```csharp
public int SendTo (ReadOnlySpan<byte> buffer, System.Net.EndPoint remoteEP);
```

Sends data to the specified endpoint.

Parameters:

- `buffer`: A span of bytes that contains the data to be sent.
- `remoteEP`: The `EndPoint` that represents the destination for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.SendTo(Byte[], SocketFlags, EndPoint) method

```csharp
public int SendTo (byte[] buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends data to a specific endpoint using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: The `EndPoint` that represents the destination location for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
In this overload, the buffer offset defaults to 0, and the number of bytes to send defaults to the size of the `buffer`. If you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you do not need to establish a default remote host with the `Socket.Connect` method prior to calling `Socket.SendTo`. You only need to do this if you intend to call the `Socket.Send` method. If you do call the `Socket.Connect` method prior to calling `Socket.SendTo`, the `remoteEP` parameter will override the specified default remote host for that send operation only. You are also not required to call the `Socket.Bind` method, because the underlying service provider will assign the most appropriate local network address and port number. If you need to identify the assigned local network address and port number, you can use the `LocalEndPoint` property after the `Socket.SendTo` method successfully completes.

Although intended for connectionless protocols, `Socket.SendTo` also works with connection-oriented protocols. If you are using a connection-oriented protocol, you must first establish a remote host connection by calling the `Socket.Connect` method or accept an incoming connection request using the `Socket.Accept` method. If you do not establish or accept a remote host connection, `Socket.SendTo` will throw a `SocketException`. You can also establish a default remote host for a connectionless protocol prior to calling the `Socket.SendTo` method. In either of these cases, `Socket.SendTo` will ignore the `remoteEP` parameter and only send data to the connected or default remote host.

Blocking sockets will block until the requested all of the bytes in the `buffer` are sent. Since a nonblocking `Socket` completes immediately, it might not send all of the bytes in the `buffer`. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends all of the bytes in the `buffer`. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of out-going data is collected. A successful completion of the `Socket.SendTo` method means that the underlying system has had room to buffer your data for a network send.

If you are using a connectionless protocol in blocking mode, `Socket.SendTo` will block until the datagram is sent. If you want to send data to a broadcast address, you must first call the `Socket.SetSocketOption` method and set the socket option to `Broadcast`. You must also be sure that the number of bytes sent does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.SendTo` will throw a `SocketException`.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example sends a connectionless datagram to the specified remote host. `SocketFlags` are passed to the `Socket.SendTo` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.SendTo(Byte>, SocketFlags, EndPoint) method

```csharp
public int SendTo (ReadOnlySpan<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends data to a specific endpoint using the specified `SocketFlags`.

Parameters:

- `buffer`: A span of bytes that contains the data to be sent.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: The `EndPoint` that represents the destination for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.SendTo(Byte>, SocketFlags, SocketAddress) method

```csharp
public int SendTo (ReadOnlySpan<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.SocketAddress socketAddress);
```

Sends data to a specific endpoint using the specified `SocketFlags`.

Parameters:

- `buffer`: A span of bytes that contains the data to be sent.
- `socketFlags`: A bitwise combination of the `SocketFlags` values that will be used when sending the data.
- `socketAddress`: The `SocketAddress` that represents the destination for the data.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `socketAddress` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
