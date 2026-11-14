---
title: "BasicFileAttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/BasicFileAttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BasicFileAttributeView interface (java.nio.file.attribute)

```java
public interface BasicFileAttributeView extends FileAttributeView
```

A file attribute view that provides a view of a *basic set* of file
attributes common to many file systems. The basic set of file attributes
consist of *mandatory* and *optional* file attributes as
defined by the `BasicFileAttributes` interface.

 The file attributes are retrieved from the file system as a *bulk
operation* by invoking the readAttributes method.
This class also defines the setTimes method to update the
file's time attributes.

 Where dynamic access to file attributes is required, the attributes
supported by this attribute view have the following names and types:

 Supported attributes

     Name
     Type

     "lastModifiedTime"
     `FileTime`

     "lastAccessTime"
     `FileTime`

     "creationTime"
     `FileTime`

     "size"
     `Long`

     "isRegularFile"
     `Boolean`

     "isDirectory"
     `Boolean`

     "isSymbolicLink"
     `Boolean`

     "isOther"
     `Boolean`

     "fileKey"
     `Object`

 The getAttribute method may be
used to read any of these attributes as if by invoking the readAttributes() method.

 The setAttribute method may be
used to update the file's last modified time, last access time or create time
attributes as if by invoking the setTimes method.

**Since:** 1.7

## BasicFileAttributeView.name()

```java
String name()
```

Returns the name of the attribute view. Attribute views of this type
have the name `"basic"`.

## BasicFileAttributeView.readAttributes()

```java
BasicFileAttributes readAttributes() throws IOException
```

Reads the basic file attributes as a bulk operation.

 It is implementation specific if all file attributes are read as an
atomic operation with respect to other file system operations.

**Returns:** the file attributes

Throws:

- `IOException`: if an I/O error occurs

## BasicFileAttributeView.setTimes(FileTime, FileTime, FileTime)

```java
void setTimes(FileTime lastModifiedTime, FileTime lastAccessTime, FileTime createTime) throws IOException
```

Updates any or all of the file's last modified time, last access time,
and create time attributes.

 This method updates the file's timestamp attributes. The values are
converted to the epoch and precision supported by the file system.
Converting from finer to coarser granularities results in precision loss.
The behavior of this method when attempting to set a timestamp that is
not supported or to a value that is outside the range supported by the
underlying file store is not defined. It may or not fail by throwing an
`IOException`.

 If any of the `lastModifiedTime`, `lastAccessTime`,
or `createTime` parameters has the value `null` then the
corresponding timestamp is not changed. An implementation may require to
read the existing values of the file attributes when only some, but not
all, of the timestamp attributes are updated. Consequently, this method
may not be an atomic operation with respect to other file system
operations. Reading and re-writing existing values may also result in
precision loss. If all of the `lastModifiedTime`, `lastAccessTime` and `createTime` parameters are `null` then
this method has no effect.

 **Usage Example:**
Suppose we want to change a file's last access time.

Parameters:

- `lastModifiedTime`: the new last modified time, or `null` to not change the value
- `lastAccessTime`: the last access time, or `null` to not change the value
- `createTime`: the file's create time, or `null` to not change the value

**See also:** java.nio.file.Files#setLastModifiedTime

Throws:

- `IOException`: if an I/O error occurs
