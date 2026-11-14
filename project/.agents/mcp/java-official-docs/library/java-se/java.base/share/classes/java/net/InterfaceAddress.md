---
title: "InterfaceAddress class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/InterfaceAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InterfaceAddress class (java.net)

```java
public final class InterfaceAddress
```

This class represents a Network Interface address. In the case of
IPv4, this comprises the IP address, a subnet mask, and a broadcast
address if the interface supports broadcast. In the case of IPv6,
it comprises the IP address and a network prefix length.

**See also:** java.net.NetworkInterface

**Since:** 1.6

## InterfaceAddress.getAddress()

```java
public InetAddress getAddress()
```

Returns an `InetAddress` for this address.

**Returns:** the `InetAddress` for this address.

## InterfaceAddress.getBroadcast()

```java
public InetAddress getBroadcast()
```

Returns an `InetAddress` for the broadcast address
for this InterfaceAddress.

Only IPv4 networks have broadcast address therefore, in the case
of an IPv6 network, `null` will be returned.

Certain network interfaces, such as the loopback interface, do not support
broadcasting and will also return `null`.

**Returns:** the `InetAddress` representing the broadcast
        address or `null` if there is no broadcast address.

## InterfaceAddress.getNetworkPrefixLength()

```java
public short getNetworkPrefixLength()
```

Returns the network prefix length for this address. This is also known
as the subnet mask in the context of IPv4 addresses.
Typical IPv4 values would be 8 (255.0.0.0), 16 (255.255.0.0)
or 24 (255.255.255.0).

Typical IPv6 values would be 128 (::1/128) or 10 (fe80::203:baff:fe27:1243/10)

**Returns:** a `short` representing the prefix length for the
        subnet of that address.

## InterfaceAddress.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is
not `null` and it represents the same interface address as
this object.

Two instances of `InterfaceAddress` represent the same
address if the InetAddress, the prefix length and the broadcast are
the same for both.

Parameters:

- `obj`: the object to compare against.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.net.InterfaceAddress#hashCode()

## InterfaceAddress.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this Interface address.

**Returns:** a hash code value for this Interface address.

## InterfaceAddress.toString()

```java
public String toString()
```

Converts this Interface address to a `String`. The
string returned is of the form: InetAddress / prefix length [ broadcast address ].

**Returns:** a string representation of this Interface address.
