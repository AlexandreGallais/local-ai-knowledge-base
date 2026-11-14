# Proxy class (java.net)

```java
public class Proxy
```

This class represents a proxy setting, typically a type (http, socks) and
a socket address.
A {@code Proxy} is an immutable object.

@see     java.net.ProxySelector
@author Yingxian Wang
@author Jean-Christophe Collet
@since   1.5

## Proxy.NO_PROXY

```java
public static final Proxy NO_PROXY
```

A proxy setting that represents a {@code DIRECT} connection,
basically telling the protocol handler not to use any proxying.
Used, for instance, to create sockets bypassing any other global
proxy settings (like SOCKS):
<P>
{@code Socket s = new Socket(Proxy.NO_PROXY);}

## Proxy.Proxy(Type, SocketAddress)

```java
public Proxy(Type type, SocketAddress sa)
```

Creates an entry representing a PROXY connection.
Certain combinations are illegal. For instance, for types Http, and
Socks, a SocketAddress <b>must</b> be provided.
<P>
Use the {@code Proxy.NO_PROXY} constant
for representing a direct connection.

@param type the {@code Type} of the proxy
@param sa the {@code SocketAddress} for that proxy
@throws IllegalArgumentException when the type and the address are
incompatible

## Proxy.type()

```java
public Type type()
```

Returns the proxy type.

@return a Type representing the proxy type

## Proxy.address()

```java
public SocketAddress address()
```

Returns the socket address of the proxy, or
{@code null} if it's a direct connection.

@return a {@code SocketAddress} representing the socket end
        point of the proxy

## Proxy.toString()

```java
public String toString()
```

Constructs a string representation of this Proxy.
This String is constructed by calling toString() on its type
and concatenating " @ " and the toString() result from its address
if its type is not {@code DIRECT}.

@return  a string representation of this object.

## Proxy.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares this object against the specified object.
The result is {@code true} if and only if the argument is
not {@code null} and it represents the same proxy as
this object.
<p>
Two instances of {@code Proxy} represent the same
address if both the SocketAddresses and type are equal.

@param   obj   the object to compare against.
@return  {@code true} if the objects are the same;
         {@code false} otherwise.
@see java.net.InetSocketAddress#equals(java.lang.Object)

## Proxy.hashCode()

```java
public final int hashCode()
```

{@return a hash code value for this Proxy}