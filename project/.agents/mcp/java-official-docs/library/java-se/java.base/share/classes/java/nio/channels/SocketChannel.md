---
title: "SocketChannel class (java.nio.channels) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/SocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketChannel class (java.nio.channels)

```java
public abstract class SocketChannel extends AbstractSelectableChannel implements ByteChannel, ScatteringByteChannel, GatheringByteChannel, NetworkChannel
```

A selectable channel for stream-oriented connecting sockets.

 A socket channel is created by invoking one of the `open` methods of
this class. The no-arg open method opens a socket channel
for an *Internet protocol* socket. The `open(ProtocolFamily)`
method is used to open a socket channel for a socket of a specified protocol
family. It is not possible to create a channel for an arbitrary, pre-existing
socket. A newly-created socket channel is open but not yet connected.  An
attempt to invoke an I/O operation upon an unconnected channel will cause a
`NotYetConnectedException` to be thrown.  A socket channel can be
connected by invoking its connect method; once connected,
a socket channel remains connected until it is closed.  Whether or not a
socket channel is connected may be determined by invoking its isConnected method.

 Socket channels support *non-blocking connection:* A socket
channel may be created and the process of establishing the link to the
remote socket may be initiated via the connect method for
later completion by the finishConnect method.
Whether or not a connection operation is in progress may be determined by
invoking the isConnectionPending method.

 Socket channels support *asynchronous shutdown*, which is similar
to the asynchronous close operation specified in the `Channel` class.
If the input side of a socket is shut down by one thread while another
thread is blocked in a read operation on the socket's channel, then the read
operation in the blocked thread will complete without reading any bytes and
will return `-1`.  If the output side of a socket is shut down by one
thread while another thread is blocked in a write operation on the socket's
channel, then the blocked thread will receive an `AsynchronousCloseException`.

 Socket options are configured using the setOption method. Socket channels for  *Internet protocol* sockets support
following options:

Socket options

    Option Name
    Description

     SO_SNDBUF
     The size of the socket send buffer

     SO_RCVBUF
     The size of the socket receive buffer

     SO_KEEPALIVE
     Keep connection alive

     SO_REUSEADDR
     Re-use address

     SO_LINGER
     Linger on close if data is present (when configured in blocking mode
         only)

     TCP_NODELAY
     Disable the Nagle algorithm

 Socket channels for *Unix domain* sockets support:

Socket options

    Option Name
    Description

     SO_SNDBUF
     The size of the socket send buffer

     SO_RCVBUF
     The size of the socket receive buffer

     SO_LINGER
     Linger on close if data is present (when configured in blocking mode
         only)

 Additional (implementation specific) options may also be supported.

 Socket channels are safe for use by multiple concurrent threads.  They
support concurrent reading and writing, though at most one thread may be
reading and at most one thread may be writing at any given time.  The connect and finishConnect methods are
mutually synchronized against each other, and an attempt to initiate a read
or write operation while an invocation of one of these methods is in
progress will block until that invocation is complete.

**Since:** 1.4

## SocketChannel.SocketChannel(SelectorProvider)

