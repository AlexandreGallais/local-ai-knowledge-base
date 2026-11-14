# PipedInputStream class (java.io)

```java
public class PipedInputStream extends InputStream
```

A piped input stream should be connected
to a piped output stream; the piped  input
stream then provides whatever data bytes
are written to the piped output  stream.
Typically, data is read from a {@code PipedInputStream}
object by one thread  and data is written
to the corresponding {@code PipedOutputStream}
by some  other thread. Attempting to use
both objects from a single thread is not
recommended, as it may deadlock the thread.
The piped input stream contains a buffer,
decoupling read operations from write operations,
within limits.
A pipe is said to be <a id="BROKEN"> <i>broken</i> </a> if a
thread that was providing data bytes to the connected
piped output stream is no longer alive.

@author  James Gosling
@see     java.io.PipedOutputStream
@since   1.0

## PipedInputStream.PIPE_SIZE

```java
protected static final int PIPE_SIZE
```

The default size of the pipe's circular input buffer.
@since   1.1

## PipedInputStream.protected byte buffer[]

```java
protected byte buffer[]
```

The circular buffer into which incoming data is placed.
@since   1.1

## PipedInputStream.in

```java
protected int in
```

The index of the position in the circular buffer at which the
next byte of data will be stored when received from the connected
piped output stream. {@code in < 0} implies the buffer is empty,
{@code in == out} implies the buffer is full
@since   1.1

## PipedInputStream.out

```java
protected int out
```

The index of the position in the circular buffer at which the next
byte of data will be read by this piped input stream.
@since   1.1

## PipedInputStream.PipedInputStream(PipedOutputStream)

```java
public PipedInputStream(PipedOutputStream src) throws IOException
```

Creates a {@code PipedInputStream} so
that it is connected to the piped output
stream {@code src}. Data bytes written
to {@code src} will then be  available
as input from this stream.

@param      src   the stream to connect to.
@throws     IOException  if an I/O error occurs.

## PipedInputStream.PipedInputStream(PipedOutputStream, int)

```java
public PipedInputStream(PipedOutputStream src, int pipeSize) throws IOException
```

Creates a {@code PipedInputStream} so that it is
connected to the piped output stream
{@code src} and uses the specified pipe size for
the pipe's buffer.
Data bytes written to {@code src} will then
be available as input from this stream.

@param      src   the stream to connect to.
@param      pipeSize the size of the pipe's buffer.
@throws     IOException  if an I/O error occurs.
@throws     IllegalArgumentException if {@code pipeSize <= 0}.
@since      1.6

## PipedInputStream.PipedInputStream()

```java
public PipedInputStream()
```

Creates a {@code PipedInputStream} so
that it is not yet {@linkplain #connect(java.io.PipedOutputStream)
connected}.
It must be {@linkplain java.io.PipedOutputStream#connect(
java.io.PipedInputStream) connected} to a
{@code PipedOutputStream} before being used.

## PipedInputStream.PipedInputStream(int)

```java
public PipedInputStream(int pipeSize)
```

Creates a {@code PipedInputStream} so that it is not yet
{@linkplain #connect(java.io.PipedOutputStream) connected} and
uses the specified pipe size for the pipe's buffer.
It must be {@linkplain java.io.PipedOutputStream#connect(
java.io.PipedInputStream)
connected} to a {@code PipedOutputStream} before being used.

@param      pipeSize the size of the pipe's buffer.
@throws     IllegalArgumentException if {@code pipeSize <= 0}.
@since      1.6

## PipedInputStream.connect(PipedOutputStream)

```java
public void connect(PipedOutputStream src) throws IOException
```

Causes this piped input stream to be connected
to the piped  output stream {@code src}.
If this object is already connected to some
other piped output  stream, an {@code IOException}
is thrown.
<p>
If {@code src} is an
unconnected piped output stream and {@code snk}
is an unconnected piped input stream, they
may be connected by either the call:

{@snippet lang=java :
    snk.connect(src)
}
<p>
or the call:

{@snippet lang=java :
    src.connect(snk)
}
<p>
The two calls have the same effect.

@param      src   The piped output stream to connect to.
@throws     IOException  if an I/O error occurs.

## PipedInputStream.receive(int)

```java
protected synchronized void receive(int b) throws IOException
```

Receives a byte of data.  This method will block if no input is
available.
@param   b the byte being received
@throws  IOException If the pipe is <a href="#BROKEN"> {@code broken}</a>,
         {@link #connect(java.io.PipedOutputStream) unconnected},
         closed, or if an I/O error occurs.
@since   1.1

## PipedInputStream.read()

```java
public synchronized int read() throws IOException
```

Reads the next byte of data from this piped input stream. The
value byte is returned as an {@code int} in the range
{@code 0} to {@code 255}.
This method blocks until input data is available, the end of the
stream is detected, or an exception is thrown.

@return   {@inheritDoc}
@throws   IOException  if the pipe is
          {@link #connect(java.io.PipedOutputStream) unconnected},
          <a href="#BROKEN"> {@code broken}</a>, closed,
          or if an I/O error occurs.

## PipedInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len) throws IOException
```

Reads up to {@code len} bytes of data from this piped input
stream into an array of bytes. Less than {@code len} bytes
will be read if the end of the data stream is reached or if
{@code len} exceeds the pipe's buffer size.
If {@code len } is zero, then no bytes are read and 0 is returned;
otherwise, the method blocks until at least 1 byte of input is
available, end of the stream has been detected, or an exception is
thrown.

@param      b     {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}
@return     {@inheritDoc}
@throws     NullPointerException {@inheritDoc}
@throws     IndexOutOfBoundsException {@inheritDoc}
@throws     IOException if the pipe is <a href="#BROKEN"> {@code broken}</a>,
          {@link #connect(java.io.PipedOutputStream) unconnected},
          closed, or if an I/O error occurs.

## PipedInputStream.available()

```java
public synchronized int available() throws IOException
```

Returns the number of bytes that can be read from this input
stream without blocking.

@return the number of bytes that can be read from this input stream
        without blocking, or {@code 0} if this input stream has been
        closed by invoking its {@link #close()} method, or if the pipe
        is {@link #connect(java.io.PipedOutputStream) unconnected}, or
        <a href="#BROKEN"> {@code broken}</a>.

@throws IOException  {@inheritDoc}
@since  1.0.2

## PipedInputStream.close()

```java
public void close() throws IOException
```

{@inheritDoc}

@throws     IOException  {@inheritDoc}