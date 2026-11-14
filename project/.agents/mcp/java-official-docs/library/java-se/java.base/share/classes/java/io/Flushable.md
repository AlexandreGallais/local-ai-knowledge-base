---
title: "Flushable interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/Flushable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Flushable interface (java.io)

```java
public interface Flushable
```

A `Flushable` is a destination of data that can be flushed.  The
flush method is invoked to write any buffered output to the underlying
stream.

**Since:** 1.5

## Flushable.flush()

```java
void flush() throws IOException
```

Flushes this stream by writing any buffered output to the underlying
stream.

Throws:

- `IOException`: If an I/O error occurs
