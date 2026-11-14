# SequenceInputStream class (java.io)

```java
public class SequenceInputStream extends InputStream
```

A {@code SequenceInputStream} represents
the logical concatenation of other input
streams. It starts out with an ordered
collection of input streams and reads from
the first one until end of file is reached,
whereupon it reads from the second one,
and so on, until end of file is reached
on the last of the contained input streams.

@author  Arthur van Hoff
@since   1.0

## SequenceInputStream.SequenceInputStream(Enumeration<? extends InputStream>)

```java
public SequenceInputStream(Enumeration<? extends InputStream> e)
```

Initializes a newly created {@code SequenceInputStream}
by remembering the argument, which must
be an {@code Enumeration}  that produces
objects whose run-time type is {@code InputStream}.
The input streams that are  produced by
the enumeration will be read, in order,
to provide the bytes to be read  from this
{@code SequenceInputStream}. After
each input stream from the enumeration
is exhausted, it is closed by calling its
{@code close} method.

@param   e   an enumeration of input streams.
@see     java.util.Enumeration

## SequenceInputStream.SequenceInputStream(InputStream, InputStream)

```java
public SequenceInputStream(InputStream s1, InputStream s2)
```

Initializes a newly
created {@code SequenceInputStream}
by remembering the two arguments, which
will be read in order, first {@code s1}
and then {@code s2}, to provide the
bytes to be read from this {@code SequenceInputStream}.

@param   s1   the first input stream to read.
@param   s2   the second input stream to read.

## SequenceInputStream.available()

```java
public int available() throws IOException
```

Returns an estimate of the number of bytes that can be read (or
skipped over) from the current underlying input stream without
blocking by the next invocation of a method for the current
underlying input stream. The next invocation might be
the same thread or another thread.  A single read or skip of this
many bytes will not block, but may read or skip fewer bytes.
<p>
This method simply calls {@code available} of the current underlying
input stream and returns the result.

@return   an estimate of the number of bytes that can be read (or
          skipped over) from the current underlying input stream
          without blocking or {@code 0} if this input stream
          has been closed by invoking its {@link #close()} method
@throws   IOException {@inheritDoc}

@since    1.1

## SequenceInputStream.read()

```java
public int read() throws IOException
```

{@inheritDoc}
<p>
This method
tries to read one byte from the current substream. If it
reaches the end of the stream, it calls the {@code close}
method of the current substream and begins reading from the next
substream.

@return     {@inheritDoc}
@throws     IOException  if an I/O error occurs.

## SequenceInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to {@code len} bytes of data from this input stream into an
array of bytes.  If the end of the last contained stream has been reached
then {@code -1} is returned.  Otherwise, if {@code len} is not zero, the
method blocks until at least 1 byte of input is available; if {@code len}
is zero, no bytes are read and {@code 0} is returned.
<p>
The {@code read} method of {@code SequenceInputStream}
tries to read the data from the current substream. If it fails to
read any bytes because the substream has reached the end of
the stream, it calls the {@code close} method of the current
substream and begins reading from the next substream.

@param      b     the buffer into which the data is read.
@param      off   the start offset in array {@code b}
                  at which the data is written.
@param      len   the maximum number of bytes read.
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end of
            the last contained stream has been reached.
@throws     NullPointerException if the end of the last contained
            stream has not been reached and {@code b} is {@code null}.
@throws     IndexOutOfBoundsException if the end of the last contained
            stream has not been reached and {@code off} is negative,
            {@code len} is negative, or {@code len} is
            greater than {@code b.length - off}
@throws     IOException  if an I/O error occurs.

## SequenceInputStream.close()

```java
public void close() throws IOException
```

{@inheritDoc}
A closed {@code SequenceInputStream}
cannot  perform input operations and cannot
be reopened.
<p>
If this stream was created
from an enumeration, all remaining elements
are requested from the enumeration and closed
before the {@code close} method returns.

@throws     IOException {@inheritDoc}