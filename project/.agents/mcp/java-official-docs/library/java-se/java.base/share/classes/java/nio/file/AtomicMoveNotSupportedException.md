---
title: "AtomicMoveNotSupportedException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/AtomicMoveNotSupportedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AtomicMoveNotSupportedException class (java.nio.file)

```java
public class AtomicMoveNotSupportedException extends FileSystemException
```

Checked exception thrown when a file cannot be moved as an atomic file system
operation.

**Since:** 1.7

## AtomicMoveNotSupportedException.AtomicMoveNotSupportedException(String, String, String)

```java
public AtomicMoveNotSupportedException(String source, String target, String reason)
```

Constructs an instance of this class.

Parameters:

- `source`: a string identifying the source file or `null` if not known
- `target`: a string identifying the target file or `null` if not known
- `reason`: a reason message with additional information or `null`
