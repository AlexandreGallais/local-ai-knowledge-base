---
title: "FileSystemLoopException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/FileSystemLoopException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileSystemLoopException class (java.nio.file)

```java
public class FileSystemLoopException extends FileSystemException
```

Checked exception thrown when a file system loop, or cycle, is encountered.

**Since:** 1.7

**See also:** Files#walkFileTree

## FileSystemLoopException.FileSystemLoopException(String)

```java
public FileSystemLoopException(String file)
```

Constructs an instance of this class.

Parameters:

- `file`: a string identifying the file causing the cycle or `null` if not known
