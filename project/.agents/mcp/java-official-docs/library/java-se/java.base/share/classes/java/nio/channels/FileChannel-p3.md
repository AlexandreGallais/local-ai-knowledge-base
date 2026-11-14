---
title: "FileChannel class (java.nio.channels) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/FileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileChannel class (java.nio.channels) (part 3 of 4)

## FileChannel.map(MapMode, long, long)

```java
public abstract MappedByteBuffer map(MapMode mode, long position, long size) throws IOException
```

Maps a region of this channel's file directly into memory.

 The `mode` parameter specifies how the region of the file is
mapped and may be one of the following modes:

-

 *Read-only:* Any attempt to modify the resulting buffer
  will cause a `java.nio.ReadOnlyBufferException` to be thrown.
  (MapMode.READ_ONLY)

-

 *Read/write:* Changes made to the resulting buffer will
  eventually be propagated to the file; they may or may not be made
  visible to other programs that have mapped the same file.  (MapMode.READ_WRITE)

-

 *Private:* Changes made to the resulting buffer will not
  be propagated to the file and will not be visible to other programs
  that have mapped the same file; instead, they will cause private
  copies of the modified portions of the buffer to be created.  (MapMode.PRIVATE)

 An implementation may support additional map modes.

 For a read-only mapping, this channel must have been opened for
reading; for a read/write or private mapping, this channel must have
been opened for both reading and writing.

 The *mapped byte buffer*
returned by this method will have a position of zero and a limit and
capacity of `size`; its mark will be undefined.  The buffer and
the mapping that it represents will remain valid until the buffer itself
is garbage-collected.

 A mapping, once established, is not dependent upon the file channel
that was used to create it.  Closing the channel, in particular, has no
effect upon the validity of the mapping.

 Many of the details of memory-mapped files are inherently dependent
upon the underlying operating system and are therefore unspecified.  The
behavior of this method when the requested region is not completely
contained within this channel's file is unspecified.  Whether changes
made to the content or size of the underlying file, by this program or
another, are propagated to the buffer is unspecified.  The rate at which
changes to the buffer are propagated to the file is unspecified.

 For most operating systems, mapping a file into memory is more
expensive than reading or writing a few tens of kilobytes of data via
the usual read and write methods.  From the
standpoint of performance it is generally only worth mapping relatively
large files into memory.

Parameters:

- `mode`: One of the constants READ_ONLY, READ_WRITE, or PRIVATE defined in the `MapMode` class, according to whether the file is to be mapped read-only, read/write, or privately (copy-on-write), respectively, or an implementation specific map mode
- `position`: The position within the file at which the mapped region is to start; must be non-negative
- `size`: The size of the region to be mapped; must be non-negative and no greater than `java.lang.Integer.MAX_VALUE`

**Returns:** The mapped byte buffer

**See also:** java.nio.channels.FileChannel.MapMode

**See also:** java.nio.MappedByteBuffer

Throws:

- `NonReadableChannelException`: If the `mode` is READ_ONLY or an implementation specific map mode requiring read access, but this channel was not opened for reading
- `NonWritableChannelException`: If the `mode` is READ_WRITE, PRIVATE or an implementation specific map mode requiring write access, but this channel was not opened for both reading and writing
- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `UnsupportedOperationException`: If an unsupported map mode is specified
- `IOException`: If some other I/O error occurs

## FileChannel.map(MapMode, long, long, Arena)

```java
public MemorySegment map(MapMode mode, long offset, long size, Arena arena) throws IOException
```

Maps a region of this channel's file into a new mapped memory segment,
with the given offset, size and arena.
The address of the returned memory
segment is the starting address of the mapped off-heap region backing
the segment.

The lifetime of the returned segment is controlled by the provided arena.
For instance, if the provided arena is a closeable arena,
the returned segment will be unmapped when the provided closeable arena
is closed.

 If the specified mapping mode is
