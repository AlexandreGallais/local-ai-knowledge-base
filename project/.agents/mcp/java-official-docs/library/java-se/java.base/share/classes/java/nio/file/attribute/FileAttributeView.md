---
title: "FileAttributeView interface (java.nio.file.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/attribute/FileAttributeView.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FileAttributeView interface (java.nio.file.attribute)

```java
public interface FileAttributeView extends AttributeView
```

An attribute view that is a read-only or updatable view of non-opaque
values associated with a file in a filesystem. This interface is extended or
implemented by specific file attribute views that define methods to read
and/or update the attributes of a file.

**Since:** 1.7

**See also:** java.nio.file.Files#getFileAttributeView(Path,Class,java.nio.file.LinkOption[])
