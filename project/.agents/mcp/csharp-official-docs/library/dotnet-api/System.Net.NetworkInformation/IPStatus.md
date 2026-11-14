---
title: "IPStatus enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPStatus.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPStatus enum

Namespace: `System.Net.NetworkInformation`

```csharp
public enum IPStatus
```

Reports the status of sending an Internet Control Message Protocol (ICMP) echo message to a computer.

#### Remarks
The `Ping` class uses the values in this enumeration to set the `Status` property. The `Ping` class returns `PingReply` objects when you call the `Ping.Send` or `Ping.SendAsync` methods to check whether you can reach a computer across the network.

> **Warning:**
>  The DestinationProhibited and DestinationProtocolUnreachable enumeration values have the same numeric value. This is possible because DestinationProhibited applies only to IPv6 and DestinationProtocolUnreachable applies only to IPv4.

#### Examples
The following code example sends an ICMP echo message and checks the status.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._

## IPStatus.BadDestination field

```csharp
BadDestination
```

The ICMP echo request failed because the destination IP address cannot receive ICMP echo requests or should never appear in the destination address field of any IP datagram. For example, calling `Send` and specifying IP address "000.0.0.0" returns this status.

## IPStatus.BadHeader field

```csharp
BadHeader
```

The ICMP echo request failed because the header is invalid.

## IPStatus.BadOption field

```csharp
BadOption
```

The ICMP echo request failed because it contains an invalid option.

## IPStatus.BadRoute field

```csharp
BadRoute
```

The ICMP echo request failed because there is no valid route between the source and destination computers.

## IPStatus.DestinationHostUnreachable field

```csharp
DestinationHostUnreachable
```

The ICMP echo request failed because the destination computer is not reachable.

## IPStatus.DestinationNetworkUnreachable field

```csharp
DestinationNetworkUnreachable
```

The ICMP echo request failed because the network that contains the destination computer is not reachable.

## IPStatus.DestinationPortUnreachable field

```csharp
DestinationPortUnreachable
```

The ICMP echo request failed because the port on the destination computer is not available.

## IPStatus.DestinationProhibited field

```csharp
DestinationProhibited
```

The ICMPv6 echo request failed because contact with the destination computer is administratively prohibited. This value applies only to IPv6.

## IPStatus.DestinationProtocolUnreachable field

```csharp
DestinationProtocolUnreachable
```

The ICMP echo request failed because the destination computer that is specified in an ICMP echo message is not reachable, because it does not support the packet's protocol. This value applies only to IPv4. This value is described in IETF RFC 1812 as Communication Administratively Prohibited.

## IPStatus.DestinationScopeMismatch field

```csharp
DestinationScopeMismatch
```

The ICMP echo request failed because the source address and destination address that are specified in an ICMP echo message are not in the same scope. This is typically caused by a router forwarding a packet using an interface that is outside the scope of the source address. Address scopes (link-local, site-local, and global scope) determine where on the network an address is valid.

## IPStatus.DestinationUnreachable field

```csharp
DestinationUnreachable
```

The ICMP echo request failed because the destination computer that is specified in an ICMP echo message is not reachable; the exact cause of problem is unknown.

## IPStatus.HardwareError field

```csharp
HardwareError
```

The ICMP echo request failed because of a hardware error.

## IPStatus.IcmpError field

```csharp
IcmpError
```

The ICMP echo request failed because of an ICMP protocol error.

## IPStatus.NoResources field

```csharp
NoResources
```

The ICMP echo request failed because of insufficient network resources.

## IPStatus.PacketTooBig field

```csharp
PacketTooBig
```

The ICMP echo request failed because the packet containing the request is larger than the maximum transmission unit (MTU) of a node (router or gateway) located between the source and destination. The MTU defines the maximum size of a transmittable packet.

## IPStatus.ParameterProblem field

```csharp
ParameterProblem
```

The ICMP echo request failed because a node (router or gateway) encountered problems while processing the packet header. This is the status if, for example, the header contains invalid field data or an unrecognized option.

## IPStatus.SourceQuench field

```csharp
SourceQuench
```

The ICMP echo request failed because the packet was discarded. This occurs when the source computer's output queue has insufficient storage space, or when packets arrive at the destination too quickly to be processed.

## IPStatus.Success field

```csharp
Success
```

The ICMP echo request succeeded; an ICMP echo reply was received. When you get this status code, the other `PingReply` properties contain valid data.

## IPStatus.TimedOut field

```csharp
TimedOut
```

The ICMP echo Reply was not received within the allotted time. The default time allowed for replies is 5 seconds. You can change this value using the `Send` or `SendAsync` methods that take a `timeout` parameter.

## IPStatus.TimeExceeded field

```csharp
TimeExceeded
```

The ICMP echo request failed because its Time to Live (TTL) value reached zero, causing the forwarding node (router or gateway) to discard the packet.

## IPStatus.TtlExpired field

```csharp
TtlExpired
```

The ICMP echo request failed because its Time to Live (TTL) value reached zero, causing the forwarding node (router or gateway) to discard the packet.

## IPStatus.TtlReassemblyTimeExceeded field

```csharp
TtlReassemblyTimeExceeded
```

The ICMP echo request failed because the packet was divided into fragments for transmission and all of the fragments were not received within the time allotted for reassembly. RFC 2460 specifies 60 seconds as the time limit within which all packet fragments must be received.

## IPStatus.Unknown field

```csharp
Unknown
```

The ICMP echo request failed for an unknown reason.

## IPStatus.UnrecognizedNextHeader field

```csharp
UnrecognizedNextHeader
```

The ICMP echo request failed because the Next Header field does not contain a recognized value. The Next Header field indicates the extension header type (if present) or the protocol above the IP layer, for example, TCP or UDP.
