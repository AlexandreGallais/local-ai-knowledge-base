---
title: "UdpClient class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/UdpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpClient class (part 2 of 5)

## UdpClient.EnableBroadcast property

```csharp
public bool EnableBroadcast { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `UdpClient` may send broadcast packets.

Returns: `true` if the `UdpClient` allows sending broadcast packets; otherwise, `false`. The default is `false`.

#### Remarks
Broadcasting is limited to a specific subnet. You can broadcast to your local subnet by sending a packet to 255.255.255.255; or, you can use the directed broadcast address, which is the network portion of an Internet Protocol (IP) address with all bits set in the host portion. For example, if your IP address is 192.168.1.40 (a Class C address, with the network portion as the first three octets, and the host portion is the last octet), your directed broadcast address is 192.168.1.255.

#### Examples
The following code example shows the use of the `EnableBroadcast` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.ExclusiveAddressUse property

```csharp
public bool ExclusiveAddressUse { get; set; }
```

Gets or sets a `Boolean` value that specifies whether the `UdpClient` allows only one client to use a port.

Returns: `true` if the `UdpClient` allows only one client to use a specific port; otherwise, `false`. The default is `true`.

Exceptions:

- `SocketException`: An error occurred when attempting to access the underlying socket.
- `ObjectDisposedException`: The underlying `Socket` has been closed.

#### Remarks
By default, multiple clients can use a specific port; however, only one of the clients can perform operations on the network traffic sent to the port. You can use the `ExclusiveAddressUse` property to prevent multiple clients from using a specific port.

This property must be set before the underlying socket is bound to a client port. If you call `%23ctor`, `%23ctor`, `%23ctor`, or `%23ctor`, the client port is bound as a side effect of the constructor, and you cannot subsequently set the `ExclusiveAddressUse` property

#### Examples
The following code example creates a `UdpClient`, and gets and sets the `ExclusiveAddressUse` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.MulticastLoopback property

```csharp
public bool MulticastLoopback { get; set; }
```

Gets or sets a `Boolean` value that specifies whether outgoing multicast packets are delivered to the sending application.

Returns: `true` if the `UdpClient` receives outgoing multicast packets; otherwise, `false`.

#### Remarks
Multicast is a scalable method for many-to-many communication on the Internet. If a process subscribes to a multicast address, any packets sent by that process are received by every other process that has subscribed to the multicast address.

#### Examples
The following code example shows the use of the `MulticastLoopback` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.Ttl property

```csharp
public short Ttl { get; set; }
```

Gets or sets a value that specifies the Time to Live (TTL) value of Internet Protocol (IP) packets sent by the `UdpClient`.

Returns: The TTL value.

#### Remarks
The TTL value indicates the maximum number of routers a packet can traverse before the router discards the packet and an Internet Control Message Protocol (ICMP) "TTL exceeded" error message is returned to the sender.

#### Examples
The following code example shows the use of the `Ttl` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/Available/newudpclient.cs._
## UdpClient.AllowNatTraversal(Boolean) method

```csharp
public void AllowNatTraversal (bool allowed);
```

Enables or disables Network Address Translation (NAT) traversal on a `UdpClient` instance.

Parameters:

- `allowed`: A Boolean value that specifies whether to enable or disable NAT traversal.

#### Remarks
The `UdpClient.AllowNatTraversal` method is used to enable or disable NAT traversal for a `UdpClient` instance. NAT traversal may be provided using Teredo, 6to4, or an ISATAP tunnel.

When the `allowed` parameter is false, the `IPProtectionLevel` option on the associated socket is set to `EdgeRestricted`. This explicitly disables NAT traversal for a `UdpClient` instance.

When the `allowed` parameter is true, the `IPProtectionLevel` option on the associated socket is set to `Unrestricted`. This may allow NAT traversal for a `UdpClient` depending on firewall rules in place on the system.

A Teredo address is an IPv6 address with the prefix of 2001::/32. Teredo addresses can be returned through normal DNS name resolution or enumerated as an IPv6 address assigned to a local interface.

## UdpClient.BeginReceive(AsyncCallback, Object) method

```csharp
public IAsyncResult BeginReceive (AsyncCallback? requestCallback, object? state);
```

Receives a datagram from a remote host asynchronously.

Parameters:

- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the receive operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous receive.

#### Remarks
The asynchronous `UdpClient.BeginReceive` operation must be completed by calling the `UdpClient.EndReceive` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use the `UdpClient.Receive` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example uses `UdpClient.BeginReceive` to asynchronously receive a server response.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.BeginSend(Byte[], Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSend (byte[] datagram, int bytes, AsyncCallback? requestCallback, object? state);
```

