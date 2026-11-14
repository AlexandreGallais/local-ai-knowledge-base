---
title: "StringConcatException class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/StringConcatException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringConcatException class (java.lang.invoke)

```java
public class StringConcatException extends Exception
```

StringConcatException is thrown by `StringConcatFactory` when linkage
invariants are violated.

**Since:** 9

## StringConcatException.StringConcatException(String)

```java
public StringConcatException(String msg)
```

Constructs an exception with a message

Parameters:

- `msg`: exception message

## StringConcatException.StringConcatException(String, Throwable)

```java
public StringConcatException(String msg, Throwable cause)
```

Constructs an exception with a message and a linked throwable

Parameters:

- `msg`: exception message
- `cause`: throwable cause
