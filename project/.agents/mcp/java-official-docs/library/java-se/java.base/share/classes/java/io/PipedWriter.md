# PipedWriter class (java.io)

```java
public class PipedWriter extends Writer
```

Piped character-output streams.

@author      Mark Reinhold
@since       1.1

## PipedWriter.PipedWriter(PipedReader)

```java
public PipedWriter(PipedReader snk) throws IOException
```

Creates a piped writer connected to the specified piped
reader. Data characters written to this stream will then be
available as input from {@code snk}.

@param      snk   The piped reader to connect to.
@throws     IOException  if an I/O error occurs.

## PipedWriter.PipedWriter()

```java
public PipedWriter()
```

Creates a piped writer that is not yet connected to a
piped reader. It must be connected to a piped reader,
either by the receiver or the sender, before being used.

@see     java.io.PipedReader#connect(java.io.PipedWriter)
@see     java.io.PipedWriter#connect(java.io.PipedReader)

## PipedWriter.connect(PipedReader)

```java
public synchronized void connect(PipedReader snk) throws IOException
```

Connects this piped writer to a receiver. If this object
is already connected to some other piped reader, an
{@code IOException} is thrown.
<p>
If {@code snk} is an unconnected piped reader and
{@code src} is an unconnected piped writer, they may
be connected by either the call:
{@snippet lang=java :
    src.connect(snk)
}
or the call:
{@snippet lang=java :
    snk.connect(src)
}
The two calls have the same effect.

@param      snk   the piped reader to connect to.
@throws     IOException  if an I/O error occurs.

## PipedWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes the specified {@code char} to the piped output stream.
If a thread was reading data characters from the connected piped input
stream, but the thread is no longer alive, then an
{@code IOException} is thrown.
<p>
Implements the {@code write} method of {@code Writer}.

@param   c   the {@code char} to be written.
@throws  IOException  if the pipe is
         <a href=PipedOutputStream.html#BROKEN> {@code broken}</a>,
         {@link #connect(java.io.PipedReader) unconnected}, closed
         or an I/O error occurs.

## PipedWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes {@code len} characters from the specified character array
starting at offset {@code off} to this piped output stream.
This method blocks until all the characters are written to the output
stream.
If a thread was reading data characters from the connected piped input
stream, but the thread is no longer alive, then an
{@code IOException} is thrown.

@param   cbuf  the data.
@param   off   the start offset in the data.
@param   len   the number of characters to write.

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given array

@throws  IOException  if the pipe is
         <a href=PipedOutputStream.html#BROKEN>{@code broken}</a>,
         {@link #connect(java.io.PipedReader) unconnected}, closed
         or an I/O error occurs.

## PipedWriter.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this output stream and forces any buffered output characters
to be written out.
This will notify any readers that characters are waiting in the pipe.

@throws     IOException  if the pipe is closed, or an I/O error occurs.

## PipedWriter.close()

```java
public void close() throws IOException
```

Closes this piped output stream and releases any system resources
associated with this stream. This stream may no longer be used for
writing characters.

@throws     IOException  if an I/O error occurs.