Sends a datagram to a remote host asynchronously. The destination was specified previously by a call to `Connect`.

Parameters:

- `datagram`: A `Byte` array that contains the data to be sent.
- `bytes`: The number of bytes to send.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the send operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous send.

#### Remarks
The asynchronous `UdpClient.BeginSend` operation must be completed by calling the `UdpClient.EndSend` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation completes. To block until the operation is complete, use one of the `UdpClient.Send` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example uses `UdpClient.BeginSend` to asynchronously send a server request.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.BeginSend(Byte[], Int32, IPEndPoint, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSend (byte[] datagram, int bytes, System.Net.IPEndPoint? endPoint, AsyncCallback? requestCallback, object? state);
```

Sends a datagram to a destination asynchronously. The destination is specified by a `EndPoint`.

Parameters:

- `datagram`: A `Byte` array that contains the data to be sent.
- `bytes`: The number of bytes to send.
- `endPoint`: The `EndPoint` that represents the destination for the data.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the send operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous send.

#### Remarks
The asynchronous `UdpClient.BeginSend` operation must be completed by calling the `UdpClient.EndSend` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use one of the `UdpClient.Send` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example uses `UdpClient.BeginSend` to asynchronously send a server request.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.BeginSend(Byte[], Int32, String, Int32, AsyncCallback, Object) method

```csharp
public IAsyncResult BeginSend (byte[] datagram, int bytes, string? hostname, int port, AsyncCallback? requestCallback, object? state);
```

Sends a datagram to a destination asynchronously. The destination is specified by the host name and port number.

Parameters:

- `datagram`: A `Byte` array that contains the data to be sent.
- `bytes`: The number of bytes to send.
- `hostname`: The destination host.
- `port`: The destination port number.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the send operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` object that references the asynchronous send.

#### Remarks
The asynchronous `UdpClient.BeginSend` operation must be completed by calling the `UdpClient.EndSend` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use one of the `UdpClient.Send` method overloads.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example uses `UdpClient.BeginSend` to asynchronously send a server request.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/BeginReceive/asyncudp.cs._
## UdpClient.Close() method

```csharp
public void Close ();
```

Closes the UDP connection.

Exceptions:

- `SocketException`: An error occurred when accessing the socket.

#### Remarks
The `UdpClient.Close` disables the underlying `Socket` and releases all managed and unmanaged resources associated with the `UdpClient`.

> **Note:**
>  If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following example demonstrates closing a `UdpClient` by calling the `UdpClient.Close` method.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._

## UdpClient.Connect(IPEndPoint) method

```csharp
public void Connect (System.Net.IPEndPoint endPoint);
```

Establishes a default remote host using the specified network endpoint.

Parameters:

- `endPoint`: An `IPEndPoint` that specifies the network endpoint to which you intend to send data.

Exceptions:

- `SocketException`: An error occurred when accessing the socket.
- `ArgumentNullException`: `endPoint` is `null`.
- `ObjectDisposedException`: The `UdpClient` is closed.

#### Remarks
The `UdpClient.Connect` method establishes a default remote host using the value specified in the `endPoint` parameter. Once established, you do not have to specify a remote host in each call to the `UdpClient.Send` method.

Establishing a default remote host is optional. Specifying a default remote host limits you to that host only. If you want to send datagrams to a different remote host, you must make another call to the `UdpClient.Connect` method or create another `UdpClient` without a default remote host. If you have established a default remote host and you also provide a remote host in your call to the `UdpClient.Send` method, `UdpClient.Send` will throw a `SocketException`. If you receive a `SocketException`, use `SocketException.ErrorCode` to obtain the specific error code. Once you have obtained this code, you can refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

If you call the `Socket.Connect` method, any datagrams that arrive from an address other than the specified default will be discarded. You cannot set the default remote host to a broadcast address using this method unless you inherit from `UdpClient`, use the Client method to obtain the underlying `Socket`, and set the socket option to `Broadcast`.

You can however, broadcast data to the default broadcast address, 255.255.255.255, if you specify `Broadcast` in your call to the `UdpClient.Send` method. If your application requires greater control over broadcast addresses, you can also revert to using the `Socket` class.

> **Note:**
>  Since the UDP protocol is connectionless, the `UdpClient.Connect` method does not block. Do not call the `UdpClient.Connect` method if you intend to receive multicasted datagrams.

#### Examples
The following example uses an `IPEndPoint` to establish a default remote host.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/UdpClient/.ctor/source.cs._
