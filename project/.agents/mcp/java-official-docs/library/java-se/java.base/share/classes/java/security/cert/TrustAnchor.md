---
title: "TrustAnchor class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/TrustAnchor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TrustAnchor class (java.security.cert)

```java
public class TrustAnchor
```

A trust anchor or most-trusted Certification Authority (CA).

This class represents a "most-trusted CA", which is used as a trust anchor
for validating X.509 certification paths. A most-trusted CA includes the
public key of the CA, the CA's name, and any constraints upon the set of
paths which may be validated using this key. These parameters can be
specified in the form of a trusted `X509Certificate` or as
individual parameters.

**Concurrent Access**

All `TrustAnchor` objects must be immutable and
thread-safe. That is, multiple threads may concurrently invoke the
methods defined in this class on a single `TrustAnchor`
object (or more than one) with no ill effects. Requiring
`TrustAnchor` objects to be immutable and thread-safe
allows them to be passed around to various pieces of code without
worrying about coordinating access. This stipulation applies to all
public fields and methods of this class and any added or overridden
by subclasses.

**See also:** PKIXParameters#PKIXParameters(Set)

**See also:** PKIXBuilderParameters#PKIXBuilderParameters(Set, CertSelector)

**Since:** 1.4

## TrustAnchor.TrustAnchor(X509Certificate, byte[])

```java
public TrustAnchor(X509Certificate trustedCert, byte[] nameConstraints)
```

Creates an instance of `TrustAnchor` with the specified
`X509Certificate` and optional name constraints, which
are intended to be used as additional constraints when validating
an X.509 certification path.

The name constraints are specified as a byte array. This byte array
should contain the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in
RFC 5280
and X.509. The ASN.1 definition of this structure appears below.

```java
 NameConstraints ::= SEQUENCE {
      permittedSubtrees       [0]     GeneralSubtrees OPTIONAL,
      excludedSubtrees        [1]     GeneralSubtrees OPTIONAL }

 GeneralSubtrees ::= SEQUENCE SIZE (1..MAX) OF GeneralSubtree

 GeneralSubtree ::= SEQUENCE {
      base                    GeneralName,
      minimum         [0]     BaseDistance DEFAULT 0,
      maximum         [1]     BaseDistance OPTIONAL }

 BaseDistance ::= INTEGER (0..MAX)

 GeneralName ::= CHOICE {
      otherName                       [0]     OtherName,
      rfc822Name                      [1]     IA5String,
      dNSName                         [2]     IA5String,
      x400Address                     [3]     ORAddress,
      directoryName                   [4]     Name,
      ediPartyName                    [5]     EDIPartyName,
      uniformResourceIdentifier       [6]     IA5String,
      iPAddress                       [7]     OCTET STRING,
      registeredID                    [8]     OBJECT IDENTIFIER}
```

Note that the name constraints byte array supplied is cloned to protect
against subsequent modifications.

Parameters:

- `trustedCert`: a trusted `X509Certificate`
- `nameConstraints`: a byte array containing the ASN.1 DER encoding of a NameConstraints extension to be used for checking name constraints. Only the value of the extension is included, not the OID or criticality flag. Specify `null` to omit the parameter.

Throws:

- `IllegalArgumentException`: if the name constraints cannot be decoded
- `NullPointerException`: if the specified `X509Certificate` is `null`

## TrustAnchor.TrustAnchor(X500Principal, PublicKey, byte[])

```java
public TrustAnchor(X500Principal caPrincipal, PublicKey <example-value>, byte[] nameConstraints)
```

Creates an instance of `TrustAnchor` where the
most-trusted CA is specified as an X500Principal and public key.
Name constraints are an optional parameter, and are intended to be used
as additional constraints when validating an X.509 certification path.

The name constraints are specified as a byte array. This byte array
contains the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in RFC 5280
and X.509. The ASN.1 notation for this structure is supplied in the
documentation for
byte[]) TrustAnchor(X509Certificate trustedCert, byte[] nameConstraints).

