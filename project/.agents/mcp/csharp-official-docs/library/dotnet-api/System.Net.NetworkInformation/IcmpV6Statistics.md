---
title: "IcmpV6Statistics class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IcmpV6Statistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IcmpV6Statistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IcmpV6Statistics
```

Provides Internet Control Message Protocol for Internet Protocol version 6 (ICMPv6) statistical data for the local computer.

#### Remarks
ICMPV6 is a set of error and informational messages for use with Internet Protocol version 6 (IPv6). This class is used by the `IPGlobalProperties.GetIcmpV6Statistics` method to return ICMPV6 traffic information.

The properties in this class correlate to the Management Information Base objects for ICMPv6 defined in IETF RFC 2466. ICMPv6 is defined in RFC 2463.

#### Examples
The following example displays the current ICMPv6 statistics.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IcmpV6Statistics.IcmpV6Statistics() constructor

```csharp
protected IcmpV6Statistics ();
```

Initializes a new instance of the `IcmpV6Statistics` class.

#### Remarks
This constructor can be called only by classes that derive from `IcmpV6Statistics`.

## IcmpV6Statistics.DestinationUnreachableMessagesReceived property

```csharp
public abstract long DestinationUnreachableMessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) messages received because of a packet having an unreachable address in its destination.

Returns: An `Int64` value that specifies the total number of Destination Unreachable messages received.

#### Remarks
A Destination Unreachable message can be sent to the computer that is the source of a packet for any of the following reasons:

- The computer cannot find a route to the destination address.

- Communication with the destination address is administratively prohibited. For example, a firewall prevents delivery of packets to the destination.

- The destination address is unreachable.

- The destination port is unreachable. For example, there is no listener available for the packet's protocol.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.DestinationUnreachableMessagesSent property

```csharp
public abstract long DestinationUnreachableMessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) messages sent because of a packet having an unreachable address in its destination.

Returns: An `Int64` value that specifies the total number of Destination Unreachable messages sent.

#### Remarks
A Destination Unreachable message can be sent to the computer that is the source of a packet for any of the following reasons:

- The computer cannot find a route to the destination address.

- Communication with the destination address is administratively prohibited. For example, a firewall prevents delivery of packets to the destination.

- The destination address is unreachable.

- The destination port is unreachable. For example, there is no listener available for the packet's protocol.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.EchoRepliesReceived property

```csharp
public abstract long EchoRepliesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Echo Reply messages received.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Reply messages received.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.EchoRepliesSent property

```csharp
public abstract long EchoRepliesSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Echo Reply messages sent.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Reply messages sent.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.EchoRequestsReceived property

```csharp
public abstract long EchoRequestsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Echo Request messages received.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Request messages received.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.EchoRequestsSent property

```csharp
public abstract long EchoRequestsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Echo Request messages sent.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Request messages sent.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.ErrorsReceived property

```csharp
public abstract long ErrorsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) error messages received.

Returns: An `Int64` value that specifies the total number of ICMP error messages received.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.ErrorsSent property

```csharp
public abstract long ErrorsSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) error messages sent.

Returns: An `Int64` value that specifies the total number of ICMP error messages sent.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipQueriesReceived property

```csharp
public abstract long MembershipQueriesReceived { get; }
```

Gets the number of Internet Group management Protocol (IGMP) Group Membership Query messages received.

Returns: An `Int64` value that specifies the total number of Group Membership Query messages received.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipQueriesSent property

```csharp
public abstract long MembershipQueriesSent { get; }
```

Gets the number of Internet Group management Protocol (IGMP) Group Membership Query messages sent.

Returns: An `Int64` value that specifies the total number of Group Membership Query messages sent.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipReductionsReceived property

```csharp
public abstract long MembershipReductionsReceived { get; }
```

Gets the number of Internet Group Management Protocol (IGMP) Group Membership Reduction messages received.

Returns: An `Int64` value that specifies the total number of Group Membership Reduction messages received.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipReductionsSent property

```csharp
public abstract long MembershipReductionsSent { get; }
```

Gets the number of Internet Group Management Protocol (IGMP) Group Membership Reduction messages sent.

Returns: An `Int64` value that specifies the total number of Group Membership Reduction messages sent.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipReportsReceived property

```csharp
public abstract long MembershipReportsReceived { get; }
```

Gets the number of Internet Group Management Protocol (IGMP) Group Membership Report messages received.

Returns: An `Int64` value that specifies the total number of Group Membership Report messages received.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MembershipReportsSent property

```csharp
public abstract long MembershipReportsSent { get; }
```

Gets the number of Internet Group Management Protocol (IGMP) Group Membership Report messages sent.

Returns: An `Int64` value that specifies the total number of Group Membership Report messages sent.

#### Remarks
Multicast routers send Group Membership Query messages to learn which groups have members on each of their attached physical networks. Host computers respond to a Group Membership Query message by sending a Group Membership Report for each multicast group joined by the host. A host computer can also send a Group Membership Report when it joins a new multicast group. Group Membership Reduction messages are sent when a host computer leaves a multicast group.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MessagesReceived property

```csharp
public abstract long MessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) messages received.

Returns: An `Int64` value that specifies the total number of ICMPv6 messages received.

#### Remarks
ICMPv6 messages are sent to communicate errors and information about packets sent using Internet Protocol version 6 (IPv6).

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV6Statistics.MessagesSent property

```csharp
public abstract long MessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) messages sent.

Returns: An `Int64` value that specifies the total number of ICMPv6 messages sent.

#### Remarks
ICMPv6 messages are sent to communicate errors and information about packets sent using Internet Protocol version 6 (IPv6).

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
