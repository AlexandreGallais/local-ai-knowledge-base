---
title: "TcpClient class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpClient class (part 4 of 5)

## TcpClient.ConnectAsync(String, Int32) method

```csharp
public System.Threading.Tasks.Task ConnectAsync (string host, int port);
```

Connects the client to the specified TCP port on the specified host as an asynchronous operation.

Parameters:

- `host`: The DNS name of the remote host to which you intend to connect.
- `port`: The port number of the remote host to which you intend to connect.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `host` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` parameter is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.

#### Remarks
This operation will not block. The returned Returns `Task` object will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified host name and port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

If IPv6 is enabled and the `ConnectAsync` method is called to connect to a host that resolves to both IPv6 and IPv4 addresses, the connection to the IPv6 address will be attempted first before the IPv4 address. This may have the effect of delaying the time to establish the connection if the host is not listening on the IPv6 address.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(IPAddress, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.IPAddress address, int port, System.Threading.CancellationToken <example-value>);
```

Connects the client to a remote TCP host using the specified IP address and port number as an asynchronous operation.

Parameters:

- `address`: The IP address of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned task will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified IP address and port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(IPAddress[], Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (System.Net.IPAddress[] addresses, int port, System.Threading.CancellationToken <example-value>);
```

Connects the client to a remote TCP host using the specified IP addresses and port number as an asynchronous operation.

Parameters:

- `addresses`: The array of IP address of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter is `null`.
- `ArgumentOutOfRangeException`: The port number is not valid.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `NotSupportedException`: This method is valid for sockets that use the `AddressFamily.InterNetwork` flag or the `AddressFamily.InterNetworkV6` flag.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned task will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

This method is typically used immediately after a call to the `Dns.BeginGetHostAddresses` method, which can return multiple IP addresses for a single host. Call this method to establish a synchronous remote host connection to the host specified by the array of IP addresses and the port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.ConnectAsync(String, Int32, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask ConnectAsync (string host, int port, System.Threading.CancellationToken <example-value>);
```

Connects the client to the specified TCP port on the specified host as an asynchronous operation.

Parameters:

- `host`: The DNS name of the remote host.
- `port`: The port number of the remote host.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: A task that represents the asynchronous connection operation.

Exceptions:

- `ArgumentNullException`: The `host` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` parameter is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned task will complete after the TCP connection has been established. This method does not block the calling thread while the connection request is underway.

Call this method to establish a synchronous remote host connection to the specified host name and port number as an asynchronous operation. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

If IPv6 is enabled and the `ConnectAsync` method is called to connect to a host that resolves to both IPv6 and IPv4 addresses, the connection to the IPv6 address will be attempted first before the IPv4 address. This may have the effect of delaying the time to establish the connection if the host is not listening on the IPv6 address.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Connect`.

## TcpClient.Dispose() method

```csharp
public void Dispose ();
```

Releases the managed and unmanaged resources used by the `TcpClient`.

To be added.

## TcpClient.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `TcpClient` and optionally releases the managed resources.

Parameters:

- `disposing`: Set to `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `TcpClient` references. It does this by invoking the `Dispose()` method of each referenced object.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## TcpClient.EndConnect(IAsyncResult) method

```csharp
public void EndConnect (IAsyncResult asyncResult);
```

Ends a pending asynchronous connection attempt.

Parameters:

- `asyncResult`: An `IAsyncResult` object returned by a call to `BeginConnect`.

Exceptions:

- `ArgumentNullException`: The `asyncResult` parameter is `null`.
- `ArgumentException`: The `asyncResult` parameter was not returned by a call to a `BeginConnect` method.
- `InvalidOperationException`: The `TcpClient.EndConnect` method was previously called for the asynchronous connection.
- `SocketException`: An error occurred when attempting to access the `Socket`.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
This method blocks until the operation is complete. To perform this operation synchronously, use a `TcpClient.Connect` method.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

## TcpClient.Finalize() method

```csharp
~TcpClient ();
```

Frees resources used by the `TcpClient` class.

#### Remarks
This method overrides `Object.Finalize`. Application code should not call this method; an object's `Finalize` method is automatically invoked during garbage collection, unless finalization by the garbage collector has been disabled by a call to the `GC.SuppressFinalize` method.

The `TcpClient` class finalizer closes the TCP connection and releases all managed resources associated with the `TcpClient`. These resources include the underlying `Socket` used for connecting with the remote host, and the `NetworkStream` used to send and receive data. The finalizer does not release any unmanaged resources.
