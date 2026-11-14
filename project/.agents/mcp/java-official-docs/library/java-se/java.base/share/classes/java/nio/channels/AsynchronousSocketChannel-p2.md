---
title: "AsynchronousSocketChannel class (java.nio.channels) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousSocketChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousSocketChannel class (java.nio.channels) (part 2 of 2)

## AsynchronousSocketChannel.read(ByteBuffer[], int, int, long, TimeUnit, A, CompletionHandler<Long,? super A>)

```java
public abstract <A> void read(ByteBuffer[] dsts, int offset, int length, long timeout, TimeUnit unit, A attachment, CompletionHandler<Long,? super A> handler)
```

Reads a sequence of bytes from this channel into a subsequence of the
given buffers. This operation, sometimes called a *scattering read*,
is often useful when implementing network protocols that group data into
segments consisting of one or more fixed-length headers followed by a
variable-length body. The `handler` parameter is a completion
handler that is invoked when the read operation completes (or fails). The
result passed to the completion handler is the number of bytes read or
`-1` if no bytes could be read because the channel has reached
end-of-stream.

 This method initiates a read of up to *r* bytes from this channel,
where *r* is the total number of bytes remaining in the specified
subsequence of the given buffer array, that is,

at the moment that the read is attempted.

 Suppose that a byte sequence of length *n* is read, where
`0` `<` *n* `<=` *r*.
Up to the first `dsts[offset].remaining()` bytes of this sequence
are transferred into buffer `dsts[offset]`, up to the next
`dsts[offset+1].remaining()` bytes are transferred into buffer
`dsts[offset+1]`, and so forth, until the entire byte sequence
is transferred into the given buffers.  As many bytes as possible are
transferred into each buffer, hence the final position of each updated
buffer, except the last updated buffer, is guaranteed to be equal to
that buffer's limit. The underlying operating system may impose a limit
on the number of buffers that may be used in an I/O operation. Where the
number of buffers (with bytes remaining), exceeds this limit, then the
I/O operation is performed with the maximum number of buffers allowed by
the operating system.

 If a timeout is specified and the timeout elapses before the operation
completes then it completes with the exception `InterruptedByTimeoutException`. Where a timeout occurs, and the
implementation cannot guarantee that bytes have not been read, or will not
be read from the channel into the given buffers, then further attempts to
read from the channel will cause an unspecific runtime exception to be
thrown.

Parameters:

- ``: The type of the attachment
- `dsts`: The buffers into which bytes are to be transferred
- `offset`: The offset within the buffer array of the first buffer into which bytes are to be transferred; must be non-negative and no larger than `dsts.length`
- `length`: The maximum number of buffers to be accessed; must be non-negative and no larger than `dsts.length - offset`
- `timeout`: The maximum time for the I/O operation to complete
- `unit`: The time unit of the `timeout` argument
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `IndexOutOfBoundsException`: If the pre-conditions for the `offset` and `length` parameter aren't met
- `IllegalArgumentException`: If the buffer is read-only
- `ReadPendingException`: If a read operation is already in progress on this channel
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.write(ByteBuffer, long, TimeUnit, A, CompletionHandler<Integer,? super A>)

```java
public abstract <A> void write(ByteBuffer src, long timeout, TimeUnit unit, A attachment, CompletionHandler<Integer,? super A> handler)
```

Writes a sequence of bytes to this channel from the given buffer.

 This method initiates an asynchronous write operation to write a
sequence of bytes to this channel from the given buffer. The `handler` parameter is a completion handler that is invoked when the write
operation completes (or fails). The result passed to the completion
handler is the number of bytes written.

 If a timeout is specified and the timeout elapses before the operation
completes then it completes with the exception `InterruptedByTimeoutException`. Where a timeout occurs, and the
implementation cannot guarantee that bytes have not been written, or will
not be written to the channel from the given buffer, then further attempts
to write to the channel will cause an unspecific runtime exception to be
thrown.

 Otherwise this method works in the same manner as the `AsynchronousByteChannel.write(ByteBuffer,Object,CompletionHandler)`
