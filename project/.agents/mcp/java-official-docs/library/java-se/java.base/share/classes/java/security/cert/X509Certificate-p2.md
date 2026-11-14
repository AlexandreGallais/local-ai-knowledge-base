---
title: "X509Certificate class (java.security.cert) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509Certificate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509Certificate class (java.security.cert) (part 2 of 2)

## X509Certificate.getExtendedKeyUsage()

```java
public List<String> getExtendedKeyUsage() throws CertificateParsingException
```

Gets an unmodifiable list of Strings representing the OBJECT
IDENTIFIERs of the `ExtKeyUsageSyntax` field of the
extended key usage extension, (OID = 2.5.29.37).  It indicates
one or more purposes for which the certified public key may be
used, in addition to or in place of the basic <example-value>
indicated in the key usage extension field.  The ASN.1
definition for this is:

```java
ExtKeyUsageSyntax ::= SEQUENCE SIZE (1..MAX) OF KeyPurposeId

KeyPurposeId ::= OBJECT IDENTIFIER
```

Key <example-value> may be defined by any organization with a
need. Object identifiers used to identify key <example-value> shall be
assigned in accordance with IANA or ITU-T Rec. X.660 |
ISO/IEC/ITU 9834-1.

This method was added to version 1.4 of the Java 2 Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method is not `abstract`
and it provides a default implementation. Subclasses
should override this method with a correct implementation.

**Returns:** the ExtendedKeyUsage extension of this certificate,
        as an unmodifiable list of object identifiers represented
        as Strings. Returns null if this certificate does not
        contain an ExtendedKeyUsage extension.

**Since:** 1.4

Throws:

- `CertificateParsingException`: if the extension cannot be decoded

## X509Certificate.getBasicConstraints()

```java
public abstract int getBasicConstraints()
```

Gets the certificate constraints path length from the
critical `BasicConstraints` extension, (OID = 2.5.29.19).

The basic <example-value> extension identifies whether the subject
of the certificate is a Certificate Authority (CA) and
how deep a certification path may exist through that CA. The
`pathLenConstraint` field (see below) is meaningful
only if `cA` is set to TRUE. In this case, it gives the
maximum number of CA certificates that may follow this certificate in a
certification path. A value of zero indicates that only an end-entity
certificate may follow in the path.

The ASN.1 definition for this is:

```java
BasicConstraints ::= SEQUENCE {
    cA                  BOOLEAN DEFAULT FALSE,
    pathLenConstraint   INTEGER (0..MAX) OPTIONAL
```

**Returns:** the value of `pathLenConstraint` if the
BasicConstraints extension is present in the certificate and the
subject of the certificate is a CA, otherwise -1.
If the subject of the certificate is a CA and
`pathLenConstraint` does not appear,
`Integer.MAX_VALUE` is returned to indicate that there is no
limit to the allowed length of the certification path.

## X509Certificate.getSubjectAlternativeNames()

```java
public Collection<List<?>> getSubjectAlternativeNames() throws CertificateParsingException
```

Gets an immutable collection of subject alternative names from the
`SubjectAltName` extension, (OID = 2.5.29.17).

The ASN.1 definition of the `SubjectAltName` extension is:

```java
SubjectAltName ::= GeneralNames

GeneralNames :: = SEQUENCE SIZE (1..MAX) OF GeneralName

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

OtherName ::= SEQUENCE {
     type-id    OBJECT IDENTIFIER,
     value      [0] EXPLICIT ANY DEFINED BY type-id
```

If this certificate does not contain a `SubjectAltName`
extension, `null` is returned. Otherwise, a
`Collection` is returned with an entry representing each
`GeneralName` included in the extension. Each entry is a
`List` whose first entry is an `Integer`
(the name type, 0-8) and whose second entry is a `String`
or a byte array (the name, in string or ASN.1 DER encoded form,
respectively). More entries may exist depending on the name type.

