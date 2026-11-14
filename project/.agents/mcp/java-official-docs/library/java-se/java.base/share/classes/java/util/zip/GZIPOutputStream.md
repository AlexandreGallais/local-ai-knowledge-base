---
title: "GZIPOutputStream class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/GZIPOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GZIPOutputStream class (java.util.zip)

```java
public class GZIPOutputStream extends DeflaterOutputStream
```

This class implements a stream filter for writing compressed data in
the GZIP file format.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**Since:** 1.1

## GZIPOutputStream.crc

```java
protected CRC32 crc
```

CRC-32 of uncompressed data.

## GZIPOutputStream.GZIPOutputStream(OutputStream, int)

```java
public GZIPOutputStream(OutputStream out, int size) throws IOException
```

Creates a new output stream with the specified buffer size.

The new output stream instance is created as if by invoking
the 3-argument constructor GZIPOutputStream(out, size, false).

Parameters:

- `out`: the output stream
- `size`: the output buffer size

Throws:

- `IOException`: If an I/O error has occurred.
- `IllegalArgumentException`: if `size <= 0`

## GZIPOutputStream.GZIPOutputStream(OutputStream, int, boolean)

```java
public GZIPOutputStream(OutputStream out, int size, boolean syncFlush) throws IOException
```

Creates a new output stream with the specified buffer size and
flush mode.

Parameters:

- `out`: the output stream
- `size`: the output buffer size
- `syncFlush`: if `true` invocation of the inherited flush() method of this instance flushes the compressor with flush mode `Deflater.SYNC_FLUSH` before flushing the output stream, otherwise only flushes the output stream

**Since:** 1.7

Throws:

- `IOException`: If an I/O error has occurred.
- `IllegalArgumentException`: if `size <= 0`

## GZIPOutputStream.GZIPOutputStream(OutputStream)

```java
public GZIPOutputStream(OutputStream out) throws IOException
```

Creates a new output stream with a default buffer size.

The new output stream instance is created as if by invoking
the 2-argument constructor GZIPOutputStream(out, false).

Parameters:

- `out`: the output stream

Throws:

- `IOException`: If an I/O error has occurred.

## GZIPOutputStream.GZIPOutputStream(OutputStream, boolean)

```java
public GZIPOutputStream(OutputStream out, boolean syncFlush) throws IOException
```

Creates a new output stream with a default buffer size and
the specified flush mode.

Parameters:

- `out`: the output stream
- `syncFlush`: if `true` invocation of the inherited flush() method of this instance flushes the compressor with flush mode `Deflater.SYNC_FLUSH` before flushing the output stream, otherwise only flushes the output stream

**Since:** 1.7

Throws:

- `IOException`: If an I/O error has occurred.

## GZIPOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] buf, int off, int len) throws IOException
```

Writes array of bytes to the compressed output stream. This method
will block until all the bytes are written.

Parameters:

- `buf`: the data to be written
- `off`: the start offset of the data
- `len`: the length of the data

Throws:

- `IOException`: If an I/O error has occurred.

## GZIPOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing compressed data to the output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.

Throws:

- `IOException`: if an I/O error has occurred
