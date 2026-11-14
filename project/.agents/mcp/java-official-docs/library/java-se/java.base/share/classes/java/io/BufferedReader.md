---
title: "BufferedReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/BufferedReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BufferedReader class (java.io)

```java
public class BufferedReader extends Reader
```

Reads text from a character-input stream, buffering characters so as to
provide for the efficient reading of characters, arrays, and lines.

 The buffer size may be specified, or the default size may be used.  The
default is large enough for most purposes.

 In general, each read request made of a Reader causes a corresponding
read request to be made of the underlying character or byte stream.  It is
therefore advisable to wrap a `BufferedReader` around any
`Reader` whose `read()` operations may be costly, such as
`FileReader`s and `InputStreamReader`s.  For
example,

will buffer the input from the specified file.  Without buffering, each
invocation of `read()` or `readLine()` could cause bytes to be
read from the file, converted into characters, and then returned, which can
be very inefficient.

 Programs that use `DataInputStream`s for textual input can be
localized by replacing each `DataInputStream` with an appropriate
`BufferedReader`.

**API note:** Once wrapped in a `BufferedReader`, the underlying
`Reader` should not be used directly nor wrapped with
another reader.

**See also:** FileReader

**See also:** InputStreamReader

**See also:** java.nio.file.Files#newBufferedReader

**Since:** 1.1

## BufferedReader.BufferedReader(Reader, int)

```java
public BufferedReader(Reader in, int sz)
```

Creates a buffering character-input stream that uses an input buffer of
the specified size.

Parameters:

- `in`: A Reader
- `sz`: Input-buffer size

Throws:

- `IllegalArgumentException`: If `sz <= 0`

## BufferedReader.BufferedReader(Reader)

```java
public BufferedReader(Reader in)
```

Creates a buffering character-input stream that uses a default-sized
input buffer.

Parameters:

- `in`: A Reader

## BufferedReader.read()

```java
public int read() throws IOException
```

Reads a single character.

**Returns:** The character read, as an integer in the range
        0 to 65535 (`0x00-0xffff`), or -1 if the
        end of the stream has been reached

Throws:

- `IOException`: If an I/O error occurs

## BufferedReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

Reads characters into a portion of an array.

 This method implements the general contract of the corresponding
int, int) read method of the
`Reader` class.  As an additional convenience, it
attempts to read as many characters as possible by repeatedly invoking
the `read` method of the underlying stream.  This iterated
`read` continues until one of the following conditions becomes
true:

-  The specified number of characters have been read,

-  The `read` method of the underlying stream returns
  `-1`, indicating end-of-file, or

-  The `ready` method of the underlying stream
  returns `false`, indicating that further input requests
  would block.

If the first `read` on the underlying stream returns
`-1` to indicate end-of-file then this method returns
`-1`.  Otherwise this method returns the number of characters
actually read.

 Subclasses of this class are encouraged, but not required, to
attempt to read as many characters as possible in the same fashion.

 Ordinarily this method takes characters from this stream's character
buffer, filling it from the underlying stream as necessary.  If,
however, the buffer is empty, the mark is not valid, and the requested
length is at least as large as the buffer, then this method will read
characters directly from the underlying stream into the given array.
Thus redundant `BufferedReader`s will not copy data
unnecessarily.

Parameters:

- `cbuf`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: (inherited documentation)

## BufferedReader.readLine()

```java
public String readLine() throws IOException
```

Reads a line of text.  A line is considered to be terminated by any one
of a line feed ('\n'), a carriage return ('\r'), a carriage return
followed immediately by a line feed, or by reaching the end-of-file
(EOF).

**Returns:** A String containing the contents of the line, not including
            any line-termination characters, or null if the end of the
            stream has been reached without reading any characters

**See also:** java.nio.file.Files#readAllLines

Throws:

- `IOException`: If an I/O error occurs

## BufferedReader.skip(long)

```java
public long skip(long n) throws IOException
```

(inherited documentation)

## BufferedReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  A buffered character
stream is ready if the buffer is not empty, or if the underlying
character stream is ready.

Throws:

- `IOException`: If an I/O error occurs

## BufferedReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation, which it does.

## BufferedReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream.  Subsequent calls to reset()
will attempt to reposition the stream to this point.

Parameters:

- `readAheadLimit`: Limit on the number of characters that may be read while still preserving the mark. An attempt to reset the stream after reading characters up to this limit or beyond may fail. A limit value larger than the size of the input buffer will cause a new buffer to be allocated whose size is no smaller than limit. Therefore large values should be used with care.

Throws:

- `IllegalArgumentException`: If `readAheadLimit < 0`
- `IOException`: If an I/O error occurs

## BufferedReader.reset()

```java
public void reset() throws IOException
```

Resets the stream to the most recent mark.

Throws:

- `IOException`: If the stream has never been marked, or if the mark has been invalidated

## BufferedReader.lines()

```java
public Stream<String> lines()
```

Returns a `Stream`, the elements of which are lines read from
this `BufferedReader`.  The `Stream` is lazily populated,
i.e., read only occurs during the
terminal
stream operation.

 The reader must not be operated on during the execution of the
terminal stream operation. Otherwise, the result of the terminal stream
operation is undefined.

 After execution of the terminal stream operation there are no
guarantees that the reader will be at a specific position from which to
read the next character or line.

 If an `IOException` is thrown when accessing the underlying
`BufferedReader`, it is wrapped in an `UncheckedIOException` which will be thrown from the `Stream`
method that caused the read to take place. This method will return a
Stream if invoked on a BufferedReader that is closed. Any operation on
that stream that requires reading from the BufferedReader after it is
closed, will cause an UncheckedIOException to be thrown.

**Returns:** a `Stream<String>` providing the lines of text
        described by this `BufferedReader`

**Since:** 1.8
