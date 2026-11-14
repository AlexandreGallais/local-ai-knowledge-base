---
title: "LineNumberReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/LineNumberReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LineNumberReader class (java.io)

```java
public class LineNumberReader extends BufferedReader
```

A buffered character-input stream that keeps track of line numbers.  This
class defines methods `setLineNumber(int)` and `getLineNumber()` for setting and getting the current line number
respectively.

 By default, line numbering begins at 0. This number increments at every
line terminator as the data is read, and at the end of the
stream if the last character in the stream is not a line terminator.  This
number can be changed with a call to `setLineNumber(int)`.  Note
however, that `setLineNumber(int)` does not actually change the current
position in the stream; it only changes the value that will be returned by
`getLineNumber()`.

 A line is considered to be terminated by any one of a
line feed ('\n'), a carriage return ('\r'), or a carriage return followed
immediately by a linefeed, or any of the previous terminators followed by
end of stream, or end of stream not preceded by another terminator.

**Since:** 1.1

## LineNumberReader.LineNumberReader(Reader)

```java
public LineNumberReader(Reader in)
```

Create a new line-numbering reader, using the default input-buffer
size.

Parameters:

- `in`: A Reader object to provide the underlying stream

## LineNumberReader.LineNumberReader(Reader, int)

```java
public LineNumberReader(Reader in, int sz)
```

Create a new line-numbering reader, reading characters into a buffer of
the given size.

Parameters:

- `in`: A Reader object to provide the underlying stream
- `sz`: An int specifying the size of the buffer

## LineNumberReader.setLineNumber(int)

```java
public void setLineNumber(int lineNumber)
```

Set the current line number.

Parameters:

- `lineNumber`: An int specifying the line number

**See also:** #getLineNumber

## LineNumberReader.getLineNumber()

```java
public int getLineNumber()
```

Get the current line number.

**Returns:** The current line number

**See also:** #setLineNumber

## LineNumberReader.read()

```java
public int read() throws IOException
```

Read a single character.  Line terminators are
compressed into single newline ('\n') characters.  The current line
number is incremented whenever a line terminator is read, or when the
end of the stream is reached and the last character in the stream is
not a line terminator.

**Returns:** The character read, or -1 if the end of the stream has been
         reached

Throws:

- `IOException`: If an I/O error occurs

## LineNumberReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.  This method will block
until some input is available, an I/O error occurs, or the end of the
stream is reached.

 If `len` is zero, then no characters are read and `0` is
returned; otherwise, there is an attempt to read at least one character.
If no character is available because the stream is at its end, the value
`-1` is returned; otherwise, at least one character is read and
stored into `cbuf`.

Line terminators are compressed into single newline
('\n') characters.  The current line number is incremented whenever a
line terminator is read, or when the end of the stream is reached and
the last character in the stream is not a line terminator.

Parameters:

- `cbuf`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: (inherited documentation)

## LineNumberReader.readLine()

```java
public String readLine() throws IOException
```

Read a line of text.  Line terminators are compressed
into single newline ('\n') characters. The current line number is
incremented whenever a line terminator is read, or when the end of the
stream is reached and the last character in the stream is not a line
terminator.

**Returns:** A String containing the contents of the line, not including
         any line termination characters, or
         `null` if the end of the stream has been reached

Throws:

- `IOException`: If an I/O error occurs

## LineNumberReader.skip(long)

```java
public long skip(long n) throws IOException
```

(inherited documentation)

## LineNumberReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Mark the present position in the stream.  Subsequent calls to reset()
will attempt to reposition the stream to this point, and will also reset
the line number appropriately.

Parameters:

- `readAheadLimit`: Limit on the number of characters that may be read while still preserving the mark. After reading this many characters, attempting to reset the stream may fail.

Throws:

- `IOException`: If an I/O error occurs

## LineNumberReader.reset()

```java
public void reset() throws IOException
```

Reset the stream to the most recent mark.

Throws:

- `IOException`: If the stream has not been marked, or if the mark has been invalidated
