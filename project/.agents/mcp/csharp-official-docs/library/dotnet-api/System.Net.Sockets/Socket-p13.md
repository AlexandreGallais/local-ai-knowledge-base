---
title: "Socket class (part 13 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 13 of 33)

## Socket.ConnectAsync(SocketAsyncEventArgs) method

```csharp
public bool ConnectAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins an asynchronous request for a connection to a remote host.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentException`: An argument is not valid. This exception occurs if multiple buffers are specified, the `SocketAsyncEventArgs.BufferList` property is not null.
- `ArgumentNullException`: The `e` parameter cannot be null and the `SocketAsyncEventArgs.RemoteEndPoint` cannot be null.
- `InvalidOperationException`: The `Socket` is listening or a socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `SocketException`: An error occurred when attempting to access the socket.
- `NotSupportedException`: The local endpoint and the `SocketAsyncEventArgs.RemoteEndPoint` are not the same address family.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

#### Remarks
If you are using a connection-oriented protocol, the `Socket.ConnectAsync` method starts an asynchronous request for a connection to the remote host. If you are using a connectionless protocol, `Socket.ConnectAsync` establishes a default remote host.

To be notified of completion, you must create a callback method that implements the EventHandler\<SocketAsyncEventArgs> delegate and attach the callback to the `Completed` event.

The caller must set the `RemoteEndPoint` property to the `IPEndPoint` of the remote host to connect to.

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.ConnectAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

If you are using a connectionless protocol such as UDP, you do not have to call `Socket.ConnectAsync` before sending and receiving data. You can use `Socket.SendToAsync` and `Socket.ReceiveFromAsync` to communicate with a remote host. If you do call `Socket.ConnectAsync`, any datagrams that arrive from an address other than the specified default will be discarded. If you want to change the default remote host, call the `Socket.ConnectAsync` method again with the desired endpoint.

If you wish to set the default remote host to a broadcast address, you must first call `Socket.SetSocketOption` and set Broadcast to `true`. If this is not done, the `Socket.ConnectAsync` method will throw a `SocketException`.

The following properties and events on the `SocketAsyncEventArgs` object are required:

- `Completed`
- `SocketAsyncEventArgs.RemoteEndPoint`

Optionally, a buffer may be provided that will atomically be sent on the socket after the `Socket.ConnectAsync` method succeeds. In this case, the `Buffer` property needs to be set to the buffer containing the data to send and the `Count` property needs to be set to the number of bytes of data to send from the buffer. Once a connection is established, this buffer of data is sent.

If you are using a connection-oriented protocol and do not call `Socket.Bind` before calling `Socket.ConnectAsync`, the underlying service provider will assign the most appropriate local network address and port number.

If you are using a connectionless protocol, the service provider will not assign a local network IP address and port number until you call the `Socket.SendAsync` or `Socket.ReceiveAsync` methods.

The `Socket.ConnectAsync` method throws `NotSupportedException` if the address family of the `Socket` and the `SocketAsyncEventArgs.RemoteEndPoint` are not the same address family.

> **Note:**
> If you receive a `SocketException` when calling this method, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## Socket.ConnectAsync(EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.EndPoint remoteEP, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host.

Parameters:

- `remoteEP`: The endpoint to connect to.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `remoteEP` parameter cannot be null.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `NotSupportedException`: The local endpoint and the `remoteEP` parameter are not the same address family.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(IPAddress, Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.IPAddress address, int port);
```

Establishes a connection to a remote host.

Parameters:

- `address`: The IPAddress of the remote host to connect to.
- `port`: The port on the remote host to connect to.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `address` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(IPAddress[], Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.IPAddress[] addresses, int port);
```

Establishes a connection to a remote host.

Parameters:

- `addresses`: A list of IPAddresses for the remote host that will be used to attempt to connect to the remote host.
- `port`: The port on the remote host to connect to.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter cannot be null.
- `ArgumentException`: The `addresses` parameter cannot be empty array.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(String, Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (string host, int port);
```

Establishes a connection to a remote host.

Parameters:

- `host`: The hostname of the remote host to connect to.
- `port`: The port on the remote host to connect to.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `host` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(IPAddress, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.IPAddress address, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host.

Parameters:

- `address`: The IPAddress of the remote host to connect to.
- `port`: The port on the remote host to connect to.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `address` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(IPAddress[], Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.IPAddress[] addresses, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host.

Parameters:

- `addresses`: A list of IPAddresses for the remote host that will be used to attempt to connect to the remote host.
- `port`: The port on the remote host to connect to.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes when the connection is established.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter cannot be null.
- `ArgumentException`: The `addresses` parameter cannot be empty array.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.
