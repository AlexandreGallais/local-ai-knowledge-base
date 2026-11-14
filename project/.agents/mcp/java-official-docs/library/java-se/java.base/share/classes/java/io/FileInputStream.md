---
title: "FileInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileInputStream class (java.io)

```java
public class FileInputStream extends InputStream
```

A `FileInputStream` obtains input bytes
from a file in a file system. What files
are  available depends on the host environment.

`FileInputStream` is meant for reading streams of raw bytes
such as image data. For reading streams of characters, consider using
`FileReader`.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**Implementation requirements:** Subclasses are responsible for the cleanup of resources acquired by the subclass.
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use `java.lang.ref.Cleaner` or some other mechanism.

**See also:** java.io.File

**See also:** java.io.FileDescriptor

**See also:** java.io.FileOutputStream

**See also:** java.nio.file.Files#newInputStream

**Since:** 1.0

## FileInputStream.FileInputStream(String)

```java
public FileInputStream(String name) throws FileNotFoundException
```

Creates a `FileInputStream` to read from an existing file
named by the path name `name`.
Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor`
object is created to represent this file
connection.

If the named file does not exist, is a directory rather than a regular
file, or for some other reason cannot be opened for reading then a
`FileNotFoundException` is thrown.

Parameters:

- `name`: the system-dependent file name.

Throws:

- `FileNotFoundException`: if the file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.

## FileInputStream.FileInputStream(File)

```java
public FileInputStream(File file) throws FileNotFoundException
```

Creates a `FileInputStream` to read from an existing file
represented by the `File` object `file`.
Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object
is created to represent this file connection.

If the named file does not exist, is a directory rather than a regular
file, or for some other reason cannot be opened for reading then a
`FileNotFoundException` is thrown.

Parameters:

- `file`: the file to be opened for reading.

**See also:** java.io.File#getPath()

Throws:

- `FileNotFoundException`: if the file does not exist, is a directory rather than a regular file, or for some other reason cannot be opened for reading.

## FileInputStream.FileInputStream(FileDescriptor)

```java
public FileInputStream(FileDescriptor fdObj)
```

Creates a `FileInputStream` by using the file descriptor
`fdObj`, which represents an existing connection to an
actual file in the file system.

If `fdObj` is null then a `NullPointerException`
is thrown.

This constructor does not throw an exception if `fdObj`
is invalid.
However, if the methods are invoked on the resulting stream to attempt
I/O on the stream, an `IOException` is thrown.

Parameters:

- `fdObj`: the file descriptor to be opened for reading.

## FileInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of data from this input stream. This method blocks
if no input is yet available.

**Returns:** the next byte of data, or `-1` if the end of the
            file is reached.

Throws:

- `IOException`: (inherited documentation)

## FileInputStream.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads up to `b.length` bytes of data from this input
stream into an array of bytes. This method blocks until some input
is available.

Parameters:

- `b`: (inherited documentation)

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            the file has been reached.

Throws:

- `IOException`: if an I/O error occurs.

## FileInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this input stream
into an array of bytes. If `len` is not zero, the method
blocks until some input is available; otherwise, no
bytes are read and `0` is returned.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: if an I/O error occurs.

## FileInputStream.readNBytes(int)

```java
public byte[] readNBytes(int len) throws IOException
```

**Since:** 11

## FileInputStream.transferTo(OutputStream)

```java
public long transferTo(OutputStream out) throws IOException
```

(inherited documentation)

## FileInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards `n` bytes of data from the
input stream.

The `skip` method may, for a variety of
reasons, end up skipping over some smaller number of bytes,
possibly `0`. If `n` is negative, the method
will try to skip backwards. In case the backing file does not support
backward skip at its current position, an `IOException` is
thrown. The actual number of bytes skipped is returned. If it skips
forwards, it returns a positive value. If it skips backwards, it
returns a negative value.

This method may skip more bytes than what are remaining in the
backing file. This produces no exception and the number of bytes skipped
may include some number of bytes that were beyond the EOF of the
backing file. Attempting to read from the stream after skipping past
the end will result in -1 indicating the end of the file.

Parameters:

- `n`: (inherited documentation)

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: if n is negative, if the stream does not support seek, or if an I/O error occurs.

## FileInputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of remaining bytes that can be read (or
skipped over) from this input stream without blocking by the next
invocation of a method for this input stream. Returns 0 when the file
position is beyond EOF. The next invocation might be the same thread
or another thread. A single read or skip of this many bytes will not
block, but may read or skip fewer bytes.

 In some cases, a non-blocking read (or skip) may appear to be
blocked when it is merely slow, for example when reading large
files over slow networks.

**Returns:** an estimate of the number of remaining bytes that can be read
            (or skipped over) from this input stream without blocking.

Throws:

- `IOException`: if this file input stream has been closed by calling `close` or an I/O error occurs.

## FileInputStream.close()

```java
public void close() throws IOException
```

Closes this file input stream and releases any system resources
associated with the stream.

 If this stream has an associated channel then the channel is closed
as well.

**API note:** Overriding `close` to perform cleanup actions is reliable
only when called directly or when called by try-with-resources.

**Implementation requirements:** Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use the `java.lang.ref.Cleaner` mechanism.

If this stream has an associated channel then this method will close the
channel, which in turn will close this stream. Subclasses that override
this method should be prepared to handle possible reentrant invocation.

Throws:

- `IOException`: (inherited documentation)

## FileInputStream.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the `FileDescriptor`
object  that represents the connection to
the actual file in the file system being
used by this `FileInputStream`.

**Returns:** the file descriptor object associated with this stream.

**See also:** java.io.FileDescriptor

Throws:

- `IOException`: if an I/O error occurs.

## FileInputStream.getChannel()

```java
public FileChannel getChannel()
```

Returns the unique FileChannel
object associated with this file input stream.

 The initial position of the returned channel will be equal to the
number of bytes read from the file so far.  Reading bytes from this
stream will increment the channel's position.  Changing the channel's
position, either explicitly or by reading, will change this stream's
file position.

**Returns:** the file channel associated with this file input stream

**Since:** 1.4
