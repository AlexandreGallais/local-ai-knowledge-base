---
title: "JarException class (java.util.jar)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/jar/JarException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JarException class (java.util.jar)

```java
public class JarException extends java.util.zip.ZipException
```

Signals that an error of some sort has occurred while reading from
or writing to a JAR file.

**Since:** 1.2

## JarException.JarException()

```java
public JarException()
```

Constructs a JarException with no detail message.

## JarException.JarException(String)

```java
public JarException(String s)
```

Constructs a JarException with the specified detail message.

Parameters:

- `s`: the detail message
