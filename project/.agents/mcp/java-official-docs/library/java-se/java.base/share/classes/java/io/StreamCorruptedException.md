---
title: "StreamCorruptedException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/StreamCorruptedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StreamCorruptedException class (java.io)

```java
public class StreamCorruptedException extends ObjectStreamException
```

Thrown when control information that was read from an object stream
violates internal consistency checks.

**Since:** 1.1

## StreamCorruptedException.StreamCorruptedException(String)

```java
public StreamCorruptedException(String reason)
```

Create a StreamCorruptedException and list a reason why thrown.

Parameters:

- `reason`: String describing the reason for the exception.

## StreamCorruptedException.StreamCorruptedException()

```java
public StreamCorruptedException()
```

Create a StreamCorruptedException and list no reason why thrown.
