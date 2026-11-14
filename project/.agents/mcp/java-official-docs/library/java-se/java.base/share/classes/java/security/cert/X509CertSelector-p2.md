---
title: "X509CertSelector class (java.security.cert) (part 2 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CertSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CertSelector class (java.security.cert) (part 2 of 4)

## X509CertSelector.setExtendedKeyUsage(Set<String>)

```java
public void setExtendedKeyUsage(Set<String> keyPurposeSet) throws IOException
```

Sets the extendedKeyUsage criterion. The `X509Certificate`
must allow the specified key <example-value> in its extended key usage
extension. If `keyPurposeSet` is empty or `null`,
no extendedKeyUsage check will be done. Note that an
`X509Certificate` that has no extendedKeyUsage extension
implicitly allows all key purposes.

Note that the `Set` is cloned to protect against
subsequent modifications.

Parameters:

- `keyPurposeSet`: a `Set` of key <example-value> OIDs in string format (or `null`). Each OID is represented by a set of nonnegative integers separated by periods.

**See also:** #getExtendedKeyUsage

Throws:

- `IOException`: if the OID is invalid, such as the first component being not 0, 1 or 2 or the second component being greater than 39.

## X509CertSelector.setMatchAllSubjectAltNames(boolean)

```java
public void setMatchAllSubjectAltNames(boolean matchAllNames)
```

Enables/disables matching all of the subjectAlternativeNames
specified in the setSubjectAlternativeNames or addSubjectAlternativeName methods. If enabled,
the `X509Certificate` must contain all of the
specified subject alternative names. If disabled, the
`X509Certificate` must contain at least one of the
specified subject alternative names.

The matchAllNames flag is `true` by default.

Parameters:

- `matchAllNames`: if `true`, the flag is enabled; if `false`, the flag is disabled.

**See also:** #getMatchAllSubjectAltNames

## X509CertSelector.setSubjectAlternativeNames(Collection<List<?>>)

```java
public void setSubjectAlternativeNames(Collection<List<?>> names) throws IOException
```

Sets the subjectAlternativeNames criterion. The
`X509Certificate` must contain all or at least one of the
specified subjectAlternativeNames, depending on the value of
the matchAllNames flag (see setMatchAllSubjectAltNames).

This method allows the caller to specify, with a single method call,
the complete set of subject alternative names for the
subjectAlternativeNames criterion. The specified value replaces
the previous value for the subjectAlternativeNames criterion.

The `names` parameter (if not `null`) is a
`Collection` with one
entry for each name to be included in the subject alternative name
criterion. Each entry is a `List` whose first entry is an
`Integer` (the name type, 0-8) and whose second
entry is a `String` or a byte array (the name, in
string or ASN.1 DER encoded form, respectively).
There can be multiple names of the same type. If `null`
is supplied as the value for this argument, no
subjectAlternativeNames check will be performed.

Each subject alternative name in the `Collection`
may be specified either as a `String` or as an ASN.1 encoded
byte array. For more details about the formats used, see
type, String name) addSubjectAlternativeName(int type, String name) and
type, byte [] name) addSubjectAlternativeName(int type, byte [] name).

**Note:** for distinguished names, specify the byte
array form instead of the String form. See the note in
String) for more information.

Note that the `names` parameter can contain duplicate
names (same name and name type), but they may be removed from the
`Collection` of names returned by the
getSubjectAlternativeNames method.

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

Parameters:

- `names`: a `Collection` of names (or `null`)

**See also:** #getSubjectAlternativeNames

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.addSubjectAlternativeName(int, String)

```java
public void addSubjectAlternativeName(int type, String name) throws IOException
```

Adds a name to the subjectAlternativeNames criterion. The
`X509Certificate` must contain all or at least one
of the specified subjectAlternativeNames, depending on the value of
the matchAllNames flag (see setMatchAllSubjectAltNames).

This method allows the caller to add a name to the set of subject
alternative names.
The specified name is added to any previous value for the
subjectAlternativeNames criterion. If the specified name is a
duplicate, it may be ignored.

The name is provided in string format.
RFC 822, DNS, and URI
names use the well-established string formats for those types (subject to
the restrictions included in RFC 5280). IPv4 address names are
supplied using dotted quad notation. OID address names are represented
as a series of nonnegative integers separated by periods. And
directory names (distinguished names) are supplied in
RFC 2253 format.
No standard string format is defined for otherNames, X.400 names,
EDI party names, IPv6 address names, or any other type of names. They
should be specified using the
type, byte [] name) addSubjectAlternativeName(int type, byte [] name)
method.

**Note:** for distinguished names, use
byte[]) instead.
This method should not be relied on as it can fail to match some
certificates because of a loss of encoding information in the RFC 2253
String form of some distinguished names.

Parameters:

- `type`: the name type (0-8, as specified in RFC 5280, section 4.2.1.6)
- `name`: the name in string form (not `null`)

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.addSubjectAlternativeName(int, byte[])

```java
public void addSubjectAlternativeName(int type, byte[] name) throws IOException
```

Adds a name to the subjectAlternativeNames criterion. The
`X509Certificate` must contain all or at least one
of the specified subjectAlternativeNames, depending on the value of
the matchAllNames flag (see setMatchAllSubjectAltNames).

This method allows the caller to add a name to the set of subject
alternative names.
The specified name is added to any previous value for the
subjectAlternativeNames criterion. If the specified name is a
duplicate, it may be ignored.

