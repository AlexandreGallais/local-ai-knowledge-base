---
title: "SocketTaskExtensions class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketTaskExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketTaskExtensions class

Namespace: `System.Net.Sockets`

```csharp
public static class SocketTaskExtensions
```

This class contains extension methods to the `Socket` class.

To be added.

## SocketTaskExtensions.AcceptAsync(Socket) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Sockets.Socket> AcceptAsync (this System.Net.Sockets.Socket socket);
```

Performs an asynchronous operation on to accept an incoming connection attempt on the socket.

Parameters:

- `socket`: The socket that is listening for connections.

Returns: An asynchronous task that completes with a `Socket` to handle communication with the remote host.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `SocketTaskExtensions.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## SocketTaskExtensions.AcceptAsync(Socket, Socket) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Sockets.Socket> AcceptAsync (this System.Net.Sockets.Socket socket, System.Net.Sockets.Socket? acceptSocket);
```

Performs an asynchronous operation on to accept an incoming connection attempt on the socket.

Parameters:

- `socket`: The socket that is listening for incoming connections.
- `acceptSocket`: The accepted `Socket` object. This value may be `null`.

Returns: An asynchronous task that completes with a `Socket` to handle communication with the remote host.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `SocketTaskExtensions.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, EndPoint) method

```csharp
public static System.Threading.Tasks.Task ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.EndPoint remoteEP);
```

Establishes a connection to a remote host.

Parameters:

- `socket`: The socket that is used for establishing a connection.
- `remoteEP`: An EndPoint that represents the remote device.

Returns: An asynchronous Task.

Exceptions:

- `ArgumentNullException`: The `remoteEP` parameter cannot be null.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `NotSupportedException`: The local endpoint and the `remoteEP` parameter are not the same address family.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, EndPoint, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.EndPoint remoteEP, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host.

Parameters:

- `socket`: The socket that is used for establishing a connection.
- `remoteEP`: An EndPoint that represents the remote device.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `remoteEP` parameter cannot be null.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `NotSupportedException`: The local endpoint and the `remoteEP` parameter are not the same address family.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, IPAddress, Int32) method

```csharp
public static System.Threading.Tasks.Task ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.IPAddress address, int port);
```

Establishes a connection to a remote host. The host is specified by an IP address and a port number.

Parameters:

- `socket`: The socket to perform the connect operation on.
- `address`: The IP address of the remote host.
- `port`: The port number of the remote host.

Returns: A task that represents an asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `address` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, IPAddress[], Int32) method

```csharp
public static System.Threading.Tasks.Task ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.IPAddress[] addresses, int port);
```

Establishes a connection to a remote host. The host is specified by an array of IP addresses and a port number.

Parameters:

- `socket`: The socket that the connect operation is performed on.
- `addresses`: The IP addresses of the remote host.
- `port`: The port number of the remote host.

Returns: A task that represents the asynchronous connect operation.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter cannot be null.
- `ArgumentException`: The `addresses` parameter cannot be empty array.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, String, Int32) method

```csharp
public static System.Threading.Tasks.Task ConnectAsync (this System.Net.Sockets.Socket socket, string host, int port);
```

Establishes a connection to a remote host. The host is specified by a host name and a port number.

Parameters:

- `socket`: The socket to perform the connect operation on.
- `host`: The name of the remote host.
- `port`: The port number of the remote host.

Returns: An asynchronous task.

Exceptions:

- `ArgumentNullException`: The `host` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, IPAddress, Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.IPAddress address, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host, which is specified by an IP address and a port number.

Parameters:

- `socket`: The socket to perform the connect operation on.
- `address`: The IP address of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

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

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, IPAddress[], Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask ConnectAsync (this System.Net.Sockets.Socket socket, System.Net.IPAddress[] addresses, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host, which is specified by an array of IP addresses and a port number.

Parameters:

- `socket`: The socket that the connect operation is performed on.
- `addresses`: The IP addresses of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter cannot be null.
- `ArgumentException`: The `addresses` parameter cannot be empty array.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## SocketTaskExtensions.ConnectAsync(Socket, String, Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask ConnectAsync (this System.Net.Sockets.Socket socket, string host, int port, System.Threading.CancellationToken <example-value>);
```

Establishes a connection to a remote host, which is specified by a host name and a port number.

Parameters:

- `socket`: The socket to perform the connect operation on.
- `host`: The name of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents an asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `host` parameter cannot be null.
- `ArgumentOutOfRangeException`: `port` is less than `IPEndPoint.MinPort`.

-or-

`port` is greater than `IPEndPoint.MaxPort`.
- `InvalidOperationException`: The `Socket` is listening.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## SocketTaskExtensions.ReceiveAsync(Socket, Byte>, SocketFlags) method

```csharp
public static System.Threading.Tasks.Task<int> ReceiveAsync (this System.Net.Sockets.Socket socket, ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a connected socket.

Parameters:

- `socket`: The socket to perform the receive operation on.
- `buffer`: An array that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: A task that represents the asynchronous receive operation. The value of the `TResult` parameter contains the number of bytes received.

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

To be added.

## SocketTaskExtensions.ReceiveAsync(Socket, Byte>>, SocketFlags) method

```csharp
public static System.Threading.Tasks.Task<int> ReceiveAsync (this System.Net.Sockets.Socket socket, System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags);
```

Receives data from a connected socket.

Parameters:

- `socket`: The socket to perform the receive operation on.
- `buffers`: An array that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: A task that represents the asynchronous receive operation. The value of the `TResult` parameter contains the number of bytes received.

Exceptions:

- `ArgumentNullException`: The `buffers` parameter was null.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

To be added.

## SocketTaskExtensions.ReceiveAsync(Socket, Byte>, SocketFlags, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> ReceiveAsync (this System.Net.Sockets.Socket socket, Memory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Threading.CancellationToken <example-value> = default);
```

Receives data from a connected socket.

Parameters:

- `socket`: The socket to perform the receive operation on.
- `buffer`: A region of memory that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that completes with the number of bytes received, or 0 if the end of the stream has been reached.

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
