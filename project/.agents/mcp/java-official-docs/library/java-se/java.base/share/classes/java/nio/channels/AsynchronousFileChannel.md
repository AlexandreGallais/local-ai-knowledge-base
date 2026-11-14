---
title: "AsynchronousFileChannel class (java.nio.channels) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/AsynchronousFileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AsynchronousFileChannel class (java.nio.channels)

```java
public abstract class AsynchronousFileChannel implements AsynchronousChannel
```

An asynchronous channel for reading, writing, and manipulating a file.

 An asynchronous file channel is created when a file is opened by invoking
one of the open methods defined by this class. The file contains
a variable-length sequence of bytes that can be read and written and whose
current size can be queried. The size of the file increases
when bytes are written beyond its  current size; the size of the file decreases
when it is truncated.

 An asynchronous file channel does not have a *current position*
within the file. Instead, the file position is specified to each read and
write method that initiates asynchronous operations. A `CompletionHandler`
is specified as a parameter and is invoked to consume the result of the I/O
operation. This class also defines read and write methods that initiate
asynchronous operations, returning a `Future` to represent the pending
result of the operation. The `Future` may be used to check if the
operation has completed, wait for its completion, and retrieve the result.

 In addition to read and write operations, this class defines the
following operations:

-

 Updates made to a file may be *forced out* to the underlying storage device, ensuring that data are not
  lost in the event of a system crash.

-

 A region of a file may be *locked* against
  access by other programs.

 An `AsynchronousFileChannel` is associated with a thread pool to
which tasks are submitted to handle I/O events and dispatch to completion
handlers that consume the results of I/O operations on the channel. The
completion handler for an I/O operation initiated on a channel is guaranteed
to be invoked by one of the threads in the thread pool (This ensures that the
completion handler is run by a thread with the expected *identity*).
Where an I/O operation completes immediately, and the initiating thread is
itself a thread in the thread pool, then the completion handler may be invoked
directly by the initiating thread. When an `AsynchronousFileChannel` is
created without specifying a thread pool then the channel is associated with
a system-dependent default thread pool that may be shared with other
channels. The default thread pool is configured by the system properties
defined by the `AsynchronousChannelGroup` class.

 Channels of this type are safe for use by multiple concurrent threads. The
close method may be invoked at any time, as specified
by the `Channel` interface. This causes all outstanding asynchronous
operations on the channel to complete with the exception `AsynchronousCloseException`. Multiple read and write operations may be
outstanding at the same time. When multiple read and write operations are
outstanding then the ordering of the I/O operations, and the order that the
completion handlers are invoked, is not specified; they are not, in particular,
guaranteed to execute in the order that the operations were initiated. The
ByteBuffers used when reading or writing are not
safe for use by multiple concurrent I/O operations. Furthermore, after an I/O
operation is initiated then care should be taken to ensure that the buffer is
not accessed until after the operation has completed.

 As with `FileChannel`, the view of a file provided by an instance of
this class is guaranteed to be consistent with other views of the same file
provided by other instances in the same program.  The view provided by an
instance of this class may or may not, however, be consistent with the views
seen by other concurrently-running programs due to caching performed by the
underlying operating system and delays induced by network-filesystem protocols.
This is true regardless of the language in which these other programs are
written, and whether they are running on the same machine or on some other
machine.  The exact nature of any such inconsistencies are system-dependent
and are therefore unspecified.

**Since:** 1.7

## AsynchronousFileChannel.AsynchronousFileChannel()

```java
protected AsynchronousFileChannel()
```

Initializes a new instance of this class.

## AsynchronousFileChannel.open(Path, Set<? extends OpenOption>, ExecutorService, FileAttribute<?>...)

