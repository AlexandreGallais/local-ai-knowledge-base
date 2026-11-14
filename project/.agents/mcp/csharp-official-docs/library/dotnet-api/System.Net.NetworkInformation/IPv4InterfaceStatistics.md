---
title: "IPv4InterfaceStatistics class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPv4InterfaceStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPv4InterfaceStatistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPv4InterfaceStatistics
```

Provides statistical data for a network interface on the local computer.

#### Remarks
This class is used by the `NetworkInterface.GetIPv4Statistics` method to return network traffic information for an interface.

## IPv4InterfaceStatistics.IPv4InterfaceStatistics() constructor

```csharp
protected IPv4InterfaceStatistics ();
```

Initializes a new instance of the `IPv4InterfaceStatistics` class.

#### Remarks
This constructor can be called only by classes that derive from `IPv4InterfaceStatistics`.

## IPv4InterfaceStatistics.BytesReceived property

```csharp
public abstract long BytesReceived { get; }
```

Gets the number of bytes that were received on the interface.

Returns: An `Int64` value that specifies the total number of bytes that were received on the interface.

To be added.

## IPv4InterfaceStatistics.BytesSent property

```csharp
public abstract long BytesSent { get; }
```

Gets the number of bytes that were sent on the interface.

Returns: An `Int64` value that specifies the total number of bytes that were transmitted on the interface.

To be added.

## IPv4InterfaceStatistics.IncomingPacketsDiscarded property

```csharp
public abstract long IncomingPacketsDiscarded { get; }
```

Gets the number of incoming packets that were discarded.

Returns: An `Int64` value that specifies the total number of discarded incoming packets.

#### Remarks
This data does not include packets with errors.

## IPv4InterfaceStatistics.IncomingPacketsWithErrors property

```csharp
public abstract long IncomingPacketsWithErrors { get; }
```

Gets the number of incoming packets with errors.

Returns: An `Int64` value that specifies the total number of incoming packets with errors.

#### Remarks
This data does not include packets without errors that were discarded.

## IPv4InterfaceStatistics.IncomingUnknownProtocolPackets property

```csharp
public abstract long IncomingUnknownProtocolPackets { get; }
```

Gets the number of incoming packets with an unknown protocol that were received on the interface.

Returns: An `Int64` value that specifies the total number of incoming packets with an unknown protocol.

#### Remarks
This data reflects packets that were discarded because the protocol identifier in the packet header was not recognized.

## IPv4InterfaceStatistics.NonUnicastPacketsReceived property

```csharp
public abstract long NonUnicastPacketsReceived { get; }
```

Gets the number of non-unicast packets that were received on the interface.

Returns: An `Int64` value that specifies the total number of non-unicast packets that were received on the interface.

#### Remarks
Packets with unicast addresses are delivered to a single interface. Packets with non-unicast addresses can be delivered to multiple interfaces. Anycast, broadcast, and multicast addresses are types of non-unicast addresses.

## IPv4InterfaceStatistics.NonUnicastPacketsSent property

```csharp
public abstract long NonUnicastPacketsSent { get; }
```

Gets the number of non-unicast packets that were sent on the interface.

Returns: An `Int64` value that specifies the total number of non-unicast packets that were sent on the interface.

#### Remarks
Packets with unicast addresses are delivered to a single interface. Packets with non-unicast addresses can be delivered to multiple interfaces. Anycast, broadcast, and multicast addresses are types of non-unicast addresses.

## IPv4InterfaceStatistics.OutgoingPacketsDiscarded property

```csharp
public abstract long OutgoingPacketsDiscarded { get; }
```

Gets the number of outgoing packets that were discarded.

Returns: An `Int64` value that specifies the total number of discarded outgoing packets.

#### Remarks
This data does not include outgoing packets with errors.

## IPv4InterfaceStatistics.OutgoingPacketsWithErrors property

```csharp
public abstract long OutgoingPacketsWithErrors { get; }
```

Gets the number of outgoing packets with errors.

Returns: An `Int64` value that specifies the total number of outgoing packets with errors.

#### Remarks
This data does not include packets without errors that were discarded.

## IPv4InterfaceStatistics.OutputQueueLength property

```csharp
public abstract long OutputQueueLength { get; }
```

Gets the length of the output queue.

Returns: An `Int64` value that specifies the maximum length of the output queue in packets.

To be added.

## IPv4InterfaceStatistics.UnicastPacketsReceived property

```csharp
public abstract long UnicastPacketsReceived { get; }
```

Gets the number of unicast packets that were received on the interface.

Returns: An `Int64` value that specifies the total number of unicast packets that were received on the interface.

#### Remarks
Packets with unicast addresses are delivered to a single interface. Packets with non-unicast addresses can be delivered to multiple interfaces. Anycast, broadcast, and multicast addresses are types of non-unicast addresses.

## IPv4InterfaceStatistics.UnicastPacketsSent property

```csharp
public abstract long UnicastPacketsSent { get; }
```

Gets the number of unicast packets that were sent on the interface.

Returns: An `Int64` value that specifies the total number of unicast packets that were sent on the interface.

#### Remarks
Packets with unicast addresses are delivered to a single interface. Packets with non-unicast addresses can be delivered to multiple interfaces. Anycast, broadcast, and multicast addresses are types of non-unicast addresses.
