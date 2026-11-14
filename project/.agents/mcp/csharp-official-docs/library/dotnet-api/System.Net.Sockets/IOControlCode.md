---
title: "IOControlCode enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/IOControlCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IOControlCode enum

Namespace: `System.Net.Sockets`

```csharp
public enum IOControlCode
```

Specifies the IO control codes supported by the `Socket.IOControl` method.

The `IOControlCode` enumeration provides named values for specifying socket operational modes. These values are the control codes passed to the Windows Sockets 2 (Winsock 2) `WSAIoctl` function.

#### Examples
The following code example calls the `IOControl` method with a DataToRead parameter value and compares the result with accessing the.`Available` property.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/IOControlCode/Overview/iocontrolcode.cs._
## IOControlCode.AbsorbRouterAlert field

```csharp
AbsorbRouterAlert
```

This value is equal to the Winsock 2 SIO_ABSORB_RTRALERT constant.

## IOControlCode.AddMulticastGroupOnInterface field

```csharp
AddMulticastGroupOnInterface
```

Join a multicast group using an interface identified by its index. This value is equal to the Winsock 2 SIO_INDEX_ADD_MCAST constant.

## IOControlCode.AddressListChange field

```csharp
AddressListChange
```

Enable receiving notification when the list of local interfaces for the socket's protocol family changes. This value is equal to the Winsock 2 SIO_ADDRESS_LIST_CHANGE constant.

## IOControlCode.AddressListQuery field

```csharp
AddressListQuery
```

Return the list of local interfaces that the socket can bind to. This value is equal to the Winsock 2 SIO_ADDRESS_LIST_QUERY constant.

## IOControlCode.AddressListSort field

```csharp
AddressListSort
```

Sort the structure returned by the `IOControlCode.AddressListQuery` field and add scope ID information for IPv6 addresses. This value is equal to the Winsock 2 `SIO_ADDRESS_LIST_SORT` constant.

## IOControlCode.AssociateHandle field

```csharp
AssociateHandle
```

Associate this socket with the specified handle of a companion interface. Refer to the appropriate  protocol-specific annex in the Winsock 2 reference or documentation for the particular companion interface for additional details. It is recommended that the Component Object Model (COM) be used instead of this IOCTL to discover and track other interfaces that might be supported by a socket. This control code is present for backward compatibility with systems where COM is not available or cannot be used for some other reason. This value is equal to the Winsock 2 SIO_ASSOCIATE_HANDLE constant.

## IOControlCode.AsyncIO field

```csharp
AsyncIO
```

Enable notification for when data is waiting to be received. This value is equal to the Winsock 2 FIOASYNC constant.

## IOControlCode.BindToInterface field

```csharp
BindToInterface
```

Bind the socket to a specified interface index. This value is equal to the Winsock 2 SIO_INDEX_BIND constant.

## IOControlCode.DataToRead field

```csharp
DataToRead
```

Return the number of bytes available for reading. This value is equal to the Winsock 2 FIONREAD constant.

## IOControlCode.DeleteMulticastGroupFromInterface field

```csharp
DeleteMulticastGroupFromInterface
```

Remove the socket from a multicast group. This value is equal to the Winsock 2 SIO_INDEX_ADD_MCAST constant.

## IOControlCode.EnableCircularQueuing field

```csharp
EnableCircularQueuing
```

Replace the oldest queued datagram with an incoming datagram when the incoming message queues are full. This value is equal to the Winsock 2 SIO_ENABLE_CIRCULAR_QUEUEING constant.

## IOControlCode.Flush field

```csharp
Flush
```

Discard the contents of the sending queue. This value is equal to the Winsock 2 SIO_FLUSH constant.

## IOControlCode.GetBroadcastAddress field

```csharp
GetBroadcastAddress
```

Return a SOCKADDR structure that contains the broadcast address for the address family of the current socket. The returned address can be used with the `SendTo` method. This value is equal to the Winsock 2 SIO_GET_BROADCAST_ADDRESS constant. This value can be used on User Datagram Protocol (UDP) sockets only.

## IOControlCode.GetExtensionFunctionPointer field

```csharp
GetExtensionFunctionPointer
```

Obtain provider-specific functions that are not part of the Winsock specification. Functions are specified using their provider-assigned GUID. This value is equal to the Winsock 2 SIO_GET_EXTENSION_FUNCTION_POINTER constant.

## IOControlCode.GetGroupQos field

```csharp
GetGroupQos
```

Return the Quality of Service (QOS) attributes for the socket group. This value is reserved for future use, and is equal to the Winsock 2 SIO_GET_GROUP_QOS constant.

## IOControlCode.GetQos field

```csharp
GetQos
```

Retrieve the QOS structure associated with the socket. This value is equal to the Winsock 2 SIO_GET_QOS constant.

## IOControlCode.KeepAliveValues field

```csharp
KeepAliveValues
```

Control sending TCP keep-alive packets and the interval at which they are sent. For additional information, see RFC 1122 section 4.2.3.6. This value is equal to the Winsock 2 SIO_KEEPALIVE_VALS constant.

