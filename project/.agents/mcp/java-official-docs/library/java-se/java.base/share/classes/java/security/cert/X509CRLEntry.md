---
title: "X509CRLEntry class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CRLEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CRLEntry class (java.security.cert)

```java
public abstract class X509CRLEntry implements X509Extension
```

Abstract class for a revoked certificate in a CRL (Certificate
Revocation List).

The ASN.1 definition for *revokedCertificates* is:

```java
revokedCertificates    SEQUENCE OF SEQUENCE  {
    userCertificate    CertificateSerialNumber,
    revocationDate     ChoiceOfTime,
    crlEntryExtensions Extensions OPTIONAL
                       -- if present, must be v2
}  OPTIONAL

CertificateSerialNumber  ::=  INTEGER

Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension

Extension  ::=  SEQUENCE  {
    extnId        OBJECT IDENTIFIER,
    critical      BOOLEAN DEFAULT FALSE,
    extnValue     OCTET STRING
                  -- contains a DER encoding of a value
                  -- of the type registered for use with
                  -- the extnId object identifier value
```

**See also:** X509CRL

**See also:** X509Extension

**Since:** 1.2

## X509CRLEntry.X509CRLEntry()

```java
public X509CRLEntry()
```

Constructor for subclasses to call.

## X509CRLEntry.equals(Object)

```java
public boolean equals(Object other)
```

Compares this CRL entry for equality with the given
object. If the `other` object is an
`instanceof` `X509CRLEntry`, then
its encoded form (the inner SEQUENCE) is retrieved and compared
with the encoded form of this CRL entry.

Parameters:

- `other`: the object to test for equality with this CRL entry.

**Returns:** true iff the encoded forms of the two CRL entries
match, false otherwise.

## X509CRLEntry.hashCode()

```java
public int hashCode()
```

## X509CRLEntry.getEncoded()

```java
public abstract byte[] getEncoded() throws CRLException
```

Returns the ASN.1 DER-encoded form of this CRL Entry,
that is the inner SEQUENCE.

**Returns:** the encoded form of this certificate

Throws:

- `CRLException`: if an encoding error occurs.

## X509CRLEntry.getSerialNumber()

```java
public abstract BigInteger getSerialNumber()
```

Gets the serial number from this X509CRLEntry,
the *userCertificate*.

**Returns:** the serial number.

## X509CRLEntry.getCertificateIssuer()

```java
public X500Principal getCertificateIssuer()
```

Get the issuer of the X509Certificate described by this entry. If
the certificate issuer is also the CRL issuer, this method returns
null.

This method is used with indirect CRLs. The default implementation
always returns null. Subclasses that wish to support indirect CRLs
should override it.

**Returns:** the issuer of the X509Certificate described by this entry
or null if it is issued by the CRL issuer.

**Since:** 1.5

## X509CRLEntry.getRevocationDate()

```java
public abstract Date getRevocationDate()
```

Gets the revocation date from this X509CRLEntry,
the *revocationDate*.

**Returns:** the revocation date.

## X509CRLEntry.hasExtensions()

```java
public abstract boolean hasExtensions()
```

Returns true if this CRL entry has extensions.

**Returns:** true if this entry has extensions, false otherwise.

## X509CRLEntry.toString()

```java
public abstract String toString()
```

Returns a string representation of this CRL entry.

**Returns:** a string representation of this CRL entry.

## X509CRLEntry.getRevocationReason()

```java
public CRLReason getRevocationReason()
```

Returns the reason the certificate has been revoked, as specified
in the Reason Code extension of this CRL entry.

**Returns:** the reason the certificate has been revoked, or
   `null` if this CRL entry does not have
   a Reason Code extension

**Since:** 1.7
