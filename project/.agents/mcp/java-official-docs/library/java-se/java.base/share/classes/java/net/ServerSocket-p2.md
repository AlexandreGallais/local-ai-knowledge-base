---
title: "ServerSocket class (java.net) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/ServerSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ServerSocket class (java.net) (part 2 of 2)

## ServerSocket.setReuseAddress(boolean)

```java
public void setReuseAddress(boolean on) throws SocketException
```

Enable/disable the SO_REUSEADDR
socket option.

When a TCP connection is closed the connection may remain
in a timeout state for a period of time after the connection
is closed (typically known as the `TIME_WAIT` state
or `2MSL` wait state).
For applications using a well known socket address or port
it may not be possible to bind a socket to the required
`SocketAddress` if there is a connection in the
timeout state involving the socket address or port.

Enabling `SO_REUSEADDR` prior to binding the socket using
`bind(SocketAddress)` allows the socket to be bound even
though a previous connection is in a timeout state.

When a `ServerSocket` is created the initial setting
of `SO_REUSEADDR` is not defined. Applications can use
`getReuseAddress()` to determine the initial
setting of `SO_REUSEADDR`.

The behaviour when `SO_REUSEADDR` is enabled or disabled
after a socket is bound (See `isBound()`)
is not defined.

Parameters:

- `on`: whether to enable or disable the socket option

**Since:** 1.4

**See also:** #getReuseAddress()

**See also:** #bind(SocketAddress)

**See also:** #isBound()

**See also:** #isClosed()

Throws:

- `SocketException`: if an error occurs enabling or disabling the `SO_REUSEADDR` socket option, or the socket is closed.

## ServerSocket.getReuseAddress()

```java
public boolean getReuseAddress() throws SocketException
```

Tests if SO_REUSEADDR is enabled.

**Returns:** a `boolean` indicating whether or not
        `SO_REUSEADDR` is enabled.

**Since:** 1.4

**See also:** #setReuseAddress(boolean)

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## ServerSocket.toString()

```java
public String toString()
```

Returns the implementation address and implementation port of
this socket as a `String`.

**Returns:** a string representation of this socket.

## ServerSocket.setSocketFactory(SocketImplFactory)

```java
public static synchronized void setSocketFactory(SocketImplFactory fac) throws IOException
```

Sets the server socket implementation factory for the
application. The factory can be specified only once.

When an application creates a new server socket, the socket
implementation factory's `createSocketImpl` method is
called to create the actual socket implementation.

Passing `null` to the method is a no-op unless the factory
was already set.

Parameters:

- `fac`: the desired factory.

**See also:** java.net.SocketImplFactory#createSocketImpl()

**Deprecated:** Use a `javax.net.ServerSocketFactory` and subclass `ServerSocket`
   directly.

 This method provided a way in early JDK releases to replace the
   system wide implementation of `ServerSocket`. It has been mostly
   obsolete since Java 1.4. If required, a `ServerSocket` can be
   created to use a custom implementation by extending `ServerSocket`
   and using the protected constructor that takes an implementation
   as a parameter.

Throws:

- `IOException`: if an I/O error occurs when setting the socket factory.
- `SocketException`: if the factory has already been defined.

## ServerSocket.setReceiveBufferSize(int)

```java
public void setReceiveBufferSize(int size) throws SocketException
```

Sets a default proposed value for the
SO_RCVBUF option for sockets
accepted from this `ServerSocket`. The value actually set
in the accepted socket must be determined by calling
`Socket.getReceiveBufferSize()` after the socket
is returned by `accept()`.

The value of `SO_RCVBUF` is used both to set the size of
the internal socket receive buffer, and to set the size
of the TCP receive window that is advertised to the remote peer.

It is possible to change the value subsequently, by calling
`Socket.setReceiveBufferSize(int)`. However, if the application
wishes to allow a receive window larger than 64K bytes, as defined by RFC1323
then the proposed value must be set in the ServerSocket **before**
it is bound to a local address. This implies, that the ServerSocket must be
created with the no-argument constructor, then setReceiveBufferSize() must
be called and lastly the ServerSocket is bound to an address by calling bind().

Failure to do this will not cause an error, and the buffer size may be set to the
requested value but the TCP receive window in sockets accepted from
this ServerSocket will be no larger than 64K bytes.

Parameters:

- `size`: the size to which to set the receive buffer size. This value must be greater than 0.

**Since:** 1.4

**See also:** #getReceiveBufferSize

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.
- `IllegalArgumentException`: if the value is 0 or is negative.

## ServerSocket.getReceiveBufferSize()

```java
public int getReceiveBufferSize() throws SocketException
```

Gets the value of the SO_RCVBUF option
for this `ServerSocket`, that is the proposed buffer size that
will be used for Sockets accepted from this `ServerSocket`.

Note, the value actually set in the accepted socket is determined by
calling `Socket.getReceiveBufferSize()`.

**Returns:** the value of the `SO_RCVBUF` option for this `Socket`.

**See also:** #setReceiveBufferSize(int)

**Since:** 1.4

Throws:

- `SocketException`: if there is an error in the underlying protocol, such as a TCP error, or the socket is closed.

## ServerSocket.setPerformancePreferences(int, int, int)

```java
public void setPerformancePreferences(int connectionTime, int latency, int bandwidth)
```

Sets performance preferences for this ServerSocket.

 Sockets use the TCP/IP protocol by default.  Some implementations
may offer alternative protocols which have different performance
characteristics than TCP/IP.  This method allows the application to
express its own preferences as to how these tradeoffs should be made
when the implementation chooses from the available protocols.

 Performance preferences are described by three integers
whose values indicate the relative importance of short connection time,
low latency, and high bandwidth.  The absolute values of the integers
are irrelevant; in order to choose a protocol the values are simply
compared, with larger values indicating stronger preferences.  If the
application prefers short connection time over both low latency and high
bandwidth, for example, then it could invoke this method with the values
`(1, 0, 0)`.  If the application prefers high bandwidth above low
latency, and low latency above short connection time, then it could
invoke this method with the values `(0, 1, 2)`.

 Invoking this method after this socket has been bound
will have no effect. This implies that in order to use this capability
requires the socket to be created with the no-argument constructor.

Parameters:

- `connectionTime`: An `int` expressing the relative importance of a short connection time
- `latency`: An `int` expressing the relative importance of low latency
- `bandwidth`: An `int` expressing the relative importance of high bandwidth

**Since:** 1.5

## ServerSocket.setOption(SocketOption<T>, T)

```java
public <T> ServerSocket setOption(SocketOption<T> name, T value) throws IOException
```

Sets the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option
- `value`: The value of the socket option. A value of `null` may be valid for some options.

**Returns:** this ServerSocket

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the server socket does not support the option.
- `IllegalArgumentException`: if the value is not valid for the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## ServerSocket.getOption(SocketOption<T>)

```java
public <T> T getOption(SocketOption<T> name) throws IOException
```

Returns the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option

**Returns:** The value of the socket option.

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the server socket does not support the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## ServerSocket.supportedOptions()

```java
public Set<SocketOption<?>> supportedOptions()
```

Returns a set of the socket options supported by this server socket.

This method will continue to return the set of options even after
the socket has been closed.

**Returns:** A set of the socket options supported by this socket. This set
        may be empty if the socket's SocketImpl cannot be created.

**Since:** 9
