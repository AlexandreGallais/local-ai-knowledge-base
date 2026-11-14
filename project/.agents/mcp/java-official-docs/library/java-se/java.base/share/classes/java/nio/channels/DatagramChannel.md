---
title: "DatagramChannel class (java.nio.channels) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/DatagramChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramChannel class (java.nio.channels)

```java
public abstract class DatagramChannel extends AbstractSelectableChannel implements ByteChannel, ScatteringByteChannel, GatheringByteChannel, MulticastChannel
```

A selectable channel for datagram-oriented sockets.

 A datagram channel is created by invoking one of the open methods
of this class. It is not possible to create a channel for an arbitrary,
pre-existing datagram socket. A newly-created datagram channel is open but not
connected. A datagram channel need not be connected in order for the send and receive methods to be used.  A datagram channel may be
connected, by invoking its connect method, in order to
avoid the overhead of checks performed as part of every send and receive operation.
A datagram channel must be connected in order to use the read and write
methods, since those methods do not accept or return socket addresses.

 Once connected, a datagram channel remains connected until it is
disconnected or closed.  Whether or not a datagram channel is connected may
be determined by invoking its isConnected method.

 Socket options are configured using the setOption method. A datagram channel to an Internet Protocol socket supports
the following options:

Socket options

    Option Name
    Description

     SO_SNDBUF
     The size of the socket send buffer

     SO_RCVBUF
     The size of the socket receive buffer

     SO_REUSEADDR
     Re-use address

     SO_BROADCAST
     Allow transmission of broadcast datagrams

     IP_TOS
     The Type of Service (ToS) octet in the Internet Protocol (IP) header

     IP_MULTICAST_IF
     The network interface for Internet Protocol (IP) multicast datagrams

     IP_MULTICAST_TTL
     The *time-to-live* for Internet Protocol (IP) multicast
      datagrams

     IP_MULTICAST_LOOP
     Loopback for Internet Protocol (IP) multicast datagrams

Additional (implementation specific) options may also be supported.

 Datagram channels are safe for use by multiple concurrent threads.  They
support concurrent reading and writing, though at most one thread may be
reading and at most one thread may be writing at any given time.

**Since:** 1.4

## DatagramChannel.DatagramChannel(SelectorProvider)

```java
protected DatagramChannel(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## DatagramChannel.open()

```java
public static DatagramChannel open() throws IOException
```

Opens a datagram channel.

 The new channel is created by invoking the openDatagramChannel method of the system-wide default `java.nio.channels.spi.SelectorProvider` object.  The channel will not be
connected.

 The ProtocolFamily of the channel's socket
is platform (and possibly configuration) dependent and therefore unspecified.
The open allows the protocol family to be
selected when opening a datagram channel, and should be used to open
datagram channels that are intended for Internet Protocol multicasting.

**Returns:** A new datagram channel

**See also:** java.net.preferIPv4Stack system property

Throws:

- `IOException`: If an I/O error occurs

## DatagramChannel.open(ProtocolFamily)

```java
public static DatagramChannel open(ProtocolFamily family) throws IOException
```

Opens a datagram channel.

 The `family` parameter is used to specify the `ProtocolFamily`. If the datagram channel is to be used for IP multicasting
then this should correspond to the address type of the multicast groups
that this channel will join.

 The new channel is created by invoking the openDatagramChannel method of the system-wide default `java.nio.channels.spi.SelectorProvider` object.  The channel will not be
connected.

Parameters:

- `family`: The protocol family

**API note:** Unix domain
         sockets are not supported.

**Returns:** A new datagram channel

**See also:** java.net.preferIPv4Stack system property

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported. For example, suppose the parameter is specified as StandardProtocolFamily.INET6 but IPv6 is not enabled on the platform.
- `IOException`: If an I/O error occurs

## DatagramChannel.validOps()

```java
public final int validOps()
```

Returns an operation set identifying this channel's supported
operations.

 Datagram channels support reading and writing, so this method
returns `(``SelectionKey.OP_READ` `|` `SelectionKey.OP_WRITE``)`.

**Returns:** The valid-operation set

## DatagramChannel.bind(SocketAddress)

```java
public abstract DatagramChannel bind(SocketAddress local) throws IOException
```

**Since:** 1.7

Throws:

- `AlreadyBoundException`: (inherited documentation)
- `UnsupportedAddressTypeException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## DatagramChannel.setOption(SocketOption<T>, T)

```java
public abstract <T> DatagramChannel setOption(SocketOption<T> name, T value) throws IOException
```

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## DatagramChannel.socket()

```java
public abstract DatagramSocket socket()
```

Retrieves a datagram socket associated with this channel.

**Returns:** A datagram socket associated with this channel

## DatagramChannel.isConnected()

```java
public abstract boolean isConnected()
```

Tells whether or not this channel's socket is connected.

**Returns:** `true` if, and only if, this channel's socket
         is open and connected

## DatagramChannel.connect(SocketAddress)

```java
public abstract DatagramChannel connect(SocketAddress remote) throws IOException
```

Connects this channel's socket.

 The channel's socket is configured so that it only receives
datagrams from, and sends datagrams to, the given remote *peer*
address.  Once connected, datagrams may not be received from or sent to
any other address.  Datagrams in the channel's socket receive buffer, which
have not been received before invoking
this method, may be discarded.  The channel's socket remains connected
until it is explicitly disconnected or until it is closed.

 This method may be invoked at any time.  If another thread has
