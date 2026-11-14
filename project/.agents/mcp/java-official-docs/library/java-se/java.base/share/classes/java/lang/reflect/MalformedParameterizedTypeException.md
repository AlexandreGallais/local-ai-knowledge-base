---
title: "MalformedParameterizedTypeException class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/MalformedParameterizedTypeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MalformedParameterizedTypeException class (java.lang.reflect)

```java
public class MalformedParameterizedTypeException extends RuntimeException
```

Thrown when a semantically malformed parameterized type is
encountered by a reflective method that needs to instantiate it.
For example, if the number of type arguments to a parameterized type
is wrong.

**Since:** 1.5

## MalformedParameterizedTypeException.MalformedParameterizedTypeException()

```java
public MalformedParameterizedTypeException()
```

Constructs a `MalformedParameterizedTypeException` with
no detail message.

## MalformedParameterizedTypeException.MalformedParameterizedTypeException(String)

```java
public MalformedParameterizedTypeException(String message)
```

Constructs a `MalformedParameterizedTypeException` with
the given detail message.

Parameters:

- `message`: the detail message; may be `null`

**Since:** 10
