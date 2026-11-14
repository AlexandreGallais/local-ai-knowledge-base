---
title: "SocketTaskExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketTaskExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketTaskExtensions class (part 2 of 2)

## SocketTaskExtensions.ReceiveFromAsync(Socket, Byte>, SocketFlags, EndPoint) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveFromResult> ReceiveFromAsync (this System.Net.Sockets.Socket socket, ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint);
```

Receives data from a specified network device.

Parameters:

- `socket`: The socket to perform the ReceiveFrom operation on.
- `buffer`: An array of type Byte that is the storage location for the received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEndPoint`: An EndPoint that represents the source of the data.

Returns: An asynchronous Task that completes with a SocketReceiveFromResult struct.

Exceptions:

- `ArgumentNullException`: `buffer` is `null`.

-or-

`remoteEndPoint` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller in the call stack does not have the required permissions.

To be added.

## SocketTaskExtensions.ReceiveMessageFromAsync(Socket, Byte>, SocketFlags, EndPoint) method

```csharp
public static System.Threading.Tasks.Task<System.Net.Sockets.SocketReceiveMessageFromResult> ReceiveMessageFromAsync (this System.Net.Sockets.Socket socket, ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEndPoint);
```

Receives the specified number of bytes of data into the specified location of the data buffer, using the specified `SocketFlags`, and stores the endpoint and packet information.

Parameters:

- `socket`: The socket to perform the operation on.
- `buffer`: An array that is the storage location for received data.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEndPoint`: An `EndPoint`, that represents the remote server.

Returns: An asynchronous Task that completes with a `SocketReceiveMessageFromResult` struct.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `ArgumentNullException`: The `remoteEndPoint` is `null`.
- `InvalidOperationException`: You must call the Bind method before performing this operation.

To be added.

## SocketTaskExtensions.SendAsync(Socket, Byte>, SocketFlags) method

```csharp
public static System.Threading.Tasks.Task<int> SendAsync (this System.Net.Sockets.Socket socket, ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags);
```

Sends data to a connected socket.

Parameters:

- `socket`: The socket to perform the operation on.
- `buffer`: An array of type Byte that contains the data to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: An asynchronous task that completes with number of bytes sent to the socket if the operation was successful. Otherwise, the task will complete with an invalid socket error.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## SocketTaskExtensions.SendAsync(Socket, Byte>>, SocketFlags) method

```csharp
public static System.Threading.Tasks.Task<int> SendAsync (this System.Net.Sockets.Socket socket, System.Collections.Generic.IList<ArraySegment<byte>> buffers, System.Net.Sockets.SocketFlags socketFlags);
```

Sends data to a connected socket.

Parameters:

- `socket`: The socket to perform the operation on.
- `buffers`: An array that contains the data to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.

Returns: An asynchronous task that completes with number of bytes sent to the socket if the operation was successful. Otherwise, the task will complete with an invalid socket error.

Exceptions:

- `ArgumentNullException`: `buffers` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## SocketTaskExtensions.SendAsync(Socket, Byte>, SocketFlags, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> SendAsync (this System.Net.Sockets.Socket socket, ReadOnlyMemory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Threading.CancellationToken <example-value> = default);
```

Sends data to a connected socket.

Parameters:

- `socket`: The socket to perform the operation on.
- `buffer`: A region of memory that contains the data to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that completes with number of bytes sent to the socket if the operation was successful. Otherwise, the task will complete with an invalid socket error.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## SocketTaskExtensions.SendToAsync(Socket, Byte>, SocketFlags, EndPoint) method

```csharp
public static System.Threading.Tasks.Task<int> SendToAsync (this System.Net.Sockets.Socket socket, ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends data asynchronously to a specific remote host.

Parameters:

- `socket`: The socket to perform the operation on.
- `buffer`: An array that contains the data to send.
- `socketFlags`: A bitwise combination of the `SocketFlags` values.
- `remoteEP`: An `EndPoint` that represents the remote device.

Returns: An asynchronous task that completes with number of bytes sent if the operation was successful. Otherwise, the task will complete with an invalid socket error.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
