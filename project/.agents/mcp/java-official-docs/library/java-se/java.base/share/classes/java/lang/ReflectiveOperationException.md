---
title: "ReflectiveOperationException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ReflectiveOperationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReflectiveOperationException class (java.lang)

```java
public class ReflectiveOperationException extends Exception
```

Common superclass of exceptions thrown by reflective operations in
core reflection.

**See also:** LinkageError

**Since:** 1.7

## ReflectiveOperationException.ReflectiveOperationException()

```java
public ReflectiveOperationException()
```

Constructs a new exception with `null` as its detail
message.  The cause is not initialized, and may subsequently be
initialized by a call to `initCause`.

## ReflectiveOperationException.ReflectiveOperationException(String)

```java
public ReflectiveOperationException(String message)
```

Constructs a new exception with the specified detail message.
The cause is not initialized, and may subsequently be
initialized by a call to `initCause`.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `getMessage()` method.

## ReflectiveOperationException.ReflectiveOperationException(String, Throwable)

```java
public ReflectiveOperationException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message
and cause.

Note that the detail message associated with
`cause` is *not* automatically incorporated in
this exception's detail message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## ReflectiveOperationException.ReflectiveOperationException(Throwable)

```java
public ReflectiveOperationException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
