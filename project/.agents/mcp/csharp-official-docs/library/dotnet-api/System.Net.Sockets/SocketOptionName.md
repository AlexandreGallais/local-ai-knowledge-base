---
title: "SocketOptionName enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketOptionName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketOptionName enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketOptionName
```

Defines configuration option names.

#### Remarks
The `SocketOptionName` enumeration defines the name of each `Socket` configuration option. Sockets can be configured with the `Socket.SetSocketOption` method.

#### Examples
The following code example uses this enumeration to set socket options.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## SocketOptionName.AcceptConnection field

```csharp
AcceptConnection
```

The socket is listening.

## SocketOptionName.AddMembership field

```csharp
AddMembership
```

Add an IP group membership.

## SocketOptionName.AddSourceMembership field

```csharp
AddSourceMembership
```

Join a source group.

## SocketOptionName.BlockSource field

```csharp
BlockSource
```

Block data from a source.

## SocketOptionName.Broadcast field

```csharp
Broadcast
```

Permit sending broadcast messages on the socket.

## SocketOptionName.BsdUrgent field

```csharp
BsdUrgent
```

Use urgent data as defined in RFC-1222. This option can be set only once; after it is set, it cannot be turned off.

## SocketOptionName.ChecksumCoverage field

```csharp
ChecksumCoverage
```

Set or get the UDP checksum coverage.

## SocketOptionName.Debug field

```csharp
Debug
```

Record debugging information.

## SocketOptionName.DontFragment field

```csharp
DontFragment
```

Do not fragment IP datagrams.

## SocketOptionName.DontLinger field

```csharp
DontLinger
```

Close the socket gracefully without lingering.

## SocketOptionName.DontRoute field

```csharp
DontRoute
```

Do not route; send the packet directly to the interface addresses.

## SocketOptionName.DropMembership field

```csharp
DropMembership
```

Drop an IP group membership.

## SocketOptionName.DropSourceMembership field

```csharp
DropSourceMembership
```

Drop a source group.

## SocketOptionName.Error field

```csharp
Error
```

Gets the error status and clear.

## SocketOptionName.ExclusiveAddressUse field

```csharp
ExclusiveAddressUse
```

Enables a socket to be bound for exclusive access.

## SocketOptionName.Expedited field

```csharp
Expedited
```

Use expedited data as defined in RFC-1222. This option can be set only once; after it is set, it cannot be turned off.

## SocketOptionName.FastOpen field

```csharp
FastOpen
```

Enables TCP Fast Open as defined in RFC-7413. The actual observed behavior depends on OS configuration and the state of the kernel TCP cookie cache. Using TFO is only recommended in controlled networking environments, meaning that each middlebox (for example, firewall, router, proxy) on the networking path between the client and server is known and can be configured to support TFO. Using TFO outside of controlled environments (such as the open internet) can lead to connectivity issues.

## SocketOptionName.HeaderIncluded field

```csharp
HeaderIncluded
```

Indicates that the application provides the IP header for outgoing datagrams.

## SocketOptionName.HopLimit field

```csharp
HopLimit
```

Specifies the maximum number of router hops for an Internet Protocol version 6 (IPv6) packet. This is similar to Time to Live (TTL) for Internet Protocol version 4.

## SocketOptionName.IPOptions field

```csharp
IPOptions
```

Specifies the IP options to be inserted into outgoing datagrams.

## SocketOptionName.IPProtectionLevel field

```csharp
IPProtectionLevel
```

Enables restriction of a IPv6 socket to a specified scope, such as addresses with the same link local or site local prefix. This socket option enables applications to place access restrictions on IPv6 sockets. Such restrictions enable an application running on a private LAN to simply and robustly harden itself against external attacks. This socket option widens or narrows the scope of a listening socket, enabling unrestricted access from public and private users when appropriate, or restricting access only to the same site, as required. This socket option has defined protection levels specified in the `IPProtectionLevel` enumeration.

## SocketOptionName.IpTimeToLive field

```csharp
IpTimeToLive
```

Set the IP header Time-to-Live field.

## SocketOptionName.IPv6Only field

```csharp
IPv6Only
```

Indicates if a socket created for the AF_INET6 address family is restricted to IPv6 communications only. Sockets created for the AF_INET6 address family may be used for both IPv6 and IPv4 communications. Some applications may want to restrict their use of a socket created for the AF_INET6 address family to IPv6 communications only. When this value is non-zero (the default on Windows), a socket created for the AF_INET6 address family can be used to send and receive IPv6 packets only. When this value is zero, a socket created for the AF_INET6 address family can be used to send and receive packets to and from an IPv6 address or an IPv4 address. Note that the ability to interact with an IPv4 address requires the use of IPv4 mapped addresses. This socket option is supported on Windows Vista or later.

## SocketOptionName.KeepAlive field

```csharp
KeepAlive
```

Use keep-alives.

## SocketOptionName.Linger field

```csharp
Linger
```

Linger on close if unsent data is present.

## SocketOptionName.MaxConnections field

```csharp
MaxConnections
```

Not supported; will throw a `SocketException` if used.

## SocketOptionName.MulticastInterface field

```csharp
MulticastInterface
```

Set the interface for outgoing multicast packets.

## SocketOptionName.MulticastLoopback field

```csharp
MulticastLoopback
```

An IP multicast loopback.

## SocketOptionName.MulticastTimeToLive field

```csharp
MulticastTimeToLive
```

An IP multicast Time to Live.

## SocketOptionName.NoChecksum field

```csharp
NoChecksum
```

Send UDP datagrams with checksum set to zero.

## SocketOptionName.NoDelay field

```csharp
NoDelay
```

Disables the Nagle algorithm for send coalescing.

## SocketOptionName.OutOfBandInline field

```csharp
OutOfBandInline
```

Receives out-of-band data in the normal data stream.

## SocketOptionName.PacketInformation field

```csharp
PacketInformation
```

Return information about received packets.

## SocketOptionName.ReceiveBuffer field

```csharp
ReceiveBuffer
```

Specifies the total per-socket buffer space reserved for receives. This is unrelated to the maximum message size or the size of a TCP window.

## SocketOptionName.ReceiveLowWater field

```csharp
ReceiveLowWater
```

Specifies the low water mark for `Receive` operations.

## SocketOptionName.ReceiveTimeout field

```csharp
ReceiveTimeout
```

Receive a time-out. This option applies only to synchronous methods; it has no effect on asynchronous methods such as the `Socket.BeginSend` method.

## SocketOptionName.ReuseAddress field

```csharp
ReuseAddress
```

Allows the socket to be bound to an address that is already in use.

## SocketOptionName.ReuseUnicastPort field

```csharp
ReuseUnicastPort
```

Indicates that the system should defer ephemeral port allocation for outbound connections. This is equivalent to using the Winsock2 SO_REUSE_UNICASTPORT socket option.

## SocketOptionName.SendBuffer field

```csharp
SendBuffer
```

Specifies the total per-socket buffer space reserved for sends. This is unrelated to the maximum message size or the size of a TCP window.

## SocketOptionName.SendLowWater field

```csharp
SendLowWater
```

Specifies the low water mark for `Send` operations.

## SocketOptionName.SendTimeout field

```csharp
SendTimeout
```

Send a time-out. This option applies only to synchronous methods; it has no effect on asynchronous methods such as the `Socket.BeginSend` method.

## SocketOptionName.TcpKeepAliveInterval field

```csharp
TcpKeepAliveInterval
```

The number of seconds a TCP connection will wait for a keepalive response before sending another keepalive probe.

## SocketOptionName.TcpKeepAliveRetryCount field

```csharp
TcpKeepAliveRetryCount
```

The number of TCP keep alive probes that will be sent before the connection is terminated.

## SocketOptionName.TcpKeepAliveTime field

```csharp
TcpKeepAliveTime
```

The number of seconds a TCP connection will remain alive/idle before keepalive probes are sent to the remote.

## SocketOptionName.Type field

```csharp
Type
```

Gets the socket type.

## SocketOptionName.TypeOfService field

```csharp
TypeOfService
```

Change the IP header type of the service field.

## SocketOptionName.UnblockSource field

```csharp
UnblockSource
```

Unblock a previously blocked source.

## SocketOptionName.UpdateAcceptContext field

```csharp
UpdateAcceptContext
```

Updates an accepted socket's properties by using those of an existing socket. This is equivalent to using the Winsock2 SO_UPDATE_ACCEPT_CONTEXT socket option and is supported only on connection-oriented sockets.

## SocketOptionName.UpdateConnectContext field

```csharp
UpdateConnectContext
```

Updates a connected socket's properties by using those of an existing socket. This is equivalent to using the Winsock2 SO_UPDATE_CONNECT_CONTEXT socket option and is supported only on connection-oriented sockets.

## SocketOptionName.UseLoopback field

```csharp
UseLoopback
```

Bypass <example-value> when possible.
