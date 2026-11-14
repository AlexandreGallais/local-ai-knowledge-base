---
title: "DosFileAttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/DosFileAttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DosFileAttributeView interface (java.nio.file.attribute)

```java
public interface DosFileAttributeView extends BasicFileAttributeView
```

A file attribute view that provides a view of the legacy "DOS" file attributes.
These attributes are supported by file systems such as the File Allocation
Table (FAT) format commonly used in *consumer devices*.

 A `DosFileAttributeView` is a `BasicFileAttributeView` that
additionally supports access to the set of DOS attribute flags that are used
to indicate if the file is read-only, hidden, a system file, or archived.

 Where dynamic access to file attributes is required, the attributes
supported by this attribute view are as defined by `BasicFileAttributeView`, and in addition, the following attributes are
supported:

Supported attributes

     Name
     Type

     readonly
     `Boolean`

     hidden
     `Boolean`

     system
     `Boolean`

     archive
     `Boolean`

 The getAttribute method may
be used to read any of these attributes, or any of the attributes defined by
`BasicFileAttributeView` as if by invoking the readAttributes() method.

 The setAttribute method may
be used to update the file's last modified time, last access time or create
time attributes as defined by `BasicFileAttributeView`. It may also be
used to update the DOS attributes as if by invoking the setReadOnly, setHidden, setSystem, and
setArchive methods respectively.

**Since:** 1.7

## DosFileAttributeView.name()

```java
String name()
```

Returns the name of the attribute view. Attribute views of this type
have the name `"dos"`.

## DosFileAttributeView.readAttributes()

```java
DosFileAttributes readAttributes() throws IOException
```

Throws:

- `IOException`: (inherited documentation)

## DosFileAttributeView.setReadOnly(boolean)

```java
void setReadOnly(boolean value) throws IOException
```

Updates the value of the read-only attribute.

 It is implementation specific if the attribute can be updated as an
atomic operation with respect to other file system operations. An
implementation may, for example, require to read the existing value of
the DOS attribute in order to update this attribute.

Parameters:

- `value`: the new value of the attribute

Throws:

- `IOException`: if an I/O error occurs

## DosFileAttributeView.setHidden(boolean)

```java
void setHidden(boolean value) throws IOException
```

Updates the value of the hidden attribute.

 It is implementation specific if the attribute can be updated as an
atomic operation with respect to other file system operations. An
implementation may, for example, require to read the existing value of
the DOS attribute in order to update this attribute.

Parameters:

- `value`: the new value of the attribute

Throws:

- `IOException`: if an I/O error occurs

## DosFileAttributeView.setSystem(boolean)

```java
void setSystem(boolean value) throws IOException
```

Updates the value of the system attribute.

 It is implementation specific if the attribute can be updated as an
atomic operation with respect to other file system operations. An
implementation may, for example, require to read the existing value of
the DOS attribute in order to update this attribute.

Parameters:

- `value`: the new value of the attribute

Throws:

- `IOException`: if an I/O error occurs

## DosFileAttributeView.setArchive(boolean)

```java
void setArchive(boolean value) throws IOException
```

Updates the value of the archive attribute.

 It is implementation specific if the attribute can be updated as an
atomic operation with respect to other file system operations. An
implementation may, for example, require to read the existing value of
the DOS attribute in order to update this attribute.

Parameters:

- `value`: the new value of the attribute

Throws:

- `IOException`: if an I/O error occurs
