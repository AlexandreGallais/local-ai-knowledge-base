---
title: "Socket class (part 5 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 5 of 33)

## Socket.BeginAccept(Socket, Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginAccept (System.Net.Sockets.Socket? acceptSocket, int receiveSize, AsyncCallback? callback, object? state);
```

Begins an asynchronous operation to accept an incoming connection attempt from a specified socket and receives the first block of data sent by the client application.

Parameters:

- `acceptSocket`: The accepted `Socket` object. This value may be `null`.
- `receiveSize`: The maximum number of bytes to receive.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` object that references the asynchronous `Socket` object creation.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `InvalidOperationException`: The accepting socket is not listening for connections. You must call `Socket.Bind` and `Socket.Listen` before calling `Socket.BeginAccept`.

-or-

The accepted socket is bound.
- `ArgumentOutOfRangeException`: `receiveSize` is less than 0.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

Connection-oriented protocols can use the `Socket.BeginAccept` method to start accepting incoming connection attempts. The resulting accept operation is represented by the returned `IAsyncResult` even though it may complete synchronously. Before calling the `Socket.BeginAccept` method, you must call the `Socket.Listen` method to listen for and queue incoming connection requests.

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

## Socket.BeginConnect(EndPoint, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginConnect (System.Net.EndPoint remoteEP, AsyncCallback? callback, object? state);
```

Begins an asynchronous request for a remote host connection.

Parameters:

- `remoteEP`: An `EndPoint` that represents the remote host.
- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous connection.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`, or an asynchronous operation is already in progress.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

Connection-oriented protocols can use the `Socket.BeginAccept` method to start accepting incoming connection attempts. The resulting accept operation is represented by the returned `IAsyncResult` even though it may complete synchronously. Before calling the `Socket.BeginAccept` method, you must call the `Socket.Listen` method to listen for and queue incoming connection requests.

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

## Socket.BeginConnect(IPAddress, Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginConnect (System.Net.IPAddress address, int port, AsyncCallback? requestCallback, object? state);
```

Begins an asynchronous request for a remote host connection. The host is specified by an `IPAddress` and a port number.

Parameters:

- `address`: The `IPAddress` of the remote host.
- `port`: The port number of the remote host.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the connect operation is complete.
- `state`: A user-defined object that contains information about the connect operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` that references the asynchronous connection.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ObjectDisposedException`: The `Socket` has been closed.
- `NotSupportedException`: The `Socket` is not in the socket family.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `ArgumentException`: The length of `address` is zero.
- `InvalidOperationException`: The `Socket` has been placed in a listening state by calling `Socket.Listen`, or an asynchronous operation is already in progress.

#### Remarks
> **Important:**
> This is a compatibility API. We don't recommend using the APM (`Begin*` and `End*`) methods for new development. Instead, use the `Task`-based equivalents.

If you are using a connection-oriented protocol, the `Socket.BeginConnect` method starts an asynchronous request for a connection to the endpoit specified by the `remoteEP` parameter. If you are using a connectionless protocol, `Socket.BeginConnect` establishes a default remote host.

You can pass a callback that implements `AsyncCallback` to `Socket.BeginConnect` in order to get notified about the completion of the connect operation. Note that if the underlying network stack completes the operation synchronously, the callback might be executed inline, during the call to `Socket.BeginConnect`. In this case, the `CompletedSynchronously` property on the returned `IAsyncResult` will be set to `true` to indicate that the method completed synchronously. Use the `AsyncState` property of the `IAsyncResult` to obtain the state object passed to the `Socket.BeginConnect` method.

The `Socket.BeginConnect` operation must be completed by calling the `Socket.EndConnect` method. Typically, the method is invoked by the provided `AsyncCallback` delegate. `Socket.EndConnect` will block the calling thread until the operation is completed.

If you are using a connectionless protocol such as UDP, you do not have to call `Socket.BeginConnect` before sending and receiving data. You can use `Socket.BeginSendTo` and `Socket.BeginReceiveFrom` to communicate with a remote host. If you do call `Socket.BeginConnect`, any datagrams that arrive from an address other than the specified default will be discarded. If you wish to set your default remote host to a broadcast address, you must first call `Socket.SetSocketOption` and set Broadcast to `true`. If you cannot, `Socket.BeginConnect` will throw a `SocketException`.

If you are using a connection-oriented protocol and do not call `Socket.Bind` before calling `Socket.BeginConnect`, the underlying service provider will assign the most appropriate local network address and port number. If you are using a connectionless protocol, the service provider will not assign a local network address and port number until you call the `Socket.BeginSend` or `Socket.ReceiveFrom` method. If you want to change the default remote host, call the `Socket.BeginConnect` method again with the desired endpoint.

To cancel a pending call to the `Socket.BeginConnect` method, close the `Socket`. When the `Socket.Close` method is called while an asynchronous operation is in progress, the callback provided to the `Socket.BeginConnect` method is called. A subsequent call to the `Socket.EndConnect` method will throw a `SocketException` to indicate that the operation has been cancelled.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code.

> **Note:**
> If this socket has previously been disconnected, then `Socket.BeginConnect` must be called on a thread that will not exit until the operation is complete. This is a limitation of the underlying provider.

> **Note:**
> The execution context (the security context, the impersonated user, and the calling context) is cached for the asynchronous `Socket` methods. After the first use of a particular context (a specific asynchronous `Socket` method, a specific `Socket` instance, and a specific callback), subsequent uses of that context will see a performance improvement.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.
