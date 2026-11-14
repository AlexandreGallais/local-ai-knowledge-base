---
title: "Socket class (part 4 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 4 of 33)

## Socket.AcceptAsync(SocketAsyncEventArgs) method

```csharp
public bool AcceptAsync (System.Net.Sockets.SocketAsyncEventArgs e);
```

Begins an asynchronous operation to accept an incoming connection attempt.

Parameters:

- `e`: The `SocketAsyncEventArgs` object to use for this asynchronous socket operation.

Returns: `true` if the I/O operation is pending. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will be raised upon completion of the operation.

`false` if the I/O operation completed synchronously. The `SocketAsyncEventArgs.Completed` event on the `e` parameter will not be raised and the `e` object passed as a parameter may be examined immediately after the method call returns to retrieve the result of the operation.

Exceptions:

- `ArgumentException`: An argument is not valid. This exception occurs if the buffer provided is not large enough. The buffer must be at least 2 * (sizeof(SOCKADDR_STORAGE + 16)) bytes.

This exception also occurs if multiple buffers are specified, the `SocketAsyncEventArgs.BufferList` property is not null.
- `ArgumentOutOfRangeException`: An argument is out of range. The exception occurs if the `SocketAsyncEventArgs.Count` is less than 0.
- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `Socket.AcceptAsync` method.

This exception also occurs if the socket is already connected or a socket operation was already in progress using the specified `e` parameter.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
Connection-oriented protocols can use the `Socket.AcceptAsync` method to asynchronously process incoming connection attempts. Accepting connections asynchronously gives you the ability to send and receive data within a separate execution thread. Before calling the `Socket.AcceptAsync` method, you must call the `Socket.Listen` method to listen for and queue incoming connection requests.

To be notified of completion, you must create a callback method that implements the EventHandler\<SocketAsyncEventArgs> delegate and hook it to the `Completed` event.

The following properties and events on the `SocketAsyncEventArgs` object are required:

- `Completed`

The caller can optionally specify an existing `Socket` to use for the incoming connection by specifying the `Socket` to use with the `AcceptSocket` property.

If the `AcceptSocket` property is null, a new `Socket` is constructed with the same `Socket.AddressFamily`, `Socket.SocketType`, and `Socket.ProtocolType` as the current `Socket` and set as the `AcceptSocket` property.

The caller may set the `UserToken` property to any user state object desired before calling the `Socket.AcceptAsync` method, so that the information will be retrievable in the callback method. If the callback needs more information than a single object, a small class can be created to hold the other required state information as members.

Optionally, a buffer may be provided in which to receive the initial block of data on the socket after the `Socket.ConnectAsync` method succeeds. In this case, the `Buffer` property needs to be set to the buffer containing the data to receive and the `Count` property needs to be set to the maximum number of bytes of data to receive in the buffer. These properties can be set using the `SocketAsyncEventArgs.SetBuffer` method. Part of the buffer passed in will be consumed internally for use by the underlying Winsock AcceptEx call. This means that the amount of data returned will always be less than the value of the `Count` property on the `SocketAsyncEventArgs` instance provided. The amount of the buffer used internally varies based on the address family of the socket. The minimum buffer size required is 288 bytes. If a larger buffer size is specified, then the `Socket` will expect some extra data other than the address data received by the Winsock AcceptEx call and will wait until this extra data is received. If a timeout occurs, the connection is reset. So if extra data is expected of  a specific amount, then the buffer size should be set to the minimum buffer size plus this amount.

The completion callback method should examine the `SocketError` property to determine if the `Socket.AcceptAsync` operation was successful.

The `Completed` event can occur in some cases when no connection has been accepted and cause the `SocketError` property to be set to `ConnectionReset`. This can occur as a result of port scanning using a half-open SYN type scan (a SYN -> SYN-ACK -> RST sequence). Applications using the `Socket.AcceptAsync` method should be prepared to handle this condition.

## Socket.AcceptAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.Socket> AcceptAsync (System.Threading.CancellationToken <example-value>);
```

Accepts an incoming connection.

Parameters:

- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the accepted Socket.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `Socket.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Accept`.

## Socket.AcceptAsync(Socket, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.Socket> AcceptAsync (System.Net.Sockets.Socket? acceptSocket, System.Threading.CancellationToken <example-value>);
```

Accepts an incoming connection.

Parameters:

- `acceptSocket`: The socket to use for accepting the connection.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the accepted Socket.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `Socket.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.BeginAccept(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginAccept (AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to accept an incoming connection attempt.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous `Socket` creation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `InvalidOperationException`: The accepting socket is not listening for connections. You must call `Socket.Bind` and `Socket.Listen` before calling `Socket.BeginAccept`.

-or-

The accepted socket is bound.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

Connection-oriented protocols can use the `Socket.BeginAccept` method to start accepting incoming connection attempts. Before calling the `Socket.BeginAccept` method, you must call the `Socket.Listen` method to listen for and queue incoming connection requests.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginAccept` in order to get notified about the completion of the accept operation. Note that if the underlying network stack completes the operation synchronously, the callback might be executed inline, during the call to `Socket.BeginAccept`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginAccept` method.

The `Socket.BeginAccept` operation must be completed by calling the `Socket.EndAccept` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `Socket.EndAccept` will block the calling thread until the operation is completed.

To cancel a pending call to the `Socket.BeginAccept` method, close the `Socket`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginAccept` method is called. A subsequent call to the `Socket.EndAccept` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> You can use the `RemoteEndPoint` property of the returned `Socket` to identify the remote host's network address and port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

## Socket.BeginAccept(Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginAccept (int receiveSize, AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to accept an incoming connection attempt and receives the first block of data sent by the client application.

Parameters:

- `receiveSize`: The number of bytes to accept from the sender.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous `Socket` creation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `InvalidOperationException`: The accepting socket is not listening for connections. You must call `Socket.Bind` and `Socket.Listen` before calling `Socket.BeginAccept`.

-or-

The accepted socket is bound.
- `ArgumentOutOfRangeException`: `receiveSize` is less than 0.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

Connection-oriented protocols can use the `Socket.BeginAccept` method to start accepting incoming connection attempts. Before calling the `Socket.BeginAccept` method, you must call the `Socket.Listen` method to listen for and queue incoming connection requests.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginAccept` in order to get notified about the completion of the accept operation. Note that if the underlying network stack completes the operation synchronously, the callback might be executed inline, during the call to `Socket.BeginAccept`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginAccept` method.

The `Socket.BeginAccept` operation must be completed by calling the `Socket.EndAccept` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `Socket.EndAccept` will block the calling thread until the operation is completed.

To cancel a pending call to the `Socket.BeginAccept` method, close the `Socket`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginAccept` method is called. A subsequent call to the `Socket.EndAccept` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> You can use the `RemoteEndPoint` property of the returned `Socket` to identify the remote host's network address and port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
