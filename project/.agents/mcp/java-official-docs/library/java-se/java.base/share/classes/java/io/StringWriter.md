---
title: "StringWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/StringWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringWriter class (java.io)

```java
public class StringWriter extends Writer
```

A character stream that collects its output in a string buffer, which can
then be used to construct a string.

Closing a `StringWriter` has no effect. The methods in this class
can be called after the stream has been closed without generating an
`IOException`.

**Since:** 1.1

## StringWriter.StringWriter()

```java
public StringWriter()
```

Create a new string writer using the default initial string-buffer
size.

## StringWriter.StringWriter(int)

```java
public StringWriter(int initialSize)
```

Create a new string writer using the specified initial string-buffer
size.

Parameters:

- `initialSize`: The number of `char` values that will fit into this buffer before it is automatically expanded

Throws:

- `IllegalArgumentException`: If `initialSize` is negative

## StringWriter.write(int)

```java
public void write(int c)
```

Write a single character.

## StringWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len)
```

Write a portion of an array of characters.

Parameters:

- `cbuf`: Array of characters
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array

## StringWriter.write(String)

```java
public void write(String str)
```

Write a string.

## StringWriter.write(String, int, int)

```java
public void write(String str, int off, int len)
```

Write a portion of a string.

Parameters:

- `str`: String to be written
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given string

## StringWriter.append(CharSequence)

```java
public StringWriter append(CharSequence csq)
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

## StringWriter.append(CharSequence, int, int)

```java
public StringWriter append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this writer.

 An invocation of this method of the form
`out.append(csq, start, end)` when `csq`
is not `null`, behaves in
exactly the same way as the invocation

Parameters:

- `csq`: The character sequence from which a subsequence will be appended. If `csq` is `null`, then characters will be appended as if `csq` contained the four characters `"null"`.
- `start`: The index of the first character in the subsequence
- `end`: The index of the character following the last character in the subsequence

**Returns:** This writer

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: If `start` or `end` are negative, `start` is greater than `end`, or `end` is greater than `csq.length()`

## StringWriter.append(char)

```java
public StringWriter append(char c)
```

Appends the specified character to this writer.

 An invocation of this method of the form `out.append(c)`
behaves in exactly the same way as the invocation

Parameters:

- `c`: The 16-bit character to append

**Returns:** This writer

**Since:** 1.5

## StringWriter.toString()

```java
public String toString()
```

Return the buffer's current value as a string.

## StringWriter.getBuffer()

```java
public StringBuffer getBuffer()
```

Return the string buffer itself.

**Returns:** StringBuffer holding the current buffer value.

## StringWriter.flush()

```java
public void flush()
```

Flush the stream.

 The `flush` method of `StringWriter` does nothing.

## StringWriter.close()

```java
public void close() throws IOException
```

Closing a `StringWriter` has no effect. The methods in this
class can be called after the stream has been closed without generating
an `IOException`.
