---
title: "FileChannel class (java.nio.channels) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/FileChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileChannel class (java.nio.channels)

```java
public abstract class FileChannel extends AbstractInterruptibleChannel implements SeekableByteChannel, GatheringByteChannel, ScatteringByteChannel
```

A channel for reading, writing, mapping, and manipulating a file.

 A file channel is a `SeekableByteChannel` that is connected to
a file. It has a current *position* within its file which can
be both *queried* and *modified*.  The file itself contains a variable-length sequence
of bytes that can be read and written and whose current *size* can be queried.  The size of the file increases
when bytes are written beyond its current size; the size of the file
decreases when it is *truncated*.  The
file may also have some associated *metadata* such as access
permissions, content type, and last-modification time; this class does not
define methods for metadata access.

 In addition to the familiar read, write, and close operations of byte
channels, this class defines the following file-specific operations:

-

 Bytes may be long) read or
  long) *written* at an absolute
  position in a file in a way that does not affect the channel's current
  position.

-

 A region of a file may be *mapped*
  directly into memory; for large files this is often much more efficient
  than invoking the usual `read` or `write` methods.

-

 Updates made to a file may be *forced out* to the underlying storage device, ensuring that data are not
  lost in the event of a system crash.

-

 Bytes can be transferred from a file *to some other channel*, and *vice versa*, in a way that can be optimized by many operating systems
  into a very fast transfer directly to or from the filesystem cache.

-

 A region of a file may be *locked*
  against access by other programs.

 File channels are safe for use by multiple concurrent threads.  The
close method may be invoked at any time, as specified
by the `Channel` interface.  Only one operation that involves the
channel's position or can change its file's size may be in progress at any
given time; attempts to initiate a second such operation while the first is
still in progress will block until the first operation completes.  Other
operations, in particular those that take an explicit position, may proceed
concurrently; whether they in fact do so is dependent upon the underlying
implementation and is therefore unspecified.

 The view of a file provided by an instance of this class is guaranteed
to be consistent with other views of the same file provided by other
instances in the same program.  The view provided by an instance of this
class may or may not, however, be consistent with the views seen by other
concurrently-running programs due to caching performed by the underlying
operating system and delays induced by network-filesystem protocols.  This
is true regardless of the language in which these other programs are
written, and whether they are running on the same machine or on some other
machine.  The exact nature of any such inconsistencies are system-dependent
and are therefore unspecified.

 A file channel is created by invoking one of the open
methods defined by this class. A file channel can also be obtained from an
existing FileInputStream, FileOutputStream, or RandomAccessFile object by invoking
that object's `getChannel` method, which returns a file channel that
is connected to the same underlying file. Where the file channel is obtained
from an existing stream or random access file then the state of the file
channel is intimately connected to that of the object whose `getChannel`
method returned the channel.  Changing the channel's position, whether
explicitly or by reading or writing bytes, will change the file position of
the originating object, and vice versa. Changing the file's length via the
file channel will change the length seen via the originating object, and vice
versa.  Changing the file's content by writing bytes will change the content
seen by the originating object, and vice versa. Closing the channel will
close the originating object.

 At various points this class specifies that an
instance that is "open for reading," "open for writing," or "open for
reading and writing" is required.  A channel obtained via the getChannel method of a `java.io.FileInputStream` instance will be open for reading.  A channel
obtained via the getChannel
method of a `java.io.FileOutputStream` instance will be open for
writing.  Finally, a channel obtained via the getChannel method of a `java.io.RandomAccessFile` instance will be open for reading if the instance
was created with mode `"r"` and will be open for reading and writing
if the instance was created with mode `"rw"`.

 A file channel that is open for writing may be in
*append mode*, for example if it was obtained from a file-output stream
that was created by invoking the FileOutputStream(File,boolean) constructor and passing `true` for
the second parameter.  In this mode each invocation of a relative write
operation first advances the position to the end of the file and then writes
the requested data.  Whether the advancement of the position and the writing
of the data are done in a single atomic operation is system-dependent and
therefore unspecified.  In this mode the behavior of the method to
write at a given position is also
system-dependent.

**See also:** java.io.FileInputStream#getChannel()

**See also:** java.io.FileOutputStream#getChannel()

**See also:** java.io.RandomAccessFile#getChannel()

**Since:** 1.4

## FileChannel.FileChannel()

```java
protected FileChannel()
```

Initializes a new instance of this class.

## FileChannel.open(Path, Set<? extends OpenOption>, FileAttribute<?>...)

