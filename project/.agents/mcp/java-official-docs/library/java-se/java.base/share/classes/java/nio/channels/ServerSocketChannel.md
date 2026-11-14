---
title: "ServerSocketChannel class (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/ServerSocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ServerSocketChannel class (java.nio.channels)

```java
public abstract class ServerSocketChannel extends AbstractSelectableChannel implements NetworkChannel
```

A selectable channel for stream-oriented listening sockets.

 A server-socket channel is created by invoking one of the `open`
methods of this class. The no-arg open method opens a server-socket
channel for an *Internet protocol* socket. The `open(ProtocolFamily)`
method is used to open a server-socket channel for a socket of a specified
protocol family. It is not possible to create a channel for an arbitrary,
pre-existing socket. A newly-created server-socket channel is open but not yet
bound. An attempt to invoke the accept method of an
unbound server-socket channel will cause a `NotYetBoundException`
to be thrown. A server-socket channel can be bound by invoking one of the
int) bind methods defined by this class.

 Socket options are configured using the setOption method. Server-socket channels for *Internet protocol* sockets
support the following options:

Socket options

    Option Name
    Description

     SO_RCVBUF
     The size of the socket receive buffer

     SO_REUSEADDR
     Re-use address

 Server-socket channels for *Unix domain* sockets support:

Socket options

    Option Name
    Description

     SO_RCVBUF
     The size of the socket receive buffer

 Additional (implementation specific) options may also be supported.

 Server-socket channels are safe for use by multiple concurrent threads.

**Since:** 1.4

## ServerSocketChannel.ServerSocketChannel(SelectorProvider)

```java
protected ServerSocketChannel(SelectorProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## ServerSocketChannel.open()

```java
public static ServerSocketChannel open() throws IOException
```

Opens a server-socket channel for an *Internet protocol* socket.

 The new channel is created by invoking the openServerSocketChannel method of the system-wide default `java.nio.channels.spi.SelectorProvider` object.

 The new channel's socket is initially unbound; it must be bound to a
specific address via one of its socket's bind methods before
connections can be accepted.

**Returns:** A new socket channel

**See also:** java.net.preferIPv4Stack system property

Throws:

- `IOException`: If an I/O error occurs

## ServerSocketChannel.open(ProtocolFamily)

```java
public static ServerSocketChannel open(ProtocolFamily family) throws IOException
```

Opens a server-socket channel. The `family` parameter specifies the
protocol family of the channel's socket.

 The new channel is created by invoking the openServerSocketChannel(ProtocolFamily) method of the system-wide default `java.nio.channels.spi.SelectorProvider` object.

Parameters:

- `family`: The protocol family

**Returns:** A new socket channel

**See also:** java.net.preferIPv4Stack system property

**Since:** 15

Throws:

- `UnsupportedOperationException`: If the specified protocol family is not supported. For example, suppose the parameter is specified as StandardProtocolFamily.INET6 but IPv6 is not enabled on the platform.
- `IOException`: If an I/O error occurs

## ServerSocketChannel.validOps()

```java
public final int validOps()
```

Returns an operation set identifying this channel's supported
operations.

 Server-socket channels only support the accepting of new
connections, so this method returns `SelectionKey.OP_ACCEPT`.

**Returns:** The valid-operation set

## ServerSocketChannel.bind(SocketAddress)

```java
public final ServerSocketChannel bind(SocketAddress local) throws IOException
```

Binds the channel's socket to a local address and configures the socket
to listen for connections.

 An invocation of this method is equivalent to the following:

Parameters:

- `local`: The local address to bind the socket, or `null` to bind to an automatically assigned socket address

**Returns:** This channel

**Since:** 1.7

Throws:

- `AlreadyBoundException`: (inherited documentation)
- `UnsupportedAddressTypeException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## ServerSocketChannel.bind(SocketAddress, int)

```java
public abstract ServerSocketChannel bind(SocketAddress local, int backlog) throws IOException
```

Binds the channel's socket to a local address and configures the socket to
listen for connections.

 This method is used to establish an association between the socket and
a local address. For *Internet protocol* sockets, once an association
is established then the socket remains bound until the channel is closed.

 The `backlog` parameter is the maximum number of pending
connections on the socket. Its exact semantics are implementation specific.
In particular, an implementation may impose a maximum length or may choose
to ignore the parameter altogether. If the `backlog` parameter has
the value `0`, or a negative value, then an implementation specific
default is used.

Parameters:

- `local`: The address to bind the socket, or `null` to bind to an automatically assigned socket address
- `backlog`: The maximum number of pending connections

**API note:** Binding a server socket channel for a *Unix Domain* socket, creates a
file corresponding to the file path in the `UnixDomainSocketAddress`.
This file persists after the channel is closed, and must be removed before
another socket can bind to the same name. Binding to a `null` address
causes the socket to be *automatically* bound to some unique file
in a system temporary location. The associated socket file also persists
after the channel is closed. Its name can be obtained from the channel's
local socket address.

**Implementation note:** Each platform enforces an implementation specific, maximum length for the
name of a *Unix Domain* socket. This limitation is enforced when a
channel is bound. The maximum length is typically close to and generally
not less than 100 bytes. This limitation also applies to *automatically*
bound server socket channels. See the *Unix domain*
networking
properties that can be used to select the temporary directory where
these sockets are created.

**Returns:** This channel

**Since:** 1.7

Throws:

- `AlreadyBoundException`: If the socket is already bound
- `UnsupportedAddressTypeException`: If the type of the given address is not supported
- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## ServerSocketChannel.setOption(SocketOption<T>, T)

```java
public abstract <T> ServerSocketChannel setOption(SocketOption<T> name, T value) throws IOException
```

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## ServerSocketChannel.socket()

```java
public abstract ServerSocket socket()
```

Retrieves a server socket associated with this channel.

 The returned object will not declare any public methods that are not
declared in the `java.net.ServerSocket` class.

**Returns:** A server socket associated with this channel

Throws:

- `UnsupportedOperationException`: If the channel's socket is not an *Internet protocol* socket

## ServerSocketChannel.accept()

```java
public abstract SocketChannel accept() throws IOException
```

Accepts a connection made to this channel's socket.

 If this channel is in non-blocking mode then this method will
immediately return `null` if there are no pending connections.
Otherwise it will block indefinitely until a new connection is available
or an I/O error occurs.

 The socket channel returned by this method, if any, will be in
blocking mode regardless of the blocking mode of this channel.

**Returns:** The socket channel for the new connection,
         or `null` if this channel is in non-blocking mode
         and no connection is available to be accepted

Throws:

- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the accept operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the accept operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `NotYetBoundException`: If this channel's socket has not yet been bound
- `IOException`: If some other I/O error occurs

## ServerSocketChannel.getLocalAddress()

```java
public abstract SocketAddress getLocalAddress() throws IOException
```

(inherited documentation)

 Where the channel is bound to a *Unix Domain* socket address, the socket
address is a `UnixDomainSocketAddress`.

**Returns:** The `SocketAddress` that the socket is bound to or `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)
