---
title: "CertificateRevokedException class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CertificateRevokedException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CertificateRevokedException class (java.security.cert)

```java
public class CertificateRevokedException extends CertificateException
```

An exception that indicates an X.509 certificate is revoked. A
`CertificateRevokedException` contains additional information
about the revoked certificate, such as the date on which the
certificate was revoked and the reason it was revoked.

**Since:** 1.7

**See also:** CertPathValidatorException

## CertificateRevokedException.CertificateRevokedException(Date, CRLReason, X500Principal, Map<String, Extension>)

```java
public CertificateRevokedException(Date revocationDate, CRLReason reason, X500Principal authority, Map<String, Extension> extensions)
```

Constructs a `CertificateRevokedException` with
the specified revocation date, reason code, authority name, and map
of extensions.

Parameters:

- `revocationDate`: the date on which the certificate was revoked. The date is copied to protect against subsequent modification.
- `reason`: the revocation reason
- `authority`: the `X500Principal` that represents the name of the authority that signed the certificate's revocation status information
- `extensions`: a map of X.509 Extensions. Each key is an OID String that maps to the corresponding Extension. The map is copied to prevent subsequent modification.

Throws:

- `NullPointerException`: if `revocationDate`, `reason`, `authority`, or `extensions` is `null`
- `ClassCastException`: if `extensions` contains an incorrectly typed key or value

## CertificateRevokedException.getRevocationDate()

```java
public Date getRevocationDate()
```

Returns the date on which the certificate was revoked. A new copy is
returned each time the method is invoked to protect against subsequent
modification.

**Returns:** the revocation date

## CertificateRevokedException.getRevocationReason()

```java
public CRLReason getRevocationReason()
```

Returns the reason the certificate was revoked.

**Returns:** the revocation reason

## CertificateRevokedException.getAuthorityName()

```java
public X500Principal getAuthorityName()
```

Returns the name of the authority that signed the certificate's
revocation status information.

**Returns:** the `X500Principal` that represents the name of the
    authority that signed the certificate's revocation status information

## CertificateRevokedException.getInvalidityDate()

```java
public Date getInvalidityDate()
```

Returns the invalidity date, as specified in the Invalidity Date
extension of this `CertificateRevokedException`. The
invalidity date is the date on which it is known or suspected that the
private key was compromised or that the certificate otherwise became
invalid. This implementation calls `getExtensions()` and
checks the returned map for an entry for the Invalidity Date extension
OID ("2.5.29.24"). If found, it returns the invalidity date in the
extension; otherwise null. A new Date object is returned each time the
method is invoked to protect against subsequent modification.

**Returns:** the invalidity date, or `null` if not specified

## CertificateRevokedException.getExtensions()

```java
public Map<String, Extension> getExtensions()
```

Returns a map of X.509 extensions containing additional information
about the revoked certificate, such as the Invalidity Date
Extension. Each key is an OID String that maps to the corresponding
Extension.

**Returns:** an unmodifiable map of X.509 extensions, or an empty map
   if there are no extensions
