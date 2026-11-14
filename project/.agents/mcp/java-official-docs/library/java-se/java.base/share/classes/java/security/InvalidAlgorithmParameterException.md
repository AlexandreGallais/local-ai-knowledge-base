---
title: "InvalidAlgorithmParameterException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/InvalidAlgorithmParameterException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidAlgorithmParameterException class (java.security)

```java
public class InvalidAlgorithmParameterException extends GeneralSecurityException
```

This is the exception for invalid or inappropriate algorithm parameters.

**See also:** AlgorithmParameters

**See also:** java.security.spec.AlgorithmParameterSpec

**Since:** 1.2

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException()

```java
public InvalidAlgorithmParameterException()
```

Constructs an `InvalidAlgorithmParameterException` with no detail
message.
A detail message is a `String` that describes this particular
exception.

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(String)

```java
public InvalidAlgorithmParameterException(String msg)
```

Constructs an `InvalidAlgorithmParameterException` with the
specified detail message.
A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(String, Throwable)

```java
public InvalidAlgorithmParameterException(String message, Throwable cause)
```

Creates an `InvalidAlgorithmParameterException` with the
specified detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## InvalidAlgorithmParameterException.InvalidAlgorithmParameterException(Throwable)

```java
public InvalidAlgorithmParameterException(Throwable cause)
```

Creates an `InvalidAlgorithmParameterException` with the
specified cause and a detail message of
`(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
