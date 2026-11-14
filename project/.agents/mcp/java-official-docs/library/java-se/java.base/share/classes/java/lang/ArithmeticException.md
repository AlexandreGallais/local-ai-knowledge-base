---
title: "ArithmeticException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ArithmeticException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArithmeticException class (java.lang)

```java
public class ArithmeticException extends RuntimeException
```

Thrown when an exceptional arithmetic condition has occurred. For
example, an integer "divide by zero" throws an
instance of this class.

`ArithmeticException` objects may be constructed by the
virtual machine as if Throwable, boolean, boolean) suppression were disabled and/or the stack trace was not writable.

**Since:** 1.0

## ArithmeticException.ArithmeticException()

```java
public ArithmeticException()
```

Constructs an `ArithmeticException` with no detail
message.

## ArithmeticException.ArithmeticException(String)

```java
public ArithmeticException(String s)
```

Constructs an `ArithmeticException` with the specified
detail message.

Parameters:

- `s`: the detail message.
