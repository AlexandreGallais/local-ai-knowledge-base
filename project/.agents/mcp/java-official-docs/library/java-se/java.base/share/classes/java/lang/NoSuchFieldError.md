---
title: "NoSuchFieldError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/NoSuchFieldError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoSuchFieldError class (java.lang)

```java
public class NoSuchFieldError extends IncompatibleClassChangeError
```

Thrown if an application tries to access or modify a specified
field of an object, and that object no longer has that field.

Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

**Since:** 1.0

## NoSuchFieldError.NoSuchFieldError()

```java
public NoSuchFieldError()
```

Constructs a `NoSuchFieldError` with no detail message.

## NoSuchFieldError.NoSuchFieldError(String)

```java
public NoSuchFieldError(String s)
```

Constructs a `NoSuchFieldError` with the specified
detail message.

Parameters:

- `s`: the detail message.
