---
title: "ByteChannel interface (java.nio.channels)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/channels/ByteChannel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ByteChannel interface (java.nio.channels)

```java
public interface ByteChannel extends ReadableByteChannel, WritableByteChannel
```

A channel that can read and write bytes.  This interface simply unifies
`ReadableByteChannel` and `WritableByteChannel`; it does not
specify any new operations.

**Since:** 1.4
