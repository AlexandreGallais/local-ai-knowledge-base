---
title: "DigestException class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/DigestException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DigestException class (java.security)

```java
public class DigestException extends GeneralSecurityException
```

This is the generic Message Digest exception.

**Since:** 1.1

## DigestException.DigestException()

```java
public DigestException()
```

Constructs a `DigestException` with no detail message.  (A
detail message is a `String` that describes this particular
exception.)

## DigestException.DigestException(String)

```java
public DigestException(String msg)
```

Constructs a `DigestException` with the specified detail
message.  (A detail message is a `String` that describes this
particular exception.)

Parameters:

- `msg`: the detail message.

## DigestException.DigestException(String, Throwable)

```java
public DigestException(String message, Throwable cause)
```

Creates a `DigestException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## DigestException.DigestException(Throwable)

```java
public DigestException(Throwable cause)
```

Creates a `DigestException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
