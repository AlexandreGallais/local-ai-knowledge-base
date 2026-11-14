---
title: "FilenameFilter interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FilenameFilter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FilenameFilter interface (java.io)

```java
public interface FilenameFilter
```

Instances of classes that implement this interface are used to
filter filenames. These instances are used to filter directory
listings in the `list` method of class
`File`, and by the Abstract Window Toolkit's file
dialog component.

**See also:** java.desktop/java.awt.FileDialog#setFilenameFilter(java.io.FilenameFilter)

**See also:** java.io.File

**See also:** java.io.File#list(java.io.FilenameFilter)

**Since:** 1.0

## FilenameFilter.accept(File, String)

```java
boolean accept(File dir, String name)
```

Tests if a specified file should be included in a file list.

Parameters:

- `dir`: the directory in which the file was found.
- `name`: the name of the file.

**Returns:** `true` if and only if the name should be
included in the file list; `false` otherwise.