READ_ONLY, the resulting
segment will be read-only (see `MemorySegment.isReadOnly()`).

 The content of a mapped memory segment can change at any time, for
example if the content of the corresponding region of the mapped file is
changed by this (or another) program.  Whether such changes occur, and
when they occur, is operating-system dependent and therefore unspecified.

 All or part of a mapped memory segment may become inaccessible at any
time, for example if the backing mapped file is truncated. An attempt to
access an inaccessible region of a mapped memory segment will not change
the segment's content and will cause an unspecified exception to be
thrown either at the time of the access or at some later time. It is
therefore strongly recommended that appropriate precautions be taken to
avoid the manipulation of a mapped file by this (or another) program,
except to read or write the file's content.

Parameters:

- `mode`: The file mapping mode, see long, long); the mapping mode might affect the behavior of the returned memory mapped segment (see `MemorySegment.force()`)
- `offset`: The offset (expressed in bytes) within the file at which the mapped segment is to start
- `size`: The size (in bytes) of the mapped memory backing the memory segment
- `arena`: The segment arena

**Implementation note:** When obtaining a mapped segment from a newly created file
          channel, the initialization state of the contents of the block
          of mapped memory associated with the returned mapped memory
          segment is unspecified and should not be relied upon.

**Implementation requirements:** The default implementation of this method throws
          `UnsupportedOperationException`.

**Returns:** A new mapped memory segment

**Since:** 22

Throws:

- `IllegalArgumentException`: If `offset < 0`, `size < 0` or `offset + size` overflows the range of `long`
- `IllegalStateException`: If `arena.isAlive() == false`
- `WrongThreadException`: If `arena` is a confined scoped arena, and this method is called from a thread `T`, other than the scoped arena's owner thread
- `NonReadableChannelException`: If the `mode` is READ_ONLY or an implementation specific map mode requiring read access, but this channel was not opened for reading
- `NonWritableChannelException`: If the `mode` is READ_WRITE, PRIVATE or an implementation specific map mode requiring write access, but this channel was not opened for both reading and writing
- `IOException`: If some other I/O error occurs
- `UnsupportedOperationException`: If an unsupported map mode is specified

## FileChannel.lock(long, long, boolean)

```java
public abstract FileLock lock(long position, long size, boolean shared) throws IOException
```

Acquires a lock on the given region of this channel's file.

 An invocation of this method will block until the region can be
locked, this channel is closed, or the invoking thread is interrupted,
whichever comes first.

 If this channel is closed by another thread during an invocation of
this method then an `AsynchronousCloseException` will be thrown.

 If the invoking thread is interrupted while waiting to acquire the
lock then its interrupt status will be set and a `FileLockInterruptionException` will be thrown.  If the invoker's
interrupt status is set when this method is invoked then that exception
will be thrown immediately; the thread's interrupt status will not be
changed.

 The region specified by the `position` and `size`
parameters need not be contained within, or even overlap, the actual
underlying file.  Lock regions are fixed in size; if a locked region
initially contains the end of the file and the file grows beyond the
region then the new portion of the file will not be covered by the lock.
If a file is expected to grow in size and a lock on the entire file is
required then a region starting at zero, and no smaller than the
expected maximum size of the file, should be locked.  The zero-argument
`lock()` method simply locks a region of size `Long.MAX_VALUE`.  If the `position` is non-negative and the
`size` is zero, then a lock of size
`Long.MAX_VALUE - position` is returned.

 Some operating systems do not support shared locks, in which case a
request for a shared lock is automatically converted into a request for
an exclusive lock.  Whether the newly-acquired lock is shared or
exclusive may be tested by invoking the resulting lock object's isShared method.

 File locks are held on behalf of the entire Java virtual machine.
They are not suitable for controlling access to a file by multiple
threads within the same virtual machine.

Parameters:

