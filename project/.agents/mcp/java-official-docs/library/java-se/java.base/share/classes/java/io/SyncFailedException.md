---
title: "SyncFailedException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/SyncFailedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SyncFailedException class (java.io)

```java
public class SyncFailedException extends IOException
```

Signals that a sync operation has failed.

**See also:** java.io.FileDescriptor#sync

**See also:** java.io.IOException

**Since:** 1.1

## SyncFailedException.SyncFailedException(String)

```java
public SyncFailedException(String desc)
```

Constructs an SyncFailedException with a detail message.
A detail message is a String that describes this particular exception.

Parameters:

- `desc`: a String describing the exception.
