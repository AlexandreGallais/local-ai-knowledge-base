---
title: "SecurityException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/SecurityException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SecurityException class (java.lang)

```java
public class SecurityException extends RuntimeException
```

Thrown to indicate a security violation.

 This exception was originally specified for use with a SecurityManager when
an operation was denied. This feature no longer exists. This exception may be
deprecated in a future release.

**Since:** 1.0

## SecurityException.SecurityException()

```java
public SecurityException()
```

Constructs a `SecurityException` with no detail message.

## SecurityException.SecurityException(String)

```java
public SecurityException(String s)
```

Constructs a `SecurityException` with the specified
detail message.

Parameters:

- `s`: the detail message.

## SecurityException.SecurityException(String, Throwable)

```java
public SecurityException(String message, Throwable cause)
```

Creates a `SecurityException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## SecurityException.SecurityException(Throwable)

```java
public SecurityException(Throwable cause)
```

Creates a `SecurityException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
