---
title: "UdpClient class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpClient class (part 4 of 5)

## UdpClient.JoinMulticastGroup(Int32, IPAddress) method

```csharp
public void JoinMulticastGroup (int ifindex, System.Net.IPAddress multicastAddr);
```

Adds a `UdpClient` to a multicast group.

Parameters:

- `ifindex`: The interface index associated with the local IP address on which to join the multicast group.
- `multicastAddr`: The multicast `IPAddress` of the group you want to join.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
Before joining a multicast group, be sure the socket is bound to the port or endpoint. You can do this by calling one of the constructors that accepts a port or an endpoint as parameter.

The `infindex` parameter is used to identify a hardware interface on the same link.

> **Note:**
>  There are several multicast address ranges to choose from. Refer to the IETF RFC 2375.

> **Note:**
>  You cannot call `UdpClient.JoinMulticastGroup` on a `UdpClient` constructed without a specific local port (that is, using the `%23ctor` or `%23ctor` constructor).

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## UdpClient.JoinMulticastGroup(IPAddress, Int32) method

```csharp
public void JoinMulticastGroup (System.Net.IPAddress multicastAddr, int timeToLive);
```

Adds a `UdpClient` to a multicast group with the specified Time to Live (TTL).

Parameters:

- `multicastAddr`: The `IPAddress` of the multicast group to join.
- `timeToLive`: The Time to Live (TTL), measured in router hops.

Exceptions:

- `ArgumentOutOfRangeException`: The TTL provided is not between 0 and 255
- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.
- `ArgumentNullException`: `multicastAddr` is `null`.
- `ArgumentException`: The IP address is not compatible with the `AddressFamily` value that defines the addressing scheme of the socket.

#### Remarks
The `UdpClient.JoinMulticastGroup` method subscribes the `UdpClient` to a multicast group using the specified `IPAddress`. After calling the `UdpClient.JoinMulticastGroup` method, the underlying `Socket` sends an Internet Group Management Protocol (IGMP) packet to the router requesting membership to the multicast group. The multicast address range is 224.0.0.0 to 239.255.255.255. If you specify an address outside this range or if the router to which the request is made is not multicast enabled, `UdpClient` will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. The `timeToLive` parameter specifies how many router hops will be allowed for a multicasted datagram before being discarded. Once the `UdpClient` is listed with the router as a member of the multicast group, it will be able to receive multicasted datagrams sent to the specified `IPAddress`.

> **Note:**
>  You must create the `UdpClient` using the multicast port number otherwise you will not be able to receive multicasted datagrams. Do not call the `UdpClient.Connect` method prior to calling the `UdpClient.JoinMulticastGroup` method or the receive method will not work. You do not need to belong to a multicast group to send datagrams to a multicast IP address.

Before joining a multicast group make sure the socket is bound to the port or endpoint. You do that by calling one of the constructors that accept as parameter a port or an endpoint.

To stop receiving multicasted datagrams, call the `UdpClient.DropMulticastGroup` method and provide the `IPAddress` of the group from which you would like to withdraw.

> **Note:**
>  You cannot call `UdpClient.JoinMulticastGroup` on a `UdpClient` constructed without a specific local port (that is, using the `%23ctor` or `%23ctor` constructor).

#### Examples
The following example demonstrates how to join a multicast group by providing two parameters, a multicast address, and a number that represents the TTL.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.JoinMulticastGroup(IPAddress, IPAddress) method

```csharp
public void JoinMulticastGroup (System.Net.IPAddress multicastAddr, System.Net.IPAddress localAddress);
```

Adds a `UdpClient` to a multicast group.

Parameters:

- `multicastAddr`: The multicast `IPAddress` of the group you want to join.
- `localAddress`: The local `IPAddress`.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
Before you join a multicast group, be sure that the socket is bound to the port or endpoint. You can do this by calling one of the constructors that accepts a port or an endpoint as parameter.

> **Note:**
>  There are several multicast address ranges to choose from. You can find them in the IETF RFC 2375.

> **Note:**
>  You cannot call `UdpClient.JoinMulticastGroup` on a `UdpClient` constructed without a specific local port (that is, using the `%23ctor` or `%23ctor` constructor).

#### Examples
The following code example shows the use of the `UdpClient.JoinMulticastGroup` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.Receive(IPEndPoint) method

```csharp
public byte[] Receive (ref System.Net.IPEndPoint? remoteEP);
```

Returns a UDP datagram that was sent by a remote host.

Parameters:

- `remoteEP`: An `IPEndPoint` that represents the remote host from which the data was sent.

