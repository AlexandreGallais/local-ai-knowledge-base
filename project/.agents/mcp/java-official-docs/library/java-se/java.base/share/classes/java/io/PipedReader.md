# PipedReader class (java.io)

```java
public class PipedReader extends Reader
```

Piped character-input streams.

@author      Mark Reinhold
@since       1.1

## PipedReader.PipedReader(PipedWriter)

```java
public PipedReader(PipedWriter src) throws IOException
```

Creates a {@code PipedReader} so
that it is connected to the piped writer
{@code src}. Data written to {@code src}
will then be available as input from this stream.

@param      src   the stream to connect to.
@throws     IOException  if an I/O error occurs.

## PipedReader.PipedReader(PipedWriter, int)

```java
public PipedReader(PipedWriter src, int pipeSize) throws IOException
```

Creates a {@code PipedReader} so that it is connected
to the piped writer {@code src} and uses the specified
pipe size for the pipe's buffer. Data written to {@code src}
will then be  available as input from this stream.

@param      src       the stream to connect to.
@param      pipeSize  the size of the pipe's buffer.
@throws     IOException  if an I/O error occurs.
@throws     IllegalArgumentException if {@code pipeSize <= 0}.
@since      1.6

## PipedReader.PipedReader()

```java
public PipedReader()
```

Creates a {@code PipedReader} so
that it is not yet {@linkplain #connect(java.io.PipedWriter)
connected}. It must be {@linkplain java.io.PipedWriter#connect(
java.io.PipedReader) connected} to a {@code PipedWriter}
before being used.

## PipedReader.PipedReader(int)

```java
public PipedReader(int pipeSize)
```

Creates a {@code PipedReader} so that it is not yet
{@link #connect(java.io.PipedWriter) connected} and uses
the specified pipe size for the pipe's buffer.
It must be  {@linkplain java.io.PipedWriter#connect(
java.io.PipedReader) connected} to a {@code PipedWriter}
before being used.

@param   pipeSize the size of the pipe's buffer.
@throws  IllegalArgumentException if {@code pipeSize <= 0}.
@since   1.6

## PipedReader.connect(PipedWriter)

```java
public void connect(PipedWriter src) throws IOException
```

Causes this piped reader to be connected
to the piped  writer {@code src}.
If this object is already connected to some
other piped writer, an {@code IOException}
is thrown.
<p>
If {@code src} is an
unconnected piped writer and {@code snk}
is an unconnected piped reader, they
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

@param      src   The piped writer to connect to.
@throws     IOException  if an I/O error occurs.

## PipedReader.read()

```java
public synchronized int read() throws IOException
```

Reads the next character of data from this piped stream.
If no character is available because the end of the stream
has been reached, the value {@code -1} is returned.
This method blocks until input data is available, the end of
the stream is detected, or an exception is thrown.

@return  the next character of data, or {@code -1} if the end of the
         stream is reached.
@throws  IOException  if the pipe is
         <a href=PipedInputStream.html#BROKEN> {@code broken}</a>,
         {@link #connect(java.io.PipedWriter) unconnected}, closed,
         or an I/O error occurs.

## PipedReader.read(char[], int, int)

```java
public synchronized int read(char[] cbuf, int off, int len) throws IOException
```

{@inheritDoc}

<p> Fewer than {@code len} characters will be read if
{@code len} exceeds the pipe's buffer size.

@param      cbuf  {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}

@return     {@inheritDoc}

@throws     IndexOutOfBoundsException {@inheritDoc}
@throws     IOException  if the pipe is
            <a href=PipedInputStream.html#BROKEN> {@code broken}</a>,
            {@link #connect(java.io.PipedWriter) unconnected}, closed,
            or an I/O error occurs.

## PipedReader.ready()

```java
public synchronized boolean ready() throws IOException
```

Tell whether this stream is ready to be read.  A piped character
stream is ready if the circular buffer is not empty.

@throws     IOException  if the pipe is
            <a href=PipedInputStream.html#BROKEN> {@code broken}</a>,
            {@link #connect(java.io.PipedWriter) unconnected}, or closed.

## PipedReader.close()

```java
public void close() throws IOException
```

Closes this piped stream and releases any system resources
associated with the stream.

@throws     IOException  if an I/O error occurs.