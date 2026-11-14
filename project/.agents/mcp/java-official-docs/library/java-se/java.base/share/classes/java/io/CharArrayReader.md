# CharArrayReader class (java.io)

```java
public class CharArrayReader extends Reader
```

This class implements a character buffer that can be used as a
character-input stream.

@author      Herb Jellinek
@since       1.1

## CharArrayReader.buf

```java
protected char[] buf
```

The character buffer.

## CharArrayReader.pos

```java
protected int pos
```

The current buffer position.

## CharArrayReader.markedPos

```java
protected int markedPos
```

The position of mark in buffer.

## CharArrayReader.count

```java
protected int count
```

The index of the end of this buffer.  There is no valid
 data at or beyond this index.

## CharArrayReader.CharArrayReader(char[])

```java
public CharArrayReader(char[] buf)
```

Creates a CharArrayReader from the specified array of chars.
@param buf       Input buffer (not copied)

## CharArrayReader.CharArrayReader(char[], int, int)

```java
public CharArrayReader(char[] buf, int offset, int length)
```

Creates a CharArrayReader from the specified array of chars.

<p> The resulting reader will start reading at the given
{@code offset}.  The total number of {@code char} values that can be
read from this reader will be either {@code length} or
{@code buf.length-offset}, whichever is smaller.

@throws IllegalArgumentException
        If {@code offset} is negative or greater than
        {@code buf.length}, or if {@code length} is negative, or if
        the sum of these two values is negative.

@param buf       Input buffer (not copied)
@param offset    Offset of the first char to read
@param length    Number of chars to read

## CharArrayReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@throws      IOException  If an I/O error occurs

## CharArrayReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.

<p> If {@code len} is zero, then no characters are read and {@code 0} is
returned; otherwise, there is an attempt to read at least one character.
If no character is available because the stream is at its end, the value
{@code -1} is returned; otherwise, at least one character is read and
stored into {@code cbuf}.

@param      cbuf  {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}

@return     {@inheritDoc}

@throws     IndexOutOfBoundsException  {@inheritDoc}
@throws     IOException  {@inheritDoc}

## CharArrayReader.skip(long)

```java
public long skip(long n) throws IOException
```

Skips characters. If the stream is already at its end before this method
is invoked, then no characters are skipped and zero is returned.

<p>The {@code n} parameter may be negative, even though the
{@code skip} method of the {@link Reader} superclass throws
an exception in this case. If {@code n} is negative, then
this method does nothing and returns {@code 0}.

@param n {@inheritDoc}

@return {@inheritDoc}

@throws IOException {@inheritDoc}

## CharArrayReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  Character-array readers
are always ready to be read.

@throws     IOException  If an I/O error occurs

## CharArrayReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation, which it does.

## CharArrayReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream.  Subsequent calls to reset()
will reposition the stream to this point.

@param  readAheadLimit  Limit on the number of characters that may be
                        read while still preserving the mark.  Because
                        the stream's input comes from a character array,
                        there is no actual limit; hence this argument is
                        ignored.

@throws     IOException  If an I/O error occurs

## CharArrayReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark, or to the beginning if it has
never been marked.

@throws     IOException  If an I/O error occurs

## CharArrayReader.close()

```java
public void close()
```

Closes the stream and releases any system resources associated with
it.  Once the stream has been closed, further read(), ready(),
mark(), reset(), or skip() invocations will throw an IOException.
Closing a previously closed stream has no effect. This method will block
while there is another thread blocking on the reader.