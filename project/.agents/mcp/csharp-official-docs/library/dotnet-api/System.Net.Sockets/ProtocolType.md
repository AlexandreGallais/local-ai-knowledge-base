---
title: "ProtocolType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/ProtocolType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProtocolType enum

Namespace: `System.Net.Sockets`

```csharp
public enum ProtocolType
```

Specifies the protocols that the `Socket` class supports.

#### Remarks
The `Socket` class uses the `ProtocolType` enumeration to inform the Windows Sockets API of the requested protocol. Low-level driver software for the requested protocol must be present on the computer for the `Socket` to be created successfully.

## ProtocolType.Ggp field

```csharp
Ggp
```

Gateway To Gateway Protocol.

## ProtocolType.Icmp field

```csharp
Icmp
```

Internet Control Message Protocol.

## ProtocolType.IcmpV6 field

```csharp
IcmpV6
```

Internet Control Message Protocol for IPv6.

## ProtocolType.Idp field

```csharp
Idp
```

Internet Datagram Protocol.

## ProtocolType.Igmp field

```csharp
Igmp
```

Internet Group Management Protocol.

## ProtocolType.IP field

```csharp
IP
```

Internet Protocol.

## ProtocolType.IPSecAuthenticationHeader field

```csharp
IPSecAuthenticationHeader
```

IPv6 Authentication header. For details, see RFC 2292 section 2.2.1, available at https://www.ietf.org.

## ProtocolType.IPSecEncapsulatingSecurityPayload field

```csharp
IPSecEncapsulatingSecurityPayload
```

IPv6 Encapsulating Security Payload header.

## ProtocolType.IPv4 field

```csharp
IPv4
```

Internet Protocol version 4.

## ProtocolType.IPv6 field

```csharp
IPv6
```

Internet Protocol version 6 (IPv6).

## ProtocolType.IPv6DestinationOptions field

```csharp
IPv6DestinationOptions
```

IPv6 Destination Options header.

## ProtocolType.IPv6FragmentHeader field

```csharp
IPv6FragmentHeader
```

IPv6 Fragment header.

## ProtocolType.IPv6HopByHopOptions field

```csharp
IPv6HopByHopOptions
```

IPv6 Hop by Hop Options header.

## ProtocolType.IPv6NoNextHeader field

```csharp
IPv6NoNextHeader
```

IPv6 No next header.

## ProtocolType.IPv6RoutingHeader field

```csharp
IPv6RoutingHeader
```

IPv6 Routing header.

## ProtocolType.Ipx field

```csharp
Ipx
```

Internet Packet Exchange Protocol.

## ProtocolType.ND field

```csharp
ND
```

Net Disk Protocol (unofficial).

## ProtocolType.Pup field

```csharp
Pup
```

PARC Universal Packet Protocol.

## ProtocolType.Raw field

```csharp
Raw
```

Raw IP packet protocol.

## ProtocolType.Spx field

```csharp
Spx
```

Sequenced Packet Exchange protocol.

## ProtocolType.SpxII field

```csharp
SpxII
```

Sequenced Packet Exchange version 2 protocol.

## ProtocolType.Tcp field

```csharp
Tcp
```

Transmission Control Protocol.

## ProtocolType.Udp field

```csharp
Udp
```

User Datagram Protocol.

## ProtocolType.Unknown field

```csharp
Unknown
```

Unknown protocol.

## ProtocolType.Unspecified field

```csharp
Unspecified
```

Unspecified protocol.
