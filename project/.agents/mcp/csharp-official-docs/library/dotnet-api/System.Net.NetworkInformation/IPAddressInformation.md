---
title: "IPAddressInformation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPAddressInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPAddressInformation class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPAddressInformation
```

Provides information about a network interface address.

#### Remarks
You do not create instances of this class; instances are returned by methods in the `IPInterfaceProperties` class.

#### Examples
The following code example displays the Domain Name Service (DNS) addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPAddressInformation.IPAddressInformation() constructor

```csharp
protected IPAddressInformation ();
```

Initializes a new instance of the `IPAddressInformation` class.

#### Remarks
This constructor can be called only by classes that derive from `IPAddressInformation`.

## IPAddressInformation.Address property

```csharp
public abstract System.Net.IPAddress Address { get; }
```

Gets the Internet Protocol (IP) address.

Returns: An `IPAddress` instance that contains the IP address of an interface.

#### Remarks
The IP address uniquely identifies the interface on the network.

#### Examples
The following code example displays the multicast addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPAddressInformation.IsDnsEligible property

```csharp
public abstract bool IsDnsEligible { get; }
```

Gets a `Boolean` value that indicates whether the Internet Protocol (IP) address is valid to appear in a Domain Name System (DNS) server database.

Returns: `true` if the address can appear in a DNS database; otherwise, `false`.

#### Remarks
Addresses in the range 169.254.0.0 to 169.254.255.255 are not DNS eligible. These addresses are reserved for Automatic Private IP Addressing (APIPA).

#### Examples
The following code example displays the anycast addresses for the network interfaces on the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPAddressInformation.IsTransient property

```csharp
public abstract bool IsTransient { get; }
```

Gets a `Boolean` value that indicates whether the Internet Protocol (IP) address is transient (a cluster address).

Returns: `true` if the address is transient; otherwise, `false`.

#### Remarks
A transient address is assigned to a cluster and should not be used by most applications.
