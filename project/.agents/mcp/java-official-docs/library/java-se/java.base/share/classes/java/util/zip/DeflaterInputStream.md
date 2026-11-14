# DeflaterInputStream class (java.util.zip)

```java
public class DeflaterInputStream extends FilterInputStream
```

Implements an input stream filter for compressing data in the "deflate"
compression format.

<h2 id="compressor-usage">Compressor Usage</h2>
A {@code DeflaterInputStream} created without
specifying a {@linkplain Deflater compressor} will create a compressor
at construction time, and close the compressor when the input stream
is {@linkplain #close closed}.
<p>
If a compressor is specified when creating a {@code DeflaterInputStream}, it is the
responsibility of the caller to {@linkplain Deflater#close close} the
compressor after closing the input stream.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@since       1.6
@author      David R Tribble (david@tribble.com)

@see DeflaterOutputStream
@see InflaterOutputStream
@see InflaterInputStream

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
<p>
The compressor will be closed when this input stream
is {@linkplain #close() closed}.

@param in input stream to read the uncompressed data to
@throws NullPointerException if {@code in} is null

## DeflaterInputStream.DeflaterInputStream(InputStream, Deflater)

```java
public DeflaterInputStream(InputStream in, Deflater defl)
```

Creates a new input stream with the specified compressor and a
default buffer size.
<p>
{@linkplain #close() Closing} this input stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param in input stream to read the uncompressed data to
@param defl compressor ("deflater") for this stream
@throws NullPointerException if {@code in} or {@code defl} is null

## DeflaterInputStream.DeflaterInputStream(InputStream, Deflater, int)

```java
public DeflaterInputStream(InputStream in, Deflater defl, int bufLen)
```

Creates a new input stream with the specified compressor and buffer
size.
<p>
{@linkplain #close() Closing} this input stream
{@linkplain ##compressor-usage will not close} the given
{@linkplain Deflater compressor}.

@param in input stream to read the uncompressed data to
@param defl compressor ("deflater") for this stream
@param bufLen compression buffer size
@throws IllegalArgumentException if {@code bufLen <= 0}
@throws NullPointerException if {@code in} or {@code defl} is null

## DeflaterInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and its underlying input stream, discarding
any pending uncompressed data.

@throws IOException if an I/O error occurs

## DeflaterInputStream.read()

```java
public int read() throws IOException
```

Reads a single byte of compressed data from the input stream.
This method will block until some input can be read and compressed.

@return a single byte of compressed data, or -1 if the end of the
uncompressed input stream is reached
@throws IOException if an I/O error occurs or if this stream is
already closed

## DeflaterInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads compressed data into a byte array.
This method will block until some input can be read and compressed.

@param b buffer into which the data is read
@param off starting offset of the data within {@code b}
@param len maximum number of compressed bytes to read into {@code b}
@return the actual number of bytes read, or -1 if the end of the
uncompressed input stream is reached
@throws NullPointerException if {@code b} is null
@throws IndexOutOfBoundsException  if {@code len > b.length - off}
@throws IOException if an I/O error occurs or if this input stream is
already closed

## DeflaterInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards data from the input stream.
This method may block until the specified number of bytes are skipped
or end of stream is reached.

@implNote
This method skips at most {@code Integer.MAX_VALUE} bytes.

@param n number of bytes to be skipped. If {@code n} is zero then no bytes are skipped.
@return the actual number of bytes skipped, which might be zero
@throws IOException if an I/O error occurs or if this stream is
                    already closed
@throws IllegalArgumentException if {@code n < 0}

## DeflaterInputStream.available()

```java
public int available() throws IOException
```

Returns 0 after EOF has been reached, otherwise always return 1.
<p>
Programs should not count on this method to return the actual number
of bytes that could be read without blocking
@return zero after the end of the underlying input stream has been
reached, otherwise always returns 1
@throws IOException if an I/O error occurs or if this stream is
already closed

## DeflaterInputStream.markSupported()

```java
public boolean markSupported()
```

Always returns {@code false} because this input stream does not support
the {@link #mark mark()} and {@link #reset reset()} methods.

@return false, always

## DeflaterInputStream.mark(int)

```java
public void mark(int limit)
```

<i>This operation is not supported</i>.

@param limit maximum bytes that can be read before invalidating the position marker

## DeflaterInputStream.reset()

```java
public void reset() throws IOException
```

<i>This operation is not supported</i>.

@throws IOException always thrown