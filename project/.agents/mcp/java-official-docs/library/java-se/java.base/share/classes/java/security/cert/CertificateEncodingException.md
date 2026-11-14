---
title: "CertificateEncodingException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateEncodingException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateEncodingException class (java.security.cert)

```java
public class CertificateEncodingException extends CertificateException
```

Certificate Encoding Exception. This is thrown whenever an error
occurs while attempting to encode a certificate.

**Since:** 1.2

## CertificateEncodingException.CertificateEncodingException()

```java
public CertificateEncodingException()
```

Constructs a CertificateEncodingException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateEncodingException.CertificateEncodingException(String)

```java
public CertificateEncodingException(String message)
```

Constructs a CertificateEncodingException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `message`: the detail message.

## CertificateEncodingException.CertificateEncodingException(String, Throwable)

```java
public CertificateEncodingException(String message, Throwable cause)
```

Creates a `CertificateEncodingException` with the specified
detail message and cause.

Parameters:

- `message`: the detail message (which is saved for later retrieval by the `getMessage()` method).
- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5

## CertificateEncodingException.CertificateEncodingException(Throwable)

```java
public CertificateEncodingException(Throwable cause)
```

Creates a `CertificateEncodingException`
with the specified cause and a detail message of
`(cause==null ? null : cause.toString())`
(which typically contains the class and detail message of
`cause`).

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `getCause()` method). (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

**Since:** 1.5
