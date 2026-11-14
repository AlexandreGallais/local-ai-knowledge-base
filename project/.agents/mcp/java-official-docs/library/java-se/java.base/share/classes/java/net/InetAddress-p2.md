---
title: "InetAddress class (java.net) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/InetAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InetAddress class (java.net) (part 2 of 2)

## InetAddress.toString()

```java
public String toString()
```

Converts this IP address to a `String`. The
string returned is of the form: hostname / literal IP
address.

If the host name is unresolved, no reverse lookup
is performed. The hostname part will be represented
by an empty string.

**Returns:** a string representation of this IP address.

## InetAddress.tryRemoveExpiredAddress(long)

```java
public boolean tryRemoveExpiredAddress(long now)
```

Checks if the current cache record is expired or not. Expired records
are removed from the expirySet and cache.

**Returns:** `true` if the record was removed

## InetAddress.tryRemoveExpiredAddress(long)

```java
public boolean tryRemoveExpiredAddress(long now)
```

Overrides the parent method to skip deleting the record from the
cache if the stale data can still be used. Note to update the
"expiryTime" field we have to remove the record from the expirySet
and add it back. It is not necessary to remove/add it here, we can do
that in the "get()" method above, but extracting it minimizes
contention on "expirySet".

## InetAddress.lookupByAddress(byte[])

```java
public String lookupByAddress(byte[] addr) throws UnknownHostException
```

Lookup the host name  corresponding to the IP address provided.
Search the configured host file a host name corresponding to
the specified IP address.

Parameters:

- `addr`: byte array representing an IP address

**Returns:** `String` representing the host name mapping

Throws:

- `UnknownHostException`: if no host found for the specified IP address
- `IllegalArgumentException`: if IP address is of illegal length
- `NullPointerException`: if addr is `null`

## InetAddress.lookupByName(String, LookupPolicy)

```java
public Stream<InetAddress> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException
```

Lookup a host mapping by name. Retrieve the IP addresses
associated with a host.

Search the configured hosts file for the addresses associated
with the specified host name.

Parameters:

- `host`: the specified hostname
- `lookupPolicy`: IP addresses lookup policy which specifies addresses family and their order

**Returns:** stream of IP addresses for the requested host

Throws:

- `NullPointerException`: if either parameter is `null`
- `UnknownHostException`: if no IP address for the `host` could be found

## InetAddress.getByAddress(String, byte[])

```java
public static InetAddress getByAddress(String host, byte[] addr) throws UnknownHostException
```

Creates an InetAddress based on the provided host name and IP address.
The system-wide resolver is not used to check
the validity of the address.

 The host name can either be a machine name, such as
"`www.example.com`", or a textual representation of its IP
address.

 No validity checking is done on the host name either.

 If addr specifies an IPv4 address an instance of Inet4Address
will be returned; otherwise, an instance of Inet6Address
will be returned.

 IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long

Parameters:

- `host`: the specified host
- `addr`: the raw IP address in network byte order

**Returns:** an InetAddress object created from the raw IP address.

**Since:** 1.4

Throws:

- `UnknownHostException`: if IP address is of illegal length

## InetAddress.getByName(String)

```java
public static InetAddress getByName(String host) throws UnknownHostException
```

Determines the IP address of a host, given the host's name.

 The host name can either be a machine name, such as
"`www.example.com`", or a textual representation of its
IP address. If a literal IP address is supplied, only the
validity of the address format is checked.

 For `host` specified in literal IPv6 address,
either the form defined in RFC 2732 or the literal IPv6 address
format defined in RFC 2373 is accepted. IPv6 scoped addresses are also
supported. See here for a description of IPv6
scoped addresses.

 If the host is `null` or `host.length()` is equal
to zero, then an `InetAddress` representing an address of the
loopback interface is returned.
See RFC 3330
section 2 and RFC 2373
section 2.5.3.

Parameters:

- `host`: the specified host, or `null`.

**Returns:** an IP address for the given host name.

Throws:

- `UnknownHostException`: if no IP address for the `host` could be found, or if a scope_id was specified for a global IPv6 address.

## InetAddress.getAllByName(String)

```java
public static InetAddress[] getAllByName(String host) throws UnknownHostException
```

Given the name of a host, returns an array of its IP addresses,
based on the system-wide resolver.

 The host name can either be a machine name, such as
"`www.example.com`", or a textual representation of its IP
address. If a literal IP address is supplied, only the
validity of the address format is checked.

 For `host` specified in *literal IPv6 address*,
either the form defined in RFC 2732 or the literal IPv6 address
format defined in RFC 2373 is accepted. A literal IPv6 address may
also be qualified by appending a scoped zone identifier or scope_id.
The syntax and usage of scope_ids is described
here.

 If the host is `null` or `host.length()` is equal
to zero, then an `InetAddress` representing an address of the
loopback interface is returned.
See RFC 3330
section 2 and RFC 2373
section 2.5.3.

Parameters:

- `host`: the name of the host, or `null`.

**Returns:** an array of all the IP addresses for a given host name.

Throws:

- `UnknownHostException`: if no IP address for the `host` could be found, or if a scope_id was specified for a global IPv6 address.

## InetAddress.getLoopbackAddress()

```java
public static InetAddress getLoopbackAddress()
```

Returns the loopback address.

The InetAddress returned will represent the IPv4
loopback address, 127.0.0.1, or the IPv6 loopback
address, ::1. The IPv4 loopback address returned
is only one of many in the form 127.*.*.*

**Returns:** the InetAddress loopback instance.

**Since:** 1.7

## InetAddress.ofLiteral(String)

```java
public static InetAddress ofLiteral(String ipAddressLiteral)
```

Creates an `InetAddress` based on the provided textual representation of an IP address.

 The provided IP address literal is parsed as
an IPv4 address literal first.
If it cannot be parsed as an IPv4 address literal, then the method attempts
to parse it as an IPv6 address literal.
If neither attempts succeed an `IllegalArgumentException` is thrown.

 This method doesn't block, i.e. no reverse lookup is performed.

Parameters:

- `ipAddressLiteral`: the textual representation of an IP address.

**Returns:** an `InetAddress` object with no hostname set, and constructed
        from the provided IP address literal.

**See also:** Inet4Address#ofLiteral(String)

**See also:** Inet6Address#ofLiteral(String)

**See also:** Inet4Address#ofPosixLiteral(String)

**Since:** 22

Throws:

- `IllegalArgumentException`: if the `ipAddressLiteral` cannot be parsed as an IPv4 or IPv6 address literal.
- `NullPointerException`: if the `ipAddressLiteral` is `null`.

## InetAddress.getByAddress(byte[])

```java
public static InetAddress getByAddress(byte[] addr) throws UnknownHostException
```

Returns an `InetAddress` object given the raw IP address .
The argument is in network byte order: the highest order
byte of the address is in `getAddress()[0]`.

 This method doesn't block, i.e. no reverse lookup is performed.

 IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long

Parameters:

- `addr`: the raw IP address in network byte order

**Returns:** an InetAddress object created from the raw IP address.

**Since:** 1.4

Throws:

- `UnknownHostException`: if IP address is of illegal length

## InetAddress.getLocalHost()

```java
public static InetAddress getLocalHost() throws UnknownHostException
```

Returns the address of the local host. This is achieved by retrieving
the name of the host from the system, then resolving that name into
an `InetAddress`.

Note: The resolved address may be cached for a short period of time.

**Returns:** the address of the local host.

**See also:** java.net.InetAddress#getByName(java.lang.String)

Throws:

- `UnknownHostException`: if the local host name could not be resolved into an address.
