---
title: "CRLException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CRLException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CRLException class (java.security.cert)

```java
public class CRLException extends GeneralSecurityException
```

CRL (Certificate Revocation List) Exception.

**Since:** 1.2

## CRLException.CRLException()

```java
public CRLException()
```

Constructs a CRLException with no detail message. A
detail message is a String that describes this particular
exception.

## CRLException.CRLException(String)

```java
public CRLException(String message)
```

Constructs a CRLException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `message`: the detail message.

## CRLException.CRLException(String, Throwable)

```java
public CRLException(String message, Throwable cause)
```

Creates a `CRLException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## CRLException.CRLException(Throwable)

```java
public CRLException(Throwable cause)
```

Creates a `CRLException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