```java
public static FileChannel open(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file, returning a file channel to access the file.

 The `options` parameter determines how the file is opened.
The READ and WRITE options determine if the file should be opened for reading and/or
writing. If neither option (or the APPEND
option) is contained in the array then the file is opened for reading.
By default reading or writing commences at the beginning of the file.

 In the addition to `READ` and `WRITE`, the following
options may be present:

additional options

 Option Description

   APPEND
   If this option is present then the file is opened for writing and
    each invocation of the channel's `write` method first advances
    the position to the end of the file and then writes the requested
    data. Whether the advancement of the position and the writing of the
    data are done in a single atomic operation is system-dependent and
    therefore unspecified. The effect of writing at a given position with this option
    present is unspecified. This option may not be used in conjunction
    with the `READ` or `TRUNCATE_EXISTING` options.

   TRUNCATE_EXISTING
   If this option is present then the existing file is truncated to
  a size of 0 bytes. This option is ignored when the file is opened only
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

 The `attrs` parameter is an optional array of file file-attributes to set atomically when creating the file.

 The new channel is created by invoking the newFileChannel method on the
provider that created the `Path`.

Parameters:

- `path`: The path of the file to open or create
- `options`: Options specifying how the file is opened
- `attrs`: An optional list of file attributes to set atomically when creating the file

**Returns:** A new file channel

**Since:** 1.7

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If the `path` is associated with a provider that does not support creating file channels, or an unsupported open option is specified, or the array contains an attribute that cannot be set atomically when creating the file
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## FileChannel.open(Path, OpenOption...)

```java
public static FileChannel open(Path path, OpenOption... options) throws IOException
```

Opens or creates a file, returning a file channel to access the file.

 An invocation of this method behaves in exactly the same way as the
invocation

where `opts` is a set of the options specified in the `options` array.

Parameters:

- `path`: The path of the file to open or create
- `options`: Options specifying how the file is opened

**Returns:** A new file channel

**Since:** 1.7

Throws:

- `IllegalArgumentException`: If the set contains an invalid combination of options
- `UnsupportedOperationException`: If the `path` is associated with a provider that does not support creating file channels, or an unsupported open option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: If an I/O error occurs

## FileChannel.read(ByteBuffer)

```java
public abstract int read(ByteBuffer dst) throws IOException
```

Reads a sequence of bytes from this channel into the given buffer.

 Bytes are read starting at this channel's current file position, and
then the file position is updated with the number of bytes actually
read.  Otherwise this method behaves exactly as specified in the `ReadableByteChannel` interface.

Throws:

- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
- `NonReadableChannelException`: (inherited documentation)

## FileChannel.read(ByteBuffer[], int, int)

```java
public abstract long read(ByteBuffer[] dsts, int offset, int length) throws IOException
```

Reads a sequence of bytes from this channel into a subsequence of the
given buffers.

 Bytes are read starting at this channel's current file position, and
then the file position is updated with the number of bytes actually
read.  Otherwise this method behaves exactly as specified in the `ScatteringByteChannel` interface.

Throws:

- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
- `NonReadableChannelException`: (inherited documentation)

## FileChannel.read(ByteBuffer[])

```java
public final long read(ByteBuffer[] dsts) throws IOException
```

Reads a sequence of bytes from this channel into the given buffers.

 Bytes are read starting at this channel's current file position, and
then the file position is updated with the number of bytes actually
read.  Otherwise this method behaves exactly as specified in the `ScatteringByteChannel` interface.

Throws:

- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
- `NonReadableChannelException`: (inherited documentation)

## FileChannel.write(ByteBuffer)

```java
public abstract int write(ByteBuffer src) throws IOException
```

Writes a sequence of bytes to this channel from the given buffer.

 Bytes are written starting at this channel's current file position
unless the channel is in append mode, in which case the position is
first advanced to the end of the file.  The file is grown, if necessary,
to accommodate the written bytes, and then the file position is updated
with the number of bytes actually written.  Otherwise this method
behaves exactly as specified by the `WritableByteChannel`
interface.

Throws:

- `ClosedChannelException`: (inherited documentation)
- `AsynchronousCloseException`: (inherited documentation)
- `ClosedByInterruptException`: (inherited documentation)
- `NonWritableChannelException`: (inherited documentation)

## FileChannel.write(ByteBuffer[], int, int)

```java
public abstract long write(ByteBuffer[] srcs, int offset, int length) throws IOException
```

Writes a sequence of bytes to this channel from a subsequence of the
given buffers.

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
