---
title: "Files class (java.nio.file) (part 7 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 7 of 8)

## Files.write(Path, Iterable<? extends CharSequence>, Charset, OpenOption...)

```java
public static Path write(Path path, Iterable<? extends CharSequence> lines, Charset cs, OpenOption... options) throws IOException
```

Write lines of text to a file. Each line is a char sequence and is
written to the file in sequence with each line terminated by the
platform's line separator, as defined by the system property `line.separator`. Characters are encoded into bytes using the specified
charset.

 The `options` parameter specifies how the file is created
or opened. If no options are present then this method works as if the
CREATE, TRUNCATE_EXISTING, and WRITE options are present. In other words, it
opens the file for writing, creating the file if it doesn't exist, or
initially truncating an existing regular-file to
a size of `0`. The method ensures that the file is closed when all
lines have been written (or an I/O error or other runtime exception is
thrown). If an I/O error occurs then it may do so after the file has
been created or truncated, or after some bytes have been written to the
file.

Parameters:

- `path`: the path to the file
- `lines`: an object to iterate over the char sequences
- `cs`: the charset to use for encoding
- `options`: options specifying how the file is opened

**Returns:** the path

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs writing to or creating the file, or the text cannot be encoded using the specified charset
- `UnsupportedOperationException`: if an unsupported option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*

## Files.write(Path, Iterable<? extends CharSequence>, OpenOption...)

```java
public static Path write(Path path, Iterable<? extends CharSequence> lines, OpenOption... options) throws IOException
```

Write lines of text to a file. Characters are encoded into bytes using
the UTF-8 charset.

 This method works as if invoking it were equivalent to evaluating the
expression:
Iterable<? extends CharSequence>, Charset, OpenOption...) Files.write(path, lines, StandardCharsets.UTF_8, options)

Parameters:

- `path`: the path to the file
- `lines`: an object to iterate over the char sequences
- `options`: options specifying how the file is opened

**Returns:** the path

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs writing to or creating the file, or the text cannot be encoded as `UTF-8`
- `UnsupportedOperationException`: if an unsupported option is specified

## Files.writeString(Path, CharSequence, OpenOption...)

```java
public static Path writeString(Path path, CharSequence csq, OpenOption... options) throws IOException
```

Write a CharSequence to a file.
Characters are encoded into bytes using the
UTF-8 charset.

 This method is equivalent to: CharSequence, Charset, OpenOption...) writeString(path, csq, StandardCharsets.UTF_8, options).

Parameters:

- `path`: the path to the file
- `csq`: the CharSequence to be written
- `options`: options specifying how the file is opened

**Returns:** the path

**Since:** 11

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs writing to or creating the file, or the text cannot be encoded using UTF-8
- `UnsupportedOperationException`: if an unsupported option is specified

## Files.writeString(Path, CharSequence, Charset, OpenOption...)

```java
public static Path writeString(Path path, CharSequence csq, Charset cs, OpenOption... options) throws IOException
```

Write a CharSequence to a file.
Characters are encoded into bytes using the specified
charset.

 All characters are written as they are, including the line separators in
the char sequence. No extra characters are added.

 The `options` parameter specifies how the file is created
or opened. If no options are present then this method works as if the
CREATE, TRUNCATE_EXISTING, and WRITE options are present. In other words, it
opens the file for writing, creating the file if it doesn't exist, or
initially truncating an existing regular-file to
a size of `0`.

Parameters:

- `path`: the path to the file
- `csq`: the CharSequence to be written
- `cs`: the charset to use for encoding
- `options`: options specifying how the file is opened

**Returns:** the path

**Since:** 11

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `IOException`: if an I/O error occurs writing to or creating the file, or the text cannot be encoded using the specified charset
- `UnsupportedOperationException`: if an unsupported option is specified

## Files.list(Path)

```java
public static Stream<Path> list(Path dir) throws IOException
```

Returns a lazily populated `Stream`, the elements of
which are the entries in the directory.  The listing is not recursive.

 The elements of the stream are `Path` objects that are
obtained as if by resolving the name of the
directory entry against `dir`. Some file systems maintain special
links to the directory itself and the directory's parent directory.
Entries representing these links are not included.

 The stream is *weakly consistent*. It is thread safe but does
not freeze the directory while iterating, so it may (or may not)
reflect updates to the directory that occur after returning from this
method.

 The returned stream contains a reference to an open directory.
The directory is closed by closing the stream.

 Operating on a closed stream behaves as if the end of stream
has been reached. Due to read-ahead, one or more elements may be
returned after the stream has been closed.

 If an `IOException` is thrown when accessing the directory
after this method has returned, it is wrapped in an `UncheckedIOException` which will be thrown from the method that caused
the access to take place.

Parameters:

- `dir`: The path to the directory

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open directory is closed
promptly after the stream's operations have completed.

**Returns:** The `Stream` describing the content of the
         directory

**See also:** #newDirectoryStream(Path)

**Since:** 1.8

Throws:

- `NotDirectoryException`: if the file could not otherwise be opened because it is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs when opening the directory

