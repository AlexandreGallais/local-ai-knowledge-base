---
title: "Socket class (part 1 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class

Namespace: `System.Net.Sockets`

```csharp
public class Socket : IDisposable
```

Implements the Berkeley sockets interface.

The `Socket` class provides a rich set of methods and properties for network communications. The `Socket` class allows you to perform both synchronous and asynchronous data transfer using any of the communication protocols listed in the `ProtocolType` enumeration.

The `Socket` class follows the .NET naming pattern for asynchronous methods. For example, the synchronous `Socket.Receive` method corresponds to the asynchronous `Socket.ReceiveAsync` variants.

Use the following methods for synchronous operation mode:

- If you are using a connection-oriented protocol such as TCP, your server can listen for connections using the `Socket.Listen` method. The `Socket.Accept` method processes any incoming connection requests and returns a `Socket` that you can use to communicate data with the remote host. Use this returned `Socket` to call the `Socket.Send` or `Socket.Receive` method. Call the `Socket.Bind` method prior to calling the `Socket.Listen` method if you want to specify the local IP address and port number. Use a port number of zero if you want the underlying service provider to assign a free port for you. If you want to connect to a listening host, call the `Socket.Connect` method. To communicate data, call the `Socket.Send` or `Socket.Receive` method.
- If you are using a connectionless protocol such as UDP, you do not need to listen for connections at all. Call the `Socket.ReceiveFrom` method to accept any incoming datagrams. Use the `Socket.SendTo` method to send datagrams to a remote host.

To process communications asynchronously, use the following methods:

- If you're using a connection-oriented protocol, such as TCP, use `Socket.ConnectAsync` to connect with a listening host. Use `Socket.SendAsync` or `Socket.ReceiveAsync` to communicate data asynchronously. Incoming connection requests can be processed using `Socket.AcceptAsync`.
- If you're using a connectionless protocol, such as UDP, you can use `Socket.SendToAsync` to send datagrams, and `Socket.ReceiveFromAsync` to receive datagrams.

If you perform multiple asynchronous operations on a socket, they do not necessarily complete in the order in which they are started.

When you are finished sending and receiving data, use the `Socket.Shutdown` method to disable the `Socket`. After calling `Socket.Shutdown`, call the `Socket.Close` method to release all resources associated with the `Socket`.

The `Socket` class allows you to configure your `Socket` using the `Socket.SetSocketOption` method. Retrieve these settings using the `Socket.GetSocketOption` method.

The following example shows how the `Socket` class can be used to send data to an HTTP server, printing the ASCII response to the standard output. This example blocks the calling thread until the entire page is received.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Overview/socket.cs._
The next example demonstrates the same HTTP GET scenario, using Task-based asynchronous APIs, while also forwarding a `CancellationToken` to the asynchronous methods, making the entire operation cancellable.

> **Tip:**
> `Socket`'s async methods that do not take a `CancellationToken` typically return a `Task`, which is allocated on the heap.
> Cancellable overloads are always `ValueTask`-returning; using them helps reducing allocations in high-performance code.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Overview/socket.cs._
## Socket.Socket(SafeSocketHandle) constructor

```csharp
public Socket (System.Net.Sockets.SafeSocketHandle handle);
```

Initializes a new instance of the `Socket` class for the specified socket handle.

Parameters:

- `handle`: The socket handle for the socket that the `Socket` object will encapsulate.

Exceptions:

- `ArgumentNullException`: `handle` is `null`.
- `ArgumentException`: `handle` is invalid.
- `SocketException`: `handle` is not a socket or information about the socket could not be accessed.

#### Remarks

This method populates the `Socket` instance with data gathered from the supplied `SafeSocketHandle`.
Different operating systems provide varying levels of support for querying a socket handle or file descriptor for its properties and configuration. Some of the public APIs on the resulting `Socket` instance may differ based on operating system, such as `ProtocolType` and `Blocking`.

## Socket.Socket(SocketInformation) constructor

```csharp
public Socket (System.Net.Sockets.SocketInformation socketInformation);
```

Initializes a new instance of the `Socket` class using the specified value returned from `Socket.DuplicateAndClose`.

Parameters:

- `socketInformation`: The socket information returned by `Socket.DuplicateAndClose`.

Exceptions:

- `PlatformNotSupportedException`: The current operating system is not Windows.

#### Remarks
If you call the `Socket.%23ctor` constructor multiple times with the same byte array as the argument for each call, you will create multiple managed `Socket`s with the same underlying socket. This practice is strongly discouraged.

## Socket.Socket(SocketType, ProtocolType) constructor

```csharp
public Socket (System.Net.Sockets.SocketType socketType, System.Net.Sockets.ProtocolType protocolType);
```

Initializes a new instance of the `Socket` class using the specified socket type and protocol. If the operating system supports IPv6, this constructor creates a dual-mode socket; otherwise, it creates an IPv4 socket.

Parameters:

- `socketType`: One of the `SocketType` values.
- `protocolType`: One of the `ProtocolType` values.

Exceptions:

- `SocketException`: The combination of  `socketType` and `protocolType` results in an invalid socket.

