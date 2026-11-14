---
title: "CertificateExpiredException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateExpiredException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateExpiredException class (java.security.cert)

```java
public class CertificateExpiredException extends CertificateException
```

Certificate Expired Exception. This is thrown whenever the current
`Date` or the specified `Date` is after the
`notAfter` date/time specified in the validity period
of the certificate.

**Since:** 1.2

## CertificateExpiredException.CertificateExpiredException()

```java
public CertificateExpiredException()
```

Constructs a CertificateExpiredException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateExpiredException.CertificateExpiredException(String)

```java
public CertificateExpiredException(String message)
```

Constructs a CertificateExpiredException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `message`: the detail message.
