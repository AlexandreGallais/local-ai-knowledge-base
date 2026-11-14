---
title: "GeneralSecurityException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/GeneralSecurityException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GeneralSecurityException class (java.security)

```java
public class GeneralSecurityException extends Exception
```

The `GeneralSecurityException` class is a generic
security exception class that provides type safety for all the
security-related exception classes that extend from it.

**Since:** 1.2

## GeneralSecurityException.GeneralSecurityException()

```java
public GeneralSecurityException()
```

Constructs a `GeneralSecurityException` with no detail message.

## GeneralSecurityException.GeneralSecurityException(String)

```java
public GeneralSecurityException(String msg)
```

Constructs a `GeneralSecurityException` with the specified detail
message.
A detail message is a `String` that describes this particular
exception.

Parameters:

- `msg`: the detail message.

## GeneralSecurityException.GeneralSecurityException(String, Throwable)

```java
public GeneralSecurityException(String message, Throwable cause)
```

Creates a `GeneralSecurityException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## GeneralSecurityException.GeneralSecurityException(Throwable)

```java
public GeneralSecurityException(Throwable cause)
```

Creates a `GeneralSecurityException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