method.

Parameters:

- ``: The type of the attachment
- `src`: The buffer from which bytes are to be retrieved
- `timeout`: The maximum time for the I/O operation to complete
- `unit`: The time unit of the `timeout` argument
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `WritePendingException`: If a write operation is already in progress on this channel
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.write(ByteBuffer, A, CompletionHandler<Integer,? super A>)

```java
public final <A> void write(ByteBuffer src, A attachment, CompletionHandler<Integer,? super A> handler)
```

Throws:

- `WritePendingException`: (inherited documentation)
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.write(ByteBuffer)

```java
public abstract Future<Integer> write(ByteBuffer src)
```

Throws:

- `WritePendingException`: (inherited documentation)
- `NotYetConnectedException`: If this channel is not yet connected

## AsynchronousSocketChannel.write(ByteBuffer[], int, int, long, TimeUnit, A, CompletionHandler<Long,? super A>)

```java
public abstract <A> void write(ByteBuffer[] srcs, int offset, int length, long timeout, TimeUnit unit, A attachment, CompletionHandler<Long,? super A> handler)
```

Writes a sequence of bytes to this channel from a subsequence of the given
buffers. This operation, sometimes called a *gathering write*, is
often useful when implementing network protocols that group data into
segments consisting of one or more fixed-length headers followed by a
variable-length body. The `handler` parameter is a completion
handler that is invoked when the write operation completes (or fails).
The result passed to the completion handler is the number of bytes written.

 This method initiates a write of up to *r* bytes to this channel,
where *r* is the total number of bytes remaining in the specified
subsequence of the given buffer array, that is,

at the moment that the write is attempted.

 Suppose that a byte sequence of length *n* is written, where
`0` `<` *n* `<=` *r*.
Up to the first `srcs[offset].remaining()` bytes of this sequence
are written from buffer `srcs[offset]`, up to the next
`srcs[offset+1].remaining()` bytes are written from buffer
`srcs[offset+1]`, and so forth, until the entire byte sequence is
written.  As many bytes as possible are written from each buffer, hence
the final position of each updated buffer, except the last updated
buffer, is guaranteed to be equal to that buffer's limit. The underlying
operating system may impose a limit on the number of buffers that may be
used in an I/O operation. Where the number of buffers (with bytes
remaining), exceeds this limit, then the I/O operation is performed with
the maximum number of buffers allowed by the operating system.

 If a timeout is specified and the timeout elapses before the operation
completes then it completes with the exception `InterruptedByTimeoutException`. Where a timeout occurs, and the
implementation cannot guarantee that bytes have not been written, or will
not be written to the channel from the given buffers, then further attempts
to write to the channel will cause an unspecific runtime exception to be
thrown.

Parameters:

- ``: The type of the attachment
- `srcs`: The buffers from which bytes are to be retrieved
- `offset`: The offset within the buffer array of the first buffer from which bytes are to be retrieved; must be non-negative and no larger than `srcs.length`
- `length`: The maximum number of buffers to be accessed; must be non-negative and no larger than `srcs.length - offset`
- `timeout`: The maximum time for the I/O operation to complete
- `unit`: The time unit of the `timeout` argument
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `IndexOutOfBoundsException`: If the pre-conditions for the `offset` and `length` parameter aren't met
- `WritePendingException`: If a write operation is already in progress on this channel
- `NotYetConnectedException`: If this channel is not yet connected
- `ShutdownChannelGroupException`: If the channel group has terminated

## AsynchronousSocketChannel.getLocalAddress()

```java
public abstract SocketAddress getLocalAddress() throws IOException
```

(inherited documentation)

**Returns:** The `SocketAddress` that the socket is bound to; `null`
         if the channel's socket is not bound

Throws:

- `ClosedChannelException`: (inherited documentation)
- `IOException`: (inherited documentation)
