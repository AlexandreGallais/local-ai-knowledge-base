# InflaterOutputStream class (java.util.zip)

```java
public class InflaterOutputStream extends FilterOutputStream
```

Implements an output stream filter for uncompressing data stored in the
"deflate" compression format.

<h2 id="decompressor-usage">Decompressor Usage</h2>
An {@code InflaterOutputStream} created without
specifying a {@linkplain Inflater decompressor} will create a decompressor
at construction time, and close the decompressor when the output stream
is {@linkplain #close closed}.
<p>
If a decompressor is specified when creating a {@code InflaterOutputStream}, it is the
responsibility of the caller to {@linkplain Inflater#close close} the
decompressor after closing the output stream.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@since       1.6
@author      David R Tribble (david@tribble.com)

@see InflaterInputStream
@see DeflaterInputStream
@see DeflaterOutputStream

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
<p>
The decompressor will be closed when this output stream
is {@linkplain #close() closed}.

@param out output stream to write the uncompressed data to
@throws NullPointerException if {@code out} is null

## InflaterOutputStream.InflaterOutputStream(OutputStream, Inflater)

```java
public InflaterOutputStream(OutputStream out, Inflater infl)
```

Creates a new output stream with the specified decompressor and a
default buffer size.
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##decompressor-usage will not close} the given
{@linkplain Inflater decompressor}.

@param out output stream to write the uncompressed data to
@param infl decompressor ("inflater") for this stream
@throws NullPointerException if {@code out} or {@code infl} is null

## InflaterOutputStream.InflaterOutputStream(OutputStream, Inflater, int)

```java
public InflaterOutputStream(OutputStream out, Inflater infl, int bufLen)
```

Creates a new output stream with the specified decompressor and
buffer size.
<p>
{@linkplain #close() Closing} this output stream
{@linkplain ##decompressor-usage will not close} the given
{@linkplain Inflater decompressor}.

@param out output stream to write the uncompressed data to
@param infl decompressor ("inflater") for this stream
@param bufLen decompression buffer size
@throws IllegalArgumentException if {@code bufLen <= 0}
@throws NullPointerException if {@code out} or {@code infl} is null

## InflaterOutputStream.close()

```java
public void close() throws IOException
```

Writes any remaining uncompressed data to the output stream and closes
the underlying output stream.

@throws IOException if an I/O error occurs

## InflaterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this output stream, forcing any pending buffered output bytes to be
written.

@throws IOException if an I/O error occurs or this stream is already
closed

## InflaterOutputStream.finish()

```java
public void finish() throws IOException
```

Finishes writing uncompressed data to the output stream without closing
the underlying stream.  Use this method when applying multiple filters in
succession to the same output stream.

@throws IOException if an I/O error occurs or this stream is already
closed

## InflaterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte to the uncompressed output stream.

@param b a single byte of compressed data to decompress and write to
the output stream
@throws IOException if an I/O error occurs or this stream is already
closed
@throws ZipException if a compression (ZIP) format error occurs

## InflaterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes an array of bytes to the uncompressed output stream.

@param b buffer containing compressed data to decompress and write to
the output stream
@param off starting offset of the compressed data within {@code b}
@param len number of bytes to decompress from {@code b}
@throws IndexOutOfBoundsException if {@code off < 0}, or if
{@code len < 0}, or if {@code len > b.length - off}
@throws IOException if an I/O error occurs or this stream is already
closed
@throws NullPointerException if {@code b} is null
@throws ZipException if a compression (ZIP) format error occurs