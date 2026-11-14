---
title: "AsynchronousSocketChannel class (java.nio.channels) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousSocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousSocketChannel class (java.nio.channels)

```java
public abstract class AsynchronousSocketChannel implements AsynchronousByteChannel, NetworkChannel
```

An asynchronous channel for stream-oriented connecting sockets.

 Asynchronous socket channels are created in one of two ways. A newly-created
`AsynchronousSocketChannel` is created by invoking one of the open methods defined by this class. A newly-created channel is open but
not yet connected. A connected `AsynchronousSocketChannel` is created
when a connection is made to the socket of an `AsynchronousServerSocketChannel`.
It is not possible to create an asynchronous socket channel for an arbitrary,
pre-existing socket.

 A newly-created channel is connected by invoking its connect
method; once connected, a channel remains connected until it is closed.  Whether
or not a socket channel is connected may be determined by invoking its getRemoteAddress method. An attempt to invoke an I/O
operation upon an unconnected channel will cause a `NotYetConnectedException`
to be thrown.

 Channels of this type are safe for use by multiple concurrent threads.
They support concurrent reading and writing, though at most one read operation
and one write operation can be outstanding at any time.
If a thread initiates a read operation before a previous read operation has
completed then a `ReadPendingException` will be thrown. Similarly, an
attempt to initiate a write operation before a previous write has completed
will throw a `WritePendingException`.

 Socket options are configured using the setOption method. Asynchronous socket channels support the following options:

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

     TCP_NODELAY
     Disable the Nagle algorithm

Additional (implementation specific) options may also be supported.

#### Timeouts

 The read
and write
methods defined by this class allow a timeout to be specified when initiating
a read or write operation. If the timeout elapses before an operation completes
then the operation completes with the exception `InterruptedByTimeoutException`. A timeout may leave the channel, or the
underlying connection, in an inconsistent state. Where the implementation
cannot guarantee that bytes have not been read from the channel then it puts
the channel into an implementation specific *error state*. A subsequent
attempt to initiate a `read` operation causes an unspecified runtime
exception to be thrown. Similarly if a `write` operation times out and
the implementation cannot guarantee bytes have not been written to the
channel then further attempts to `write` to the channel cause an
unspecified runtime exception to be thrown. When a timeout elapses then the
state of the `ByteBuffer`, or the sequence of buffers, for the I/O
operation is not defined. Buffers should be discarded or at least care must
be taken to ensure that the buffers are not accessed while the channel remains
open. All methods that accept timeout parameters treat values less than or
equal to zero to mean that the I/O operation does not timeout.

**Since:** 1.7

## AsynchronousSocketChannel.AsynchronousSocketChannel(AsynchronousChannelProvider)

```java
protected AsynchronousSocketChannel(AsynchronousChannelProvider provider)
```

Initializes a new instance of this class.

Parameters:

- `provider`: The provider that created this channel

## AsynchronousSocketChannel.provider()

```java
public final AsynchronousChannelProvider provider()
```

Returns the provider that created this channel.

**Returns:** The provider that created this channel

## AsynchronousSocketChannel.open(AsynchronousChannelGroup)

```java
public static AsynchronousSocketChannel open(AsynchronousChannelGroup group) throws IOException
```

Opens an asynchronous socket channel.

 The new channel is created by invoking the openAsynchronousSocketChannel method on the `AsynchronousChannelProvider` that created the group. If the group parameter
is `null` then the resulting channel is created by the system-wide
default provider, and bound to the *default group*.

Parameters:

- `group`: The group to which the newly constructed channel should be bound, or `null` for the default group

**Returns:** A new asynchronous socket channel

Throws:

- `ShutdownChannelGroupException`: If the channel group is shutdown
- `IOException`: If an I/O error occurs

## AsynchronousSocketChannel.open()

```java
public static AsynchronousSocketChannel open() throws IOException
```

Opens an asynchronous socket channel.

 This method returns an asynchronous socket channel that is bound to
the *default group*.This method is equivalent to evaluating the
expression:

**Returns:** A new asynchronous socket channel

Throws:

- `IOException`: If an I/O error occurs

## AsynchronousSocketChannel.bind(SocketAddress)

```java
public abstract AsynchronousSocketChannel bind(SocketAddress local) throws IOException
```

Throws:

