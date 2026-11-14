---
title: "WrongMethodTypeException class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/WrongMethodTypeException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WrongMethodTypeException class (java.lang.invoke)

```java
public class WrongMethodTypeException extends RuntimeException
```

Thrown to indicate that code has attempted to call a method handle
via the wrong method type.  As with the bytecode representation of
normal Java method calls, method handle calls are strongly typed
to a specific type descriptor associated with a call site.

This exception may also be thrown when two method handles are
composed, and the system detects that their types cannot be
matched up correctly.  This amounts to an early evaluation
of the type mismatch, at method handle construction time,
instead of when the mismatched method handle is called.

**Since:** 1.7

## WrongMethodTypeException.WrongMethodTypeException()

```java
public WrongMethodTypeException()
```

Constructs a `WrongMethodTypeException` with no detail message.

## WrongMethodTypeException.WrongMethodTypeException(String)

```java
public WrongMethodTypeException(String s)
```

Constructs a `WrongMethodTypeException` with the specified
detail message.

Parameters:

- `s`: the detail message.

## WrongMethodTypeException.WrongMethodTypeException(String, Throwable)

```java
/*non-public*/ WrongMethodTypeException(String s, Throwable cause)
```

Constructs a `WrongMethodTypeException` with the specified
detail message and cause.

Parameters:

- `s`: the detail message.
- `cause`: the cause of the exception, or null.

## WrongMethodTypeException.WrongMethodTypeException(Throwable)

```java
/*non-public*/ WrongMethodTypeException(Throwable cause)
```

Constructs a `WrongMethodTypeException` with the specified
cause.

Parameters:

- `cause`: the cause of the exception, or null.
