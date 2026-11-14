---
title: "NumberFormatException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/NumberFormatException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NumberFormatException class (java.lang)

```java
public class NumberFormatException extends IllegalArgumentException
```

Thrown to indicate that the application has attempted to convert
a string to one of the numeric types, but that the string does not
have the appropriate format.

**See also:** java.lang.Integer#parseInt(String)

**Since:** 1.0

## NumberFormatException.NumberFormatException()

```java
public NumberFormatException ()
```

Constructs a `NumberFormatException` with no detail message.

## NumberFormatException.NumberFormatException(String)

```java
public NumberFormatException (String s)
```

Constructs a `NumberFormatException` with the
specified detail message.

Parameters:

- `s`: the detail message.
