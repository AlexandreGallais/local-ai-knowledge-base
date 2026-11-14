---
title: "CRL class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/CRL.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CRL class (java.security.cert)

```java
public abstract class CRL
```

This class is an abstraction of certificate revocation lists (CRLs) that
have different formats but important common uses. For example, all CRLs
share the functionality of listing revoked certificates, and can be queried
on whether they list a given certificate.

Specialized CRL types can be defined by subclassing off of this abstract
class.

**See also:** X509CRL

**See also:** CertificateFactory

**Since:** 1.2

## CRL.CRL(String)

```java
protected CRL(String type)
```

Creates a CRL of the specified type.

Parameters:

- `type`: the standard name of the CRL type. See the  Java Security Standard Algorithm Names document for information about standard CRL types.

## CRL.getType()

```java
public final String getType()
```

Returns the type of this CRL.

**Returns:** the type of this CRL.

## CRL.toString()

```java
public abstract String toString()
```

Returns a string representation of this CRL.

**Returns:** a string representation of this CRL.

## CRL.isRevoked(Certificate)

```java
public abstract boolean isRevoked(Certificate cert)
```

Checks whether the given certificate is on this CRL.

Parameters:

- `cert`: the certificate to check for.

**Returns:** true if the given certificate is on this CRL,
false otherwise.
