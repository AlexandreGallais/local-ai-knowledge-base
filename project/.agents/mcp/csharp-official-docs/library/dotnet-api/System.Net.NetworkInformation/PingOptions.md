---
title: "PingOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/PingOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PingOptions class

Namespace: `System.Net.NetworkInformation`

```csharp
public class PingOptions
```

Controls how `Ping` data packets are transmitted.

#### Remarks
The `PingOptions` class provides the `PingOptions.Ttl` and `PingOptions.DontFragment` properties to control how Internet Control Message Protocol (ICMP) echo request packets are transmitted.

The `Ttl` property specifies the Time to Live for packets sent by the `Ping` class. This value indicates the number of routing nodes that can forward a `Ping` packet before it is discarded. Setting this option is useful if you want to test the number of forwards, also known as hops, are required to send a packet from a source computer to a destination computer.

The `DontFragment` property controls whether data sent to a remote host can be divided into multiple packets.  This option is useful if you want to test the maximum transmission unit (MTU) of the routers and gateways used to transmit the packet.

Instances of the `PingOptions` class are passed to the `Ping.Send` and `Ping.SendAsync` methods, and the `PingReply` class returns instances of `PingOptions` via the `Options` property.

For a list of initial property values for an instance of `PingOptions`, see the `PingOptions.%23ctor` constructor.

#### Examples
The following code example uses the `Ping`, `PingOptions` and `PingReply` classes to send an ICMP echo request to the host specified on the command line.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._

## PingOptions.PingOptions() constructor

```csharp
public PingOptions ();
```

Initializes a new instance of the `PingOptions` class.

#### Remarks
The following table shows initial property values for an instance of `PingOptions`.

|Property|Initial Value|
|--------------|-------------------|
|`PingOptions.Ttl`|128|
|`PingOptions.DontFragment`|`false`|

You can set the properties to new values before calling `Ping.Send` or `Ping.SendAsync`.

#### Examples
The following code example demonstrates calling this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IPStatus/Overview/syncping.cs._
## PingOptions.PingOptions(Int32, Boolean) constructor

```csharp
public PingOptions (int ttl, bool dontFragment);
```

Initializes a new instance of the `PingOptions` class and sets the Time to Live and fragmentation values.

Parameters:

- `ttl`: An `Int32` value greater than zero that specifies the number of times that the `Ping` data packets can be forwarded.
- `dontFragment`: `true` to prevent data sent to the remote host from being fragmented; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `ttl` is less than or equal to zero.

#### Remarks
The `ttl` parameter limits the number of routers and gateways that can forward the data. This is useful for testing the length of the route between the local and remote computers. The `dontFragment` parameter allows you to test the maximum transmission unit (MTU) of the routers and gateways used to transmit the packet.

#### Examples
The following code example demonstrates calling this constructor and displaying the new instance's property values.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## PingOptions.DontFragment property

```csharp
public bool DontFragment { get; set; }
```

Gets or sets a `Boolean` value that controls fragmentation of the data sent to the remote host.

Returns: `true` if the data cannot be sent in multiple packets; otherwise `false`. The default is `false`.

#### Remarks
Applications use this property to control whether data sent to a remote host by the `Ping` class can be divided into multiple packets.  This option is useful if you want to test the maximum transmission unit (MTU) of the routers and gateways used to transmit the packet. If this property is `true` and the data sent to the remote host is larger then the MTU of a gateway or router between the sender and the remote host, the ping operation fails with status `PacketTooBig`.

#### Examples
The following code example demonstrates setting the value of this property using a `PingOptions.%23ctor` constructor, and then displaying the value.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
## PingOptions.Ttl property

```csharp
public int Ttl { get; set; }
```

Gets or sets the number of routing nodes that can forward the `Ping` data before it is discarded.

Returns: An `Int32` value that specifies the number of times the `Ping` data packets can be forwarded. The default is 128.

Exceptions:

- `ArgumentOutOfRangeException`: The value specified for a set operation is less than or equal to zero.

#### Remarks
As gateways and routers transmit packets through a network, they decrement the current Time-to-Live (TTL) value found in the packet header. If the TTL value reaches zero, the packet is deemed undeliverable and is discarded. This option is useful if you want to test the number of routers and gateways used to transmit the data.

#### Examples
The following code example demonstrates setting the value of this property using a `PingOptions.%23ctor` constructor, and then displaying the value.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/Ping/Overview/asyncping.cs._
