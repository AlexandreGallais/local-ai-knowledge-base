---
title: "ZipError class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipError class (java.util.zip)

```java
public class ZipError extends InternalError
```

Signals that an unrecoverable error has occurred.

**Deprecated:** ZipError is no longer used and is obsolete.
`ZipException` should be used instead.

**Since:** 1.6

## ZipError.ZipError(String)

```java
public ZipError(String s)
```

Constructs a ZipError with the given detail message.

Parameters:

- `s`: the `String` containing a detail message
