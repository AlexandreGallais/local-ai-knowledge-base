---
title: "DatagramSocket class (java.net) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramSocket class (java.net) (part 3 of 3)

## DatagramSocket.setTrafficClass(int)

```java
public void setTrafficClass(int tc) throws SocketException
```

Sets traffic class or type-of-service octet in the IP
datagram header for datagrams sent from this DatagramSocket.
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

for Internet Protocol v6 `tc` is the value that
would be placed into the sin6_flowinfo field of the IP header.

Parameters:

- `tc`: an `int` value for the bitset.

**API note:** This method is equivalent to calling Object) setOption(StandardSocketOptions.IP_TOS, tc).

**Since:** 1.4

**See also:** #getTrafficClass

**See also:** StandardSocketOptions#IP_TOS

Throws:

- `SocketException`: if there is an error setting the traffic class or type-of-service, or the socket is closed.

## DatagramSocket.getTrafficClass()

```java
public int getTrafficClass() throws SocketException
```

Gets traffic class or type-of-service in the IP datagram
header for packets sent from this DatagramSocket.

As the underlying network implementation may ignore the
traffic class or type-of-service set using `setTrafficClass(int)`
this method may return a different value than was previously
set using the `setTrafficClass(int)` method on this
DatagramSocket.

**API note:** This method is equivalent to calling getOption(StandardSocketOptions.IP_TOS).

**Returns:** the traffic class or type-of-service already set

**Since:** 1.4

**See also:** #setTrafficClass(int)

**See also:** StandardSocketOptions#IP_TOS

Throws:

- `SocketException`: if there is an error obtaining the traffic class or type-of-service value, or the socket is closed.

## DatagramSocket.close()

```java
public void close()
```

Closes this datagram socket.

Any thread currently blocked in `receive` upon this socket
will throw a `SocketException`.

 If this socket has an associated channel then the channel is closed
as well.

 Once closed, several of the methods defined by this class will throw
an exception if invoked on the closed socket.

## DatagramSocket.isClosed()

```java
public boolean isClosed()
```

Returns whether the socket is closed or not.

**Returns:** true if the socket has been closed

**Since:** 1.4

## DatagramSocket.getChannel()

```java
public DatagramChannel getChannel()
```

Returns the unique `java.nio.channels.DatagramChannel` object
associated with this datagram socket, if any.

 A datagram socket will have a channel if, and only if, the channel
itself was created via the DatagramChannel.open method.

**Returns:** the datagram channel associated with this datagram socket,
         or `null` if this socket was not created for a channel

**Since:** 1.4

## DatagramSocket.setDatagramSocketImplFactory(DatagramSocketImplFactory)

```java
public static synchronized void setDatagramSocketImplFactory(DatagramSocketImplFactory fac) throws IOException
```

Sets the datagram socket implementation factory for the
application. The factory can be specified only once.

When an application creates a new datagram socket, the socket
implementation factory's `createDatagramSocketImpl` method is
called to create the actual datagram socket implementation.

Passing `null` to the method is a no-op unless the factory
was already set.

Parameters:

- `fac`: the desired factory.

**See also:** java.net.DatagramSocketImplFactory#createDatagramSocketImpl()

**Since:** 1.3

**Deprecated:** Use `DatagramChannel`, or subclass `DatagramSocket`
   directly.

 This method provided a way in early JDK releases to replace the
   system wide implementation of `DatagramSocket`. It has been mostly
   obsolete since Java 1.4. If required, a `DatagramSocket` can be
   created to use a custom implementation by extending `DatagramSocket`
   and using the protected constructor that takes an implementation
   as a parameter.

Throws:

- `IOException`: if an I/O error occurs when setting the datagram socket factory.
- `SocketException`: if the factory is already defined.

## DatagramSocket.setOption(SocketOption<T>, T)

```java
public <T> DatagramSocket setOption(SocketOption<T> name, T value) throws IOException
```

