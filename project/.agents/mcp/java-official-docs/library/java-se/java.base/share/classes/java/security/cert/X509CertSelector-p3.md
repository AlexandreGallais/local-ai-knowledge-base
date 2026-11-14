---
title: "X509CertSelector class (java.security.cert) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CertSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CertSelector class (java.security.cert) (part 3 of 4)

## X509CertSelector.addPathToName(int, byte [])

```java
public void addPathToName(int type, byte [] name) throws IOException
```

Adds a name to the pathToNames criterion. The `X509Certificate`
must not include name constraints that would prohibit building a
path to the specified name.

This method allows the caller to add a name to the set of names which
the `X509Certificates`'s name constraints must permit.
The specified name is added to any previous value for the
pathToNames criterion. If the name is a duplicate, it may be ignored.

The name is provided as a byte array. This byte array should contain
the DER encoded name, as it would appear in the GeneralName structure
defined in RFC 5280 and X.509. The ASN.1 definition of this structure
appears in the documentation for
type, byte [] name) addSubjectAlternativeName(int type, byte [] name).

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `type`: the name type (0-8, as specified in RFC 5280, section 4.2.1.6)
- `name`: a byte array containing the name in ASN.1 DER encoded form

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.getCertificate()

```java
public X509Certificate getCertificate()
```

Returns the certificateEquals criterion. The specified
`X509Certificate` must be equal to the
`X509Certificate` passed to the `match` method.
If `null`, this check is not applied.

**Returns:** the `X509Certificate` to match (or `null`)

**See also:** #setCertificate

## X509CertSelector.getSerialNumber()

```java
public BigInteger getSerialNumber()
```

Returns the serialNumber criterion. The specified serial number
must match the certificate serial number in the
`X509Certificate`. If `null`, any certificate
serial number will do.

**Returns:** the certificate serial number to match
               (or `null`)

**See also:** #setSerialNumber

## X509CertSelector.getIssuer()

```java
public X500Principal getIssuer()
```

Returns the issuer criterion as an `X500Principal`. This
distinguished name must match the issuer distinguished name in the
`X509Certificate`. If `null`, the issuer criterion
is disabled and any issuer distinguished name will do.

**Returns:** the required issuer distinguished name as X500Principal
        (or `null`)

**Since:** 1.5

## X509CertSelector.getIssuerAsString()

```java
public String getIssuerAsString()
```

Returns the issuer criterion as a `String`. This
distinguished name must match the issuer distinguished name in the
`X509Certificate`. If `null`, the issuer criterion
is disabled and any issuer distinguished name will do.

If the value returned is not `null`, it is a
distinguished name, in
RFC 2253 format.

**Returns:** the required issuer distinguished name in RFC 2253 format
        (or `null`)

**Deprecated:** Use `getIssuer()` or `getIssuerAsBytes()`
instead. This method should not be relied on as it can fail to match
some certificates because of a loss of encoding information in the
RFC 2253 String form of some distinguished names.

## X509CertSelector.getIssuerAsBytes()

```java
public byte[] getIssuerAsBytes() throws IOException
```

Returns the issuer criterion as a byte array. This distinguished name
must match the issuer distinguished name in the
`X509Certificate`. If `null`, the issuer criterion
is disabled and any issuer distinguished name will do.

If the value returned is not `null`, it is a byte
array containing a single DER encoded distinguished name, as defined in
X.501. The ASN.1 notation for this structure is supplied in the
documentation for `setIssuer(byte[])`.

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** a byte array containing the required issuer distinguished name
        in ASN.1 DER format (or `null`)

Throws:

- `IOException`: if an encoding error occurs

## X509CertSelector.getSubject()

```java
public X500Principal getSubject()
```

Returns the subject criterion as an `X500Principal`. This
distinguished name must match the subject distinguished name in the
`X509Certificate`. If `null`, the subject criterion
is disabled and any subject distinguished name will do.

**Returns:** the required subject distinguished name as X500Principal
        (or `null`)

**Since:** 1.5

## X509CertSelector.getSubjectAsString()

```java
public String getSubjectAsString()
```

Returns the subject criterion as a `String`. This
distinguished name must match the subject distinguished name in the
`X509Certificate`. If `null`, the subject criterion
is disabled and any subject distinguished name will do.

If the value returned is not `null`, it is a
distinguished name, in
RFC 2253 format.

**Returns:** the required subject distinguished name in RFC 2253 format
        (or `null`)

