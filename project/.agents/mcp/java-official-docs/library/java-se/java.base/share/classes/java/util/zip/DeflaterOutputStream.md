---
title: "DeflaterOutputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/DeflaterOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DeflaterOutputStream class (java.util.zip)

```java
public class DeflaterOutputStream extends FilterOutputStream
```

This class implements an output stream filter for compressing data in
the "deflate" compression format. It is also used as the basis for other
types of compression filters, such as GZIPOutputStream.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

#### Compressor Usage

A `DeflaterOutputStream` created without
specifying a compressor will create a compressor
at construction time, and close the compressor when the output stream
is closed.

If a compressor is specified when creating a `DeflaterOutputStream`, it is the
responsibility of the caller to close the
compressor after closing the output stream.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**See also:** Deflater

**Since:** 1.1

## DeflaterOutputStream.def

```java
protected Deflater def
```

Compressor for this stream.

## DeflaterOutputStream.buf

```java
protected byte[] buf
```

Output buffer for writing compressed data.

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater, int, boolean)

```java
public DeflaterOutputStream(OutputStream out, Deflater def, int size, boolean syncFlush)
```

Creates a new output stream with the specified compressor,
buffer size and flush mode.

Closing this output stream
will not close the given
compressor.

Parameters:

- `out`: the output stream
- `def`: the compressor ("deflater")
- `size`: the output buffer size
- `syncFlush`: if `true` the `flush()` method of this instance flushes the compressor with flush mode `Deflater.SYNC_FLUSH` before flushing the output stream, otherwise only flushes the output stream

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if `size <= 0`

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater, int)

```java
public DeflaterOutputStream(OutputStream out, Deflater def, int size)
```

Creates a new output stream with the specified compressor and
buffer size.

The new output stream instance is created as if by invoking
the 4-argument constructor `DeflaterOutputStream(out, def, size, false)`.

Closing this output stream
will not close the given
compressor.

Parameters:

- `out`: the output stream
- `def`: the compressor ("deflater")
- `size`: the output buffer size

Throws:

- `IllegalArgumentException`: if `size <= 0`

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater, boolean)

```java
public DeflaterOutputStream(OutputStream out, Deflater def, boolean syncFlush)
```

Creates a new output stream with the specified compressor, flush
mode and a default buffer size.

Closing this output stream
will not close the given
compressor.

Parameters:

- `out`: the output stream
- `def`: the compressor ("deflater")
- `syncFlush`: if `true` the `flush()` method of this instance flushes the compressor with flush mode `Deflater.SYNC_FLUSH` before flushing the output stream, otherwise only flushes the output stream

**Since:** 1.7

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater)

```java
public DeflaterOutputStream(OutputStream out, Deflater def)
```

Creates a new output stream with the specified compressor and
a default buffer size.

The new output stream instance is created as if by invoking
the 3-argument constructor `DeflaterOutputStream(out, def, false)`.

Closing this output stream
will not close the given
compressor.

Parameters:

- `out`: the output stream
- `def`: the compressor ("deflater")

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, boolean)

```java
public DeflaterOutputStream(OutputStream out, boolean syncFlush)
```

Creates a new output stream and compressor with the
default compression level, a default buffer size and
the specified flush mode.

The compressor will be closed when this output stream
is closed.

Parameters:

- `out`: the output stream
- `syncFlush`: if `true` the `flush()` method of this instance flushes the compressor with flush mode `Deflater.SYNC_FLUSH` before flushing the output stream, otherwise only flushes the output stream

**Since:** 1.7

## DeflaterOutputStream.DeflaterOutputStream(OutputStream)

```java
public DeflaterOutputStream(OutputStream out)
```

Creates a new output stream and compressor with the
default compression level and a default buffer size.

The new output stream instance is created as if by invoking
the 2-argument constructor `DeflaterOutputStream(out, false)`.

The compressor will be closed when this output stream
is closed.

Parameters:

- `out`: the output stream

## DeflaterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte to the compressed output stream. This method will
block until the byte can be written.

Parameters:

- `b`: the byte to be written

Throws:

- `IOException`: if an I/O error has occurred

## DeflaterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the compressed output stream. This
method will block until all the bytes are written.

Parameters:

- `b`: the data to be written
- `off`: the start offset of the data
- `len`: the length of the data

Throws:

- `IOException`: if an I/O error has occurred

## DeflaterOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing compressed data to the output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.

Throws:

- `IOException`: if an I/O error has occurred

## DeflaterOutputStream.close()

```java
public void close() throws IOException
```

Writes remaining compressed data to the output stream and closes the
underlying stream.

Throws:

- `IOException`: if an I/O error has occurred

## DeflaterOutputStream.deflate()

```java
protected void deflate() throws IOException
```

Writes next block of compressed data to the output stream.

Throws:

- `IOException`: if an I/O error has occurred

## DeflaterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes the compressed output stream.

If Deflater, int, boolean) syncFlush is `true` when this compressed output stream is
constructed, this method first flushes the underlying `compressor`
with the flush mode `Deflater.SYNC_FLUSH` to force
all pending data to be flushed out to the output stream and then
flushes the output stream. Otherwise this method only flushes the
output stream without flushing the `compressor`.

**Since:** 1.7

Throws:

- `IOException`: if an I/O error has occurred
