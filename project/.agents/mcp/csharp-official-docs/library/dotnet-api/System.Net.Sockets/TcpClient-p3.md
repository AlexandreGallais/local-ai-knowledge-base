---
title: "TcpClient class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpClient class (part 3 of 5)

## TcpClient.Connect(IPAddress[], Int32) method

```csharp
public void Connect (System.Net.IPAddress[] ipAddresses, int port);
```

Connects the client to a remote TCP host using the specified IP addresses and port number.

Parameters:

- `ipAddresses`: The `IPAddress` array of the host to which you intend to connect.
- `port`: The port number to which you intend to connect.

Exceptions:

- `ArgumentNullException`: The `ipAddresses` parameter is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `NotSupportedException`: This method is valid for sockets that use the `AddressFamily.InterNetwork` flag or the `AddressFamily.InterNetworkV6` flag.

#### Remarks
This method is typically used immediately after a call to the `Dns.BeginGetHostAddresses` method, which can return multiple IP addresses for a single host. Call the `Connect` method to establish a synchronous remote host connection to the host specified by the array of `IPAddress` elements and the port number. The `Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

#### Examples
The following code example uses an IP Address and port number to connect with a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/Available/newtcpclient.cs._
## TcpClient.Connect(String, Int32) method

```csharp
public void Connect (string hostname, int port);
```

Connects the client to the specified port on the specified host.

Parameters:

- `hostname`: The DNS name of the remote host to which you intend to connect.
- `port`: The port number of the remote host to which you intend to connect.

Exceptions:

- `ArgumentNullException`: The `hostname` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` parameter is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.

#### Remarks
Call this method to establish a synchronous remote host connection to the specified host name and port number. The `Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this  `NetworkStream` to send and receive data.

If IPv6 is enabled and the `Connect(String, Int32)` method is called to connect to a host that resolves to both IPv6 and IPv4 addresses, the connection to the IPv6 address will be attempted first before the IPv4 address. This may have the effect of delaying the time to establish the connection if the host is not listening on the IPv6 address.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example uses the host name and port number to connect with a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.ConnectAsync(IPEndPoint) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.IPEndPoint remoteEP);
```

Connects the client to a remote TCP host using the specified endpoint as an asynchronous operation.

Parameters:

- `remoteEP`: The `IPEndPoint` to which you intend to connect.

Returns: A task representing the asynchronous operation.

#### Remarks
This operation will not block. The returned `Task` object will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified `IPEndPoint`. Before you call `Connect`, you must create an instance of the `IPEndPoint` class using an IP address and a port number. Use this `IPEndPoint` as the `remoteEP` parameter. The `Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you've obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive a `NotSupportedException` with the message "This protocol version is not supported" while using IPv6 address, make sure you enabled IPv6 in the constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(IPAddress, Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.IPAddress address, int port);
```

Connects the client to a remote TCP host using the specified IP address and port number as an asynchronous operation.

Parameters:

- `address`: The `IPAddress` of the host to which you intend to connect.
- `port`: The port number to which you intend to connect.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.

#### Remarks
This operation will not block. The returned Returns `Task` object will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified `IPAddress` and port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(IPAddress[], Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (System.Net.IPAddress[] addresses, int port);
```

Connects the client to a remote TCP host using the specified IP addresses and port number as an asynchronous operation.

Parameters:

- `addresses`: The `IPAddress` array of the host to which you intend to connect.
- `port`: The port number to which you intend to connect.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `NotSupportedException`: This method is valid for sockets that use the `AddressFamily.InterNetwork` flag or the `AddressFamily.InterNetworkV6` flag.

#### Remarks
This operation will not block. The returned Returns `Task` object will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

This method is typically used immediately after a call to the `Dns.BeginGetHostAddresses` method, which can return multiple IP addresses for a single host. Call this method to establish a synchronous remote host connection to the host specified by the array of `IPAddress` elements and the port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(IPEndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.IPEndPoint remoteEP, System.Threading.CancellationToken <example-value>);
```

Connects the client to a remote TCP host using the specified endpoint as an asynchronous operation.

Parameters:

- `remoteEP`: The `IPEndPoint` to which you intend to connect.
- `cancellationToken`: A cancellation token used to propagate notification that this operation should be canceled.

Returns: A task representing the asynchronous operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned Returns `Task` object will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified `IPEndPoint`. Before you call `Connect`, you must create an instance of the `IPEndPoint` class using an IP address and a port number. Use this `IPEndPoint` as the `remoteEP` parameter. The `Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.
