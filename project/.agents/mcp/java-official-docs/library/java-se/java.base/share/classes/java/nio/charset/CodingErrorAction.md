---
title: "CodingErrorAction class (java.nio.charset)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/CodingErrorAction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodingErrorAction class (java.nio.charset)

```java
public final class CodingErrorAction
```

A typesafe enumeration for coding-error actions.

 Instances of this class are used to specify how malformed-input and
unmappable-character errors are to be handled by charset decoders and encoders.

**Since:** 1.4

## CodingErrorAction.IGNORE

```java
public static final CodingErrorAction IGNORE
```

Action indicating that a coding error is to be handled by dropping the
erroneous input and resuming the coding operation.

## CodingErrorAction.REPLACE

```java
public static final CodingErrorAction REPLACE
```

Action indicating that a coding error is to be handled by dropping the
erroneous input, appending the coder's replacement value to the output
buffer, and resuming the coding operation.

## CodingErrorAction.REPORT

```java
public static final CodingErrorAction REPORT
```

Action indicating that a coding error is to be reported, either by
returning a `CoderResult` object or by throwing a `CharacterCodingException`, whichever is appropriate for the method
implementing the coding process.

## CodingErrorAction.toString()

```java
public String toString()
```

Returns a string describing this action.

**Returns:** A descriptive string
