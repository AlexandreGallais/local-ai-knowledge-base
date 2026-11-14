---
title: "DataInputStream class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/DataInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DataInputStream class (java.io)

```java
public class DataInputStream extends FilterInputStream implements DataInput
```

A data input stream lets an application read primitive Java data
types from an underlying input stream in a machine-independent
way. An application uses a data output stream to write data that
can later be read by a data input stream.

A DataInputStream is not safe for use by multiple concurrent
threads. If a DataInputStream is to be used by more than one
thread then access to the data input stream should be controlled
by appropriate synchronization.

**See also:** java.io.DataOutputStream

**Since:** 1.0

## DataInputStream.DataInputStream(InputStream)

```java
public DataInputStream(InputStream in)
```

Creates a DataInputStream that uses the specified
underlying InputStream.

Parameters:

- `in`: the specified input stream

## DataInputStream.read(byte[])

```java
public final int read(byte[] b) throws IOException
```

Reads some number of bytes from the contained input stream and
stores them into the buffer array `b`. The number of
bytes actually read is returned as an integer. This method blocks
until input data is available, end of file is detected, or an
exception is thrown.

If `b` is null, a `NullPointerException` is
thrown. If the length of `b` is zero, then no bytes are
read and `0` is returned; otherwise, there is an attempt
to read at least one byte. If no byte is available because the
stream is at end of file, the value `-1` is returned;
otherwise, at least one byte is read and stored into `b`.

The first byte read is stored into element `b[0]`, the
next one into `b[1]`, and so on. The number of bytes read
is, at most, equal to the length of `b`. Let `k`
be the number of bytes actually read; these bytes will be stored in
elements `b[0]` through `b[k-1]`, leaving
elements `b[k]` through `b[b.length-1]`
unaffected.

The `read(b)` method has the same effect as:

```java
read(b, 0, b.length)
```

Parameters:

- `b`: the buffer into which the data is read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end
            of the stream has been reached.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.InputStream#read(byte[], int, int)

Throws:

- `IOException`: if the first byte cannot be read for any reason other than end of file, the stream has been closed and the underlying input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.read(byte[], int, int)

```java
public final int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from the contained
input stream into an array of bytes.  An attempt is made to read
as many as `len` bytes, but a smaller number may be read,
possibly zero. The number of bytes actually read is returned as an
integer.

 This method blocks until input data is available, end of file is
detected, or an exception is thrown.

 If `len` is zero, then no bytes are read and
`0` is returned; otherwise, there is an attempt to read at
least one byte. If no byte is available because the stream is at end of
file, the value `-1` is returned; otherwise, at least one
byte is read and stored into `b`.

 The first byte read is stored into element `b[off]`, the
next one into `b[off+1]`, and so on. The number of bytes read
is, at most, equal to `len`. Let *k* be the number of
bytes actually read; these bytes will be stored in elements
`b[off]` through `b[off+`*k*`-1]`,
leaving elements `b[off+`*k*`]` through
`b[off+len-1]` unaffected.

 In every case, elements `b[0]` through
`b[off]` and elements `b[off+len]` through
`b[b.length-1]` are unaffected.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset in the destination array `b`
- `len`: the maximum number of bytes read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end
            of the stream has been reached.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.InputStream#read(byte[], int, int)

Throws:

- `NullPointerException`: If `b` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`
- `IOException`: if the first byte cannot be read for any reason other than end of file, the stream has been closed and the underlying input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readFully(byte[])

```java
public final void readFully(byte[] b) throws IOException
```

See the general contract of the `readFully`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

Parameters:

- `b`: the buffer into which the data is read.

**See also:** java.io.FilterInputStream#in

Throws:

- `NullPointerException`: if `b` is `null`.
- `EOFException`: if this input stream reaches the end before reading all the bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readFully(byte[], int, int)

```java
public final void readFully(byte[] b, int off, int len) throws IOException
```

See the general contract of the `readFully`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset in the data array `b`.
- `len`: the number of bytes to read.

**See also:** java.io.FilterInputStream#in

Throws:

