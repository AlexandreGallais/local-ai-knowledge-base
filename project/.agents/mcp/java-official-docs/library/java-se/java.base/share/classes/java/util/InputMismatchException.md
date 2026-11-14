---
title: "InputMismatchException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/InputMismatchException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InputMismatchException class (java.util)

```java
public class InputMismatchException extends NoSuchElementException
```

Thrown by a `Scanner` to indicate that the token
retrieved does not match the pattern for the expected type, or
that the token is out of range for the expected type.

**See also:** java.util.Scanner

**Since:** 1.5

## InputMismatchException.InputMismatchException()

```java
public InputMismatchException()
```

Constructs an `InputMismatchException` with `null`
as its error message string.

## InputMismatchException.InputMismatchException(String)

```java
public InputMismatchException(String s)
```

Constructs an `InputMismatchException`, saving a reference
to the error message string `s` for later retrieval by the
`getMessage` method.

Parameters:

- `s`: the detail message.
