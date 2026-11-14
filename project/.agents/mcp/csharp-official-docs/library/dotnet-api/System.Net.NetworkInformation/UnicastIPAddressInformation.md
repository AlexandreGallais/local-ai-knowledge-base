---
title: "UnicastIPAddressInformation class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/UnicastIPAddressInformation.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnicastIPAddressInformation class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class UnicastIPAddressInformation : System.Net.NetworkInformation.IPAddressInformation
```

Provides information about a network interface's unicast address.

#### Remarks
You do not create instances of this class; instances are returned in the array returned by the `UnicastAddresses` property.

## UnicastIPAddressInformation.UnicastIPAddressInformation() constructor

```csharp
protected UnicastIPAddressInformation ();
```

Initializes a new instance of the `UnicastIPAddressInformation` class.

#### Remarks
This constructor can be called only by classes that derive from the `UnicastIPAddressInformation` class.

## UnicastIPAddressInformation.AddressPreferredLifetime property

```csharp
public abstract long AddressPreferredLifetime { get; }
```

Gets the number of seconds remaining during which this address is the preferred address.

Returns: An `Int64` value that specifies the number of seconds left for this address to remain preferred.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
Use the value returned by this property to determine how long the preferred address remains valid. Whenever possible, applications should use a preferred address. Use `UnicastIPAddressInformation.DuplicateAddressDetectionState` to determine the preferred address.

## UnicastIPAddressInformation.AddressValidLifetime property

```csharp
public abstract long AddressValidLifetime { get; }
```

Gets the number of seconds remaining during which this address is valid.

Returns: An `Int64` value that specifies the number of seconds left for this address to remain assigned.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
Use the value returned by this property to determine whether this address can be used by your application. Whenever possible, applications should use a preferred address. Use `UnicastIPAddressInformation.DuplicateAddressDetectionState` to determine the preferred address.

## UnicastIPAddressInformation.DhcpLeaseLifetime property

```csharp
public abstract long DhcpLeaseLifetime { get; }
```

Specifies the amount of time remaining on the Dynamic Host Configuration Protocol (DHCP) lease for this IP address.

Returns: An `Int64` value that contains the number of seconds remaining before the computer must release the `IPAddress` instance.

#### Remarks
Dynamic Host Configuration Protocol (DHCP) allows a computer to obtain a network address from a DHCP server, as opposed to using a static (fixed) network address. The DHCP server does not permanently assign addresses; instead, it "leases" one of a number of available addresses to the computer. Within a specified amount of time, known as the lease lifetime for the address, the computer releases the address, leaving the DHCP server free to assign it to a different computer.

This property returns the number of seconds left in the lease lifetime for the IP address identified in the `Address` property. Note that the computer can send requests to the DHCP server to extend its lease, so the lease lifetime can increase over time.

## UnicastIPAddressInformation.DuplicateAddressDetectionState property

```csharp
public abstract System.Net.NetworkInformation.DuplicateAddressDetectionState DuplicateAddressDetectionState { get; }
```

Gets a value that indicates the state of the duplicate address detection algorithm.

Returns: One of the `DuplicateAddressDetectionState` values that indicates the progress of the algorithm in determining the uniqueness of this IP address.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
To ensure that all network interfaces on a network have a unique address, the interface host is responsible for running a "duplicate address detection" algorithm on unicast addresses. The purpose of this algorithm is to attempt to prevent non-unique addresses on the network. This process is defined in IETF RFC 1971.

## UnicastIPAddressInformation.IPv4Mask property

```csharp
public abstract System.Net.IPAddress IPv4Mask { get; }
```

Gets the IPv4 mask.

Returns: An `IPAddress` object that contains the IPv4 mask.

To be added.

## UnicastIPAddressInformation.PrefixLength property

```csharp
public virtual int PrefixLength { get; }
```

Gets the length, in bits, of the prefix or network part of the IP address.

Returns: The length, in bits, of the prefix or network part of the IP address.

To be added.

## UnicastIPAddressInformation.PrefixOrigin property

```csharp
public abstract System.Net.NetworkInformation.PrefixOrigin PrefixOrigin { get; }
```

Gets a value that identifies the source of a unicast Internet Protocol (IP) address prefix.

Returns: One of the `PrefixOrigin` values that identifies how the prefix information was obtained.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
IP addresses are divided into two parts: the prefix and the suffix. The address prefix identifies the network portion of an IP address, and the address suffix identifies the host portion. Prefixes are assigned by global authorities, and suffixes are assigned by local system administrators.

## UnicastIPAddressInformation.SuffixOrigin property

```csharp
public abstract System.Net.NetworkInformation.SuffixOrigin SuffixOrigin { get; }
```

Gets a value that identifies the source of a unicast Internet Protocol (IP) address suffix.

Returns: One of the `SuffixOrigin` values that identifies how the suffix information was obtained.

Exceptions:

- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
IP addresses are divided into two parts: the prefix and the suffix. The address prefix identifies the network portion of an IP address, and the address suffix identifies the host portion. Prefixes are assigned by global authorities, and suffixes are assigned by local system administrators.
