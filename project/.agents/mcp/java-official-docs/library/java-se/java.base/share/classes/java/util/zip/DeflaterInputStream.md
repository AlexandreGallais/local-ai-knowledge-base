---
title: "DeflaterInputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/DeflaterInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DeflaterInputStream class (java.util.zip)

```java
public class DeflaterInputStream extends FilterInputStream
```

Implements an input stream filter for compressing data in the "deflate"
compression format.

#### Compressor Usage

A `DeflaterInputStream` created without
specifying a compressor will create a compressor
at construction time, and close the compressor when the input stream
is closed.

If a compressor is specified when creating a `DeflaterInputStream`, it is the
responsibility of the caller to close the
compressor after closing the input stream.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**Since:** 1.6

**See also:** DeflaterOutputStream

**See also:** InflaterOutputStream

**See also:** InflaterInputStream

## DeflaterInputStream.def

```java
protected final Deflater def
```

Compressor for this stream.

## DeflaterInputStream.buf

```java
protected final byte[] buf
```

Input buffer for reading compressed data.

## DeflaterInputStream.DeflaterInputStream(InputStream)

```java
public DeflaterInputStream(InputStream in)
```

Creates a new input stream and compressor with the
default compression level and a default buffer size.

The compressor will be closed when this input stream
is closed.

Parameters:

- `in`: input stream to read the uncompressed data to

Throws:

- `NullPointerException`: if `in` is null

## DeflaterInputStream.DeflaterInputStream(InputStream, Deflater)

```java
public DeflaterInputStream(InputStream in, Deflater defl)
```

Creates a new input stream with the specified compressor and a
default buffer size.

Closing this input stream
will not close the given
compressor.

Parameters:

- `in`: input stream to read the uncompressed data to
- `defl`: compressor ("deflater") for this stream

Throws:

- `NullPointerException`: if `in` or `defl` is null

## DeflaterInputStream.DeflaterInputStream(InputStream, Deflater, int)

```java
public DeflaterInputStream(InputStream in, Deflater defl, int bufLen)
```

Creates a new input stream with the specified compressor and buffer
size.

Closing this input stream
will not close the given
compressor.

Parameters:

- `in`: input stream to read the uncompressed data to
- `defl`: compressor ("deflater") for this stream
- `bufLen`: compression buffer size

Throws:

- `IllegalArgumentException`: if `bufLen <= 0`
- `NullPointerException`: if `in` or `defl` is null

## DeflaterInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and its underlying input stream, discarding
any pending uncompressed data.

Throws:

- `IOException`: if an I/O error occurs

## DeflaterInputStream.read()

```java
public int read() throws IOException
```

Reads a single byte of compressed data from the input stream.
This method will block until some input can be read and compressed.

**Returns:** a single byte of compressed data, or -1 if the end of the
uncompressed input stream is reached

Throws:

- `IOException`: if an I/O error occurs or if this stream is already closed

## DeflaterInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads compressed data into a byte array.
This method will block until some input can be read and compressed.

Parameters:

- `b`: buffer into which the data is read
- `off`: starting offset of the data within `b`
- `len`: maximum number of compressed bytes to read into `b`

**Returns:** the actual number of bytes read, or -1 if the end of the
uncompressed input stream is reached

Throws:

- `NullPointerException`: if `b` is null
- `IndexOutOfBoundsException`: if `len > b.length - off`
- `IOException`: if an I/O error occurs or if this input stream is already closed

## DeflaterInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards data from the input stream.
This method may block until the specified number of bytes are skipped
or end of stream is reached.

Parameters:

- `n`: number of bytes to be skipped. If `n` is zero then no bytes are skipped.

**Implementation note:** This method skips at most `Integer.MAX_VALUE` bytes.

**Returns:** the actual number of bytes skipped, which might be zero

Throws:

- `IOException`: if an I/O error occurs or if this stream is already closed
- `IllegalArgumentException`: if `n < 0`

## DeflaterInputStream.available()

```java
public int available() throws IOException
```

Returns 0 after EOF has been reached, otherwise always return 1.

Programs should not count on this method to return the actual number
of bytes that could be read without blocking

**Returns:** zero after the end of the underlying input stream has been
reached, otherwise always returns 1

Throws:

- `IOException`: if an I/O error occurs or if this stream is already closed

## DeflaterInputStream.markSupported()

```java
public boolean markSupported()
```

Always returns `false` because this input stream does not support
the mark() and reset() methods.

**Returns:** false, always

## DeflaterInputStream.mark(int)

```java
public void mark(int limit)
```

*This operation is not supported*.

Parameters:

- `limit`: maximum bytes that can be read before invalidating the position marker

## DeflaterInputStream.reset()

```java
public void reset() throws IOException
```

*This operation is not supported*.

Throws:

- `IOException`: always thrown
