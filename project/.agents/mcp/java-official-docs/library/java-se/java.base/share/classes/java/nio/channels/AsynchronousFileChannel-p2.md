---
title: "AsynchronousFileChannel class (java.nio.channels) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousFileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousFileChannel class (java.nio.channels) (part 2 of 3)

## AsynchronousFileChannel.lock(long, long, boolean, A, CompletionHandler<FileLock,? super A>)

```java
public abstract <A> void lock(long position, long size, boolean shared, A attachment, CompletionHandler<FileLock,? super A> handler)
```

Acquires a lock on the given region of this channel's file.

 This method initiates an operation to acquire a lock on the given
region of this channel's file. The `handler` parameter is a
completion handler that is invoked when the lock is acquired (or the
operation fails). The result passed to the completion handler is the
resulting `FileLock`.

 The region specified by the `position` and `size`
parameters need not be contained within, or even overlap, the actual
underlying file.  Lock regions are fixed in size; if a locked region
initially contains the end of the file and the file grows beyond the
region then the new portion of the file will not be covered by the lock.
If a file is expected to grow in size and a lock on the entire file is
required then a region starting at zero, and no smaller than the
expected maximum size of the file, should be locked.  The two-argument
`lock(Object,CompletionHandler)` method simply locks a region
of size `Long.MAX_VALUE`.  If the `position` is non-negative
and the `size` is zero, then a lock of size
`Long.MAX_VALUE - position` is returned.  If a lock that
overlaps the requested region is already held by this Java virtual
machine, or this method has been invoked to lock an overlapping region
and that operation has not completed, then this method throws
`OverlappingFileLockException`.

 Some operating systems do not support a mechanism to acquire a file
lock in an asynchronous manner. Consequently an implementation may
acquire the file lock in a background thread or from a task executed by
a thread in the associated thread pool. If there are many lock operations
outstanding then it may consume threads in the Java virtual machine for
indefinite periods.

 Some operating systems do not support shared locks, in which case a
request for a shared lock is automatically converted into a request for
an exclusive lock.  Whether the newly-acquired lock is shared or
exclusive may be tested by invoking the resulting lock object's isShared method.

 File locks are held on behalf of the entire Java virtual machine.
They are not suitable for controlling access to a file by multiple
threads within the same virtual machine.

Parameters:

- ``: The type of the attachment
- `position`: The position at which the locked region is to start; must be non-negative
- `size`: The size of the locked region; must be non-negative, and the sum `position` + `size` must be non-negative. A value of zero means to lock all bytes from the specified starting position to the end of the file, regardless of whether the file is subsequently extended or truncated
- `shared`: `true` to request a shared lock, in which case this channel must be open for reading (and possibly writing); `false` to request an exclusive lock, in which case this channel must be open for writing (and possibly reading)
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or there is already a pending attempt to lock an overlapping region
- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `NonReadableChannelException`: If `shared` is true but this channel was not opened for reading
- `NonWritableChannelException`: If `shared` is false but this channel was not opened for writing

## AsynchronousFileChannel.lock(A, CompletionHandler<FileLock,? super A>)

```java
public final <A> void lock(A attachment, CompletionHandler<FileLock,? super A> handler)
```

Acquires an exclusive lock on this channel's file.

 This method initiates an operation to acquire a lock on the given
region of this channel's file. The `handler` parameter is a
completion handler that is invoked when the lock is acquired (or the
operation fails). The result passed to the completion handler is the
resulting `FileLock`.

 An invocation of this method of the form `ch.lock(att,handler)`
behaves in exactly the same way as the invocation

Parameters:

- ``: The type of the attachment
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `OverlappingFileLockException`: If a lock is already held by this Java virtual machine, or there is already a pending attempt to lock a region
- `NonWritableChannelException`: If this channel was not opened for writing

## AsynchronousFileChannel.lock(long, long, boolean)

```java
public abstract Future<FileLock> lock(long position, long size, boolean shared)
```

Acquires a lock on the given region of this channel's file.

 This method initiates an operation to acquire a lock on the given
region of this channel's file.  The method behaves in exactly the same
manner as the long, boolean, Object, CompletionHandler)
method except that instead of specifying a completion handler, this
method returns a `Future` representing the pending result. The
`Future`'s get method returns the `FileLock` on successful completion.

Parameters:

- `position`: The position at which the locked region is to start; must be non-negative
- `size`: The size of the locked region; must be non-negative, and the sum `position` + `size` must be non-negative. A value of zero means to lock all bytes from the specified starting position to the end of the file, regardless of whether the file is subsequently extended or truncated
- `shared`: `true` to request a shared lock, in which case this channel must be open for reading (and possibly writing); `false` to request an exclusive lock, in which case this channel must be open for writing (and possibly reading)

**Returns:** a `Future` object representing the pending result

Throws:

- `OverlappingFileLockException`: If a lock is already held by this Java virtual machine, or there is already a pending attempt to lock a region
- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `NonReadableChannelException`: If `shared` is true but this channel was not opened for reading
- `NonWritableChannelException`: If `shared` is false but this channel was not opened for writing

## AsynchronousFileChannel.lock()

```java
public final Future<FileLock> lock()
```

Acquires an exclusive lock on this channel's file.

 This method initiates an operation to acquire an exclusive lock on this
channel's file. The method returns a `Future` representing the
pending result of the operation. The `Future`'s get method returns the `FileLock` on successful completion.

 An invocation of this method behaves in exactly the same way as the
invocation

**Returns:** a `Future` object representing the pending result

Throws:

- `OverlappingFileLockException`: If a lock is already held by this Java virtual machine, or there is already a pending attempt to lock a region
- `NonWritableChannelException`: If this channel was not opened for writing

