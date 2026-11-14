---
title: "InetAddress class (java.net) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/InetAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InetAddress class (java.net)

```java
public sealed class InetAddress implements Serializable permits Inet4Address, Inet6Address
```

This class represents an Internet Protocol (IP) address.

 An IP address is either a 32-bit or 128-bit unsigned number
used by IP, a lower-level protocol on which protocols like UDP and
TCP are built. The IP address architecture is defined by *RFC 790:
Assigned Numbers*,  *RFC 1918:
Address Allocation for Private Internets*, *RFC 2365:
Administratively Scoped IP Multicast*, and *RFC 2373: IP
Version 6 Addressing Architecture*. An instance of an
InetAddress consists of an IP address and possibly its
corresponding host name (depending on whether it is constructed
with a host name or whether it has already done reverse host name
resolution).

####  Address types

  Description of unicast and multicast address types

  Address TypeDescription

  unicast
      An identifier for a single interface. A packet sent to
        a unicast address is delivered to the interface identified by
        that address.

 The Unspecified Address -- Also called anylocal or wildcard
        address. It must never be assigned to any node. It indicates the
        absence of an address. One example of its use is as the target of
        bind, which allows a server to accept a client connection on any
        interface, in case the server host has multiple interfaces.

 The *unspecified* address must not be used as
        the destination address of an IP packet.

 The *Loopback* Addresses -- This is the address
        assigned to the loopback interface. Anything sent to this
        IP address loops around and becomes IP input on the local
        host. This address is often used when testing a
        client.
  multicast
      An identifier for a set of interfaces (typically belonging
        to different nodes). A packet sent to a multicast address is
        delivered to all interfaces identified by that address.

####  IP address scope

 *Link-local* addresses are designed to be used for addressing
on a single link for purposes such as auto-address configuration,
neighbor discovery, or when no routers are present.

 *Site-local* addresses are designed to be used for addressing
inside of a site without the need for a global prefix.

 *Global* addresses are unique across the internet.

####  Textual representation of IP addresses

The textual representation of an IP address is address family specific.

For IPv4 address format, please refer to the supported
IPv4 address textual representations;
For IPv6 address format, please refer to the supported
IPv6 address textual representations.

 There are a couple of
System Properties affecting how IPv4 and IPv6 addresses are used.

####  Host Name Resolution

 The InetAddress class provides methods to resolve host names to
their IP addresses and vice versa. The actual resolution is delegated to an
InetAddress resolver.

 *Host name-to-IP address resolution* maps a host name to an IP address.
For any host name, its corresponding IP address is returned.

 *Reverse name resolution* means that for any IP address,
the host associated with the IP address is returned.

 The built-in InetAddress resolver implementation does
host name-to-IP address resolution and vice versa through the use of
a combination of local machine configuration information and network
naming services such as the Domain Name System (DNS) and the Lightweight Directory
Access Protocol (LDAP).
The particular naming services that the built-in resolver uses by default
depends on the configuration of the local machine.

 `InetAddress` has a service provider mechanism for InetAddress resolvers
that allows a custom InetAddress resolver to be used instead of the built-in implementation.
`InetAddressResolverProvider` is the service provider class. Its API docs provide all the
details on this mechanism.

####  InetAddress Caching

The InetAddress class has a cache to store successful as well as
unsuccessful host name resolutions.

 The default behavior is to cache entries for a finite (implementation
dependent) period of time. The result of unsuccessful host
name resolution is cached for a very short period of time (10
seconds) to improve performance.

 If the default behavior is not desired, then a Java security property
can be set to a different Time-to-live (TTL) value for positive
caching. Likewise, a system admin can configure a different
negative caching TTL value when needed or extend the usage of the stale data.

 Three Java security properties control
the TTL values used for positive and negative host name resolution caching:

**networkaddress.cache.ttl**
Indicates the caching policy for successful name lookups from
the name service. The value is specified as an integer to indicate
the number of seconds to cache the successful lookup. The default
setting is to cache for an implementation specific period of time.

A value of -1 indicates "cache forever".

