---
title: "Proxy class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Proxy.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Proxy class (java.net)

```java
public class Proxy
```

This class represents a proxy setting, typically a type (http, socks) and
a socket address.
A `Proxy` is an immutable object.

**See also:** java.net.ProxySelector

**Since:** 1.5

## Proxy.NO_PROXY

```java
public static final Proxy NO_PROXY
```

A proxy setting that represents a `DIRECT` connection,
basically telling the protocol handler not to use any proxying.
Used, for instance, to create sockets bypassing any other global
proxy settings (like SOCKS):

`Socket s = new Socket(Proxy.NO_PROXY);`

## Proxy.Proxy(Type, SocketAddress)

```java
public Proxy(Type type, SocketAddress sa)
```

Creates an entry representing a PROXY connection.
Certain combinations are illegal. For instance, for types Http, and
Socks, a SocketAddress **must** be provided.

Use the `Proxy.NO_PROXY` constant
for representing a direct connection.

Parameters:

- `type`: the `Type` of the proxy
- `sa`: the `SocketAddress` for that proxy

Throws:

- `IllegalArgumentException`: when the type and the address are incompatible

## Proxy.type()

```java
public Type type()
```

Returns the proxy type.

**Returns:** a Type representing the proxy type

## Proxy.address()

```java
public SocketAddress address()
```

Returns the socket address of the proxy, or
`null` if it's a direct connection.

**Returns:** a `SocketAddress` representing the socket end
        point of the proxy

## Proxy.toString()

```java
public String toString()
```

Constructs a string representation of this Proxy.
This String is constructed by calling toString() on its type
and concatenating " @ " and the toString() result from its address
if its type is not `DIRECT`.

**Returns:** a string representation of this object.

## Proxy.equals(Object)

```java
public final boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is
not `null` and it represents the same proxy as
this object.

Two instances of `Proxy` represent the same
address if both the SocketAddresses and type are equal.

Parameters:

- `obj`: the object to compare against.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.net.InetSocketAddress#equals(java.lang.Object)

## Proxy.hashCode()

```java
public final int hashCode()
```