```java
protected SocketChannel(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## SocketChannel.open()

```java
public static SocketChannel open() throws IOException
```

Opens a socket channel for an *Internet protocol* socket.

 The new channel is created by invoking the openSocketChannel method of the system-wide default `java.nio.channels.spi.SelectorProvider` object.

**Returns:** A new socket channel

**See also:** java.net.preferIPv4Stack system property

Throws:

- `IOException`: If an I/O error occurs

## SocketChannel.open(ProtocolFamily)

```java
public static SocketChannel open(ProtocolFamily family) throws IOException
```

Opens a socket channel. The `family` parameter specifies the
protocol family of the channel's socket.

 The new channel is created by invoking the openSocketChannel(ProtocolFamily) method of the system-wide default.
`java.nio.channels.spi.SelectorProvider` object.

Parameters:

- `family`: The protocol family

**Returns:** A new socket channel

**See also:** java.net.preferIPv4Stack system property

**Since:** 15

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported. For example, suppose the parameter is specified as StandardProtocolFamily.INET6 but IPv6 is not enabled on the platform.
- `IOException`: If an I/O error occurs

## SocketChannel.open(SocketAddress)

```java
public static SocketChannel open(SocketAddress remote) throws IOException
```

Opens a socket channel and connects it to a remote address.

 If the remote address is an `InetSocketAddress` then this
method works as if by invoking the `open()` method, invoking the
connect method upon the resulting socket
channel, passing it `remote`, and then returning that channel.

 If the remote address is a `UnixDomainSocketAddress` then this
works by invoking the `open(ProtocolFamily)` method with `StandardProtocolFamily.UNIX` as parameter, invoking the connect method upon the resulting socket channel,
passing it `remote`, then returning that channel.

Parameters:

- `remote`: The remote address to which the new channel is to be connected

**Returns:** A new, and connected, socket channel

**See also:** java.net.preferIPv4Stack system property

Throws:

- `AsynchronousCloseException`: If another thread closes this channel while the connect operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the connect operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `UnresolvedAddressException`: If the given remote address is an InetSocketAddress that is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `IOException`: If some other I/O error occurs

## SocketChannel.validOps()

```java
public final int validOps()
```

Returns an operation set identifying this channel's supported
operations.

 Socket channels support connecting, reading, and writing, so this
method returns `(``SelectionKey.OP_CONNECT`
`|` `SelectionKey.OP_READ` `|` `SelectionKey.OP_WRITE``)`.

**Returns:** The valid-operation set

## SocketChannel.bind(SocketAddress)

```java
public abstract SocketChannel bind(SocketAddress local) throws IOException
```

Binds the channel's socket to a local address.

 This method is used to establish an association between the socket
and a local address. For *Internet Protocol* sockets, once an
association is established then the socket remains bound until the
channel is closed. If the `local` parameter has the value `null` then the socket will be bound to an address that is assigned
automatically.

Parameters:

- `local`: The address to bind the socket, or `null` to bind the socket to an automatically assigned socket address

**API note:** Binding a socket channel to a *Unix Domain* socket creates a file
corresponding to the file path in the `UnixDomainSocketAddress`. This
file persists after the channel is closed, and must be removed before
another socket can bind to the same name. If a socket channel to a Unix
Domain socket is *implicitly* bound by connecting it without calling
bind first, then its socket is
unnamed
with no corresponding socket file in the file-system. If a socket channel
to a Unix Domain socket is *automatically* bound by calling `bind(null)` this results in an unnamed socket also.

**Implementation note:** Each platform enforces an implementation specific maximum length for the
name of a *Unix Domain* socket. This limitation is enforced when a
channel is bound. The maximum length is typically close to and generally
not less than 100 bytes.

**Returns:** This channel

**Since:** 1.7

Throws:

- `ConnectionPendingException`: If a non-blocking connect operation is already in progress on this channel
- `AlreadyBoundException`: (inherited documentation)
- `UnsupportedAddressTypeException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## SocketChannel.setOption(SocketOption<T>, T)

```java
public abstract <T> SocketChannel setOption(SocketOption<T> name, T value) throws IOException
```

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## SocketChannel.shutdownInput()

```java
public abstract SocketChannel shutdownInput() throws IOException
```

Shutdown the connection for reading without closing the channel.

 Once shutdown for reading then further reads on the channel will
return `-1`, the end-of-stream indication. If the input side of the
connection is already shutdown then invoking this method has no effect.

**Returns:** The channel

**Since:** 1.7

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## SocketChannel.shutdownOutput()

```java
public abstract SocketChannel shutdownOutput() throws IOException
```

Shutdown the connection for writing without closing the channel.

 Once shutdown for writing then further attempts to write to the
channel will throw `ClosedChannelException`. If the output side of
the connection is already shutdown then invoking this method has no
effect.

**Returns:** The channel

**Since:** 1.7

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## SocketChannel.socket()

```java
public abstract Socket socket()
```

Retrieves a socket associated with this channel.

**Returns:** A socket associated with this channel

Throws:

- `UnsupportedOperationException`: If the channel's socket is not an *Internet protocol* socket

## SocketChannel.isConnected()

```java
public abstract boolean isConnected()
```

Tells whether or not this channel's network socket is connected.

**Returns:** `true` if, and only if, this channel's network socket
         is open and connected

## SocketChannel.isConnectionPending()

```java
public abstract boolean isConnectionPending()
```

Tells whether or not a connection operation is in progress on this
channel.

**Returns:** `true` if, and only if, a connection operation has been
         initiated on this channel but not yet completed by invoking the
         finishConnect method

## SocketChannel.connect(SocketAddress)

```java
public abstract boolean connect(SocketAddress remote) throws IOException
```

Connects this channel's socket.

 If this channel is in non-blocking mode then an invocation of this
method initiates a non-blocking connection operation.  If the connection
is established immediately, as can happen with a local connection, then
this method returns `true`.  Otherwise this method returns
`false` and the connection operation must later be completed by
invoking the finishConnect method.

 If this channel is in blocking mode then an invocation of this
method will block until the connection is established or an I/O error
occurs.

 This method may be invoked at any time.  If a read or write
operation upon this channel is invoked while an invocation of this
method is in progress then that operation will first block until this
invocation is complete.  If a connection attempt is initiated but fails,
that is, if an invocation of this method throws a checked exception,
then the channel will be closed.

Parameters:

- `remote`: The remote address to which this channel is to be connected

**Returns:** `true` if a connection was established,
         `false` if this channel is in non-blocking mode
         and the connection operation is in progress

Throws:

- `AlreadyConnectedException`: If this channel is already connected
- `ConnectionPendingException`: If a non-blocking connection operation is already in progress on this channel
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the connect operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the connect operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `UnresolvedAddressException`: If the given remote address is an InetSocketAddress that is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `IOException`: If some other I/O error occurs
