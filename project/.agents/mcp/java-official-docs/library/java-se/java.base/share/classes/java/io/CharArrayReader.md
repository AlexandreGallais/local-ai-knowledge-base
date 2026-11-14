---
title: "CharArrayReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/CharArrayReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharArrayReader class (java.io)

```java
public class CharArrayReader extends Reader
```

This class implements a character buffer that can be used as a
character-input stream.

**Since:** 1.1

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

Parameters:

- `buf`: Input buffer (not copied)

## CharArrayReader.CharArrayReader(char[], int, int)

```java
public CharArrayReader(char[] buf, int offset, int length)
```

Creates a CharArrayReader from the specified array of chars.

 The resulting reader will start reading at the given
`offset`.  The total number of `char` values that can be
read from this reader will be either `length` or
`buf.length-offset`, whichever is smaller.

Parameters:

- `buf`: Input buffer (not copied)
- `offset`: Offset of the first char to read
- `length`: Number of chars to read

Throws:

- `IllegalArgumentException`: If `offset` is negative or greater than `buf.length`, or if `length` is negative, or if the sum of these two values is negative.

## CharArrayReader.read()

```java
public int read() throws IOException
```

Reads a single character.

Throws:

- `IOException`: If an I/O error occurs

## CharArrayReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.

 If `len` is zero, then no characters are read and `0` is
returned; otherwise, there is an attempt to read at least one character.
If no character is available because the stream is at its end, the value
`-1` is returned; otherwise, at least one character is read and
stored into `cbuf`.

Parameters:

- `cbuf`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: (inherited documentation)

## CharArrayReader.skip(long)

```java
public long skip(long n) throws IOException
```

Skips characters. If the stream is already at its end before this method
is invoked, then no characters are skipped and zero is returned.

The `n` parameter may be negative, even though the
`skip` method of the `Reader` superclass throws
an exception in this case. If `n` is negative, then
this method does nothing and returns `0`.

Parameters:

- `n`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IOException`: (inherited documentation)

## CharArrayReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  Character-array readers
are always ready to be read.

Throws:

- `IOException`: If an I/O error occurs

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

Parameters:

- `readAheadLimit`: Limit on the number of characters that may be read while still preserving the mark. Because the stream's input comes from a character array, there is no actual limit; hence this argument is ignored.

Throws:

- `IOException`: If an I/O error occurs

## CharArrayReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark, or to the beginning if it has
never been marked.

Throws:

- `IOException`: If an I/O error occurs

## CharArrayReader.close()

```java
public void close()
```

Closes the stream and releases any system resources associated with
it.  Once the stream has been closed, further read(), ready(),
mark(), reset(), or skip() invocations will throw an IOException.
Closing a previously closed stream has no effect. This method will block
while there is another thread blocking on the reader.
