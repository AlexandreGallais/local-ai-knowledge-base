# InetAddressResolver interface (java.net.spi)

```java
public interface InetAddressResolver
```

This interface defines operations for looking up host names and IP addresses.
{@link InetAddress} delegates all lookup operations to the <i>system-wide
resolver</i>.

<p> The <i>system-wide resolver</i> can be customized by
<a href="InetAddressResolverProvider.html#system-wide-resolver">
deploying an implementation</a> of {@link InetAddressResolverProvider}.

@since 18

## InetAddressResolver.lookupByName(String, LookupPolicy)

```java
Stream<InetAddress> lookupByName(String host, LookupPolicy lookupPolicy) throws UnknownHostException
```

Given the name of a host, returns a stream of IP addresses of the requested
address family associated with a provided hostname.

<p> {@code host} should be a machine name, such as "{@code www.example.com}",
not a textual representation of its IP address. No validation is performed on
the given {@code host} name: if a textual representation is supplied, the name
resolution is likely to fail and {@link UnknownHostException} may be thrown.

<p> The address family type and addresses order are specified by the
{@code LookupPolicy} instance. Lookup operation characteristics could be
acquired with {@link LookupPolicy#characteristics()}.
If {@link InetAddressResolver.LookupPolicy#IPV4} and
{@link InetAddressResolver.LookupPolicy#IPV6} characteristics provided then this
method returns addresses of both IPV4 and IPV6 families.

@param host         the specified hostname
@param lookupPolicy the address lookup policy
@return a stream of IP addresses for the requested host
@throws NullPointerException if either parameter is {@code null}
@throws UnknownHostException if no IP address for the {@code host} could be found
@see LookupPolicy

## InetAddressResolver.lookupByAddress(byte[])

```java
String lookupByAddress(byte[] addr) throws UnknownHostException
```

Lookup the host name corresponding to the raw IP address provided.

<p> {@code addr} argument is in network byte order: the highest order byte of the address
is in {@code addr[0]}.

<p> IPv4 address byte array must be 4 bytes long and IPv6 byte array
must be 16 bytes long.

@param addr byte array representing a raw IP address
@return {@code String} representing the host name mapping
@throws UnknownHostException     if no host name is found for the specified IP address
@throws IllegalArgumentException if the length of the provided byte array doesn't correspond
                                 to a valid IP address length
@throws NullPointerException     if addr is {@code null}

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
first by {@code InetAddressResolver}.

## InetAddressResolver.IPV6_FIRST

```java
public static final int IPV6_FIRST
```

Characteristic value signifying if IPv6 addresses should be returned
first by {@code InetAddressResolver}.

## InetAddressResolver.of(int)

```java
public static LookupPolicy of(int characteristics)
```

This factory method creates a {@link LookupPolicy LookupPolicy} instance with
the given {@code characteristics} value.

<p> The {@code characteristics} value is an integer bit mask which defines
parameters of a forward lookup operation. These parameters define at least:
<ul>
    <li>the family type of the returned addresses</li>
    <li>the order in which a {@linkplain InetAddressResolver resolver}
        implementation should return its results</li>
</ul>

<p> To request addresses of specific family types the following bit masks can be combined:
<ul>
    <li>{@link LookupPolicy#IPV4}: to request IPv4 addresses</li>
    <li>{@link LookupPolicy#IPV6}: to request IPv6 addresses</li>
</ul>
<br>It is an error if neither {@link LookupPolicy#IPV4} or {@link LookupPolicy#IPV6} are set.

<p> To request a specific ordering of the results:
<ul>
    <li>{@link LookupPolicy#IPV4_FIRST}: return IPv4 addresses before any IPv6 address</li>
    <li>{@link LookupPolicy#IPV6_FIRST}: return IPv6 addresses before any IPv4 address</li>
</ul>
<br>If neither {@link LookupPolicy#IPV4_FIRST} or {@link LookupPolicy#IPV6_FIRST} are set it
implies <a href="{@docRoot}/java.base/java/net/doc-files/net-properties.html#Ipv4IPv6">"system"</a>
order of addresses.
It is an error to request both {@link LookupPolicy#IPV4_FIRST} and {@link LookupPolicy#IPV6_FIRST}.

@param characteristics a value which represents the set of lookup characteristics
@return an instance of {@code InetAddressResolver.LookupPolicy}
@throws IllegalArgumentException if an illegal characteristics bit mask is provided
@see InetAddressResolver#lookupByName(String, LookupPolicy)

## InetAddressResolver.characteristics()

```java
public int characteristics()
```

Returns the set of characteristics of this lookup policy.

@return a characteristics value
@see InetAddressResolver#lookupByName(String, LookupPolicy)