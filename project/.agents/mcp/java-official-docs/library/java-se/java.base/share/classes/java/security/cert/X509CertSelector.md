---
title: "X509CertSelector class (java.security.cert) (part 1 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CertSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CertSelector class (java.security.cert)

```java
public class X509CertSelector implements CertSelector
```

A `CertSelector` that selects `X509Certificates` that
match all specified criteria. This class is particularly useful when
selecting certificates from a `CertStore` to build a
PKIX-compliant certification path.

When first constructed, an `X509CertSelector` has no criteria
enabled and each of the `get` methods return a default value
(`null`, or `-1` for the getBasicConstraints method). Therefore, the match
method would return `true` for any `X509Certificate`.
Typically, several criteria are enabled (by calling
`setIssuer(X500Principal)` or
setKeyUsage, for instance) and then the
`X509CertSelector` is passed to
CertStore.getCertificates or some similar
method.

Several criteria can be enabled (by calling
`setIssuer(X500Principal)`
and setSerialNumber,
for example) such that the `match` method
usually uniquely matches a single `X509Certificate`. We say
usually, since it is possible for two issuing CAs to have the same
distinguished name and each issue a certificate with the same serial
number. Other unique combinations include the issuer, subject,
subjectKeyIdentifier and/or the subjectPublicKey criteria.

Please refer to RFC 5280:
Internet X.509 Public Key <example-value> Certificate and CRL Profile for
definitions of the X.509 certificate extensions mentioned below.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertSelector

**See also:** X509Certificate

**Since:** 1.4

## X509CertSelector.X509CertSelector()

```java
public X509CertSelector()
```

Creates an `X509CertSelector`. Initially, no criteria are set
so any `X509Certificate` will match.

## X509CertSelector.setCertificate(X509Certificate)

```java
public void setCertificate(X509Certificate cert)
```

Sets the certificateEquals criterion. The specified
`X509Certificate` must be equal to the
`X509Certificate` passed to the `match` method.
If `null`, then this check is not applied.

This method is particularly useful when it is necessary to
match a single certificate. Although other criteria can be specified
in conjunction with the certificateEquals criterion, it is usually not
practical or necessary.

Parameters:

- `cert`: the `X509Certificate` to match (or `null`)

**See also:** #getCertificate

## X509CertSelector.setSerialNumber(BigInteger)

```java
public void setSerialNumber(BigInteger serial)
```

Sets the serialNumber criterion. The specified serial number
must match the certificate serial number in the
`X509Certificate`. If `null`, any certificate
serial number will do.

Parameters:

- `serial`: the certificate serial number to match (or `null`)

**See also:** #getSerialNumber

## X509CertSelector.setIssuer(X500Principal)

```java
public void setIssuer(X500Principal issuer)
```

Sets the issuer criterion. The specified distinguished name
must match the issuer distinguished name in the
`X509Certificate`. If `null`, any issuer
distinguished name will do.

Parameters:

- `issuer`: a distinguished name as X500Principal (or `null`)

**Since:** 1.5

## X509CertSelector.setIssuer(String)

```java
public void setIssuer(String issuerDN) throws IOException
```

Sets the issuer criterion. The specified distinguished name
must match the issuer distinguished name in the
`X509Certificate`. If `null`, any issuer
distinguished name will do.

If `issuerDN` is not `null`, it should contain a
distinguished name, in
RFC 2253 format.

Parameters:

- `issuerDN`: a distinguished name in RFC 2253 format (or `null`)

**Deprecated:** Use `setIssuer(X500Principal)` or
`setIssuer(byte[])` instead. This method should not be relied on
as it can fail to match some certificates because of a loss of encoding
information in the RFC 2253 String form of some distinguished names.

Throws:

- `IOException`: if a parsing error occurs (incorrect form for DN)

## X509CertSelector.setIssuer(byte[])

```java
public void setIssuer(byte[] issuerDN) throws IOException
```

Sets the issuer criterion. The specified distinguished name
must match the issuer distinguished name in the
`X509Certificate`. If `null` is specified,
the issuer criterion is disabled and any issuer distinguished name will
do.

If `issuerDN` is not `null`, it should contain a
single DER encoded distinguished name, as defined in X.501. The ASN.1
notation for this structure is as follows.

```java
Name ::= CHOICE {
  RDNSequence }

RDNSequence ::= SEQUENCE OF RelativeDistinguishedName

RelativeDistinguishedName ::=
  SET SIZE (1 .. MAX) OF AttributeTypeAndValue

AttributeTypeAndValue ::= SEQUENCE {
  type     AttributeType,
  value    AttributeValue }

AttributeType ::= OBJECT IDENTIFIER

AttributeValue ::= ANY DEFINED BY AttributeType
....
DirectoryString ::= CHOICE {
      teletexString           TeletexString (SIZE (1..MAX)),
      printableString         PrintableString (SIZE (1..MAX)),
      universalString         UniversalString (SIZE (1..MAX)),
      utf8String              UTF8String (SIZE (1.. MAX)),
      bmpString               BMPString (SIZE (1..MAX)) }
```

