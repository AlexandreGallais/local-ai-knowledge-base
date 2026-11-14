---
title: "CharArrayWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/CharArrayWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharArrayWriter class (java.io)

```java
public class CharArrayWriter extends Writer
```

This class implements a character buffer that can be used as a Writer.
The buffer automatically grows when data is written to the stream.  The data
can be retrieved using toCharArray() and toString().

Note: Invoking close() on this class has no effect, and methods
of this class can be called after the stream has closed
without generating an IOException.

**Since:** 1.1

## CharArrayWriter.buf

```java
protected char[] buf
```

The buffer where data is stored.

## CharArrayWriter.count

```java
protected int count
```

The number of chars in the buffer.

## CharArrayWriter.CharArrayWriter()

```java
public CharArrayWriter()
```

Creates a new CharArrayWriter.

## CharArrayWriter.CharArrayWriter(int)

```java
public CharArrayWriter(int initialSize)
```

Creates a new CharArrayWriter with the specified initial size.

Parameters:

- `initialSize`: an int specifying the initial buffer size.

Throws:

- `IllegalArgumentException`: if initialSize is negative

## CharArrayWriter.write(int)

```java
public void write(int c)
```

Writes a character to the buffer.

## CharArrayWriter.write(char[], int, int)

```java
public void write(char[] c, int off, int len)
```

Writes characters to the buffer.

Parameters:

- `c`: the data to be written
- `off`: the start offset in the data
- `len`: the number of chars that are written

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array

## CharArrayWriter.write(String, int, int)

```java
public void write(String str, int off, int len)
```

Write a portion of a string to the buffer.

Parameters:

- `str`: String to be written from
- `off`: Offset from which to start reading characters
- `len`: Number of characters to be written

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given string

## CharArrayWriter.writeTo(Writer)

```java
public void writeTo(Writer out) throws IOException
```

Writes the contents of the buffer to another character stream.

Parameters:

- `out`: the output stream to write to

Throws:

- `IOException`: If an I/O error occurs.

## CharArrayWriter.append(CharSequence)

```java
public CharArrayWriter append(CharSequence csq)
```

Appends the specified character sequence to this writer.

 An invocation of this method of the form `out.append(csq)`
when `csq` is not `null`, behaves in exactly the same way
as the invocation

 Depending on the specification of `toString` for the
character sequence `csq`, the entire sequence may not be
appended. For instance, invoking the `toString` method of a
character buffer will return a subsequence whose content depends upon
the buffer's position and limit.

Parameters:

- `csq`: The character sequence to append. If `csq` is `null`, then the four characters `"null"` are appended to this writer.

**Returns:** This writer

**Since:** 1.5

## CharArrayWriter.append(CharSequence, int, int)

```java
public CharArrayWriter append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this writer.

 An invocation of this method of the form
`out.append(csq, start, end)` when
`csq` is not `null`, behaves in
exactly the same way as the invocation

Parameters:

- `csq`: The character sequence from which a subsequence will be appended. If `csq` is `null`, then characters will be appended as if `csq` contained the four characters `"null"`.
- `start`: The index of the first character in the subsequence
- `end`: The index of the character following the last character in the subsequence

**Returns:** This writer

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: If `start` or `end` are negative, `start` is greater than `end`, or `end` is greater than `csq.length()`

## CharArrayWriter.append(char)

```java
public CharArrayWriter append(char c)
```

Appends the specified character to this writer.

 An invocation of this method of the form `out.append(c)`
behaves in exactly the same way as the invocation

Parameters:

- `c`: The 16-bit character to append

**Returns:** This writer

**Since:** 1.5

## CharArrayWriter.reset()

```java
public void reset()
```

Resets the buffer so that you can use it again without
throwing away the already allocated buffer.

## CharArrayWriter.toCharArray()

```java
public char[] toCharArray()
```

Returns a copy of the input data.

**Returns:** an array of chars copied from the input data.

## CharArrayWriter.size()

```java
public int size()
```

Returns the current size of the buffer.

**Returns:** an int representing the current size of the buffer.

## CharArrayWriter.toString()

```java
public String toString()
```

Converts input data to a string.

**Returns:** the string.

## CharArrayWriter.flush()

```java
public void flush()
```

Flush the stream.

 The `flush` method of `CharArrayWriter` does nothing.

## CharArrayWriter.close()

```java
public void close()
```

Close the stream.  This method does not release the buffer, since its
contents might still be required. Note: Invoking this method in this class
will have no effect.