## IOControlCode.LimitBroadcasts field

```csharp
LimitBroadcasts
```

This value is equal to the Winsock 2 SIO_LIMIT_BROADCASTS constant.

## IOControlCode.MulticastInterface field

```csharp
MulticastInterface
```

Set the interface used for outgoing multicast packets. The interface is identified by its index.  This value is equal to the Winsock 2 SIO_INDEX_MCASTIF constant.

## IOControlCode.MulticastScope field

```csharp
MulticastScope
```

Control the number of times a multicast packet can be forwarded by a router, also known as the Time to Live (TTL), or hop count. This value is equal to the Winsock 2 SIO_MULTICAST_SCOPE constant.

## IOControlCode.MultipointLoopback field

```csharp
MultipointLoopback
```

Control whether multicast data sent by the socket appears as incoming data in the sockets receive queue. This value is equal to the Winsock 2 SIO_MULTIPOINT_LOOPBACK constant.

## IOControlCode.NamespaceChange field

```csharp
NamespaceChange
```

Control whether the socket receives notification when a namespace query becomes invalid. This value is equal to the Winsock 2 `SIO_NSP_NOTIFY_CHANGE` constant.

## IOControlCode.NonBlockingIO field

```csharp
NonBlockingIO
```

Control the blocking behavior of the socket. If the argument specified with this control code is zero, the socket is placed in blocking mode. If the argument is nonzero, the socket is placed in nonblocking mode. This value is equal to the Winsock 2 FIONBIO constant.

## IOControlCode.OobDataRead field

```csharp
OobDataRead
```

Return information about out-of-band data waiting to be received. When using this control code on stream sockets, the return value indicates the number of bytes available.

## IOControlCode.QueryTargetPnpHandle field

```csharp
QueryTargetPnpHandle
```

Retrieve the underlying provider's SOCKET handle. This handle can be used to receive plug-and-play event notification. This value is equal to the Winsock 2 SIO_QUERY_TARGET_PNP_HANDLE constant.

## IOControlCode.ReceiveAll field

```csharp
ReceiveAll
```

Enable receiving all IPv4 packets on the network. The socket must have address family `AddressFamily.InterNetwork`, the socket type must be `SocketType.Raw`, and the protocol type must be `ProtocolType.IP`. The current user must belong to the Administrators group on the local computer, and the socket must be bound to a specific port. This value is equal to the Winsock 2 SIO_RCVALL constant.

## IOControlCode.ReceiveAllIgmpMulticast field

```csharp
ReceiveAllIgmpMulticast
```

Enable receiving all Internet Group Management Protocol (IGMP) packets on the network. The socket must have address family `AddressFamily.InterNetwork`, the socket type must be `SocketType.Raw`, and the protocol type must be `ProtocolType.Igmp`. The current user must belong to the Administrators group on the local computer, and the socket must be bound to a specific port. This value is equal to the Winsock 2 SIO_RCVALL_IGMPMCAST constant.

## IOControlCode.ReceiveAllMulticast field

```csharp
ReceiveAllMulticast
```

Enable receiving all multicast IPv4 packets on the network. These are packets with destination addresses in the range 224.0.0.0 through 239.255.255.255. The socket must have address family `AddressFamily.InterNetwork`, the socket type must be `SocketType.Raw`, and the protocol type must be `ProtocolType.Udp`. The current user must belong to the Administrators group on the local computer, and the socket must be bound to a specific port. This value is equal to the Winsock 2 SIO_RCVALL_MCAST constant.

## IOControlCode.RoutingInterfaceChange field

```csharp
RoutingInterfaceChange
```

Enable receiving notification when the local interface used to access a remote endpoint changes. This value is equal to the Winsock 2 SIO_ROUTING_INTERFACE_CHANGE constant.

## IOControlCode.RoutingInterfaceQuery field

```csharp
RoutingInterfaceQuery
```

Return the interface addresses that can be used to connect to the specified remote address. This value is equal to the Winsock 2 SIO_ROUTING_INTERFACE_QUERY constant.

## IOControlCode.SetGroupQos field

```csharp
SetGroupQos
```

Set the Quality of Service (QOS) attributes for the socket group. This value is reserved for future use and is equal to the Winsock 2 SIO_SET_GROUP_QOS constant.

## IOControlCode.SetQos field

```csharp
SetQos
```

Set the Quality of Service (QOS) attributes for the socket. QOS defines the bandwidth requirements for the socket. This value is equal to the Winsock 2 SIO_SET_QOS constant.

## IOControlCode.TranslateHandle field

```csharp
TranslateHandle
```

Return a handle for the socket that is valid in the context of a companion interface. This value is equal to the Winsock 2 SIO_TRANSLATE_HANDLE constant.

## IOControlCode.UnicastInterface field

```csharp
UnicastInterface
```

Set the interface used for outgoing unicast packets. This value is equal to the Winsock 2 SIO_UCAST_IF constant.
