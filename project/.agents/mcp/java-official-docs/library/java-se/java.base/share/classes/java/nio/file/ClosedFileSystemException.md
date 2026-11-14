---
title: "ClosedFileSystemException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/ClosedFileSystemException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClosedFileSystemException class (java.nio.file)

```java
public class ClosedFileSystemException extends IllegalStateException
```

Unchecked exception thrown when an attempt is made to invoke an operation on
a file and the file system is closed.

**Since:** 1.7

## ClosedFileSystemException.ClosedFileSystemException()

```java
public ClosedFileSystemException()
```

Constructs an instance of this class.
