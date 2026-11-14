---
title: "IPv4InterfaceProperties class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPv4InterfaceProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPv4InterfaceProperties class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPv4InterfaceProperties
```

Provides information about network interfaces that support Internet Protocol version 4 (IPv4).

#### Remarks
This class provides access to configuration and address information for network interfaces that support IPv4. You do not create instances of this class; they are returned by the `IPInterfaceProperties.GetIPv4Properties` method.

For IPV6 properties, see `IPInterfaceProperties.GetIPv6Properties`.

#### Examples
The following code example gets an `IPInterfaceProperties.GetIPv4Properties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.IPv4InterfaceProperties() constructor

```csharp
protected IPv4InterfaceProperties ();
```

Initializes a new instance of the `IPv4InterfaceProperties` class.

#### Remarks
This constructor can be called only by classes that derive from `IPv4InterfaceProperties`.

## IPv4InterfaceProperties.Index property

```csharp
public abstract int Index { get; }
```

Gets the index of the network interface associated with the Internet Protocol version 4 (IPv4) address.

Returns: An `Int32` that contains the index of the IPv4 interface.

#### Remarks
If the value of this property is zero, IPv4 is not supported by this interface.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.IsAutomaticPrivateAddressingActive property

```csharp
public abstract bool IsAutomaticPrivateAddressingActive { get; }
```

Gets a `Boolean` value that indicates whether this interface has an automatic private IP addressing (APIPA) address.

Returns: `true` if the interface uses an APIPA address; otherwise, `false`.

#### Remarks
Automatic private IP addressing allows computers that do not have access to a Dynamic Host Configuration Protocol (DHCP) server to be automatically assigned an IP address that does not conflict with public addresses. These addresses are in the range 169.254.0.0 to 169.254.255.255.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.IsAutomaticPrivateAddressingEnabled property

```csharp
public abstract bool IsAutomaticPrivateAddressingEnabled { get; }
```

Gets a `Boolean` value that indicates whether this interface has automatic private IP addressing (APIPA) enabled.

Returns: `true` if the interface uses APIPA; otherwise, `false`.

#### Remarks
Automatic private IP addressing allows computers that do not have access to a Dynamic Host Configuration Protocol (DHCP) server to be automatically assigned an IP address that does not conflict with public addresses. These addresses are in the range 169.254.0.0 to 169.254.255.255.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.IsDhcpEnabled property

```csharp
public abstract bool IsDhcpEnabled { get; }
```

Gets a `Boolean` value that indicates whether the interface is configured to use a Dynamic Host Configuration Protocol (DHCP) server to obtain an IP address.

Returns: `true` if the interface is configured to obtain an IP address from a DHCP server; otherwise, `false`.

#### Remarks
When this property is `true`, a DHCP server assigns the IP address to the interface when the computer establishes its network connections.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.IsForwardingEnabled property

```csharp
public abstract bool IsForwardingEnabled { get; }
```

Gets a `Boolean` value that indicates whether this interface can forward (route) packets.

Returns: `true` if this interface routes packets; otherwise `false`.

#### Remarks
If routing is disabled, packets that are received by the interface with a destination address that is not held by the interface are discarded.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.Mtu property

```csharp
public abstract int Mtu { get; }
```

Gets the maximum transmission unit (MTU) for this network interface.

Returns: An `Int64` value that specifies the MTU.

#### Remarks
The MTU of a network interface is the largest packet that can be transmitted. It is measured in octets (8-bit bytes).

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv4InterfaceProperties.UsesWins property

```csharp
public abstract bool UsesWins { get; }
```

Gets a `Boolean` value that indicates whether an interface uses Windows Internet Name Service (WINS).

Returns: `true` if the interface uses WINS; otherwise, `false`.

#### Remarks
WINS provides a distributed database for registering and querying dynamic NetBIOS names to IPv4 address mappings.

#### Examples
The following code example gets an `IPv4InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._
