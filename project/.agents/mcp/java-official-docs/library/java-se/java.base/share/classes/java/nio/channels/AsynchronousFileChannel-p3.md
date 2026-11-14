---
title: "AsynchronousFileChannel class (java.nio.channels) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousFileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousFileChannel class (java.nio.channels) (part 3 of 3)

## AsynchronousFileChannel.write(ByteBuffer, long)

```java
public abstract Future<Integer> write(ByteBuffer src, long position)
```

Writes a sequence of bytes to this channel from the given buffer, starting
at the given file position.

 This method initiates the writing of a sequence of bytes to this
channel from the given buffer, starting at the given file position. The
method returns a `Future` representing the pending result of the
write operation. The `Future`'s get method
returns the number of bytes written.

 This method works in the same manner as the `AsynchronousByteChannel.write(ByteBuffer)` method, except that bytes are
written starting at the given file position. If the given position is
greater than the file's size, at the time that the write is attempted,
then the file will be grown to accommodate the new bytes; the values of
any bytes between the previous end-of-file and the newly-written bytes
are unspecified.

Parameters:

- `src`: The buffer from which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative

**Returns:** A `Future` object representing the pending result

Throws:

- `IllegalArgumentException`: If the position is negative
- `NonWritableChannelException`: If this channel was not opened for writing