- `NullPointerException`: if `b` is `null`.
- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `b.length - off`.
- `EOFException`: if this input stream reaches the end before reading all the bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.skipBytes(int)

```java
public final int skipBytes(int n) throws IOException
```

See the general contract of the `skipBytes`
method of `DataInput`.

Bytes for this operation are read from the contained
input stream.

Parameters:

- `n`: the number of bytes to be skipped.

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: if the contained input stream does not support seek, or the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readBoolean()

```java
public final boolean readBoolean() throws IOException
```

See the general contract of the `readBoolean`
method of `DataInput`.

Bytes for this operation are read from the contained
input stream.

**Returns:** the `boolean` value read.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream has reached the end.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readByte()

```java
public final byte readByte() throws IOException
```

See the general contract of the `readByte`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next byte of this input stream as a signed 8-bit
            `byte`.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream has reached the end.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readUnsignedByte()

```java
public final int readUnsignedByte() throws IOException
```

See the general contract of the `readUnsignedByte`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next byte of this input stream, interpreted as an
            unsigned 8-bit number.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream has reached the end.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readShort()

```java
public final short readShort() throws IOException
```

See the general contract of the `readShort`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next two bytes of this input stream, interpreted as a
            signed 16-bit number.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream reaches the end before reading two bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readUnsignedShort()

```java
public final int readUnsignedShort() throws IOException
```

See the general contract of the `readUnsignedShort`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next two bytes of this input stream, interpreted as an
            unsigned 16-bit integer.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream reaches the end before reading two bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readChar()

```java
public final char readChar() throws IOException
```

See the general contract of the `readChar`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next two bytes of this input stream, interpreted as a
            `char`.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream reaches the end before reading two bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readInt()

```java
public final int readInt() throws IOException
```

See the general contract of the `readInt`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next four bytes of this input stream, interpreted as an
            `int`.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream reaches the end before reading four bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readLong()

```java
public final long readLong() throws IOException
```

See the general contract of the `readLong`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next eight bytes of this input stream, interpreted as a
            `long`.

**See also:** java.io.FilterInputStream#in

Throws:

- `EOFException`: if this input stream reaches the end before reading eight bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readFloat()

```java
public final float readFloat() throws IOException
```

See the general contract of the `readFloat`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next four bytes of this input stream, interpreted as a
            `float`.

**See also:** java.io.DataInputStream#readInt()

**See also:** java.lang.Float#intBitsToFloat(int)

Throws:

- `EOFException`: if this input stream reaches the end before reading four bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readDouble()

```java
public final double readDouble() throws IOException
```

See the general contract of the `readDouble`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** the next eight bytes of this input stream, interpreted as a
            `double`.

**See also:** java.io.DataInputStream#readLong()

**See also:** java.lang.Double#longBitsToDouble(long)

Throws:

- `EOFException`: if this input stream reaches the end before reading eight bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.

## DataInputStream.readLine()

```java
public final String readLine() throws IOException
```

See the general contract of the `readLine`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Deprecated:** This method does not properly convert bytes to characters.
As of JDK 1.1, the preferred way to read lines of text is via the
`BufferedReader.readLine()` method.  Programs that use the
`DataInputStream` class to read lines can be converted to use
the `BufferedReader` class by replacing code of the form:

```java
    DataInputStream d = new DataInputStream(in);
```

with:

```java
    BufferedReader d
         = new BufferedReader(new InputStreamReader(in));
```

**Returns:** the next line of text from this input stream.

**See also:** java.io.BufferedReader#readLine()

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: if an I/O error occurs.

## DataInputStream.readUTF()

```java
public final String readUTF() throws IOException
```

See the general contract of the `readUTF`
method of `DataInput`.

Bytes
for this operation are read from the contained
input stream.

**Returns:** a Unicode string.

**See also:** java.io.DataInputStream#readUTF(java.io.DataInput)

Throws:

- `EOFException`: if this input stream reaches the end before reading all the bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.
- `UTFDataFormatException`: if the bytes do not represent a valid modified UTF-8 encoding of a string.
