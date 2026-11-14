---
title: "ClassFormatError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassFormatError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFormatError class (java.lang)

```java
public class ClassFormatError extends LinkageError
```

Thrown when the Java Virtual Machine attempts to read a class
file and determines that the file is malformed or otherwise cannot
be interpreted as a class file.

**Since:** 1.0

## ClassFormatError.ClassFormatError()

```java
public ClassFormatError()
```

Constructs a `ClassFormatError` with no detail message.

## ClassFormatError.ClassFormatError(String)

```java
public ClassFormatError(String s)
```

Constructs a `ClassFormatError` with the specified
detail message.

Parameters:

- `s`: the detail message.
