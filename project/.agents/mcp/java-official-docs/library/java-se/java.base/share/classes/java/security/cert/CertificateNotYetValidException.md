---
title: "CertificateNotYetValidException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateNotYetValidException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateNotYetValidException class (java.security.cert)

```java
public class CertificateNotYetValidException extends CertificateException
```

Certificate is not yet valid exception. This is thrown whenever
the current `Date` or the specified `Date`
is before the `notBefore` date/time in the Certificate
validity period.

**Since:** 1.2

## CertificateNotYetValidException.CertificateNotYetValidException()

```java
public CertificateNotYetValidException()
```

Constructs a CertificateNotYetValidException with no detail message. A
detail message is a String that describes this particular
exception.

## CertificateNotYetValidException.CertificateNotYetValidException(String)

```java
public CertificateNotYetValidException(String message)
```

Constructs a CertificateNotYetValidException with the specified detail
message. A detail message is a String that describes this
particular exception.

Parameters:

- `message`: the detail message.
