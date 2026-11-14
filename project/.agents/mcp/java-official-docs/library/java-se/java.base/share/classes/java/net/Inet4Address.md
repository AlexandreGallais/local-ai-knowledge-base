---
title: "Inet4Address class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Inet4Address.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Inet4Address class (java.net)

```java
public final class Inet4Address extends InetAddress
```

This class represents an Internet Protocol version 4 (IPv4) address.
Defined by
*RFC 790: Assigned Numbers*,

*RFC 1918: Address Allocation for Private Internets*,
and *RFC 2365:
Administratively Scoped IP Multicast*

####  Textual representation of IPv4 addresses

Textual representation of IPv4 address used as input to methods
takes one of the following forms:

- `d.d.d.d`

- `d.d.d`

- `d.d`

- `d`

 When four parts are specified, each is interpreted as a byte of
data and assigned, from left to right, to the four bytes of an IPv4
address.

 When a three part address is specified, the last part is
interpreted as a 16-bit quantity and placed in the right most two
bytes of the network address. This makes the three part address
format convenient for specifying Class B network addresses as
128.net.host.

 When a two part address is supplied, the last part is
interpreted as a 24-bit quantity and placed in the right most three
bytes of the network address. This makes the two part address
format convenient for specifying Class A network addresses as
net.host.

 When only one part is given, the value is stored directly in
the network address without any byte rearrangement.

 For example, the following (decimal) forms are supported by the methods
`Inet4Address.ofLiteral(String)` and `InetAddress.getByName(String)`
which are capable of parsing textual representations of IPv4 addresses:

 The above forms adhere to "strict" decimal-only syntax.
Additionally, the `Inet4Address.ofPosixLiteral(String)`
method implements a POSIX `inet_addr` compatible "loose"
parsing algorithm, allowing octal and hexadecimal address segments.
Please refer to
*RFC 6943: Issues in Identifier Comparison for Security
Purposes*. Aside from `Inet4Address.ofPosixLiteral(String)`, all methods only
support strict decimal parsing.

 For methods that return a textual representation as output
value, the first form, i.e. a dotted-quad string in strict decimal notation, is used.

####  The Scope of a Multicast Address

Historically the IPv4 TTL field in the IP header has doubled as a
multicast scope field: a TTL of 0 means node-local, 1 means
link-local, up through 32 means site-local, up through 64 means
region-local, up through 128 means continent-local, and up through
255 are global. However, the administrative scoping is preferred.
Please refer to
*RFC 2365: Administratively Scoped IP Multicast*

**Since:** 1.4

## Inet4Address.ofLiteral(String)

```java
public static Inet4Address ofLiteral(String ipv4AddressLiteral)
```

Creates an `Inet4Address` based on the provided textual representation of an IPv4 address.

 If the provided IPv4 address literal cannot represent a valid IPv4 address an `IllegalArgumentException` is thrown.

 This method doesn't block, i.e. no reverse lookup is performed.

Parameters:

- `ipv4AddressLiteral`: the textual representation of an IPv4 address.

**Returns:** an `Inet4Address` object with no hostname set, and constructed
        from the provided IPv4 address literal.

**Since:** 22

Throws:

- `IllegalArgumentException`: if the `ipv4AddressLiteral` cannot be parsed as an IPv4 address literal.
- `NullPointerException`: if the `ipv4AddressLiteral` is `null`.

## Inet4Address.ofPosixLiteral(String)

```java
public static Inet4Address ofPosixLiteral(String posixIPAddressLiteral)
```

Creates an `Inet4Address` based on the provided textual representation of an IPv4 address in POSIX {@code inet_addr} compatible form.

  The method `ofPosixLiteral`
implements
POSIX `inet_addr` compatible parsing algorithm, allowing
octal and hexadecimal address segments. `"0"` is the prefix
for octal numbers, `"0x"` and `"0X"` are the prefixes
for hexadecimal numbers. Non-zero address segments that start from
non-zero digits are parsed as decimal numbers. The following
(non-decimal) forms are supported by this method:

 If the provided IPv4 address literal cannot represent a
valid IPv4 address in POSIX form an `IllegalArgumentException` is thrown.

 This method doesn't block, i.e. no hostname lookup is performed.

Parameters:

