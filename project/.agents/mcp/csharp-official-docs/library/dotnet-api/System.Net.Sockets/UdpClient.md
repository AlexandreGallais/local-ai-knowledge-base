---
title: "UdpClient class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpClient class

Namespace: `System.Net.Sockets`

```csharp
public class UdpClient : IDisposable
```

Provides User Datagram Protocol (UDP) network services.

#### Remarks
The `UdpClient` class provides simple methods for sending and receiving connectionless UDP datagrams in blocking synchronous mode. Because UDP is a connectionless transport protocol, you do not need to establish a remote host connection prior to sending and receiving data. You do, however, have the option of establishing a default remote host in one of the following two ways:

- Create an instance of the `UdpClient` class using the remote host name and port number as parameters.

- Create an instance of the `UdpClient` class and then call the `UdpClient.Connect` method.

You can use any of the send methods provided in the `UdpClient` to send data to a remote device. Use the `UdpClient.Receive` method to receive data from remote hosts.

> **Note:**
>  Do not call `UdpClient.Send` using a host name or `IPEndPoint` if you have already specified a default remote host. If you do, `UdpClient` will throw an exception.

`UdpClient` methods also allow you to send and receive multicast datagrams. Use the `UdpClient.JoinMulticastGroup` method to subscribe a `UdpClient` to a multicast group. Use the `UdpClient.DropMulticastGroup` method to unsubscribe a `UdpClient` from a multicast group.

#### Examples
The following example establishes a `UdpClient` connection using the host name `www.contoso.com` on port 11000. A small string message is sent to two separate remote host machines. The `UdpClient.Receive` method blocks execution until a message is received. Using the `IPEndPoint` passed to `UdpClient.Receive`, the identity of the responding host is revealed.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Overview/source.cs._

## UdpClient.UdpClient() constructor

```csharp
public UdpClient ();
```

Initializes a new instance of the `UdpClient` class.

Exceptions:

- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor creates a new `UdpClient` and allows the underlying service provider to assign the most appropriate local IPv4 address and port number. If this constructor is used, the `UdpClient` instance is set with an address family of IPv4 that cannot be changed or overwritten by a connect method call with an IPv6 target.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This constructor is not suitable for joining a multicast group because it does not perform socket binding. Also, it works only with IPv4 address types.

#### Examples
The following example demonstrates how to use the parameterless constructor to create an instance of the `UdpClient` class.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.UdpClient(Int32) constructor

```csharp
public UdpClient (int port);
```

Initializes a new instance of the `UdpClient` class and binds it to the local port number provided.

Parameters:

- `port`: The local port number from which you intend to communicate.

Exceptions:

- `ArgumentOutOfRangeException`: The `port` parameter is greater than `IPEndPoint.MaxPort` or less than `IPEndPoint.MinPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor creates an underlying `Socket` and binds it to the port number from which you intend to communicate. Use this constructor if you are only interested in setting the local port number. The underlying service provider will assign the local IP address. If you pass 0 to the constructor, the underlying service provider will assign a port number. If this constructor is used, the `UdpClient` instance is set with an address family of IPv4 that cannot be changed or overwritten by a connect method call with an IPv6 target.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

This constructor works only with IPv4 address types.

#### Examples
The following example demonstrates using a local port number to create an instance of the `UdpClient` class.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.UdpClient(IPEndPoint) constructor

```csharp
public UdpClient (System.Net.IPEndPoint localEP);
```

Initializes a new instance of the `UdpClient` class and binds it to the specified local endpoint.

Parameters:

- `localEP`: An `IPEndPoint` that represents the local endpoint to which you bind the UDP connection.

Exceptions:

- `ArgumentNullException`: `localEP` is `null`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor creates a new `UdpClient` and binds it to the `IPEndPoint` specified by the `localEP` parameter. Before you call this constructor, you must create an `IPEndPoint` using the IP address and port number from which you intend to send and receive data. You do not need to specify a local IP address and port number for sending and receiving data. If you do not, the underlying service provider will assign the most appropriate local IP address and port number.

If this constructor is used, the `UdpClient` instance is set with the address family specified by the `localEP` parameter  that cannot be changed or overwritten by a connect method call with a different address family.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates how to create an instance of the `UdpClient` class using a local endpoint.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.UdpClient(AddressFamily) constructor

```csharp
public UdpClient (System.Net.Sockets.AddressFamily family);
```

Initializes a new instance of the `UdpClient` class.

Parameters:

- `family`: One of the `AddressFamily` values that specifies the addressing scheme of the socket.

Exceptions:

- `ArgumentException`: `family` is not `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `family` parameter determines whether the listener uses an IP version 4 address (IPv4) or an IP version 6 (IPv6) address. To use an IPv4 address, pass the `InterNetwork` value. To use an IPv6 address, pass the `InterNetworkV6` value. Passing any other value will cause the method to throw an `ArgumentException`.

