---
title: "Closeable interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/Closeable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Closeable interface (java.io)

```java
public interface Closeable extends AutoCloseable
```

A `Closeable` is a source or destination of data that can be closed.
The close method is invoked to release resources that the object is
holding (such as open files).

**Since:** 1.5

## Closeable.close()

```java
public void close() throws IOException
```

Closes this stream and releases any system resources associated
with it. If the stream is already closed then invoking this
method has no effect.

 As noted in `AutoCloseable.close()`, cases where the
close may fail require careful attention. It is strongly advised
to relinquish the underlying resources and to internally
*mark* the `Closeable` as closed, prior to throwing
the `IOException`.

Throws:

- `IOException`: if an I/O error occurs
