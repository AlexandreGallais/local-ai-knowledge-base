---
title: "IPInterfaceProperties class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPInterfaceProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPInterfaceProperties class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPInterfaceProperties
```

Provides information about network interfaces that support Internet Protocol version 4 (IPv4) or Internet Protocol version 6 (IPv6).

#### Remarks
This class provides access to configuration and address information for network interfaces that support IPv4 or IPv6. You do not create instances of this class; they are returned by the `NetworkInterface.GetIPProperties` method.

To access IPv4-specific properties, use the object returned by the `IPInterfaceProperties.GetIPv4Properties` method. To access IPv6-specific properties, use the object returned by the `IPInterfaceProperties.GetIPv6Properties` method.

#### Examples
The following code example displays address information.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPInterfaceProperties.IPInterfaceProperties() constructor

```csharp
protected IPInterfaceProperties ();
```

Initializes a new instance of the `IPInterfaceProperties` class.

#### Remarks
This constructor can be called only from classes that derive from `IPInterfaceProperties`.

## IPInterfaceProperties.AnycastAddresses property

```csharp
public abstract System.Net.NetworkInformation.IPAddressInformationCollection AnycastAddresses { get; }
```

Gets the anycast IP addresses assigned to this interface.

Returns: An `IPAddressInformationCollection` that contains the anycast addresses for this interface.

#### Remarks
An anycast address identifies multiple computers. Packets sent to an anycast address are sent to one of the computers identified by the address. Anycast addressing is an IPv6 feature used to update router tables for a group of hosts.

#### Examples
The following code example displays the anycast addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.DhcpServerAddresses property

```csharp
public abstract System.Net.NetworkInformation.IPAddressCollection DhcpServerAddresses { get; }
```

Gets the addresses of Dynamic Host Configuration Protocol (DHCP) servers for this interface.

Returns: An `IPAddressCollection` that contains the address information for DHCP servers, or an empty array if no servers are found.

#### Remarks
Dynamic Host Configuration Protocol (DHCP) allows a computer to obtain a network address from a DHCP server, as opposed to using a static (fixed) network address. A DHCP server does not permanently assign addresses; instead, it temporarily uses one of a number of available addresses to the computer.

#### Examples
The following code example displays the DHCP address information for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.DnsAddresses property

```csharp
public abstract System.Net.NetworkInformation.IPAddressCollection DnsAddresses { get; }
```

Gets the addresses of Domain Name System (DNS) servers for this interface.

Returns: A `IPAddressCollection` that contains the DNS server addresses.

#### Remarks
DNS is a hierarchical naming system used to map host names to IP addresses.

#### Examples
The following code example displays the DNS addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.DnsSuffix property

```csharp
public abstract string DnsSuffix { get; }
```

Gets the Domain Name System (DNS) suffix associated with this interface.

Returns: A `String` that contains the DNS suffix for this interface, or `String.Empty` if there is no DNS suffix for the interface.

#### Remarks
The DNS suffix identifies the domain name (for example, "contoso.com") that is appended to an unqualified host name to obtain a fully qualified domain name (FQDN) suitable for a DNS name query. For example, if the local machine has "contoso.com" as its `IPInterfaceProperties.DnsSuffix`, and must resolve the unqualified host name "www", the FQDN to query is "www.contoso.com".

#### Examples
The following code example displays the DNS suffix.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.GatewayAddresses property

```csharp
public abstract System.Net.NetworkInformation.GatewayIPAddressInformationCollection GatewayAddresses { get; }
```

Gets the IPv4 network gateway addresses for this interface.

Returns: An `GatewayIPAddressInformationCollection` that contains the address information for network gateways, or an empty array if no gateways are found.

#### Remarks
Gateways that implement the Internet Protocol Version 4 (IPv4) to forward packets between networks are returned by this property.

#### Examples
The following code example displays the gateway addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.IsDnsEnabled property

```csharp
public abstract bool IsDnsEnabled { get; }
```

Gets a `Boolean` value that indicates whether NetBt is configured to use DNS name resolution on this interface.

Returns: `true` if NetBt is configured to use DNS name resolution on this interface; otherwise, `false`.

#### Remarks
DNS is a hierarchical naming system used to map host names to IP addresses.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.IsDynamicDnsEnabled property

```csharp
public abstract bool IsDynamicDnsEnabled { get; }
```

Gets a `Boolean` value that indicates whether this interface is configured to automatically register its IP address information with the Domain Name System (DNS).

Returns: `true` if this interface is configured to automatically register a mapping between its dynamic IP address and static domain names; otherwise, `false`.

#### Remarks
Dynamic DNS enables a client to inform the DNS servers that its dynamic IP address is mapped to its static host name.

#### Examples
The following code example displays the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.MulticastAddresses property

```csharp
public abstract System.Net.NetworkInformation.MulticastIPAddressInformationCollection MulticastAddresses { get; }
```

Gets the multicast addresses assigned to this interface.

Returns: An `MulticastIPAddressInformationCollection` that contains the multicast addresses for this interface.

#### Remarks
A multicast address identifies multiple computers. Packets sent to a multicast address are sent to all computers identified by the address.

#### Examples
The following code example displays the multicast addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.UnicastAddresses property

```csharp
public abstract System.Net.NetworkInformation.UnicastIPAddressInformationCollection UnicastAddresses { get; }
```

Gets the unicast addresses assigned to this interface.

Returns: An `UnicastIPAddressInformationCollection` that contains the unicast addresses for this interface.

#### Remarks
A unicast address identifies a single computer. Packets sent to a unicast address are sent to the computer identified by the address.

#### Examples
The following code example displays the unicast addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPInterfaceProperties.WinsServersAddresses property

```csharp
public abstract System.Net.NetworkInformation.IPAddressCollection WinsServersAddresses { get; }
```

Gets the addresses of Windows Internet Name Service (WINS) servers.

Returns: An `IPAddressCollection` that contains the address information for WINS servers, or an empty array if no servers are found.

#### Remarks
WINS provides a distributed database for registering and querying dynamic NetBIOS names to IP address mappings.

## IPInterfaceProperties.GetIPv4Properties() method

```csharp
public abstract System.Net.NetworkInformation.IPv4InterfaceProperties GetIPv4Properties ();
```

Provides Internet Protocol version 4 (IPv4) configuration data for this network interface.

Returns: An `IPv4InterfaceProperties` object that contains IPv4 configuration data.

Exceptions:

- `NetworkInformationException`: The interface does not support the IPv4 protocol.

#### Remarks
For a detailed description of the information available for an interface that supports IPv4, see the `IPv4InterfaceProperties` class documentation. Note that the object returned by the `IPInterfaceProperties.GetIPv4Properties` method reflects the configuration as of the time the object is created. This information is not updated dynamically.
A `NetworkInformationException` is thrown if the interface does not support the IPv4 protocol, therefore it's recommended to check IPv4 support calling `NetworkInterface.Supports` on the originating `NetworkInterface` instance before querying the IPv4 properties.

## IPInterfaceProperties.GetIPv6Properties() method

```csharp
public abstract System.Net.NetworkInformation.IPv6InterfaceProperties GetIPv6Properties ();
```

Provides Internet Protocol version 6 (IPv6) configuration data for this network interface.

Returns: An `IPv6InterfaceProperties` object that contains IPv6 configuration data.

Exceptions:

- `NetworkInformationException`: The interface does not support the IPv6 protocol.

#### Remarks
For a detailed description of the information available for an interface that supports IPv6, see the `IPv6InterfaceProperties` documentation. Note that the object returned by the `IPInterfaceProperties.GetIPv6Properties` method reflects the configuration as of the time the object is created. This information is not updated dynamically.
A `NetworkInformationException` is thrown if the interface does not support the IPv6 protocol, therefore it's recommended to check IPv6 support calling `NetworkInterface.Supports` on the originating `NetworkInterface` instance before querying the IPv6 properties.