Returns: An array of type `Byte` that contains datagram data.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Receive` method will block until a datagram arrives from a remote host. When data is available, the `UdpClient.Receive` method will read the first enqueued datagram and return the data portion as a byte array. This method populates the `remoteEP` parameter with the `IPAddress` and port number of the sender.

If you specify a default remote host in the `UdpClient.Connect` method, the `UdpClient.Receive` method will accept datagrams from that host only. All other datagrams will be discarded.

If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
>  If you intend to receive multicasted datagrams, do not call the `UdpClient.Connect` method prior to calling the `UdpClient.Receive` method. The `UdpClient` you use to receive datagrams must be created using the multicast port number.

#### Examples
The following example demonstrates the `UdpClient.Receive` method. The `UdpClient.Receive` method blocks execution until it receives a message. Using the `IPEndPoint` passed to `UdpClient.Receive`, the identity of the responding host is revealed.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.ReceiveAsync() method

```csharp
public System.Threading.Tasks.Task<System.Net.Sockets.UdpReceiveResult> ReceiveAsync ();
```

Returns a UDP datagram asynchronously that was sent by a remote host.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This operation will not block. The returned `Task<T>`> object will complete after the UDP packet has been received.

If you specify a default remote host in the `UdpClient.Connect` method, this method will accept datagrams from that host only. All other datagrams will be discarded.

If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Warning:**
>  If you intend to receive multicasted datagrams, do not call the `UdpClient.Connect` method prior to calling this method. The `UdpClient` you use to receive datagrams must be created using the multicast port number.

## UdpClient.ReceiveAsync(CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<System.Net.Sockets.UdpReceiveResult> ReceiveAsync (System.Threading.CancellationToken <example-value>);
```

Returns a UDP datagram asynchronously that was sent by a remote host.

Parameters:

- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A `ValueTask<T>` representing the asynchronous operation.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## UdpClient.Send(Byte>) method

```csharp
public int Send (ReadOnlySpan<byte> datagram);
```

Sends a UDP datagram to a remote host.

Parameters:

- `datagram`: An `ReadOnlySpan<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.

Returns: The number of bytes sent.

Exceptions:

- `InvalidOperationException`: The `UdpClient` has not established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

To be added.

## UdpClient.Send(Byte[], Int32) method

```csharp
public int Send (byte[] dgram, int bytes);
```

Sends a UDP datagram to a remote host.

Parameters:

- `dgram`: An array of type `Byte` that specifies the UDP datagram that you intend to send represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `dgram` is `null`.
- `InvalidOperationException`: The `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: The `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
This overload sends datagrams to the remote host established in the `UdpClient.Connect` method and returns the number of bytes sent. If you do not call `UdpClient.Connect` before calling this overload, the `UdpClient.Send` method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

If you want to send datagrams to a different remote host, you must call the `UdpClient.Connect` method and specify the desired remote host. Use either of the other `UdpClient.Send` method overloads to send datagrams to a broadcast address.

#### Examples
The following example demonstrates the `UdpClient.Send` method. You must establish a default remote host prior to using this overload.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.Send(Byte>, IPEndPoint) method

```csharp
public int Send (ReadOnlySpan<byte> datagram, System.Net.IPEndPoint? endPoint);
```

Sends a UDP datagram to the host at the specified remote endpoint.

Parameters:

- `datagram`: An `ReadOnlySpan<T>` of Type `Byte` that specifies the UDP datagram that you intend to send.
- `endPoint`: An `IPEndPoint` that represents the host and port to which to send the datagram.

Returns: The number of bytes sent.

Exceptions:

- `InvalidOperationException`: `UdpClient` has already established a default remote host and `endPoint` is not `null`.
- `ObjectDisposedException`: `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

To be added.

## UdpClient.Send(Byte[], Int32, IPEndPoint) method

```csharp
public int Send (byte[] dgram, int bytes, System.Net.IPEndPoint? endPoint);
```

Sends a UDP datagram to the host at the specified remote endpoint.

Parameters:

- `dgram`: An array of type `Byte` that specifies the UDP datagram that you intend to send, represented as an array of bytes.
- `bytes`: The number of bytes in the datagram.
- `endPoint`: An `IPEndPoint` that represents the host and port to which to send the datagram.

Returns: The number of bytes sent.

Exceptions:

- `ArgumentNullException`: `dgram` is `null`.
- `InvalidOperationException`: `UdpClient` has already established a default remote host.
- `ObjectDisposedException`: `UdpClient` is closed.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Send` method sends datagrams to the specified endpoint and returns the number of bytes successfully sent. Before calling this overload, you must first create an `IPEndPoint` using the IP address and port number of the remote host to which your datagrams will be delivered. You can send datagrams to the default broadcast address, 255.255.255.255, by specifying `Broadcast` for the `Address` property of the `IPEndPoint`. After you have created this `IPEndPoint`, pass it to the `UdpClient.Send` method as the `endPoint` parameter.

If you want to send datagrams to any other broadcast address, use the `UdpClient.Client` method to obtain the underlying `Socket`, and set the socket option to `Broadcast`. You can also revert to using the `Socket` class.

> **Note:**
>  Do not provide an `endPoint` parameter to this method if you have already established a remote host with the `UdpClient.Connect` method. If you do, the `UdpClient.Send` method will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates the `UdpClient.Send` method. This example uses an `IPEndPoint` to specify the target host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._