Sets the value of a socket option.

Parameters:

- `<T>`: The type of the socket option value
- `name`: The socket option
- `value`: The value of the socket option. A value of `null` may be valid for some options.

**Returns:** this DatagramSocket

**Since:** 9

Throws:

- `UnsupportedOperationException`: if the datagram socket does not support the option.
- `IllegalArgumentException`: if the value is not valid for the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## DatagramSocket.getOption(SocketOption<T>)

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

- `UnsupportedOperationException`: if the datagram socket does not support the option.
- `IOException`: if an I/O error occurs, or if the socket is closed.
- `NullPointerException`: if name is `null`

## DatagramSocket.supportedOptions()

```java
public Set<SocketOption<?>> supportedOptions()
```

Returns a set of the socket options supported by this socket.

This method will continue to return the set of options even after
the socket has been closed.

**Returns:** A set of the socket options supported by this socket. This set
       may be empty if the socket's DatagramSocketImpl cannot be created.

**Since:** 9

## DatagramSocket.joinGroup(SocketAddress, NetworkInterface)

```java
public void joinGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

Joins a multicast group.

 In order to join a multicast group, the caller should specify
the IP address of the multicast group to join, and the local
network interface to receive multicast
packets from.

-  The `mcastaddr` argument indicates the IP address
  of the multicast group to join. For historical reasons this is
  specified as a `SocketAddress`.
  The default implementation only supports `InetSocketAddress` and
  the port information is ignored.

-  The `netIf` argument specifies the local interface to receive
      multicast datagram packets, or `null` to defer to the interface
      set for outgoing multicast datagrams.
      If `null`, and no interface has been set, the behaviour is
      unspecified: any interface may be selected or the operation may fail
      with a `SocketException`.

 It is possible to call this method several times to join
several different multicast groups, or join the same group
in several different networks. However, if the socket is already a
member of the group, an `IOException` will be thrown.

Parameters:

- `mcastaddr`: indicates the multicast address to join.
- `netIf`: specifies the local interface to receive multicast datagram packets, or `null`.

**API note:** The default interface for sending outgoing multicast datagrams
can be configured with Object)
with `StandardSocketOptions.IP_MULTICAST_IF`.

**See also:** DatagramChannel#join(InetAddress, NetworkInterface)

**See also:** StandardSocketOptions#IP_MULTICAST_IF

**Since:** 17

Throws:

- `IOException`: if there is an error joining, or when the address is not a multicast address, or the platform does not support multicasting, or the socket is closed
- `IllegalArgumentException`: if mcastaddr is `null` or is a SocketAddress subclass not supported by this socket

## DatagramSocket.leaveGroup(SocketAddress, NetworkInterface)

```java
public void leaveGroup(SocketAddress mcastaddr, NetworkInterface netIf) throws IOException
```

Leave a multicast group on a specified local interface.

Parameters:

- `mcastaddr`: is the multicast address to leave. This should contain the same IP address than that used for NetworkInterface) joining the group.
- `netIf`: specifies the local interface or `null` to defer to the interface set for outgoing multicast datagrams. If `null`, and no interface has been set, the behaviour is unspecified: any interface may be selected or the operation may fail with a `SocketException`.

**API note:** The `mcastaddr` and `netIf` arguments should identify
a multicast group that was previously NetworkInterface) joined by
this `DatagramSocket`.

 It is possible to call this method several times to leave
multiple different multicast groups previously joined, or leave
the same group previously joined in multiple different networks.
However, if the socket is not a member of the specified group
in the specified network, an `IOException` will be
thrown.

**See also:** #joinGroup(SocketAddress, NetworkInterface)

**See also:** StandardSocketOptions#IP_MULTICAST_IF

**Since:** 17

Throws:

- `IOException`: if there is an error leaving or when the address is not a multicast address, or the socket is closed.
- `IllegalArgumentException`: if mcastaddr is `null` or is a SocketAddress subclass not supported by this socket.
