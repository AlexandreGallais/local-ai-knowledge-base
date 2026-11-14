---
title: "TcpClient class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TcpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TcpClient class (part 2 of 5)

## TcpClient.ReceiveBufferSize property

```csharp
public int ReceiveBufferSize { get; set; }
```

Gets or sets the size of the receive buffer.

Returns: The size of the receive buffer, in bytes. The default value is 8192 bytes.

Exceptions:

- `SocketException`: An error occurred when setting the buffer size.

#### Remarks
The `ReceiveBufferSize` property gets or sets the number of bytes that you are expecting to store in the receive buffer for each read operation. This property actually manipulates the network buffer space allocated for receiving incoming data.

Your network buffer should be at least as large as your application buffer to ensure that the desired data will be available when you call the `NetworkStream.Read` method. Use the `ReceiveBufferSize` property to set this size. If your application will be receiving bulk data, you should pass the `Read` method a very large application buffer.

If the network buffer is smaller than the amount of data you request in the `Read` method, you will not be able to retrieve the desired amount of data in one read operation. This incurs the overhead of additional calls to the `Read` method.

#### Examples
The following code example sets and gets the receive buffer size.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.ReceiveTimeout property

```csharp
public int ReceiveTimeout { get; set; }
```

Gets or sets the amount of time a `TcpClient` will wait to receive data once a read operation is initiated.

Returns: The time-out value of the connection in milliseconds. The default value is 0.

#### Remarks
The `ReceiveTimeout` property determines the amount of time that the `NetworkStream.Read` method will block until it is able to receive data. This time is measured in milliseconds. If the time-out expires before `Read` successfully completes, `TcpClient` throws a `IOException`. There is no time-out by default.

#### Examples
The following code example sets and gets the receive time out.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.SendBufferSize property

```csharp
public int SendBufferSize { get; set; }
```

Gets or sets the size of the send buffer.

Returns: The size of the send buffer, in bytes. The default value is 8192 bytes.

#### Remarks
The `SendBufferSize` property gets or sets the number of bytes that you are expecting to send in each call to the `NetworkStream.Write` method. This property actually manipulates the network buffer space allocated for send operation.

Your network buffer should be at least as large as your application buffer to ensure that the desired data will be stored and sent in one operation. Use the `SendBufferSize` property to set this size. If your application will be sending bulk data, you should pass the `Write` method a very large application buffer.

If the network buffer is smaller than the amount of data you provide the `Write` method, several network send operations will be performed for every call you make to the `Write` method. You can achieve greater data throughput by ensuring that your network buffer is at least as large as your application buffer.

#### Examples
The following code example sets and gets the send buffer size.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.SendTimeout property

```csharp
public int SendTimeout { get; set; }
```

Gets or sets the amount of time a `TcpClient` will wait for a send operation to complete successfully.

Returns: The send time-out value, in milliseconds. The default is 0.

#### Remarks
The `SendTimeout` property determines the amount of time that the `Socket.Send` method will block until it is able to return successfully. This time is measured in milliseconds.

After you call the `NetworkStream.Write` method, the underlying `Socket` returns the number of bytes actually sent to the host. The `SendTimeout` property determines the amount of time a `TcpClient` will wait before receiving the number of bytes returned. If the time-out expires before the `Send` method successfully completes, `TcpClient` will throw a `SocketException`. There is no time-out by default.