Note that the byte array specified here is cloned to protect against
subsequent modifications.

Parameters:

- `issuerDN`: a byte array containing the distinguished name in ASN.1 DER encoded form (or `null`)

Throws:

- `IOException`: if an encoding error occurs (incorrect form for DN)

## X509CertSelector.setSubject(X500Principal)

```java
public void setSubject(X500Principal subject)
```

Sets the subject criterion. The specified distinguished name
must match the subject distinguished name in the
`X509Certificate`. If `null`, any subject
distinguished name will do.

Parameters:

- `subject`: a distinguished name as X500Principal (or `null`)

**Since:** 1.5

## X509CertSelector.setSubject(String)

```java
public void setSubject(String subjectDN) throws IOException
```

Sets the subject criterion. The specified distinguished name
must match the subject distinguished name in the
`X509Certificate`. If `null`, any subject
distinguished name will do.

If `subjectDN` is not `null`, it should contain a
distinguished name, in
RFC 2253 format.

Parameters:

- `subjectDN`: a distinguished name in RFC 2253 format (or `null`)

**Deprecated:** Use `setSubject(X500Principal)` or
`setSubject(byte[])` instead. This method should not be relied
on as it can fail to match some certificates because of a loss of
encoding information in the RFC 2253 String form of some distinguished
names.

Throws:

- `IOException`: if a parsing error occurs (incorrect form for DN)

## X509CertSelector.setSubject(byte[])

```java
public void setSubject(byte[] subjectDN) throws IOException
```

Sets the subject criterion. The specified distinguished name
must match the subject distinguished name in the
`X509Certificate`. If `null`, any subject
distinguished name will do.

If `subjectDN` is not `null`, it should contain a
single DER encoded distinguished name, as defined in X.501. For the ASN.1
notation for this structure, see `setIssuer(byte[])`.

Parameters:

- `subjectDN`: a byte array containing the distinguished name in ASN.1 DER format (or `null`)

Throws:

- `IOException`: if an encoding error occurs (incorrect form for DN)

## X509CertSelector.setSubjectKeyIdentifier(byte[])

```java
public void setSubjectKeyIdentifier(byte[] subjectKeyID)
```

Sets the subjectKeyIdentifier criterion. The
`X509Certificate` must contain a SubjectKeyIdentifier
extension for which the contents of the extension
matches the specified criterion value.
If the criterion value is `null`, no
subjectKeyIdentifier check will be done.

If `subjectKeyID` is not `null`, it
should contain a single DER encoded value corresponding to the contents
of the extension value (not including the object identifier,
criticality setting, and encapsulating OCTET STRING)
for a SubjectKeyIdentifier extension.
The ASN.1 notation for this structure follows.

```java
SubjectKeyIdentifier ::= KeyIdentifier

KeyIdentifier ::= OCTET STRING
```

Since the format of subject key <example-value> is not mandated by
any standard, subject key <example-value> are not parsed by the
`X509CertSelector`. Instead, the values are compared using
a byte-by-byte comparison.

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `subjectKeyID`: the subject key <example-value> (or `null`)

**See also:** #getSubjectKeyIdentifier

## X509CertSelector.setAuthorityKeyIdentifier(byte[])

```java
public void setAuthorityKeyIdentifier(byte[] authorityKeyID)
```

Sets the authorityKeyIdentifier criterion. The
`X509Certificate` must contain an
AuthorityKeyIdentifier extension for which the contents of the
extension value matches the specified criterion value.
If the criterion value is `null`, no
authorityKeyIdentifier check will be done.

If `authorityKeyID` is not `null`, it
should contain a single DER encoded value corresponding to the contents
of the extension value (not including the object identifier,
criticality setting, and encapsulating OCTET STRING)
for an AuthorityKeyIdentifier extension.
The ASN.1 notation for this structure follows.

```java
AuthorityKeyIdentifier ::= SEQUENCE {
   keyIdentifier             [0] KeyIdentifier           OPTIONAL,
   authorityCertIssuer       [1] GeneralNames            OPTIONAL,
   authorityCertSerialNumber [2] CertificateSerialNumber OPTIONAL  }

KeyIdentifier ::= OCTET STRING
```

Authority key <example-value> are not parsed by the
`X509CertSelector`.  Instead, the values are
compared using a byte-by-byte comparison.