**Deprecated:** Use `getSubject()` or `getSubjectAsBytes()`
instead. This method should not be relied on as it can fail to match
some certificates because of a loss of encoding information in the
RFC 2253 String form of some distinguished names.

## X509CertSelector.getSubjectAsBytes()

```java
public byte[] getSubjectAsBytes() throws IOException
```

Returns the subject criterion as a byte array. This distinguished name
must match the subject distinguished name in the
`X509Certificate`. If `null`, the subject criterion
is disabled and any subject distinguished name will do.

If the value returned is not `null`, it is a byte
array containing a single DER encoded distinguished name, as defined in
X.501. The ASN.1 notation for this structure is supplied in the
documentation for `setSubject(byte[])`.

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** a byte array containing the required subject distinguished name
        in ASN.1 DER format (or `null`)

Throws:

- `IOException`: if an encoding error occurs

## X509CertSelector.getSubjectKeyIdentifier()

```java
public byte[] getSubjectKeyIdentifier()
```

Returns the subjectKeyIdentifier criterion. The
`X509Certificate` must contain a SubjectKeyIdentifier
extension with the specified value. If `null`, no
subjectKeyIdentifier check will be done.

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** the key <example-value> (or `null`)

**See also:** #setSubjectKeyIdentifier

## X509CertSelector.getAuthorityKeyIdentifier()

```java
public byte[] getAuthorityKeyIdentifier()
```

Returns the authorityKeyIdentifier criterion. The
`X509Certificate` must contain a AuthorityKeyIdentifier
extension with the specified value. If `null`, no
authorityKeyIdentifier check will be done.

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** the key <example-value> (or `null`)

**See also:** #setAuthorityKeyIdentifier

## X509CertSelector.getCertificateValid()

```java
public Date getCertificateValid()
```

Returns the certificateValid criterion. The specified date must fall
within the certificate validity period for the
`X509Certificate`. If `null`, no certificateValid
check will be done.

Note that the `Date` returned is cloned to protect against
subsequent modifications.

**Returns:** the `Date` to check (or `null`)

**See also:** #setCertificateValid

## X509CertSelector.getPrivateKeyValid()

```java
public Date getPrivateKeyValid()
```

Returns the privateKeyValid criterion. The specified date must fall
within the private key <example-value> period for the
`X509Certificate`. If `null`, no privateKeyValid
check will be done.

Note that the `Date` returned is cloned to protect against
subsequent modifications.

**Returns:** the `Date` to check (or `null`)

**See also:** #setPrivateKeyValid

## X509CertSelector.getSubjectPublicKeyAlgID()

```java
public String getSubjectPublicKeyAlgID()
```

Returns the subjectPublicKeyAlgID criterion. The
`X509Certificate` must contain a subject public key
with the specified algorithm. If `null`, no
subjectPublicKeyAlgID check will be done.

**Returns:** the object identifier (OID) of the signature algorithm to check
        for (or `null`). An OID is represented by a set of
        nonnegative integers separated by periods.

**See also:** #setSubjectPublicKeyAlgID

## X509CertSelector.getSubjectPublicKey()

```java
public PublicKey getSubjectPublicKey()
```

Returns the subjectPublicKey criterion. The
`X509Certificate` must contain the specified subject
public key. If `null`, no subjectPublicKey check will be done.

**Returns:** the subject public key to check for (or `null`)

**See also:** #setSubjectPublicKey

## X509CertSelector.getKeyUsage()

```java
public boolean[] getKeyUsage()
```

Returns the keyUsage criterion. The `X509Certificate`
must allow the specified keyUsage values. If null, no keyUsage
check will be done.

Note that the boolean array returned is cloned to protect against
subsequent modifications.

**Returns:** a boolean array in the same format as the boolean
                array returned by
X509Certificate.getKeyUsage().
                Or `null`.

**See also:** #setKeyUsage

## X509CertSelector.getExtendedKeyUsage()

```java
public Set<String> getExtendedKeyUsage()
```

Returns the extendedKeyUsage criterion. The `X509Certificate`
must allow the specified key <example-value> in its extended key usage
extension. If the `keyPurposeSet` returned is empty or
`null`, no extendedKeyUsage check will be done. Note that an
`X509Certificate` that has no extendedKeyUsage extension
implicitly allows all key purposes.

**Returns:** an immutable `Set` of key <example-value> OIDs in string
format (or `null`)

**See also:** #setExtendedKeyUsage

