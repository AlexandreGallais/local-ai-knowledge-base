---
title: "InflaterInputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/InflaterInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InflaterInputStream class (java.util.zip)

```java
public class InflaterInputStream extends FilterInputStream
```

This class implements a stream filter for uncompressing data in the
"deflate" compression format. It is also used as the basis for other
decompression filters, such as GZIPInputStream.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

#### Decompressor Usage

An `InflaterInputStream` created without
specifying a decompressor will create a decompressor
at construction time, and close the decompressor when the input stream
is closed.

If a decompressor is specified when creating a `InflaterInputStream`, it is the
responsibility of the caller to close the
decompressor after closing the input stream.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**See also:** Inflater

**Since:** 1.1

## InflaterInputStream.inf

```java
protected Inflater inf
```

Decompressor for this stream.

## InflaterInputStream.buf

```java
protected byte[] buf
```

Input buffer for decompression.

## InflaterInputStream.len

```java
protected int len
```

The total number of bytes read into the input buffer.

## InflaterInputStream.InflaterInputStream(InputStream, Inflater, int)

```java
public InflaterInputStream(InputStream in, Inflater inf, int size)
```

Creates a new input stream with the specified decompressor and
buffer size.

Closing this input stream
will not close the given
decompressor.

Parameters:

- `in`: the input stream
- `inf`: the decompressor ("inflater")
- `size`: the input buffer size

Throws:

- `IllegalArgumentException`: if `size <= 0`

## InflaterInputStream.InflaterInputStream(InputStream, Inflater)

```java
public InflaterInputStream(InputStream in, Inflater inf)
```

Creates a new input stream with the specified decompressor and a
default buffer size.

Closing this input stream
will not close the given
decompressor.

Parameters:

- `in`: the input stream
- `inf`: the decompressor ("inflater")

## InflaterInputStream.InflaterInputStream(InputStream)

```java
public InflaterInputStream(InputStream in)
```

Creates a new input stream and decompressor with a
default buffer size.

The decompressor will be closed when this input stream
is closed.

Parameters:

- `in`: the input stream

## InflaterInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of uncompressed data. This method will block until
enough input is available for decompression.

**Returns:** the byte read, or -1 if end of compressed input is reached

Throws:

- `IOException`: if an I/O error has occurred

## InflaterInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads uncompressed data into an array of bytes, returning the number of inflated
bytes. If `len` is not zero, the method will block until some input can be
decompressed; otherwise, no bytes are read and `0` is returned.

If this method returns a nonzero integer *n* then `buf[off]`
through `buf[off+`*n*`-1]` contain the uncompressed
data.  The content of elements `buf[off+`*n*`]` through
`buf[off+`*len*`-1]` is undefined, contrary to the
specification of the InputStream superclass,
so an implementation is free to modify these elements during the inflate
operation. If this method returns `-1` or throws an exception then
the content of `buf[off]` through `buf[off+`*len*`-1]` is undefined.

Parameters:

- `b`: the buffer into which the data is read
- `off`: the start offset in the destination array `b`
- `len`: the maximum number of bytes read

**Returns:** the actual number of bytes inflated, or -1 if the end of the
        compressed input is reached or a preset dictionary is needed

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`
- `ZipException`: if a ZIP format error has occurred
- `IOException`: if an I/O error has occurred

## InflaterInputStream.available()

```java
public int available() throws IOException
```

Returns 0 after EOF has been reached, otherwise always return 1.

Programs should not count on this method to return the actual number
of bytes that could be read without blocking.

**Returns:** 1 before EOF and 0 after EOF.

Throws:

- `IOException`: if an I/O error occurs.

## InflaterInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips specified number of bytes of uncompressed data.
This method may block until the specified number of bytes are skipped
or end of stream is reached.

Parameters:

- `n`: the number of bytes to skip. If `n` is zero then no bytes are skipped.

**Implementation note:** This method skips at most `Integer.MAX_VALUE` bytes.

**Returns:** the actual number of bytes skipped, which might be zero

Throws:

- `IOException`: if an I/O error occurs or if this stream is already closed
- `IllegalArgumentException`: if `n < 0`

## InflaterInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.

Throws:

- `IOException`: if an I/O error has occurred

## InflaterInputStream.fill()

```java
protected void fill() throws IOException
```

Fills input buffer with more data to decompress.

**Implementation requirements:** This method will read up to `buf`.length bytes into the input
buffer, `buf`, starting at element `0`. The `len`
field will be set to the number of bytes read.

Throws:

- `IOException`: if an I/O error has occurred
- `EOFException`: if the end of input stream has been reached unexpectedly

## InflaterInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the `mark` and
`reset` methods. The `markSupported`
method of `InflaterInputStream` returns
`false`.

**Returns:** a `boolean` indicating if this stream type supports
         the `mark` and `reset` methods.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.InputStream#reset()

## InflaterInputStream.mark(int)

```java
public void mark(int readlimit)
```

Marks the current position in this input stream.

Parameters:

- `readlimit`: the maximum limit of bytes that can be read before the mark position becomes invalid.

**Implementation requirements:** The `mark` method of `InflaterInputStream`
does nothing.

**See also:** java.io.InputStream#reset()

## InflaterInputStream.reset()

```java
public void reset() throws IOException
```

Repositions this stream to the position at the time the
`mark` method was last called on this input stream.

**Implementation requirements:** The method `reset` for class
`InflaterInputStream` does nothing except throw an
`IOException`.

**See also:** java.io.InputStream#mark(int)

**See also:** java.io.IOException

Throws:

- `IOException`: if this method is invoked.