#### Remarks
The `socketType` parameter specifies the type of the `Socket` class and the `protocolType` parameter specifies the protocol used by `Socket`. The two parameters are not independent. Often the `Socket` type is implicit in the protocol. If the combination of `Socket` type and protocol type results in an invalid `Socket`, this constructor throws a `SocketException`.

> **Note:**
> If this constructor throws a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Socket(AddressFamily, SocketType, ProtocolType) constructor

```csharp
public Socket (System.Net.Sockets.AddressFamily addressFamily, System.Net.Sockets.SocketType socketType, System.Net.Sockets.ProtocolType protocolType);
```

Initializes a new instance of the `Socket` class using the specified address family, socket type and protocol.

Parameters:

- `addressFamily`: One of the `AddressFamily` values.
- `socketType`: One of the `SocketType` values.
- `protocolType`: One of the `ProtocolType` values.

Exceptions:

- `SocketException`: The combination of `addressFamily`, `socketType`, and `protocolType` results in an invalid socket.

#### Remarks
The `addressFamily` parameter specifies the addressing scheme that the `Socket` class uses, the `socketType` parameter specifies the type of the `Socket` class, and the `protocolType` parameter specifies the protocol used by `Socket`. The three parameters are not independent. Some address families restrict which protocols can be used with them, and often the `Socket` type is implicit in the protocol. If the combination of address family, `Socket` type, and protocol type results in an invalid `Socket`, this constructor throws a `SocketException`.

> **Note:**
> If this constructor throws a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example demonstrates how to create an instance of the `Socket` class.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/AddressFamily/Overview/source.cs._

## Socket.AddressFamily property

```csharp
public System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the address family of the `Socket`.

Returns: One of the `AddressFamily` values.

#### Remarks
The `AddressFamily` specifies the addressing scheme that an instance of the `Socket` class can use. This property is read-only and is set when the `Socket` is created.

#### Examples
The following code example displays the `AddressFamily`, `SocketType`, and `ProtocolType` to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.Available property

```csharp
public int Available { get; }
```

Gets the amount of data that has been received from the network and is available to be read.

Returns: The number of bytes of data received from the network and available to be read.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
If you are using a non-blocking `Socket`, `Socket.Available` is a good way to determine whether data is queued for reading, before calling `Socket.Receive`. The available data is the total amount of data queued in the network buffer for reading. If no data is queued in the network buffer, `Socket.Available` returns 0.

If the remote host shuts down or closes the connection, `Socket.Available` can throw a `SocketException`. If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example compares the results of calling IOControl with FIONREAD and the Available property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Available/iocontrolserver.cs._
## Socket.Blocking property

```csharp
public bool Blocking { get; set; }
```

Gets or sets a value that indicates whether the `Socket` is in blocking mode.

Returns: `true` if the `Socket` will block; otherwise, `false`. The default is `true`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Blocking` property indicates whether a `Socket` is in blocking mode.

If you are in blocking mode, and you make a method call that does not complete immediately, your application will block execution until the requested operation completes. If you want execution to continue even though the requested operation is not complete, change the `Blocking` property to `false`. The `Blocking` property has no effect on asynchronous methods. If you are sending and receiving data asynchronously and want to block execution, use the `ManualResetEvent` class.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

## Socket.Connected property

```csharp
public bool Connected { get; }
```

Gets a value that indicates whether a `Socket` is connected to a remote host as of the last `Send` or `Receive` operation.

Returns: `true` if the `Socket` was connected to a remote resource as of the most recent operation; otherwise, `false`.

#### Remarks
The `Connected` property gets the connection state of the `Socket` as of the last I/O operation. When it returns `false`, the `Socket` was either never connected, or is no longer connected. `Connected` is not thread-safe; it may return `true` after an operation is aborted when the `Socket` is disconnected from another thread.

The value of the `Connected` property reflects the state of the connection as of the most recent operation. If you need to determine the current state of the connection, make a nonblocking, zero-byte Send call. If the call returns successfully or throws a WAEWOULDBLOCK error code (10035), then the socket is still connected; otherwise, the socket is no longer connected.

If you call `Socket.Connect` on a User Datagram Protocol (UDP) socket, the `Connected` property always returns `true`; however, this action does not change the inherent connectionless nature of UDP.

#### Examples
The following code example connects to a remote endpoint, checks the `Connected` property, and checks the current state of the connection.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Connect/source.cs._

## Socket.DontFragment property

```csharp
public bool DontFragment { get; set; }
```

Gets or sets a value that specifies whether the `Socket` allows Internet Protocol (IP) datagrams to be fragmented.

Returns: `true` if the `Socket` doesn't allow datagram fragmentation; otherwise, `false`. The default is `true`.

Exceptions:

- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetwork` family.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
Datagrams require fragmentation when their size exceeds the Maximum Transfer Unit (MTU) of the transmission medium. Datagrams may be fragmented by the sending host (all Internet Protocol versions) or an intermediate router (Internet Protocol Version 4 only). If a datagram must be fragmented and the `Socket.DontFragment` option is set, the datagram is discarded, and an Internet Control Message Protocol (ICMP) error message is sent back to the sender of the datagram.

Setting this property on a Transmission Control Protocol (TCP) socket has no effect.

#### Examples
The following code example demonstrates the use of the `DontFragment` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
