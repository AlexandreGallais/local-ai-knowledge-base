---
title: "BasicFileAttributes interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/BasicFileAttributes.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BasicFileAttributes interface (java.nio.file.attribute)

```java
public interface BasicFileAttributes
```

Basic <example-value> associated with a file in a file system.

 Basic file attributes are attributes that are common to many file systems
and consist of mandatory and optional file attributes as defined by this
interface.

 **Usage Example:**

**Since:** 1.7

**See also:** BasicFileAttributeView

## BasicFileAttributes.lastModifiedTime()

```java
FileTime lastModifiedTime()
```

Returns the time of last modification.

 If the file system implementation does not support a time stamp
to indicate the time of last modification then this method returns an
implementation specific default value, typically a `FileTime`
representing the epoch (1970-01-01T00:00:00Z).

**Returns:** a `FileTime` representing the time the file was last
         modified

## BasicFileAttributes.lastAccessTime()

```java
FileTime lastAccessTime()
```

Returns the time of last access.

 If the file system implementation does not support a time stamp
to indicate the time of last access then this method returns
an implementation specific default value, typically the last-modified-time or a `FileTime`
representing the epoch (1970-01-01T00:00:00Z).

**Returns:** a `FileTime` representing the time of last access

## BasicFileAttributes.creationTime()

```java
FileTime creationTime()
```

Returns the creation time. The creation time is the time that the file
was created.

 If the file system implementation does not support a time stamp
to indicate the time when the file was created then this method returns
an implementation specific default value, typically the last-modified-time or a `FileTime`
representing the epoch (1970-01-01T00:00:00Z).

**Returns:** a `FileTime` representing the time the file was created

## BasicFileAttributes.isRegularFile()

```java
boolean isRegularFile()
```

Tells whether the file is a regular file with opaque content.

**Returns:** `true` if the file is a regular file with opaque content

## BasicFileAttributes.isDirectory()

```java
boolean isDirectory()
```

Tells whether the file is a directory.

**Returns:** `true` if the file is a directory

## BasicFileAttributes.isSymbolicLink()

```java
boolean isSymbolicLink()
```

Tells whether the file is a symbolic link.

**Returns:** `true` if the file is a symbolic link

## BasicFileAttributes.isOther()

```java
boolean isOther()
```

Tells whether the file is something other than a regular file, directory,
or symbolic link.

**Returns:** `true` if the file something other than a regular file,
        directory or symbolic link

## BasicFileAttributes.size()

```java
long size()
```

Returns the size of the file (in bytes). The size may differ from the
actual size on the file system due to compression, support for sparse
files, or other reasons. The size of files that are not regular files is implementation specific and
therefore unspecified.

**Returns:** the file size, in bytes

## BasicFileAttributes.fileKey()

```java
Object fileKey()
```

Returns an object that uniquely identifies the given file, or `null` if a file key is not available. On some platforms or file systems
it is possible to use an identifier, or a combination of identifiers to
uniquely identify a file. Such identifiers are important for operations
such as file tree traversal in file systems that support symbolic links or file systems
that allow a file to be an entry in more than one directory. On UNIX file
systems, for example, the *device ID* and *inode* are
commonly used for such purposes.

 The file key <example-value> by this method can only be guaranteed to be
unique if the file system and files remain static. Whether a file system
re-uses identifiers after a file is deleted is implementation dependent and
therefore unspecified.

 File keys returned by this method can be compared for equality and are
suitable for use in collections. If the file system and files remain static,
and two files are the same with
non-`null` file keys, then their file keys are equal.

**Returns:** an object that uniquely identifies the given file, or `null`

**See also:** java.nio.file.Files#walkFileTree
