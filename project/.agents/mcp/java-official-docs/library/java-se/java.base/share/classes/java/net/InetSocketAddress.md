# InetSocketAddress class (java.net)

```java
public class InetSocketAddress extends SocketAddress
```

This class implements an IP Socket Address (IP address + port number)
It can also be a pair (hostname + port number), in which case an attempt
will be made to resolve the hostname. If resolution fails then the address
is said to be <I>unresolved</I> but can still be used on some circumstances
like connecting through a proxy.
<p>
It provides an immutable object used by sockets for binding, connecting, or
as returned values.
<p>
The <i>wildcard</i> is a special local IP address. It usually means "any"
and can only be used for {@code bind} operations.

@see java.net.Socket
@see java.net.ServerSocket
@since 1.4

## InetSocketAddress.InetSocketAddress(int)

```java
public InetSocketAddress(int port)
```

Creates a socket address where the IP address is the wildcard address
and the port number a specified value.
<p>
A valid port value is between 0 and 65535.
A port number of {@code zero} will let the system pick up an
ephemeral port in a {@code bind} operation.

@param   port    The port number
@throws IllegalArgumentException if the port parameter is outside the specified
range of valid port values.

## InetSocketAddress.InetSocketAddress(InetAddress, int)

```java
public InetSocketAddress(InetAddress addr, int port)
```

Creates a socket address from an IP address and a port number.
<p>
A valid port value is between 0 and 65535.
A port number of {@code zero} will let the system pick up an
ephemeral port in a {@code bind} operation.
<P>
A {@code null} address will assign the <i>wildcard</i> address.

@param   addr    The IP address
@param   port    The port number
@throws IllegalArgumentException if the port parameter is outside the specified
range of valid port values.

## InetSocketAddress.InetSocketAddress(String, int)

```java
public InetSocketAddress(String hostname, int port)
```

Creates a socket address from a hostname and a port number.
<p>
An attempt will be made to resolve the hostname into an InetAddress.
If that attempt fails, the address will be flagged as <I>unresolved</I>.
<P>
A valid port value is between 0 and 65535.
A port number of {@code zero} will let the system pick up an
ephemeral port in a {@code bind} operation.

@param   hostname the Host name
@param   port    The port number
@throws IllegalArgumentException if the port parameter is outside the range
of valid port values, or if the hostname parameter is {@code null}.
@see     #isUnresolved()

## InetSocketAddress.createUnresolved(String, int)

```java
public static InetSocketAddress createUnresolved(String host, int port)
```

Creates an unresolved socket address from a hostname and a port number.
<p>
No attempt will be made to resolve the hostname into an InetAddress.
The address will be flagged as <I>unresolved</I>.
<p>
A valid port value is between 0 and 65535.
A port number of {@code zero} will let the system pick up an
ephemeral port in a {@code bind} operation.

@param   host    the Host name
@param   port    The port number
@throws IllegalArgumentException if the port parameter is outside
                 the range of valid port values, or if the hostname
                 parameter is {@code null}.
@see     #isUnresolved()
@return  an {@code InetSocketAddress} representing the unresolved
         socket address
@since 1.5

## InetSocketAddress.getPort()

```java
public final int getPort()
```

Gets the port number.

@return the port number.

## InetSocketAddress.getAddress()

```java
public final InetAddress getAddress()
```

Gets the {@code InetAddress}.

@return the InetAddress or {@code null} if it is unresolved.

## InetSocketAddress.getHostName()

```java
public final String getHostName()
```

Gets the {@code hostname}.
Note: This method may trigger a name service reverse lookup if the
address was created with a literal IP address.

@return  the hostname part of the address.

## InetSocketAddress.getHostString()

```java
public final String getHostString()
```

Returns the hostname, or the String form of the address if it
doesn't have a hostname (it was created using a literal).
This has the benefit of <b>not</b> attempting a reverse lookup.

@return the hostname, or String representation of the address.
@since 1.7

## InetSocketAddress.isUnresolved()

```java
public final boolean isUnresolved()
```

Checks whether the address has been resolved or not.

@return {@code true} if the hostname couldn't be resolved into
         an {@code InetAddress}.

## InetSocketAddress.toString()

```java
public String toString()
```

Constructs a string representation of this InetSocketAddress.
This string is constructed by calling {@link InetAddress#toString()}
on the InetAddress and concatenating the port number (with a colon).
<p>
If the address is an IPv6 address, the IPv6 literal is enclosed in
square brackets, for example: {@code "localhost/[0:0:0:0:0:0:0:1]:80"}.
If the address is {@linkplain #isUnresolved() unresolved},
{@code <unresolved>} is displayed in place of the address literal, for
example {@code "foo/<unresolved>:80"}.
<p>
To retrieve a string representation of the hostname or the address, use
{@link #getHostString()}, rather than parsing the string returned by this
{@link #toString()} method.

@return  a string representation of this object.

## InetSocketAddress.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares this object against the specified object.
The result is {@code true} if and only if the argument is
not {@code null} and it represents the same address as
this object.
<p>
Two instances of {@code InetSocketAddress} represent the same
address if both the InetAddresses (or hostnames if it is unresolved) and port
numbers are equal.
If both addresses are unresolved, then the hostname and the port number
are compared.

Note: Hostnames are case insensitive. e.g. "FooBar" and "foobar" are
considered equal.

@param   obj   the object to compare against.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.
@see java.net.InetAddress#equals(java.lang.Object)

## InetSocketAddress.hashCode()

```java
public final int hashCode()
```

Returns a hashcode for this socket address.

@return  a hash code value for this socket address.