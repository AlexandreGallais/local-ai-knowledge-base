---
title: "IcmpV4Statistics class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IcmpV4Statistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IcmpV4Statistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IcmpV4Statistics
```

Provides Internet Control Message Protocol for IPv4 (ICMPv4) statistical data for the local computer.

#### Remarks
ICMPv4 is a set of error and informational messages for use with Internet Protocol version 4. ICMP version 4 is defined in IETF RFC 792.

This class is used by the `IPGlobalProperties.GetIcmpV4Statistics` method to return ICMPv4 traffic information.

#### Examples
The following example displays the current ICMPv4 statistics.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IcmpV4Statistics.IcmpV4Statistics() constructor

```csharp
protected IcmpV4Statistics ();
```

Initializes a new instance of the `IcmpV4Statistics` class.

#### Remarks
This constructor can be called only by classes that derive from `IcmpV4Statistics`.

## IcmpV4Statistics.AddressMaskRepliesReceived property

```csharp
public abstract long AddressMaskRepliesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Address Mask Reply messages that were received.

Returns: An `Int64` value that specifies the total number of Address Mask Reply messages that were received.

#### Remarks
Address Mask Request and Reply messages are used to determine the number of bits in the subnet mask for the local subnet.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.AddressMaskRepliesSent property

```csharp
public abstract long AddressMaskRepliesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Address Mask Reply messages that were sent.

Returns: An `Int64` value that specifies the total number of Address Mask Reply messages that were sent.

#### Remarks
Address Mask Request and Reply messages are used to determine the number of bits in the subnet mask for the local subnet.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.AddressMaskRequestsReceived property

```csharp
public abstract long AddressMaskRequestsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Address Mask Request messages that were received.

Returns: An `Int64` value that specifies the total number of Address Mask Request messages that were received.

#### Remarks
Address Mask Request and Reply messages are used to determine the number of bits in the subnet mask for the local subnet.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.AddressMaskRequestsSent property

```csharp
public abstract long AddressMaskRequestsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Address Mask Request messages that were sent.

Returns: An `Int64` value that specifies the total number of Address Mask Request messages that were sent.

#### Remarks
Address Mask Request and Reply messages are used to determine the number of bits in the subnet mask for the local subnet.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.DestinationUnreachableMessagesReceived property

```csharp
public abstract long DestinationUnreachableMessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) messages that were received because of a packet having an unreachable address in its destination.

Returns: An `Int64` value that specifies the total number of Destination Unreachable messages that were received.

#### Remarks
A Destination Unreachable message can be sent to the computer that is the source of a packet for any of the following reasons:

- The computer cannot find a route to the destination address.

- Communication with the destination address is administratively prohibited. For example, a firewall prevents delivery of packets to the destination.

- The destination address is unreachable.

- The destination port is unreachable. For example, there is no listener available for the packet's protocol.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.DestinationUnreachableMessagesSent property

```csharp
public abstract long DestinationUnreachableMessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) messages that were sent because of a packet having an unreachable address in its destination.

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

## IcmpV4Statistics.EchoRepliesReceived property

```csharp
public abstract long EchoRepliesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Echo Reply messages that were received.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Reply messages that were received.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.EchoRepliesSent property

```csharp
public abstract long EchoRepliesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Echo Reply messages that were sent.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Reply messages that were sent.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.EchoRequestsReceived property

```csharp
public abstract long EchoRequestsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Echo Request messages that were received.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Request messages that were received.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.EchoRequestsSent property

```csharp
public abstract long EchoRequestsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Echo Request messages that were sent.

Returns: An `Int64` value that specifies the total number of number of ICMP Echo Request messages that were sent.

#### Remarks
Echo Request and Echo Reply messages allow a computer to request an ICMP response from a remote computer on a network. This functionality is often used to determine the validity of remote addresses.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.ErrorsReceived property

```csharp
public abstract long ErrorsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) error messages that were received.

Returns: An `Int64` value that specifies the total number of ICMP error messages that were received.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.ErrorsSent property

```csharp
public abstract long ErrorsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) error messages that were sent.

Returns: An `Int64` value that specifies the total number of number of ICMP error messages that were sent.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.MessagesReceived property

```csharp
public abstract long MessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol messages that were received.

Returns: An `Int64` value that specifies the total number of ICMPv4 messages that were received.

#### Remarks
ICMPv4 messages are sent to communicate errors and information about packets that were sent using the Internet Protocol version 4 (IPv4).

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.MessagesSent property

```csharp
public abstract long MessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) messages that were sent.

Returns: An `Int64` value that specifies the total number of ICMPv4 messages that were sent.

#### Remarks
ICMPV4 messages are sent to communicate errors and information about packets that were sent using Internet Protocol version 4 (IPv4).

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.ParameterProblemsReceived property

```csharp
public abstract long ParameterProblemsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Parameter Problem messages that were received.

Returns: An `Int64` value that specifies the total number of ICMP Parameter Problem messages that were received.

#### Remarks
Parameter Problem messages are sent when a host computer or router encounters problems while processing the contents of a packet header, such as encountering an invalid IPv4 option or an invalid Next Header type.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.ParameterProblemsSent property

```csharp
public abstract long ParameterProblemsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Parameter Problem messages that were sent.

Returns: An `Int64` value that specifies the total number of ICMP Parameter Problem messages that were sent.

#### Remarks
Parameter Problem messages are sent when a host computer or router encounters problems while processing the contents of a packet header, such as encountering an invalid IPv4 option or an invalid Next Header type.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.RedirectsReceived property

```csharp
public abstract long RedirectsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Redirect messages that were received.

Returns: An `Int64` value that specifies the total number of ICMP Redirect messages that were received.

#### Remarks
Redirect messages are sent by routers to inform a host computer of a better route for a destination address.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.RedirectsSent property

```csharp
public abstract long RedirectsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Redirect messages that were sent.

Returns: An `Int64` value that specifies the total number of ICMP Redirect messages that were sent.

#### Remarks
Redirect messages are sent by routers to inform a host computer of a better route for a destination address.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
