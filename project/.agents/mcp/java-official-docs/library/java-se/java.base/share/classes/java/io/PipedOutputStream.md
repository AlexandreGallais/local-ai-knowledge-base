# PipedOutputStream class (java.io)

```java
public class PipedOutputStream extends OutputStream
```

A piped output stream can be connected to a piped input stream
to create a communications pipe. The piped output stream is the
sending end of the pipe. Typically, data is written to a
{@code PipedOutputStream} object by one thread and data is
read from the connected {@code PipedInputStream} by some
other thread. Attempting to use both objects from a single thread
is not recommended as it may deadlock the thread.
The pipe is said to be <a id=BROKEN> <i>broken</i> </a> if a
thread that was reading data bytes from the connected piped input
stream is no longer alive.

@author  James Gosling
@see     java.io.PipedInputStream
@since   1.0

## PipedOutputStream.PipedOutputStream(PipedInputStream)

```java
public PipedOutputStream(PipedInputStream snk) throws IOException
```

Creates a piped output stream connected to the specified piped
input stream. Data bytes written to this stream will then be
available as input from {@code snk}.

@param      snk   The piped input stream to connect to.
@throws     IOException  if an I/O error occurs.

## PipedOutputStream.PipedOutputStream()

```java
public PipedOutputStream()
```

Creates a piped output stream that is not yet connected to a
piped input stream. It must be connected to a piped input stream,
either by the receiver or the sender, before being used.

@see     java.io.PipedInputStream#connect(java.io.PipedOutputStream)
@see     java.io.PipedOutputStream#connect(java.io.PipedInputStream)

## PipedOutputStream.connect(PipedInputStream)

```java
public synchronized void connect(PipedInputStream snk) throws IOException
```

Connects this piped output stream to a receiver. If this object
is already connected to some other piped input stream, an
{@code IOException} is thrown.
<p>
If {@code snk} is an unconnected piped input stream and
{@code src} is an unconnected piped output stream, they may
be connected by either the call:
{@snippet lang=java :
    src.connect(snk)
}
or the call:
{@snippet lang=java :
    snk.connect(src)
}
The two calls have the same effect.

@param      snk   the piped input stream to connect to.
@throws     IOException  if an I/O error occurs.

## PipedOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified {@code byte} to the piped output stream.
<p>
Implements the {@code write} method of {@code OutputStream}.

@param   b   the {@code byte} to be written.
@throws  IOException if the pipe is <a href=#BROKEN> broken</a>,
         {@link #connect(java.io.PipedInputStream) unconnected},
         closed, or if an I/O error occurs.

## PipedOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to this piped output stream.
This method blocks until all the bytes are written to the output
stream.

@param   b     {@inheritDoc}
@param   off   {@inheritDoc}
@param   len   {@inheritDoc}
@throws  IOException if the pipe is <a href=#BROKEN> broken</a>,
         {@link #connect(java.io.PipedInputStream) unconnected},
         closed, or if an I/O error occurs.
@throws  IndexOutOfBoundsException {@inheritDoc}

## PipedOutputStream.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this output stream and forces any buffered output bytes
to be written out.
This will notify any readers that bytes are waiting in the pipe.

@throws    IOException {@inheritDoc}

## PipedOutputStream.close()

```java
public void close() throws IOException
```

Closes this piped output stream and releases any system resources
associated with this stream. This stream may no longer be used for
writing bytes.

@throws     IOException  {@inheritDoc}