---
title: "FileChannel class (java.nio.channels) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/FileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileChannel class (java.nio.channels) (part 2 of 4)

## FileChannel.write(ByteBuffer[])

```java
public final long write(ByteBuffer[] srcs) throws IOException
```

Writes a sequence of bytes to this channel from the given buffers.

 Bytes are written starting at this channel's current file position
unless the channel is in append mode, in which case the position is
first advanced to the end of the file.  The file is grown, if necessary,
to accommodate the written bytes, and then the file position is updated
with the number of bytes actually written.  Otherwise this method
behaves exactly as specified in the `GatheringByteChannel`
interface.

Throws:

- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
- `NonWritableChannelException`: (inherited documentation)

## FileChannel.position()

```java
public abstract long position() throws IOException
```

Returns this channel's file position.

**Returns:** This channel's file position,
         a non-negative integer counting the number of bytes
         from the beginning of the file to the current position

Throws:

- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## FileChannel.position(long)

```java
public abstract FileChannel position(long newPosition) throws IOException
```

Sets this channel's file position.

 Setting the position to a value that is greater than the file's
current size is legal but does not change the size of the file.  A later
attempt to read bytes at such a position will immediately return an
end-of-file indication.  A later attempt to write bytes at such a
position will cause the file to be grown to accommodate the new bytes;
the values of any bytes between the previous end-of-file and the
newly-written bytes are unspecified.

Parameters:

- `newPosition`: The new position, a non-negative integer counting the number of bytes from the beginning of the file

**Returns:** This file channel

Throws:

- `ClosedChannelException`: If this channel is closed
- `IllegalArgumentException`: If the new position is negative
- `IOException`: If some other I/O error occurs

## FileChannel.size()

```java
public abstract long size() throws IOException
```

Returns the current size of this channel's file.

**Returns:** The current size of this channel's file,
         measured in bytes

Throws:

- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## FileChannel.truncate(long)

```java
public abstract FileChannel truncate(long size) throws IOException
```

Truncates this channel's file to the given size.

 If the given size is less than the file's current size then the file
is truncated, discarding any bytes beyond the new end of the file.  If
the given size is greater than or equal to the file's current size then
the file is not modified.  In either case, if this channel's file
position is greater than the given size then it is set to that size.

Parameters:

- `size`: The new size, a non-negative byte count

**Returns:** This file channel

Throws:

- `NonWritableChannelException`: If this channel was not opened for writing
- `ClosedChannelException`: If this channel is closed
- `IllegalArgumentException`: If the new size is negative
- `IOException`: If some other I/O error occurs

## FileChannel.force(boolean)

```java
public abstract void force(boolean metaData) throws IOException
```

Forces any updates to this channel's file to be written to the storage
device that contains it.

 If this channel's file resides on a local storage device then when
this method returns it is guaranteed that all changes made to the file
since this channel was created, or since this method was last invoked,
will have been written to that device.  This is useful for ensuring that
critical information is not lost in the event of a system crash.

 If the file does not reside on a local device then no such guarantee
is made.

 The `metaData` parameter can be used to limit the number of
I/O operations that this method is required to perform.  Passing
`false` for this parameter indicates that only updates to the
file's content need be written to storage; passing `true`
indicates that updates to both the file's content and metadata must be
written, which generally requires at least one more I/O operation.
Whether this parameter actually has any effect is dependent upon the
underlying operating system and is therefore unspecified.

 Invoking this method may cause an I/O operation to occur even if the
channel was only opened for reading.  Some operating systems, for
example, maintain a last-access time as part of a file's metadata, and
this time is updated whenever the file is read.  Whether or not this is
actually done is system-dependent and is therefore unspecified.

 This method is only guaranteed to force changes that were made to
this channel's file via the methods defined in this class, or the methods
defined by `java.io.FileOutputStream` or
`java.io.RandomAccessFile` when the channel was obtained with the
`getChannel` method. It may or may not force changes that were made
by modifying the content of a
*mapped byte buffer* obtained by
invoking the map method.  Invoking the force method of the mapped byte buffer will
force changes made to the buffer's content to be written.

Parameters:

- `metaData`: If `true` then this method is required to force changes to both the file's content and metadata to be written to storage; otherwise, it need only force content changes to be written

Throws:

- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## FileChannel.transferTo(long, long, WritableByteChannel)

```java
public abstract long transferTo(long position, long count, WritableByteChannel target) throws IOException
```

Transfers bytes from this channel's file to the given writable byte
channel.

 An attempt is made to read up to `count` bytes starting at
the given `position` in this channel's file and write them to the
target channel.  An invocation of this method may or may not transfer
all of the requested bytes; whether or not it does so depends upon the
natures and states of the channels.  Fewer than the requested number of
bytes are transferred if this channel's file contains fewer than
`count` bytes starting at the given `position`, or if the
target channel is non-blocking and it has fewer than `count`
bytes free in its output buffer.

 This method does not modify this channel's position.  If the given
