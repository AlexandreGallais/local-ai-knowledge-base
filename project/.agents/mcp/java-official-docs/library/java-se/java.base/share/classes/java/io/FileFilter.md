---
title: "FileFilter interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FileFilter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileFilter interface (java.io)

```java
public interface FileFilter
```

A filter for abstract pathnames.

 Instances of this interface may be passed to the
listFiles(FileFilter) method
of the `java.io.File` class.

**Since:** 1.2

## FileFilter.accept(File)

```java
boolean accept(File pathname)
```

Tests whether or not the specified abstract pathname should be
included in a pathname list.

Parameters:

- `pathname`: The abstract pathname to be tested

**Returns:** `true` if and only if `pathname`
         should be included
