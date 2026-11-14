# BufferedInputStream class (java.io)

```java
public class BufferedInputStream extends FilterInputStream
```

A {@code BufferedInputStream} adds
functionality to another input stream-namely,
the ability to buffer the input and to
support the {@code mark} and {@code reset}
methods. When  the {@code BufferedInputStream}
is created, an internal buffer array is
created. As bytes  from the stream are read
or skipped, the internal buffer is refilled
as necessary  from the contained input stream,
many bytes at a time. The {@code mark}
operation  remembers a point in the input
stream and the {@code reset} operation
causes all the  bytes read since the most
recent {@code mark} operation to be
reread before new bytes are  taken from
the contained input stream.

@apiNote
Once wrapped in a {@code BufferedInputStream}, the underlying
{@code InputStream} should not be used directly nor wrapped with
another stream.

@author  Arthur van Hoff
@since   1.0

## BufferedInputStream.close(), which is necessary since * closes can be asynchronous. We use nullness of buf[] as primary * indicator that this stream is closed. (The "in" field is also * nulled out on close.)

```java
/* * We null this out with a CAS on close(), which is necessary since * closes can be asynchronous. We use nullness of buf[] as primary * indicator that this stream is closed. (The "in" field is also * nulled out on close.) */ protected volatile byte[] buf
```

The internal buffer array where the data is stored. When necessary,
it may be replaced by another array of
a different size.

## BufferedInputStream.count

```java
protected int count
```

The index one greater than the index of the last valid byte in
the buffer.
This value is always
in the range {@code 0} through {@code buf.length};
elements {@code buf[0]} through {@code buf[count-1]}
contain buffered input data obtained
from the underlying  input stream.

## BufferedInputStream.pos

```java
protected int pos
```

The current position in the buffer. This is the index of the next
byte to be read from the {@code buf} array.
<p>
This value is always in the range {@code 0}
through {@code count}. If it is less
than {@code count}, then  {@code buf[pos]}
is the next byte to be supplied as input;
if it is equal to {@code count}, then
the  next {@code read} or {@code skip}
operation will require more bytes to be
read from the contained  input stream.

@see     java.io.BufferedInputStream#buf

## BufferedInputStream.markpos

```java
protected int markpos
```

The value of the {@code pos} field at the time the last
{@code mark} method was called.
<p>
This value is always
in the range {@code -1} through {@code pos}.
If there is no marked position in  the input
stream, this field is {@code -1}. If
there is a marked position in the input
stream,  then {@code buf[markpos]}
is the first byte to be supplied as input
after a {@code reset} operation. If
{@code markpos} is not {@code -1},
then all bytes from positions {@code buf[markpos]}
through  {@code buf[pos-1]} must remain
in the buffer array (though they may be
moved to  another place in the buffer array,
with suitable adjustments to the values
of {@code count},  {@code pos},
and {@code markpos}); they may not
be discarded unless and until the difference
between {@code pos} and {@code markpos}
exceeds {@code marklimit}.

@see     java.io.BufferedInputStream#mark(int)
@see     java.io.BufferedInputStream#pos

## BufferedInputStream.marklimit

```java
protected int marklimit
```

The maximum read ahead allowed after a call to the
{@code mark} method before subsequent calls to the
{@code reset} method fail.
Whenever the difference between {@code pos}
and {@code markpos} exceeds {@code marklimit},
then the  mark may be dropped by setting
{@code markpos} to {@code -1}.

@see     java.io.BufferedInputStream#mark(int)
@see     java.io.BufferedInputStream#reset()

## BufferedInputStream.BufferedInputStream(InputStream)

```java
public BufferedInputStream(InputStream in)
```

Creates a {@code BufferedInputStream}
and saves its  argument, the input stream
{@code in}, for later use. An internal
buffer array is created and  stored in {@code buf}.

@param   in   the underlying input stream.

## BufferedInputStream.BufferedInputStream(InputStream, int)

```java
public BufferedInputStream(InputStream in, int size)
```

Creates a {@code BufferedInputStream}
with the specified buffer size,
and saves its  argument, the input stream
{@code in}, for later use.  An internal
buffer array of length  {@code size}
is created and stored in {@code buf}.

@param   in     the underlying input stream.
@param   size   the buffer size.
@throws  IllegalArgumentException if {@code size <= 0}.