If this constructor is used, the `UdpClient` instance is set with the address family specified by the `family` parameter  that cannot be changed or overwritten by a connect method call with a different address family.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

The `%23ctor` is not suitable for joining a multicast group because it does not perform socket binding.

## UdpClient.UdpClient(Int32, AddressFamily) constructor

```csharp
public UdpClient (int port, System.Net.Sockets.AddressFamily family);
```

Initializes a new instance of the `UdpClient` class and binds it to the local port number provided.

Parameters:

- `port`: The port on which to listen for incoming connection attempts.
- `family`: One of the `AddressFamily` values that specifies the addressing scheme of the socket.

Exceptions:

- `ArgumentException`: `family` is not `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6`.
- `ArgumentOutOfRangeException`: `port` is greater than `IPEndPoint.MaxPort` or less than `IPEndPoint.MinPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor creates an underlying `Socket` and binds it to the port number from which you intend to communicate.

The `family` parameter determines whether the listener uses an IP version 4 address (IPv4) or an IP version 6 (IPv6) address. To use an IPv4 address, pass the `InterNetwork` value. To use an IPv6 address, pass the `InterNetworkV6` value. Passing any other value will cause the method to throw an `ArgumentException`.

If this constructor is used, the `UdpClient` instance is set with the address family specified by the `family` parameter  that cannot be changed or overwritten by a connect method call with a different address family.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example shows how to create a UDP client to use in a multicast group.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## UdpClient.UdpClient(String, Int32) constructor

```csharp
public UdpClient (string hostname, int port);
```

Initializes a new instance of the `UdpClient` class and establishes a default remote host.

Parameters:

- `hostname`: The name of the remote DNS host to which you intend to connect.
- `port`: The remote port number to which you intend to connect.

Exceptions:

- `ArgumentNullException`: `hostname` is `null`.
- `ArgumentOutOfRangeException`: `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This constructor initializes a new `UdpClient` and establishes a remote host using the `hostname` and `port` parameters. Establishing a default remote host is optional. If you use this constructor, you do not have to specify a remote host in each call to the `UdpClient.Send` method. Specifying a default remote host limits you to that host only. You can change the default remote host at any time by calling the `UdpClient.Connect` method. If you want to specify a remote host in your call to the `UdpClient.Send` method, do not use this constructor.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates how to create an instance of the `UdpClient` class using a host name and port number.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.Active property

```csharp
protected bool Active { get; set; }
```

Gets or sets a value indicating whether a default remote host has been established.

Returns: `true` if a connection is active; otherwise, `false`.

#### Remarks
Classes deriving from `UdpClient` can use this property to determine if a default remote host has been established. You can establish a default remote host by using the appropriate constructor or by calling the `UdpClient.Connect` method. If you do establish a default remote host, you cannot specify a remote host in your call to `UdpClient.Send`.

## UdpClient.Available property

```csharp
public int Available { get; }
```

Gets the amount of data received from the network that is available to read.

Returns: The number of bytes of data received from the network.

Exceptions:

- `SocketException`: An error occurred while attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `Available` property is used to determine the amount of data queued in the network buffer for reading. If data is available, call `NetworkStream.Read` to get the data. If no data is available, the `Available` property returns 0.

If the remote host shuts down or closes the connection, the `Available` property throws a `SocketException`.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code and refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example shows the use of the `Available` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.Client property

```csharp
public System.Net.Sockets.Socket Client { get; set; }
```

Gets or sets the underlying network `Socket`.

Returns: The underlying Network `Socket`.

#### Remarks
`UdpClient` creates a `Socket` used to send and receive data over a network. Classes deriving from `UdpClient` can use this property to get or set this `Socket`. Use the underlying `Socket` returned from `UdpClient.Client` if you require access beyond that which `UdpClient` provides. You can also use `UdpClient.Client` to set the underlying `Socket` to an existing `Socket`. This is useful if you want to take advantage of the simplicity of `UdpClient` using a pre-existing `Socket`.

#### Examples
The following example demonstrates the use of the `Client` property. In this example, broadcasting is enabled for the underlying `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Client/source.cs._

## UdpClient.DontFragment property

```csharp
public bool DontFragment { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `UdpClient` allows Internet Protocol (IP) datagrams to be fragmented.

Returns: `true` if the `UdpClient` doesn't allow datagram fragmentation; otherwise, `false`. The default is `true`.

Exceptions:

- `NotSupportedException`: This property can be set only for sockets that use the `AddressFamily.InterNetwork` flag or the `AddressFamily.InterNetworkV6` flag.

#### Remarks
Datagrams require fragmentation when their size exceeds the Maximum Transfer Unit (MTU) of the transmission medium. Datagrams may be fragmented by the sending host or by an intermediate router. If a datagram must be fragmented, and the `Socket.DontFragment` option is set, the datagram is discarded, and an Internet Control Message Protocol (ICMP) error message is sent back to the sender of the datagram.

#### Examples
The following code example shows the use of the `DontFragment` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
