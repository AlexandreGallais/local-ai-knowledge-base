---
title: "InetSocketAddress class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/InetSocketAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InetSocketAddress class (java.net)

```java
public class InetSocketAddress extends SocketAddress
```

This class implements an IP Socket Address (IP address + port number)
It can also be a pair (hostname + port number), in which case an attempt
will be made to resolve the hostname. If resolution fails then the address
is said to be *unresolved* but can still be used on some circumstances
like connecting through a proxy.

It provides an immutable object used by sockets for binding, connecting, or
as returned values.

The *wildcard* is a special local IP address. It usually means "any"
and can only be used for `bind` operations.

**See also:** java.net.Socket

**See also:** java.net.ServerSocket

**Since:** 1.4

## InetSocketAddress.InetSocketAddress(int)

```java
public InetSocketAddress(int port)
```

Creates a socket address where the IP address is the wildcard address
and the port number a specified value.

A valid port value is between 0 and 65535.
A port number of `zero` will let the system pick up an
ephemeral port in a `bind` operation.

Parameters:

- `port`: The port number

Throws:

- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values.

## InetSocketAddress.InetSocketAddress(InetAddress, int)

```java
public InetSocketAddress(InetAddress addr, int port)
```

Creates a socket address from an IP address and a port number.

A valid port value is between 0 and 65535.
A port number of `zero` will let the system pick up an
ephemeral port in a `bind` operation.

A `null` address will assign the *wildcard* address.

Parameters:

- `addr`: The IP address
- `port`: The port number

Throws:

- `IllegalArgumentException`: if the port parameter is outside the specified range of valid port values.

## InetSocketAddress.InetSocketAddress(String, int)

```java
public InetSocketAddress(String hostname, int port)
```

Creates a socket address from a hostname and a port number.

An attempt will be made to resolve the hostname into an InetAddress.
If that attempt fails, the address will be flagged as *unresolved*.

A valid port value is between 0 and 65535.
A port number of `zero` will let the system pick up an
ephemeral port in a `bind` operation.

Parameters:

- `hostname`: the Host name
- `port`: The port number

**See also:** #isUnresolved()

Throws:

- `IllegalArgumentException`: if the port parameter is outside the range of valid port values, or if the hostname parameter is `null`.

## InetSocketAddress.createUnresolved(String, int)

```java
public static InetSocketAddress createUnresolved(String host, int port)
```

Creates an unresolved socket address from a hostname and a port number.

No attempt will be made to resolve the hostname into an InetAddress.
The address will be flagged as *unresolved*.

A valid port value is between 0 and 65535.
A port number of `zero` will let the system pick up an
ephemeral port in a `bind` operation.

Parameters:

- `host`: the Host name
- `port`: The port number

**See also:** #isUnresolved()

**Returns:** an `InetSocketAddress` representing the unresolved
         socket address

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if the port parameter is outside the range of valid port values, or if the hostname parameter is `null`.

## InetSocketAddress.getPort()

```java
public final int getPort()
```

Gets the port number.

**Returns:** the port number.

## InetSocketAddress.getAddress()

```java
public final InetAddress getAddress()
```

Gets the `InetAddress`.

**Returns:** the InetAddress or `null` if it is unresolved.

## InetSocketAddress.getHostName()

```java
public final String getHostName()
```

Gets the `hostname`.
Note: This method may trigger a name service reverse lookup if the
address was created with a literal IP address.

**Returns:** the hostname part of the address.

## InetSocketAddress.getHostString()

```java
public final String getHostString()
```

Returns the hostname, or the String form of the address if it
doesn't have a hostname (it was created using a literal).
This has the benefit of **not** attempting a reverse lookup.

**Returns:** the hostname, or String representation of the address.

**Since:** 1.7

## InetSocketAddress.isUnresolved()

```java
public final boolean isUnresolved()
```

Checks whether the address has been resolved or not.

**Returns:** `true` if the hostname couldn't be resolved into
         an `InetAddress`.

## InetSocketAddress.toString()

```java
public String toString()
```

Constructs a string representation of this InetSocketAddress.
This string is constructed by calling `InetAddress.toString()`
on the InetAddress and concatenating the port number (with a colon).

If the address is an IPv6 address, the IPv6 literal is enclosed in
square brackets, for example: `"localhost/[0:0:0:0:0:0:0:1]:80"`.
If the address is unresolved,
`<unresolved>` is displayed in place of the address literal, for
example `"foo/<unresolved>:80"`.

To retrieve a string representation of the hostname or the address, use
`getHostString()`, rather than parsing the string returned by this
`toString()` method.

**Returns:** a string representation of this object.

## InetSocketAddress.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is
not `null` and it represents the same address as
this object.

Two instances of `InetSocketAddress` represent the same
address if both the InetAddresses (or hostnames if it is unresolved) and port
numbers are equal.
If both addresses are unresolved, then the hostname and the port number
are compared.

Note: Hostnames are case insensitive. e.g. "FooBar" and "foobar" are
considered equal.

Parameters:

- `obj`: the object to compare against.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.net.InetAddress#equals(java.lang.Object)

## InetSocketAddress.hashCode()

```java
public final int hashCode()
```

Returns a hashcode for this socket address.

**Returns:** a hash code value for this socket address.
