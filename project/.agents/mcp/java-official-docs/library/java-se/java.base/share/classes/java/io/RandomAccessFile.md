---
title: "RandomAccessFile class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/RandomAccessFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RandomAccessFile class (java.io)

```java
public class RandomAccessFile implements DataOutput, DataInput, Closeable
```

Instances of this class support both reading and writing to a
random access file. A random access file behaves like a large
array of bytes stored in the file system. There is a kind of cursor,
or index into the implied array, called the *file pointer*;
input operations read bytes starting at the file pointer and advance
the file pointer past the bytes read. If the random access file is
created in read/write mode, then output operations are also available;
output operations write bytes starting at the file pointer and advance
the file pointer past the bytes written. Output operations that write
past the current end of the implied array cause the array to be
extended. The file pointer can be read by the
`getFilePointer` method and set by the `seek`
method.

It is generally true of all the reading routines in this class that
if end-of-file is reached before the desired number of bytes has been
read, an `EOFException` (which is a kind of
`IOException`) is thrown. If any byte cannot be read for
any reason other than end-of-file, an `IOException` other
than `EOFException` is thrown. In particular, an
`IOException` may be thrown if the stream has been closed.

**Since:** 1.0

## RandomAccessFile.RandomAccessFile(String, String)

```java
public RandomAccessFile(String pathname, String mode) throws FileNotFoundException
```

Creates a random access file stream to read from, and optionally
to write to, a file with the specified pathname. If the file exists
it is opened; if it does not exist and write mode is specified, a
new file is created.
Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is created to represent the
connection to the file.

 The `mode` argument specifies the access mode with which the
file is to be opened.  The permitted values and their meanings are as
specified for the `RandomAccessFile(File,String)` constructor.

Parameters:

- `pathname`: the system-dependent pathname string
- `mode`: the access mode

Throws:

- `IllegalArgumentException`: if the mode argument is not equal to one of `"r"`, `"rw"`, `"rws"`, or `"rwd"`
- `FileNotFoundException`: if the mode is `"r"` but the given pathname string does not denote an existing regular file, or if the mode begins with `"rw"` but the given pathname string does not denote an existing, writable regular file and a new regular file of that pathname cannot be created, or if some other error occurs while opening or creating the file

## RandomAccessFile.RandomAccessFile(File, String)

```java
public RandomAccessFile(File file, String mode) throws FileNotFoundException
```

Creates a random access file stream to read from, and optionally
to write to, the file specified by the `File` argument. If
the file exists it is opened; if it does not exist and write mode
is specified, a new file is created.
Symbolic links
are automatically redirected to the *target* of the link.
A new `FileDescriptor` object is created to represent the
connection to the file.

The `mode` argument specifies the access mode
in which the file is to be opened.  The permitted values and their
meanings are:

Access mode permitted values and meanings

ValueMeaning

`"r"`
     Open for reading only. Invoking any of the `write`
    methods of the resulting object will cause an
    `java.io.IOException` to be thrown.
`"rw"`
     Open for reading and writing.  If the file does not already
    exist then an attempt will be made to create it.
`"rws"`
     Open for reading and writing, as with `"rw"`, and also
    require that every update to the file's content or metadata be
    written synchronously to the underlying storage device.
`"rwd"`
     Open for reading and writing, as with `"rw"`, and also
    require that every update to the file's content be written
    synchronously to the underlying storage device.

The `"rws"` and `"rwd"` modes work much like the force(boolean) method of
the `java.nio.channels.FileChannel` class, passing arguments of
`true` and `false`, respectively, except that they always
apply to every I/O operation and are therefore often more efficient.  If
the file resides on a local storage device then when an invocation of a
method of this class returns it is guaranteed that all changes made to
the file by that invocation will have been written to that device.  This
is useful for ensuring that critical information is not lost in the
event of a system crash.  If the file does not reside on a local device
then no such guarantee is made.

The `"rwd"` mode can be used to reduce the number of I/O
operations performed.  Using `"rwd"` only requires updates to the
file's content to be written to storage; using `"rws"` requires
updates to both the file's content and its metadata to be written, which
generally requires at least one more low-level I/O operation.

Parameters:

- `file`: the file object
- `mode`: the access mode, as described above

**See also:** java.nio.channels.FileChannel#force(boolean)

Throws:

- `IllegalArgumentException`: if the mode argument is not equal to one of `"r"`, `"rw"`, `"rws"`, or `"rwd"`
- `FileNotFoundException`: if the mode is `"r"` but the given file object does not denote an existing regular file, or if the mode begins with `"rw"` but the given file object does not denote an existing, writable regular file and a new regular file of that pathname cannot be created, or if some other error occurs while opening or creating the file

## RandomAccessFile.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the opaque file descriptor object associated with this
stream.

**Returns:** the file descriptor object associated with this stream.

**See also:** java.io.FileDescriptor

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.getChannel()

```java
public final FileChannel getChannel()
```

Returns the unique FileChannel
object associated with this file.

 The position of the returned channel will always be equal to
this object's file-pointer offset as returned by the getFilePointer method.  Changing this object's
file-pointer offset, whether explicitly or by reading or writing bytes,
will change the position of the channel, and vice versa.  Changing the
file's length via this object will change the length seen via the file
channel, and vice versa.

**Returns:** the file channel associated with this file

