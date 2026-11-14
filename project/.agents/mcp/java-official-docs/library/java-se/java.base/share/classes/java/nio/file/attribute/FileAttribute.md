---
title: "FileAttribute interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/FileAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileAttribute interface (java.nio.file.attribute)

```java
public interface FileAttribute<T>
```

An object that encapsulates the value of a file attribute that can be set
atomically when creating a new file or directory by invoking the createFile or createDirectory methods.

Parameters:

- `<T>`: The type of the file attribute value

**Since:** 1.7

**See also:** PosixFilePermissions#asFileAttribute

## FileAttribute.name()

```java
String name()
```

Returns the attribute name.

**Returns:** The attribute name

## FileAttribute.value()

```java
T value()
```

Returns the attribute value.

**Returns:** The attribute value
