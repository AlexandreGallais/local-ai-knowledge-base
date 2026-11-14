---
title: "Files class (java.nio.file) (part 6 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 6 of 8)

## Files.walkFileTree(Path, FileVisitor<? super Path>)

```java
public static Path walkFileTree(Path start, FileVisitor<? super Path> visitor) throws IOException
```

Walks a file tree.

 This method works as if invoking it were equivalent to evaluating the
expression:
Set, int, FileVisitor<? super Path>) Files.walkFileTree(start, EnumSet.noneOf(FileVisitOption.class), Integer.MAX_VALUE, visitor)
In other words, it does not follow symbolic links, and visits all levels
of the file tree.

Parameters:

- `start`: the starting file
- `visitor`: the file visitor to invoke for each file

**Returns:** the starting file

Throws:

- `IOException`: if an I/O error is thrown by a visitor method

## Files.newBufferedReader(Path, Charset)

```java
public static BufferedReader newBufferedReader(Path path, Charset cs) throws IOException
```

Opens a file for reading, returning a `BufferedReader` that may be
used to read text from the file in an efficient manner. Bytes from the
file are decoded into characters using the specified charset. Reading
commences at the beginning of the file.

 The `Reader` methods that read from the file throw `IOException` if a malformed or unmappable byte sequence is read.

Parameters:

- `path`: the path to the file
- `cs`: the charset to use for decoding

**Returns:** a new buffered reader, with default buffer size, to read text
         from the file

**See also:** #readAllLines

Throws:

- `IOException`: if an I/O error occurs opening the file

## Files.newBufferedReader(Path)

```java
public static BufferedReader newBufferedReader(Path path) throws IOException
```

Opens a file for reading, returning a `BufferedReader` to read text
from the file in an efficient manner. Bytes from the file are decoded into
characters using the UTF-8 charset.

 This method works as if invoking it were equivalent to evaluating the
expression:
Charset) Files.newBufferedReader(path, StandardCharsets.UTF_8)

Parameters:

- `path`: the path to the file

**Returns:** a new buffered reader, with default buffer size, to read text
         from the file

**Since:** 1.8

Throws:

- `IOException`: if an I/O error occurs opening the file

## Files.newBufferedWriter(Path, Charset, OpenOption...)

```java
public static BufferedWriter newBufferedWriter(Path path, Charset cs, OpenOption... options) throws IOException
```

Opens or creates a file for writing, returning a `BufferedWriter`
that may be used to write text to the file in an efficient manner.
The `options` parameter specifies how the file is created or
opened. If no options are present then this method works as if the CREATE, TRUNCATE_EXISTING, and WRITE options are present. In other words, it
opens the file for writing, creating the file if it doesn't exist, or
initially truncating an existing regular-file to
a size of `0` if it exists.

 The `Writer` methods to write text throw `IOException`
if the text cannot be encoded using the specified charset. Due to
buffering, an `IOException` caused by an encoding error
(unmappable-character or malformed-input) may be thrown when writing, flushing, or closing the buffered writer.

Parameters:

- `path`: the path to the file
- `cs`: the charset to use for encoding
- `options`: options specifying how the file is opened

**Returns:** a new buffered writer, with default buffer size, to write text
         to the file

**See also:** #write(Path,Iterable,Charset,OpenOption[])

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs opening or creating the file
- `UnsupportedOperationException`: if an unsupported option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*

## Files.newBufferedWriter(Path, OpenOption...)

```java
public static BufferedWriter newBufferedWriter(Path path, OpenOption... options) throws IOException
```

Opens or creates a file for writing, returning a `BufferedWriter`
to write text to the file in an efficient manner. The text is encoded
into bytes for writing using the UTF-8
charset.

 This method works as if invoking it were equivalent to evaluating the
expression:
Charset, OpenOption...) Files.newBufferedWriter(path, StandardCharsets.UTF_8, options)

Parameters:

