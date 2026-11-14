# InetAddress class (java.net)

```java
public sealed class InetAddress implements Serializable permits Inet4Address, Inet6Address
```

This class represents an Internet Protocol (IP) address.

<p> An IP address is either a 32-bit or 128-bit unsigned number
used by IP, a lower-level protocol on which protocols like UDP and
TCP are built. The IP address architecture is defined by <a
href="http://www.ietf.org/rfc/rfc790.txt"><i>RFC&nbsp;790:
Assigned Numbers</i></a>, <a
href="http://www.ietf.org/rfc/rfc1918.txt"> <i>RFC&nbsp;1918:
Address Allocation for Private Internets</i></a>, <a
href="http://www.ietf.org/rfc/rfc2365.txt"><i>RFC&nbsp;2365:
Administratively Scoped IP Multicast</i></a>, and <a
href="http://www.ietf.org/rfc/rfc2373.txt"><i>RFC&nbsp;2373: IP
Version 6 Addressing Architecture</i></a>. An instance of an
InetAddress consists of an IP address and possibly its
corresponding host name (depending on whether it is constructed
with a host name or whether it has already done reverse host name
resolution).

<h2> Address types </h2>

<table class="striped" style="margin-left:2em">
  <caption style="display:none">Description of unicast and multicast address types</caption>
  <thead>
  <tr><th scope="col">Address Type</th><th scope="col">Description</th></tr>
  </thead>
  <tbody>
  <tr><th scope="row" style="vertical-align:top">unicast</th>
      <td>An identifier for a single interface. A packet sent to
        a unicast address is delivered to the interface identified by
        that address.

        <p> The Unspecified Address -- Also called anylocal or wildcard
        address. It must never be assigned to any node. It indicates the
        absence of an address. One example of its use is as the target of
        bind, which allows a server to accept a client connection on any
        interface, in case the server host has multiple interfaces.

        <p> The <i>unspecified</i> address must not be used as
        the destination address of an IP packet.

        <p> The <i>Loopback</i> Addresses -- This is the address
        assigned to the loopback interface. Anything sent to this
        IP address loops around and becomes IP input on the local
        host. This address is often used when testing a
        client.</td></tr>
  <tr><th scope="row" style="vertical-align:top">multicast</th>
      <td>An identifier for a set of interfaces (typically belonging
        to different nodes). A packet sent to a multicast address is
        delivered to all interfaces identified by that address.</td></tr>
</tbody>
</table>

<h3> IP address scope </h3>

<p> <i>Link-local</i> addresses are designed to be used for addressing
on a single link for purposes such as auto-address configuration,
neighbor discovery, or when no routers are present.

<p> <i>Site-local</i> addresses are designed to be used for addressing
inside of a site without the need for a global prefix.

<p> <i>Global</i> addresses are unique across the internet.

<h3> <a id="format">Textual representation of IP addresses</a> </h3>

The textual representation of an IP address is address family specific.

<p>

