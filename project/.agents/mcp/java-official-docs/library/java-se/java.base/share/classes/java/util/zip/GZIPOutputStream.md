# GZIPOutputStream class (java.util.zip)

```java
public class GZIPOutputStream extends DeflaterOutputStream
```

This class implements a stream filter for writing compressed data in
the GZIP file format.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

@author      David Connelly
@since 1.1

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

<p>The new output stream instance is created as if by invoking
the 3-argument constructor GZIPOutputStream(out, size, false).

@param out the output stream
@param size the output buffer size
@throws    IOException If an I/O error has occurred.
@throws    IllegalArgumentException if {@code size <= 0}

## GZIPOutputStream.GZIPOutputStream(OutputStream, int, boolean)

```java
public GZIPOutputStream(OutputStream out, int size, boolean syncFlush) throws IOException
```

Creates a new output stream with the specified buffer size and
flush mode.

@param out the output stream
@param size the output buffer size
@param syncFlush
       if {@code true} invocation of the inherited
       {@link DeflaterOutputStream#flush() flush()} method of
       this instance flushes the compressor with flush mode
       {@link Deflater#SYNC_FLUSH} before flushing the output
       stream, otherwise only flushes the output stream
@throws    IOException If an I/O error has occurred.
@throws    IllegalArgumentException if {@code size <= 0}

@since 1.7

## GZIPOutputStream.GZIPOutputStream(OutputStream)

```java
public GZIPOutputStream(OutputStream out) throws IOException
```

Creates a new output stream with a default buffer size.

<p>The new output stream instance is created as if by invoking
the 2-argument constructor GZIPOutputStream(out, false).

@param out the output stream
@throws    IOException If an I/O error has occurred.

## GZIPOutputStream.GZIPOutputStream(OutputStream, boolean)

```java
public GZIPOutputStream(OutputStream out, boolean syncFlush) throws IOException
```

Creates a new output stream with a default buffer size and
the specified flush mode.

@param out the output stream
@param syncFlush
       if {@code true} invocation of the inherited
       {@link DeflaterOutputStream#flush() flush()} method of
       this instance flushes the compressor with flush mode
       {@link Deflater#SYNC_FLUSH} before flushing the output
       stream, otherwise only flushes the output stream

@throws    IOException If an I/O error has occurred.

@since 1.7

## GZIPOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] buf, int off, int len) throws IOException
```

Writes array of bytes to the compressed output stream. This method
will block until all the bytes are written.
@param buf the data to be written
@param off the start offset of the data
@param len the length of the data
@throws    IOException If an I/O error has occurred.

## GZIPOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing compressed data to the output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.
@throws    IOException if an I/O error has occurred