---
title: "LineNumberInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/LineNumberInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LineNumberInputStream class (java.io)

```java
public class LineNumberInputStream extends FilterInputStream
```

This class is an input stream filter that provides the added
functionality of keeping track of the current line number.

A line is a sequence of bytes ending with a carriage return
character (`'\u005Cr'`), a newline character
(`'\u005Cn'`), or a carriage return character followed
immediately by a linefeed character. In all three cases, the line
terminating character(s) are returned as a single newline character.

The line number begins at `0`, and is incremented by
`1` when a `read` returns a newline character.

**See also:** java.io.LineNumberReader

**Since:** 1.0

**Deprecated:** This class incorrectly assumes that bytes adequately represent
            characters.  As of JDK 1.1, the preferred way to operate on
            character streams is via the new character-stream classes, which
            include a class for counting line numbers.

## LineNumberInputStream.LineNumberInputStream(InputStream)

```java
public LineNumberInputStream(InputStream in)
```

Constructs a newline number input stream that reads its input
from the specified input stream.

Parameters:

- `in`: the underlying input stream.

## LineNumberInputStream.read()

```java
public int read() throws IOException
```

Reads the next byte of data from this input stream. The value
byte is returned as an `int` in the range
`0` to `255`. If no byte is available
because the end of the stream has been reached, the value
`-1` is returned. This method blocks until input data
is available, the end of the stream is detected, or an exception
is thrown.

The `read` method of
`LineNumberInputStream` calls the `read`
method of the underlying input stream. It checks for carriage
returns and newline characters in the input, and modifies the
current line number as appropriate. A carriage-return character or
a carriage return followed by a newline character are both
converted into a single newline character.

**Returns:** the next byte of data, or `-1` if the end of this
            stream is reached.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.LineNumberInputStream#getLineNumber()

Throws:

- `IOException`: if an I/O error occurs.

## LineNumberInputStream.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this input stream
into an array of bytes. This method blocks until some input is available.

The `read` method of
`LineNumberInputStream` repeatedly calls the
`read` method of zero arguments to fill in the byte array.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: the start offset of the data.
- `len`: the maximum number of bytes read.

**Returns:** the total number of bytes read into the buffer, or
            `-1` if there is no more data because the end of
            this stream has been reached.

**See also:** java.io.LineNumberInputStream#read()

Throws:

- `IOException`: if an I/O error occurs.

## LineNumberInputStream.skip(long)

```java
public long skip(long n) throws IOException
```

Skips over and discards `n` bytes of data from this
input stream. The `skip` method may, for a variety of
reasons, end up skipping over some smaller number of bytes,
possibly `0`. The actual number of bytes skipped is
returned.  If `n` is negative, no bytes are skipped.

The `skip` method of `LineNumberInputStream` creates
a byte array and then repeatedly reads into it until
`n` bytes have been read or the end of the stream has
been reached.

Parameters:

- `n`: the number of bytes to be skipped.

**Returns:** the actual number of bytes skipped.

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: if an I/O error occurs.

## LineNumberInputStream.setLineNumber(int)

```java
public void setLineNumber(int lineNumber)
```

Sets the line number to the specified argument.

Parameters:

- `lineNumber`: the new line number.

**See also:** #getLineNumber

## LineNumberInputStream.getLineNumber()

```java
public int getLineNumber()
```

Returns the current line number.

**Returns:** the current line number.

**See also:** #setLineNumber

## LineNumberInputStream.available()

```java
public int available() throws IOException
```

Returns the number of bytes that can be read from this input
stream without blocking.

Note that if the underlying input stream is able to supply
*k* input characters without blocking, the
`LineNumberInputStream` can guarantee only to provide
*k*/2 characters without blocking, because the
*k* characters from the underlying input stream might
consist of *k*/2 pairs of `'\u005Cr'` and
`'\u005Cn'`, which are converted to just
*k*/2 `'\u005Cn'` characters.

**Returns:** the number of bytes that can be read from this input stream
            without blocking.

**See also:** java.io.FilterInputStream#in

Throws:

- `IOException`: if an I/O error occurs.

## LineNumberInputStream.mark(int)

```java
public void mark(int readlimit)
```

Marks the current position in this input stream. A subsequent
call to the `reset` method repositions this stream at
the last marked position so that subsequent reads re-read the same bytes.

The `mark` method of
`LineNumberInputStream` remembers the current line
number in a private variable, and then calls the `mark`
method of the underlying input stream.

Parameters:

- `readlimit`: the maximum limit of bytes that can be read before the mark position becomes invalid.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.LineNumberInputStream#reset()

## LineNumberInputStream.reset()

```java
public void reset() throws IOException
```

Repositions this stream to the position at the time the
`mark` method was last called on this input stream.

The `reset` method of
`LineNumberInputStream` resets the line number to be
the line number at the time the `mark` method was
called, and then calls the `reset` method of the
underlying input stream.

Stream marks are intended to be used in
situations where you need to read ahead a little to see what's in
the stream. Often this is most easily done by invoking some
general parser. If the stream is of the type handled by the
parser, it just chugs along happily. If the stream is not of
that type, the parser should toss an exception when it fails,
which, if it happens within readlimit bytes, allows the outer
code to reset the stream and try another parser.

**See also:** java.io.FilterInputStream#in

**See also:** java.io.LineNumberInputStream#mark(int)

Throws:

- `IOException`: if an I/O error occurs.