**networkaddress.cache.stale.ttl**
Indicates the caching policy for stale names. The value is specified as
an integer to indicate the number of seconds that stale names will be kept in
the cache. A name is considered stale if the TTL has expired and an attempt
to lookup the host name again was not successful. This property is useful if
it is preferable to use a stale name rather than fail due to an unsuccessful
lookup. The default setting is to cache for an implementation specific period
of time.

If the value of this property is larger than "networkaddress.cache.ttl" then
"networkaddress.cache.ttl" will be used as a refresh interval of the name in
the cache. For example, if this property is set to 1 day and
"networkaddress.cache.ttl" is set to 30 seconds, then the positive response
will be cached for 1 day but an attempt to refresh it will be done every
30 seconds.

A value of 0 (zero) or if the property is not set means do not use stale
names. Negative values are ignored.

**networkaddress.cache.negative.ttl** (default: 10)
Indicates the caching policy for un-successful name lookups
from the name service. The value is specified as an integer to
indicate the number of seconds to cache the failure for
un-successful lookups.

A value of 0 indicates "never cache".
A value of -1 indicates "cache forever".

**See also:** java.net.InetAddress#getByAddress(byte[])

**See also:** java.net.InetAddress#getByAddress(java.lang.String, byte[])

**See also:** java.net.InetAddress#getAllByName(java.lang.String)

**See also:** java.net.InetAddress#getByName(java.lang.String)

**See also:** java.net.InetAddress#getLocalHost()

**Since:** 1.0

**sealedGraph:**

## InetAddress.isMulticastAddress()

```java
public boolean isMulticastAddress()
```

Utility routine to check if the InetAddress is an
IP multicast address.

**Returns:** a `boolean` indicating if the InetAddress is
an IP multicast address

**Since:** 1.1

## InetAddress.isAnyLocalAddress()

```java
public boolean isAnyLocalAddress()
```

Utility routine to check if the InetAddress is a wildcard address.

**Returns:** a `boolean` indicating if the InetAddress is
        a wildcard address.

**Since:** 1.4

## InetAddress.isLoopbackAddress()

```java
public boolean isLoopbackAddress()
```

Utility routine to check if the InetAddress is a loopback address.

**Returns:** a `boolean` indicating if the InetAddress is
a loopback address; or false otherwise.

**Since:** 1.4

## InetAddress.isLinkLocalAddress()

```java
public boolean isLinkLocalAddress()
```

Utility routine to check if the InetAddress is a link local address.

**Returns:** a `boolean` indicating if the InetAddress is
a link local address; or false if address is not a link local unicast address.

**Since:** 1.4

## InetAddress.isSiteLocalAddress()

```java
public boolean isSiteLocalAddress()
```

Utility routine to check if the InetAddress is a site local address.

**Returns:** a `boolean` indicating if the InetAddress is
a site local address; or false if address is not a site local unicast address.

**Since:** 1.4

## InetAddress.isMCGlobal()

```java
public boolean isMCGlobal()
```

Utility routine to check if the multicast address has global scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of global scope, false if it is not
        of global scope or it is not a multicast address

**Since:** 1.4

## InetAddress.isMCNodeLocal()

```java
public boolean isMCNodeLocal()
```

Utility routine to check if the multicast address has node scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of node-local scope, false if it is not
        of node-local scope or it is not a multicast address

**Since:** 1.4

## InetAddress.isMCLinkLocal()

```java
public boolean isMCLinkLocal()
```

Utility routine to check if the multicast address has link scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of link-local scope, false if it is not
        of link-local scope or it is not a multicast address

**Since:** 1.4

## InetAddress.isMCSiteLocal()

```java
public boolean isMCSiteLocal()
```

Utility routine to check if the multicast address has site scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of site-local scope, false if it is not
        of site-local scope or it is not a multicast address

**Since:** 1.4

## InetAddress.isMCOrgLocal()

```java
public boolean isMCOrgLocal()
```

Utility routine to check if the multicast address has organization scope.

