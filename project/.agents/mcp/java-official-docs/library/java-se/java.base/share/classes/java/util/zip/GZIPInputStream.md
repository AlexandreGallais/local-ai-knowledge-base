---
title: "GZIPInputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/GZIPInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GZIPInputStream class (java.util.zip)

```java
public class GZIPInputStream extends InflaterInputStream
```

This class implements a stream filter for reading compressed data in
the GZIP file format.

**See also:** InflaterInputStream

**Since:** 1.1

## GZIPInputStream.crc

```java
protected CRC32 crc
```

CRC-32 for uncompressed data.

## GZIPInputStream.eos

```java
protected boolean eos
```

Indicates end of input stream.

## GZIPInputStream.GZIPInputStream(InputStream, int)

```java
public GZIPInputStream(InputStream in, int size) throws IOException
```

Creates a new input stream with the specified buffer size.

Parameters:

- `in`: the input stream
- `size`: the input buffer size

Throws:

- `ZipException`: if a GZIP format error has occurred or the compression method used is unsupported
- `NullPointerException`: if `in` is null
- `IOException`: if an I/O error has occurred
- `IllegalArgumentException`: if `size <= 0`

## GZIPInputStream.GZIPInputStream(InputStream)

```java
public GZIPInputStream(InputStream in) throws IOException
```

Creates a new input stream with a default buffer size.

Parameters:

- `in`: the input stream

Throws:

- `ZipException`: if a GZIP format error has occurred or the compression method used is unsupported
- `NullPointerException`: if `in` is null
- `IOException`: if an I/O error has occurred

## GZIPInputStream.read(byte[], int, int)

```java
public int read(byte[] buf, int off, int len) throws IOException
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

- `buf`: the buffer into which the data is read
- `off`: the start offset in the destination array `buf`
- `len`: the maximum number of bytes read

**Returns:** the actual number of bytes inflated, or -1 if the end of the
         compressed input stream is reached

Throws:

- `NullPointerException`: If `buf` is `null`.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `buf.length - off`
- `ZipException`: if the compressed input data is corrupt.
- `IOException`: if an I/O error has occurred.

## GZIPInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.

Throws:

- `IOException`: if an I/O error has occurred

## GZIPInputStream.GZIP_MAGIC

```java
public static final int GZIP_MAGIC
```

GZIP header magic number.