- `ConnectionPendingException`: If a connection operation is already in progress on this channel
- `AlreadyBoundException`: (inherited documentation)
- `UnsupportedAddressTypeException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## AsynchronousSocketChannel.setOption(SocketOption<T>, T)

```java
public abstract <T> AsynchronousSocketChannel setOption(SocketOption<T> name, T value) throws IOException
```

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)

## AsynchronousSocketChannel.shutdownInput()

```java
public abstract AsynchronousSocketChannel shutdownInput() throws IOException
```

Shutdown the connection for reading without closing the channel.

 Once shutdown for reading then further reads on the channel will
return `-1`, the end-of-stream indication. If the input side of the
connection is already shutdown then invoking this method has no effect.
The effect on an outstanding read operation is system dependent and
therefore not specified. The effect, if any, when there is data in the
socket receive buffer that has not been read, or data arrives subsequently,
is also system dependent.

**Returns:** The channel

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## AsynchronousSocketChannel.shutdownOutput()

```java
public abstract AsynchronousSocketChannel shutdownOutput() throws IOException
```

Shutdown the connection for writing without closing the channel.

 Once shutdown for writing then further attempts to write to the
channel will throw `ClosedChannelException`. If the output side of
the connection is already shutdown then invoking this method has no
effect. The effect on an outstanding write operation is system dependent
and therefore not specified.

**Returns:** The channel

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## AsynchronousSocketChannel.getRemoteAddress()

```java
public abstract SocketAddress getRemoteAddress() throws IOException
```

Returns the remote address to which this channel's socket is connected.

 Where the channel is bound and connected to an Internet Protocol
socket address then the return value from this method is of type `java.net.InetSocketAddress`.

**Returns:** The remote address; `null` if the channel's socket is not
         connected

Throws:

- `ClosedChannelException`: If the channel is closed
- `IOException`: If an I/O error occurs

## AsynchronousSocketChannel.connect(SocketAddress, A, CompletionHandler<Void,? super A>)

```java
public abstract <A> void connect(SocketAddress remote, A attachment, CompletionHandler<Void,? super A> handler)
```

Connects this channel.

 This method initiates an operation to connect this channel. The
`handler` parameter is a completion handler that is invoked when
the connection is successfully established or connection cannot be
established. If the connection cannot be established then the channel is
closed.

Parameters:

- ``: The type of the attachment
- `remote`: The remote address to which this channel is to be connected
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

**See also:** #getRemoteAddress

Throws:

- `UnresolvedAddressException`: If the given remote address is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `AlreadyConnectedException`: If this channel is already connected
- `ConnectionPendingException`: If a connection operation is already in progress on this channel
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.connect(SocketAddress)

```java
public abstract Future<Void> connect(SocketAddress remote)
```

Connects this channel.

 This method initiates an operation to connect this channel. This
method behaves in exactly the same manner as the Object, CompletionHandler) method except that
instead of specifying a completion handler, this method returns a `Future` representing the pending result. The `Future`'s get method returns `null` on successful completion.

Parameters:

- `remote`: The remote address to which this channel is to be connected

**Returns:** A `Future` object representing the pending result

Throws:

- `UnresolvedAddressException`: If the given remote address is not fully resolved
- `UnsupportedAddressTypeException`: If the type of the given remote address is not supported
- `AlreadyConnectedException`: If this channel is already connected
- `ConnectionPendingException`: If a connection operation is already in progress on this channel

## AsynchronousSocketChannel.read(ByteBuffer, long, TimeUnit, A, CompletionHandler<Integer,? super A>)

```java
public abstract <A> void read(ByteBuffer dst, long timeout, TimeUnit unit, A attachment, CompletionHandler<Integer,? super A> handler)
```

Reads a sequence of bytes from this channel into the given buffer.

 This method initiates an asynchronous read operation to read a
sequence of bytes from this channel into the given buffer. The `handler` parameter is a completion handler that is invoked when the read
operation completes (or fails). The result passed to the completion
handler is the number of bytes read or `-1` if no bytes could be
read because the channel has reached end-of-stream.

 If a timeout is specified and the timeout elapses before the operation
completes then the operation completes with the exception `InterruptedByTimeoutException`. Where a timeout occurs, and the
implementation cannot guarantee that bytes have not been read, or will not
be read from the channel into the given buffer, then further attempts to
read from the channel will cause an unspecific runtime exception to be
thrown.

 Otherwise this method works in the same manner as the `AsynchronousByteChannel.read(ByteBuffer,Object,CompletionHandler)`
method.

Parameters:

- ``: The type of the attachment
- `dst`: The buffer into which bytes are to be transferred
- `timeout`: The maximum time for the I/O operation to complete
- `unit`: The time unit of the `timeout` argument
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `IllegalArgumentException`: If the buffer is read-only
- `ReadPendingException`: If a read operation is already in progress on this channel
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.read(ByteBuffer, A, CompletionHandler<Integer,? super A>)

```java
public final <A> void read(ByteBuffer dst, A attachment, CompletionHandler<Integer,? super A> handler)
```

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `ReadPendingException`: (inherited documentation)
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.read(ByteBuffer)

```java
public abstract Future<Integer> read(ByteBuffer dst)
```

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `ReadPendingException`: (inherited documentation)
- `NotYetConnectedException`: If this channel is not yet connected
