---
title: "SocketChannel class (java.nio.channels) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/SocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SocketChannel class (java.nio.channels) (part 2 of 2)

## SocketChannel.finishConnect()

```java
public abstract boolean finishConnect() throws IOException
```

Finishes the process of connecting a socket channel.

 A non-blocking connection operation is initiated by placing a socket
channel in non-blocking mode and then invoking its connect method.  Once the connection is established, or the attempt has
failed, the socket channel will become connectable and this method may
be invoked to complete the connection sequence.  If the connection
operation failed then invoking this method will cause an appropriate
`java.io.IOException` to be thrown.

 If this channel is already connected then this method will not block
and will immediately return `true`.  If this channel is in
non-blocking mode then this method will return `false` if the
connection process is not yet complete.  If this channel is in blocking
mode then this method will block until the connection either completes
or fails, and will always either return `true` or throw a checked
exception describing the failure.

 This method may be invoked at any time.  If a read or write
operation upon this channel is invoked while an invocation of this
method is in progress then that operation will first block until this
invocation is complete.  If a connection attempt fails, that is, if an
invocation of this method throws a checked exception, then the channel
will be closed.

**Returns:** `true` if, and only if, this channel's socket is now
         connected

Throws:

- `NoConnectionPendingException`: If this channel is not connected and a connection operation has not been initiated
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the connect operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the connect operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## SocketChannel.getRemoteAddress()

```java
public abstract SocketAddress getRemoteAddress() throws IOException
```

Returns the remote address to which this channel's socket is connected.

 Where the channel's socket is bound and connected to an *Internet
Protocol* socket address then the return value is of type
`java.net.InetSocketAddress`.

 Where the channel's socket is bound and connected to a *Unix Domain*
socket address, the returned address is a `UnixDomainSocketAddress`.

**Returns:** The remote address; `null` if the channel's socket is not
         connected

**Since:** 1.7

Throws:

- `ClosedChannelException`: If the channel is closed
- `IOException`: If an I/O error occurs

## SocketChannel.read(ByteBuffer)

```java
public abstract int read(ByteBuffer dst) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.read(ByteBuffer[], int, int)

```java
public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.read(ByteBuffer[])

```java
public final long read(ByteBuffer[] dsts) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.write(ByteBuffer)

```java
public abstract int write(ByteBuffer src) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.write(ByteBuffer[], int, int)

```java
public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.write(ByteBuffer[])

```java
public final long write(ByteBuffer[] srcs) throws IOException
```

Throws:

- `NotYetConnectedException`: If this channel is not yet connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## SocketChannel.getLocalAddress()

```java
public abstract SocketAddress getLocalAddress() throws IOException
```

(inherited documentation)

 Where the channel is bound to a Unix Domain socket address, the socket
address is a `UnixDomainSocketAddress`.

**Returns:** The `SocketAddress` that the socket is bound to; `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)