```java
public static AsynchronousFileChannel open(Path file, Set<? extends OpenOption> options, ExecutorService executor, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file for reading and/or writing, returning an
asynchronous file channel to access the file.

 The `options` parameter determines how the file is opened.
The READ and WRITE options determines if the file should be opened for reading and/or
writing. If neither option is contained in the array then an existing file
is opened for  reading.

 In addition to `READ` and `WRITE`, the following options
may be present:

additional options

 Option Description

   TRUNCATE_EXISTING
   When opening an existing file, the file is first truncated to a
  size of 0 bytes. This option is ignored when the file is opened only
  for reading.

   CREATE_NEW
   If this option is present then a new file is created, failing if
  the file already exists. When creating a file the check for the
  existence of the file and the creation of the file if it does not exist
  is atomic with respect to other file system operations. This option is
  ignored when the file is opened only for reading.

   CREATE
   If this option is present then an existing file is opened if it
  exists, otherwise a new file is created. When creating a file the check
  for the existence of the file and the creation of the file if it does
  not exist is atomic with respect to other file system operations. This
  option is ignored if the `CREATE_NEW` option is also present or
  the file is opened only for reading.

   DELETE_ON_CLOSE
   When this option is present then the implementation makes a
  *best effort* attempt to delete the file when closed by
  the close method. If the `close` method is not
  invoked then a *best effort* attempt is made to delete the file
  when the Java virtual machine terminates.

  SPARSE
   When creating a new file this option is a *hint* that the
  new file will be sparse. This option is ignored when not creating
  a new file.

   SYNC
   Requires that every update to the file's content or metadata be
  written synchronously to the underlying storage device. (see  Synchronized I/O file
  integrity).

   DSYNC
   Requires that every update to the file's content be written
  synchronously to the underlying storage device. (see  Synchronized I/O file
  integrity).

 An implementation may also support additional options.

 The `executor` parameter is the `ExecutorService` to
which tasks are submitted to handle I/O events and dispatch completion
results for operations initiated on resulting channel.
The nature of these tasks is highly implementation specific and so care
should be taken when configuring the `Executor`. Minimally it
should support an unbounded work queue and should not run tasks on the
caller thread of the execute method.
Shutting down the executor service while the channel is open results in
unspecified behavior.

 The `attrs` parameter is an optional array of file file-attributes to set atomically when creating the file.

 The new channel is created by invoking the newAsynchronousFileChannel
method on the provider that created the `Path`.

Parameters:

- `file`: The path of the file to open or create
- `options`: Options specifying how the file is opened
- `executor`: The thread pool or `null` to associate the channel with the default thread pool
- `attrs`: An optional list of file attributes to set atomically when creating the file

**Returns:** A new asynchronous file channel

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If the `file` is associated with a provider that does not support creating asynchronous file channels, or an unsupported open option is specified, or the array contains an attribute that cannot be set atomically when creating the file
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## AsynchronousFileChannel.open(Path, OpenOption...)

```java
public static AsynchronousFileChannel open(Path file, OpenOption... options) throws IOException
```

Opens or creates a file for reading and/or writing, returning an
asynchronous file channel to access the file.

 An invocation of this method behaves in exactly the same way as the
invocation

where `opts` is a `Set` containing the options specified to
this method.

 The resulting channel is associated with default thread pool to which
tasks are submitted to handle I/O events and dispatch to completion
handlers that consume the result of asynchronous operations performed on
the resulting channel.

Parameters:

- `file`: The path of the file to open or create
- `options`: Options specifying how the file is opened

**Returns:** A new asynchronous file channel

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If the `file` is associated with a provider that does not support creating file channels, or an unsupported open option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## AsynchronousFileChannel.size()

```java
public abstract long size() throws IOException
```

Returns the current size of this channel's file.

**Returns:** The current size of this channel's file, measured in bytes

Throws:

- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs

## AsynchronousFileChannel.truncate(long)

```java
public abstract AsynchronousFileChannel truncate(long size) throws IOException
```

Truncates this channel's file to the given size.

 If the given size is less than the file's current size then the file
is truncated, discarding any bytes beyond the new end of the file.  If
the given size is greater than or equal to the file's current size then
the file is not modified.

Parameters:

- `size`: The new size, a non-negative byte count

**Returns:** This file channel

Throws:

- `NonWritableChannelException`: If this channel was not opened for writing
- `ClosedChannelException`: If this channel is closed
- `IllegalArgumentException`: If the new size is negative
- `IOException`: If some other I/O error occurs

## AsynchronousFileChannel.force(boolean)

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
this channel's file via the methods defined in this class.

Parameters:

- `metaData`: If `true` then this method is required to force changes to both the file's content and metadata to be written to storage; otherwise, it need only force content changes to be written

Throws:

- `ClosedChannelException`: If this channel is closed
- `IOException`: If some other I/O error occurs
