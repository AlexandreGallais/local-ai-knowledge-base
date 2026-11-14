---
title: "InetAddressResolver interface (java.net.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/spi/InetAddressResolver.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InetAddressResolver interface (java.net.spi)

```java
public interface InetAddressResolver
```

This interface defines operations for looking up host names and IP addresses.
`InetAddress` delegates all lookup operations to the *system-wide
resolver*.

 The *system-wide resolver* can be customized by

deploying an implementation of `InetAddressResolverProvider`.

**Since:** 18

## InetAddressResolver.lookupByName(String, LookupPolicy)

```java
Stream<InetAddress> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException
```

Given the name of a host, returns a stream of IP addresses of the requested
address family associated with a provided hostname.

 `host` should be a machine name, such as "`www.example.com`",
not a textual representation of its IP address. No validation is performed on
the given `host` name: if a textual representation is supplied, the name
resolution is likely to fail and `UnknownHostException` may be thrown.

 The address family type and addresses order are specified by the
`LookupPolicy` instance. Lookup operation characteristics could be
acquired with `LookupPolicy.characteristics()`.
If `InetAddressResolver.LookupPolicy.IPV4` and
`InetAddressResolver.LookupPolicy.IPV6` characteristics provided then this
method returns addresses of both IPV4 and IPV6 families.

Parameters:

- `host`: the specified hostname
- `lookupPolicy`: the address lookup policy

**Returns:** a stream of IP addresses for the requested host

**See also:** LookupPolicy

Throws:

- `NullPointerException`: if either parameter is `null`
- `UnknownHostException`: if no IP address for the `host` could be found

## InetAddressResolver.lookupByAddress(byte[])

```java
String lookupByAddress(byte[] addr) throws UnknownHostException
```

Lookup the host name corresponding to the raw IP address provided.

 `addr` argument is in network byte order: the highest order byte of the address
is in `addr[0]`.

 IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long.

Parameters:

- `addr`: byte array representing a raw IP address

**Returns:** `String` representing the host name mapping

Throws:

- `UnknownHostException`: if no host name is found for the specified IP address
- `IllegalArgumentException`: if the length of the provided byte array doesn't correspond to a valid IP address length
- `NullPointerException`: if addr is `null`

## InetAddressResolver.IPV4

```java
public static final int IPV4
```

Characteristic value signifying if IPv4 addresses need to be queried during lookup.

## InetAddressResolver.IPV6

```java
public static final int IPV6
```

Characteristic value signifying if IPv6 addresses need to be queried during lookup.

## InetAddressResolver.IPV4_FIRST

```java
public static final int IPV4_FIRST
```

Characteristic value signifying if IPv4 addresses should be returned
first by `InetAddressResolver`.

## InetAddressResolver.IPV6_FIRST

```java
public static final int IPV6_FIRST
```

Characteristic value signifying if IPv6 addresses should be returned
first by `InetAddressResolver`.

## InetAddressResolver.of(int)

```java
public static LookupPolicy of(int characteristics)
```

This factory method creates a LookupPolicy instance with
the given `characteristics` value.

 The `characteristics` value is an integer bit mask which defines
parameters of a forward lookup operation. These parameters define at least:

- the family type of the returned addresses

- the order in which a resolver
        implementation should return its results

 To request addresses of specific family types the following bit masks can be combined:

- `LookupPolicy.IPV4`: to request IPv4 addresses

- `LookupPolicy.IPV6`: to request IPv6 addresses

It is an error if neither `LookupPolicy.IPV4` or `LookupPolicy.IPV6` are set.

 To request a specific ordering of the results:

- `LookupPolicy.IPV4_FIRST`: return IPv4 addresses before any IPv6 address

- `LookupPolicy.IPV6_FIRST`: return IPv6 addresses before any IPv4 address

If neither `LookupPolicy.IPV4_FIRST` or `LookupPolicy.IPV6_FIRST` are set it
implies "system"
order of addresses.
It is an error to request both `LookupPolicy.IPV4_FIRST` and `LookupPolicy.IPV6_FIRST`.

Parameters:

- `characteristics`: a value which represents the set of lookup characteristics

**Returns:** an instance of `InetAddressResolver.LookupPolicy`

**See also:** InetAddressResolver#lookupByName(String, LookupPolicy)

Throws:

- `IllegalArgumentException`: if an illegal characteristics bit mask is provided

## InetAddressResolver.characteristics()

```java
public int characteristics()
```

Returns the set of characteristics of this lookup policy.

**Returns:** a characteristics value

**See also:** InetAddressResolver#lookupByName(String, LookupPolicy)