RFC 822, DNS, and URI
names are returned as `String`s,
using the well-established string formats for those types (subject to
the restrictions included in RFC 5280). IPv4 address names are
returned using dotted quad notation. IPv6 address names are returned
in the form "a1:a2:...:a8", where a1-a8 are hexadecimal values
representing the eight 16-bit pieces of the address. OID names are
returned as `String`s represented as a series of nonnegative
integers separated by periods. Directory names (distinguished names)
are returned in
RFC 2253 string format. No standard string format is defined for
X.400 names or EDI party names. They are returned as byte arrays
containing the ASN.1 DER encoded form of the name. otherNames are also
returned as byte arrays containing the ASN.1 DER encoded form of the
name. A third entry may also be present in the list containing the
`type-id` of the otherName in string form, and a fourth entry
containing its `value` as either a string (if the value is
a valid supported character string) or a byte array containing the
ASN.1 DER encoded form of the value without the context-specific
constructed tag with number 0.

Note that the `Collection` returned may contain more
than one name of the same type. Also, note that the returned
`Collection` is immutable and any entries containing byte
arrays are cloned to protect against subsequent modifications.

This method was added to version 1.4 of the Java 2 Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method is not `abstract`
and it provides a default implementation. Subclasses
should override this method with a correct implementation.

**Implementation note:** The JDK SUN provider supports the third and fourth
otherName entries.

**Returns:** an immutable `Collection` of subject alternative
names (or `null`)

**Since:** 1.4

Throws:

- `CertificateParsingException`: if the extension cannot be decoded

## X509Certificate.getIssuerAlternativeNames()

```java
public Collection<List<?>> getIssuerAlternativeNames() throws CertificateParsingException
```

Gets an immutable collection of issuer alternative names from the
`IssuerAltName` extension, (OID = 2.5.29.18).

The ASN.1 definition of the `IssuerAltName` extension is:

```java
IssuerAltName ::= GeneralNames
```

The ASN.1 definition of `GeneralNames` is defined
in getSubjectAlternativeNames.

If this certificate does not contain an `IssuerAltName`
extension, `null` is returned. Otherwise, a
`Collection` is returned with an entry representing each
`GeneralName` included in the extension. Each entry is a
`List` whose first entry is an `Integer`
(the name type, 0-8) and whose second entry is a `String`
or a byte array (the name, in string or ASN.1 DER encoded form,
respectively).  More entries may exist depending on the name type.
For more details about the formats used for each
name type, see the `getSubjectAlternativeNames` method.

Note that the `Collection` returned may contain more
than one name of the same type. Also, note that the returned
`Collection` is immutable and any entries containing byte
arrays are cloned to protect against subsequent modifications.

This method was added to version 1.4 of the Java 2 Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method is not `abstract`
and it provides a default implementation. Subclasses
should override this method with a correct implementation.

**Returns:** an immutable `Collection` of issuer alternative
names (or `null`)

**Since:** 1.4

Throws:

- `CertificateParsingException`: if the extension cannot be decoded

## X509Certificate.verify(PublicKey, Provider)

```java
public void verify(PublicKey key, Provider sigProvider) throws CertificateException, NoSuchAlgorithmException, InvalidKeyException, SignatureException
```

Verifies that this certificate was signed using the
private key that corresponds to the specified public key.
This method uses the signature verification engine
supplied by the specified provider. Note that the specified
Provider object does not have to be registered in the provider list.

This method was added to version 1.8 of the Java Platform Standard
Edition. In order to maintain backwards compatibility with existing
service providers, this method is not `abstract`
and it provides a default implementation.

Parameters:

- `key`: the PublicKey used to carry out the verification.
- `sigProvider`: the signature provider.

**Since:** 1.8

Throws:

- `NoSuchAlgorithmException`: on unsupported signature algorithms.
- `InvalidKeyException`: on incorrect key.
- `SignatureException`: on signature errors.
- `CertificateException`: on encoding errors.
- `UnsupportedOperationException`: if the method is not supported
