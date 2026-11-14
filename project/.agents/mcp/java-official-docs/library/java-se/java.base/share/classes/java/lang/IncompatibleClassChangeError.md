---
title: "IncompatibleClassChangeError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IncompatibleClassChangeError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IncompatibleClassChangeError class (java.lang)

```java
public class IncompatibleClassChangeError extends LinkageError
```

Thrown when an incompatible class change has occurred to some class
definition. The definition of some class, on which the currently
executing method depends, has since changed.

**Since:** 1.0

## IncompatibleClassChangeError.IncompatibleClassChangeError()

```java
public IncompatibleClassChangeError ()
```

Constructs an `IncompatibleClassChangeError` with no
detail message.

## IncompatibleClassChangeError.IncompatibleClassChangeError(String)

```java
public IncompatibleClassChangeError(String s)
```

Constructs an `IncompatibleClassChangeError` with the
specified detail message.

Parameters:

- `s`: the detail message.
