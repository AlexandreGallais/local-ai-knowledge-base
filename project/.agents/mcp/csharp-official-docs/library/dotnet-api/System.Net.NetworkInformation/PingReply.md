---
title: "PingReply class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PingReply.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PingReply class

Namespace: `System.Net.NetworkInformation`

```csharp
public class PingReply
```

Provides information about the status and data resulting from a `Send` or `SendAsync` operation.

#### Remarks
The `Ping` class attempts to send an Internet Control Message Protocol (ICMP) echo request to a remote computer and receive information back from the computer via an ICMP echo reply message. The `Ping` class uses instances of the `PingReply` class to return information about the operation, such as its status and the time taken to send the request and receive the reply.

The `Ping.Send` methods return instances of the `PingReply` class directly. The `Ping.SendAsync` methods return a `PingReply` in the `PingCompletedEventHandler` method's `PingCompletedEventArgs` parameter. The `PingReply` is accessed through the `Reply` property.

If the value of `PingReply.Status` is not `Success`, you should not use the values returned by the `PingReply.RoundtripTime`, `PingReply.Options` or `PingReply.Buffer` properties. The `RoundtripTime` property will return zero, the `Buffer` property will return an empty array, and the `Options` property will return `null`.

#### Examples
The following code example demonstrates using `Ping` class to send an ICMP echo request synchronously and display the response.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._

## PingReply.Address property

```csharp
public System.Net.IPAddress Address { get; }
```

Gets the address of the host that sends the Internet Control Message Protocol (ICMP) echo reply.

Returns: An `IPAddress` containing the destination for the ICMP echo message.

#### Remarks
The `PingReply.Address` returned by any of the `Ping.Send` overloads can originate from a malicious remote computer. Do not connect to the remote computer using this address. Use DNS to determine the IP address of the machine to which you want to connect.

#### Examples
The following code example sends an ICMP echo request synchronously and displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## PingReply.Buffer property

```csharp
public byte[] Buffer { get; }
```

Gets the buffer of data received in an Internet Control Message Protocol (ICMP) echo reply message.

Returns: A `Byte` array containing the data received in an ICMP echo reply message, or an empty array, if no reply was received.

#### Remarks
The data buffer sent with the ICMP echo request is returned to the sender in the echo reply so the roundtrip travel time for a packet of a known size can be computed. The data buffer, combined with the `PingOptions.DontFragment` option, can be used to discover the maximum transmission unit for the network path between the source and destination computers. For additional information, see "Traceroute" in RFC 1574, Section 3.2, available at https://www.ietf.org.

The default buffer used with `Ping.Send` and `Ping.SendAsync` contains 32 bytes of data.

#### Examples
The following code example sends an ICMP echo request synchronously and displays the size of the buffer returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## PingReply.Options property

```csharp
public System.Net.NetworkInformation.PingOptions? Options { get; }
```

Gets the options used to transmit the reply to an Internet Control Message Protocol (ICMP) echo request.

Returns: A `PingOptions` object that contains the Time to Live (TTL) and the fragmentation directive used for transmitting the reply if `PingReply.Status` is `IPStatus.Success`; otherwise, `null`.

#### Remarks
The TTL defines the number of times nodes can forward a packet as it travels between its source and destination. If the number of forwards, also known as hops, exceeds the value specified for the TTL, the packet is deemed undeliverable and is discarded.

The `PingOptions.DontFragment` value specified in the ICMP echo request controls packet fragmentation. If `PingOptions.DontFragment` is `true` and the packet size exceeds the maximum transmission unit of the network path taken by the packet, the packet is discarded and the `PacketTooBig` error is returned.

#### Examples
The following code example sends an ICMP echo request synchronously and displays the values stored in the `PingOptions` object returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## PingReply.RoundtripTime property

```csharp
public long RoundtripTime { get; }
```

Gets the number of milliseconds taken to send an Internet Control Message Protocol (ICMP) echo request and receive the corresponding ICMP echo reply message.

Returns: An `Int64` that specifies the round trip time, in milliseconds.

#### Remarks
If the Echo request fails, the `PingReply.RoundtripTime` time is reported as 0, which is also a valid value when the request succeeds. You must check the `PingReply.Status` to determine whether the value returned by this property should be ignored.

#### Examples
The following code example sends an ICMP echo request synchronously and displays the size of the buffer returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Send/pingtest.cs._
## PingReply.Status property

```csharp
public System.Net.NetworkInformation.IPStatus Status { get; }
```

Gets the status of an attempt to send an Internet Control Message Protocol (ICMP) echo request and receive the corresponding ICMP echo reply message.

Returns: An `IPStatus` value indicating the result of the request.

#### Remarks
If the value of `PingReply.Status` is not `Success`, you should not use the values returned by the `PingReply.RoundtripTime`, `PingReply.Options` or `PingReply.Buffer` properties. The `PingReply.RoundtripTime` and `PingReply.Buffer` properties will return zero, and the `Options` property will return `null`.

#### Examples
The following code example demonstrates using `Ping` class to send an ICMP echo request synchronously and display the response.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._
