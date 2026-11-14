---
title: "FileOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileOutputStream class (java.io)

```java
public class FileOutputStream extends OutputStream
```

A file output stream is an output stream for writing data to a
`File` or to a `FileDescriptor`. Whether or not
a file is available or may be created depends upon the underlying
platform.  Some platforms, in particular, allow a file to be opened
for writing by only one `FileOutputStream` (or other
file-writing object) at a time.  In such situations the constructors in
this class will fail if the file involved is already open.

`FileOutputStream` is meant for writing streams of raw bytes
such as image data. For writing streams of characters, consider using
`FileWriter`.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**Implementation requirements:** Subclasses are responsible for the cleanup of resources acquired by the subclass.
Subclasses requiring that resource cleanup take place after a stream becomes
unreachable should use `java.lang.ref.Cleaner` or some other mechanism.

**See also:** java.io.File

**See also:** java.io.FileDescriptor

**See also:** java.io.FileInputStream

**See also:** java.nio.file.Files#newOutputStream

**Since:** 1.0

## FileOutputStream.FileOutputStream(String)

```java
public FileOutputStream(String name) throws FileNotFoundException
```

Creates a file output stream to write to the file with the
specified name. If the file exists, it is truncated, otherwise a
new file is created. Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is
created to represent this file connection.

If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a `FileNotFoundException` is thrown.

Parameters:

- `name`: the system-dependent filename

**Implementation requirements:** Invoking this constructor with the parameter `name` is
equivalent to invoking new FileOutputStream(name, false).

Throws:

- `FileNotFoundException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileOutputStream.FileOutputStream(String, boolean)

```java
public FileOutputStream(String name, boolean append) throws FileNotFoundException
```

Creates a file output stream to write to the file with the specified
name. If the file exists, it is truncated unless the second
argument is `true`, in which case bytes will be written to the
end of the file rather than the beginning. If the file does not exist,
it is created. Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is created to represent this
file connection.

If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a `FileNotFoundException` is thrown.

Parameters:

- `name`: the system-dependent file name
- `append`: if `true`, then bytes will be written to the end of the file rather than the beginning

**Since:** 1.1

Throws:

- `FileNotFoundException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason.

## FileOutputStream.FileOutputStream(File)

```java
public FileOutputStream(File file) throws FileNotFoundException
```

Creates a file output stream to write to the file represented by
the specified `File` object.
If the file exists, it is truncated, otherwise a
new file is created. Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is
created to represent this file connection.

If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a `FileNotFoundException` is thrown.

Parameters:

- `file`: the file to be opened for writing.

**See also:** java.io.File#getPath()

Throws:

- `FileNotFoundException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileOutputStream.FileOutputStream(File, boolean)

```java
public FileOutputStream(File file, boolean append) throws FileNotFoundException
```

Creates a file output stream to write to the file represented by
the specified `File` object.
If the file exists, it is truncated unless the second
argument is `true`, in which case bytes will be written to the
end of the file rather than the beginning. If the file does not exist,
it is created. Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is created to represent this
file connection.

If the file exists but is a directory rather than a regular file, does
not exist but cannot be created, or cannot be opened for any other
reason then a `FileNotFoundException` is thrown.

Parameters:

- `file`: the file to be opened for writing.
- `append`: if `true`, then bytes will be written to the end of the file rather than the beginning

**See also:** java.io.File#getPath()

**Since:** 1.4

Throws:

- `FileNotFoundException`: if the file exists but is a directory rather than a regular file, does not exist but cannot be created, or cannot be opened for any other reason

## FileOutputStream.FileOutputStream(FileDescriptor)

```java
public FileOutputStream(FileDescriptor fdObj)
```

Creates a file output stream to write to the specified file
descriptor, which represents an existing connection to an actual
file in the file system.

If `fdObj` is null then a `NullPointerException`
is thrown.

This constructor does not throw an exception if `fdObj`
is invalid.
However, if the methods are invoked on the resulting stream to attempt
I/O on the stream, an `IOException` is thrown.

Parameters:

- `fdObj`: the file descriptor to be opened for writing

## FileOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified byte to this file output stream. Implements
the `write` method of `OutputStream`.

Parameters:

- `b`: the byte to be written.

Throws:

- `IOException`: if an I/O error occurs.

## FileOutputStream.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes `b.length` bytes from the specified byte array
to this file output stream.

Parameters:

- `b`: (inherited documentation)

Throws:

- `IOException`: (inherited documentation)

## FileOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified byte array
starting at offset `off` to this file output stream.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

Throws:

- `IOException`: if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## FileOutputStream.close()

```java
public void close() throws IOException
```

Closes this file output stream and releases any system resources
associated with this stream. This file output stream may no longer
be used for writing bytes.

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

- `IOException`: if an I/O error occurs.

## FileOutputStream.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the file descriptor associated with this stream.

**Returns:** the `FileDescriptor` object that represents
         the connection to the file in the file system being used
         by this `FileOutputStream` object.

**See also:** java.io.FileDescriptor

Throws:

- `IOException`: if an I/O error occurs.

## FileOutputStream.getChannel()

```java
public FileChannel getChannel()
```

Returns the unique FileChannel
object associated with this file output stream.

 The initial position of the returned channel will be equal to the
number of bytes written to the file so far unless this stream is in
append mode, in which case it will be equal to the size of the file.
Writing bytes to this stream will increment the channel's position
accordingly.  Changing the channel's position, either explicitly or by
writing, will change this stream's file position.

**Returns:** the file channel associated with this file output stream

**Since:** 1.4