## X509CertSelector.getMatchAllSubjectAltNames()

```java
public boolean getMatchAllSubjectAltNames()
```

Indicates if the `X509Certificate` must contain all
or at least one of the subjectAlternativeNames
specified in the setSubjectAlternativeNames or addSubjectAlternativeName methods. If `true`,
the `X509Certificate` must contain all of the
specified subject alternative names. If `false`, the
`X509Certificate` must contain at least one of the
specified subject alternative names.

**Returns:** `true` if the flag is enabled;
`false` if the flag is disabled. The flag is
`true` by default.

**See also:** #setMatchAllSubjectAltNames

## X509CertSelector.getSubjectAlternativeNames()

```java
public Collection<List<?>> getSubjectAlternativeNames()
```

Returns a copy of the subjectAlternativeNames criterion.
The `X509Certificate` must contain all or at least one
of the specified subjectAlternativeNames, depending on the value
of the matchAllNames flag (see getMatchAllSubjectAltNames). If the value returned is
`null`, no subjectAlternativeNames check will be performed.

If the value returned is not `null`, it is a
`Collection` with
one entry for each name to be included in the subject alternative name
criterion. Each entry is a `List` whose first entry is an
`Integer` (the name type, 0-8) and whose second
entry is a `String` or a byte array (the name, in
string or ASN.1 DER encoded form, respectively).
There can be multiple names of the same type.  Note that the
`Collection` returned may contain duplicate names (same name
and name type).

Each subject alternative name in the `Collection`
may be specified either as a `String` or as an ASN.1 encoded
byte array. For more details about the formats used, see
type, String name) addSubjectAlternativeName(int type, String name) and
type, byte [] name) addSubjectAlternativeName(int type, byte [] name).

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

**Returns:** a `Collection` of names (or `null`)

**See also:** #setSubjectAlternativeNames

## X509CertSelector.getNameConstraints()

```java
public byte[] getNameConstraints()
```

Returns the name constraints criterion. The `X509Certificate`
must have subject and subject alternative names that
meet the specified name constraints.

The name constraints are returned as a byte array. This byte array
contains the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in RFC 5280
and X.509. The ASN.1 notation for this structure is supplied in the
documentation for
[] bytes) setNameConstraints(byte [] bytes).

Note that the byte array returned is cloned to protect against
subsequent modifications.

**Returns:** a byte array containing the ASN.1 DER encoding of
        a NameConstraints extension used for checking name constraints.
        `null` if no name constraints check will be performed.

**See also:** #setNameConstraints

## X509CertSelector.getBasicConstraints()

```java
public int getBasicConstraints()
```

Returns the basic <example-value> constraint. If the value is greater than
or equal to zero, the `X509Certificates` must include a
basicConstraints extension with a pathLen of at least this value.
If the value is -2, only end-entity certificates are accepted. If
the value is -1, no basicConstraints check is done.

**Returns:** the value for the basic <example-value> constraint

**See also:** #setBasicConstraints

## X509CertSelector.getPolicy()

```java
public Set<String> getPolicy()
```

Returns the policy criterion. The `X509Certificate` must
include at least one of the specified policies in its certificate policies
extension. If the `Set` returned is empty, then the
`X509Certificate` must include at least some specified policy
in its certificate policies extension. If the `Set` returned is
`null`, no policy check will be performed.

**Returns:** an immutable `Set` of certificate policy OIDs in
        string format (or `null`)

**See also:** #setPolicy

## X509CertSelector.getPathToNames()

```java
public Collection<List<?>> getPathToNames()
```

Returns a copy of the pathToNames criterion. The
`X509Certificate` must not include name constraints that would
prohibit building a path to the specified names. If the value
returned is `null`, no pathToNames check will be performed.

If the value returned is not `null`, it is a
`Collection` with one
entry for each name to be included in the pathToNames
criterion. Each entry is a `List` whose first entry is an
`Integer` (the name type, 0-8) and whose second
entry is a `String` or a byte array (the name, in
string or ASN.1 DER encoded form, respectively).
There can be multiple names of the same type. Note that the
`Collection` returned may contain duplicate names (same
name and name type).

Each name in the `Collection`
may be specified either as a `String` or as an ASN.1 encoded
byte array. For more details about the formats used, see
type, String name) addPathToName(int type, String name) and
type, byte [] name) addPathToName(int type, byte [] name).

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

**Returns:** a `Collection` of names (or `null`)

**See also:** #setPathToNames
