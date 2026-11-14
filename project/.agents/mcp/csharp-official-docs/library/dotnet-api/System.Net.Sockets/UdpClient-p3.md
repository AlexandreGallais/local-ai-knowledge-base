---
title: "UdpClient class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpClient class (part 3 of 5)

## UdpClient.Connect(IPAddress, Int32) method

```csharp
public void Connect (System.Net.IPAddress addr, int port);
```

Establishes a default remote host using the specified IP address and port number.

Parameters:

- `addr`: The `IPAddress` of the remote host to which you intend to send data.
- `port`: The port number to which you intend send data.

Exceptions:

- `ObjectDisposedException`: `UdpClient` is closed.
- `ArgumentNullException`: `addr` is `null`.
- `ArgumentOutOfRangeException`: `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Connect` method establishes a default remote host using the values specified in the `addr` and `port` parameters. Once established, you do not have to specify a remote host in each call to the `UdpClient.Send` method.

Establishing a default remote host is optional. Specifying a default remote host limits you to that host only. If you want to send datagrams to a different remote host, you must make another call to the `UdpClient.Connect` method or create another `UdpClient` without a default remote host. If you have established a default remote host and you also provide a remote host in your call to the `UdpClient.Send` method, `UdpClient.Send` will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

If you call the `Socket.Connect` method, any datagrams that arrive from an address other than the specified default will be discarded. You cannot set the default remote host to a broadcast address using this method unless you inherit from `UdpClient`, use the client method to obtain the underlying `Socket`, and set the socket option to `Broadcast`.

You can however, broadcast data to the default broadcast address, 255.255.255.255, if you specify `Broadcast` in your call to the `UdpClient.Send` method. If your application requires greater control over broadcast addresses, you can also revert to using the `Socket` class.

> **Note:**
>  Since the UDP protocol is connectionless, the `UdpClient.Connect` method does not block. Do not call the `UdpClient.Connect` method if you intend to receive multicasted datagrams.

#### Examples
The following example uses an IP address and port number to connect with a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.Connect(String, Int32) method

```csharp
public void Connect (string hostname, int port);
```

Establishes a default remote host using the specified host name and port number.

Parameters:

- `hostname`: The DNS name of the remote host to which you intend send data.
- `port`: The port number on the remote host to which you intend to send data.

Exceptions:

