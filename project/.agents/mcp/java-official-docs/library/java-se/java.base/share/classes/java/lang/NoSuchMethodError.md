---
title: "NoSuchMethodError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/NoSuchMethodError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoSuchMethodError class (java.lang)

```java
public class NoSuchMethodError extends IncompatibleClassChangeError
```

Thrown if an application tries to call a specified method of a
class (either static or instance), and that class no longer has a
definition of that method.

Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

**Since:** 1.0

## NoSuchMethodError.NoSuchMethodError()

```java
public NoSuchMethodError()
```

Constructs a `NoSuchMethodError` with no detail message.

## NoSuchMethodError.NoSuchMethodError(String)

```java
public NoSuchMethodError(String s)
```

Constructs a `NoSuchMethodError` with the
specified detail message.

Parameters:

- `s`: the detail message.
