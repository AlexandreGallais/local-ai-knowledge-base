# UnixDomainSocketAddress class (java.net)

```java
public final class UnixDomainSocketAddress extends SocketAddress
```

A Unix domain socket address.
A Unix domain socket address encapsulates a file-system path that Unix domain sockets
bind or connect to.

<p> An <a id="unnamed"></a><i>unnamed</i> {@code UnixDomainSocketAddress} has
an empty path. The local address of a {@link SocketChannel} to a Unix domain socket
that is <i>automatically</i> or <i>implicitly</i> bound will be unnamed.

<p> {@link Path} objects used to create instances of this class must be obtained
from the {@linkplain FileSystems#getDefault system-default} file system.

@see java.nio.channels.SocketChannel
@see java.nio.channels.ServerSocketChannel
@since 16

## UnixDomainSocketAddress.of(String)

```java
public static UnixDomainSocketAddress of(String pathname)
```

Creates a UnixDomainSocketAddress from the given path string.

@param  pathname
        The path string, which can be empty

@return A UnixDomainSocketAddress

@throws InvalidPathException
        If the path cannot be converted to a Path

@throws NullPointerException if pathname is {@code null}

## UnixDomainSocketAddress.of(Path)

```java
public static UnixDomainSocketAddress of(Path path)
```

Creates a UnixDomainSocketAddress for the given path.

@param  path
        The path to the socket, which can be empty

@return A UnixDomainSocketAddress

@throws IllegalArgumentException
        If the path is not associated with the default file system

@throws NullPointerException if path is {@code null}

## UnixDomainSocketAddress.getPath()

```java
public Path getPath()
```

Returns this address's path.

@return this address's path

## UnixDomainSocketAddress.hashCode()

```java
public int hashCode()
```

Returns the hash code of this {@code UnixDomainSocketAddress}

## UnixDomainSocketAddress.equals(Object)

```java
public boolean equals(Object o)
```

Compares this address with another object.

@return true if the path fields are equal

## UnixDomainSocketAddress.toString()

```java
public String toString()
```

Returns a string representation of this {@code UnixDomainSocketAddress}.

@return this address's path which may be empty for an unnamed address