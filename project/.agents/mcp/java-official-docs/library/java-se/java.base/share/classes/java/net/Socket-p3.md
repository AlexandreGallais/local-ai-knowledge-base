---
title: "Socket class (java.net) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/Socket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Socket class (java.net) (part 3 of 3)

## Socket.setTrafficClass(int)

```java
public void setTrafficClass(int tc) throws SocketException
```

Sets traffic class or type-of-service octet in the IP
header for packets sent from this Socket.
As the underlying network implementation may ignore this
value applications should consider it a hint.

 The tc **must** be in the range `0 <= tc <= 255` or an IllegalArgumentException will be thrown.

Notes:

For Internet Protocol v4 the value consists of an
`integer`, the least significant 8 bits of which
represent the value of the TOS octet in IP packets sent by
the socket.
RFC 1349 defines the TOS values as follows:

- `IPTOS_LOWCOST (0x02)`

- `IPTOS_RELIABILITY (0x04)`

- `IPTOS_THROUGHPUT (0x08)`

- `IPTOS_LOWDELAY (0x10)`

The last low order bit is always ignored as this
corresponds to the MBZ (must be zero) bit.

Setting bits in the precedence field may result in a
SocketException indicating that the operation is not
permitted.

As RFC 1122 section 4.2.4.2 indicates, a compliant TCP
implementation should, but is not required to, let application
change the TOS field during the lifetime of a connection.
So whether the type-of-service field can be changed after the
TCP connection has been established depends on the implementation
in the underlying platform. Applications should not assume that
they can change the TOS field after the connection.

For Internet Protocol v6 `tc` is the value that
would be placed into the sin6_flowinfo field of the IP header.

Parameters:

- `tc`: an `int` value for the bitset.

**Since:** 1.4

**See also:** #getTrafficClass

**See also:** StandardSocketOptions#IP_TOS

Throws:

- `SocketException`: if there is an error setting the traffic class or type-of-service, or the socket is closed.

## Socket.getTrafficClass()

```java
public int getTrafficClass() throws SocketException
```

Gets traffic class or type-of-service in the IP header
for packets sent from this Socket

As the underlying network implementation may ignore the
traffic class or type-of-service set using `setTrafficClass(int)`
this method may return a different value than was previously
set using the `setTrafficClass(int)` method on this Socket.

**Returns:** the traffic class or type-of-service already set

**Since:** 1.4

**See also:** #setTrafficClass(int)

**See also:** StandardSocketOptions#IP_TOS

Throws:

- `SocketException`: if there is an error obtaining the traffic class or type-of-service value, or the socket is closed.

## Socket.setReuseAddress(boolean)

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

When a `Socket` is created the initial setting
of `SO_REUSEADDR` is disabled.

The behaviour when `SO_REUSEADDR` is enabled or disabled after
a socket is bound (See `isBound()`) is not defined.

Parameters:

- `on`: whether to enable or disable the socket option

**Since:** 1.4

**See also:** #getReuseAddress()

**See also:** #bind(SocketAddress)

**See also:** #isClosed()

**See also:** #isBound()

Throws:

- `SocketException`: if an error occurs enabling or disabling the `SO_REUSEADDR` socket option, or the socket is closed.

## Socket.getReuseAddress()

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

## Socket.close()

```java
public void close() throws IOException
```

Closes this socket.

Any thread currently blocked in an I/O operation upon this socket
will throw a `SocketException`.

