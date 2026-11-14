---
title: "Files class (java.nio.file) (part 5 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/Files.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Files class (java.nio.file) (part 5 of 8)

## Files.isSymbolicLink(Path)

```java
public static boolean isSymbolicLink(Path path)
```

Tests whether a file is a symbolic link.

 Where it is required to distinguish an I/O exception from the case
that the file is not a symbolic link then the file attributes can be
read with the readAttributes method and the file type tested with the `BasicFileAttributes.isSymbolicLink` method.

Parameters:

- `path`: The path to the file

**Returns:** `true` if the file is a symbolic link; `false` if
         the file does not exist, is not a symbolic link, or it cannot
         be determined if the file is a symbolic link or not.

## Files.isDirectory(Path, LinkOption...)

```java
public static boolean isDirectory(Path path, LinkOption... options)
```

Tests whether a file is a directory.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 Where it is required to distinguish an I/O exception from the case
that the file is not a directory then the file attributes can be
read with the readAttributes method and the file type tested with the `BasicFileAttributes.isDirectory` method.

Parameters:

- `path`: the path to the file to test
- `options`: options indicating how symbolic links are handled

**Returns:** `true` if the file is a directory; `false` if
         the file does not exist, is not a directory, or it cannot
         be determined if the file is a directory or not.

## Files.isRegularFile(Path, LinkOption...)

```java
public static boolean isRegularFile(Path path, LinkOption... options)
```

Tests whether a file is a regular file with opaque content.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 Where it is required to distinguish an I/O exception from the case
that the file is not a regular file then the file attributes can be
read with the readAttributes method and the file type tested with the `BasicFileAttributes.isRegularFile` method.

Parameters:

- `path`: the path to the file
- `options`: options indicating how symbolic links are handled

**Returns:** `true` if the file is a regular file; `false` if
         the file does not exist, is not a regular file, or it
         cannot be determined if the file is a regular file or not.

## Files.getLastModifiedTime(Path, LinkOption...)

```java
public static FileTime getLastModifiedTime(Path path, LinkOption... options) throws IOException
```

Returns a file's last modified time.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

Parameters:

- `path`: the path to the file
- `options`: options indicating how symbolic links are handled

**Returns:** a `FileTime` representing the time the file was last
         modified, or an implementation specific default when a time
         stamp to indicate the time of last modification is not supported
         by the file system

**See also:** BasicFileAttributes#lastModifiedTime

Throws:

- `IOException`: if an I/O error occurs

## Files.setLastModifiedTime(Path, FileTime)

```java
public static Path setLastModifiedTime(Path path, FileTime time) throws IOException
```

Updates a file's last modified time attribute. The file time is converted
to the epoch and precision supported by the file system. Converting from
finer to coarser granularities result in precision loss. The behavior of
this method when attempting to set the last modified time when it is not
supported by the file system or is outside the range supported by the
underlying file store is not defined. It may or not fail by throwing an
`IOException`.

 **Usage Example:**
Suppose we want to set the last modified time to the current time:

Parameters:

- `path`: the path to the file
- `time`: the new last modified time

**Returns:** the given path

**See also:** BasicFileAttributeView#setTimes

Throws:

- `IOException`: if an I/O error occurs

## Files.size(Path)

```java
public static long size(Path path) throws IOException
```

Returns the size of a file (in bytes). The size may differ from the
actual size on the file system due to compression, support for sparse
files, or other reasons. The size of files that are not regular files is implementation specific and
therefore unspecified.

Parameters:

- `path`: the path to the file

**Returns:** the file size, in bytes

**See also:** BasicFileAttributes#size

Throws:

- `IOException`: if an I/O error occurs

## Files.exists(Path, LinkOption...)

```java
public static boolean exists(Path path, LinkOption... options)
```

Tests whether a file exists.

 The `options` parameter may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 Note that the result of this method is immediately outdated. If this
method indicates the file exists then there is no guarantee that a
subsequent access will succeed. Care should be taken when using this
method in security sensitive applications.

Parameters:

- `path`: the path to the file to test
- `options`: options indicating how symbolic links are handled

**Returns:** `true` if the file exists; `false` if the file does
         not exist or its existence cannot be determined.

**See also:** #notExists

**See also:** FileSystemProvider#checkAccess

## Files.notExists(Path, LinkOption...)

```java
public static boolean notExists(Path path, LinkOption... options)
```

Tests whether the file located by this path does not exist. This method
is intended for cases where it is required to take action when it can be
confirmed that a file does not exist.

 The `options` parameter may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 Note that this method is not the complement of the exists method. Where it is not possible to determine if a file exists
or not then both methods return `false`. As with the `exists`
method, the result of this method is immediately outdated. If this
method indicates the file does exist then there is no guarantee that a
subsequent attempt to create the file will succeed. Care should be taken
when using this method in security sensitive applications.

Parameters:

- `path`: the path to the file to test
- `options`: options indicating how symbolic links are handled

**Returns:** `true` if the file does not exist; `false` if the
         file exists or its existence cannot be determined

## Files.isReadable(Path)

```java
public static boolean isReadable(Path path)
```

Tests whether a file is readable. This method checks that a file exists
and that this Java virtual machine has appropriate privileges that would
allow it open the file for reading. Depending on the implementation, this
method may require to read file permissions, access control lists, or
other file attributes in order to check the effective access to the file.
Consequently, this method may not be atomic with respect to other file
system operations.

 Note that the result of this method is immediately outdated, there is
