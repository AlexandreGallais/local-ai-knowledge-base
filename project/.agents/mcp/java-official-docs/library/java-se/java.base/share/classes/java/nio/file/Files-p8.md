---
title: "Files class (java.nio.file) (part 8 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 8 of 8)

## Files.lines(Path, Charset)

```java
public static Stream<String> lines(Path path, Charset cs) throws IOException
```

Read all lines from a file as a `Stream`. Unlike Charset) readAllLines, this method does not read
all lines into a `List`, but instead populates lazily as the stream
is consumed.

 Bytes from the file are decoded into characters using the specified
charset and the same line terminators as specified by `readAllLines` are supported.

 The returned stream contains a reference to an open file. The file
is closed by closing the stream.

 The file contents should not be modified during the execution of the
terminal stream operation. Otherwise, the result of the terminal stream
operation is undefined.

 After this method returns, then any subsequent I/O exception that
occurs while reading from the file or when a malformed or unmappable byte
sequence is read, is wrapped in an `UncheckedIOException` that will
be thrown from the
`java.util.stream.Stream` method that caused the read to take
place. In case an `IOException` is thrown when closing the file,
it is also wrapped as an `UncheckedIOException`.

Parameters:

- `path`: the path to the file
- `cs`: the charset to use for decoding

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open file is closed promptly
after the stream's operations have completed.

**Implementation note:** This implementation supports good parallel stream performance for the
standard charsets UTF-8,
US-ASCII and
ISO-8859-1.  Such
*line-optimal* charsets have the property that the encoded bytes
of a line feed ('\n') or a carriage return ('\r') are efficiently
identifiable from other encoded characters when randomly accessing the
bytes of the file.

 For non-*line-optimal* charsets the stream source's
spliterator has poor splitting properties, similar to that of a
spliterator associated with an iterator or that associated with a stream
returned from `BufferedReader.lines()`.  Poor splitting properties
can result in poor parallel stream performance.

 For *line-optimal* charsets the stream source's spliterator
has good splitting properties, assuming the file contains a regular
sequence of lines.  Good splitting properties can result in good parallel
stream performance.  The spliterator for a *line-optimal* charset
takes advantage of the charset properties (a line feed or a carriage
return being efficient identifiable) such that when splitting it can
approximately divide the number of covered lines in half.

**Returns:** the lines from the file as a `Stream`

**See also:** #readAllLines(Path, Charset)

**See also:** #newBufferedReader(Path, Charset)

**See also:** java.io.BufferedReader#lines()

**Since:** 1.8

Throws:

- `IOException`: if an I/O error occurs opening the file

## Files.lines(Path)

```java
public static Stream<String> lines(Path path) throws IOException
```

Read all lines from a file as a `Stream`. Bytes from the file are
decoded into characters using the UTF-8
charset.

 The returned stream contains a reference to an open file. The file
is closed by closing the stream.

 The file contents should not be modified during the execution of the
terminal stream operation. Otherwise, the result of the terminal stream
operation is undefined.

 This method works as if invoking it were equivalent to evaluating the
expression:
Charset) Files.lines(path, StandardCharsets.UTF_8)

Parameters:

- `path`: the path to the file

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open file is closed promptly
after the stream's operations have completed.

**Returns:** the lines from the file as a `Stream`

**Since:** 1.8

Throws:

- `IOException`: if an I/O error occurs opening the file