The name is provided as a byte array. This byte array should contain
the DER encoded name, as it would appear in the GeneralName structure
defined in RFC 5280 and X.509. The encoded byte array should only contain
the encoded value of the name, and should not include the tag associated
with the name in the GeneralName structure. The ASN.1 definition of this
structure appears below.

```java
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

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `type`: the name type (0-8, as listed above)
- `name`: a byte array containing the name in ASN.1 DER encoded form

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.setNameConstraints(byte[])

```java
public void setNameConstraints(byte[] bytes) throws IOException
```

Sets the name constraints criterion. The `X509Certificate`
must have subject and subject alternative names that
meet the specified name constraints.

The name constraints are specified as a byte array. This byte array
should contain the DER encoded form of the name constraints, as they
would appear in the NameConstraints structure defined in RFC 5280
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

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `bytes`: a byte array containing the ASN.1 DER encoding of a NameConstraints extension to be used for checking name constraints. Only the value of the extension is included, not the OID or criticality flag. Can be `null`, in which case no name constraints check will be performed.

**See also:** #getNameConstraints

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.setBasicConstraints(int)

```java
public void setBasicConstraints(int minMaxPathLen)
```

Sets the basic <example-value> constraint. If the value is greater than or
equal to zero, `X509Certificates` must include a
basicConstraints extension with
a pathLen of at least this value. If the value is -2, only end-entity
certificates are accepted. If the value is -1, no check is done.

This constraint is useful when building a certification path forward
(from the target toward the trust anchor. If a partial path has been
built, any candidate certificate must have a maxPathLen value greater
than or equal to the number of certificates in the partial path.

Parameters:

- `minMaxPathLen`: the value for the basic <example-value> constraint

**See also:** #getBasicConstraints

Throws:

- `IllegalArgumentException`: if the value is less than -2

## X509CertSelector.setPolicy(Set<String>)

```java
public void setPolicy(Set<String> certPolicySet) throws IOException
```

Sets the policy constraint. The `X509Certificate` must
include at least one of the specified policies in its certificate
policies extension. If `certPolicySet` is empty, then the
`X509Certificate` must include at least some specified policy
in its certificate policies extension. If `certPolicySet` is
`null`, no policy check will be performed.

Note that the `Set` is cloned to protect against
subsequent modifications.

Parameters:

- `certPolicySet`: a `Set` of certificate policy OIDs in string format (or `null`). Each OID is represented by a set of nonnegative integers separated by periods.

**See also:** #getPolicy

Throws:

- `IOException`: if a parsing error occurs on the OID such as the first component is not 0, 1 or 2 or the second component is greater than 39.

## X509CertSelector.setPathToNames(Collection<List<?>>)

```java
public void setPathToNames(Collection<List<?>> names) throws IOException
```

Sets the pathToNames criterion. The `X509Certificate` must
not include name constraints that would prohibit building a
path to the specified names.

This method allows the caller to specify, with a single method call,
the complete set of names which the `X509Certificates`'s
name constraints must permit. The specified value replaces
the previous value for the pathToNames criterion.

This constraint is useful when building a certification path forward
(from the target toward the trust anchor. If a partial path has been
built, any candidate certificate must not include name constraints that
would prohibit building a path to any of the names in the partial path.

The `names` parameter (if not `null`) is a
`Collection` with one
entry for each name to be included in the pathToNames
criterion. Each entry is a `List` whose first entry is an
`Integer` (the name type, 0-8) and whose second
entry is a `String` or a byte array (the name, in
string or ASN.1 DER encoded form, respectively).
There can be multiple names of the same type. If `null`
is supplied as the value for this argument, no
pathToNames check will be performed.

Each name in the `Collection`
may be specified either as a `String` or as an ASN.1 encoded
byte array. For more details about the formats used, see
type, String name) addPathToName(int type, String name) and
type, byte [] name) addPathToName(int type, byte [] name).

**Note:** for distinguished names, specify the byte
array form instead of the String form. See the note in
String) for more information.

Note that the `names` parameter can contain duplicate
names (same name and name type), but they may be removed from the
`Collection` of names returned by the
getPathToNames method.

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

Parameters:

- `names`: a `Collection` with one entry per name (or `null`)

**See also:** #getPathToNames

Throws:

- `IOException`: if a parsing error occurs

## X509CertSelector.addPathToName(int, String)

```java
public void addPathToName(int type, String name) throws IOException
```

Adds a name to the pathToNames criterion. The `X509Certificate`
must not include name constraints that would prohibit building a
path to the specified name.

This method allows the caller to add a name to the set of names which
the `X509Certificates`'s name constraints must permit.
The specified name is added to any previous value for the
pathToNames criterion.  If the name is a duplicate, it may be ignored.

The name is provided in string format. RFC 822, DNS, and URI names
use the well-established string formats for those types (subject to
the restrictions included in RFC 5280). IPv4 address names are
supplied using dotted quad notation. OID address names are represented
as a series of nonnegative integers separated by periods. And
directory names (distinguished names) are supplied in RFC 2253 format.
No standard string format is defined for otherNames, X.400 names,
EDI party names, IPv6 address names, or any other type of names. They
should be specified using the
type, byte [] name) addPathToName(int type, byte [] name) method.

**Note:** for distinguished names, use
byte[]) instead.
This method should not be relied on as it can fail to match some
certificates because of a loss of encoding information in the RFC 2253
String form of some distinguished names.

Parameters:

- `type`: the name type (0-8, as specified in RFC 5280, section 4.2.1.6)
- `name`: the name in string form

Throws:

- `IOException`: if a parsing error occurs
