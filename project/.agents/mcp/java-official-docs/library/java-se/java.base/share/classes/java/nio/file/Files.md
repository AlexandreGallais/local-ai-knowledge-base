---
title: "Files class (java.nio.file) (part 1 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file)

```java
public final class Files
```

This class consists exclusively of static methods that operate on files,
directories, or other types of files.

 In most cases, the methods defined here will delegate to the associated
file system provider to perform the file operations.

**Since:** 1.7

## Files.newInputStream(Path, OpenOption...)

```java
public static InputStream newInputStream(Path path, OpenOption... options) throws IOException
```

Opens a file, returning an input stream to read from the file. The stream
will not be buffered, and is not required to support the mark or reset methods. The
stream will be safe for access by multiple concurrent threads. Reading
commences at the beginning of the file. Whether the returned stream is
*asynchronously closeable* and/or *interruptible* is highly
file system provider specific and therefore not specified.

 The `options` parameter determines how the file is opened.
If no options are present then it is equivalent to opening the file with
the READ option. In addition to the `READ` option, an implementation may also support additional implementation
specific options.

Parameters:

- `path`: the path to the file to open
- `options`: options specifying how the file is opened

**Returns:** a new input stream

Throws:

- `IllegalArgumentException`: if an invalid combination of options is specified
- `UnsupportedOperationException`: if an unsupported option is specified
- `IOException`: if an I/O error occurs

## Files.newOutputStream(Path, OpenOption...)

```java
public static OutputStream newOutputStream(Path path, OpenOption... options) throws IOException
```

Opens or creates a file, returning an output stream that may be used to
write bytes to the file. The resulting stream will not be buffered. The
stream will be safe for access by multiple concurrent threads. Whether
the returned stream is *asynchronously closeable* and/or
*interruptible* is highly file system provider specific and
therefore not specified.

 This method opens or creates a file in exactly the manner specified
by the newByteChannel
method with the exception that the READ
option may not be present in the array of options. If no options are
present then this method works as if the CREATE, TRUNCATE_EXISTING,
and WRITE options are present. In other
words, it opens the file for writing, creating the file if it doesn't
exist, or initially truncating an existing regular-file to a size of `0` if it exists.

 **Usage Examples:**

Parameters:

- `path`: the path to the file to open or create
- `options`: options specifying how the file is opened

**Returns:** a new output stream

Throws:

- `IllegalArgumentException`: if `options` contains an invalid combination of options
- `UnsupportedOperationException`: if an unsupported option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.newByteChannel(Path, Set<? extends OpenOption>, FileAttribute<?>...)

```java
public static SeekableByteChannel newByteChannel(Path path, Set<? extends OpenOption> options, FileAttribute<?>... attrs) throws IOException
```

Opens or creates a file, returning a seekable byte channel to access the
file.

 The `options` parameter determines how the file is opened.
The READ and WRITE options determine if the file should be
opened for reading and/or writing. If neither option (or the APPEND option) is present then the file is
opened for reading. By default reading or writing commence at the
beginning of the file.

 In the addition to `READ` and `WRITE`, the following
options may be present:

Options

 Option Description

   APPEND
   If this option is present then the file is opened for writing and
    each invocation of the channel's `write` method first advances
    the position to the end of the file and then writes the requested
    data. Whether the advancement of the position and the writing of the
    data are done in a single atomic operation is system-dependent and
    therefore unspecified. This option may not be used in conjunction
    with the `READ` or `TRUNCATE_EXISTING` options.

   TRUNCATE_EXISTING
   If this option is present then the existing file is truncated to
  a size of 0 bytes. This option is ignored when the file is opened only
  for reading.

   CREATE_NEW
   If this option is present then a new file is created, failing if
  the file already exists or is a symbolic link. When creating a file the
  check for the existence of the file and the creation of the file if it
  does not exist is atomic with respect to other file system operations.
  This option is ignored when the file is opened only for reading.

   CREATE
   If this option is present then an existing file is opened if it
  exists, otherwise a new file is created. This option is ignored if the
  `CREATE_NEW` option is also present or the file is opened only
  for reading.

   DELETE_ON_CLOSE
   When this option is present then the implementation makes a
  *best effort* attempt to delete the file when closed by the
  close method. If the `close`
  method is not invoked then a *best effort* attempt is made to
  delete the file when the Java virtual machine terminates.

  SPARSE
   When creating a new file this option is a *hint* that the
  new file will be sparse. This option is ignored when not creating
  a new file.

   SYNC
   Requires that every update to the file's content or metadata be
  written synchronously to the underlying storage device. (see  Synchronized I/O file
  integrity).

   DSYNC
   Requires that every update to the file's content be written
  synchronously to the underlying storage device. (see  Synchronized I/O file
  integrity).

 An implementation may also support additional implementation specific
options.

 The `attrs` parameter is optional file-attributes to set atomically when a new file is created.

 In the case of the default provider, the returned seekable byte channel
is a `java.nio.channels.FileChannel`.

 **Usage Examples:**

Parameters:

- `path`: the path to the file to open or create
- `options`: options specifying how the file is opened
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** a new seekable byte channel

**See also:** java.nio.channels.FileChannel#open(Path,Set,FileAttribute[])

Throws:

- `IllegalArgumentException`: if the set contains an invalid combination of options
- `UnsupportedOperationException`: if an unsupported open option is specified or the array contains attributes that cannot be set atomically when creating the file
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.newByteChannel(Path, OpenOption...)

```java
public static SeekableByteChannel newByteChannel(Path path, OpenOption... options) throws IOException
```

Opens or creates a file, returning a seekable byte channel to access the
file.

 This method opens or creates a file in exactly the manner specified
by the newByteChannel
method.

Parameters:

