---
title: "PosixFileAttributes interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/PosixFileAttributes.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PosixFileAttributes interface (java.nio.file.attribute)

```java
public interface PosixFileAttributes extends BasicFileAttributes
```

File attributes associated with files on file systems used by operating systems
that implement the Portable Operating System Interface (POSIX) family of
standards.

 The POSIX attributes of a file are retrieved using a `PosixFileAttributeView` by invoking its readAttributes method.

**Since:** 1.7

## PosixFileAttributes.owner()

```java
UserPrincipal owner()
```

Returns the owner of the file.

**Returns:** the file owner

**See also:** PosixFileAttributeView#setOwner

## PosixFileAttributes.group()

```java
GroupPrincipal group()
```

Returns the group owner of the file.

**Returns:** the file group owner

**See also:** PosixFileAttributeView#setGroup

## PosixFileAttributes.permissions()

```java
Set<PosixFilePermission> permissions()
```

Returns the permissions of the file. The file permissions are returned
as a set of `PosixFilePermission` elements. The returned set is a
copy of the file permissions and is modifiable. This allows the result
to be modified and passed to the setPermissions method to update the file's permissions.

**Returns:** the file permissions

**See also:** PosixFileAttributeView#setPermissions
