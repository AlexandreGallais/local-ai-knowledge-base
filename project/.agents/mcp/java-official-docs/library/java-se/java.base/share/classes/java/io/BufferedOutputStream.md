---
title: "BufferedOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/BufferedOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BufferedOutputStream class (java.io)

```java
public class BufferedOutputStream extends FilterOutputStream
```

The class implements a buffered output stream. By setting up such
an output stream, an application can write bytes to the underlying
output stream without necessarily causing a call to the underlying
system for each byte written.

**API note:** Once wrapped in a `BufferedOutputStream`, the underlying
`OutputStream` should not be used directly nor wrapped with
another stream.

**Since:** 1.0

## BufferedOutputStream.buf

```java
protected byte[] buf
```

The internal buffer where data is stored.

## BufferedOutputStream.count

```java
protected int count
```

The number of valid bytes in the buffer. This value is always
in the range `0` through `buf.length`; elements
`buf[0]` through `buf[count-1]` contain valid
byte data.

## BufferedOutputStream.BufferedOutputStream(OutputStream)

```java
public BufferedOutputStream(OutputStream out)
```

Creates a new buffered output stream to write data to the
specified underlying output stream.

Parameters:

- `out`: the underlying output stream.

## BufferedOutputStream.BufferedOutputStream(OutputStream, int)

```java
public BufferedOutputStream(OutputStream out, int size)
```

Creates a new buffered output stream to write data to the
specified underlying output stream with the specified buffer
size.

Parameters:

- `out`: the underlying output stream.
- `size`: the buffer size.

Throws:

- `IllegalArgumentException`: if size <= 0.

## BufferedOutputStream.write(int)

```java
public synchronized void write(int b) throws IOException
```

Writes the specified byte to this buffered output stream.

Parameters:

- `b`: the byte to be written.

Throws:

- `IOException`: if an I/O error occurs.

## BufferedOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified byte array
starting at offset `off` to this buffered output stream.

 Ordinarily this method stores bytes from the given array into this
stream's buffer, flushing the buffer to the underlying output stream as
needed.  If the requested length is at least as large as this stream's
buffer, however, then this method will flush the buffer and write the
bytes directly to the underlying output stream.  Thus redundant
`BufferedOutputStream`s will not copy data unnecessarily.

Parameters:

- `b`: the data.
- `off`: the start offset in the data.
- `len`: the number of bytes to write.

Throws:

- `IOException`: if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## BufferedOutputStream.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this buffered output stream. This forces any buffered
output bytes to be written out to the underlying output stream.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.
