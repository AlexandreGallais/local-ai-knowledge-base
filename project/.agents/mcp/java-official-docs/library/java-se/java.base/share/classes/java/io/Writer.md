---
title: "Writer class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/Writer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Writer class (java.io)

```java
public abstract class Writer implements Appendable, Closeable, Flushable
```

Abstract class for writing to character streams.  The only methods that a
subclass must implement are write(char[], int, int), flush(), and close().
Most subclasses, however, will override some of the methods defined here in
order to provide higher efficiency, additional functionality, or both.

**See also:** BufferedWriter

**See also:** CharArrayWriter

**See also:** FilterWriter

**See also:** OutputStreamWriter

**See also:** FileWriter

**See also:** PipedWriter

**See also:** PrintWriter

**See also:** StringWriter

**See also:** Reader

**Since:** 1.1

## Writer.nullWriter()

```java
public static Writer nullWriter()
```

Returns a new `Writer` which discards all characters.  The
returned stream is initially open.  The stream is closed by calling
the `close()` method.  Subsequent calls to `close()` have
no effect.

 While the stream is open, the `append(char)`, `append(CharSequence)`, `append(CharSequence, int, int)`,
`flush()`, `write(int)`, `write(char[])`, and
`write(char[], int, int)` methods do nothing. After the stream
has been closed, these methods all throw `IOException`.

 The object used to synchronize operations on the
returned `Writer` is not specified.

**Returns:** a `Writer` which discards all characters

**Since:** 11

## Writer.lock

```java
protected Object lock
```

The object used to synchronize operations on this stream.  For
efficiency, a character-stream object may use an object other than
itself to protect critical sections.  A subclass should therefore use
the object in this field rather than `this` or a synchronized
method.

## Writer.Writer()

```java
protected Writer()
```

Creates a new character-stream writer whose critical sections will
synchronize on the writer itself.

## Writer.Writer(Object)

```java
protected Writer(Object lock)
```

Creates a new character-stream writer whose critical sections will
synchronize on the given object.

Parameters:

- `lock`: Object to synchronize on

## Writer.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.  The character to be written is contained in
the 16 low-order bits of the given integer value; the 16 high-order bits
are ignored.

 Subclasses that intend to support efficient single-character output
should override this method.

Parameters:

- `c`: int specifying a character to be written

Throws:

- `IOException`: If an I/O error occurs

## Writer.write(char[])

```java
public void write(char[] cbuf) throws IOException
```

Writes an array of characters.

Parameters:

- `cbuf`: Array of characters to be written

Throws:

- `IOException`: If an I/O error occurs

## Writer.write(char[], int, int)

```java
public abstract void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

Parameters:

- `cbuf`: Array of characters
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: Implementations should throw this exception if `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array
- `IOException`: If an I/O error occurs

## Writer.write(String)

```java
public void write(String str) throws IOException
```

Writes a string.

Parameters:

- `str`: String to be written

Throws:

- `IOException`: If an I/O error occurs

## Writer.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

Parameters:

- `str`: A String
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

**Implementation requirements:** The implementation in this class throws an
`IndexOutOfBoundsException` for the indicated conditions;
overriding methods may choose to do otherwise.

Throws:

- `IndexOutOfBoundsException`: Implementations should throw this exception if `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given string
- `IOException`: If an I/O error occurs

## Writer.append(CharSequence)

```java
public Writer append(CharSequence csq) throws IOException
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

Throws:

- `IOException`: If an I/O error occurs

## Writer.append(CharSequence, int, int)

```java
public Writer append(CharSequence csq, int start, int end) throws IOException
```

Appends a subsequence of the specified character sequence to this writer.

 An invocation of this method of the form
`out.append(csq, start, end)` when `csq`
is not `null` behaves in exactly the
same way as the invocation

Parameters:

- `csq`: The character sequence from which a subsequence will be appended. If `csq` is `null`, then characters will be appended as if `csq` contained the four characters `"null"`.
- `start`: The index of the first character in the subsequence
- `end`: The index of the character following the last character in the subsequence

**Returns:** This writer

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: If `start` or `end` are negative, `start` is greater than `end`, or `end` is greater than `csq.length()`
- `IOException`: If an I/O error occurs

## Writer.append(char)

```java
public Writer append(char c) throws IOException
```

Appends the specified character to this writer.

 An invocation of this method of the form `out.append(c)`
behaves in exactly the same way as the invocation

Parameters:

- `c`: The 16-bit character to append

**Returns:** This writer

**Since:** 1.5

Throws:

- `IOException`: If an I/O error occurs

## Writer.flush()

```java
public abstract void flush() throws IOException
```

Flushes the stream.  If the stream has saved any characters from the
various write() methods in a buffer, write them immediately to their
intended destination.  Then, if that destination is another character or
byte stream, flush it.  Thus one flush() invocation will flush all the
buffers in a chain of Writers and OutputStreams.

 If the intended destination of this stream is an abstraction provided
by the underlying operating system, for example a file, then flushing the
stream guarantees only that bytes previously written to the stream are
passed to the operating system for writing; it does not guarantee that
they are actually written to a physical device such as a disk drive.

Throws:

- `IOException`: If an I/O error occurs

## Writer.close()

```java
public abstract void close() throws IOException
```

Closes the stream, flushing it first. Once the stream has been closed,
further write() or flush() invocations will cause an IOException to be
thrown. Closing a previously closed stream has no effect.

Throws:

- `IOException`: If an I/O error occurs
