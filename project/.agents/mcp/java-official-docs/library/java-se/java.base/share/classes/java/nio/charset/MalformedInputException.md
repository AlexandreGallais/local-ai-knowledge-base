---
title: "MalformedInputException class (java.nio.charset)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/MalformedInputException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MalformedInputException class (java.nio.charset)

```java
public class MalformedInputException extends CharacterCodingException
```

Checked exception thrown when an input byte sequence is not legal for given
charset, or an input character sequence is not a legal sixteen-bit Unicode
sequence.

**Since:** 1.4

## MalformedInputException.MalformedInputException(int)

```java
public MalformedInputException(int inputLength)
```

Constructs an `MalformedInputException` with the given
length.

Parameters:

- `inputLength`: the length of the input

## MalformedInputException.getInputLength()

```java
public int getInputLength()
```

## MalformedInputException.getMessage()

```java
public String getMessage()
```
