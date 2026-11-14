---
title: "NotDirectoryException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/NotDirectoryException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NotDirectoryException class (java.nio.file)

```java
public class NotDirectoryException extends FileSystemException
```

Checked exception thrown when a file system operation, intended for a
directory, fails because the file is not a directory.

**Since:** 1.7

## NotDirectoryException.NotDirectoryException(String)

```java
public NotDirectoryException(String file)
```

Constructs an instance of this class.

Parameters:

- `file`: a string identifying the file or `null` if not known
