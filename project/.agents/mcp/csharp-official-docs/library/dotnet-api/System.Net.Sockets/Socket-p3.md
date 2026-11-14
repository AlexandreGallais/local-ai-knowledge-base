---
title: "Socket class (part 3 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 3 of 33)

## Socket.ReceiveTimeout property

```csharp
public int ReceiveTimeout { get; set; }
```

Gets or sets a value that specifies the amount of time after which a synchronous `Receive` call will time out.

Returns: The time-out value, in milliseconds. The default value is 0, which indicates an infinite time-out period. Specifying -1 also indicates an infinite time-out period.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than -1.

#### Remarks
This option applies to synchronous `Socket.Receive` calls only. If the time-out period is exceeded, the `Socket.Receive` method will throw a `SocketException`.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates the use of the `ReceiveTimeout` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.RemoteEndPoint property

```csharp
public System.Net.EndPoint? RemoteEndPoint { get; }
```

Gets the remote endpoint.

Returns: The `EndPoint` with which the `Socket` is communicating.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
If you are using a connection-oriented protocol, the `RemoteEndPoint` property gets the `EndPoint` that contains the remote IP address and port number to which the `Socket` is connected. If you are using a connectionless protocol, `Socket.RemoteEndPoint` contains the default remote IP address and port number with which the `Socket` will communicate. You must cast this `EndPoint` to an `IPEndPoint` before retrieving any information. You can then call the `IPEndPoint.Address` method to retrieve the remote `IPAddress`, and the `IPEndPoint.Port` method to retrieve the remote port number.

The `Socket.RemoteEndPoint` is set after a call to either `Socket.Accept` or `Socket.Connect`. If you try to access this property earlier, `Socket.RemoteEndPoint` will throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example retrieves and displays the local and remote endpoints.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.SafeHandle property

```csharp
public System.Net.Sockets.SafeSocketHandle SafeHandle { get; }
```

Gets a `SafeSocketHandle` that represents the socket handle that the current `Socket` object encapsulates.

Returns: A socket handle exposed in a safe manner for the socket that the current `Socket` object encapsulates.

> **Important:**
> Using the `SafeSocketHandle` to operate on the socket directly may result in an undocumented state.

## Socket.SendBufferSize property

```csharp
public int SendBufferSize { get; set; }
```

Gets or sets a value that specifies the size of the send buffer of the `Socket`.

Returns: An `Int32` that contains the size, in bytes, of the send buffer. The default value depends on the operating system.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than 0.

#### Remarks
A larger buffer size might delay the recognition of connection difficulties. Consider increasing the buffer size if you are transferring large files, or you are using a high bandwidth, high latency connection (such as a satellite broadband provider.)

#### Examples
The following code example demonstrates the use of the `SendBufferSize` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.SendTimeout property

```csharp
public int SendTimeout { get; set; }
```

Gets or sets a value that specifies the amount of time after which a synchronous `Send` call will time out.

Returns: The time-out value, in milliseconds. If you set the property with a value between 1 and 499, the value will be changed to 500. The default value is 0, which indicates an infinite time-out period. Specifying -1 also indicates an infinite time-out period.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than -1.

#### Remarks
This option applies to synchronous `Socket.Send` calls only. If the time-out period is exceeded, the `Socket.Send` method will throw a `SocketException`.

#### Examples
The following code example demonstrates the use of the `SendTimeout` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.SocketType property

```csharp
public System.Net.Sockets.SocketType SocketType { get; }
```

Gets the type of the `Socket`.

Returns: One of the `SocketType` values.

#### Remarks
`Socket.SocketType` is read-only and is set when the `Socket` is created.

#### Examples
The following code example displays the `AddressFamily`, `SocketType`, and `ProtocolType` to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.SupportsIPv4 property

```csharp
public static bool SupportsIPv4 { get; }
```

Gets a value indicating whether IPv4 support is available and enabled on the current host.

Returns: `true` if the current host supports the IPv4 protocol; otherwise, `false`.

To be added.

## Socket.SupportsIPv6 property

```csharp
public static bool SupportsIPv6 { get; }
```

Gets a value that indicates whether the framework supports IPv6 for certain obsolete `Dns` members.

Returns: `true` if the framework supports IPv6 for certain obsolete `Dns` methods; otherwise, `false`.

To be added.

## Socket.Ttl property

```csharp
public short Ttl { get; set; }
```

Gets or sets a value that specifies the Time To Live (TTL) value of Internet Protocol (IP) packets sent by the `Socket`.

Returns: The TTL value.

Exceptions:

- `ArgumentOutOfRangeException`: The TTL value is a negative number.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.
- `SocketException`: An error occurred when attempting to access the socket. This error is also returned when an attempt was made to set TTL to a value higher than 255.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The TTL value indicates the maximum number of routers the packet can traverse before the router discards the packet and an Internet Control Message Protocol (ICMP) "TTL exceeded" error message is returned to the sender.

The TTL value may be set to a value from 0 to 255. When this property is not set, the default TTL value for a socket is 32.

Setting this property on a Transmission Control Protocol (TCP) socket is ignored by the TCP/IP stack if a successful connection has been established using the socket.

If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example demonstrates the use of the `Ttl` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.UseOnlyOverlappedIO property

```csharp
public bool UseOnlyOverlappedIO { get; set; }
```

Gets or sets a value that specifies whether the socket should only use Overlapped I/O mode.

Returns: Always `false`.

Exceptions:

- `InvalidOperationException`: The socket has been bound to a completion port.

To be added.

## Socket.Accept() method

```csharp
public System.Net.Sockets.Socket Accept ();
```

Creates a new `Socket` for a newly created connection.

Returns: A `Socket` for a newly created connection.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `InvalidOperationException`: The accepting socket is not listening for connections. You must call `Socket.Bind` and `Socket.Listen` before calling `Socket.Accept`.

#### Remarks
`Socket.Accept` synchronously extracts the first pending connection request from the connection request queue of the listening socket, and then creates and returns a new `Socket`. You cannot use this returned `Socket` to accept any additional connections from the connection queue. However, you can call the `Socket.RemoteEndPoint` method of the returned `Socket` to identify the remote host's network address and port number.

In blocking mode, `Socket.Accept` blocks until an incoming connection attempt is queued. Once a connection is accepted, the original `Socket` continues queuing incoming connection requests until you close it.

If you call this method using a non-blocking `Socket`, and no connection requests are queued, `Socket.Accept` throws a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> Before calling the `Socket.Accept` method, you must first call the `Socket.Listen` method to listen for and queue incoming connection requests.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example accepts a simple `Socket` connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Accept/source.cs._

## Socket.AcceptAsync() method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.Socket> AcceptAsync ();
```

Accepts an incoming connection.

Returns: An asynchronous task that completes with the accepted Socket.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `Socket.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Socket.Accept`.

## Socket.AcceptAsync(Socket) method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.Socket> AcceptAsync (System.Net.Sockets.Socket? acceptSocket);
```

Accepts an incoming connection.

Parameters:

- `acceptSocket`: The socket to use for accepting the connection.

Returns: An asynchronous task that completes with the accepted Socket.

Exceptions:

- `InvalidOperationException`: An invalid operation was requested. This exception occurs if the accepting `Socket` is not listening for connections or the accepted socket is bound.

You must call the `Socket.Bind` and `Socket.Listen` method before calling the `Socket.AcceptAsync` method.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.
