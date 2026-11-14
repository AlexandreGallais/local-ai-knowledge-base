---
title: "AsynchronousServerSocketChannel class (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousServerSocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousServerSocketChannel class (java.nio.channels)

```java
public abstract class AsynchronousServerSocketChannel implements AsynchronousChannel, NetworkChannel
```

An asynchronous channel for stream-oriented listening sockets.

 An asynchronous server-socket channel is created by invoking the
open method of this class.
A newly-created asynchronous server-socket channel is open but not yet bound.
It can be bound to a local address and configured to listen for connections
by invoking the bind method. Once bound,
the accept method
is used to initiate the accepting of connections to the channel's socket.
An attempt to invoke the `accept` method on an unbound channel will
cause a `NotYetBoundException` to be thrown.

 Channels of this type are safe for use by multiple concurrent threads
though at most one accept operation can be outstanding at any time.
If a thread initiates an accept operation before a previous accept operation
has completed then an `AcceptPendingException` will be thrown.

 Socket options are configured using the setOption method. Channels of this type support the following options:

Socket options

    Option Name
    Description

     SO_RCVBUF
     The size of the socket receive buffer

     SO_REUSEADDR
     Re-use address

Additional (implementation specific) options may also be supported.

 **Usage Example:**

**Since:** 1.7

## AsynchronousServerSocketChannel.AsynchronousServerSocketChannel(AsynchronousChannelProvider)

```java
protected AsynchronousServerSocketChannel(AsynchronousChannelProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## AsynchronousServerSocketChannel.provider()

```java
public final AsynchronousChannelProvider provider()
```

Returns the provider that created this channel.

**Returns:** The provider that created this channel

## AsynchronousServerSocketChannel.open(AsynchronousChannelGroup)

```java
public static AsynchronousServerSocketChannel open(AsynchronousChannelGroup group) throws IOException
```

Opens an asynchronous server-socket channel.

 The new channel is created by invoking the openAsynchronousServerSocketChannel method on the `java.nio.channels.spi.AsynchronousChannelProvider` object that created
the given group. If the group parameter is `null` then the
resulting channel is created by the system-wide default provider, and
bound to the *default group*.

Parameters:

- `group`: The group to which the newly constructed channel should be bound, or `null` for the default group

**Returns:** A new asynchronous server socket channel

Throws:

- `ShutdownChannelGroupException`: If the channel group is shutdown
- `IOException`: If an I/O error occurs

## AsynchronousServerSocketChannel.open()

```java
public static AsynchronousServerSocketChannel open() throws IOException
```

Opens an asynchronous server-socket channel.

 This method returns an asynchronous server socket channel that is
bound to the *default group*. This method is equivalent to evaluating
the expression:

**Returns:** A new asynchronous server socket channel

Throws:

- `IOException`: If an I/O error occurs

## AsynchronousServerSocketChannel.bind(SocketAddress)

```java
public final AsynchronousServerSocketChannel bind(SocketAddress local) throws IOException
```

Binds the channel's socket to a local address and configures the socket to
listen for connections.

 An invocation of this method is equivalent to the following:

Parameters:

- `local`: The local address to bind the socket, or `null` to bind to an automatically assigned socket address

**Returns:** This channel

Throws:

- `AlreadyBoundException`: (inherited documentation)
- `UnsupportedAddressTypeException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## AsynchronousServerSocketChannel.bind(SocketAddress, int)

```java
public abstract AsynchronousServerSocketChannel bind(SocketAddress local, int backlog) throws IOException
```

Binds the channel's socket to a local address and configures the socket to
listen for connections.

 This method is used to establish an association between the socket and
a local address. Once an association is established then the socket remains
bound until the associated channel is closed.

 The `backlog` parameter is the maximum number of pending
connections on the socket. Its exact semantics are implementation specific.
In particular, an implementation may impose a maximum length or may choose
to ignore the parameter altogther. If the `backlog` parameter has
the value `0`, or a negative value, then an implementation specific
default is used.

Parameters:

- `local`: The local address to bind the socket, or `null` to bind to an automatically assigned socket address
- `backlog`: The maximum number of pending connections

**Returns:** This channel

Throws:

- `AlreadyBoundException`: If the socket is already bound
- `UnsupportedAddressTypeException`: If the type of the given address is not supported
- `ClosedChannelException`: If the channel is closed
- `IOException`: If some other I/O error occurs

## AsynchronousServerSocketChannel.setOption(SocketOption<T>, T)

```java
public abstract <T> AsynchronousServerSocketChannel setOption(SocketOption<T> name, T value) throws IOException
```

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## AsynchronousServerSocketChannel.accept(A, CompletionHandler<AsynchronousSocketChannel,? super A>)

```java
public abstract <A> void accept(A attachment, CompletionHandler<AsynchronousSocketChannel,? super A> handler)
```

Accepts a connection.

 This method initiates an asynchronous operation to accept a
connection made to this channel's socket. The `handler` parameter is
a completion handler that is invoked when a connection is accepted (or
the operation fails). The result passed to the completion handler is
the `AsynchronousSocketChannel` to the new connection.

 When a new connection is accepted then the resulting `AsynchronousSocketChannel` will be bound to the same `AsynchronousChannelGroup` as this channel. If the group is shutdown and a connection is accepted,
then the connection is closed, and the operation completes with an `IOException` and cause `ShutdownChannelGroupException`.

 To allow for concurrent handling of new connections, the completion
handler is not invoked directly by the initiating thread when a new
connection is accepted immediately (see Threading).

Parameters:

- ``: The type of the attachment
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `AcceptPendingException`: If an accept operation is already in progress on this channel
- `NotYetBoundException`: If this channel's socket has not yet been bound
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousServerSocketChannel.accept()

```java
public abstract Future<AsynchronousSocketChannel> accept()
```

Accepts a connection.

 This method initiates an asynchronous operation to accept a
connection made to this channel's socket. The method behaves in exactly
the same manner as the CompletionHandler) method
except that instead of specifying a completion handler, this method
returns a `Future` representing the pending result. The `Future`'s get method returns the `AsynchronousSocketChannel` to the new connection on successful completion.

**Returns:** a `Future` object representing the pending result

Throws:

- `AcceptPendingException`: If an accept operation is already in progress on this channel
- `NotYetBoundException`: If this channel's socket has not yet been bound

## AsynchronousServerSocketChannel.getLocalAddress()

```java
public abstract SocketAddress getLocalAddress() throws IOException
```

(inherited documentation)

**Returns:** The `SocketAddress` that the socket is bound to; `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)
