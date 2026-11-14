---
title: "DosFileAttributes interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/DosFileAttributes.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DosFileAttributes interface (java.nio.file.attribute)

```java
public interface DosFileAttributes extends BasicFileAttributes
```

File attributes associated with a file in a file system that supports
legacy "DOS" attributes.

 **Usage Example:**

**Since:** 1.7

## DosFileAttributes.isReadOnly()

```java
boolean isReadOnly()
```

Returns the value of the read-only attribute.

 This attribute is often used as a simple access control mechanism
to prevent files from being deleted or updated. Whether the file system
or platform does any enforcement to prevent *read-only* files
from being updated is implementation specific.

**Returns:** the value of the read-only attribute

## DosFileAttributes.isHidden()

```java
boolean isHidden()
```

Returns the value of the hidden attribute.

 This attribute is often used to indicate if the file is visible to
users.

**Returns:** the value of the hidden attribute

## DosFileAttributes.isArchive()

```java
boolean isArchive()
```

Returns the value of the archive attribute.

 This attribute is typically used by backup programs.

**Returns:** the value of the archive attribute

## DosFileAttributes.isSystem()

```java
boolean isSystem()
```

Returns the value of the system attribute.

 This attribute is often used to indicate that the file is a component
of the operating system.

**Returns:** the value of the system attribute
