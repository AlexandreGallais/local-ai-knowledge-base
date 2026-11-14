---
title: "InflaterOutputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/InflaterOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InflaterOutputStream class (java.util.zip)

```java
public class InflaterOutputStream extends FilterOutputStream
```

Implements an output stream filter for uncompressing data stored in the
"deflate" compression format.

#### Decompressor Usage

An `InflaterOutputStream` created without
specifying a decompressor will create a decompressor
at construction time, and close the decompressor when the output stream
is closed.

If a decompressor is specified when creating a `InflaterOutputStream`, it is the
responsibility of the caller to close the
decompressor after closing the output stream.

**API note:** The `close` method should be called to release resources used by this
stream, either directly, or with the `try`-with-resources statement.

**Since:** 1.6

**See also:** InflaterInputStream

**See also:** DeflaterInputStream

**See also:** DeflaterOutputStream

## InflaterOutputStream.inf

```java
protected final Inflater inf
```

Decompressor for this stream.

## InflaterOutputStream.buf

```java
protected final byte[] buf
```

Output buffer for writing uncompressed data.

## InflaterOutputStream.InflaterOutputStream(OutputStream)

```java
public InflaterOutputStream(OutputStream out)
```

Creates a new output stream and decompressor with a
default buffer size.

The decompressor will be closed when this output stream
is closed.

Parameters:

- `out`: output stream to write the uncompressed data to

Throws:

- `NullPointerException`: if `out` is null

## InflaterOutputStream.InflaterOutputStream(OutputStream, Inflater)

```java
public InflaterOutputStream(OutputStream out, Inflater infl)
```

Creates a new output stream with the specified decompressor and a
default buffer size.

Closing this output stream
will not close the given
decompressor.

Parameters:

- `out`: output stream to write the uncompressed data to
- `infl`: decompressor ("inflater") for this stream

Throws:

- `NullPointerException`: if `out` or `infl` is null

## InflaterOutputStream.InflaterOutputStream(OutputStream, Inflater, int)

```java
public InflaterOutputStream(OutputStream out, Inflater infl, int bufLen)
```

Creates a new output stream with the specified decompressor and
buffer size.

Closing this output stream
will not close the given
decompressor.

Parameters:

- `out`: output stream to write the uncompressed data to
- `infl`: decompressor ("inflater") for this stream
- `bufLen`: decompression buffer size

Throws:

- `IllegalArgumentException`: if `bufLen <= 0`
- `NullPointerException`: if `out` or `infl` is null

## InflaterOutputStream.close()

```java
public void close() throws IOException
```

Writes any remaining uncompressed data to the output stream and closes
the underlying output stream.

Throws:

- `IOException`: if an I/O error occurs

## InflaterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this output stream, forcing any pending buffered output bytes to be
written.

Throws:

- `IOException`: if an I/O error occurs or this stream is already closed

## InflaterOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing uncompressed data to the output stream without closing
the underlying stream.  Use this method when applying multiple filters in
succession to the same output stream.

Throws:

- `IOException`: if an I/O error occurs or this stream is already closed

## InflaterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte to the uncompressed output stream.

Parameters:

- `b`: a single byte of compressed data to decompress and write to the output stream

Throws:

- `IOException`: if an I/O error occurs or this stream is already closed
- `ZipException`: if a compression (ZIP) format error occurs

## InflaterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the uncompressed output stream.

Parameters:

- `b`: buffer containing compressed data to decompress and write to the output stream
- `off`: starting offset of the compressed data within `b`
- `len`: number of bytes to decompress from `b`

Throws:

- `IndexOutOfBoundsException`: if `off < 0`, or if `len < 0`, or if `len > b.length - off`
- `IOException`: if an I/O error occurs or this stream is already closed
- `NullPointerException`: if `b` is null
- `ZipException`: if a compression (ZIP) format error occurs
