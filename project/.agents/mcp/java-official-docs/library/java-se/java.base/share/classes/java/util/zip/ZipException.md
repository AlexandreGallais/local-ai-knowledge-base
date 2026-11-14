---
title: "ZipException class (java.util.zip)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/zip/ZipException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ZipException class (java.util.zip)

```java
public class ZipException extends IOException
```

Signals that a ZIP exception of some sort has occurred.

**See also:** java.io.IOException

**Since:** 1.1

## ZipException.ZipException()

```java
public ZipException()
```

Constructs a `ZipException` with `null`
as its error detail message.

## ZipException.ZipException(String)

```java
public ZipException(String s)
```

Constructs a `ZipException` with the specified detail
message.

Parameters:

- `s`: the detail message.