Once a socket has been closed, it is not available for further networking
use (i.e. can't be reconnected or rebound) and several of the methods defined
by this class will throw an exception if invoked on the closed socket. A new
socket needs to be created.

 Closing this socket will also close the socket's
InputStream and
OutputStream.

 If this socket has an associated channel then the channel is closed
as well.

**See also:** #isClosed()

Throws:

- `IOException`: if an I/O error occurs when closing this socket.

## Socket.shutdownInput()

```java
public void shutdownInput() throws IOException
```

Places the input stream for this socket at "end of stream".
Any data sent to the input stream side of the socket is acknowledged
and then silently discarded.

If you read from a socket input stream after invoking this method on the
socket, the stream's `available` method will return 0, and its
`read` methods will return `-1` (end of stream).

**Since:** 1.3

**See also:** java.net.Socket#shutdownOutput()

**See also:** java.net.Socket#close()

**See also:** java.net.Socket#setSoLinger(boolean, int)

**See also:** #isInputShutdown()

Throws:

- `IOException`: if an I/O error occurs when shutting down this socket, the socket is not connected or the socket is closed.

## Socket.shutdownOutput()

```java
public void shutdownOutput() throws IOException
```

Disables the output stream for this socket.
For a TCP socket, any previously written data will be sent
followed by TCP's normal connection termination sequence.

If you write to a socket output stream after invoking
shutdownOutput() on the socket, the stream will throw
an IOException.

**Since:** 1.3

**See also:** java.net.Socket#shutdownInput()

**See also:** java.net.Socket#close()

**See also:** java.net.Socket#setSoLinger(boolean, int)

**See also:** #isOutputShutdown()

Throws:

- `IOException`: if an I/O error occurs when shutting down this socket, the socket is not connected or the socket is closed.

## Socket.toString()

```java
public String toString()
```

Converts this socket to a `String`.

**Returns:** a string representation of this socket.

## Socket.isConnected()

```java
public boolean isConnected()
```

Returns the connection state of the socket.

Note: Closing a socket doesn't clear its connection state, which means
this method will return `true` for a closed socket
(see `isClosed()`) if it was successfully connected prior
to being closed.

**Returns:** true if the socket was successfully connected to a server

**Since:** 1.4

## Socket.isBound()

```java
public boolean isBound()
```

Returns the binding state of the socket.

Note: Closing a socket doesn't clear its binding state, which means
this method will return `true` for a closed socket
(see `isClosed()`) if it was successfully bound prior
to being closed.

**Returns:** true if the socket was successfully bound to an address

**Since:** 1.4

**See also:** #bind

## Socket.isClosed()

```java
public boolean isClosed()
```

Returns the closed state of the socket.

**Returns:** true if the socket has been closed

**Since:** 1.4

**See also:** #close

## Socket.isInputShutdown()

```java
public boolean isInputShutdown()
```

Returns whether the read-half of the socket connection is closed.

**Returns:** true if the input of the socket has been shutdown

**Since:** 1.4

**See also:** #shutdownInput

## Socket.isOutputShutdown()

```java
public boolean isOutputShutdown()
```

Returns whether the write-half of the socket connection is closed.

**Returns:** true if the output of the socket has been shutdown

**Since:** 1.4

**See also:** #shutdownOutput

## Socket.setSocketImplFactory(SocketImplFactory)

```java
public static synchronized void setSocketImplFactory(SocketImplFactory fac) throws IOException
```

Sets the client socket implementation factory for the
application. The factory can be specified only once.

When an application creates a new client socket, the socket
implementation factory's `createSocketImpl` method is
called to create the actual socket implementation.

Passing `null` to the method is a no-op unless the factory
was already set.

Parameters:

- `fac`: the desired factory.

**See also:** java.net.SocketImplFactory#createSocketImpl()

**Deprecated:** Use a `javax.net.SocketFactory` and subclass `Socket`
   directly.

 This method provided a way in early JDK releases to replace the
   system wide implementation of `Socket`. It has been mostly
   obsolete since Java 1.4. If required, a `Socket` can be
   created to use a custom implementation by extending `Socket`
   and using the protected constructor that takes an implementation
   as a parameter.

Throws:

- `IOException`: if an I/O error occurs when setting the socket factory.
- `SocketException`: if the factory is already defined.

## Socket.setPerformancePreferences(int, int, int)

```java
public void setPerformancePreferences(int connectionTime, int latency, int bandwidth)
```

Sets performance preferences for this socket.

 Sockets use the TCP/IP protocol by default.  Some implementations
may offer alternative protocols which have different performance
characteristics than TCP/IP.  This method allows the application to
express its own preferences as to how these tradeoffs should be made
when the implementation chooses from the available protocols.

 Performance preferences are described by three integers
whose values indicate the relative importance of short connection time,
low latency, and high bandwidth.  The absolute values of the integers
are irrelevant; in order to choose a protocol the values are simply
compared, with larger values indicating stronger preferences. Negative
values represent a lower priority than positive values. If the
application prefers short connection time over both low latency and high
bandwidth, for example, then it could invoke this method with the values
`(1, 0, 0)`.  If the application prefers high bandwidth above low
latency, and low latency above short connection time, then it could
invoke this method with the values `(0, 1, 2)`.

 Invoking this method after this socket has been connected
will have no effect.

Parameters:

- `connectionTime`: An `int` expressing the relative importance of a short connection time
- `latency`: An `int` expressing the relative importance of low latency
- `bandwidth`: An `int` expressing the relative importance of high bandwidth

**Since:** 1.5

## Socket.setOption(SocketOption<T>, T)

```java
public <T> Socket setOption(SocketOption<T> name, T value) throws IOException
```

Sets the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option
- `value`: The value of the socket option. A value of `null` may be valid for some options.

**Returns:** this Socket

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the socket does not support the option.
- `IllegalArgumentException`: if the value is not valid for the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## Socket.getOption(SocketOption<T>)

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

- `UnsupportedOperationException`: if the socket does not support the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## Socket.supportedOptions()

```java
public Set<SocketOption<?>> supportedOptions()
```

Returns a set of the socket options supported by this socket.

This method will continue to return the set of options even after
the socket has been closed.

**Returns:** A set of the socket options supported by this socket. This set
        may be empty if the socket's SocketImpl cannot be created.

**Since:** 9
