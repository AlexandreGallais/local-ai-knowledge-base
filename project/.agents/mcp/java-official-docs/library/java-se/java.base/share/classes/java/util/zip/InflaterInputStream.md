# InflaterInputStream class (java.util.zip)

```java
public class InflaterInputStream extends FilterInputStream
```

This class implements a stream filter for uncompressing data in the
"deflate" compression format. It is also used as the basis for other
decompression filters, such as GZIPInputStream.
<p> Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

<h2 id="decompressor-usage">Decompressor Usage</h2>
An {@code InflaterInputStream} created without
specifying a {@linkplain Inflater decompressor} will create a decompressor
at construction time, and close the decompressor when the input stream
is {@linkplain #close closed}.
<p>
If a decompressor is specified when creating a {@code InflaterInputStream}, it is the
responsibility of the caller to {@linkplain Inflater#close close} the
decompressor after closing the input stream.

@apiNote
The {@link #close} method should be called to release resources used by this
stream, either directly, or with the {@code try}-with-resources statement.

@see         Inflater
@author      David Connelly
@since 1.1

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
<p>
{@linkplain #close() Closing} this input stream
{@linkplain ##decompressor-usage will not close} the given
{@linkplain Inflater decompressor}.

@param in the input stream
@param inf the decompressor ("inflater")
@param size the input buffer size
@throws    IllegalArgumentException if {@code size <= 0}

## InflaterInputStream.InflaterInputStream(InputStream, Inflater)

```java
public InflaterInputStream(InputStream in, Inflater inf)
```

Creates a new input stream with the specified decompressor and a
default buffer size.
<p>
{@linkplain #close() Closing} this input stream
{@linkplain ##decompressor-usage will not close} the given
{@linkplain Inflater decompressor}.

@param in the input stream
@param inf the decompressor ("inflater")

## InflaterInputStream.InflaterInputStream(InputStream)

```java
public InflaterInputStream(InputStream in)
```

Creates a new input stream and decompressor with a
default buffer size.
<p>
The decompressor will be closed when this input stream
is {@linkplain #close() closed}.

@param in the input stream

## InflaterInputStream.read()

```java
public int read() throws IOException
```

Reads a byte of uncompressed data. This method will block until
enough input is available for decompression.
@return the byte read, or -1 if end of compressed input is reached
@throws    IOException if an I/O error has occurred

## InflaterInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads uncompressed data into an array of bytes, returning the number of inflated
bytes. If {@code len} is not zero, the method will block until some input can be
decompressed; otherwise, no bytes are read and {@code 0} is returned.
<p>
If this method returns a nonzero integer <i>n</i> then {@code buf[off]}
through {@code buf[off+}<i>n</i>{@code -1]} contain the uncompressed
data.  The content of elements {@code buf[off+}<i>n</i>{@code ]} through
{@code buf[off+}<i>len</i>{@code -1]} is undefined, contrary to the
specification of the {@link java.io.InputStream InputStream} superclass,
so an implementation is free to modify these elements during the inflate
operation. If this method returns {@code -1} or throws an exception then
the content of {@code buf[off]} through {@code buf[off+}<i>len</i>{@code
-1]} is undefined.

@param b the buffer into which the data is read
@param off the start offset in the destination array {@code b}
@param len the maximum number of bytes read
@return the actual number of bytes inflated, or -1 if the end of the
        compressed input is reached or a preset dictionary is needed
@throws     IndexOutOfBoundsException If {@code off} is negative,
{@code len} is negative, or {@code len} is greater than
{@code b.length - off}
@throws    ZipException if a ZIP format error has occurred
@throws    IOException if an I/O error has occurred

## InflaterInputStream.available()

```java
public int available() throws IOException
```

Returns 0 after EOF has been reached, otherwise always return 1.
<p>
Programs should not count on this method to return the actual number
of bytes that could be read without blocking.

@return     1 before EOF and 0 after EOF.
@throws     IOException  if an I/O error occurs.

## InflaterInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips specified number of bytes of uncompressed data.
This method may block until the specified number of bytes are skipped
or end of stream is reached.

@implNote
This method skips at most {@code Integer.MAX_VALUE} bytes.

@param n the number of bytes to skip. If {@code n} is zero then no bytes are skipped.
@return the actual number of bytes skipped, which might be zero
@throws IOException if an I/O error occurs or if this stream is
                    already closed
@throws    IllegalArgumentException if {@code n < 0}

## InflaterInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources associated
with the stream.

@throws    IOException if an I/O error has occurred

## InflaterInputStream.fill()

```java
protected void fill() throws IOException
```

Fills input buffer with more data to decompress.
@implSpec
This method will read up to {@link #buf}.length bytes into the input
buffer, {@link #buf}, starting at element {@code 0}. The {@link #len}
field will be set to the number of bytes read.
@throws    IOException if an I/O error has occurred
@throws    EOFException if the end of input stream has been reached
           unexpectedly

## InflaterInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the {@code mark} and
{@code reset} methods. The {@code markSupported}
method of {@code InflaterInputStream} returns
{@code false}.

@return  a {@code boolean} indicating if this stream type supports
         the {@code mark} and {@code reset} methods.
@see     java.io.InputStream#mark(int)
@see     java.io.InputStream#reset()

## InflaterInputStream.mark(int)

```java
public void mark(int readlimit)
```

Marks the current position in this input stream.

@implSpec The {@code mark} method of {@code InflaterInputStream}
does nothing.

@param   readlimit   the maximum limit of bytes that can be read before
                     the mark position becomes invalid.
@see     java.io.InputStream#reset()

## InflaterInputStream.reset()

```java
public void reset() throws IOException
```

Repositions this stream to the position at the time the
{@code mark} method was last called on this input stream.

@implSpec The method {@code reset} for class
{@code InflaterInputStream} does nothing except throw an
{@code IOException}.

@throws     IOException  if this method is invoked.
@see     java.io.InputStream#mark(int)
@see     java.io.IOException