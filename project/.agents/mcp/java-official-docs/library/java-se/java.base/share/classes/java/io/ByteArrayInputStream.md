# ByteArrayInputStream class (java.io)

```java
public class ByteArrayInputStream extends InputStream
```

A {@code ByteArrayInputStream} contains
an internal buffer that contains bytes that
may be read from the stream. An internal
counter keeps track of the next byte to
be supplied by the {@code read} method.
<p>
Closing a {@code ByteArrayInputStream} has no effect. The methods in
this class can be called after the stream has been closed without
generating an {@code IOException}.

@author  Arthur van Hoff
@see     java.io.StringBufferInputStream
@since   1.0

## ByteArrayInputStream.buf

```java
protected byte[] buf
```

An array of bytes that was provided
by the creator of the stream. Elements {@code buf[0]}
through {@code buf[count-1]} are the
only bytes that can ever be read from the
stream;  element {@code buf[pos]} is
the next byte to be read.

## ByteArrayInputStream.pos

```java
protected int pos
```

The index of the next byte to read from the input stream buffer.
This value should always be nonnegative
and not larger than the value of {@code count}.
The next byte to be read from the input stream buffer
will be {@code buf[pos]}.

## ByteArrayInputStream.mark

```java
protected int mark
```

The currently marked position in the stream.
ByteArrayInputStream objects are marked at position zero by
default when constructed.  They may be marked at another
position within the buffer by the {@code mark()} method.
The current buffer position is set to this point by the
{@code reset()} method.
<p>
If no mark has been set, then the value of mark is the offset
passed to the constructor (or 0 if the offset was not supplied).

@since   1.1

## ByteArrayInputStream.count

```java
protected int count
```

The index one greater than the last valid byte in the input
stream buffer.
This value should always be nonnegative
and not larger than the length of {@code buf}.
It  is one greater than the position of
the last byte within {@code buf} that
can ever be read  from the input stream buffer.

## ByteArrayInputStream.ByteArrayInputStream(byte[])

```java
public ByteArrayInputStream(byte[] buf)
```

Creates a {@code ByteArrayInputStream}
so that it  uses {@code buf} as its
buffer array.
The buffer array is not copied.
The initial value of {@code pos}
is {@code 0} and the initial value
of  {@code count} is the length of
{@code buf}.

@param   buf   the input buffer.

## ByteArrayInputStream.ByteArrayInputStream(byte[], int, int)

```java
public ByteArrayInputStream(byte[] buf, int offset, int length)
```

Creates {@code ByteArrayInputStream}
that uses {@code buf} as its
buffer array. The initial value of {@code pos}
is {@code offset} and the initial value
of {@code count} is the minimum of {@code offset+length}
and {@code buf.length}.
The buffer array is not copied. The buffer's mark is
set to the specified offset.

@param   buf      the input buffer.
@param   offset   the offset in the buffer of the first byte to read.
@param   length   the maximum number of bytes to read from the buffer.

## ByteArrayInputStream.read()

```java
public synchronized int read()
```

Reads the next byte of data from this input stream. The value
byte is returned as an {@code int} in the range
{@code 0} to {@code 255}. If no byte is available
because the end of the stream has been reached, the value
{@code -1} is returned.
<p>
This {@code read} method
cannot block.

@return  {@inheritDoc}

## ByteArrayInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len)
```

Reads up to {@code len} bytes of data into an array of bytes from this
input stream.  If {@code pos} equals {@code count}, then {@code -1} is
returned to indicate end of file.  Otherwise, the  number {@code k} of
bytes read is equal to the smaller of {@code len} and {@code count-pos}.
If {@code k} is positive, then bytes {@code buf[pos]} through
{@code buf[pos+k-1]} are copied into {@code b[off]} through
{@code b[off+k-1]} in the manner performed by {@code System.arraycopy}.
The value {@code k} is added into {@code pos} and {@code k} is returned.
<p>
Unlike the {@link InputStream#read(byte[],int,int) overridden method}
of {@code InputStream}, this method returns {@code -1} instead of zero
if the end of the stream has been reached and {@code len == 0}.
<p>
This {@code read} method cannot block.

@param   b     {@inheritDoc}
@param   off   {@inheritDoc}
@param   len   {@inheritDoc}
@return  {@inheritDoc}
@throws  NullPointerException {@inheritDoc}
@throws  IndexOutOfBoundsException {@inheritDoc}

## ByteArrayInputStream.skip(long)

```java
public synchronized long skip(long n)
```

Skips {@code n} bytes of input from this input stream. Fewer
bytes might be skipped if the end of the input stream is reached.
The actual number {@code k}
of bytes to be skipped is equal to the smaller
of {@code n} and  {@code count-pos}.
The value {@code k} is added into {@code pos}
and {@code k} is returned.

@param   n   {@inheritDoc}
@return  the actual number of bytes skipped.

## ByteArrayInputStream.available()

```java
public synchronized int available()
```

Returns the number of remaining bytes that can be read (or skipped over)
from this input stream.
<p>
The value returned is {@code count - pos},
which is the number of bytes remaining to be read from the input buffer.

@return  the number of remaining bytes that can be read (or skipped
         over) from this input stream without blocking.

## ByteArrayInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this {@code InputStream} supports mark/reset.
@implSpec
The {@code markSupported} method of {@code ByteArrayInputStream}
always returns {@code true}.
@return true
@since   1.1

## ByteArrayInputStream.mark(int)

```java
public void mark(int readAheadLimit)
```

Set the current marked position in the stream.
ByteArrayInputStream objects are marked at position zero by
default when constructed.  They may be marked at another
position within the buffer by this method.
<p>
If no mark has been set, then the value of the mark is the
offset passed to the constructor (or 0 if the offset was not
supplied).

<p> Note: The {@code readAheadLimit} for this class
 has no meaning.

@since   1.1

## ByteArrayInputStream.reset()

```java
public synchronized void reset()
```

Resets the buffer to the marked position.  The marked position
is 0 unless another position was marked or an offset was specified
in the constructor.

## ByteArrayInputStream.close()

```java
public void close() throws IOException
```

Closing a {@code ByteArrayInputStream} has no effect. The methods in
this class can be called after the stream has been closed without
generating an {@code IOException}.