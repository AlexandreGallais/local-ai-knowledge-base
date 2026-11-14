---
title: "CopyOption interface (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/CopyOption.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CopyOption interface (java.nio.file)

```java
public interface CopyOption
```

An object that configures how to copy or move a file.

 Objects of this type may be used with the Files.copy(Path,Path,CopyOption...),
Files.copy(InputStream,Path,CopyOption...) and Files.move(Path,Path,CopyOption...) methods to configure how a file is
copied or moved.

 The `StandardCopyOption` enumeration type defines the
*standard* options.

**Since:** 1.7
