---
title: "SignatureException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/SignatureException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SignatureException class (java.security)

```java
public class SignatureException extends GeneralSecurityException
```

This is the generic Signature exception.

**Since:** 1.1

## SignatureException.SignatureException()

```java
public SignatureException()
```

Constructs a `SignatureException` with no detail message. A
detail message is a `String` that describes this particular
exception.

## SignatureException.SignatureException(String)

```java
public SignatureException(String msg)
```

Constructs a `SignatureException` with the specified detail
message.  A detail message is a `String` that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## SignatureException.SignatureException(String, Throwable)

```java
public SignatureException(String message, Throwable cause)
```

Creates a `SignatureException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## SignatureException.SignatureException(Throwable)

```java
public SignatureException(Throwable cause)
```

Creates a `SignatureException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
