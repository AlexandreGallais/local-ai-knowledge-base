---
title: "Readable interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Readable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Readable interface (java.lang)

```java
public interface Readable
```

A `Readable` is a source of characters. Characters from
a `Readable` are made available to callers of the read
method via a CharBuffer.

**Since:** 1.5

## Readable.read(java.nio.CharBuffer)

```java
public int read(java.nio.CharBuffer cb) throws IOException
```

Attempts to read characters into the specified character buffer.
The buffer is used as a repository of characters as-is: the only
changes made are the results of a put operation. No flipping or
rewinding of the buffer is performed. If the length of the specified character
buffer is zero, then no characters will be read and zero will be
returned.

Parameters:

- `cb`: the buffer to read characters into

**Returns:** The number of `char` values added to the buffer,
        possibly zero, or -1 if this source of characters is at its end

Throws:

- `IOException`: if an I/O error occurs
- `NullPointerException`: if cb is null
- `java.nio.ReadOnlyBufferException`: if cb is a read only buffer, even if its length is zero
