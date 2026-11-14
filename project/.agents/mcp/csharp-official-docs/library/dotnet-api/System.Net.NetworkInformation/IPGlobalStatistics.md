---
title: "IPGlobalStatistics class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPGlobalStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPGlobalStatistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPGlobalStatistics
```

Provides Internet Protocol (IP) statistical data.

#### Remarks
This class is used by the `IPGlobalProperties.GetIPv4GlobalStatistics` and `IPGlobalProperties.GetIPv6GlobalStatistics` methods to return IP traffic information.

The Internet protocol is used to move IP packets from a source computer to a destination computer. IP also handles dividing a packet that is too large into multiple packets that are small enough for transport, in a process known as fragmentation.

The properties in this class correlate to the Management Information Base objects for IP defined in IETF RFC 2011.

#### Examples
The following code example displays IP statistics.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalStatistics.IPGlobalStatistics() constructor

```csharp
protected IPGlobalStatistics ();
```

Initializes a new instance of the `IPGlobalStatistics` class.

#### Remarks
This constructor can be called only by classes that derive from `IPGlobalStatistics`.

## IPGlobalStatistics.DefaultTtl property

```csharp
public abstract int DefaultTtl { get; }
```

Gets the default time-to-live (TTL) value for Internet Protocol (IP) packets.

Returns: An `Int64` value that specifies the TTL.

#### Remarks
The TTL value is reported as the number of routing nodes that can forward a packet before it is discarded. Each node decrements the current TTL value in a packet before forwarding it. If the TTL value reaches zero, the packet is deemed undeliverable and is discarded. Note that when a packet travels from one node to another, this is also known as a "hop".

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ForwardingEnabled property

```csharp
public abstract bool ForwardingEnabled { get; }
```

Gets a `Boolean` value that specifies whether Internet Protocol (IP) packet forwarding is enabled.

Returns: A `Boolean` value that specifies whether packet forwarding is enabled.

#### Remarks
This value determines whether the computer forwards IP datagrams destined for another computer. Typically, routers forward packets and host computers do not.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.NumberOfInterfaces property

```csharp
public abstract int NumberOfInterfaces { get; }
```

Gets the number of network interfaces.

Returns: An `Int64` value containing the number of network interfaces for the address family used to obtain this `IPGlobalStatistics` instance.

#### Remarks
The data returned by this property includes loopback interfaces.

Network interfaces are also known as network adapters.

## IPGlobalStatistics.NumberOfIPAddresses property

```csharp
public abstract int NumberOfIPAddresses { get; }
```

Gets the number of Internet Protocol (IP) addresses assigned to the local computer.

Returns: An `Int64` value that indicates the number of IP addresses assigned to the address family (Internet Protocol version 4 or Internet Protocol version 6) described by this object.

#### Remarks
The data returned by this property includes addresses of pseudo network interfaces such as tunnels.

If this instance was obtained by calling `IPGlobalProperties.GetIPv4GlobalStatistics`, this property returns the number of IPv4 addresses assigned to the local computer. Similarly, if this instance was obtained by calling `IPGlobalProperties.GetIPv6GlobalStatistics`, this property returns the number of IPv6 addresses assigned to the local computer.

## IPGlobalStatistics.NumberOfRoutes property

```csharp
public abstract int NumberOfRoutes { get; }
```

Gets the number of routes in the Internet Protocol (IP) routing table.

Returns: An `Int64` value that specifies the total number of routes in the routing table.

To be added.

## IPGlobalStatistics.OutputPacketRequests property

```csharp
public abstract long OutputPacketRequests { get; }
```

Gets the number of outbound Internet Protocol (IP) packets.

Returns: An `Int64` value that specifies the total number of outgoing packets.

#### Remarks
The number of outbound packets does not include the number of packets that have been forwarded.

#### Examples
The following code example displays statistics for outbound IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.OutputPacketRoutingDiscards property

```csharp
public abstract long OutputPacketRoutingDiscards { get; }
```

Gets the number of routes that have been discarded from the routing table.

Returns: An `Int64` value that specifies the total number of valid routes that have been discarded.

#### Remarks
One possible reason for discarding a valid routing table entry could be to free buffer space for other entries.

#### Examples
The following code example displays statistics for outbound IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.OutputPacketsDiscarded property

```csharp
public abstract long OutputPacketsDiscarded { get; }
```

Gets the number of transmitted Internet Protocol (IP) packets that have been discarded.

Returns: An `Int64` value that specifies the total number of outgoing packets that have been discarded.

#### Remarks
The data returned by this property does not include packets discarded because of errors that made the packets undeliverable. Packets included in this data are typically discarded due to network issues, such as insufficient buffer space.

#### Examples
The following code example displays statistics for outbound IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.OutputPacketsWithNoRoute property

```csharp
public abstract long OutputPacketsWithNoRoute { get; }
```

Gets the number of Internet Protocol (IP) packets for which the local computer could not determine a route to the destination address.

Returns: An `Int64` value that specifies the number of packets that could not be sent because a route could not be found.

#### Remarks
IP packets that fall into this category are discarded.

#### Examples
The following code example displays statistics for outbound IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketFragmentFailures property

```csharp
public abstract long PacketFragmentFailures { get; }
```

Gets the number of Internet Protocol (IP) packets that could not be fragmented.

Returns: An `Int64` value that specifies the total number of packets that required fragmentation but had the "Don't Fragment" bit set.

#### Remarks
Packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination. The value returned by this property indicates the number of packets that needed to be fragmented for IP transport but could not be because the packet header specified that the packet not be fragmented.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketReassembliesRequired property

```csharp
public abstract long PacketReassembliesRequired { get; }
```

Gets the number of Internet Protocol (IP) packets that required reassembly.

Returns: An `Int64` value that specifies the total number of packet reassemblies required.

#### Remarks
Packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketReassemblyFailures property

```csharp
public abstract long PacketReassemblyFailures { get; }
```

Gets the number of Internet Protocol (IP) packets that were not successfully reassembled.

Returns: An `Int64` value that specifies the total number of packets that could not be reassembled.

#### Remarks
Packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination. If some fragments are lost or do not arrive within a set time, the reassembly does not succeed.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketReassemblyTimeout property

```csharp
public abstract long PacketReassemblyTimeout { get; }
```

Gets the maximum amount of time within which all fragments of an Internet Protocol (IP) packet must arrive.

Returns: An `Int64` value that specifies the maximum number of milliseconds within which all fragments of a packet must arrive to avoid being discarded.

#### Remarks
Packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination. If all fragments that make up a fragmented IP packet do not arrive within the allowed time, the packet is discarded.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketsFragmented property

```csharp
public abstract long PacketsFragmented { get; }
```

Gets the number of Internet Protocol (IP) packets fragmented.

Returns: An `Int64` value that specifies the total number of fragmented packets.

#### Remarks
Packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.PacketsReassembled property

```csharp
public abstract long PacketsReassembled { get; }
```

Gets the number of Internet Protocol (IP) packets reassembled.

Returns: An `Int64` value that specifies the total number of fragmented packets that have been successfully reassembled.

#### Remarks
Session layer packets that exceed the maximum size for IP transport are broken into fragments and reassembled at the destination. If some fragments are lost or do not arrive within a set time, the reassembly does not succeed.

#### Examples
The following code example displays reassembly statistics for IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPackets property

```csharp
public abstract long ReceivedPackets { get; }
```

Gets the number of Internet Protocol (IP) packets received.

Returns: An `Int64` value that specifies the total number of IP packets received.

#### Remarks
The value returned by this property includes packets received in error.

#### Examples
The following code example displays statistics for received IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPacketsDelivered property

```csharp
public abstract long ReceivedPacketsDelivered { get; }
```

Gets the number of Internet Protocol (IP) packets delivered.

Returns: An `Int64` value that specifies the total number of IP packets delivered.

#### Remarks
The value returned by this property includes Internet Control Message Protocol (ICMP) messages.

#### Examples
The following code example displays statistics for received IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPacketsDiscarded property

```csharp
public abstract long ReceivedPacketsDiscarded { get; }
```

Gets the number of Internet Protocol (IP) packets that have been received and discarded.

Returns: An `Int64` value that specifies the total number of incoming packets that have been discarded.

#### Remarks
The value returned by this property includes only those packets that were discarded even though they did not contain errors that prevented reassembly or delivery. Typically, packets in this category are discarded because of insufficient buffer space.

#### Examples
The following code example displays statistics for received IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalStatistics.ReceivedPacketsForwarded property

```csharp
public abstract long ReceivedPacketsForwarded { get; }
```

Gets the number of Internet Protocol (IP) packets forwarded.

Returns: An `Int64` value that specifies the total number of forwarded packets.

#### Remarks
If the local computer is not a router, the value returned by this property includes packets that were successfully source-routed via the local computer. Source routing is an IP option whereby the source of the packet can specify the route to the destination address.

#### Examples
The following code example displays statistics for received IP packets.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