Note that the name constraints byte array supplied here is cloned to
protect against subsequent modifications.

Parameters:

- `caPrincipal`: the name of the most-trusted CA as X500Principal
- `pubKey`: the public key of the most-trusted CA
- `nameConstraints`: a byte array containing the ASN.1 DER encoding of a NameConstraints extension to be used for checking name constraints. Only the value of the extension is included, not the OID or criticality flag. Specify `null` to omit the parameter.

**Since:** 1.5

Throws:

- `NullPointerException`: if the specified `caPrincipal` or `pubKey` parameter is `null`

## TrustAnchor.TrustAnchor(String, PublicKey, byte[])

```java
public TrustAnchor(String caName, PublicKey <example-value>, byte[] nameConstraints)
```

Creates an instance of `TrustAnchor` where the
most-trusted CA is specified as a distinguished name and public key.
Name constraints are an optional parameter, and are intended to be used
as additional constraints when validating an X.509 certification path.

The name constraints are specified as a byte array. This byte array
contains the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in RFC 5280
and X.509. The ASN.1 notation for this structure is supplied in the
documentation for
byte[]) TrustAnchor(X509Certificate trustedCert, byte[] nameConstraints).

Note that the name constraints byte array supplied here is cloned to
protect against subsequent modifications.

Parameters:

- `caName`: the X.500 distinguished name of the most-trusted CA in RFC 2253 `String` format
- `pubKey`: the public key of the most-trusted CA
- `nameConstraints`: a byte array containing the ASN.1 DER encoding of a NameConstraints extension to be used for checking name constraints. Only the value of the extension is included, not the OID or criticality flag. Specify `null` to omit the parameter.

Throws:

- `IllegalArgumentException`: if the specified `caName` parameter is empty `(caName.length() == 0)` or incorrectly formatted or the name constraints cannot be decoded
- `NullPointerException`: if the specified `caName` or `pubKey` parameter is `null`

## TrustAnchor.getTrustedCert()

```java
public final X509Certificate getTrustedCert()
```

Returns the most-trusted CA certificate.

**Returns:** a trusted `X509Certificate` or `null`
if the trust anchor was not specified as a trusted certificate

## TrustAnchor.getCA()

```java
public final X500Principal getCA()
```

Returns the name of the most-trusted CA as an X500Principal.

**Returns:** the X.500 distinguished name of the most-trusted CA, or
`null` if the trust anchor was not specified as a trusted
public key and name or X500Principal pair

**Since:** 1.5

## TrustAnchor.getCAName()

```java
public final String getCAName()
```

Returns the name of the most-trusted CA in RFC 2253 `String`
format.

**Returns:** the X.500 distinguished name of the most-trusted CA, or
`null` if the trust anchor was not specified as a trusted
public key and name or X500Principal pair

## TrustAnchor.getCAPublicKey()

```java
public final PublicKey getCAPublicKey()
```

Returns the public key of the most-trusted CA.

**Returns:** the public key of the most-trusted CA, or `null`
if the trust anchor was not specified as a trusted public key and name
or X500Principal pair

## TrustAnchor.getNameConstraints()

```java
public final byte [] getNameConstraints()
```

Returns the name constraints parameter. The specified name constraints
are associated with this trust anchor and are intended to be used
as additional constraints when validating an X.509 certification path.

The name constraints are returned as a byte array. This byte array
contains the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in RFC 5280
and X.509. The ASN.1 notation for this structure is supplied in the
documentation for
byte[]) TrustAnchor(X509Certificate trustedCert, byte[] nameConstraints).

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** a byte array containing the ASN.1 DER encoding of
        a NameConstraints extension used for checking name constraints,
        or `null` if not set.

## TrustAnchor.toString()

```java
public String toString()
```

Returns a formatted string describing the `TrustAnchor`.

**Returns:** a formatted string describing the `TrustAnchor`
