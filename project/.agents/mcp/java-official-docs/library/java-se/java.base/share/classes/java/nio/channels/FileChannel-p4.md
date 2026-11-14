---
title: "FileChannel class (java.nio.channels) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/FileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileChannel class (java.nio.channels) (part 4 of 4)

## FileChannel.tryLock()

```java
public final FileLock tryLock() throws IOException
```

Attempts to acquire an exclusive lock on this channel's file.

 An invocation of this method of the form `fc.tryLock()`
behaves in exactly the same way as the invocation

**Returns:** A lock object representing the newly-acquired lock,
         or `null` if the lock could not be acquired
         because another program holds an overlapping lock

**See also:** #lock()

**See also:** #lock(long,long,boolean)

**See also:** #tryLock(long,long,boolean)

Throws:

- `ClosedChannelException`: If this channel is closed
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region
- `NonWritableChannelException`: If this channel was not opened for writing
- `IOException`: If some other I/O error occurs