For IPv4 address format, please refer to the supported
{@linkplain Inet4Address##format IPv4 address textual representations};
For IPv6 address format, please refer to the supported
{@linkplain Inet6Address##format IPv6 address textual representations}.

<p> There are a <a href="doc-files/net-properties.html#Ipv4IPv6">couple of
System Properties</a> affecting how IPv4 and IPv6 addresses are used.

<h2 id="host-name-resolution"> Host Name Resolution </h2>

<p> The InetAddress class provides methods to resolve host names to
their IP addresses and vice versa. The actual resolution is delegated to an
{@linkplain InetAddressResolver InetAddress resolver}.

<p> <i>Host name-to-IP address resolution</i> maps a host name to an IP address.
For any host name, its corresponding IP address is returned.

<p> <i>Reverse name resolution</i> means that for any IP address,
the host associated with the IP address is returned.

<p id="built-in-resolver"> The built-in InetAddress resolver implementation does
host name-to-IP address resolution and vice versa through the use of
a combination of local machine configuration information and network
naming services such as the Domain Name System (DNS) and the Lightweight Directory
Access Protocol (LDAP).
The particular naming services that the built-in resolver uses by default
depends on the configuration of the local machine.

<p> {@code InetAddress} has a service provider mechanism for InetAddress resolvers
that allows a custom InetAddress resolver to be used instead of the built-in implementation.
{@link InetAddressResolverProvider} is the service provider class. Its API docs provide all the
details on this mechanism.

<h2> InetAddress Caching </h2>

The InetAddress class has a cache to store successful as well as
unsuccessful host name resolutions.

<p> The default behavior is to cache entries for a finite (implementation
dependent) period of time. The result of unsuccessful host
name resolution is cached for a very short period of time (10
seconds) to improve performance.

<p> If the default behavior is not desired, then a Java security property
can be set to a different Time-to-live (TTL) value for positive
caching. Likewise, a system admin can configure a different
negative caching TTL value when needed or extend the usage of the stale data.

<p> Three Java {@linkplain java.security.Security security} properties control
the TTL values used for positive and negative host name resolution caching:

<dl style="margin-left:2em">
<dt><b>networkaddress.cache.ttl</b></dt>
<dd>Indicates the caching policy for successful name lookups from
the name service. The value is specified as an integer to indicate
the number of seconds to cache the successful lookup. The default
setting is to cache for an implementation specific period of time.
<p>
A value of -1 indicates "cache forever".
</dd>
<dt><b>networkaddress.cache.stale.ttl</b></dt>
<dd>Indicates the caching policy for stale names. The value is specified as
an integer to indicate the number of seconds that stale names will be kept in
the cache. A name is considered stale if the TTL has expired and an attempt
to lookup the host name again was not successful. This property is useful if
it is preferable to use a stale name rather than fail due to an unsuccessful
lookup. The default setting is to cache for an implementation specific period
of time.
<p>
If the value of this property is larger than "networkaddress.cache.ttl" then
"networkaddress.cache.ttl" will be used as a refresh interval of the name in
the cache. For example, if this property is set to 1 day and
"networkaddress.cache.ttl" is set to 30 seconds, then the positive response
will be cached for 1 day but an attempt to refresh it will be done every
30 seconds.
<p>
A value of 0 (zero) or if the property is not set means do not use stale
names. Negative values are ignored.
</dd>
<dt><b>networkaddress.cache.negative.ttl</b> (default: 10)</dt>
<dd>Indicates the caching policy for un-successful name lookups
from the name service. The value is specified as an integer to
indicate the number of seconds to cache the failure for
un-successful lookups.
<p>
A value of 0 indicates "never cache".
A value of -1 indicates "cache forever".
</dd>
</dl>

@spec https://www.rfc-editor.org/info/rfc1918
     RFC 1918: Address Allocation for Private Internets
@spec https://www.rfc-editor.org/info/rfc2365
     RFC 2365: Administratively Scoped IP Multicast
@spec https://www.rfc-editor.org/info/rfc2373
     RFC 2373: IP Version 6 Addressing Architecture
@spec https://www.rfc-editor.org/info/rfc790
     RFC 790: Assigned numbers
@author  Chris Warth
@see     java.net.InetAddress#getByAddress(byte[])
@see     java.net.InetAddress#getByAddress(java.lang.String, byte[])
@see     java.net.InetAddress#getAllByName(java.lang.String)
@see     java.net.InetAddress#getByName(java.lang.String)
@see     java.net.InetAddress#getLocalHost()
@since 1.0
@sealedGraph

## InetAddress.isMulticastAddress()

```java
public boolean isMulticastAddress()
```

Utility routine to check if the InetAddress is an
IP multicast address.
@return a {@code boolean} indicating if the InetAddress is
an IP multicast address
@since   1.1

## InetAddress.isAnyLocalAddress()

```java
public boolean isAnyLocalAddress()
```

Utility routine to check if the InetAddress is a wildcard address.
@return a {@code boolean} indicating if the InetAddress is
        a wildcard address.
@since 1.4

## InetAddress.isLoopbackAddress()

```java
public boolean isLoopbackAddress()
```

Utility routine to check if the InetAddress is a loopback address.

@return a {@code boolean} indicating if the InetAddress is
a loopback address; or false otherwise.
@since 1.4

## InetAddress.isLinkLocalAddress()

```java
public boolean isLinkLocalAddress()
```

Utility routine to check if the InetAddress is a link local address.

@return a {@code boolean} indicating if the InetAddress is
a link local address; or false if address is not a link local unicast address.
@since 1.4

## InetAddress.isSiteLocalAddress()

```java
public boolean isSiteLocalAddress()
```

Utility routine to check if the InetAddress is a site local address.

@return a {@code boolean} indicating if the InetAddress is
a site local address; or false if address is not a site local unicast address.
@since 1.4

## InetAddress.isMCGlobal()

```java
public boolean isMCGlobal()
```

Utility routine to check if the multicast address has global scope.

@return a {@code boolean} indicating if the address has
        is a multicast address of global scope, false if it is not
        of global scope or it is not a multicast address
@since 1.4

## InetAddress.isMCNodeLocal()

```java
public boolean isMCNodeLocal()
```

Utility routine to check if the multicast address has node scope.

@return a {@code boolean} indicating if the address has
        is a multicast address of node-local scope, false if it is not
        of node-local scope or it is not a multicast address
@since 1.4

## InetAddress.isMCLinkLocal()

```java
public boolean isMCLinkLocal()
```

Utility routine to check if the multicast address has link scope.

@return a {@code boolean} indicating if the address has
        is a multicast address of link-local scope, false if it is not
        of link-local scope or it is not a multicast address
@since 1.4

## InetAddress.isMCSiteLocal()

```java
public boolean isMCSiteLocal()
```

Utility routine to check if the multicast address has site scope.

@return a {@code boolean} indicating if the address has
        is a multicast address of site-local scope, false if it is not
        of site-local scope or it is not a multicast address
@since 1.4

## InetAddress.isMCOrgLocal()

```java
public boolean isMCOrgLocal()
```

Utility routine to check if the multicast address has organization scope.

@return a {@code boolean} indicating if the address has
        is a multicast address of organization-local scope,
        false if it is not of organization-local scope
        or it is not a multicast address
@since 1.4

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
<p>
The timeout value, in milliseconds, indicates the maximum amount of time
the try should take. If the operation times out before getting an
answer, the host is deemed unreachable. A negative value will result
in an IllegalArgumentException being thrown.

@param   timeout the time, in milliseconds, before the call aborts
@return a {@code boolean} indicating if the address is reachable.
@throws IOException if a network error occurs
@throws  IllegalArgumentException if {@code timeout} is negative.
@since 1.5

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
<p>
The {@code network interface} and {@code ttl} parameters
let the caller specify which network interface the test will go through
and the maximum number of hops the packets should go through.
A negative value for the {@code ttl} will result in an
IllegalArgumentException being thrown.
<p>
The timeout value, in milliseconds, indicates the maximum amount of time
the try should take. If the operation times out before getting an
answer, the host is deemed unreachable. A negative value will result
in an IllegalArgumentException being thrown.

@param   netif   the NetworkInterface through which the
                   test will be done, or null for any interface
@param   ttl     the maximum numbers of hops to try or 0 for the
                 default
@param   timeout the time, in milliseconds, before the call aborts
@throws  IllegalArgumentException if either {@code timeout}
                         or {@code ttl} are negative.
@return a {@code boolean} indicating if the address is reachable.
@throws IOException if a network error occurs
@since 1.5

## InetAddress.getHostName()

```java
public String getHostName()
```

Gets the host name for this IP address.

<p>If this InetAddress was created with a host name,
this host name will be remembered and returned;
otherwise, a reverse name lookup will be performed
and the result will be returned based on the system-wide
resolver. If a lookup of the name service
is required, call
{@link #getCanonicalHostName() getCanonicalHostName}.

@return  the host name for this IP address

@see InetAddress#getCanonicalHostName

## InetAddress.getCanonicalHostName()

```java
public String getCanonicalHostName()
```

Gets the fully qualified domain name for this
{@linkplain InetAddress#getAddress() IP address} using the system-wide
{@linkplain InetAddressResolver resolver}.

<p>The system-wide resolver will be used to do a reverse name lookup of the IP address.
The lookup can fail for many reasons that include the host not being registered with the name
service. If the resolver is unable to determine the fully qualified
domain name, this method returns the {@linkplain #getHostAddress() textual representation}
of the IP address.

@return  the fully qualified domain name for this IP address.
         If the system-wide resolver wasn't able to determine the
         fully qualified domain name for the IP address, the textual
         representation of the IP address is returned instead.

@since 1.4

## InetAddress.getAddress()

```java
public byte[] getAddress()
```

Returns the raw IP address of this {@code InetAddress}
object. The result is in network byte order: the highest order
byte of the address is in {@code getAddress()[0]}.

@return  the raw IP address of this object.

## InetAddress.getHostAddress()

```java
public String getHostAddress()
```

Returns the IP address string in textual presentation.

@return  the raw IP address in a string format.
@since   1.0.2

## InetAddress.hashCode()

```java
public int hashCode()
```

Returns a hashcode for this IP address.

@return  a hash code value for this IP address.

## InetAddress.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is {@code true} if and only if the argument is
not {@code null} and it represents the same IP address as
this object.
<p>
Two instances of {@code InetAddress} represent the same IP
address if the length of the byte arrays returned by
{@code getAddress} is the same for both, and each of the
array components is the same for the byte arrays.

@param   obj   the object to compare against.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.
@see     java.net.InetAddress#getAddress()

## InetAddress.toString()

```java
public String toString()
```

Converts this IP address to a {@code String}. The
string returned is of the form: hostname / literal IP
address.

If the host name is unresolved, no reverse lookup
is performed. The hostname part will be represented
by an empty string.

@return  a string representation of this IP address.

## InetAddress.tryRemoveExpiredAddress(long)

```java
public boolean tryRemoveExpiredAddress(long now)
```

Checks if the current cache record is expired or not. Expired records
are removed from the expirySet and cache.

@return {@code true} if the record was removed

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

@param addr byte array representing an IP address
@return {@code String} representing the host name mapping
@throws UnknownHostException if no host found for the specified IP address
@throws IllegalArgumentException if IP address is of illegal length
@throws NullPointerException     if addr is {@code null}

## InetAddress.lookupByName(String, LookupPolicy)

```java
public Stream<InetAddress> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException
```

<p>Lookup a host mapping by name. Retrieve the IP addresses
associated with a host.

<p>Search the configured hosts file for the addresses associated
with the specified host name.

@param host the specified hostname
@param lookupPolicy IP addresses lookup policy which specifies addresses
                    family and their order
@return stream of IP addresses for the requested host
@throws NullPointerException if either parameter is {@code null}
@throws UnknownHostException
            if no IP address for the {@code host} could be found

## InetAddress.getByAddress(String, byte[])

```java
public static InetAddress getByAddress(String host, byte[] addr) throws UnknownHostException
```

Creates an InetAddress based on the provided host name and IP address.
The system-wide {@linkplain InetAddressResolver resolver} is not used to check
the validity of the address.

<p> The host name can either be a machine name, such as
"{@code www.example.com}", or a textual representation of its IP
address.
<p> No validity checking is done on the host name either.

<p> If addr specifies an IPv4 address an instance of Inet4Address
will be returned; otherwise, an instance of Inet6Address
will be returned.

<p> IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long

@param host the specified host
@param addr the raw IP address in network byte order
@return  an InetAddress object created from the raw IP address.
@throws     UnknownHostException  if IP address is of illegal length
@since 1.4

## InetAddress.getByName(String)

```java
public static InetAddress getByName(String host) throws UnknownHostException
```

Determines the IP address of a host, given the host's name.

<p> The host name can either be a machine name, such as
"{@code www.example.com}", or a textual representation of its
IP address. If a literal IP address is supplied, only the
validity of the address format is checked.

<p> For {@code host} specified in literal IPv6 address,
either the form defined in RFC 2732 or the literal IPv6 address
format defined in RFC 2373 is accepted. IPv6 scoped addresses are also
supported. See <a href="Inet6Address.html#scoped">here</a> for a description of IPv6
scoped addresses.

<p> If the host is {@code null} or {@code host.length()} is equal
to zero, then an {@code InetAddress} representing an address of the
loopback interface is returned.
See <a href="http://www.ietf.org/rfc/rfc3330.txt">RFC&nbsp;3330</a>
section&nbsp;2 and <a href="http://www.ietf.org/rfc/rfc2373.txt">RFC&nbsp;2373</a>
section&nbsp;2.5.3.

@param      host   the specified host, or {@code null}.
@return     an IP address for the given host name.
@throws     UnknownHostException  if no IP address for the
              {@code host} could be found, or if a scope_id was specified
              for a global IPv6 address.

@spec https://www.rfc-editor.org/info/rfc2373 RFC 2373: IP Version 6 Addressing Architecture
@spec https://www.rfc-editor.org/info/rfc3330 RFC 3330: Special-Use IPv4 Addresses

## InetAddress.getAllByName(String)

```java
public static InetAddress[] getAllByName(String host) throws UnknownHostException
```

Given the name of a host, returns an array of its IP addresses,
based on the system-wide {@linkplain InetAddressResolver resolver}.

<p> The host name can either be a machine name, such as
"{@code www.example.com}", or a textual representation of its IP
address. If a literal IP address is supplied, only the
validity of the address format is checked.

<p> For {@code host} specified in <i>literal IPv6 address</i>,
either the form defined in RFC 2732 or the literal IPv6 address
format defined in RFC 2373 is accepted. A literal IPv6 address may
also be qualified by appending a scoped zone identifier or scope_id.
The syntax and usage of scope_ids is described
<a href="Inet6Address.html#scoped">here</a>.

<p> If the host is {@code null} or {@code host.length()} is equal
to zero, then an {@code InetAddress} representing an address of the
loopback interface is returned.
See <a href="http://www.ietf.org/rfc/rfc3330.txt">RFC&nbsp;3330</a>
section&nbsp;2 and <a href="http://www.ietf.org/rfc/rfc2373.txt">RFC&nbsp;2373</a>
section&nbsp;2.5.3. </p>

@param      host   the name of the host, or {@code null}.
@return     an array of all the IP addresses for a given host name.

@throws     UnknownHostException  if no IP address for the
              {@code host} could be found, or if a scope_id was specified
              for a global IPv6 address.

@spec https://www.rfc-editor.org/info/rfc2373 RFC 2373: IP Version 6 Addressing Architecture
@spec https://www.rfc-editor.org/info/rfc3330 RFC 3330: Special-Use IPv4 Addresses

## InetAddress.getLoopbackAddress()

```java
public static InetAddress getLoopbackAddress()
```

Returns the loopback address.
<p>
The InetAddress returned will represent the IPv4
loopback address, 127.0.0.1, or the IPv6 loopback
address, ::1. The IPv4 loopback address returned
is only one of many in the form 127.*.*.*

@return  the InetAddress loopback instance.
@since 1.7

## InetAddress.ofLiteral(String)

```java
public static InetAddress ofLiteral(String ipAddressLiteral)
```

Creates an {@code InetAddress} based on the provided {@linkplain InetAddress##format
textual representation} of an IP address.
<p> The provided IP address literal is parsed as
{@linkplain Inet4Address#ofLiteral(String) an IPv4 address literal} first.
If it cannot be parsed as an IPv4 address literal, then the method attempts
to parse it as {@linkplain Inet6Address#ofLiteral(String) an IPv6 address literal}.
If neither attempts succeed an {@code IllegalArgumentException} is thrown.
<p> This method doesn't block, i.e. no reverse lookup is performed.

@param ipAddressLiteral the textual representation of an IP address.
@return an {@link InetAddress} object with no hostname set, and constructed
        from the provided IP address literal.
@throws IllegalArgumentException if the {@code ipAddressLiteral} cannot be parsed
        as an IPv4 or IPv6 address literal.
@throws NullPointerException if the {@code ipAddressLiteral} is {@code null}.
@see Inet4Address#ofLiteral(String)
@see Inet6Address#ofLiteral(String)
@see Inet4Address#ofPosixLiteral(String)
@since 22

## InetAddress.getByAddress(byte[])

```java
public static InetAddress getByAddress(byte[] addr) throws UnknownHostException
```

Returns an {@code InetAddress} object given the raw IP address .
The argument is in network byte order: the highest order
byte of the address is in {@code getAddress()[0]}.

<p> This method doesn't block, i.e. no reverse lookup is performed.

<p> IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long

@param addr the raw IP address in network byte order
@return  an InetAddress object created from the raw IP address.
@throws     UnknownHostException  if IP address is of illegal length
@since 1.4

## InetAddress.getLocalHost()

```java
public static InetAddress getLocalHost() throws UnknownHostException
```

Returns the address of the local host. This is achieved by retrieving
the name of the host from the system, then resolving that name into
an {@code InetAddress}.

<P>Note: The resolved address may be cached for a short period of time.
</P>

@return     the address of the local host.

@throws     UnknownHostException  if the local host name could not
            be resolved into an address.

@see java.net.InetAddress#getByName(java.lang.String)