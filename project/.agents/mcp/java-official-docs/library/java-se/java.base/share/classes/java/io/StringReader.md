# StringReader class (java.io)

```java
public class StringReader extends Reader
```

A character stream whose source is a string.

@apiNote
{@link Reader#of(CharSequence)} provides a method to read from any
{@link CharSequence} that may be more efficient than {@code StringReader}.

@author      Mark Reinhold
@since       1.1

## StringReader.StringReader(String)

```java
public StringReader(String s)
```

Creates a new string reader.

@param s  String providing the character stream.

## StringReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@return     The character read, or -1 if the end of the stream has been
            reached

@throws     IOException  If an I/O error occurs

## StringReader.read(char[], int, int)

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

## StringReader.skip(long)

```java
public long skip(long n) throws IOException
```

Skips characters. If the stream is already at its end before this method
is invoked, then no characters are skipped and zero is returned.

<p>The {@code n} parameter may be negative, even though the
{@code skip} method of the {@link Reader} superclass throws
an exception in this case. Negative values of {@code n} cause the
stream to skip backwards. Negative return values indicate a skip
backwards. It is not possible to skip backwards past the beginning of
the string.

<p>If the entire string has been read or skipped, then this method has
no effect and always returns {@code 0}.

@param n {@inheritDoc}

@return {@inheritDoc}

@throws IOException {@inheritDoc}

## StringReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

@return True if the next read() is guaranteed not to block for input

@throws     IOException  If the stream is closed

## StringReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation, which it does.

## StringReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream.  Subsequent calls to reset()
will reposition the stream to this point.

@param  readAheadLimit  Limit on the number of characters that may be
                        read while still preserving the mark.  Because
                        the stream's input comes from a string, there
                        is no actual limit, so this argument must not
                        be negative, but is otherwise ignored.

@throws     IllegalArgumentException  If {@code readAheadLimit < 0}
@throws     IOException  If an I/O error occurs

## StringReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark, or to the beginning of the
string if it has never been marked.

@throws     IOException  If an I/O error occurs

## StringReader.close()

```java
public void close()
```

Closes the stream and releases any system resources associated with
it. Once the stream has been closed, further read(),
ready(), mark(), or reset() invocations will throw an IOException.
Closing a previously closed stream has no effect. This method will block
while there is another thread blocking on the reader.