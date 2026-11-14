---
title: "ScatteringByteChannel interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/ScatteringByteChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ScatteringByteChannel interface (java.nio.channels)

```java
public interface ScatteringByteChannel extends ReadableByteChannel
```

A channel that can read bytes into a sequence of buffers.

 A *scattering* read operation reads, in a single invocation, a
sequence of bytes into one or more of a given sequence of buffers.
Scattering reads are often useful when implementing network protocols or
file formats that, for example, group data into segments consisting of one
or more fixed-length headers followed by a variable-length body.  Similar
*gathering* write operations are defined in the `GatheringByteChannel` interface.

**Since:** 1.4

## ScatteringByteChannel.read(ByteBuffer[], int, int)

```java
public long read(ByteBuffer[] dsts, int offset, int length) throws IOException
```

Reads a sequence of bytes from this channel into a subsequence of the
given buffers.

 An invocation of this method attempts to read up to *r* bytes
from this channel, where *r* is the total number of bytes remaining
in the specified subsequence of the given buffer array, that is,

at the moment that this method is invoked.

 Suppose that a byte sequence of length *n* is read, where
`0` `<=` *n* `<=` *r*.
Up to the first `dsts[offset].remaining()` bytes of this sequence
are transferred into buffer `dsts[offset]`, up to the next
`dsts[offset+1].remaining()` bytes are transferred into buffer
`dsts[offset+1]`, and so forth, until the entire byte sequence
is transferred into the given buffers.  As many bytes as possible are
transferred into each buffer, hence the final position of each updated
buffer, except the last updated buffer, is guaranteed to be equal to
that buffer's limit.

 This method may be invoked at any time.  If another thread has
already initiated a read operation upon this channel, however, then an
invocation of this method will block until the first operation is
complete.

Parameters:

- `dsts`: The buffers into which bytes are to be transferred
- `offset`: The offset within the buffer array of the first buffer into which bytes are to be transferred; must be non-negative and no larger than `dsts.length`
- `length`: The maximum number of buffers to be accessed; must be non-negative and no larger than `dsts.length` - `offset`

**Returns:** The number of bytes read, possibly zero,
        or `-1` if the channel has reached end-of-stream

Throws:

- `IndexOutOfBoundsException`: If the preconditions on the `offset` and `length` parameters do not hold
- `IllegalArgumentException`: If any of the buffers is read-only
- `NonReadableChannelException`: If this channel was not opened for reading
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the read operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the read operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## ScatteringByteChannel.read(ByteBuffer[])

```java
public long read(ByteBuffer[] dsts) throws IOException
```

Reads a sequence of bytes from this channel into the given buffers.

 An invocation of this method of the form `c.read(dsts)`
behaves in exactly the same manner as the invocation

Parameters:

- `dsts`: The buffers into which bytes are to be transferred

**Returns:** The number of bytes read, possibly zero,
        or `-1` if the channel has reached end-of-stream

Throws:

- `IllegalArgumentException`: If any of the buffers is read-only
- `NonReadableChannelException`: If this channel was not opened for reading
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the read operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the read operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs
