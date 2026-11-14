---
title: "Socket class (part 14 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 14 of 33)

## Socket.ConnectAsync(SocketType, ProtocolType, SocketAsyncEventArgs) method

```csharp
public static bool ConnectAsync (System.Net.Sockets.SocketType socketType, System.Net.Sockets.ProtocolType protocolType, System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins an asynchronous request for a connection to a remote host.

Parameters:

- `socketType`: One of the `SocketType` values.
- `protocolType`: One of the `ProtocolType` values.
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
If you are using a connection-oriented protocol, the M:System.Net.Sockets.Socket.ConnectAsync(System.Net.Sockets.SocketType,System.Net.Sockets.ProtocolType,System.Net.Sockets.SocketAsyncEventArgs) method starts an asynchronous request for a connection to the remote host. If you are using a connectionless protocol, `Socket.ConnectAsync` establishes a default remote host specified by the `socketType` and `protocolType` parameters.

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

## Socket.ConnectAsync(String, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (string host, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host.

Parameters:

- `host`: The hostname of the remote host to connect to.
- `port`: The port on the remote host to connect to.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

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
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Connect`.

## Socket.ConnectAsync(SocketType, ProtocolType, SocketAsyncEventArgs, ConnectAlgorithm) method

```csharp
public static bool ConnectAsync (System.Net.Sockets.SocketType socketType, System.Net.Sockets.ProtocolType protocolType, System.Net.Sockets.SocketAsyncEventArgs e, System.Net.Sockets.ConnectAlgorithm connectAlgorithm);
```

To be added.

Parameters:

- `socketType`: To be added.
- `protocolType`: To be added.
- `e`: To be added.
- `connectAlgorithm`: To be added.

Returns: To be added.

To be added.

## Socket.Disconnect(Boolean) method

```csharp
public void Disconnect (bool reuseSocket);
```

Closes the socket connection and allows reuse of the socket.

Parameters:

- `reuseSocket`: `true` if this socket can be reused after the current connection is closed; otherwise, `false`.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
If you are using a connection-oriented protocol, you can use this method to close the socket. This method ends the connection and sets the `Connected` property to `false`. However, if `reuseSocket` is `true`, you can reuse the socket.

To ensure that all data is sent and received before the socket is closed, you should call `Socket.Shutdown` before calling the `Socket.Disconnect` method.

If you need to call `Socket.Disconnect` without first calling `Socket.Shutdown`, you can set the `DontLinger``Socket` option to `false` and specify a nonzero time-out interval to ensure that data queued for outgoing transmission is sent. `Socket.Disconnect` then blocks until the data is sent or until the specified time-out expires. If you set `DontLinger` to `false` and specify a zero time-out interval, `Socket.Close` releases the connection and automatically discards outgoing queued data.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example creates a socket for synchronous communication and sends some data to a remote host. It then calls `Socket.Shutdown`, to stop the send and receive activity, and `Socket.Disconnect`, to close the socket connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginAccept/nclsocketenhancements.cs._
## Socket.DisconnectAsync(SocketAsyncEventArgs) method

```csharp
public bool DisconnectAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins an asynchronous request to disconnect from a remote endpoint.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. In this case, The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentNullException`: The `e` parameter cannot be null.
- `InvalidOperationException`: A socket operation was already in progress using the `SocketAsyncEventArgs` object specified in the `e` parameter.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
When using a connection-oriented protocol, calling the `Socket.DisconnectAsync` method requests a disconnect from a remote endpoint. If you set `SocketAsyncEventArgs.DisconnectReuseSocket` to `true` in the `e` parameter, the socket can be reused.

## Socket.DisconnectAsync(Boolean, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask DisconnectAsync (bool reuseSocket, System.Threading.CancellationToken <example-value> = default);
```

Disconnects a connected socket from the remote host.

Parameters:

- `reuseSocket`: Indicates whether the socket should be available for reuse after disconnect.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes when the socket is disconnected.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Disconnect`.

## Socket.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current instance of the `Socket` class.

#### Remarks
Call `Dispose` when you are finished using the `Socket`. The `Dispose` method leaves the `Socket` in an unusable state. After calling `Dispose`, you must release all references to the `Socket` so the garbage collector can reclaim the memory that the `Socket` was occupying.

For more information, see Cleaning Up Unmanaged Resources and Implementing a Dispose Method.

> **Note:**
> Always call `Dispose` before you release your last reference to the `Socket`. Otherwise, the resources it is using will not be freed until the garbage collector calls the `Socket` object's `Finalize` method.

## Socket.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `Socket`, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `Socket` references. This method invokes the `Dispose()` method of each referenced object.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.DuplicateAndClose(Int32) method

```csharp
public System.Net.Sockets.SocketInformation DuplicateAndClose (int targetProcessId);
```

Duplicates the socket reference for the target process, and closes the socket for this process.

Parameters:

- `targetProcessId`: The ID of the target process where a duplicate of the socket reference is created.

Returns: The socket reference to be passed to the target process.

Exceptions:

- `PlatformNotSupportedException`: The current operating system is not Windows.
- `SocketException`: `targetProcessId` is not a valid process id.

-or-

Duplication of the socket reference failed.

#### Remarks

The target process should use the `%23ctor` constructor to create the duplicate socket instance.

Do not call the `%23ctor` constructor multiple times using the same byte array in the `SocketInformation` argument in each call. If you do, you'll have multiple managed `Socket` instances with the same underlying socket, which is strongly discouraged.

`DuplicateAndClose` has limited support on Windows. Unlike on .NET Framework, the `UseOnlyOverlappedIO` property is a NOP, therefore the process creating the socket must never call asynchronous methods on the socket. A call to an asynchronous operation will always bind it to an I/O completion port of the creating process, which may cause an `ArgumentNullException` to be thrown in the target process.
