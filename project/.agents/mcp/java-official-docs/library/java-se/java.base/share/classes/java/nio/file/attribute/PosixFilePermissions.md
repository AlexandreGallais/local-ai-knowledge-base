---
title: "PosixFilePermissions class (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/PosixFilePermissions.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PosixFilePermissions class (java.nio.file.attribute)

```java
public final class PosixFilePermissions
```

This class consists exclusively of static methods that operate on sets of
`PosixFilePermission` objects.

**Since:** 1.7

## PosixFilePermissions.toString(Set<PosixFilePermission>)

```java
public static String toString(Set<PosixFilePermission> perms)
```

Returns the `String` representation of a set of permissions. It
is guaranteed that the returned `String` can be parsed by the
`fromString` method.

 If the set contains `null` or elements that are not of type
`PosixFilePermission` then these elements are ignored.

Parameters:

- `perms`: the set of permissions

**Returns:** the string representation of the permission set

## PosixFilePermissions.fromString(String)

```java
public static Set<PosixFilePermission> fromString(String perms)
```

Returns the set of permissions corresponding to a given `String`
representation.

 The `perms` parameter is a `String` representing the
permissions. It has 9 characters that are interpreted as three sets of
three. The first set refers to the owner's permissions; the next to the
group permissions and the last to others. Within each set, the first
character is `'r'` to indicate permission to read, the second
character is `'w'` to indicate permission to write, and the third
character is `'x'` for execute permission. Where a permission is
not set then the corresponding character is set to `'-'`.

 **Usage Example:**
Suppose we require the set of permissions that indicate the owner has read,
write, and execute permissions, the group has read and execute permissions
and others have none.

Parameters:

- `perms`: string representing a set of permissions

**Returns:** the resulting set of permissions

**See also:** #toString(Set)

Throws:

- `IllegalArgumentException`: if the string cannot be converted to a set of permissions

## PosixFilePermissions.asFileAttribute(Set<PosixFilePermission>)

```java
public static FileAttribute<Set<PosixFilePermission>> asFileAttribute(Set<PosixFilePermission> perms)
```

Creates a `FileAttribute`, encapsulating a copy of the given file
permissions, suitable for passing to the createFile or createDirectory
methods.

Parameters:

- `perms`: the set of permissions

**Returns:** an attribute encapsulating the given file permissions with
         name `"posix:permissions"`

Throws:

- `ClassCastException`: if the set contains elements that are not of type `PosixFilePermission`
