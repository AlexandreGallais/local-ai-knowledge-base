---
title: "InstantiationError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/InstantiationError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InstantiationError class (java.lang)

```java
public class InstantiationError extends IncompatibleClassChangeError
```

Thrown when an application tries to use the Java `new`
construct to instantiate an abstract class or an interface.

Normally, this error is caught by the compiler; this error can
only occur at run time if the definition of a class has
incompatibly changed.

**Since:** 1.0

## InstantiationError.InstantiationError()

```java
public InstantiationError()
```

Constructs an `InstantiationError` with no detail  message.

## InstantiationError.InstantiationError(String)

```java
public InstantiationError(String s)
```

Constructs an `InstantiationError` with the specified
detail message.

Parameters:

- `s`: the detail message.
