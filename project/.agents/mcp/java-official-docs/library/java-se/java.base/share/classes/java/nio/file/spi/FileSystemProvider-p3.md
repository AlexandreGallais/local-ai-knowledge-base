---
title: "FileSystemProvider class (java.nio.file.spi) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/spi/FileSystemProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemProvider class (java.nio.file.spi) (part 3 of 3)

## FileSystemProvider.exists(Path, LinkOption...)

```java
public boolean exists(Path path, LinkOption... options)
```

Tests whether a file exists. This method works in exactly the
manner specified by the LinkOption...) method.

Parameters:

- `path`: the path to the file to test
- `options`: options indicating how symbolic links are handled

**Implementation requirements:** The default implementation of this method invokes the
AccessMode...) method when symbolic links
are followed. If the option NOFOLLOW_LINKS
is present then symbolic links are not followed and the method
Class, LinkOption...) is called
to determine whether a file exists.

**Returns:** `true` if the file exists; `false` if the file does
         not exist or its existence cannot be determined.

**Since:** 20

## FileSystemProvider.readAttributesIfExists(Path, Class, LinkOption...)

```java
public <A extends BasicFileAttributes> A readAttributesIfExists(Path path, Class<A> type, LinkOption... options) throws IOException
```

Reads a file's attributes as a bulk operation if it exists.

 The `type` parameter is the type of the attributes required
and this method returns an instance of that type if supported. All
implementations support a basic set of file attributes and so invoking
this method with a  `type` parameter of `BasicFileAttributes.class` will not throw `UnsupportedOperationException`.

 The `options` array may be used to indicate how symbolic links
are handled for the case that the file is a symbolic link. By default,
symbolic links are followed and the file attribute of the final target
of the link is read. If the option NOFOLLOW_LINKS is present then symbolic links are not followed.

 It is implementation specific if all file attributes are read as an
atomic operation with respect to other file system operations.

Parameters:

- ``: The `BasicFileAttributes` type
- `path`: the path to the file
- `type`: the `Class` of the file attributes required to read
- `options`: options indicating how symbolic links are handled

**Implementation requirements:** The default implementation of this method invokes the
Class, LinkOption...) method
to read the file's attributes.

**Returns:** the file attributes or null if the file does not exist

**Since:** 20

Throws:

- `UnsupportedOperationException`: if an attributes of the given type are not supported
- `IOException`: if an I/O error occurs
