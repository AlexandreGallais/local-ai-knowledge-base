---
title: "InvalidKeyException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/InvalidKeyException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidKeyException class (java.security)

```java
public class InvalidKeyException extends KeyException
```

This is the exception for invalid Keys (invalid encoding, wrong
length, uninitialized, etc.).

**Since:** 1.1

## InvalidKeyException.InvalidKeyException()

```java
public InvalidKeyException()
```

Constructs an `InvalidKeyException` with no detail message. A
detail message is a `String` that describes this particular
exception.

## InvalidKeyException.InvalidKeyException(String)

```java
public InvalidKeyException(String msg)
```

Constructs an `InvalidKeyException` with the specified detail
message. A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## InvalidKeyException.InvalidKeyException(String, Throwable)

```java
public InvalidKeyException(String message, Throwable cause)
```

Creates an `InvalidKeyException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## InvalidKeyException.InvalidKeyException(Throwable)

```java
public InvalidKeyException(Throwable cause)
```

Creates an `InvalidKeyException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