position is greater than or equal to the file's current size then no
bytes are transferred.  If the target channel has a position then bytes
are written starting at that position and then the position
is incremented by the number of bytes written.

 This method is potentially much more efficient than a simple loop
that reads from this channel and writes to the target channel.  Many
operating systems can transfer bytes directly from the filesystem cache
to the target channel without actually copying them.

Parameters:

- `position`: The position within the file at which the transfer is to begin; must be non-negative
- `count`: The maximum number of bytes to be transferred; must be non-negative
- `target`: The target channel

**Returns:** The number of bytes, possibly zero,
         that were actually transferred

Throws:

- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `NonReadableChannelException`: If this channel was not opened for reading
- `NonWritableChannelException`: If the target channel was not opened for writing
- `ClosedChannelException`: If either this channel or the target channel is closed
- `AsynchronousCloseException`: If another thread closes either channel while the transfer is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the transfer is in progress, thereby closing both channels and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## FileChannel.transferFrom(ReadableByteChannel, long, long)

```java
public abstract long transferFrom(ReadableByteChannel src, long position, long count) throws IOException
```

Transfers bytes into this channel's file from the given readable byte
channel.

 An attempt is made to read up to `count` bytes from the
source channel and write them to this channel's file starting at the
given `position`.  An invocation of this method may or may not
transfer all of the requested bytes; whether or not it does so depends
upon the natures and states of the channels.  Fewer than the requested
number of bytes will be transferred if the source channel has fewer than
`count` bytes remaining, or if the source channel is non-blocking
and has fewer than `count` bytes immediately available in its
input buffer. No bytes are transferred, and zero is returned, if the
source has reached end-of-stream.

 This method does not modify this channel's position.  If the given
position is greater than or equal to the file's current size then the
file will be grown to accommodate the new bytes; the values of any bytes
between the previous end-of-file and the newly-written bytes are
unspecified.  If the source channel has a position then bytes are read
starting at that position and then the position is incremented by the
number of bytes read.

 This method is potentially much more efficient than a simple loop
that reads from the source channel and writes to this channel.  Many
operating systems can transfer bytes directly from the source channel
into the filesystem cache without actually copying them.

Parameters:

- `src`: The source channel
- `position`: The file position at which the transfer is to begin; must be non-negative
- `count`: The maximum number of bytes to be transferred; must be non-negative

**Returns:** The number of bytes, possibly zero,
         that were actually transferred

Throws:

- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `NonReadableChannelException`: If the source channel was not opened for reading
- `NonWritableChannelException`: If this channel was not opened for writing
- `ClosedChannelException`: If either this channel or the source channel is closed
- `AsynchronousCloseException`: If another thread closes either channel while the transfer is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the transfer is in progress, thereby closing both channels and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## FileChannel.read(ByteBuffer, long)

```java
public abstract int read(ByteBuffer dst, long position) throws IOException
```

Reads a sequence of bytes from this channel into the given buffer,
starting at the given file position.

 This method works in the same manner as the `read(ByteBuffer)` method, except that bytes are read starting at the
given file position rather than at the channel's current position.  This
method does not modify this channel's position.  If the given position
is greater than or equal to the file's current size then no bytes are
read.

Parameters:

- `dst`: The buffer into which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative

**Returns:** The number of bytes read, possibly zero, or `-1` if the
         given position is greater than or equal to the file's current
         size

Throws:

- `IllegalArgumentException`: If the position is negative or the buffer is read-only
- `NonReadableChannelException`: If this channel was not opened for reading
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the read operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the read operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## FileChannel.write(ByteBuffer, long)

```java
public abstract int write(ByteBuffer src, long position) throws IOException
```

Writes a sequence of bytes to this channel from the given buffer,
starting at the given file position.

 This method works in the same manner as the `write(ByteBuffer)` method, except that bytes are written starting at
the given file position rather than at the channel's current position.
This method does not modify this channel's position.  If the given
position is greater than or equal to the file's current size then the
file will be grown to accommodate the new bytes; the values of any bytes
between the previous end-of-file and the newly-written bytes are
unspecified.

 If the file is open in append mode, then
the effect of invoking this method is unspecified.

Parameters:

- `src`: The buffer from which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative

**Returns:** The number of bytes written, possibly zero

Throws:

- `IllegalArgumentException`: If the position is negative
- `NonWritableChannelException`: If this channel was not opened for writing
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the write operation is in progress
- `ClosedByInterruptException`: If another thread interrupts the current thread while the write operation is in progress, thereby closing the channel and setting the current thread's interrupt status
- `IOException`: If some other I/O error occurs

## FileChannel.READ_ONLY

```java
public static final MapMode READ_ONLY
```

Mode for a read-only mapping.

## FileChannel.READ_WRITE

```java
public static final MapMode READ_WRITE
```

Mode for a read/write mapping.

## FileChannel.PRIVATE

```java
public static final MapMode PRIVATE
```

Mode for a private (copy-on-write) mapping.

## FileChannel.toString()

```java
public String toString()
```

Returns a string describing this file-mapping mode.

**Returns:** A descriptive string
