---
title: "OpenOption interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/OpenOption.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OpenOption interface (java.nio.file)

```java
public interface OpenOption
```

An object that configures how to open or create a file.

 Objects of this type are used by methods such as newOutputStream, newByteChannel, FileChannel.open, and AsynchronousFileChannel.open
when opening or creating a file.

 The `StandardOpenOption` enumeration type defines the
*standard* options.

**Since:** 1.7