no guarantee that a subsequent attempt to open the file for reading will
succeed (or even that it will access the same file). Care should be taken
when using this method in security sensitive applications.

Parameters:

- `path`: the path to the file to check

**Returns:** `true` if the file exists and is readable; `false`
         if the file does not exist, read access would be denied because
         the Java virtual machine has insufficient privileges, or access
         cannot be determined

## Files.isWritable(Path)

```java
public static boolean isWritable(Path path)
```

Tests whether a file is writable. This method checks that a file exists
and that this Java virtual machine has appropriate privileges that would
allow it open the file for writing. Depending on the implementation, this
method may require to read file permissions, access control lists, or
other file attributes in order to check the effective access to the file.
Consequently, this method may not be atomic with respect to other file
system operations.

 Note that result of this method is immediately outdated, there is no
guarantee that a subsequent attempt to open the file for writing will
succeed (or even that it will access the same file). Care should be taken
when using this method in security sensitive applications.

Parameters:

- `path`: the path to the file to check

**Returns:** `true` if the file exists and is writable; `false`
         if the file does not exist, write access would be denied because
         the Java virtual machine has insufficient privileges, or access
         cannot be determined

## Files.isExecutable(Path)

```java
public static boolean isExecutable(Path path)
```

Tests whether a file is executable. This method checks that a file exists
and that this Java virtual machine has appropriate privileges to execute the file. The semantics may differ when checking
access to a directory. For example, on UNIX systems, checking for
execute access checks that the Java virtual machine has permission to
search the directory in order to access file or subdirectories.

 Depending on the implementation, this method may require to read file
permissions, access control lists, or other file attributes in order to
check the effective access to the file. Consequently, this method may not
be atomic with respect to other file system operations.

 Note that the result of this method is immediately outdated, there is
no guarantee that a subsequent attempt to execute the file will succeed
(or even that it will access the same file). Care should be taken when
using this method in security sensitive applications.

Parameters:

- `path`: the path to the file to check

**Returns:** `true` if the file exists and is executable; `false`
         if the file does not exist, execute access would be denied because
         the Java virtual machine has insufficient privileges, or access
         cannot be determined

## Files.walkFileTree(Path, Set<FileVisitOption>, int, FileVisitor<? super Path>)

```java
public static Path walkFileTree(Path start, Set<FileVisitOption> options, int maxDepth, FileVisitor<? super Path> visitor) throws IOException
```

Walks a file tree.

 This method walks a file tree rooted at a given starting file. The
file tree traversal is *depth-first* with the given `FileVisitor` invoked for each file encountered. File tree traversal
completes when all accessible files in the tree have been visited, or a
visit method returns a result of TERMINATE. Where a visit method terminates due an `IOException`,
an uncaught error, or runtime exception, then the traversal is terminated
and the error or exception is propagated to the caller of this method.

 For each file encountered this method attempts to read its `java.nio.file.attribute.BasicFileAttributes`. If the file is not a
directory then the visitFile method is
invoked with the file attributes. If the file attributes cannot be read,
due to an I/O exception, then the visitFileFailed method is invoked with the I/O exception.

 Where the file is a directory, and the directory could not be opened,
then the `visitFileFailed` method is invoked with the I/O exception,
after which, the file tree walk continues, by default, at the next
*sibling* of the directory.

 Where the directory is opened successfully, then the entries in the
directory, and their *descendants* are visited. When all entries
have been visited, or an I/O error occurs during iteration of the
directory, then the directory is closed and the visitor's postVisitDirectory method is invoked.
The file tree walk then continues, by default, at the next *sibling*
of the directory.

 By default, symbolic links are not automatically followed by this
method. If the `options` parameter contains the FOLLOW_LINKS option then symbolic links are
followed. When following links, and the attributes of the target cannot
be read, then this method attempts to get the `BasicFileAttributes`
of the link. If they can be read then the `visitFile` method is
invoked with the attributes of the link (otherwise the `visitFileFailed`
method is invoked as specified above).

 If the `options` parameter contains the FOLLOW_LINKS option then this method keeps
track of directories visited so that cycles can be detected. A cycle
arises when there is an entry in a directory that is an ancestor of the
directory. Cycle detection is done by recording the file-key of directories,
or if file keys are not available, by invoking the isSameFile method to test if a directory is the same file as an
ancestor. When a cycle is detected it is treated as an I/O error, and the
visitFileFailed method is invoked with
an instance of `FileSystemLoopException`.

 The `maxDepth` parameter is the maximum number of levels of
directories to visit. A value of `0` means that only the starting
file is visited. A value of MAX_VALUE may be used
to indicate that all levels should be visited. The `visitFile` method
is invoked for all files, including directories, encountered at `maxDepth`,
unless the basic file attributes cannot be read, in which case the `visitFileFailed` method is invoked.

 If a visitor returns a result of `null` then `NullPointerException` is thrown.

Parameters:

- `start`: the starting file
- `options`: options to configure the traversal
- `maxDepth`: the maximum number of directory levels to visit
- `visitor`: the file visitor to invoke for each file

**Returns:** the starting file

Throws:

- `IllegalArgumentException`: if the `maxDepth` parameter is negative
- `IOException`: if an I/O error is thrown by a visitor method
