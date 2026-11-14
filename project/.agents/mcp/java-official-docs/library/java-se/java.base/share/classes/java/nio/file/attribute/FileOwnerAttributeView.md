---
title: "FileOwnerAttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/FileOwnerAttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileOwnerAttributeView interface (java.nio.file.attribute)

```java
public interface FileOwnerAttributeView extends FileAttributeView
```

A file attribute view that supports reading or updating the owner of a file.
This file attribute view is intended for file system implementations that
support a file attribute that represents an identity that is the owner of
the file. Often the owner of a file is the identity of the entity that
created the file.

 The getOwner or setOwner methods may
be used to read or update the owner of the file.

 The getAttribute and
setAttribute methods may also be
used to read or update the owner. In that case, the owner attribute is
identified by the name `"owner"`, and the value of the attribute is
a `UserPrincipal`.

**Since:** 1.7

## FileOwnerAttributeView.name()

```java
String name()
```

Returns the name of the attribute view. Attribute views of this type
have the name `"owner"`.

## FileOwnerAttributeView.getOwner()

```java
UserPrincipal getOwner() throws IOException
```

Read the file owner.

 It is implementation specific if the file owner can be a group.

**Returns:** the file owner

Throws:

- `IOException`: if an I/O error occurs

## FileOwnerAttributeView.setOwner(UserPrincipal)

```java
void setOwner(UserPrincipal owner) throws IOException
```

Updates the file owner.

 It is implementation specific if the file owner can be a group. To ensure consistent and correct behavior
across platforms it is recommended that this method should only be used
to set the file owner to a user principal that is not a group.

Parameters:

- `owner`: the new file owner

Throws:

- `IOException`: if an I/O error occurs, or the `owner` parameter is a group and this implementation does not support setting the owner to a group
