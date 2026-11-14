---
title: "ClassCastException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassCastException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassCastException class (java.lang)

```java
public class ClassCastException extends RuntimeException
```

Thrown to indicate that the code has attempted to cast an object
to a subclass of which it is not an instance. For example, the
following code generates a `ClassCastException`:

```java
    Object x = Integer.valueOf(0);
    System.out.println((String)x);
```

**Since:** 1.0

## ClassCastException.ClassCastException()

```java
public ClassCastException()
```

Constructs a `ClassCastException` with no detail message.

## ClassCastException.ClassCastException(String)

```java
public ClassCastException(String s)
```

Constructs a `ClassCastException` with the specified
detail message.

Parameters:

- `s`: the detail message.
