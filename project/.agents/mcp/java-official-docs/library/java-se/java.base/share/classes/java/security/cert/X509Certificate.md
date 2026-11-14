---
title: "X509Certificate class (java.security.cert) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509Certificate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509Certificate class (java.security.cert)

```java
public abstract non-sealed class X509Certificate extends Certificate implements X509Extension, DEREncodable
```

Abstract class for X.509 certificates. This provides a standard
way to access all the attributes of an X.509 certificate.

In June of 1996, the basic X.509 v3 format was completed by
ISO/IEC and ANSI X9, which is described below in ASN.1:

```java
Certificate  ::=  SEQUENCE  {
    tbsCertificate       TBSCertificate,
    signatureAlgorithm   AlgorithmIdentifier,
    signature            BIT STRING
```

These certificates are widely used to support authentication and
other functionality in Internet security systems. Common applications
include Privacy Enhanced Mail (PEM), Transport Layer Security (SSL),
code signing for trusted software distribution, and Secure Electronic
Transactions (SET).

These certificates are managed and vouched for by *Certificate
Authorities* (CAs). CAs are services which create certificates by
placing data in the X.509 standard format and then digitally signing
that data. CAs act as trusted third parties, making introductions
between principals who have no direct knowledge of each other.
CA certificates are either signed by themselves, or by some other
CA such as a "root" CA.

More information can be found in
RFC 5280: Internet X.509
Public Key <example-value> Certificate and CRL Profile.

The ASN.1 definition of `tbsCertificate` is:

```java
TBSCertificate  ::=  SEQUENCE  {
    version         [0]  EXPLICIT Version DEFAULT v1,
    serialNumber         CertificateSerialNumber,
    signature            AlgorithmIdentifier,
    issuer               Name,
    validity             Validity,
    subject              Name,
    subjectPublicKeyInfo SubjectPublicKeyInfo,
    issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
                         -- If present, version must be v2 or v3
    subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
                         -- If present, version must be v2 or v3
    extensions      [3]  EXPLICIT Extensions OPTIONAL
                         -- If present, version must be v3
```

Certificates are instantiated using a certificate factory. The following is
an example of how to instantiate an X.509 certificate:

```java
try (InputStream inStream = new FileInputStream("fileName-of-cert")) {
    CertificateFactory cf = CertificateFactory.getInstance("X.509");
    X509Certificate cert = (X509Certificate)cf.generateCertificate(inStream);
```

**Since:** 1.2

**See also:** Certificate

**See also:** CertificateFactory

**See also:** X509Extension

## X509Certificate.X509Certificate()

```java
protected X509Certificate()
```

Constructor for X.509 certificates.

## X509Certificate.checkValidity()

```java
public abstract void checkValidity() throws CertificateExpiredException, CertificateNotYetValidException
```

Checks that the certificate is currently valid. It is if
the current date and time are within the validity period given in the
certificate.

The validity period consists of two date/time values:
the first and last dates (and times) on which the certificate
is valid. It is defined in
ASN.1 as:

```java
validity             Validity

Validity ::= SEQUENCE {
    notBefore      CertificateValidityDate,
    notAfter       CertificateValidityDate }

CertificateValidityDate ::= CHOICE {
    utcTime        UTCTime,
    generalTime    GeneralizedTime
```

Throws:

- `CertificateExpiredException`: if the certificate has expired.
- `CertificateNotYetValidException`: if the certificate is not yet valid.

## X509Certificate.checkValidity(Date)

```java
public abstract void checkValidity(Date date) throws CertificateExpiredException, CertificateNotYetValidException
```

Checks that the given date is within the certificate's
validity period. In other words, this determines whether the
certificate would be valid at the given date/time.

Parameters:

- `date`: the Date to check against to see if this certificate is valid at that date/time.

**See also:** #checkValidity()

Throws:

- `CertificateExpiredException`: if the certificate has expired with respect to the `date` supplied.
- `CertificateNotYetValidException`: if the certificate is not yet valid with respect to the `date` supplied.

## X509Certificate.getVersion()

```java
public abstract int getVersion()
```

Gets the `version` (version number) value from the
certificate.
The ASN.1 definition for this is:

```java
version  [0] EXPLICIT Version DEFAULT v1

Version ::=  INTEGER  {  v1(0), v2(1), v3(2)
```