- `posixIPAddressLiteral`: a textual representation of an IPv4 address.

**API note:** This method produces different results compared to `Inet4Address.ofLiteral`
when `posixIPAddressLiteral` parameter contains address segments with
leading zeroes. An address segment with a leading zero is always parsed as an octal
number by this method, therefore `0255` (octal) will be parsed as
`173` (decimal). On the other hand, Inet4Address.ofLiteral ignores leading zeros, parses all numbers as decimal and produces
`255`. Where this method would parse `0256.0256.0256.0256` (octal) and
produce `174.174.174.174` (decimal) in four dotted quad notation,
Inet4Address.ofLiteral will throw
`IllegalArgumentException`.

**Returns:** an `Inet4Address` object with no hostname set, and constructed
        from the provided IPv4 address literal.

**Since:** 23

Throws:

- `IllegalArgumentException`: if the `posixIPAddressLiteral` cannot be parsed as an IPv4 address literal.
- `NullPointerException`: if the `posixIPAddressLiteral` is `null`.

## Inet4Address.isMulticastAddress()

```java
public boolean isMulticastAddress()
```

Utility routine to check if the InetAddress is an
IP multicast address. IP multicast address is a Class D
address i.e first four bits of the address are 1110.

**Returns:** a `boolean` indicating if the InetAddress is
an IP multicast address

## Inet4Address.isAnyLocalAddress()

```java
public boolean isAnyLocalAddress()
```

Utility routine to check if the InetAddress is a wildcard address.

**Returns:** a `boolean` indicating if the InetAddress is
        a wildcard address.

## Inet4Address.isLoopbackAddress()

```java
public boolean isLoopbackAddress()
```

Utility routine to check if the InetAddress is a loopback address.

**Returns:** a `boolean` indicating if the InetAddress is
a loopback address; or false otherwise.

## Inet4Address.isLinkLocalAddress()

```java
public boolean isLinkLocalAddress()
```

Utility routine to check if the InetAddress is a link local address.

**Returns:** a `boolean` indicating if the InetAddress is
a link local address; or false if address is not a link local unicast address.

## Inet4Address.isSiteLocalAddress()

```java
public boolean isSiteLocalAddress()
```

Utility routine to check if the InetAddress is a site local address.

**Returns:** a `boolean` indicating if the InetAddress is
a site local address; or false if address is not a site local unicast address.

## Inet4Address.isMCGlobal()

```java
public boolean isMCGlobal()
```

Utility routine to check if the multicast address has global scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of global scope, false if it is not
        of global scope or it is not a multicast address

## Inet4Address.isMCNodeLocal()

```java
public boolean isMCNodeLocal()
```

Utility routine to check if the multicast address has node scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of node-local scope, false if it is not
        of node-local scope or it is not a multicast address

## Inet4Address.isMCLinkLocal()

```java
public boolean isMCLinkLocal()
```

Utility routine to check if the multicast address has link scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of link-local scope, false if it is not
        of link-local scope or it is not a multicast address

## Inet4Address.isMCSiteLocal()

```java
public boolean isMCSiteLocal()
```

Utility routine to check if the multicast address has site scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of site-local scope, false if it is not
        of site-local scope or it is not a multicast address

## Inet4Address.isMCOrgLocal()

```java
public boolean isMCOrgLocal()
```

Utility routine to check if the multicast address has organization scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of organization-local scope,
        false if it is not of organization-local scope
        or it is not a multicast address

## Inet4Address.getAddress()

```java
public byte[] getAddress()
```

Returns the raw IP address of this `InetAddress`
object. The result is in network byte order: the highest order
byte of the address is in `getAddress()[0]`.

**Returns:** the raw IP address of this object.

## Inet4Address.getHostAddress()

```java
public String getHostAddress()
```

Returns the IP address string in textual presentation form.

**Returns:** the raw IP address in a string format.

## Inet4Address.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this IP address.

**Returns:** a hash code value for this IP address.

## Inet4Address.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is
not `null` and it represents the same IP address as
this object.

Two instances of `InetAddress` represent the same IP
address if the length of the byte arrays returned by
`getAddress` is the same for both, and each of the
array components is the same for the byte arrays.

Parameters:

- `obj`: the object to compare against.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.net.InetAddress#getAddress()
