---
title: "IcmpV6Statistics class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IcmpV6Statistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IcmpV6Statistics class (part 3 of 3)

## IcmpV6Statistics.TimeExceededMessagesSent property

```csharp
public abstract long TimeExceededMessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 6 (ICMPv6) Time Exceeded messages sent.

Returns: An `Int64` value that specifies the total number of ICMP Time Exceeded messages sent.

#### Remarks
A packet's Hop Limit determines how many times it can be forwarded before it is discarded. Each time a packet is forwarded, its Hop Limit value is decremented by one. When the Hop Limit reaches zero or when a router receives a packet with its Hop Limit set to zero, the packet is discarded and the source of the packet receives a Time Exceeded message indicating that the initial Hop Limit was too small or that the packet was caught in a routing loop.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