- `path`: the path to the file
- `options`: options specifying how the file is opened

**Returns:** a new buffered writer, with default buffer size, to write text
         to the file

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs opening or creating the file
- `UnsupportedOperationException`: if an unsupported option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*

## Files.copy(InputStream, Path, CopyOption...)

```java
public static long copy(InputStream in, Path target, CopyOption... options) throws IOException
```

Copies all bytes from an input stream to a file. On return, the input
stream will be at end of stream.

 By default, the copy fails if the target file already exists or is a
symbolic link. If the REPLACE_EXISTING option is specified, and the target file already exists,
then it is replaced if it is not a non-empty directory. If the target
file exists and is a symbolic link, then the symbolic link is replaced.
In this release, the `REPLACE_EXISTING` option is the only option
required to be supported by this method. Additional options may be
supported in future releases.

  If an I/O error occurs reading from the input stream or writing to
the file, then it may do so after the target file has been created and
after some bytes have been read or written. Consequently the input
stream may not be at end of stream and may be in an inconsistent state.
It is strongly recommended that the input stream be promptly closed if an
I/O error occurs.

 This method may block indefinitely reading from the input stream (or
writing to the file). The behavior for the case that the input stream is
*asynchronously closed* or the thread interrupted during the copy is
highly input stream and file system provider specific and therefore not
specified.

 **Usage example**: Suppose we want to capture a web page and save
it to a file:

Parameters:

- `in`: the input stream to read from
- `target`: the path to the file
- `options`: options specifying how the copy should be done

**Returns:** the number of bytes read or written

Throws:

- `IOException`: if an I/O error occurs when reading or writing
- `FileAlreadyExistsException`: if the target file exists but cannot be replaced because the `REPLACE_EXISTING` option is not specified *(optional specific exception)*
- `DirectoryNotEmptyException`: the `REPLACE_EXISTING` option is specified but the file cannot be replaced because it is a non-empty directory *(optional specific exception)*
- `UnsupportedOperationException`: if `options` contains a copy option that is not supported

## Files.copy(Path, OutputStream)

```java
public static long copy(Path source, OutputStream out) throws IOException
```

Copies all bytes from a file to an output stream.

 If an I/O error occurs reading from the file or writing to the output
stream, then it may do so after some bytes have been read or written.
Consequently the output stream may be in an inconsistent state. It is
strongly recommended that the output stream be promptly closed if an I/O
error occurs.

 This method may block indefinitely writing to the output stream (or
reading from the file). The behavior for the case that the output stream
is *asynchronously closed* or the thread interrupted during the copy
is highly output stream and file system provider specific and therefore
not specified.

 Note that if the given output stream is `java.io.Flushable`
then its flush method may need to invoked
after this method completes so as to flush any buffered output.

Parameters:

- `source`: the path to the file
- `out`: the output stream to write to

**Returns:** the number of bytes read or written

Throws:

- `IOException`: if an I/O error occurs when reading or writing

## Files.readAllBytes(Path)

```java
public static byte[] readAllBytes(Path path) throws IOException
```

Reads all the bytes from a file. The method ensures that the file is
closed when all bytes have been read or an I/O error, or other runtime
exception, is thrown.

 Note that this method is intended for simple cases where it is
convenient to read all bytes into a byte array. It is not intended for
reading in large files.

Parameters:

- `path`: the path to the file

**Returns:** a byte array containing the bytes read from the file

Throws:

- `IOException`: if an I/O error occurs reading from the stream
- `OutOfMemoryError`: if an array of the required size cannot be allocated, for example the file is larger that `2GB`

## Files.readString(Path)

```java
public static String readString(Path path) throws IOException
```

Reads all content from a file into a string, decoding from bytes to characters
using the UTF-8 charset.
The method ensures that the file is closed when all content have been read
or an I/O error, or other runtime exception, is thrown.

 This method is equivalent to: Charset) readString(path, StandardCharsets.UTF_8).

Parameters:

