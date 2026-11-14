# BufferedReader class (java.io)

```java
public class BufferedReader extends Reader
```

Reads text from a character-input stream, buffering characters so as to
provide for the efficient reading of characters, arrays, and lines.

<p> The buffer size may be specified, or the default size may be used.  The
default is large enough for most purposes.

<p> In general, each read request made of a Reader causes a corresponding
read request to be made of the underlying character or byte stream.  It is
therefore advisable to wrap a {@code BufferedReader} around any
{@code Reader} whose {@code read()} operations may be costly, such as
{@code FileReader}s and {@code InputStreamReader}s.  For
example,

{@snippet lang=java :
    BufferedReader in = new BufferedReader(new FileReader("foo.in"));
}

will buffer the input from the specified file.  Without buffering, each
invocation of {@code read()} or {@code readLine()} could cause bytes to be
read from the file, converted into characters, and then returned, which can
be very inefficient.

<p> Programs that use {@code DataInputStream}s for textual input can be
localized by replacing each {@code DataInputStream} with an appropriate
{@code BufferedReader}.

@apiNote
Once wrapped in a {@code BufferedReader}, the underlying
{@code Reader} should not be used directly nor wrapped with
another reader.

@see FileReader
@see InputStreamReader
@see java.nio.file.Files#newBufferedReader

@author      Mark Reinhold
@since       1.1

## BufferedReader.BufferedReader(Reader, int)

```java
public BufferedReader(Reader in, int sz)
```

Creates a buffering character-input stream that uses an input buffer of
the specified size.

@param  in   A Reader
@param  sz   Input-buffer size

@throws IllegalArgumentException  If {@code sz <= 0}

## BufferedReader.BufferedReader(Reader)

```java
public BufferedReader(Reader in)
```

Creates a buffering character-input stream that uses a default-sized
input buffer.

@param  in   A Reader

## BufferedReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@return The character read, as an integer in the range
        0 to 65535 ({@code 0x00-0xffff}), or -1 if the
        end of the stream has been reached
@throws     IOException  If an I/O error occurs

## BufferedReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.

<p> This method implements the general contract of the corresponding
{@link Reader#read(char[], int, int) read} method of the
{@link Reader} class.  As an additional convenience, it
attempts to read as many characters as possible by repeatedly invoking
the {@code read} method of the underlying stream.  This iterated
{@code read} continues until one of the following conditions becomes
true:
<ul>

  <li> The specified number of characters have been read,

  <li> The {@code read} method of the underlying stream returns
  {@code -1}, indicating end-of-file, or

  <li> The {@code ready} method of the underlying stream
  returns {@code false}, indicating that further input requests
  would block.

</ul>
If the first {@code read} on the underlying stream returns
{@code -1} to indicate end-of-file then this method returns
{@code -1}.  Otherwise this method returns the number of characters
actually read.

<p> Subclasses of this class are encouraged, but not required, to
attempt to read as many characters as possible in the same fashion.

<p> Ordinarily this method takes characters from this stream's character
buffer, filling it from the underlying stream as necessary.  If,
however, the buffer is empty, the mark is not valid, and the requested
length is at least as large as the buffer, then this method will read
characters directly from the underlying stream into the given array.
Thus redundant {@code BufferedReader}s will not copy data
unnecessarily.

@param      cbuf  {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}

@return     {@inheritDoc}

@throws     IndexOutOfBoundsException {@inheritDoc}
@throws     IOException  {@inheritDoc}

## BufferedReader.readLine()

```java
public String readLine() throws IOException
```

Reads a line of text.  A line is considered to be terminated by any one
of a line feed ('\n'), a carriage return ('\r'), a carriage return
followed immediately by a line feed, or by reaching the end-of-file
(EOF).

@return     A String containing the contents of the line, not including
            any line-termination characters, or null if the end of the
            stream has been reached without reading any characters

@throws     IOException  If an I/O error occurs

@see java.nio.file.Files#readAllLines

## BufferedReader.skip(long)

```java
public long skip(long n) throws IOException
```

{@inheritDoc}

## BufferedReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  A buffered character
stream is ready if the buffer is not empty, or if the underlying
character stream is ready.

@throws     IOException  If an I/O error occurs

## BufferedReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation, which it does.

## BufferedReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream.  Subsequent calls to reset()
will attempt to reposition the stream to this point.

@param readAheadLimit   Limit on the number of characters that may be
                        read while still preserving the mark. An attempt
                        to reset the stream after reading characters
                        up to this limit or beyond may fail.
                        A limit value larger than the size of the input
                        buffer will cause a new buffer to be allocated
                        whose size is no smaller than limit.
                        Therefore large values should be used with care.

@throws     IllegalArgumentException  If {@code readAheadLimit < 0}
@throws     IOException  If an I/O error occurs

## BufferedReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark.

@throws     IOException  If the stream has never been marked,
                         or if the mark has been invalidated

## BufferedReader.lines()

```java
public Stream<String> lines()
```

Returns a {@code Stream}, the elements of which are lines read from
this {@code BufferedReader}.  The {@link Stream} is lazily populated,
i.e., read only occurs during the
<a href="../util/stream/package-summary.html#StreamOps">terminal
stream operation</a>.

<p> The reader must not be operated on during the execution of the
terminal stream operation. Otherwise, the result of the terminal stream
operation is undefined.

<p> After execution of the terminal stream operation there are no
guarantees that the reader will be at a specific position from which to
read the next character or line.

<p> If an {@link IOException} is thrown when accessing the underlying
{@code BufferedReader}, it is wrapped in an {@link
UncheckedIOException} which will be thrown from the {@code Stream}
method that caused the read to take place. This method will return a
Stream if invoked on a BufferedReader that is closed. Any operation on
that stream that requires reading from the BufferedReader after it is
closed, will cause an UncheckedIOException to be thrown.

@return a {@code Stream<String>} providing the lines of text
        described by this {@code BufferedReader}

@since 1.8