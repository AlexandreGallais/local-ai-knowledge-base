---
title: "InvalidKeySpecException class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/InvalidKeySpecException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidKeySpecException class (java.security.spec)

```java
public class InvalidKeySpecException extends GeneralSecurityException
```

This is the exception for invalid key specifications.

**See also:** KeySpec

**Since:** 1.2

## InvalidKeySpecException.InvalidKeySpecException()

```java
public InvalidKeySpecException()
```

Constructs an InvalidKeySpecException with no detail message. A
detail message is a String that describes this particular
exception.

## InvalidKeySpecException.InvalidKeySpecException(String)

```java
public InvalidKeySpecException(String msg)
```

Constructs an InvalidKeySpecException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## InvalidKeySpecException.InvalidKeySpecException(String, Throwable)

```java
public InvalidKeySpecException(String message, Throwable cause)
```

Creates an `InvalidKeySpecException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## InvalidKeySpecException.InvalidKeySpecException(Throwable)

```java
public InvalidKeySpecException(Throwable cause)
```

Creates an `InvalidKeySpecException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