## AsynchronousFileChannel.tryLock(long, long, boolean)

```java
public abstract FileLock tryLock(long position, long size, boolean shared) throws IOException
```

Attempts to acquire a lock on the given region of this channel's file.

 This method does not block. An invocation always returns immediately,
either having acquired a lock on the requested region or having failed to
do so.  If it fails to acquire a lock because an overlapping lock is held
by another program then it returns `null`.  If it fails to acquire
a lock for any other reason then an appropriate exception is thrown.  If
the `position` is non-negative and the `size` is zero, then a
lock of size `Long.MAX_VALUE - position` is returned.

Parameters:

- `position`: The position at which the locked region is to start; must be non-negative
- `size`: The size of the locked region; must be non-negative, and the sum `position` + `size` must be non-negative. A value of zero means to lock all bytes from the specified starting position to the end of the file, regardless of whether the file is subsequently extended or truncated
- `shared`: `true` to request a shared lock, `false` to request an exclusive lock

**Returns:** A lock object representing the newly-acquired lock,
         or `null` if the lock could not be acquired
         because another program holds an overlapping lock

**See also:** #lock(Object,CompletionHandler)

**See also:** #lock(long,long,boolean,Object,CompletionHandler)

**See also:** #tryLock()

Throws:

- `IllegalArgumentException`: If the preconditions on the parameters do not hold
- `ClosedChannelException`: If this channel is closed
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region of the same file
- `NonReadableChannelException`: If `shared` is true but this channel was not opened for reading
- `NonWritableChannelException`: If `shared` is false but this channel was not opened for writing
- `IOException`: If some other I/O error occurs

## AsynchronousFileChannel.tryLock()

```java
public final FileLock tryLock() throws IOException
```

Attempts to acquire an exclusive lock on this channel's file.

 An invocation of this method of the form `ch.tryLock()`
behaves in exactly the same way as the invocation

**Returns:** A lock object representing the newly-acquired lock,
         or `null` if the lock could not be acquired
         because another program holds an overlapping lock

**See also:** #lock(Object,CompletionHandler)

**See also:** #lock(long,long,boolean,Object,CompletionHandler)

**See also:** #tryLock(long,long,boolean)

Throws:

- `ClosedChannelException`: If this channel is closed
- `OverlappingFileLockException`: If a lock that overlaps the requested region is already held by this Java virtual machine, or if another thread is already blocked in this method and is attempting to lock an overlapping region
- `NonWritableChannelException`: If `shared` is false but this channel was not opened for writing
- `IOException`: If some other I/O error occurs

## AsynchronousFileChannel.read(ByteBuffer, long, A, CompletionHandler<Integer,? super A>)

```java
public abstract <A> void read(ByteBuffer dst, long position, A attachment, CompletionHandler<Integer,? super A> handler)
```

Reads a sequence of bytes from this channel into the given buffer,
starting at the given file position.

 This method initiates the reading of a sequence of bytes from this
channel into the given buffer, starting at the given file position. The
result of the read is the number of bytes read or `-1` if the given
position is greater than or equal to the file's size at the time that the
read is attempted.

 This method works in the same manner as the `AsynchronousByteChannel.read(ByteBuffer,Object,CompletionHandler)`
method, except that bytes are read starting at the given file position.
If the given file position is greater than the file's size at the time
that the read is attempted then no bytes are read.

Parameters:

- ``: The type of the attachment
- `dst`: The buffer into which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `IllegalArgumentException`: If the position is negative or the buffer is read-only
- `NonReadableChannelException`: If this channel was not opened for reading

## AsynchronousFileChannel.read(ByteBuffer, long)

```java
public abstract Future<Integer> read(ByteBuffer dst, long position)
```

Reads a sequence of bytes from this channel into the given buffer,
starting at the given file position.

 This method initiates the reading of a sequence of bytes from this
channel into the given buffer, starting at the given file position. This
method returns a `Future` representing the pending result of the
operation. The `Future`'s get method returns
the number of bytes read or `-1` if the given position is greater
than or equal to the file's size at the time that the read is attempted.

 This method works in the same manner as the `AsynchronousByteChannel.read(ByteBuffer)` method, except that bytes are
read starting at the given file position. If the given file position is
greater than the file's size at the time that the read is attempted then
no bytes are read.

Parameters:

- `dst`: The buffer into which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative

**Returns:** A `Future` object representing the pending result

Throws:

- `IllegalArgumentException`: If the position is negative or the buffer is read-only
- `NonReadableChannelException`: If this channel was not opened for reading

## AsynchronousFileChannel.write(ByteBuffer, long, A, CompletionHandler<Integer,? super A>)

```java
public abstract <A> void write(ByteBuffer src, long position, A attachment, CompletionHandler<Integer,? super A> handler)
```

Writes a sequence of bytes to this channel from the given buffer, starting
at the given file position.

 This method works in the same manner as the `AsynchronousByteChannel.write(ByteBuffer,Object,CompletionHandler)`
method, except that bytes are written starting at the given file position.
If the given position is greater than the file's size, at the time that
the write is attempted, then the file will be grown to accommodate the new
bytes; the values of any bytes between the previous end-of-file and the
newly-written bytes are unspecified.

Parameters:

- ``: The type of the attachment
- `src`: The buffer from which bytes are to be transferred
- `position`: The file position at which the transfer is to begin; must be non-negative
- `attachment`: The object to attach to the I/O operation; can be `null`
- `handler`: The handler for consuming the result

Throws:

- `IllegalArgumentException`: If the position is negative
- `NonWritableChannelException`: If this channel was not opened for writing
