---
title: "UnmappableCharacterException class (java.nio.charset)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/UnmappableCharacterException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnmappableCharacterException class (java.nio.charset)

```java
public class UnmappableCharacterException extends CharacterCodingException
```

Checked exception thrown when an input character (or byte) sequence
is valid but cannot be mapped to an output byte (or character)
sequence.

**Since:** 1.4

## UnmappableCharacterException.UnmappableCharacterException(int)

```java
public UnmappableCharacterException(int inputLength)
```

Constructs an `UnmappableCharacterException` with the
given length.

Parameters:

- `inputLength`: the length of the input

## UnmappableCharacterException.getInputLength()

```java
public int getInputLength()
```

## UnmappableCharacterException.getMessage()

```java
public String getMessage()
```
