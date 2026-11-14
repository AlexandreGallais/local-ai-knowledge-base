---
title: "BufferedWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/BufferedWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BufferedWriter class (java.io)

```java
public class BufferedWriter extends Writer
```

Writes text to a character-output stream, buffering characters so as to
provide for the efficient writing of single characters, arrays, and strings.

 The buffer size may be specified, or the default size may be accepted.
The default is large enough for most purposes.

 A `newLine()` method is provided, which uses the platform's own
notion of line separator as defined by the system property
line.separator. Not all platforms use the newline character ('\n')
to terminate lines. Calling this method to terminate each output line is
therefore preferred to writing a newline character directly.

 In general, a `Writer` sends its output immediately to the
underlying character or byte stream.  Unless prompt output is required, it
is advisable to wrap a `BufferedWriter` around any `Writer` whose
`write()` operations may be costly, such as `FileWriter`s and
`OutputStreamWriter`s.  For example,

will buffer the `PrintWriter`'s output to the file.  Without buffering,
each invocation of a `print()` method would cause characters to be
converted into bytes that would then be written immediately to the file,
which can be very inefficient.

**API note:** Once wrapped in a `BufferedWriter`, the underlying
`Writer` should not be used directly nor wrapped with
another writer.

**See also:** PrintWriter

**See also:** FileWriter

**See also:** OutputStreamWriter

**See also:** java.nio.file.Files#newBufferedWriter

**Since:** 1.1

## BufferedWriter.BufferedWriter(Writer)

```java
public BufferedWriter(Writer out)
```

Creates a buffered character-output stream that uses a default-sized
output buffer.

Parameters:

- `out`: A Writer

## BufferedWriter.BufferedWriter(Writer, int)

```java
public BufferedWriter(Writer out, int sz)
```

Creates a new buffered character-output stream that uses an output
buffer of the given size.

Parameters:

- `out`: A Writer
- `sz`: Output-buffer size, a positive integer

Throws:

- `IllegalArgumentException`: If `sz <= 0`

## BufferedWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

Throws:

- `IOException`: If an I/O error occurs

## BufferedWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

 Ordinarily this method stores characters from the given array into
this stream's buffer, flushing the buffer to the underlying stream as
needed.  If the requested length is at least as large as the buffer,
however, then this method will flush the buffer and write the characters
directly to the underlying stream.  Thus redundant
`BufferedWriter`s will not copy data unnecessarily.

Parameters:

- `cbuf`: A character array
- `off`: Offset from which to start reading characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array
- `IOException`: If an I/O error occurs

## BufferedWriter.write(String, int, int)

```java
public void write(String s, int off, int len) throws IOException
```

Writes a portion of a String.

Parameters:

- `s`: String to be written
- `off`: Offset from which to start reading characters
- `len`: Number of characters to be written

**Implementation requirements:** While the specification of this method in the
superclass
recommends that an `IndexOutOfBoundsException` be thrown
if `len` is negative or `off + len` is negative,
the implementation in this class does not throw such an exception in
these cases but instead simply writes no characters.

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `off + len` is greater than the length of the given string
- `IOException`: If an I/O error occurs

## BufferedWriter.newLine()

```java
public void newLine() throws IOException
```

Writes a line separator.  The line separator string is defined by the
system property `line.separator`, and is not necessarily a single
newline ('\n') character.

Throws:

- `IOException`: If an I/O error occurs

## BufferedWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

Throws:

- `IOException`: If an I/O error occurs