- `ObjectDisposedException`: The `UdpClient` is closed.
- `ArgumentOutOfRangeException`: `port` is not between `IPEndPoint.MinPort` and `IPEndPoint.MaxPort`.
- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Connect` method establishes a default remote host using the values specified in the `port` and `hostname` parameters. Once established, you do not have to specify a remote host in each call to the `UdpClient.Send` method.

Establishing a default remote host is optional. Specifying a default remote host limits you to that host only. If you want to send datagrams to a different remote host, you must make another call to the `UdpClient.Connect` method or create another `UdpClient` without a default remote host.

If you have established a default remote host and you also provide a remote host in your call to the `UdpClient.Send` method, `UdpClient.Send` will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

If you call the `Socket.Connect` method, any datagrams that arrive from an address other than the specified default will be discarded. You cannot set the default remote host to a broadcast address using this method unless you inherit from `UdpClient`, use the client method to obtain the underlying `Socket`, and set the socket option to `Broadcast`.

You can however, broadcast data to the default broadcast address, 255.255.255.255, if you specify `Broadcast` in your call to the `UdpClient.Send` method. If your application requires greater control over broadcast addresses, you can also revert to using the `Socket` class.

> **Note:**
>  Since the UDP protocol is connectionless, the `UdpClient.Connect` method does not block. Do not call the `UdpClient.Connect` method if you intend to receive multicasted datagrams.

#### Examples
The following example uses the host name and port number to connect to a remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.Dispose() method

```csharp
public void Dispose ();
```

Releases the managed and unmanaged resources used by the `UdpClient`.

To be added.

## UdpClient.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `UdpClient` and optionally releases the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to release only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is true, this method releases all resources held by any managed objects that this `UdpClient` references. This method invokes the `Dispose()` method of each referenced object.

## UdpClient.DropMulticastGroup(IPAddress) method

```csharp
public void DropMulticastGroup (System.Net.IPAddress multicastAddr);
```

Leaves a multicast group.

Parameters:

- `multicastAddr`: The `IPAddress` of the multicast group to leave.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.
- `ArgumentException`: The IP address is not compatible with the `AddressFamily` value that defines the addressing scheme of the socket.
- `ArgumentNullException`: `multicastAddr` is `null`.

#### Remarks
The `UdpClient.DropMulticastGroup` method withdraws the `UdpClient` from the multicast group identified by the specified `IPAddress`. After calling the `UdpClient.DropMulticastGroup` method, the underlying `Socket` sends an Internet Group Management Protocol (IGMP) packet to the router, removing the router from the multicast group. After a `UdpClient` withdraws from the group, it will no longer be able to receive datagrams sent to that group.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates how to drop a multicast group by providing a multicast address.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## UdpClient.DropMulticastGroup(IPAddress, Int32) method

```csharp
public void DropMulticastGroup (System.Net.IPAddress multicastAddr, int ifindex);
```

Leaves a multicast group.

Parameters:

- `multicastAddr`: The `IPAddress` of the multicast group to leave.
- `ifindex`: The local address of the multicast group to leave.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.
- `ArgumentException`: The IP address is not compatible with the `AddressFamily` value that defines the addressing scheme of the socket.
- `ArgumentNullException`: `multicastAddr` is `null`.

#### Remarks
The `UdpClient.DropMulticastGroup` method withdraws the `UdpClient` from the multicast group identified by the specified `IPAddress`. After calling the `UdpClient.DropMulticastGroup` method, the underlying `Socket` sends an Internet Group Management Protocol (IGMP) packet to the router, removing the router from the multicast group. After a `UdpClient` withdraws from the group, it will no longer be able to receive datagrams sent to that group.

> **Note:**
>  If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example demonstrates how to drop a multicast group by providing a multicast address.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._

## UdpClient.EndReceive(IAsyncResult, IPEndPoint) method

```csharp
public byte[] EndReceive (IAsyncResult asyncResult, ref System.Net.IPEndPoint? remoteEP);
```

Ends a pending asynchronous receive.

Parameters:

- `asyncResult`: An `IAsyncResult` object returned by a call to `UdpClient.BeginReceive`.
- `remoteEP`: The specified remote endpoint.

Returns: If successful, an array of bytes that contains datagram data.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `UdpClient.BeginReceive` method.
- `InvalidOperationException`: `UdpClient.EndReceive` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the underlying `Socket`.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
This method blocks until the operation is complete.

To perform this operation synchronously, use the `UdpClient.Receive` method.

#### Examples
The following code example uses `UdpClient.BeginSend` to complete an asynchronous receive of a server response.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.EndSend(IAsyncResult) method

```csharp
public int EndSend (IAsyncResult asyncResult);
```

Ends a pending asynchronous send.

Parameters:

- `asyncResult`: An `IAsyncResult` object returned by a call to `BeginSend`.

Returns: If successful, the number of bytes sent to the `UdpClient`.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.
- `ArgumentException`: `asyncResult` was not returned by a call to the `Socket.BeginSend` method.
- `InvalidOperationException`: `Socket.EndSend` was previously called for the asynchronous read.
- `SocketException`: An error occurred when attempting to access the underlying socket.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
This method blocks until the operation is complete.

To perform this operation synchronously, use the `UdpClient.Send` method.

#### Examples
The following code example uses `UdpClient.BeginSend` to complete an asynchronous send of a server request.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.JoinMulticastGroup(IPAddress) method

```csharp
public void JoinMulticastGroup (System.Net.IPAddress multicastAddr);
```

Adds a `UdpClient` to a multicast group.

Parameters:

- `multicastAddr`: The multicast `IPAddress` of the group you want to join.

Exceptions:

- `ObjectDisposedException`: The underlying `Socket` has been closed.
- `SocketException`: An error occurred when accessing the socket.
- `ArgumentException`: The IP address is not compatible with the `AddressFamily` value that defines the addressing scheme of the socket.

#### Remarks
The `UdpClient.JoinMulticastGroup` method subscribes the `UdpClient` to a multicast group using the specified `IPAddress`. After calling the `UdpClient.JoinMulticastGroup` method, the underlying `Socket` sends an Internet Group Management Protocol (IGMP) packet to the router requesting membership to the multicast group. The multicast address range is 224.0.0.0 to 239.255.255.255. If you specify an address outside this range or if the router to which the request is made is not multicast enabled, `UdpClient` will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error. Once the `UdpClient` is listed with the router as a member of the multicast group, it will be able to receive multicasted datagrams sent to the specified `IPAddress`.

> **Note:**
>  You must create the `UdpClient` using the multicast port number; otherwise, you will not be able to receive multicasted datagrams. Do not call the `UdpClient.Connect` method prior to calling the `UdpClient.JoinMulticastGroup` method, or the `UdpClient.Receive` method will not work. You do not need to belong to a multicast group to send datagrams to a multicast IP address.

Before joining a multicast group, make sure the socket is bound to the port or endpoint. You do that by calling one of the constructors that accept a port or an endpoint as a parameter.

To stop receiving multicasted datagrams, call the `UdpClient.DropMulticastGroup` method and provide the `IPAddress` of the group from which you would like to withdraw.

> **Note:**
>  In the IPv6 case, there are several multicast address ranges you can choose from. Please, refer to the IETF RFC 2375.

> **Note:**
>  You cannot call `UdpClient.JoinMulticastGroup` on a `UdpClient` constructed without a specific local port (that is, using the `%23ctor` or `%23ctor` constructor).

#### Examples
The following code example demonstrates how to join a multicast group by providing a multicast address.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IPv6MulticastOption/Overview/joinmulticastgroup.cs._
