---
title: "UnixDomainSocketAddress class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/UnixDomainSocketAddress.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnixDomainSocketAddress class (java.net)

```java
public final class UnixDomainSocketAddress extends SocketAddress
```

A Unix domain socket address.
A Unix domain socket address encapsulates a file-system path that Unix domain sockets
bind or connect to.

 An *unnamed* `UnixDomainSocketAddress` has
an empty path. The local address of a `SocketChannel` to a Unix domain socket
that is *automatically* or *implicitly* bound will be unnamed.

 `Path` objects used to create instances of this class must be obtained
from the system-default file system.

**See also:** java.nio.channels.SocketChannel

**See also:** java.nio.channels.ServerSocketChannel

**Since:** 16

## UnixDomainSocketAddress.of(String)

```java
public static UnixDomainSocketAddress of(String pathname)
```

Creates a UnixDomainSocketAddress from the given path string.

Parameters:

- `pathname`: The path string, which can be empty

**Returns:** A UnixDomainSocketAddress

Throws:

- `InvalidPathException`: If the path cannot be converted to a Path
- `NullPointerException`: if pathname is `null`

## UnixDomainSocketAddress.of(Path)

```java
public static UnixDomainSocketAddress of(Path path)
```

Creates a UnixDomainSocketAddress for the given path.

Parameters:

- `path`: The path to the socket, which can be empty

**Returns:** A UnixDomainSocketAddress

Throws:

- `IllegalArgumentException`: If the path is not associated with the default file system
- `NullPointerException`: if path is `null`

## UnixDomainSocketAddress.getPath()

```java
public Path getPath()
```

Returns this address's path.

**Returns:** this address's path

## UnixDomainSocketAddress.hashCode()

```java
public int hashCode()
```

Returns the hash code of this `UnixDomainSocketAddress`

## UnixDomainSocketAddress.equals(Object)

```java
public boolean equals(Object o)
```

Compares this address with another object.

**Returns:** true if the path fields are equal

## UnixDomainSocketAddress.toString()

```java
public String toString()
```

Returns a string representation of this `UnixDomainSocketAddress`.

**Returns:** this address's path which may be empty for an unnamed address
