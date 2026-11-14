# LineNumberReader class (java.io)

```java
public class LineNumberReader extends BufferedReader
```

A buffered character-input stream that keeps track of line numbers.  This
class defines methods {@link #setLineNumber(int)} and {@link
#getLineNumber()} for setting and getting the current line number
respectively.

<p> By default, line numbering begins at 0. This number increments at every
<a href="#lt">line terminator</a> as the data is read, and at the end of the
stream if the last character in the stream is not a line terminator.  This
number can be changed with a call to {@code setLineNumber(int)}.  Note
however, that {@code setLineNumber(int)} does not actually change the current
position in the stream; it only changes the value that will be returned by
{@code getLineNumber()}.

<p> A line is considered to be <a id="lt">terminated</a> by any one of a
line feed ('\n'), a carriage return ('\r'), or a carriage return followed
immediately by a linefeed, or any of the previous terminators followed by
end of stream, or end of stream not preceded by another terminator.

@author      Mark Reinhold
@since       1.1

## LineNumberReader.LineNumberReader(Reader)

```java
public LineNumberReader(Reader in)
```

Create a new line-numbering reader, using the default input-buffer
size.

@param  in
        A Reader object to provide the underlying stream

## LineNumberReader.LineNumberReader(Reader, int)

```java
public LineNumberReader(Reader in, int sz)
```

Create a new line-numbering reader, reading characters into a buffer of
the given size.

@param  in
        A Reader object to provide the underlying stream

@param  sz
        An int specifying the size of the buffer

## LineNumberReader.setLineNumber(int)

```java
public void setLineNumber(int lineNumber)
```

Set the current line number.

@param  lineNumber
        An int specifying the line number

@see #getLineNumber

## LineNumberReader.getLineNumber()

```java
public int getLineNumber()
```

Get the current line number.

@return  The current line number

@see #setLineNumber

## LineNumberReader.read()

```java
public int read() throws IOException
```

Read a single character.  <a href="#lt">Line terminators</a> are
compressed into single newline ('\n') characters.  The current line
number is incremented whenever a line terminator is read, or when the
end of the stream is reached and the last character in the stream is
not a line terminator.

@return  The character read, or -1 if the end of the stream has been
         reached

@throws  IOException
         If an I/O error occurs

## LineNumberReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.  This method will block
until some input is available, an I/O error occurs, or the end of the
stream is reached.

<p> If {@code len} is zero, then no characters are read and {@code 0} is
returned; otherwise, there is an attempt to read at least one character.
If no character is available because the stream is at its end, the value
{@code -1} is returned; otherwise, at least one character is read and
stored into {@code cbuf}.

<p><a href="#lt">Line terminators</a> are compressed into single newline
('\n') characters.  The current line number is incremented whenever a
line terminator is read, or when the end of the stream is reached and
the last character in the stream is not a line terminator.

@param  cbuf  {@inheritDoc}
@param  off   {@inheritDoc}
@param  len   {@inheritDoc}

@return  {@inheritDoc}

@throws  IndexOutOfBoundsException {@inheritDoc}
@throws  IOException {@inheritDoc}

## LineNumberReader.readLine()

```java
public String readLine() throws IOException
```

Read a line of text.  <a href="#lt">Line terminators</a> are compressed
into single newline ('\n') characters. The current line number is
incremented whenever a line terminator is read, or when the end of the
stream is reached and the last character in the stream is not a line
terminator.

@return  A String containing the contents of the line, not including
         any <a href="#lt">line termination characters</a>, or
         {@code null} if the end of the stream has been reached

@throws  IOException
         If an I/O error occurs

## LineNumberReader.skip(long)

```java
public long skip(long n) throws IOException
```

{@inheritDoc}

## LineNumberReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Mark the present position in the stream.  Subsequent calls to reset()
will attempt to reposition the stream to this point, and will also reset
the line number appropriately.

@param  readAheadLimit
        Limit on the number of characters that may be read while still
        preserving the mark.  After reading this many characters,
        attempting to reset the stream may fail.

@throws  IOException
         If an I/O error occurs

## LineNumberReader.reset()

```java
public void reset() throws IOException
```

Reset the stream to the most recent mark.

@throws  IOException
         If the stream has not been marked, or if the mark has been
         invalidated