- `path`: the path to the file

**Returns:** a String containing the content read from the file

**Since:** 11

Throws:

- `IOException`: if an I/O error occurs reading from the file or a malformed or unmappable byte sequence is read
- `OutOfMemoryError`: if the file is extremely large, for example larger than `2GB`

## Files.readString(Path, Charset)

```java
public static String readString(Path path, Charset cs) throws IOException
```

Reads all characters from a file into a string, decoding from bytes to characters
using the specified charset.
The method ensures that the file is closed when all content have been read
or an I/O error, or other runtime exception, is thrown.

 This method reads all content including the line separators in the middle
and/or at the end. The resulting string will contain line separators as they
appear in the file.

Parameters:

- `path`: the path to the file
- `cs`: the charset to use for decoding

**API note:** This method is intended for simple cases where it is appropriate and convenient
to read the content of a file into a String. It is not intended for reading
very large files.

**Returns:** a String containing the content read from the file

**Since:** 11

Throws:

- `IOException`: if an I/O error occurs reading from the file or a malformed or unmappable byte sequence is read
- `OutOfMemoryError`: if the file is extremely large, for example larger than `2GB`

## Files.readAllLines(Path, Charset)

```java
public static List<String> readAllLines(Path path, Charset cs) throws IOException
```

Read all lines from a file. This method ensures that the file is
closed when all bytes have been read or an I/O error, or other runtime
exception, is thrown. Bytes from the file are decoded into characters
using the specified charset.

 This method recognizes the following as line terminators:

-  `\u000D` followed by `\u000A`,
    CARRIAGE RETURN followed by LINE FEED

-  `\u000A`, LINE FEED

-  `\u000D`, CARRIAGE RETURN

 Additional Unicode line terminators may be recognized in future
releases.

 Note that this method is intended for simple cases where it is
convenient to read all lines in a single operation. It is not intended
for reading in large files.

Parameters:

- `path`: the path to the file
- `cs`: the charset to use for decoding

**Returns:** the lines from the file as a `List`; whether the `List` is modifiable or not is implementation dependent and
         therefore not specified

**See also:** #newBufferedReader

Throws:

- `IOException`: if an I/O error occurs reading from the file or a malformed or unmappable byte sequence is read

## Files.readAllLines(Path)

```java
public static List<String> readAllLines(Path path) throws IOException
```

Read all lines from a file. Bytes from the file are decoded into characters
using the UTF-8 charset.

 This method works as if invoking it were equivalent to evaluating the
expression:
Charset) Files.readAllLines(path, StandardCharsets.UTF_8)

Parameters:

- `path`: the path to the file

**Returns:** the lines from the file as a `List`; whether the `List` is modifiable or not is implementation dependent and
         therefore not specified

**Since:** 1.8

Throws:

- `IOException`: if an I/O error occurs reading from the file or a malformed or unmappable byte sequence is read

## Files.write(Path, byte[], OpenOption...)

```java
public static Path write(Path path, byte[] bytes, OpenOption... options) throws IOException
```

Writes bytes to a file. The `options` parameter specifies how
the file is created or opened. If no options are present then this method
works as if the CREATE, TRUNCATE_EXISTING, and WRITE options are present. In other words, it
opens the file for writing, creating the file if it doesn't exist, or
initially truncating an existing regular-file to
a size of `0`. All bytes in the byte array are written to the file.
The method ensures that the file is closed when all bytes have been
written (or an I/O error or other runtime exception is thrown). If an I/O
error occurs then it may do so after the file has been created or
truncated, or after some bytes have been written to the file.

 **Usage example**: By default the method creates a new file or
overwrites an existing file. Suppose you instead want to append bytes
to an existing file:

Parameters:

- `path`: the path to the file
- `bytes`: the byte array with the bytes to write
- `options`: options specifying how the file is opened

**Returns:** the path

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs writing to or creating the file
- `UnsupportedOperationException`: if an unsupported option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*
