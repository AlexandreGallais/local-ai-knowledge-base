---
title: "Socket class (part 28 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 28 of 33)

## Socket.Send(Byte[], Int32, Int32, SocketFlags, SocketError) method

```csharp
public int Send (byte[] buffer, int offset, int size, System.Net.Sockets.SocketFlags socketFlags, out System.Net.Sockets.SocketError errorCode);
```

Sends the specified number of bytes of data to a connected `Socket`, starting at the specified offset, and using the specified `SocketFlags`.

Parameters:

- `buffer`: An array of type `Byte` that contains the data to be sent.
- `offset`: The position in the data buffer at which to begin sending data.
- `size`: The number of bytes to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `errorCode`: A `SocketError` object that stores the socket error.

Returns: The number of bytes sent to the `Socket`.

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

An operating system error occurs while accessing the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket.Send` synchronously sends data to the remote host specified in the `Socket.Connect` or `Socket.Accept` method and returns the number of bytes successfully sent. `Socket.Send` can be used for both connection-oriented and connectionless protocols.

In this overload, if you specify the `DontRoute` flag as the `socketflags` parameter, the data you are sending will not be routed.

If you are using a connectionless protocol, you must call `Socket.Connect` before calling this method or `Socket.Send` will throw a `SocketException`. If you are using a connection-oriented protocol, you must either use `Socket.Connect` to establish a remote host connection, or use `Socket.Accept` to accept an incoming connection.

If you are using a connectionless protocol and plan to send data to several different hosts, you should use `Socket.SendTo`. If you do not use `Socket.SendTo`, you will have to call `Socket.Connect` before each call to `Socket.Send`. It is okay to use `Socket.SendTo` even after you have established a default remote host with `Socket.Connect`. You can also change the default remote host prior to calling `Socket.Send` by making another call to `Socket.Connect`.

You must also be sure that the size does not exceed the maximum packet size of the underlying service provider. If it does, the datagram will not be sent and `Socket.Send` will throw a `SocketException`.

If you are using a connection-oriented protocol, `Socket.Send` will block until the requested number of bytes are sent, unless a time-out was set by using `Socket.SendTimeout`. If the time-out value was exceeded, the `Socket.Send` call will throw a `SocketException`. In nonblocking mode, `Socket.Send` may complete successfully even if it sends less than the number of bytes you request. It is your application's responsibility to keep track of the number of bytes sent and to retry the operation until the application sends the requested number of bytes. There is also no guarantee that the data you send will appear on the network immediately. To increase network efficiency, the underlying system may delay transmission until a significant amount of outgoing data is collected. A successful completion of the `Socket.Send` method means that the underlying system has had room to buffer your data for a network send.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> The successful completion of a send does not indicate that the data was successfully delivered. If no buffer space is available within the transport system to hold the data to be transmitted, send will block unless the socket has been placed in nonblocking mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example specifies the data buffer, an offset, a size, and `SocketFlags` for sending data to a connected `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Receive/source.cs._

## Socket.SendAsync(Byte>) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (ArraySegment<byte> buffer);
```

Sends data on a connected socket.

Parameters:

- `buffer`: The buffer for the data to send.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.SendAsync(Byte>>) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (System.Collections.Generic.IList<ArraySegment<byte>> buffers);
```

Sends data on a connected socket.

Parameters:

- `buffers`: A list of buffers for the data to send.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Send`.

## Socket.SendAsync(SocketAsyncEventArgs) method

```csharp
public bool SendAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Sends data asynchronously to a connected `Socket` object.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentException`: The `SocketAsyncEventArgs.Buffer` or `SocketAsyncEventArgs.BufferList` properties on the `e` parameter must reference valid buffers. One or the other of these properties may be set, but not both at the same time.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: The `Socket` is not yet connected or was not obtained via an `Socket.Accept`, `Socket.AcceptAsync`,or `BeginAccept`, method.

#### Remarks
The `Socket.SendAsync` method is used to write outgoing data from one or more buffers on a connection-oriented socket. This method can also be used, however, on connectionless sockets that have specified a remote host on a connect operation.

The `Socket.SendAsync` method starts an asynchronous send operation to the remote host established in the `Socket.Accept`, `Socket.AcceptAsync`, `Socket.BeginAccept`, `Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync` method.

The following properties and events on the `SocketAsyncEventArgs` object are required to successfully call this method:

- `SocketAsyncEventArgs.Buffer` or `SocketAsyncEventArgs.BufferList`

- `SocketAsyncEventArgs.Count` if `SocketAsyncEventArgs.Buffer` is set

- `SocketAsyncEventArgs.Offset` if `SocketAsyncEventArgs.Buffer` is set

- `Completed`

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.SendAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

The `Socket.SendAsync` method will throw an exception if you do not first call `Socket.Accept`, `Socket.AcceptAsync`, `Socket.BeginAccept``Socket.BeginConnect`, `Socket.Connect`, or `Socket.ConnectAsync`.

Calling the `Socket.SendAsync` method gives you the ability to send data within a separate execution thread.

For message-oriented sockets, do not exceed the maximum message size of the underlying Windows sockets service provider. If the data is too long to pass <example-value> through the underlying service provider, no data is transmitted and the `Socket.SendAsync` method throws a `SocketException` with the `SocketAsyncEventArgs.SocketError` set to the native Winsock WSAEMSGSIZE error code (10040).

Note that the successful completion of the `Socket.SendAsync` method does not indicate that the data was successfully delivered.

## Socket.SendAsync(Byte>, SocketFlags) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Sends data on a connected socket.

Parameters:

- `buffer`: The buffer for the data to send.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when sending the data.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.SendAsync(Byte>>, SocketFlags) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags);
```

Sends data on a connected socket.

Parameters:

- `buffers`: A list of buffers for the data to send.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when sending the data.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Send`.

## Socket.SendAsync(Byte>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendAsync (ReadOnlyMemory<byte> buffer, System.Threading.CancellationToken <example-value> = default);
```

Sends data on a connected socket.

Parameters:

- `buffer`: The buffer for the data to send.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.SendAsync(Byte>, SocketFlags, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendAsync (ReadOnlyMemory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Threading.CancellationToken <example-value> = default);
```

Sends data on a connected socket.

Parameters:

- `buffer`: The buffer for the data to send.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when sending the data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
