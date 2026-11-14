---
title: "IllegalAccessError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/IllegalAccessError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalAccessError class (java.lang)

```java
public class IllegalAccessError extends IncompatibleClassChangeError
```

Thrown if an application attempts to access or modify a field, or
to call a method that it does not have access to.

Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

**Since:** 1.0

## IllegalAccessError.IllegalAccessError()

```java
public IllegalAccessError()
```

Constructs an `IllegalAccessError` with no detail message.

## IllegalAccessError.IllegalAccessError(String)

```java
public IllegalAccessError(String s)
```

Constructs an `IllegalAccessError` with the specified
detail message.

Parameters:

- `s`: the detail message.