**Returns:** the version number, i.e. 1, 2 or 3.

## X509Certificate.getSerialNumber()

```java
public abstract BigInteger getSerialNumber()
```

Gets the `serialNumber` value from the certificate.
The serial number is an integer assigned by the certification
authority to each certificate. It must be unique for each
certificate issued by a given CA (i.e., the issuer name and
serial number identify a unique certificate).
The ASN.1 definition for this is:

```java
serialNumber     CertificateSerialNumber

CertificateSerialNumber  ::=  INTEGER
```

**Returns:** the serial number.

## X509Certificate.getIssuerDN()

```java
public abstract Principal getIssuerDN()
```

Gets the `issuer` (issuer distinguished name) value from
the certificate. The issuer name identifies the entity that signed (and
issued) the certificate.

The issuer name field contains an
X.500 distinguished name (DN).
The ASN.1 definition for this is:

```java
issuer    Name

Name ::= CHOICE { RDNSequence }
RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
RelativeDistinguishedName ::=
    SET OF AttributeValueAssertion

AttributeValueAssertion ::= SEQUENCE {
                              AttributeType,
                              AttributeValue }
AttributeType ::= OBJECT IDENTIFIER
AttributeValue ::= ANY
```

The `Name` describes a hierarchical name composed of
attributes,
such as country name, and corresponding values, such as US.
The type of the `AttributeValue` component is determined by
the `AttributeType`; in general it will be a
`directoryString`. A `directoryString` is usually
one of `PrintableString`,
`TeletexString` or `UniversalString`.

**Returns:** a Principal whose name is the issuer distinguished name.

**Deprecated:** Use `getIssuerX500Principal` instead. This method
returns the `issuer` as an implementation specific
`Principal` object, which should not be relied upon by portable
code.

## X509Certificate.getIssuerX500Principal()

```java
public X500Principal getIssuerX500Principal()
```

Returns the issuer (issuer distinguished name) value from the
certificate as an `X500Principal`.

It is recommended that subclasses override this method.

**Returns:** an `X500Principal` representing the issuer
         distinguished name

**Since:** 1.4

## X509Certificate.getSubjectDN()

```java
public abstract Principal getSubjectDN()
```

Gets the `subject` (subject distinguished name) value
from the certificate.  If the `subject` value is empty,
then the `getName()` method of the returned
`Principal` object returns an empty string ("").

 The ASN.1 definition for this is:

```java
subject    Name
```

See getIssuerDN for `Name`
and other relevant definitions.

**Returns:** a Principal whose name is the subject name.

**Deprecated:** Use `getSubjectX500Principal` instead. This method
returns the `subject` as an implementation specific
`Principal` object, which should not be relied upon by portable
code.

## X509Certificate.getSubjectX500Principal()

```java
public X500Principal getSubjectX500Principal()
```

Returns the subject (subject distinguished name) value from the
certificate as an `X500Principal`.  If the subject value
is empty, then the `getName()` method of the returned
`X500Principal` object returns an empty string ("").

It is recommended that subclasses override this method.

**Returns:** an `X500Principal` representing the subject
         distinguished name

**Since:** 1.4

## X509Certificate.getNotBefore()

```java
public abstract Date getNotBefore()
```

Gets the `notBefore` date from the validity period of
the certificate.
The relevant ASN.1 definitions are:

```java
validity             Validity

Validity ::= SEQUENCE {
    notBefore      CertificateValidityDate,
    notAfter       CertificateValidityDate }

CertificateValidityDate ::= CHOICE {
    utcTime        UTCTime,
    generalTime    GeneralizedTime
```

**Returns:** the start date of the validity period.

**See also:** #checkValidity

## X509Certificate.getNotAfter()

```java
public abstract Date getNotAfter()
```

Gets the `notAfter` date from the validity period of
the certificate. See getNotBefore
for relevant ASN.1 definitions.

**Returns:** the end date of the validity period.

**See also:** #checkValidity

## X509Certificate.getTBSCertificate()

```java
public abstract byte[] getTBSCertificate() throws CertificateEncodingException
```

Gets the DER-encoded certificate information, the
`tbsCertificate` from this certificate.
This can be used to verify the signature independently.

**Returns:** the DER-encoded certificate information.

Throws:

- `CertificateEncodingException`: if an encoding error occurs.

## X509Certificate.getSignature()

```java
public abstract byte[] getSignature()
```

Gets the `signature` value (the raw signature bits) from
the certificate.
The ASN.1 definition for this is:

```java
signature     BIT STRING
```

**Returns:** the signature.

## X509Certificate.getSigAlgName()

```java
public abstract String getSigAlgName()
```

Gets the signature algorithm name for the certificate
signature algorithm. An example is the string "SHA256withRSA".
The ASN.1 definition for this is:

```java
signatureAlgorithm   AlgorithmIdentifier

AlgorithmIdentifier  ::=  SEQUENCE  {
    algorithm               OBJECT IDENTIFIER,
    parameters              ANY DEFINED BY algorithm OPTIONAL  }
                            -- contains a value of the type
                            -- registered for use with the
                            -- algorithm object identifier value
```

The algorithm name is determined from the `algorithm`
OID string.

**Returns:** the signature algorithm name.

## X509Certificate.getSigAlgOID()

```java
public abstract String getSigAlgOID()
```

Gets the signature algorithm OID string from the certificate.
An OID is represented by a set of nonnegative whole numbers separated
by periods.
For example, the string "1.2.840.10040.4.3" identifies the SHA-1
with DSA signature algorithm defined in
RFC 3279: Algorithms and
Identifiers for the Internet X.509 Public Key <example-value> Certificate
and CRL Profile.

See getSigAlgName for
relevant ASN.1 definitions.

**Returns:** the signature algorithm OID string.

## X509Certificate.getSigAlgParams()

```java
public abstract byte[] getSigAlgParams()
```

Gets the DER-encoded signature algorithm parameters from this
certificate's signature algorithm. In most cases, the signature
algorithm parameters are null; the parameters are usually
supplied with the certificate's public key.
If access to individual parameter values is needed then use
AlgorithmParameters
and instantiate with the name returned by
getSigAlgName.

See getSigAlgName for
relevant ASN.1 definitions.

**Returns:** the DER-encoded signature algorithm parameters, or
        null if no parameters are present.

## X509Certificate.getIssuerUniqueID()

```java
public abstract boolean[] getIssuerUniqueID()
```

Gets the `issuerUniqueID` value from the certificate.
The issuer unique identifier is present in the certificate
to handle the possibility of reuse of issuer names over time.
RFC 5280 recommends that names not be reused and that
conforming certificates not make use of unique identifiers.
Applications conforming to that profile should be capable of
parsing unique identifiers and making comparisons.

The ASN.1 definition for this is:

```java
issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL

UniqueIdentifier  ::=  BIT STRING
```

**Returns:** the issuer unique identifier or null if it is not
present in the certificate.

## X509Certificate.getSubjectUniqueID()

```java
public abstract boolean[] getSubjectUniqueID()
```

Gets the `subjectUniqueID` value from the certificate.

The ASN.1 definition for this is:

```java
subjectUniqueID  [2]  IMPLICIT UniqueIdentifier OPTIONAL

UniqueIdentifier  ::=  BIT STRING
```

**Returns:** the subject unique identifier or null if it is not
present in the certificate.

## X509Certificate.getKeyUsage()

```java
public abstract boolean[] getKeyUsage()
```

Gets a boolean array representing bits of
the `KeyUsage` extension, (OID = 2.5.29.15).
The key usage extension defines the purpose (e.g., encipherment,
signature, certificate signing) of the key <example-value> in the
certificate.
The ASN.1 definition for this is:

```java
KeyUsage ::= BIT STRING {
    digitalSignature        (0),
    nonRepudiation          (1),
    keyEncipherment         (2),
    dataEncipherment        (3),
    keyAgreement            (4),
    keyCertSign             (5),
    cRLSign                 (6),
    encipherOnly            (7),
    decipherOnly            (8)
```

RFC 5280 recommends that when used, this be marked
as a critical extension.

**Returns:** the KeyUsage extension of this certificate, represented as
an array of booleans. The order of KeyUsage values in the array is
the same as in the above ASN.1 definition. The array will contain a
value for each KeyUsage defined above. If the KeyUsage list encoded
in the certificate is longer than the above list, it will not be
truncated. Returns null if this certificate does not
contain a KeyUsage extension.
