---
title: "UnsupportedOperationException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/UnsupportedOperationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnsupportedOperationException class (java.lang)

```java
public class UnsupportedOperationException extends RuntimeException
```

Thrown to indicate that the requested operation is not supported.

This class is a member of the

Java Collections Framework.

**Since:** 1.2

## UnsupportedOperationException.UnsupportedOperationException()

```java
public UnsupportedOperationException()
```

Constructs an UnsupportedOperationException with no detail message.

## UnsupportedOperationException.UnsupportedOperationException(String)

```java
public UnsupportedOperationException(String message)
```

Constructs an UnsupportedOperationException with the specified
detail message.

Parameters:

- `message`: the detail message

## UnsupportedOperationException.UnsupportedOperationException(String, Throwable)

```java
public UnsupportedOperationException(String message, Throwable cause)
```

Constructs a new exception with the specified detail message and
cause.

Note that the detail message associated with `cause` is
*not* automatically incorporated in this exception's detail
message.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `Throwable.getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## UnsupportedOperationException.UnsupportedOperationException(Throwable)

```java
public UnsupportedOperationException(Throwable cause)
```

Constructs a new exception with the specified cause and a detail
message of `(cause==null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).
This constructor is useful for exceptions that are little more than
wrappers for other throwables (for example, `java.security.PrivilegedActionException`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
