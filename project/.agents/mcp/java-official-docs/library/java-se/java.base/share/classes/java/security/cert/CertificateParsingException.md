---
title: "CertificateParsingException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateParsingException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateParsingException class (java.security.cert)

```java
public class CertificateParsingException extends CertificateException
```

Certificate Parsing Exception. This is thrown whenever an
invalid DER-encoded certificate is parsed or unsupported DER features
are found in the Certificate.

**Since:** 1.2

## CertificateParsingException.CertificateParsingException()

```java
public CertificateParsingException()
```

Constructs a CertificateParsingException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateParsingException.CertificateParsingException(String)

```java
public CertificateParsingException(String message)
```

Constructs a CertificateParsingException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `message`: the detail message.

## CertificateParsingException.CertificateParsingException(String, Throwable)

```java
public CertificateParsingException(String message, Throwable cause)
```

Creates a `CertificateParsingException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## CertificateParsingException.CertificateParsingException(Throwable)

```java
public CertificateParsingException(Throwable cause)
```

Creates a `CertificateParsingException` with the
specified cause and a detail message of
`(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
