# DeflaterOutputStream class (java.util.zip)

```java
public class DeflaterOutputStream extends FilterOutputStream
```

This class implements an output stream filter for compressing data in
the "deflate" compression format. It is also used as the basis for other
types of compression filters, such as GZIPOutputStream.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

<h2 id="compressor-usage">Compressor Usage</h2>
A {@code DeflaterOutputStream} created without
specifying a {@linkplain Deflater compressor} will create a compressor
at construction time, and close the compressor when the output stream
is {@linkplain #close closed}.
<p>
If a compressor is specified when creating a {@code DeflaterOutputStream}, it is the
responsibility of the caller to {@linkplain Deflater#close close} the
compressor after closing the output stream.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@see         Deflater
@author      David Connelly
@since 1.1

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
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param out the output stream
@param def the compressor ("deflater")
@param size the output buffer size
@param syncFlush
       if {@code true} the {@link #flush()} method of this
       instance flushes the compressor with flush mode
       {@link Deflater#SYNC_FLUSH} before flushing the output
       stream, otherwise only flushes the output stream

@throws IllegalArgumentException if {@code size <= 0}

@since 1.7

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater, int)

```java
public DeflaterOutputStream(OutputStream out, Deflater def, int size)
```

Creates a new output stream with the specified compressor and
buffer size.

<p>The new output stream instance is created as if by invoking
the 4-argument constructor {@code DeflaterOutputStream(out, def, size, false)}.
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param out the output stream
@param def the compressor ("deflater")
@param size the output buffer size
@throws    IllegalArgumentException if {@code size <= 0}

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater, boolean)

```java
public DeflaterOutputStream(OutputStream out, Deflater def, boolean syncFlush)
```

Creates a new output stream with the specified compressor, flush
mode and a default buffer size.
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param out the output stream
@param def the compressor ("deflater")
@param syncFlush
       if {@code true} the {@link #flush()} method of this
       instance flushes the compressor with flush mode
       {@link Deflater#SYNC_FLUSH} before flushing the output
       stream, otherwise only flushes the output stream

@since 1.7

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, Deflater)

```java
public DeflaterOutputStream(OutputStream out, Deflater def)
```

Creates a new output stream with the specified compressor and
a default buffer size.

<p>The new output stream instance is created as if by invoking
the 3-argument constructor {@code DeflaterOutputStream(out, def, false)}.
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param out the output stream
@param def the compressor ("deflater")

## DeflaterOutputStream.DeflaterOutputStream(OutputStream, boolean)

```java
public DeflaterOutputStream(OutputStream out, boolean syncFlush)
```

Creates a new output stream and compressor with the
default compression level, a default buffer size and
the specified flush mode.
<p>
The compressor will be closed when this output stream
is {@linkplain #close() closed}.

@param out the output stream
@param syncFlush
       if {@code true} the {@link #flush()} method of this
       instance flushes the compressor with flush mode
       {@link Deflater#SYNC_FLUSH} before flushing the output
       stream, otherwise only flushes the output stream

@since 1.7

## DeflaterOutputStream.DeflaterOutputStream(OutputStream)

```java
public DeflaterOutputStream(OutputStream out)
```

Creates a new output stream and compressor with the
default compression level and a default buffer size.

<p>The new output stream instance is created as if by invoking
the 2-argument constructor {@code DeflaterOutputStream(out, false)}.
<p>
The compressor will be closed when this output stream
is {@linkplain #close() closed}.

@param out the output stream

## DeflaterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte to the compressed output stream. This method will
block until the byte can be written.
@param b the byte to be written
@throws    IOException if an I/O error has occurred

## DeflaterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the compressed output stream. This
method will block until all the bytes are written.
@param b the data to be written
@param off the start offset of the data
@param len the length of the data
@throws    IOException if an I/O error has occurred

## DeflaterOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing compressed data to the output stream without closing
the underlying stream. Use this method when applying multiple filters
in succession to the same output stream.
@throws    IOException if an I/O error has occurred

## DeflaterOutputStream.close()

```java
public void close() throws IOException
```

Writes remaining compressed data to the output stream and closes the
underlying stream.

@throws    IOException if an I/O error has occurred

## DeflaterOutputStream.deflate()

```java
protected void deflate() throws IOException
```

Writes next block of compressed data to the output stream.
@throws IOException if an I/O error has occurred

## DeflaterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes the compressed output stream.

If {@link #DeflaterOutputStream(OutputStream, Deflater, int, boolean)
syncFlush} is {@code true} when this compressed output stream is
constructed, this method first flushes the underlying {@code compressor}
with the flush mode {@link Deflater#SYNC_FLUSH} to force
all pending data to be flushed out to the output stream and then
flushes the output stream. Otherwise this method only flushes the
output stream without flushing the {@code compressor}.

@throws IOException if an I/O error has occurred

@since 1.7