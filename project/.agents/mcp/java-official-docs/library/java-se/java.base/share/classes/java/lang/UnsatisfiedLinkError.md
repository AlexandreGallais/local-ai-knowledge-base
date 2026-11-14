---
title: "UnsatisfiedLinkError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/UnsatisfiedLinkError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnsatisfiedLinkError class (java.lang)

```java
public class UnsatisfiedLinkError extends LinkageError
```

Thrown if the Java Virtual Machine cannot find an appropriate
native-language definition of a method declared `native`.

**See also:** java.lang.Runtime

**Since:** 1.0

## UnsatisfiedLinkError.UnsatisfiedLinkError()

```java
public UnsatisfiedLinkError()
```

Constructs an `UnsatisfiedLinkError` with no detail message.

## UnsatisfiedLinkError.UnsatisfiedLinkError(String)

```java
public UnsatisfiedLinkError(String s)
```

Constructs an `UnsatisfiedLinkError` with the
specified detail message.

Parameters:

- `s`: the detail message.
