---
title: "IPAddress class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/IPAddress.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPAddress class

Namespace: `System.Net`

```csharp
public class IPAddress : IParsable<System.Net.IPAddress>, ISpanFormattable, ISpanParsable<System.Net.IPAddress>, IUtf8SpanFormattable, IUtf8SpanParsable<System.Net.IPAddress>
```

Provides an Internet Protocol (IP) address.

#### Remarks
The `IPAddress` class contains the address of a computer on an IP network.

#### Examples
The following code example shows how to query a server to obtain the family addresses and the IP addresses it supports.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Overview/ipaddress.cs._

## IPAddress.IPAddress(Byte[]) constructor

```csharp
public IPAddress (byte[] address);
```

Initializes a new instance of the `IPAddress` class with the address specified as a `Byte` array.

Parameters:

- `address`: The byte array value of the IP address.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentException`: `address` contains a bad IP address.

#### Remarks
The `IPAddress` is created with the `Address` property set to `address`.

If the length of `address` is 4, `%23ctor` constructs an IPv4 address; otherwise, an IPv6 address with a scope of 0 is constructed.

The `Byte` array is assumed to be in network byte order with the most significant byte first in index position 0.

## IPAddress.IPAddress(Int64) constructor

```csharp
public IPAddress (long newAddress);
```

Initializes a new instance of the `IPAddress` class with the address specified as an `Int64`.

Parameters:

- `newAddress`: The long value of the IP address. For example, the value 0x2414188f in big-endian format would be the IP address "143.24.20.36".

Exceptions:

- `ArgumentOutOfRangeException`: `newAddress` < 0 or

`newAddress` > 0x00000000FFFFFFFF

#### Remarks
The `IPAddress` instance is created with the `Address` property set to `newAddress`.

The `Int64` value is assumed to be in network byte order.

## IPAddress.IPAddress(Byte>) constructor

```csharp
public IPAddress (ReadOnlySpan<byte> address);
```

Initializes a new instance of the `IPAddress` class with the address specified as a byte span.

Parameters:

- `address`: The byte representation of the IP address, in network byte order, with the most significant byte first in index position 0.

Exceptions:

- `ArgumentException`: `address` contains a bad IP address.

#### Remarks
The `IPAddress` is created with the `Address` property set to `address`.

If the length of `address` is 4, this method constructs an IPv4 address; otherwise, an IPv6 address with a scope of 0 is constructed.

## IPAddress.IPAddress(Byte[], Int64) constructor

```csharp
public IPAddress (byte[] address, long scopeid);
```

Initializes a new instance of the `IPAddress` class with the address specified as a `Byte` array and the specified scope identifier.

Parameters:

- `address`: The byte array value of the IP address.
- `scopeid`: The long value of the scope identifier.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `ArgumentException`: `address` contains a bad IP address.
- `ArgumentOutOfRangeException`: `scopeid` < 0 or

`scopeid` > 0x00000000FFFFFFFF

#### Remarks
This constructor instantiates an IPv6 address. The `scopeid` identifies a network interface in the case of a link-local address. The scope is valid only for link-local and site-local addresses.

The `Byte` array is assumed to be in network byte order with the most significant byte first in index position 0.

## IPAddress.IPAddress(Byte>, Int64) constructor

```csharp
public IPAddress (ReadOnlySpan<byte> address, long scopeid);
```

Initializes a new instance of the `IPAddress` class with the address specified as a byte span and the specified scope identifier.

Parameters:

- `address`: The byte span value of the IP address.
- `scopeid`: The long value of the scope identifier.

Exceptions:

- `ArgumentException`: `address` contains a bad IP address.
- `ArgumentOutOfRangeException`: `scopeid` < 0

-or-

`scopeid` > 0x00000000FFFFFFFF

#### Remarks
This constructor instantiates an IPv6 address. The `scopeid` identifies a network interface in the case of a link-local address. The scope is valid only for link-local and site-local addresses.

The byte span is assumed to be in network byte order with the most significant byte first in index position 0.

## IPAddress.Address property

```csharp
public long Address { get; set; }
```

An Internet Protocol (IP) address.

Returns: The long value of the IP address.

Exceptions:

- `SocketException`: The address family is `AddressFamily.InterNetworkV6`.

#### Remarks
This property is obsolete. Use `IPAddress.GetAddressBytes`.

To convert `IPAddress.Address` to dotted-quad notation, use the `IPAddress.ToString` method.

## IPAddress.AddressFamily property

```csharp
public System.Net.Sockets.AddressFamily AddressFamily { get; }
```

Gets the address family of the IP address.

Returns: Returns `AddressFamily.InterNetwork` for IPv4 or `AddressFamily.InterNetworkV6` for IPv6.

#### Examples
Refer to the example in the `IPAddress` class topic.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Overview/ipaddress.cs._

## IPAddress.IsIPv4MappedToIPv6 property

```csharp
public bool IsIPv4MappedToIPv6 { get; }
```

Gets whether the IP address is an IPv4-mapped IPv6 address.

Returns: Returns `Boolean`.

`true` if the IP address is an IPv4-mapped IPv6 address; otherwise, `false`.

#### Remarks
Dual-stack sockets always require IPv6 addresses. The ability to interact with an IPv4 address requires the use of the IPv4-mapped IPv6 address format. Any IPv4 addresses must be represented in the IPv4-mapped IPv6 address format which enables an IPv6 only application to communicate with an IPv4 node. The IPv4-mapped IPv6 address format allows the IPv4 address of an IPv4 node to be represented as an IPv6 address. The IPv4 address is encoded into the low-order 32 bits of the IPv6 address, and the high-order 96 bits hold the fixed prefix 0:0:0:0:0:FFFF. The IPv4-mapped IPv6 address format is specified in RFC 4291. For more information, see www.ietf.org/rfc/rfc4291.txt.

## IPAddress.IsIPv6LinkLocal property

```csharp
public bool IsIPv6LinkLocal { get; }
```

Gets whether the address is an IPv6 link local address.

Returns: `true` if the IP address is an IPv6 link local address; otherwise, `false`.

To be added.

## IPAddress.IsIPv6Multicast property

```csharp
public bool IsIPv6Multicast { get; }
```

Gets whether the address is an IPv6 multicast global address.

Returns: `true` if the IP address is an IPv6 multicast global address; otherwise, `false`.

To be added.

## IPAddress.IsIPv6SiteLocal property

```csharp
public bool IsIPv6SiteLocal { get; }
```

Gets whether the address is an IPv6 site local address.

Returns: `true` if the IP address is an IPv6 site local address; otherwise, `false`.

To be added.

## IPAddress.IsIPv6Teredo property

```csharp
public bool IsIPv6Teredo { get; }
```

Gets whether the address is an IPv6 Teredo address.

Returns: `true` if the IP address is an IPv6 Teredo address; otherwise, `false`.

#### Remarks
A Teredo address is an IPv6 address with the prefix of 2001::/32. Teredo addresses can be returned through normal DNS name resolution or enumerated as an IPv6 address assigned to a local interface.

## IPAddress.IsIPv6UniqueLocal property

```csharp
public bool IsIPv6UniqueLocal { get; }
```

Gets whether the address is an IPv6 Unique Local address.

Returns: To be added.

To be added.

## IPAddress.ScopeId property

```csharp
public long ScopeId { get; set; }
```

Gets or sets the IPv6 address scope identifier.

Returns: A long integer that specifies the scope of the address.

Exceptions:

- `SocketException`: `AddressFamily` = `InterNetwork`.
- `ArgumentOutOfRangeException`: The scope identifier is < 0

-or-

The scope identifier is > 0x00000000FFFFFFFF

#### Remarks
The meaning of `IPAddress.ScopeId` changes depending on the context in which it is used.

- Link-local address. On a host with multiple interfaces connected to separate links, the same link-local address can be assigned to multiple interfaces. To eliminate this ambiguity, a scope identifier is used to specify the interface over which messages are exchanged.

> **Note:**
> Link-local addresses, identified by the Format Prefix (FP) FE80, are used by nodes when communicating with neighboring nodes on the same link.

- Site-local addresses. A host can be connected to multiple sites. In this case, a scope identifier is used to indicate a specific site to communicate with.

> **Note:**
> Site-local addresses, identified by the Format Prefix (FP) FEC0, are used by nodes when communicating on private intranets.

The notation that is used to specify the `ScopeId` with an address is `Address%ScopeId`. For example, `FE80::5EFE:192.168.41.30%2.`

#### Examples
_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Overview/ipaddress.cs._

## IPAddress.Equals(Object) method

```csharp
public override bool Equals (object? comparand);
```

Compares two IP addresses.

Parameters:

- `comparand`: An `IPAddress` instance to compare to the current instance.

Returns: `true` if the two addresses are equal; otherwise, `false`.

#### Remarks
The `IPAddress.Equals` method compares the current `IPAddress` instance with the `comparand` parameter and returns `true` if the two instances contain the same IP address.

## IPAddress.GetAddressBytes() method

```csharp
public byte[] GetAddressBytes ();
```

Provides a copy of the `IPAddress` as an array of bytes in network order.

Returns: A `Byte` array.

#### Examples
The following code example shows how to get a server IP address in byte format.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/Overview/ipaddress.cs._

## IPAddress.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash value for an IP address.

Returns: An integer hash value.

#### Remarks
The `IPAddress.GetHashCode` method returns a hash code of the IP address. This value can be used as a key in hash tables.

## IPAddress.HostToNetworkOrder(Int16) method

```csharp
public static short HostToNetworkOrder (short host);
```

Converts a short value from host byte order to network byte order.

Parameters:

- `host`: The number to convert, expressed in host byte order.

Returns: A short value, expressed in network byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.HostToNetworkOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the host to the byte order used by the network.

## IPAddress.HostToNetworkOrder(Int32) method

```csharp
public static int HostToNetworkOrder (int host);
```

Converts an integer value from host byte order to network byte order.

Parameters:

- `host`: The number to convert, expressed in host byte order.

Returns: An integer value, expressed in network byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.HostToNetworkOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the host to the byte order used by the network.

## IPAddress.HostToNetworkOrder(Int64) method

```csharp
public static long HostToNetworkOrder (long host);
```

Converts a long value from host byte order to network byte order.

Parameters:

- `host`: The number to convert, expressed in host byte order.

Returns: A long value, expressed in network byte order.

#### Remarks
Different computers use different conventions for ordering the bytes within multibyte integer values. Some computers put the most significant byte first (known as big-endian order) and others put the least-significant byte first (known as little-endian order). To work with computers that use different byte ordering, all integer values that are sent over the network are sent in network byte order which has the most significant byte first.

The `IPAddress.HostToNetworkOrder` method converts multibyte integer values that are stored on the host system from the byte order used by the host to the byte order used by the network.

## IPAddress.IsLoopback(IPAddress) method

```csharp
public static bool IsLoopback (System.Net.IPAddress address);
```

Indicates whether the specified IP address is the loopback address.

Parameters:

- `address`: An IP address.

Returns: `true` if `address` is the loopback address; otherwise, `false`.

#### Remarks
The `IPAddress.IsLoopback` method compares `address` to `Loopback` and returns `true` if the two IP addresses are the same.

In the case of IPv4, that the `IPAddress.IsLoopback` method returns `true` for any IP address of the form 127.X.Y.Z (where X, Y, and Z are in the range 0-255), not just `Loopback` (127.0.0.1).

#### Examples
The following code example uses the `IPAddress.IsLoopback` method to determine whether the specified address is a loopback address.

_Code sample not included: ~/snippets/csharp/System.Net/IPAddress/IsLoopback/isloopback.cs._

## IPAddress.IsValid(Char>) method

```csharp
public static bool IsValid (ReadOnlySpan<char> ipSpan);
```

Determines whether the provided span contains a valid `IPAddress`.

Parameters:

- `ipSpan`: The text to parse.

Returns: `true` if `ipSpan` contains a valid IP address; otherwise, `false`.

To be added.

## IPAddress.IsValidUtf8(Byte>) method

```csharp
public static bool IsValidUtf8 (ReadOnlySpan<byte> utf8Text);
```

Determines whether the provided span contains a valid `IPAddress`.

Parameters:

- `utf8Text`: The text to parse.

Returns: `true` if `utf8Text` contains a valid IP address; otherwise, `false`.

To be added.
