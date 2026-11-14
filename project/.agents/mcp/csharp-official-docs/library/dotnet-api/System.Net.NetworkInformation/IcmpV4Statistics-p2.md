---
title: "IcmpV4Statistics class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IcmpV4Statistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IcmpV4Statistics class (part 2 of 2)

## IcmpV4Statistics.SourceQuenchesReceived property

```csharp
public abstract long SourceQuenchesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Source Quench messages that were received.

Returns: An `Int64` value that specifies the total number of Source Quench messages that were received.

#### Remarks
Source Quench messages are sent when a packet was discarded because of insufficient space in the output queue. A destination computer can also send a Source Quench message if packets arrive too quickly to be processed. The source quench message is a request to the host to cut back the rate at which it is sending traffic to the Internet destination.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.SourceQuenchesSent property

```csharp
public abstract long SourceQuenchesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Source Quench messages that were sent.

Returns: An `Int64` value that specifies the total number of Source Quench messages that were sent.

#### Remarks
Source Quench messages are sent when a packet was discarded because of insufficient space in the output queue. A destination computer can also send a Source Quench message if packets arrive too quickly to be processed. The source quench message is a request to the host to cut back the rate at which it is sending traffic to the Internet destination.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimeExceededMessagesReceived property

```csharp
public abstract long TimeExceededMessagesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Time Exceeded messages that were received.

Returns: An `Int64` value that specifies the total number of ICMP Time Exceeded messages that were received.

#### Remarks
A packet's Hop Limit determines how many times it can be forwarded before it is discarded. Each time a packet is forwarded, its Hop Limit value is decremented by one. When the Hop Limit reaches zero or when a router receives a packet with its Hop Limit set to zero, the packet is discarded and the source of the packet receives a Time Exceeded message indicating that the initial Hop Limit was too small or that the packet was caught in a routing loop.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimeExceededMessagesSent property

```csharp
public abstract long TimeExceededMessagesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Time Exceeded messages that were sent.

Returns: An `Int64` value that specifies the total number of ICMP Time Exceeded messages that were sent.

#### Remarks
A packet's Hop Limit determines how many times it can be forwarded before it is discarded. Each time a packet is forwarded, its Hop Limit value is decremented by one. When the Hop Limit reaches zero or when a router receives a packet with its Hop Limit set to zero, the packet is discarded and the source of the packet receives a Time Exceeded message indicating that the initial Hop Limit was too small or that the packet was caught in a routing loop.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimestampRepliesReceived property

```csharp
public abstract long TimestampRepliesReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Timestamp Reply messages that were received.

Returns: An `Int64` value that specifies the total number of Timestamp Reply messages that were received.

#### Remarks
A Timestamp Request message causes the receiving computer to send a timestamp reply back to the originating computer. These messages are used to measure the transmission speed on a network.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimestampRepliesSent property

```csharp
public abstract long TimestampRepliesSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Timestamp Reply messages that were sent.

Returns: An `Int64` value that specifies the total number of Timestamp Reply messages that were sent.

#### Remarks
A Timestamp Request message causes the receiving computer to send a timestamp reply back to the originating computer. These messages are used to measure the transmission speed on a network.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimestampRequestsReceived property

```csharp
public abstract long TimestampRequestsReceived { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Timestamp Request messages that were received.

Returns: An `Int64` value that specifies the total number of Timestamp Request messages that were received.

#### Remarks
A Timestamp Request message causes the receiving computer to send a timestamp reply back to the originating computer. These messages are used to measure the transmission speed on a network.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IcmpV4Statistics.TimestampRequestsSent property

```csharp
public abstract long TimestampRequestsSent { get; }
```

Gets the number of Internet Control Message Protocol version 4 (ICMPv4) Timestamp Request messages that were sent.

Returns: An `Int64` value that specifies the total number of Timestamp Request messages that were sent.

#### Remarks
A Timestamp Request message causes the receiving computer to send a timestamp reply back to the originating computer. These messages are used to measure the transmission speed on a network.

#### Examples
The following example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