#### Examples
The following code example sets and gets the `SendTimeout` value.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.BeginConnect(IPAddress, Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginConnect (System.Net.IPAddress address, int port, AsyncCallback? requestCallback, object? state);
```

Begins an asynchronous request for a remote host connection. The remote host is specified by an `IPAddress` and a port number (`Int32`).

Parameters:

- `address`: The `IPAddress` of the remote host.
- `port`: The port number of the remote host.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the connect operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous connection.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `ArgumentOutOfRangeException`: The port number is not valid.

#### Remarks
The asynchronous `BeginConnect` operation must be completed by calling the `TcpClient.EndConnect` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block until the operation completes. To block until the operation completes, use one of the `TcpClient.Connect` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

## TcpClient.BeginConnect(IPAddress[], Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginConnect (System.Net.IPAddress[] addresses, int port, AsyncCallback? requestCallback, object? state);
```

Begins an asynchronous request for a remote host connection. The remote host is specified by an `IPAddress` array and a port number (`Int32`).

Parameters:

- `addresses`: At least one `IPAddress` that designates the remote hosts.
- `port`: The port number of the remote hosts.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the connect operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous connection.

Exceptions:

- `ArgumentNullException`: The `addresses` parameter is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `ArgumentOutOfRangeException`: The port number is not valid.

#### Remarks
The asynchronous `BeginConnect` operation must be completed by calling the `TcpClient.EndConnect` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block until the operation completes. To block until the operation completes, use one of the `TcpClient.Connect` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

This method is typically used immediately after a call to the `Dns.BeginGetHostAddresses` method, which can return multiple IP addresses for a single host.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

## TcpClient.BeginConnect(String, Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginConnect (string host, int port, AsyncCallback? requestCallback, object? state);
```

Begins an asynchronous request for a remote host connection. The remote host is specified by a host name (`String`) and a port number (`Int32`).

Parameters:

- `host`: The name of the remote host.
- `port`: The port number of the remote host.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the connect operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous connection.

Exceptions:

- `ArgumentNullException`: The `host` parameter is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `SecurityException`: A caller higher in the call stack does not have permission for the requested operation.
- `ArgumentOutOfRangeException`: The port number is not valid.

#### Remarks
The asynchronous `BeginConnect` operation must be completed by calling the `TcpClient.EndConnect` method. Typically, the method is invoked by the `asyncCallback` delegate.

This method does not block until the operation completes. To block until the operation completes, use one of the `TcpClient.Connect` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

## TcpClient.Close() method

```csharp
public void Close ();
```

Disposes this `TcpClient` instance and requests that the underlying TCP connection be closed.

#### Remarks
The `Close` method marks the instance as disposed and requests that the associated `Socket` close the TCP connection. Based on the `LingerState` property, the TCP connection may stay open for some time after the `Close` method is called when data remains to be sent. There is no notification provided when the underlying connection has completed closing.

Calling this method will eventually result in the close of the associated `Socket` and will also close the associated `NetworkStream` that is used to send and receive data if one was created.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates closing a `TcpClient` by calling the `Close` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/NetworkStream/ReadTimeout/tcpclient.cs._
## TcpClient.Connect(IPEndPoint) method

```csharp
public void Connect (System.Net.IPEndPoint remoteEP);
```

Connects the client to a remote TCP host using the specified remote network endpoint.

Parameters:

- `remoteEP`: The `IPEndPoint` to which you intend to connect.

Exceptions:

- `ArgumentNullException`: The `remoteEP` parameter is `null`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: The `TcpClient` is closed.

#### Remarks
Call this method to establish a synchronous remote host connection to the specified `IPEndPoint`. Before you call `Connect`, you must create an instance of the `IPEndPoint` class using an IP address and a port number. Use this `IPEndPoint` as the `remoteEP` parameter. The `Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

#### Examples
The following code example uses an `IPEndPoint` to connect with a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._

## TcpClient.Connect(IPAddress, Int32) method

```csharp
public void Connect (System.Net.IPAddress address, int port);
```

Connects the client to a remote TCP host using the specified IP address and port number.

Parameters:

- `address`: The `IPAddress` of the host to which you intend to connect.
- `port`: The port number to which you intend to connect.

Exceptions:

- `ArgumentNullException`: The `address` parameter is `null`.
- `ArgumentOutOfRangeException`: The `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.
- `ObjectDisposedException`: `TcpClient` is closed.

#### Remarks
Call this method to establish a synchronous remote host connection to the specified `IPAddress` and port number. The `TcpClient.Connect` method will block until it either connects or fails. After connecting with the remote host, use the `TcpClient.GetStream` method to obtain the underlying `NetworkStream`. Use this `NetworkStream` to send and receive data.

> **Note:**
> If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

> **Note:**
> If you receive NotSupportedException with message `This protocol version is not supported` while using IPv6 address, then make sure you enabled IPv6 in constructor by passing `InterNetworkV6`.

#### Examples
The following code example uses an IP Address and port number to connect with a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/TcpClient/.ctor/source.cs._