- `path`: the path to the file to open or create
- `options`: options specifying how the file is opened

**Returns:** a new seekable byte channel

**See also:** java.nio.channels.FileChannel#open(Path,OpenOption[])

Throws:

- `IllegalArgumentException`: if the set contains an invalid combination of options
- `UnsupportedOperationException`: if an unsupported open option is specified
- `FileAlreadyExistsException`: If a file of that name already exists and the CREATE_NEW option is specified and the file is being opened for writing *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.newDirectoryStream(Path)

```java
public static DirectoryStream<Path> newDirectoryStream(Path dir) throws IOException
```

Opens a directory, returning a `DirectoryStream` to iterate over
all entries in the directory. The elements returned by the directory
stream's iterator are of type `Path`, each one representing an entry in the directory. The `Path`
objects are obtained as if by resolving the
name of the directory entry against `dir`.

 When not using the try-with-resources construct, then directory
stream's `close` method should be invoked after iteration is
completed so as to free any resources held for the open directory.

 When an implementation supports operations on entries in the
directory that execute in a race-free manner then the returned directory
stream is a `SecureDirectoryStream`.

Parameters:

- `dir`: the path to the directory

**Returns:** a new and open `DirectoryStream` object

Throws:

- `NotDirectoryException`: if the file could not otherwise be opened because it is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.newDirectoryStream(Path, String)

```java
public static DirectoryStream<Path> newDirectoryStream(Path dir, String glob) throws IOException
```

Opens a directory, returning a `DirectoryStream` to iterate over
the entries in the directory. The elements returned by the directory
stream's iterator are of type `Path`, each one representing an entry in the directory. The `Path`
objects are obtained as if by resolving the
name of the directory entry against `dir`. The entries returned by
the iterator are filtered by matching the `String` representation
of their file names against the given *globbing* pattern.

 For example, suppose we want to iterate over the files ending with
".java" in a directory:

 The globbing pattern is specified by the getPathMatcher method.

 When not using the try-with-resources construct, then directory
stream's `close` method should be invoked after iteration is
completed so as to free any resources held for the open directory.

 When an implementation supports operations on entries in the
directory that execute in a race-free manner then the returned directory
stream is a `SecureDirectoryStream`.

Parameters:

- `dir`: the path to the directory
- `glob`: the glob pattern

**Returns:** a new and open `DirectoryStream` object

Throws:

- `java.util.regex.PatternSyntaxException`: if the pattern is invalid
- `NotDirectoryException`: if the file could not otherwise be opened because it is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.newDirectoryStream(Path, DirectoryStream.Filter<? super Path>)

```java
public static DirectoryStream<Path> newDirectoryStream(Path dir, DirectoryStream.Filter<? super Path> filter) throws IOException
```

Opens a directory, returning a `DirectoryStream` to iterate over
the entries in the directory. The elements returned by the directory
stream's iterator are of type `Path`, each one representing an entry in the directory. The `Path`
objects are obtained as if by resolving the
name of the directory entry against `dir`. The entries returned by
the iterator are filtered by the given filter.

 When not using the try-with-resources construct, then directory
stream's `close` method should be invoked after iteration is
completed so as to free any resources held for the open directory.

 Where the filter terminates due to an uncaught error or runtime
exception then it is propagated to the hasNext or next method. Where an `IOException` is thrown, it results in the `hasNext` or `next` method throwing a `DirectoryIteratorException` with the
`IOException` as the cause.

 When an implementation supports operations on entries in the
directory that execute in a race-free manner then the returned directory
stream is a `SecureDirectoryStream`.

 **Usage Example:**
Suppose we want to iterate over the files in a directory that are
larger than 8K.

Parameters:

- `dir`: the path to the directory
- `filter`: the directory stream filter

**Returns:** a new and open `DirectoryStream` object

Throws:

- `NotDirectoryException`: if the file could not otherwise be opened because it is not a directory *(optional specific exception)*
- `IOException`: if an I/O error occurs

## Files.createFile(Path, FileAttribute<?>...)

```java
public static Path createFile(Path path, FileAttribute<?>... attrs) throws IOException
```

Creates a new and empty file, failing if the file already exists. The
check for the existence of the file and the creation of the new file if
it does not exist are a single operation that is atomic with respect to
all other filesystem activities that might affect the directory.

 The `attrs` parameter is optional file-attributes to set atomically when creating the file. Each attribute
is identified by its name. If more than one
attribute of the same name is included in the array then all but the last
occurrence is ignored.

Parameters:

- `path`: the path to the file to create
- `attrs`: an optional list of file attributes to set atomically when creating the file

**Returns:** the file

Throws:

- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the file
- `FileAlreadyExistsException`: If a file of that name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs or the parent directory does not exist

## Files.createDirectory(Path, FileAttribute<?>...)

```java
public static Path createDirectory(Path dir, FileAttribute<?>... attrs) throws IOException
```

Creates a new directory. The check for the existence of the file and the
creation of the directory if it does not exist are a single operation
that is atomic with respect to all other filesystem activities that might
affect the directory. The createDirectories
method should be used where it is required to create all nonexistent
parent directories first.

 The `attrs` parameter is optional file-attributes to set atomically when creating the directory. Each
attribute is identified by its name. If more
than one attribute of the same name is included in the array then all but
the last occurrence is ignored.

Parameters:

- `dir`: the directory to create
- `attrs`: an optional list of file attributes to set atomically when creating the directory

**Returns:** the directory

Throws:

- `UnsupportedOperationException`: if the array contains an attribute that cannot be set atomically when creating the directory
- `FileAlreadyExistsException`: if a directory could not otherwise be created because a file of that name already exists *(optional specific exception)*
- `IOException`: if an I/O error occurs or the parent directory does not exist
