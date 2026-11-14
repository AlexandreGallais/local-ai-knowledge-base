---
title: "UdpStatistics class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/UdpStatistics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UdpStatistics class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class UdpStatistics
```

Provides User Datagram Protocol (UDP) statistical data.

#### Remarks
Instances of this class are returned by the `IPGlobalProperties.GetUdpIPv4Statistics` and `IPGlobalProperties.GetUdpIPv6Statistics` methods to give applications access to UDP traffic information.

The information in this class correlates to the management information objects described in https://www.ietf.org/rfc/rfc2013.txt.

#### Examples
The following code example displays the UDP statistics for the specified address family.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## UdpStatistics.UdpStatistics() constructor

```csharp
protected UdpStatistics ();
```

Initializes a new instance of the `UdpStatistics` class.

#### Remarks
This constructor can be called only by classes that derive from `UdpStatistics`.

## UdpStatistics.DatagramsReceived property

```csharp
public abstract long DatagramsReceived { get; }
```

Gets the number of User Datagram Protocol (UDP) datagrams that were received.

Returns: An `Int64` value that specifies the total number of datagrams that were delivered to UDP users.

#### Remarks
The number returned by this property does not include datagrams that were received but not deliverable.

#### Examples
The following code example displays the UDP statistics for the specified address family.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## UdpStatistics.DatagramsSent property

```csharp
public abstract long DatagramsSent { get; }
```

Gets the number of User Datagram Protocol (UDP) datagrams that were sent.

Returns: An `Int64` value that specifies the total number of datagrams that were sent.

#### Examples
The following code example displays the UDP statistics for the specified Internet Protocol version.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## UdpStatistics.IncomingDatagramsDiscarded property

```csharp
public abstract long IncomingDatagramsDiscarded { get; }
```

Gets the number of User Datagram Protocol (UDP) datagrams that were received and discarded because of port errors.

Returns: An `Int64` value that specifies the total number of received UDP datagrams that were discarded because there was no listening application at the destination port.

#### Remarks
To find the total number of datagrams that could not be delivered, add the values that were returned by this property and the `IncomingDatagramsWithErrors` property.

#### Examples
The following code example displays the UDP statistics for the specified Internet Protocol version.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## UdpStatistics.IncomingDatagramsWithErrors property

```csharp
public abstract long IncomingDatagramsWithErrors { get; }
```

Gets the number of User Datagram Protocol (UDP) datagrams that were received and discarded because of errors other than bad port information.

Returns: An `Int64` value that specifies the total number of received UDP datagrams that could not be delivered for reasons other than the lack of an application at the destination port.

#### Remarks
To find the total number of datagrams that could not be delivered, add the values that were returned by this property and the `IncomingDatagramsDiscarded` property.

#### Examples
The following code example displays the UDP statistics for the specified Internet Protocol version.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## UdpStatistics.UdpListeners property

```csharp
public abstract int UdpListeners { get; }
```

Gets the number of local endpoints that are listening for User Datagram Protocol (UDP) datagrams.

Returns: An `Int64` value that specifies the total number of sockets that are listening for UDP datagrams.

#### Remarks
You can use the `UdpClient` and `Socket` classes to create UDP listener applications.

#### Examples
The following code example displays the UDP statistics for the specified Internet Protocol version.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
