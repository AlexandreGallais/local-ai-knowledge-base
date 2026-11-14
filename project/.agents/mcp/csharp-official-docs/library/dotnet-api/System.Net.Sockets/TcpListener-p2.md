---
title: "TcpListener class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpListener class (part 2 of 3)

## TcpListener.AcceptSocketAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.Socket> AcceptSocketAsync (System.Threading.CancellationToken <example-value>);
```

Accepts a pending connection request as a cancellable asynchronous operation.

Parameters:

- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `Socket` used to send and receive data.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the socket connection has been accepted.

The `Socket` returned in `Task<T>` is initialized with the IP address and port number of the remote host. You can use any of the `Socket.Send` and `Socket.Receive` methods available in the `Socket` class to communicate with the remote host. When you are finished using the `Socket`, be sure to call its `Socket.Close` method. If your application is relatively simple, consider using the `TcpListener.AcceptTcpClient` method rather than the `TcpListener.AcceptSocketAsync` method. `TcpClient` provides you with simple methods for sending and receiving data over a network in blocking synchronous mode.

> **Note:**
> This member outputs trace information when you enable network tracing in your application. This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AcceptSocket`.

## TcpListener.AcceptTcpClient() method

```csharp
public System.Net.Sockets.TcpClient AcceptTcpClient ();
```

Accepts a pending connection request.

Returns: A `TcpClient` used to send and receive data.

Exceptions:

- `InvalidOperationException`: The listener has not been started with a call to `TcpListener.Start`.
- `SocketException`: Use the `SocketException.ErrorCode` property to obtain the specific error code. When you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Remarks
`TcpListener.AcceptTcpClient` is a blocking method that returns a `TcpClient` that you can use to send and receive data. Use the `TcpListener.Pending` method to determine if connection requests are available in the incoming connection queue if you want to avoid blocking.

Use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream` of the returned `TcpClient`. The `NetworkStream` will provide you with methods for sending and receiving with the remote host. When you are through with the `TcpClient`, be sure to call its `TcpClient.Close` method. If you want greater flexibility than a `TcpClient` offers, consider using `TcpListener.AcceptSocket`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
In the following code example, the `TcpListener.AcceptTcpClient` method is used to return a `TcpClient`. This `TcpClient` is used to communicate with the newly connected client.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/AcceptTcpClient/source.cs._

## TcpListener.AcceptTcpClientAsync() method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.TcpClient> AcceptTcpClientAsync ();
```

Accepts a pending connection request as an asynchronous operation.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `TcpClient` used to send and receive data.

Exceptions:

- `InvalidOperationException`: The listener has not been started with a call to `TcpListener.Start`.
- `SocketException`: Use the `SocketException.ErrorCode` property to obtain the specific error code. When you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the TCP connection has been accepted.

Use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream` of the returned `TcpClient` in the `Task<T>`. The `NetworkStream` will provide you with methods for sending and receiving with the remote host. When you are through with the `TcpClient`, be sure to call its `TcpClient.Close` method. If you want greater flexibility than a `TcpClient` offers, consider using `TcpListener.AcceptSocket` or `TcpListener.AcceptSocketAsync`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application. This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AcceptTcpClient`.

## TcpListener.AcceptTcpClientAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.TcpClient> AcceptTcpClientAsync (System.Threading.CancellationToken <example-value>);
```

Accepts a pending connection request as a cancellable asynchronous operation.

Parameters:

- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns a `TcpClient` used to send and receive data.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the TCP connection has been accepted.

Use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream` of the returned `TcpClient` in the `Task<T>`. The `NetworkStream` will provide you with methods for sending and receiving with the remote host. When you are through with the `TcpClient`, be sure to call its `TcpClient.Close` method. If you want greater flexibility than a `TcpClient` offers, consider using `TcpListener.AcceptSocket` or `TcpListener.AcceptSocketAsync`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application. This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `AcceptTcpClient`.

## TcpListener.AllowNatTraversal(Boolean) method

```csharp
public void AllowNatTraversal (bool allowed);
```

Enables or disables Network Address Translation (NAT) traversal on a `TcpListener` instance.

