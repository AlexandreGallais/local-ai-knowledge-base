---
title: "StackOverflowError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StackOverflowError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackOverflowError class (java.lang)

```java
public class StackOverflowError extends VirtualMachineError
```

Thrown when a stack overflow occurs because an application
recurses too deeply.

**Since:** 1.0

## StackOverflowError.StackOverflowError()

```java
public StackOverflowError()
```

Constructs a `StackOverflowError` with no detail message.

## StackOverflowError.StackOverflowError(String)

```java
public StackOverflowError(String s)
```

Constructs a `StackOverflowError` with the specified
detail message.

Parameters:

- `s`: the detail message.
