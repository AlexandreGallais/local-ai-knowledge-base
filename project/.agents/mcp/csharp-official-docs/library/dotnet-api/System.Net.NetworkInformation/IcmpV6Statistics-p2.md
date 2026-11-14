---
title: "IcmpV6Statistics class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IcmpV6Statistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IcmpV6Statistics class (part 2 of 3)

## IcmpV6Statistics.NeighborAdvertisementsReceived property

```csharp
public abstract long NeighborAdvertisementsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Neighbor Advertisement messages received.

Returns: An `Int64` value that specifies the total number of ICMP Neighbor Advertisement messages received.

#### Remarks
Neighbor Discovery is a process whereby host computers and routers can determine the addresses for neighbors known to reside on shared links. Part of this discovery process is accomplished using ICMP messages called Neighbor Solicitations and Neighbor Advertisements. Neighbor Solicitation messages are sent to discover the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. A Neighbor Advertisement that contains address information is sent in response to a solicitation or to announce an address change.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.NeighborAdvertisementsSent property

```csharp
public abstract long NeighborAdvertisementsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Neighbor Advertisement messages sent.

Returns: An `Int64` value that specifies the total number of Neighbor Advertisement messages sent.

#### Remarks
Neighbor Discovery is a process whereby host computers and routers can determine the addresses for neighbors known to reside on shared links. Part of this discovery process is accomplished using ICMP messages called Neighbor Solicitations and Neighbor Advertisements. Neighbor Solicitation messages are sent to discover the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. A Neighbor Advertisement that contains address information is sent in response to a solicitation or to announce an address change.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.NeighborSolicitsReceived property

```csharp
public abstract long NeighborSolicitsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Neighbor Solicitation messages received.

Returns: An `Int64` value that specifies the total number of Neighbor Solicitation messages received.

#### Remarks
Neighbor Discovery is a process whereby host computers and routers can determine the addresses for neighbors known to reside on shared links. Part of this discovery process is accomplished using ICMP messages called Neighbor Solicitations and Neighbor Advertisements. Neighbor Solicitation messages are sent to discover the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. A Neighbor Advertisement that contains address information is sent in response to a solicitation or to announce an address change.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.NeighborSolicitsSent property

```csharp
public abstract long NeighborSolicitsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Neighbor Solicitation messages sent.

Returns: An `Int64` value that specifies the total number of Neighbor Solicitation messages sent.

#### Remarks
Neighbor Discovery is a process whereby host computers and routers can determine the addresses for neighbors known to reside on shared links. Part of this discovery process is accomplished using ICMP messages called Neighbor Solicitations and Neighbor Advertisements. Neighbor Solicitation messages are sent to discover the link-layer address of a neighbor or to verify that a neighbor is still reachable via a cached link-layer address. A Neighbor Advertisement that contains address information is sent in response to a solicitation or to announce an address change.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.PacketTooBigMessagesReceived property

```csharp
public abstract long PacketTooBigMessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Packet Too Big messages received.

Returns: An `Int64` value that specifies the total number of ICMP Packet Too Big messages received.

#### Remarks
A router sends a Packet Too Big message when a packet cannot be forwarded because it is larger than the maximum transmission unit (MTU) of the outgoing link.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.PacketTooBigMessagesSent property

```csharp
public abstract long PacketTooBigMessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Packet Too Big messages sent.

Returns: An `Int64` value that specifies the total number of ICMP Packet Too Big messages sent.

#### Remarks
A router sends a Packet Too Big message when a packet cannot be forwarded because it is larger than the maximum transmission unit (MTU) of the outgoing link.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.ParameterProblemsReceived property

```csharp
public abstract long ParameterProblemsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Parameter Problem messages received.

Returns: An `Int64` value that specifies the total number of ICMP Parameter Problem messages received.

#### Remarks
Parameter Problem messages are sent when a host computer or router encounters problems while processing the contents of a packet header, such as encountering a invalid IPv6 option or a invalid Next Header type.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.ParameterProblemsSent property

```csharp
public abstract long ParameterProblemsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Parameter Problem messages sent.