**Returns:** a `boolean` indicating if the address has
        is a multicast address of organization-local scope,
        false if it is not of organization-local scope
        or it is not a multicast address

**Since:** 1.4

## InetAddress.isReachable(int)

```java
public boolean isReachable(int timeout) throws IOException
```

Test whether that address is reachable. Best effort is made by the
implementation to try to reach the host, but firewalls and server
configuration may block requests resulting in an unreachable status
while some specific ports may be accessible.
A typical implementation will use ICMP ECHO REQUESTs if the
privilege can be obtained, otherwise it will try to establish
a TCP connection on port 7 (Echo) of the destination host.

The timeout value, in milliseconds, indicates the maximum amount of time
the try should take. If the operation times out before getting an
answer, the host is deemed unreachable. A negative value will result
in an IllegalArgumentException being thrown.

Parameters:

- `timeout`: the time, in milliseconds, before the call aborts

**Returns:** a `boolean` indicating if the address is reachable.

**Since:** 1.5

Throws:

- `IOException`: if a network error occurs
- `IllegalArgumentException`: if `timeout` is negative.

## InetAddress.isReachable(NetworkInterface, int, int)

```java
public boolean isReachable(NetworkInterface netif, int ttl, int timeout) throws IOException
```

Test whether that address is reachable. Best effort is made by the
implementation to try to reach the host, but firewalls and server
configuration may block requests resulting in a unreachable status
while some specific ports may be accessible.
A typical implementation will use ICMP ECHO REQUESTs if the
privilege can be obtained, otherwise it will try to establish
a TCP connection on port 7 (Echo) of the destination host.

The `network interface` and `ttl` parameters
let the caller specify which network interface the test will go through
and the maximum number of hops the packets should go through.
A negative value for the `ttl` will result in an
IllegalArgumentException being thrown.

The timeout value, in milliseconds, indicates the maximum amount of time
the try should take. If the operation times out before getting an
answer, the host is deemed unreachable. A negative value will result
in an IllegalArgumentException being thrown.

Parameters:

- `netif`: the NetworkInterface through which the test will be done, or null for any interface
- `ttl`: the maximum numbers of hops to try or 0 for the default
- `timeout`: the time, in milliseconds, before the call aborts

**Returns:** a `boolean` indicating if the address is reachable.

**Since:** 1.5

Throws:

- `IllegalArgumentException`: if either `timeout` or `ttl` are negative.
- `IOException`: if a network error occurs

## InetAddress.getHostName()

```java
public String getHostName()
```

Gets the host name for this IP address.

If this InetAddress was created with a host name,
this host name will be remembered and returned;
otherwise, a reverse name lookup will be performed
and the result will be returned based on the system-wide
resolver. If a lookup of the name service
is required, call
getCanonicalHostName.

**Returns:** the host name for this IP address

**See also:** InetAddress#getCanonicalHostName

## InetAddress.getCanonicalHostName()

```java
public String getCanonicalHostName()
```

Gets the fully qualified domain name for this
IP address using the system-wide
resolver.

The system-wide resolver will be used to do a reverse name lookup of the IP address.
The lookup can fail for many reasons that include the host not being registered with the name
service. If the resolver is unable to determine the fully qualified
domain name, this method returns the textual representation
of the IP address.

**Returns:** the fully qualified domain name for this IP address.
         If the system-wide resolver wasn't able to determine the
         fully qualified domain name for the IP address, the textual
         representation of the IP address is returned instead.

**Since:** 1.4

## InetAddress.getAddress()

```java
public byte[] getAddress()
```

Returns the raw IP address of this `InetAddress`
object. The result is in network byte order: the highest order
byte of the address is in `getAddress()[0]`.

**Returns:** the raw IP address of this object.

## InetAddress.getHostAddress()

```java
public String getHostAddress()
```

Returns the IP address string in textual presentation.

**Returns:** the raw IP address in a string format.

**Since:** 1.0.2

## InetAddress.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this IP address.

**Returns:** a hash code value for this IP address.

## InetAddress.equals(Object)

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
