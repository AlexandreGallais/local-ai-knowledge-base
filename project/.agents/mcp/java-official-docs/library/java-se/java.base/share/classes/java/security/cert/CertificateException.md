---
title: "CertificateException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateException class (java.security.cert)

```java
public class CertificateException extends GeneralSecurityException
```

This exception indicates one of a variety of certificate problems.

**Since:** 1.2

**See also:** Certificate

## CertificateException.CertificateException()

```java
public CertificateException()
```

Constructs a certificate exception with no detail message. A detail
message is a String that describes this particular exception.

## CertificateException.CertificateException(String)

```java
public CertificateException(String msg)
```

Constructs a certificate exception with the given detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `msg`: the detail message.

## CertificateException.CertificateException(String, Throwable)

```java
public CertificateException(String message, Throwable cause)
```

Creates a `CertificateException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## CertificateException.CertificateException(Throwable)

```java
public CertificateException(Throwable cause)
```

Creates a `CertificateException` with the specified cause
and a detail message of `(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
