---
title: "UnsupportedClassVersionError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/UnsupportedClassVersionError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnsupportedClassVersionError class (java.lang)

```java
public class UnsupportedClassVersionError extends ClassFormatError
```

Thrown when the Java Virtual Machine attempts to read a class
file and determines that the major and minor version numbers
in the file are not supported.

**Since:** 1.2

## UnsupportedClassVersionError.UnsupportedClassVersionError()

```java
public UnsupportedClassVersionError()
```

Constructs a `UnsupportedClassVersionError`
with no detail message.

## UnsupportedClassVersionError.UnsupportedClassVersionError(String)

```java
public UnsupportedClassVersionError(String s)
```

Constructs a `UnsupportedClassVersionError` with
the specified detail message.

Parameters:

- `s`: the detail message.