Parameters:

- `allowed`: A Boolean value that specifies whether to enable or disable NAT traversal.

Exceptions:

- `InvalidOperationException`: The `TcpListener.AllowNatTraversal` method was called after calling the `TcpListener.Start` method

#### Remarks
The `TcpListener.AllowNatTraversal` method is used to enable or disable NAT traversal for a `TcpListener` instance. NAT traversal may be provided using Teredo, 6to4, or an ISATAP tunnel.

When the `allowed` parameter is false, the `IPProtectionLevel` option on the associated socket is set to `EdgeRestricted`. This explicitly disables NAT traversal for a `TcpListener` instance.

When the `allowed` parameter is true, the `IPProtectionLevel` option on the associated socket is set to `Unrestricted`. This may allow NAT traversal for a `TcpListener` depending on firewall rules in place on the system.

The `TcpListener.AllowNatTraversal` method must be invoked prior to calling the `TcpListener.Start` method to begin listening for incoming connection requests (before the socket is bound). If `TcpListener.AllowNatTraversal` method is called after the `TcpListener.Start` method, then an `InvalidOperationException` will be thrown.

A Teredo address is an IPv6 address with the prefix of 2001::/32. Teredo addresses can be returned through normal DNS name resolution or enumerated as an IPv6 address assigned to a local interface.

## TcpListener.BeginAcceptSocket(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginAcceptSocket (AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to accept an incoming connection attempt.

Parameters:

- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object containing information about the accept operation. This object is passed to the `callback` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous creation of the `Socket`.

Exceptions:

- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The asynchronous `TcpListener.BeginAcceptSocket` operation must be completed by calling the `TcpListener.EndAcceptSocket` method. Typically, the method is invoked by the `callback` delegate.

This method does not block until the operation completes. To block until the operation completes, use the `TcpListener.AcceptSocket` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

> **Note:**
> You can call the `RemoteEndPoint` property of the returned `Socket` to identify the remote host's network address and port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## TcpListener.BeginAcceptTcpClient(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginAcceptTcpClient (AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to accept an incoming connection attempt.

Parameters:

- `callback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object containing information about the accept operation. This object is passed to the `callback` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous creation of the `TcpClient`.

Exceptions:

- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The asynchronous `TcpListener.BeginAcceptTcpClient` operation must be completed by calling the `TcpListener.EndAcceptTcpClient` method. Typically, the method is invoked by the `callback` delegate.

This method does not block until the operation completes. To block until the operation completes, use the `TcpListener.AcceptTcpClient` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## TcpListener.Create(Int32) method

```csharp
public static System.Net.Sockets.TcpListener Create (int port);
```

Creates a new `TcpListener` instance to listen on the specified port.

Parameters:

- `port`: The port on which to listen for incoming connection attempts.

Returns: A new `TcpListener` instance to listen on the specified port.

To be added.

## TcpListener.Dispose() method

```csharp
public void Dispose ();
```

Releases all resources used by the current `TcpListener` instance.

To be added.

## TcpListener.EndAcceptSocket(IAsyncResult) method

```csharp
public System.Net.Sockets.Socket EndAcceptSocket (IAsyncResult asyncResult);
```

Asynchronously accepts an incoming connection attempt and creates a new `Socket` to handle remote host communication.

Parameters:

- `asyncResult`: An `IAsyncResult` returned by a call to the `TcpListener.BeginAcceptSocket` method.

Returns: A `Socket`.

The `Socket` used to send and receive data.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `ArgumentNullException`: The `asyncResult` parameter is `null`.
- `ArgumentException`: The `asyncResult` parameter was not created by a call to the `TcpListener.BeginAcceptSocket` method.
- `InvalidOperationException`: The `TcpListener.EndAcceptSocket` method was previously called.
- `SocketException`: An error occurred while attempting to access the `Socket`.

#### Remarks
This method blocks until the operation is complete. To perform this operation synchronously, use the `TcpListener.AcceptSocket` method.

> **Note:**
> You can call the `RemoteEndPoint` property of the returned `Socket` to identify the remote host's network address and port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
