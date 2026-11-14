---
title: "UdpClient class (part 5 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpClient class (part 5 of 5)

## UdpClient.Send(Byte>, String, Int32) method

```csharp
public int Send (ReadOnlySpan<byte> datagram, string? hostname, int port);
```

Sends a UDP datagram to a specified port on a specified remote host.

Parameters:

- `datagram`: An `ReadOnlySpan<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.
- `hostname`: The name of the remote host to which you intend to send the datagram.
- `port`: The remote port number with which you intend to communicate.

Returns: The number of bytes sent.

Exceptions:

- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

To be added.

## UdpClient.Send(Byte[], Int32, String, Int32) method

```csharp
public int Send (byte[] dgram, int bytes, string? hostname, int port);
```

Sends a UDP datagram to a specified port on a specified remote host.

Parameters:

- `dgram`: An array of type `Byte` that specifies the UDP datagram that you intend to send represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.
- `hostname`: The name of the remote host to which you intend to send the datagram.
- `port`: The remote port number with which you intend to communicate.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `dgram` is `null`.
- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Send` method sends datagrams to the values specified by the `hostname` and `port` parameters and returns the number of bytes successfully sent. You can send datagrams to the default broadcast address by specifying "255.255.255.255" for the `hostname` parameter value.

If you want to send datagrams to any other broadcast address, use the `UdpClient.Client` method to obtain the underlying `Socket`, and set the socket option to `Broadcast`. You can also revert to using the `Socket` class.

> **Note:**
>  Do not provide a host name or port number to this method if you have already established a remote host with the `UdpClient.Connect` method. If you do, the `UdpClient.Send` method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates the `UdpClient.Send` method. This example uses a host name and a port number to identify the target host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.SendAsync(Byte[], Int32) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (byte[] datagram, int bytes);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An array of type `Byte` that specifies the UDP datagram that you intend to send represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.

Returns: Returns `Task<T>`.

Exceptions:

- `ArgumentNullException`: `datagram` is `null`.
- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This overload sends datagrams to the remote host established in the `UdpClient.Connect` method. If you do not call `UdpClient.Connect` before calling this overload, the method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

If you want to send datagrams to a different remote host, you must call the `UdpClient.Connect` method and specify the desired remote host. Use either of the other `UdpClient.SendAsync` method overloads to send datagrams to a broadcast address.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.

## UdpClient.SendAsync(Byte>, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendAsync (ReadOnlyMemory<byte> datagram, System.Threading.CancellationToken <example-value> = default);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An `ReadOnlyMemory<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is None.

Returns: A `ValueTask<T>` that represents the asynchronous send operation. The value of its Result property contains the number of bytes sent.

Exceptions:

- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## UdpClient.SendAsync(Byte[], Int32, IPEndPoint) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (byte[] datagram, int bytes, System.Net.IPEndPoint? endPoint);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An array of type `Byte` that specifies the UDP datagram that you intend to send represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.
- `endPoint`: An `IPEndPoint` that represents the host and port to which to send the datagram.

Returns: Returns `Task<T>`.

Exceptions:

- `ArgumentNullException`: `datagram` is `null`.
- `InvalidOperationException`: `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This method sends datagrams to the specified endpoint. Before calling this overload, you must first create an `IPEndPoint` using the IP address and port number of the remote host to which your datagrams will be delivered. You can send datagrams to the default broadcast address, 255.255.255.255, by specifying `Broadcast` for the `Address` property of the `IPEndPoint`. After you have created this `IPEndPoint`, pass it to this method as the `endPoint` parameter.

If you want to send datagrams to any other broadcast address, use the `UdpClient.Client` method to obtain the underlying `Socket`, and set the socket option to `Broadcast`. You can also revert to using the `Socket` class.

> **Warning:**
>  Do not provide an `endPoint` parameter to this method if you have already established a remote host with the `UdpClient.Connect` method. If you do, this method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.

## UdpClient.SendAsync(Byte>, IPEndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendAsync (ReadOnlyMemory<byte> datagram, System.Net.IPEndPoint? endPoint, System.Threading.CancellationToken <example-value> = default);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An `ReadOnlyMemory<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.
- `endPoint`: An `IPEndPoint` that represents the host and port to which to send the datagram.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is None.

Returns: A `ValueTask<T>` that represents the asynchronous send operation. The value of its Result property contains the number of bytes sent.

Exceptions:

- `InvalidOperationException`: `UdpClient` has already established a default remote host and `endPoint` is not `null`.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## UdpClient.SendAsync(Byte[], Int32, String, Int32) method

```csharp
public System.Threading.Tasks.Task<int> SendAsync (byte[] datagram, int bytes, string? hostname, int port);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An array of type `Byte` that specifies the UDP datagram that you intend to send represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.
- `hostname`: The name of the remote host to which you intend to send the datagram.
- `port`: The remote port number with which you intend to communicate.

Returns: Returns `Task<T>`.

Exceptions:

- `ArgumentNullException`: `datagram` is `null`.
- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This method sends datagrams to the values specified by the `hostname` and `port` parameters. You can send datagrams to the default broadcast address by specifying "255.255.255.255" for the `hostname` parameter value.

If you want to send datagrams to any other broadcast address, use the `UdpClient.Client` method to obtain the underlying `Socket`, and set the socket option to `Broadcast`. You can also revert to using the `Socket` class.

> **Warning:**
>  Do not provide a host name or port number to this method if you have already established a remote host with the `UdpClient.Connect` method. If you do, this method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.

## UdpClient.SendAsync(Byte>, String, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendAsync (ReadOnlyMemory<byte> datagram, string? hostname, int port, System.Threading.CancellationToken <example-value> = default);
```

Sends a UDP datagram asynchronously to a remote host.

Parameters:

- `datagram`: An `ReadOnlyMemory<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.
- `hostname`: The name of the remote host to which you intend to send the datagram.
- `port`: The remote port number with which you intend to communicate.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is None.

Returns: A `ValueTask<T>` that represents the asynchronous send operation. The value of its Result property contains the number of bytes sent.

Exceptions:

- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.
