---
title: "NetworkInterface class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/NetworkInterface.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkInterface class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class NetworkInterface
```

Provides configuration and statistical information for a network interface.

#### Remarks
This class encapsulates data for network interfaces, also known as adapters, on the local computer. You do not create instances of this class; the `NetworkInterface.GetAllNetworkInterfaces` method returns an array that contains one instance of this class for each network interface on the local computer.

#### Examples
The following code example displays information about interfaces.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## NetworkInterface.NetworkInterface() constructor

```csharp
protected NetworkInterface ();
```

Initializes a new instance of the `NetworkInterface` class.

#### Remarks
This constructor can be called only by classes that derive from the `NetworkInterface` class.

## NetworkInterface.Description property

```csharp
public virtual string Description { get; }
```

Gets the description of the interface.

Returns: A `String` that describes this interface.

#### Remarks
The description is human-readable text that describes the network interface. The information included in the description depends on the capabilities of the operating system.  On Windows, it typically describes the interface vendor, type (for example, Ethernet), brand, and model. On other platforms, it may be as brief as the name of the interface, such as `eth0`.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## NetworkInterface.Id property

```csharp
public virtual string Id { get; }
```

Gets the identifier of the network adapter.

Returns: A `String` that contains the identifier.

To be added.

## NetworkInterface.IPv6LoopbackInterfaceIndex property

```csharp
public static int IPv6LoopbackInterfaceIndex { get; }
```

Gets the index of the IPv6 loopback interface.

Returns: The index for the IPv6 loopback interface.

#### Remarks
A network interface may have different interface indexes for the IPv4 and IPv6 loopback interface. The P:System.Net.NetworkInformation.NetworkInterface.IPv6LoopbackInterfaceIndex property only returns the IPv6 loopback interface.

## NetworkInterface.IsReceiveOnly property

```csharp
public virtual bool IsReceiveOnly { get; }
```

Gets a value that indicates whether the network interface is set to only receive data packets.

Returns: `true` if the interface only receives network traffic; otherwise, `false`.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.LoopbackInterfaceIndex property

```csharp
public static int LoopbackInterfaceIndex { get; }
```

Gets the index of the IPv4 loopback interface.

Returns: A `Int32` that contains the index for the IPv4 loopback interface.

Exceptions:

- `NetworkInformationException`: This property is not valid on computers running only Ipv6.

#### Remarks
The index of the loopback interface is usually 1, but you cannot rely on this. Use the `LoopbackInterfaceIndex` property to get the correct value.

A network interface may have different interface indexes for the IPv4 and IPv6 loopback interface. The `LoopbackInterfaceIndex` property only returns the IPv4 loopback interface.

## NetworkInterface.Name property

```csharp
public virtual string Name { get; }
```

Gets the name of the network adapter.

Returns: A `String` that contains the adapter name.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## NetworkInterface.NetworkInterfaceType property

```csharp
public virtual System.Net.NetworkInformation.NetworkInterfaceType NetworkInterfaceType { get; }
```

Gets the interface type.

Returns: An `NetworkInterfaceType` value that specifies the network interface type.

#### Remarks
The interface types are described in detail in the `NetworkInterfaceType` enumeration documentation.

In principle, this property can return any member of the `NetworkInterfaceType` enumeration. The specific value that it does return is dependent on the runtime conditions of the underlying network topology. This means that:

- It is not possible to determine in advance which value the property returns for a particular network.

- It is possible that in practice on a particular network, the full range of enumeration values is not available. For example, on a gigabit Ethernet network, it is possible that the property returns `Ethernet` rather than `GigabitEthernet`.

#### Examples
The following example displays type information for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.OperationalStatus property

```csharp
public virtual System.Net.NetworkInformation.OperationalStatus OperationalStatus { get; }
```

Gets the current operational state of the network connection.

Returns: One of the `OperationalStatus` values.

#### Remarks
The operational status values are described in detail in the `OperationalStatus` enumeration documentation.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## NetworkInterface.Speed property

```csharp
public virtual long Speed { get; }
```

Gets the speed of the network interface.

Returns: A `Int64` value that specifies the speed in bits per second.

#### Remarks
The value returned by this property is reported by the network interface. It is not computed dynamically.

#### Examples
The following code example demonstrates displaying the speed of interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.SupportsMulticast property

```csharp
public virtual bool SupportsMulticast { get; }
```

Gets a value that indicates whether the network interface is enabled to receive multicast packets.

Returns: `true` if the interface receives multicast packets; otherwise, `false`.

#### Remarks
Multicasting is the act of sending a data packet to multiple destinations simultaneously.

#### Examples
The following code example displays a summary for all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.GetAllNetworkInterfaces() method

```csharp
public static System.Net.NetworkInformation.NetworkInterface[] GetAllNetworkInterfaces ();
```

Returns objects that describe the network interfaces on the local computer.

Returns: A `NetworkInterface` array that contains objects that describe the available network interfaces, or an empty array if no interfaces are detected.

Exceptions:

- `NetworkInformationException`: A Windows system function call failed.

#### Remarks
The network interfaces on a computer provide network connectivity. Network interfaces are also known as network adapters.

#### Examples
The following code example displays Domain Name Service (DNS) configuration information for the local computer's network adapters.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.GetIPProperties() method

```csharp
public virtual System.Net.NetworkInformation.IPInterfaceProperties GetIPProperties ();
```

Returns an object that describes the configuration of this network interface.

Returns: An `IPInterfaceProperties` object that describes this network interface.

#### Remarks
Note that the information in the object returned by this method reflects the interfaces as of the time the array is created. This information is not updated dynamically.

#### Examples
The following code example displays information for the local computer's network adapters that support IPv4.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.GetIPStatistics() method

```csharp
public virtual System.Net.NetworkInformation.IPInterfaceStatistics GetIPStatistics ();
```

Gets the IP statistics for this `NetworkInterface` instance.

Returns: The IP statistics.

To be added.

## NetworkInterface.GetIPv4Statistics() method

```csharp
public virtual System.Net.NetworkInformation.IPv4InterfaceStatistics GetIPv4Statistics ();
```

Gets the IPv4 statistics for this `NetworkInterface` instance.

Returns: An `IPv4InterfaceStatistics` object.

To be added.

## NetworkInterface.GetIsNetworkAvailable() method

```csharp
public static bool GetIsNetworkAvailable ();
```

Indicates whether any network connection is available.

Returns: `true` if a network connection is available; otherwise, `false`.

#### Remarks
A network connection is considered to be available if any network interface is marked "up" and is not a loopback or tunnel interface.

## NetworkInterface.GetPhysicalAddress() method

```csharp
public virtual System.Net.NetworkInformation.PhysicalAddress GetPhysicalAddress ();
```

Returns the Media Access Control (MAC) or physical address for this adapter.

Returns: A `PhysicalAddress` object that contains the physical address.

#### Remarks
The object returned by this method contains an address that is appropriate to the media used to transport data at the data link layer. For example, on an Ethernet network, this method returns the Ethernet hardware address.

#### Examples
The following code example displays the physical addresses of all interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## NetworkInterface.Supports(NetworkInterfaceComponent) method

```csharp
public virtual bool Supports (System.Net.NetworkInformation.NetworkInterfaceComponent networkInterfaceComponent);
```

Gets a `Boolean` value that indicates whether the interface supports the specified protocol.

Parameters:

- `networkInterfaceComponent`: A `NetworkInterfaceComponent` value.

Returns: `true` if the specified protocol is supported; otherwise, `false`.

#### Examples
The following code example displays statistics for IPV4 interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
