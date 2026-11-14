---
title: "DatagramChannel class (java.nio.channels) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/DatagramChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramChannel class (java.nio.channels) (part 2 of 2)

## DatagramChannel.read(ByteBuffer[])

```java
public final long read(ByteBuffer[] dsts) throws IOException
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

## DatagramChannel.write(ByteBuffer)

```java
public abstract int write(ByteBuffer src) throws IOException
```

Writes a datagram to this channel.

 This method may only be invoked if this channel's socket is
connected, in which case it sends datagrams directly to the socket's
peer.  Otherwise it behaves exactly as specified in the `WritableByteChannel` interface.

Throws:

- `NotYetConnectedException`: If this channel's socket is not connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## DatagramChannel.write(ByteBuffer[], int, int)

```java
public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException
```

Writes a datagram to this channel.

 This method may only be invoked if this channel's socket is
connected, in which case it sends datagrams directly to the socket's
peer.  Otherwise it behaves exactly as specified in the `GatheringByteChannel` interface.

**Returns:** The number of bytes sent, which will be either the number
          of bytes that were remaining in the source buffer when this
          method was invoked or, if this channel is non-blocking, may be
          zero if there was insufficient room for the datagram in the
          underlying output buffer

Throws:

- `NotYetConnectedException`: If this channel's socket is not connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## DatagramChannel.write(ByteBuffer[])

```java
public final long write(ByteBuffer[] srcs) throws IOException
```

Writes a datagram to this channel.

 This method may only be invoked if this channel's socket is
connected, in which case it sends datagrams directly to the socket's
peer.  Otherwise it behaves exactly as specified in the `GatheringByteChannel` interface.

**Returns:** The number of bytes sent, which will be either the number
          of bytes that were remaining in the source buffer when this
          method was invoked or, if this channel is non-blocking, may be
          zero if there was insufficient room for the datagram in the
          underlying output buffer

Throws:

- `NotYetConnectedException`: If this channel's socket is not connected
- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)

## DatagramChannel.getLocalAddress()

```java
public abstract SocketAddress getLocalAddress() throws IOException
```

(inherited documentation)

If the channel's socket was initially bound to the wildcard address and
is now connected, then the address returned
may be the local address selected as the source address for
datagrams sent via this channel instead of the wildcard address.
When `disconnect` is called, the bound address reverts
to the wildcard address.

**Returns:** The `SocketAddress` that the socket is bound to; `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)
