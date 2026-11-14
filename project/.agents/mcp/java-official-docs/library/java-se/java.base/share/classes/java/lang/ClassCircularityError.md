---
title: "ClassCircularityError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassCircularityError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassCircularityError class (java.lang)

```java
public class ClassCircularityError extends LinkageError
```

Thrown when the Java Virtual Machine detects a circularity in the
superclass hierarchy of a class being loaded.

**Since:** 1.0

## ClassCircularityError.ClassCircularityError()

```java
public ClassCircularityError()
```

Constructs a `ClassCircularityError` with no detail message.

## ClassCircularityError.ClassCircularityError(String)

```java
public ClassCircularityError(String s)
```

Constructs a `ClassCircularityError` with the specified detail
message.

Parameters:

- `s`: The detail message
