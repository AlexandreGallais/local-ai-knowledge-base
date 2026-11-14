---
title: "AbstractMethodError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/AbstractMethodError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractMethodError class (java.lang)

```java
public class AbstractMethodError extends IncompatibleClassChangeError
```

Thrown when an application tries to call an abstract method.
Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of some class has
incompatibly changed since the currently executing method was last
compiled.

**Since:** 1.0

## AbstractMethodError.AbstractMethodError()

```java
public AbstractMethodError()
```

Constructs an `AbstractMethodError` with no detail  message.

## AbstractMethodError.AbstractMethodError(String)

```java
public AbstractMethodError(String s)
```

Constructs an `AbstractMethodError` with the specified
detail message.

Parameters:

- `s`: the detail message.