- `position`: The position at which the locked region is to start; must be non-negative
- `size`: The size of the locked region; must be non-negative, and the sum `position` + `size` must be non-negative. A value of zero means to lock all bytes from the specified starting position to the end of the file, regardless of whether the file is subsequently extended or truncated
- `shared`: `true` to request a shared lock, in which case this channel must be open for reading (and possibly writing); `false` to request an exclusive lock, in which case this channel must be open for writing (and possibly reading)

**Returns:** A lock object representing the newly-acquired lock

**See also:** #lock()

**See also:** #tryLock()

**See also:** #tryLock(long,long,boolean)

Throws:

- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the invoking thread is blocked in this method
- `FileLockInterruptionException`: If the invoking thread is interrupted while blocked in this method
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region
- `NonReadableChannelException`: If `shared` is `true` but this channel was not opened for reading
- `NonWritableChannelException`: If `shared` is `false` but this channel was not opened for writing
- `IOException`: If some other I/O error occurs

## FileChannel.lock()

```java
public final FileLock lock() throws IOException
```

Acquires an exclusive lock on this channel's file.

 An invocation of this method of the form `fc.lock()` behaves
in exactly the same way as the invocation

**Returns:** A lock object representing the newly-acquired lock

**See also:** #lock(long,long,boolean)

**See also:** #tryLock()

**See also:** #tryLock(long,long,boolean)

Throws:

- `ClosedChannelException`: If this channel is closed
- `AsynchronousCloseException`: If another thread closes this channel while the invoking thread is blocked in this method
- `FileLockInterruptionException`: If the invoking thread is interrupted while blocked in this method
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region of the same file
- `NonWritableChannelException`: If this channel was not opened for writing
- `IOException`: If some other I/O error occurs

## FileChannel.tryLock(long, long, boolean)

```java
public abstract FileLock tryLock(long position, long size, boolean shared) throws IOException
```

Attempts to acquire a lock on the given region of this channel's file.

 This method does not block.  An invocation always returns
immediately, either having acquired a lock on the requested region or
having failed to do so.  If it fails to acquire a lock because an
overlapping lock is held by another program then it returns
`null`.  If it fails to acquire a lock for any other reason then
an appropriate exception is thrown.

 The region specified by the `position` and `size`
parameters need not be contained within, or even overlap, the actual
underlying file.  Lock regions are fixed in size; if a locked region
initially contains the end of the file and the file grows beyond the
region then the new portion of the file will not be covered by the lock.
If a file is expected to grow in size and a lock on the entire file is
required then a region starting at zero, and no smaller than the
expected maximum size of the file, should be locked.  The zero-argument
`tryLock()` method simply locks a region of size `Long.MAX_VALUE`.  If the `position` is non-negative and the
`size` is zero, then a lock of size
`Long.MAX_VALUE - position` is returned.

 Some operating systems do not support shared locks, in which case a
request for a shared lock is automatically converted into a request for
an exclusive lock.  Whether the newly-acquired lock is shared or
exclusive may be tested by invoking the resulting lock object's isShared method.

 File locks are held on behalf of the entire Java virtual machine.
They are not suitable for controlling access to a file by multiple
threads within the same virtual machine.

Parameters:

- `position`: The position at which the locked region is to start; must be non-negative
- `size`: The size of the locked region; must be non-negative, and the sum `position` + `size` must be non-negative. A value of zero means to lock all bytes from the specified starting position to the end of the file, regardless of whether the file is subsequently extended or truncated
- `shared`: `true` to request a shared lock, `false` to request an exclusive lock

**Returns:** A lock object representing the newly-acquired lock,
         or `null` if the lock could not be acquired
         because another program holds an overlapping lock

**See also:** #lock()

**See also:** #lock(long,long,boolean)

**See also:** #tryLock()

Throws:

- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `ClosedChannelException`: If this channel is closed
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region of the same file
- `NonReadableChannelException`: If `shared` is `true` but this channel was not opened for reading
- `NonWritableChannelException`: If `shared` is `false` but this channel was not opened for writing
- `IOException`: If some other I/O error occurs
