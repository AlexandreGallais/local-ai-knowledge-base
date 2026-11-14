---
title: "TcpListener class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpListener.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpListener class (part 3 of 3)

## TcpListener.EndAcceptTcpClient(IAsyncResult) method

```csharp
public System.Net.Sockets.TcpClient EndAcceptTcpClient (IAsyncResult asyncResult);
```

Asynchronously accepts an incoming connection attempt and creates a new `TcpClient` to handle remote host communication.

Parameters:

- `asyncResult`: An `IAsyncResult` returned by a call to the `TcpListener.BeginAcceptTcpClient` method.

Returns: A `TcpClient`.

The `TcpClient` used to send and receive data.

#### Remarks
This method blocks until the operation is complete. To perform this operation synchronously, use the `TcpListener.AcceptTcpClient` method.

> **Note:**
> You can call the `RemoteEndPoint` property of the underlying socket (`TcpClient.Client`) to identify the remote host's network address and port number.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## TcpListener.Pending() method

```csharp
public bool Pending ();
```

Determines if there are pending connection requests.

Returns: `true` if connections are pending; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: The listener has not been started with a call to `TcpListener.Start`.

#### Remarks
This non-blocking method determines if there are any pending connection requests. Because the `TcpListener.AcceptSocket` and `TcpListener.AcceptTcpClient` methods block execution until the `TcpListener.Start` method has queued an incoming connection request, the `TcpListener.Pending` method can be used to determine if connections are available before attempting to accept them.

#### Examples
The following code example checks the `TcpListener.Pending` method. If a connection request is waiting to be accepted, then a call to the `TcpListener.AcceptTcpClient` method is made.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/LocalEndpoint/source.cs._

## TcpListener.Start() method

```csharp
public void Start ();
```

Starts listening for incoming connection requests.

Exceptions:

- `SocketException`: Use the `SocketException.ErrorCode` property to obtain the specific error code. When you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Remarks
The `TcpListener.Start` method initializes the underlying `Socket`, binds it to a local endpoint, and listens for incoming connection attempts. If a connection request is received, the `TcpListener.Start` method will queue the request and continue listening for additional requests until you call the `TcpListener.Stop` method. If `TcpListener` receives a connection request after it has already queued the maximum number of connections, it will throw a `SocketException` on the client.

To remove a connection from the incoming connection queue, use either the `TcpListener.AcceptTcpClient` method or the `TcpListener.AcceptSocket` method. The `TcpListener.AcceptTcpClient` method will remove a connection from the queue and return a `TcpClient` that you can use to send and receive data. The `TcpListener.AcceptSocket` method will return a `Socket` that you can use to do the same. If your application only requires synchronous I/O, use `TcpListener.AcceptTcpClient`. For more detailed behavioral control, use `TcpListener.AcceptSocket`. Both of these methods block until a connection request is available in the queue.

Use the `TcpListener.Stop` method to close the `TcpListener` and stop listening. You are responsible for closing your accepted connections separately.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how `TcpListener.Start` is used to listen for incoming client connection attempts.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/BeginAcceptSocket/tcpserver.cs._

## TcpListener.Start(Int32) method

```csharp
public void Start (int backlog);
```

Starts listening for incoming connection requests with a maximum number of pending connection.

Parameters:

- `backlog`: The maximum length of the pending connections queue.

Exceptions:

- `SocketException`: An error occurred while accessing the socket.
- `ArgumentOutOfRangeException`: The `backlog` parameter is less than zero or exceeds the maximum number of permitted connections.
- `InvalidOperationException`: The underlying `Socket` is null.

#### Remarks
The `TcpListener.Start` method initializes the underlying `Socket`, binds it to a local endpoint, and listens for incoming connection attempts. If a connection request is received, `TcpListener.Start` will queue the request and continue listening for additional requests until you call the `TcpListener.Stop` method. If `TcpListener` receives a connection request after it has already queued the maximum number of connections it will throw a `SocketException` on the client.

To remove a connection from the incoming connection queue, use either the `TcpListener.AcceptTcpClient` method or the `TcpListener.AcceptSocket` method. The `TcpListener.AcceptTcpClient` method will remove a connection from the queue and return a `TcpClient` that you can use to send and receive data. The `TcpListener.AcceptSocket` method will return a `Socket` that you can use to do the same. If your application only requires synchronous I/O, use the `TcpListener.AcceptTcpClient`. For more detailed behavioral control, use `TcpListener.AcceptSocket` method. Both of these methods block until a connection request is available in the queue.

Use the `TcpListener.Stop` method to close the `TcpListener` and stop listening. You are responsible for closing your accepted connections separately.

> **Note:**
> Use the `ErrorCode` property to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how `TcpListener.Start` is used to listen for incoming client connection attempts.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/BeginAcceptSocket/tcpserver.cs._

## TcpListener.Stop() method

```csharp
public void Stop ();
```

Closes the listener.

Exceptions:

- `SocketException`: Use the `SocketException.ErrorCode` property to obtain the specific error code. When you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Remarks
`TcpListener.Stop` closes the listener. Any unaccepted connection requests in the queue will be lost. Remote hosts waiting for a connection to be accepted will throw a `SocketException`. You are responsible for closing your accepted connections separately.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates using the `TcpListener.Stop` method to close the underlying `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpListener/Overview/tcpserver.cs._