## Files.walk(Path, int, FileVisitOption...)

```java
public static Stream<Path> walk(Path start, int maxDepth, FileVisitOption... options) throws IOException
```

Returns a `Stream` that is lazily populated with `Path` by walking the file tree rooted at a given starting file.  The
file tree is traversed *depth-first* with a directory visited
before the entries in that directory. The elements in the stream are
`Path` objects that are obtained as if by resolving the relative path against `start`.

 The `stream` walks the file tree as elements are consumed.
The `Stream` returned is guaranteed to have at least one
element, the starting file itself. For each file visited, the stream
attempts to read its `BasicFileAttributes`. If the file is a
directory and can be opened successfully, entries in the directory, and
their *descendants* will follow the directory in the stream as
they are encountered. When all entries have been visited, then the
directory is closed. The file tree walk then continues at the next
*sibling* of the directory.

 The stream is *weakly consistent*. It does not freeze the
file tree while iterating, so it may (or may not) reflect updates to
the file tree that occur after returned from this method.

 By default, symbolic links are not automatically followed by this
method. If the `options` parameter contains the FOLLOW_LINKS option then symbolic links are
followed. When following links, and the attributes of the target cannot
be read, then this method attempts to get the `BasicFileAttributes`
of the link.

 If the `options` parameter contains the FOLLOW_LINKS option then the stream keeps
track of directories visited so that cycles can be detected. A cycle
arises when there is an entry in a directory that is an ancestor of the
directory. Cycle detection is done by recording the file-key of directories,
or if file keys are not available, by invoking the isSameFile method to test if a directory is the same file as an
ancestor. When a cycle is detected it is treated as an I/O error with
an instance of `FileSystemLoopException`.

 The `maxDepth` parameter is the maximum number of levels of
directories to visit. A value of `0` means that only the starting
file is visited. A value of MAX_VALUE may be used
to indicate that all levels should be visited.

 The returned stream contains references to one or more open directories.
The directories are closed by closing the stream.

 If an `IOException` is thrown when accessing the directory
after this method has returned, it is wrapped in an `UncheckedIOException` which will be thrown from the method that caused
the access to take place.

Parameters:

- `start`: the starting file
- `maxDepth`: the maximum number of directory levels to visit
- `options`: options to configure the traversal

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open directories are closed
promptly after the stream's operations have completed.

**Returns:** the `Stream` of `Path`

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if the `maxDepth` parameter is negative
- `IOException`: if an I/O error is thrown when accessing the starting file.

## Files.walk(Path, FileVisitOption...)

```java
public static Stream<Path> walk(Path start, FileVisitOption... options) throws IOException
```

Returns a `Stream` that is lazily populated with `Path` by walking the file tree rooted at a given starting file.  The
file tree is traversed *depth-first* with a directory visited
before the entries in that directory. The elements in the stream are
`Path` objects that are obtained as if by resolving the relative path against `start`.

 This method works as if invoking it were equivalent to evaluating the
expression:
int, FileVisitOption...) Files.walk(start, Integer.MAX_VALUE, options)
In other words, it visits all levels of the file tree.

 The returned stream contains references to one or more open directories.
The directories are closed by closing the stream.

Parameters:

- `start`: the starting file
- `options`: options to configure the traversal

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open directories are closed
promptly after the stream's operations have completed.

**Returns:** the `Stream` of `Path`

**See also:** #walk(Path, int, FileVisitOption...)

**Since:** 1.8

Throws:

- `IOException`: if an I/O error is thrown when accessing the starting file.

## Files.find(Path, int, BiPredicate, FileVisitOption...)

```java
public static Stream<Path> find(Path start, int maxDepth, BiPredicate<Path, BasicFileAttributes> matcher, FileVisitOption... options) throws IOException
```

Returns a `Stream` that is lazily populated with `Path` by searching for files in a file tree rooted at a given starting
file.

 This method walks the file tree in exactly the manner specified by
the walk method. For each file encountered, the given
`BiPredicate` is invoked with its `Path` and `BasicFileAttributes`. The `Path` object is obtained as if by
resolving the relative path against `start` and is only included in the returned `Stream` if
the `BiPredicate` returns true. Compare to calling filter on the `Stream`
returned by `walk` method, this method may be more efficient by
avoiding redundant retrieval of the `BasicFileAttributes`.

 The returned stream contains references to one or more open directories.
The directories are closed by closing the stream.

 If an `IOException` is thrown when accessing the directory
after returned from this method, it is wrapped in an `UncheckedIOException` which will be thrown from the method that caused
the access to take place.

Parameters:

- `start`: the starting file
- `maxDepth`: the maximum number of directory levels to search
- `matcher`: the function used to decide whether a file should be included in the returned stream
- `options`: options to configure the traversal

**API note:** This method must be used within a try-with-resources statement or similar
control structure to ensure that the stream's open directories are closed
promptly after the stream's operations have completed.

**Returns:** the `Stream` of `Path`

**See also:** #walk(Path, int, FileVisitOption...)

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if the `maxDepth` parameter is negative
- `IOException`: if an I/O error is thrown when accessing the starting file.
