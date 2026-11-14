---
title: "NoSuchAlgorithmException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/NoSuchAlgorithmException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NoSuchAlgorithmException class (java.security)

```java
public class NoSuchAlgorithmException extends GeneralSecurityException
```

This exception is thrown when a particular cryptographic algorithm is
requested but is not available in the environment.

**Since:** 1.1

## NoSuchAlgorithmException.NoSuchAlgorithmException()

```java
public NoSuchAlgorithmException()
```

Constructs a `NoSuchAlgorithmException` with no detail
message. A detail message is a `String` that describes this
particular exception.

## NoSuchAlgorithmException.NoSuchAlgorithmException(String)

```java
public NoSuchAlgorithmException(String msg)
```

Constructs a `NoSuchAlgorithmException` with the specified
detail message. A detail message is a `String` that describes
this particular exception, which may, for example, specify which
algorithm is not available.

Parameters:

- `msg`: the detail message.

## NoSuchAlgorithmException.NoSuchAlgorithmException(String, Throwable)

```java
public NoSuchAlgorithmException(String message, Throwable cause)
```

Creates a `NoSuchAlgorithmException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## NoSuchAlgorithmException.NoSuchAlgorithmException(Throwable)

```java
public NoSuchAlgorithmException(Throwable cause)
```

Creates a `NoSuchAlgorithmException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