## BufferedInputStream.read()

```java
public synchronized int read() throws IOException
```

See
the general contract of the {@code read}
method of {@code InputStream}.

@return     the next byte of data, or {@code -1} if the end of the
            stream is reached.
@throws     IOException  if this input stream has been closed by
                         invoking its {@link #close()} method,
                         or an I/O error occurs.
@see        java.io.FilterInputStream#in

## BufferedInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len) throws IOException
```

Reads bytes from this byte-input stream into the specified byte array,
starting at the given offset.

<p> This method implements the general contract of the corresponding
{@link InputStream#read(byte[], int, int) read} method of
the {@link InputStream} class.  As an additional
convenience, it attempts to read as many bytes as possible by repeatedly
invoking the {@code read} method of the underlying stream.  This
iterated {@code read} continues until one of the following
conditions becomes true: <ul>

  <li> The specified number of bytes have been read,

  <li> The {@code read} method of the underlying stream returns
  {@code -1}, indicating end-of-file, or

  <li> The {@code available} method of the underlying stream
  returns zero, indicating that further input requests would block.

</ul> If the first {@code read} on the underlying stream returns
{@code -1} to indicate end-of-file then this method returns
{@code -1}.  Otherwise, this method returns the number of bytes
actually read.

<p> Subclasses of this class are encouraged, but not required, to
attempt to read as many bytes as possible in the same fashion.

@param      b     destination buffer.
@param      off   offset at which to start storing bytes.
@param      len   maximum number of bytes to read.
@return     the number of bytes read, or {@code -1} if the end of
            the stream has been reached.
@throws     IOException  if this input stream has been closed by
                         invoking its {@link #close()} method,
                         or an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}

## BufferedInputStream.skip(long)

```java
public synchronized long skip(long n) throws IOException
```

See the general contract of the {@code skip}
method of {@code InputStream}.

@throws IOException  if this input stream has been closed by
                     invoking its {@link #close()} method,
                     {@code in.skip(n)} throws an IOException,
                     or an I/O error occurs.

## BufferedInputStream.available()

```java
public synchronized int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or
skipped over) from this input stream without blocking by the next
invocation of a method for this input stream. The next invocation might be
the same thread or another thread.  A single read or skip of this
many bytes will not block, but may read or skip fewer bytes.
<p>
This method returns the sum of the number of bytes remaining to be read in
the buffer ({@code count - pos}) and the result of calling the
{@link java.io.FilterInputStream#in in}{@code .available()}.

@return     an estimate of the number of bytes that can be read (or skipped
            over) from this input stream without blocking.
@throws     IOException  if this input stream has been closed by
                         invoking its {@link #close()} method,
                         or an I/O error occurs.

## BufferedInputStream.mark(int)

```java
public synchronized void mark(int readlimit)
```

See the general contract of the {@code mark}
method of {@code InputStream}.

@param   readlimit   the maximum limit of bytes that can be read before
                     the mark position becomes invalid.
@see     java.io.BufferedInputStream#reset()

## BufferedInputStream.reset()

```java
public synchronized void reset() throws IOException
```

See the general contract of the {@code reset}
method of {@code InputStream}.
<p>
If {@code markpos} is {@code -1}
(no mark has been set or the mark has been
invalidated), an {@code IOException}
is thrown. Otherwise, {@code pos} is
set equal to {@code markpos}.

@throws     IOException  if this stream has not been marked or,
                 if the mark has been invalidated, or the stream
                 has been closed by invoking its {@link #close()}
                 method, or an I/O error occurs.
@see        java.io.BufferedInputStream#mark(int)

## BufferedInputStream.markSupported()

```java
public boolean markSupported()
```

Tests if this input stream supports the {@code mark}
and {@code reset} methods. The {@code markSupported}
method of {@code BufferedInputStream} returns
{@code true}.

@return  a {@code boolean} indicating if this stream type supports
         the {@code mark} and {@code reset} methods.
@see     java.io.InputStream#mark(int)
@see     java.io.InputStream#reset()

## BufferedInputStream.close()

```java
public void close() throws IOException
```

Closes this input stream and releases any system resources
associated with the stream.
Once the stream has been closed, further read(), available(), reset(),
or skip() invocations will throw an IOException.
Closing a previously closed stream has no effect.

@throws     IOException  if an I/O error occurs.