**Since:** 1.4

## RandomAccessFile.read()

```java
public int read() throws IOException
```

Reads a byte of data from this file. The byte is returned as an
integer in the range 0 to 255 (`0x00-0x0ff`). This
method blocks if no input is yet available.

Although `RandomAccessFile` is not a subclass of
`InputStream`, this method behaves in exactly the same
way as the `InputStream.read()` method of
`InputStream`.

**Returns:** the next byte of data, or `-1` if the end of the
            file has been reached.

Throws:

- `IOException`: if an I/O error occurs. Not thrown if end-of-file has been reached.

## RandomAccessFile.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this file into an
array of bytes. This method blocks until at least one byte of input
is available.

Although `RandomAccessFile` is not a subclass of
`InputStream`, this method behaves in exactly the
same way as the int, int) method of
`InputStream`.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset in array `b` at which the data is written.
- `len`: the maximum number of bytes read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            the file has been reached.

Throws:

- `IOException`: If the first byte cannot be read for any reason other than end of file, or if the random access file has been closed, or if some other I/O error occurs.
- `NullPointerException`: If `b` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`

## RandomAccessFile.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads up to `b.length` bytes of data from this file
into an array of bytes. This method blocks until at least one byte
of input is available.

Although `RandomAccessFile` is not a subclass of
`InputStream`, this method behaves in exactly the
same way as the `InputStream.read(byte[])` method of
`InputStream`.

Parameters:

- `b`: the buffer into which the data is read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            this file has been reached.

Throws:

- `IOException`: If the first byte cannot be read for any reason other than end of file, or if the random access file has been closed, or if some other I/O error occurs.
- `NullPointerException`: If `b` is `null`.

## RandomAccessFile.readFully(byte[])

```java
public final void readFully(byte[] b) throws IOException
```

Reads `b.length` bytes from this file into the byte
array, starting at the current file pointer. This method reads
repeatedly from the file until the requested number of bytes are
read. This method blocks until the requested number of bytes are
read, the end of the stream is detected, or an exception is thrown.

Parameters:

- `b`: the buffer into which the data is read.

Throws:

- `NullPointerException`: if `b` is `null`.
- `EOFException`: if this file reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readFully(byte[], int, int)

```java
public final void readFully(byte[] b, int off, int len) throws IOException
```

Reads exactly `len` bytes from this file into the byte
array, starting at the current file pointer. This method reads
repeatedly from the file until the requested number of bytes are
read. This method blocks until the requested number of bytes are
read, the end of the stream is detected, or an exception is thrown.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset into the data array `b`.
- `len`: the number of bytes to read.

Throws:

- `NullPointerException`: if `b` is `null`.
- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `b.length - off`.
- `EOFException`: if this file reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.skipBytes(int)

```java
public int skipBytes(int n) throws IOException
```

Attempts to skip over `n` bytes of input discarding the
skipped bytes.

This method may skip over some smaller number of bytes, possibly zero.
This may result from any of a number of conditions; reaching end of
file before `n` bytes have been skipped is only one
possibility. This method never throws an `EOFException`.
The actual number of bytes skipped is returned.  If `n`
is negative, no bytes are skipped.

Parameters:

- `n`: the number of bytes to be skipped.

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified byte to this file. The write starts at
the current file pointer.

Parameters:

- `b`: the `byte` to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes `b.length` bytes from the specified byte array
to this file, starting at the current file pointer.

Parameters:

- `b`: the data.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified byte array
starting at offset `off` to this file.

Parameters:

- `b`: the data.
- `off`: the start offset in the data.
- `len`: the number of bytes to write.

Throws:

- `IOException`: if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## RandomAccessFile.getFilePointer()

```java
public native long getFilePointer() throws IOException
```

Returns the current offset in this file.

**Returns:** the offset from the beginning of the file, in bytes,
            at which the next read or write occurs.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.seek(long)

```java
public void seek(long pos) throws IOException
```

Sets the file-pointer offset, measured from the beginning of this
file, at which the next read or write occurs.  The offset may be
set beyond the end of the file. Setting the offset beyond the end
of the file does not change the file length.  The file length will
change only by writing after the offset has been set beyond the end
of the file.

Parameters:

- `pos`: the offset position, measured in bytes from the beginning of the file, at which to set the file pointer.

Throws:

- `IOException`: if `pos` is less than `0` or if an I/O error occurs.

## RandomAccessFile.length()

```java
public long length() throws IOException
```

Returns the length of this file.

**Returns:** the length of this file, measured in bytes.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.setLength(long)

```java
public void setLength(long newLength) throws IOException
```

Sets the length of this file.

 If the present length of the file as returned by the
length method is greater than the desired length
of the file specified by the `newLength` argument, then the file
will be truncated.

 If the present length of the file is smaller than the desired length,
then the file will be extended.  The contents of the extended portion of
the file are not defined.

 If the present length of the file is equal to the desired length,
then the file and its length will be unchanged.

 In all cases, after this method returns, the file offset as returned
by the getFilePointer method will equal the
minimum of the desired length and the file offset before this method was
called, even if the length is unchanged.  In other words, this method
constrains the file offset to the closed interval `[0,newLength]`.

Parameters:

- `newLength`: The desired length of the file

**Since:** 1.2

Throws:

- `IOException`: If the argument is negative or if some other I/O error occurs
