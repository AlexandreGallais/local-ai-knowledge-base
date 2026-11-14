---
title: "NoClassDefFoundError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/NoClassDefFoundError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoClassDefFoundError class (java.lang)

```java
public class NoClassDefFoundError extends LinkageError
```

Thrown if the Java Virtual Machine or a `ClassLoader` instance
tries to load in the definition of a class (as part of a normal method call
or as part of creating a new instance using the `new` expression)
and no definition of the class could be found.

The searched-for class definition existed when the currently
executing class was compiled, but the definition can no longer be
found.

**Since:** 1.0

## NoClassDefFoundError.NoClassDefFoundError()

```java
public NoClassDefFoundError()
```

Constructs a `NoClassDefFoundError` with no detail message.

## NoClassDefFoundError.NoClassDefFoundError(String)

```java
public NoClassDefFoundError(String s)
```

Constructs a `NoClassDefFoundError` with the specified
detail message.

Parameters:

- `s`: the detail message.
