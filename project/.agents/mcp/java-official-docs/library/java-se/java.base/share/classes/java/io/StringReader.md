---
title: "StringReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/StringReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringReader class (java.io)

```java
public class StringReader extends Reader
```

A character stream whose source is a string.

**API note:** `Reader.of(CharSequence)` provides a method to read from any
`CharSequence` that may be more efficient than `StringReader`.

**Since:** 1.1

## StringReader.StringReader(String)

```java
public StringReader(String s)
```

Creates a new string reader.

Parameters:

- `s`: String providing the character stream.

## StringReader.read()

```java
public int read() throws IOException
```

Reads a single character.

**Returns:** The character read, or -1 if the end of the stream has been
            reached

Throws:

- `IOException`: If an I/O error occurs

## StringReader.read(char[], int, int)

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

## StringReader.skip(long)

```java
public long skip(long n) throws IOException
```

Skips characters. If the stream is already at its end before this method
is invoked, then no characters are skipped and zero is returned.

The `n` parameter may be negative, even though the
`skip` method of the `Reader` superclass throws
an exception in this case. Negative values of `n` cause the
stream to skip backwards. Negative return values indicate a skip
backwards. It is not possible to skip backwards past the beginning of
the string.

If the entire string has been read or skipped, then this method has
no effect and always returns `0`.

Parameters:

- `n`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IOException`: (inherited documentation)

## StringReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

**Returns:** True if the next read() is guaranteed not to block for input

Throws:

- `IOException`: If the stream is closed

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

Parameters:

- `readAheadLimit`: Limit on the number of characters that may be read while still preserving the mark. Because the stream's input comes from a string, there is no actual limit, so this argument must not be negative, but is otherwise ignored.

Throws:

- `IllegalArgumentException`: If `readAheadLimit < 0`
- `IOException`: If an I/O error occurs

## StringReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark, or to the beginning of the
string if it has never been marked.

Throws:

- `IOException`: If an I/O error occurs

## StringReader.close()

```java
public void close()
```

Closes the stream and releases any system resources associated with
it. Once the stream has been closed, further read(),
ready(), mark(), or reset() invocations will throw an IOException.
Closing a previously closed stream has no effect. This method will block
while there is another thread blocking on the reader.
