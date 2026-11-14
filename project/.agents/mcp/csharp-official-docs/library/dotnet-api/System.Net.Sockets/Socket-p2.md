---
title: "Socket class (part 2 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 2 of 33)

## Socket.DualMode property

```csharp
public bool DualMode { get; set; }
```

Gets or sets a value that specifies whether the `Socket` is a dual-mode socket used for both IPv4 and IPv6.

Returns: `true` if the `Socket` is a dual-mode socket; otherwise, `false`. The default is `true` if the socket was created by calling the `Socket.#ctor` constructor and the operating system supports IPv6; otherwise, the default is `false`.

Exceptions:

- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetworkV6` address family.

To be added.

## Socket.EnableBroadcast property

```csharp
public bool EnableBroadcast { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `Socket` can send broadcast packets.

Returns: `true` if the `Socket` allows sending broadcast packets; otherwise, `false`. The default is `false`.

Exceptions:

- `SocketException`: This option is valid for a datagram socket only.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
Broadcasting is limited to a specific subnet, and must use User Datagram Protocol (UDP.) For Internet Protocol version 4, you can broadcast to your local subnet by sending a packet to 255.255.255.255; or you can use the directed broadcast address, which is the network portion of an Internet Protocol (IP) address with all bits set in the host portion. For example, if your IP address is 192.168.1.40 (a Class C address, with a netmask of 255.255.255.0 -- the network portion is the first three octets, and the host portion is the last octet), your directed broadcast address is 192.168.1.255.

Setting this property on a Transmission Control Protocol (TCP) socket will have no effect.

#### Examples
The following code example demonstrates the use of the `EnableBroadcast` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.ExclusiveAddressUse property

```csharp
public bool ExclusiveAddressUse { get; set; }
```

Gets or sets a value that indicates whether the `Socket` allows only one process to bind to a port.

Returns: `true` if the `Socket` allows only one socket to bind to a specific port; otherwise, `false`. The default is `true`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `InvalidOperationException`: `Socket.Bind` has been called for this `Socket`.

#### Remarks
If `ExclusiveAddressUse` is `false`, multiple sockets can use the `Socket.Bind` method to bind to a specific port; however only one of the sockets can perform operations on the network traffic sent to the port. If more than one socket attempts to use the `Bind` method to bind to a particular port, then the one with the more specific IP address will handle the network traffic sent to that port.

If `ExclusiveAddressUse` is `true`, the first use of the `Socket.Bind` method to attempt to bind to a particular port, regardless of Internet Protocol (IP) address, will succeed; all subsequent uses of the `Socket.Bind` method to attempt to bind to that port will fail until the original bound socket is destroyed.

This property must be set before `Socket.Bind` is called; otherwise an `InvalidOperationException` will be thrown.

#### Examples
The following code example demonstrates the use of the `ExclusiveAddressUse` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.Handle property

```csharp
public IntPtr Handle { get; }
```

Gets the operating system handle for the `Socket`.

Returns: An `IntPtr` that represents the operating system handle for the `Socket`.

To be added.

## Socket.IsBound property

```csharp
public bool IsBound { get; }
```

Gets a value that indicates whether the `Socket` is bound to a specific local port.

Returns: `true` if the `Socket` is bound to a local port; otherwise, `false`.

#### Remarks
A socket is considered bound to a local port if it is explicitly bound by calling the `Socket.Bind` method, or implicitly bound by calling members like `Socket.Connect`, `Socket.SendTo`, or `Socket.ReceiveFrom`, which use an ephemeral local port (a free port greater than 1024, selected by the operating system.) Servers use the `Socket.Bind` method to bind to a well-known port so that clients may connect to them.

#### Examples
The following code example demonstrates the use of the `IsBound` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.LingerState property

```csharp
public System.Net.Sockets.LingerOption? LingerState { get; set; }
```

Gets or sets a value that specifies whether the `Socket` will delay closing a socket in an attempt to send all pending data.

Returns: A `LingerOption` that specifies how to linger while closing a socket.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `LingerState` property changes the way `Socket.Close` method behaves. This property when set modifies the conditions under which the connection can be reset by Winsock. Connection resets can still occur based on the IP protocol behavior.

This property controls the length of time that a connection-oriented connection will remain open after a call to `Socket.Close` when data remains to be sent.

When you call methods to send data to a peer, this data is placed in the outgoing network buffer. This property can be used to ensure that this data is sent to the remote host before the `TcpClient.Close` method drops the connection.

To enable lingering, create a `LingerOption` instance containing the desired values, and set the `LingerState` property to this instance.

The following table describes the behavior of the `Socket.Close` method for the possible values of the `Enabled` property and the `LingerTime` property stored in the `LingerState` property.

|LingerState.Enabled|LingerState.LingerTime|Behavior|
|-------------------------|----------------------------|--------------|
|`false` (disabled), the default value|The time-out is not applicable, (default).|Attempts to send pending data until the default IP protocol time-out expires.|
|`true` (enabled)|A nonzero time-out|Attempts to send pending data until the specified time-out expires, and if the attempt fails, then Winsock resets the connection.|
|`true` (enabled)|A zero timeout.|Discards any pending data. For connection-oriented socket (TCP, for example), Winsock resets the connection.|

The IP stack computes the default IP protocol time-out period to use based on the round trip time of the connection. In most cases, the time-out computed by the stack is more relevant than one defined by an application. This is the default behavior for a socket when the `LingerState` property is not set.

When the `LingerTime` property stored in the `LingerState` property is set greater than the default IP protocol time-out, the default IP protocol time-out will still apply and override.

#### Examples
The following code example demonstrates the use of the `LingerState` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.LocalEndPoint property

```csharp
public System.Net.EndPoint? LocalEndPoint { get; }
```

Gets the local endpoint.

Returns: The `EndPoint` that the `Socket` is using for communications.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The `LocalEndPoint` property gets an `EndPoint` that contains the local IP address and port number to which your `Socket` is bound. You must cast this `EndPoint` to an `IPEndPoint` before retrieving any information. You can then call the `IPEndPoint.Address` method to retrieve the local `IPAddress`, and the `IPEndPoint.Port` method to retrieve the local port number.

The `LocalEndPoint` property is usually set after you make a call to the `Socket.Bind` method. If you allow the system to assign your socket's local IP address and port number, the `LocalEndPoint` property will be set after the first I/O operation. For connection-oriented protocols, the first I/O operation would be a call to the `Socket.Connect` or `Socket.Accept` method. For connectionless protocols, the first I/O operation would be any of the send or receive calls.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example retrieves and displays the local and remote endpoints.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.MulticastLoopback property

```csharp
public bool MulticastLoopback { get; set; }
```

Gets or sets a value that specifies whether outgoing multicast packets are delivered to the sending application.

Returns: `true` if the `Socket` receives outgoing multicast packets; otherwise, `false`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `NotSupportedException`: The `Socket` is not in the `AddressFamily.InterNetwork` or `AddressFamily.InterNetworkV6` families.

#### Remarks
Multicast is a scalable method for many-to-many communication on the Internet. A process subscribes to a multicast address; then, any packets sent by a subscribed process are received by every other process subscribed to the multicast address.

Setting this property on a Transmission Control Protocol (TCP) socket has no effect.

#### Examples
The following code example demonstrates the use of the `MulticastLoopback` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.NoDelay property

```csharp
public bool NoDelay { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the stream `Socket` is using the Nagle algorithm.

Returns: `false` if the `Socket` uses the Nagle algorithm; otherwise, `true`. The default is `false`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the `Socket`.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
The Nagle algorithm is designed to reduce network traffic by causing the socket to buffer small packets and then combine and send them in one packet under certain circumstances. A TCP packet consists of 40 bytes of header plus the data being sent. When small packets of data are sent with TCP, the overhead resulting from the TCP header can become a significant part of the network traffic. On heavily loaded networks, the congestion resulting from this overhead can result in lost datagrams and retransmissions, as well as excessive propagation time caused by congestion. The Nagle algorithm inhibits the sending of new TCP segments when new outgoing data arrives from the user if any previously transmitted data on the connection remains unacknowledged.

The majority of network applications should use the Nagle algorithm.

Setting this property on a User Datagram Protocol (UDP) socket will have no effect.

#### Examples
The following code example demonstrates the use of the `NoDelay` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
## Socket.OSSupportsIPv4 property

```csharp
public static bool OSSupportsIPv4 { get; }
```

Indicates whether the underlying operating system and network adaptors support Internet Protocol version 4 (IPv4).

Returns: `true` if the operating system and network adaptors support the IPv4 protocol; otherwise, `false`.

#### Remarks
The operating system may support both IPv4 and IPv6 protocols.

## Socket.OSSupportsIPv6 property

```csharp
public static bool OSSupportsIPv6 { get; }
```

Indicates whether the underlying operating system and network adaptors support Internet Protocol version 6 (IPv6).

Returns: `true` if the operating system and network adaptors support the IPv6 protocol; otherwise, `false`.

#### Remarks
The operating system may support both IPv4 and IPv6 protocols.

## Socket.OSSupportsUnixDomainSockets property

```csharp
public static bool OSSupportsUnixDomainSockets { get; }
```

Indicates whether the underlying operating system support the Unix domain sockets.

Returns: `true` if the operating system support the Unix domain sockets; otherwise, `false`.

To be added.

## Socket.ProtocolType property

```csharp
public System.Net.Sockets.ProtocolType ProtocolType { get; }
```

Gets the protocol type of the `Socket`.

Returns: One of the `ProtocolType` values.

#### Remarks
The `ProtocolType` property is set when the `Socket` is created, and specifies the protocol used by that `Socket`.

#### Examples
The following code example displays the `AddressFamily`, `SocketType`, and `ProtocolType` to the console.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.ReceiveBufferSize property

```csharp
public int ReceiveBufferSize { get; set; }
```

Gets or sets a value that specifies the size of the receive buffer of the `Socket`.

Returns: An `Int32` that contains the size, in bytes, of the receive buffer. The default value depends on the operating system.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `ArgumentOutOfRangeException`: The value specified for a set operation is less than 0.

#### Remarks
A larger buffer size potentially reduces the number of empty acknowledgements (TCP packets with no data portion), but might also delay the recognition of connection difficulties. Consider increasing the buffer size if you are transferring large files, or you are using a high bandwidth, high latency connection (such as a satellite broadband provider.)

#### Examples
The following code example demonstrates the use of the `ReceiveBufferSize` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/DontFragment/class1.cs._