When the `keyIdentifier` field of
`AuthorityKeyIdentifier` is populated, the value is
usually taken from the `SubjectKeyIdentifier` extension
in the issuer's certificate.  Note, however, that the result of
`X509Certificate.getExtensionValue(<SubjectKeyIdentifier Object Identifier>)` on the issuer's certificate may NOT be used
directly as the input to `setAuthorityKeyIdentifier`.
This is because the SubjectKeyIdentifier contains
only a KeyIdentifier OCTET STRING, and not a SEQUENCE of
KeyIdentifier, GeneralNames, and CertificateSerialNumber.
In order to use the extension value of the issuer certificate's
`SubjectKeyIdentifier`
extension, it will be necessary to extract the value of the embedded
`KeyIdentifier` OCTET STRING, then DER encode this OCTET
STRING inside a SEQUENCE.
For more details on SubjectKeyIdentifier, see
subjectKeyID).

Note also that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `authorityKeyID`: the authority key <example-value> (or `null`)

**See also:** #getAuthorityKeyIdentifier

## X509CertSelector.setCertificateValid(Date)

```java
public void setCertificateValid(Date certValid)
```

Sets the certificateValid criterion. The specified date must fall
within the certificate validity period for the
`X509Certificate`. If `null`, no certificateValid
check will be done.

Note that the `Date` supplied here is cloned to protect
against subsequent modifications.

Parameters:

- `certValid`: the `Date` to check (or `null`)

**See also:** #getCertificateValid

## X509CertSelector.setPrivateKeyValid(Date)

```java
public void setPrivateKeyValid(Date privateKeyValid)
```

Sets the privateKeyValid criterion. The specified date must fall
within the private key <example-value> period for the
`X509Certificate`. If `null`, no privateKeyValid
check will be done.

Note that the `Date` supplied here is cloned to protect
against subsequent modifications.

Parameters:

- `privateKeyValid`: the `Date` to check (or `null`)

**See also:** #getPrivateKeyValid

## X509CertSelector.setSubjectPublicKeyAlgID(String)

```java
public void setSubjectPublicKeyAlgID(String oid) throws IOException
```

Sets the subjectPublicKeyAlgID criterion. The
`X509Certificate` must contain a subject public key
with the specified algorithm. If `null`, no
subjectPublicKeyAlgID check will be done.

Parameters:

- `oid`: The object identifier (OID) of the algorithm to check for (or `null`). An OID is represented by a set of nonnegative integers separated by periods.

**See also:** #getSubjectPublicKeyAlgID

Throws:

- `IOException`: if the OID is invalid, such as the first component being not 0, 1 or 2 or the second component being greater than 39.

## X509CertSelector.setSubjectPublicKey(PublicKey)

```java
public void setSubjectPublicKey(PublicKey key)
```

Sets the subjectPublicKey criterion. The
`X509Certificate` must contain the specified subject public
key. If `null`, no subjectPublicKey check will be done.

Parameters:

- `key`: the subject public key to check for (or `null`)

**See also:** #getSubjectPublicKey

## X509CertSelector.setSubjectPublicKey(byte[])

```java
public void setSubjectPublicKey(byte[] key) throws IOException
```

Sets the subjectPublicKey criterion. The `X509Certificate`
must contain the specified subject public key. If `null`,
no subjectPublicKey check will be done.

Because this method allows the public key to be specified as a byte
array, it may be used for unknown key types.

If `key` is not `null`, it should contain a
single DER encoded SubjectPublicKeyInfo structure, as defined in X.509.
The ASN.1 notation for this structure is as follows.

```java
SubjectPublicKeyInfo  ::=  SEQUENCE  {
  algorithm            AlgorithmIdentifier,
  subjectPublicKey     BIT STRING  }

AlgorithmIdentifier  ::=  SEQUENCE  {
  algorithm               OBJECT IDENTIFIER,
  parameters              ANY DEFINED BY algorithm OPTIONAL  }
                             -- contains a value of the type
                             -- registered for use with the
                             -- algorithm object identifier value
```

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `key`: a byte array containing the subject public key in ASN.1 DER form (or `null`)

**See also:** #getSubjectPublicKey

Throws:

- `IOException`: if an encoding error occurs (incorrect form for subject public key)

## X509CertSelector.setKeyUsage(boolean[])

```java
public void setKeyUsage(boolean[] keyUsage)
```

Sets the keyUsage criterion. The `X509Certificate`
must allow the specified keyUsage values. If `null`, no
keyUsage check will be done. Note that an `X509Certificate`
that has no keyUsage extension implicitly allows all keyUsage values.

Note that the boolean array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `keyUsage`: a boolean array in the same format as the boolean array returned by X509Certificate.getKeyUsage(). Or `null`.

**See also:** #getKeyUsage