already initiated a read or write operation upon this channel, then an
invocation of this method will block until any such operation is
complete.  If this channel's socket is not bound then this method will
first cause the socket to be bound to an address that is assigned
automatically, as if invoking the bind method with a
parameter of `null`.

Parameters:

- `remote`: The remote address to which this channel is to be connected

**Returns:** This datagram channel

Throws:

- `AlreadyConnectedException`: If this channel is already connected
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the connect operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the connect operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `UnresolvedAddressException`: If the given remote address is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `IOException`: If some other I/O error occurs

## DatagramChannel.disconnect()

```java
public abstract DatagramChannel disconnect() throws IOException
```

Disconnects this channel's socket.

 The channel's socket is configured so that it can receive datagrams
from, and sends datagrams to, any remote address.

 This method may be invoked at any time.  If another thread has
already initiated a read or write operation upon this channel, then an
invocation of this method will block until any such operation is
complete.

 If this channel's socket is not connected, or if the channel is
closed, then invoking this method has no effect.

**API note:** If this method throws an IOException, the channel's socket
may be left in an unspecified state. It is strongly recommended that
the channel be closed when disconnect fails.

**Returns:** This datagram channel

Throws:

- `IOException`: If some other I/O error occurs

## DatagramChannel.getRemoteAddress()

```java
public abstract SocketAddress getRemoteAddress() throws IOException
```

Returns the remote address to which this channel's socket is connected.

**Returns:** The remote address; `null` if the channel's socket is not
         connected

**Since:** 1.7

Throws:

- `ClosedChannelException`: If the channel is closed
- `IOException`: If an I/O error occurs

## DatagramChannel.receive(ByteBuffer)

```java
public abstract SocketAddress receive(ByteBuffer dst) throws IOException
```

Receives a datagram via this channel.

 If a datagram is immediately available, or if this channel is in
blocking mode and one eventually becomes available, then the datagram is
copied into the given byte buffer and its source address is returned.
If this channel is in non-blocking mode and a datagram is not
immediately available then this method immediately returns
`null`.

 The datagram is transferred into the given byte buffer starting at
its current position, as if by a regular read operation.  If there
are fewer bytes remaining in the buffer than are required to hold the
datagram then the remainder of the datagram is silently discarded.

 This method may be invoked at any time.  If another thread has
already initiated a read operation upon this channel, however, then an
invocation of this method will block until the first operation is
complete. If this channel's socket is not bound then this method will
first cause the socket to be bound to an address that is assigned
automatically, as if invoking the bind method with a
parameter of `null`.

Parameters:

- `dst`: The buffer into which the datagram is to be transferred

**Returns:** The datagram's source address,
         or `null` if this channel is in non-blocking mode
         and no datagram was immediately available

Throws:

- `IllegalArgumentException`: If the buffer is read-only
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the read operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the read operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## DatagramChannel.send(ByteBuffer, SocketAddress)

```java
public abstract int send(ByteBuffer src, SocketAddress target) throws IOException
```

Sends a datagram via this channel.

 If this channel is in non-blocking mode and there is sufficient room
in the underlying output buffer, or if this channel is in blocking mode
and sufficient room becomes available, then the remaining bytes in the
given buffer are transmitted as a single datagram to the given target
address.

 The datagram is transferred from the byte buffer as if by a regular
write operation.

 This method may be invoked at any time.  If another thread has
already initiated a write operation upon this channel, however, then an
invocation of this method will block until the first operation is
complete. If this channel's socket is not bound then this method will
first cause the socket to be bound to an address that is assigned
automatically, as if by invoking the bind method with a
parameter of `null`.

Parameters:

- `src`: The buffer containing the datagram to be sent
- `target`: The address to which the datagram is to be sent

**Returns:** The number of bytes sent, which will be either the number
          of bytes that were remaining in the source buffer when this
          method was invoked or, if this channel is non-blocking, may be
          zero if there was insufficient room for the datagram in the
          underlying output buffer

Throws:

- `AlreadyConnectedException`: If this channel is connected to a different address from that specified by `target`
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the read operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the read operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `UnresolvedAddressException`: If the given remote address is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `IOException`: If some other I/O error occurs

## DatagramChannel.read(ByteBuffer)

```java
public abstract int read(ByteBuffer dst) throws IOException
```

Reads a datagram from this channel.

 This method may only be invoked if this channel's socket is
connected, and it only accepts datagrams from the socket's peer.  If
there are more bytes in the datagram than remain in the given buffer
then the remainder of the datagram is silently discarded.  Otherwise
this method behaves exactly as specified in the `ReadableByteChannel` interface.

Throws:

- `NotYetConnectedException`: If this channel's socket is not connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## DatagramChannel.read(ByteBuffer[], int, int)

```java
public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException
```

Reads a datagram from this channel.

 This method may only be invoked if this channel's socket is
connected, and it only accepts datagrams from the socket's peer.  If
there are more bytes in the datagram than remain in the given buffers
then the remainder of the datagram is silently discarded.  Otherwise
this method behaves exactly as specified in the `ScatteringByteChannel` interface.

Throws:

- `NotYetConnectedException`: If this channel's socket is not connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