Returns: An `Int64` value that specifies the total number of ICMP Parameter Problem messages sent.

#### Remarks
Parameter Problem messages are sent when a host computer or router encounters problems while processing the contents of a packet header, such as encountering an invalid IPv6 option or an invalid Next Header type.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RedirectsReceived property

```csharp
public abstract long RedirectsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Redirect messages received.

Returns: An `Int64` value that specifies the total number of ICMP Redirect messages received.

#### Remarks
Redirect messages are sent by routers to inform a host computer of a better route for a destination address.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RedirectsSent property

```csharp
public abstract long RedirectsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Redirect messages sent.

Returns: An `Int64` value that specifies the total number of ICMP Redirect messages sent.

#### Remarks
Redirect messages are sent by routers to inform a host computer of a better route for a destination address.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RouterAdvertisementsReceived property

```csharp
public abstract long RouterAdvertisementsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Router Advertisement messages received.

Returns: An `Int64` value that specifies the total number of Router Advertisement messages received.

#### Remarks
Before a host computer can send IP datagrams beyond its directly attached subnet, it must discover the address of at least one router on that subnet. This discovery can be accomplished using ICMP messages called Router Advertisements and Router Solicitations. An Advertisement message is sent by a router periodically to announce its presence and the addresses of its interfaces. When a computer connects to a network, rather than waiting to receive Router Advertisements, it can send Router Solicitations to request that routers send their advertisements immediately.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RouterAdvertisementsSent property

```csharp
public abstract long RouterAdvertisementsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Router Advertisement messages sent.

Returns: An `Int64` value that specifies the total number of Router Advertisement messages sent.

#### Remarks
Before a host computer can send IP datagrams beyond its directly attached subnet, it must discover the address of at least one router on that subnet. This discovery can be accomplished using ICMP messages called Router Advertisements and Router Solicitations. An Advertisement message is sent by a router periodically to announce its presence and the addresses of its interfaces. When a computer connects to a network, rather than waiting to receive Router Advertisements, it can send Router Solicitations to request that routers send their advertisements immediately.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RouterSolicitsReceived property

```csharp
public abstract long RouterSolicitsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Router Solicitation messages received.

Returns: An `Int64` value that specifies the total number of Router Solicitation messages received.

#### Remarks
Before a host computer can send IP datagrams beyond its directly attached subnet, it must discover the address of at least one router on that subnet. This discovery can be accomplished using ICMP messages called Router Advertisements and Router Solicitations. An Advertisement message is sent by a router periodically to announce its presence and the addresses of its interfaces. When a computer connects to a network, rather than waiting to receive Router Advertisements, it can send Router Solicitations to request that routers send their advertisements immediately.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.RouterSolicitsSent property

```csharp
public abstract long RouterSolicitsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Router Solicitation messages sent.

Returns: An `Int64` value that specifies the total number of Router Solicitation messages sent.

#### Remarks
Before a host computer can send IP datagrams beyond its directly attached subnet, it must discover the address of at least one router on that subnet. This discovery can be accomplished using ICMP messages called Router Advertisements and Router Solicitations. An Advertisement message is sent by a router periodically to announce its presence and the addresses of its interfaces. When a computer connects to a network, rather than waiting to receive Router Advertisements, it can send Router Solicitations to request that routers send their advertisements immediately.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.TimeExceededMessagesReceived property

```csharp
public abstract long TimeExceededMessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Time Exceeded messages received.

Returns: An `Int64` value that specifies the total number of ICMP Time Exceeded messages received.

#### Remarks
A packet's Hop Limit determines how many times it can be forwarded before it is discarded. Each time a packet is forwarded, its Hop Limit value is decremented by one. When the Hop Limit reaches zero or when a router receives a packet with its Hop Limit set to zero, the packet is discarded and the source of the packet receives a Time Exceeded message indicating that the initial Hop Limit was too small or that the packet was caught in a routing loop.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
