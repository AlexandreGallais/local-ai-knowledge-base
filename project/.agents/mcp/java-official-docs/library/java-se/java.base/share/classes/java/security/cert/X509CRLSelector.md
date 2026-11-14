---
title: "X509CRLSelector class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/X509CRLSelector.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509CRLSelector class (java.security.cert)

```java
public class X509CRLSelector implements CRLSelector
```

A `CRLSelector` that selects `X509CRLs` that
match all specified criteria. This class is particularly useful when
selecting CRLs from a `CertStore` to check revocation status
of a particular certificate.

When first constructed, an `X509CRLSelector` has no criteria
enabled and each of the `get` methods return a default
value (`null`). Therefore, the match method
would return `true` for any `X509CRL`. Typically,
several criteria are enabled (by calling setIssuers
or setDateAndTime, for instance) and then the
`X509CRLSelector` is passed to
CertStore.getCRLs or some similar
method.

Please refer to RFC 5280:
Internet X.509 Public Key <example-value> Certificate and CRL Profile
for definitions of the X.509 CRL fields and extensions mentioned below.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CRLSelector

**See also:** X509CRL

**Since:** 1.4

## X509CRLSelector.X509CRLSelector()

```java
public X509CRLSelector()
```

Creates an `X509CRLSelector`. Initially, no criteria are set
so any `X509CRL` will match.

## X509CRLSelector.setIssuers(Collection<X500Principal>)

```java
public void setIssuers(Collection<X500Principal> issuers)
```

Sets the issuerNames criterion. The issuer distinguished name in the
`X509CRL` must match at least one of the specified
distinguished names. If `null`, any issuer distinguished name
will do.

This method allows the caller to specify, with a single method call,
the complete set of issuer names which `X509CRLs` may contain.
The specified value replaces the previous value for the issuerNames
criterion.

The `names` parameter (if not `null`) is a
`Collection` of `X500Principal`s.

Note that the `names` parameter can contain duplicate
distinguished names, but they may be removed from the
`Collection` of names returned by the
getIssuers method.

Note that a copy is performed on the `Collection` to
protect against subsequent modifications.

Parameters:

- `issuers`: a `Collection` of X500Principals (or `null`)

**See also:** #getIssuers

**Since:** 1.5

## X509CRLSelector.setIssuerNames(Collection<?>)

```java
public void setIssuerNames(Collection<?> names) throws IOException
```

**Note:** use `setIssuers(Collection)` instead
or only specify the byte array form of distinguished names when using
this method. See `addIssuerName(String)` for more information.

Sets the issuerNames criterion. The issuer distinguished name in the
`X509CRL` must match at least one of the specified
distinguished names. If `null`, any issuer distinguished name
will do.

This method allows the caller to specify, with a single method call,
the complete set of issuer names which `X509CRLs` may contain.
The specified value replaces the previous value for the issuerNames
criterion.

The `names` parameter (if not `null`) is a
`Collection` of names. Each name is a `String`
or a byte array representing a distinguished name (in
RFC 2253 or
ASN.1 DER encoded form, respectively). If `null` is supplied
as the value for this argument, no issuerNames check will be performed.

Note that the `names` parameter can contain duplicate
distinguished names, but they may be removed from the
`Collection` of names returned by the
getIssuerNames method.

If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is as follows.

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

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

Parameters:

- `names`: a `Collection` of names (or `null`)

**See also:** #getIssuerNames

Throws:

- `IOException`: if a parsing error occurs

## X509CRLSelector.addIssuer(X500Principal)

```java
public void addIssuer(X500Principal issuer)
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the `X509CRL` must match at least one of the specified
distinguished names.

This method allows the caller to add a name to the set of issuer names
which `X509CRLs` may contain. The specified name is added to
any previous value for the issuerNames criterion.
If the specified name is a duplicate, it may be ignored.

Parameters:

- `issuer`: the issuer as X500Principal

**Since:** 1.5

## X509CRLSelector.addIssuerName(String)

```java
public void addIssuerName(String name) throws IOException
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the `X509CRL` must match at least one of the specified
distinguished names.

This method allows the caller to add a name to the set of issuer names
which `X509CRLs` may contain. The specified name is added to
any previous value for the issuerNames criterion.
If the specified name is a duplicate, it may be ignored.

Parameters:

- `name`: the name in RFC 2253 form

**Deprecated:** Use `addIssuer(X500Principal)` or
`addIssuerName(byte[])` instead. This method should not be
relied on as it can fail to match some CRLs because of a loss of
encoding information in the RFC 2253 String form of some distinguished
names.

Throws:

- `IOException`: if a parsing error occurs

## X509CRLSelector.addIssuerName(byte[])

```java
public void addIssuerName(byte[] name) throws IOException
```

Adds a name to the issuerNames criterion. The issuer distinguished
name in the `X509CRL` must match at least one of the specified
distinguished names.

This method allows the caller to add a name to the set of issuer names
which `X509CRLs` may contain. The specified name is added to
any previous value for the issuerNames criterion. If the specified name
is a duplicate, it may be ignored.
If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is as follows.

The name is provided as a byte array. This byte array should contain
a single DER encoded distinguished name, as defined in X.501. The ASN.1
notation for this structure appears in the documentation for
setIssuerNames(Collection names).

Note that the byte array supplied here is cloned to protect against
subsequent modifications.

Parameters:

- `name`: a byte array containing the name in ASN.1 DER encoded form

Throws:

- `IOException`: if a parsing error occurs

## X509CRLSelector.setMinCRLNumber(BigInteger)

```java
public void setMinCRLNumber(BigInteger minCRL)
```

Sets the minCRLNumber criterion. The `X509CRL` must have a
CRL number extension whose value is greater than or equal to the
specified value. If `null`, no minCRLNumber check will be
done.

Parameters:

- `minCRL`: the minimum CRL number accepted (or `null`)

## X509CRLSelector.setMaxCRLNumber(BigInteger)

```java
public void setMaxCRLNumber(BigInteger maxCRL)
```

Sets the maxCRLNumber criterion. The `X509CRL` must have a
CRL number extension whose value is less than or equal to the
specified value. If `null`, no maxCRLNumber check will be
done.

Parameters:

- `maxCRL`: the maximum CRL number accepted (or `null`)

## X509CRLSelector.setDateAndTime(Date)

```java
public void setDateAndTime(Date dateAndTime)
```

Sets the dateAndTime criterion. The specified date must be
equal to or later than the value of the thisUpdate component
of the `X509CRL` and earlier than the value of the
nextUpdate component. There is no match if the `X509CRL`
does not contain a nextUpdate component.
If `null`, no dateAndTime check will be done.

Note that the `Date` supplied here is cloned to protect
against subsequent modifications.

Parameters:

- `dateAndTime`: the `Date` to match against (or `null`)

**See also:** #getDateAndTime

## X509CRLSelector.setCertificateChecking(X509Certificate)

```java
public void setCertificateChecking(X509Certificate cert)
```

Sets the certificate being checked. This is not a criterion. Rather,
it is optional information that may help a `CertStore`
find CRLs that would be relevant when checking revocation for the
specified certificate. If `null` is specified, then no
such optional information is provided.

Parameters:

- `cert`: the `X509Certificate` being checked (or `null`)

**See also:** #getCertificateChecking

## X509CRLSelector.getIssuers()

```java
public Collection<X500Principal> getIssuers()
```

Returns the issuerNames criterion. The issuer distinguished
name in the `X509CRL` must match at least one of the specified
distinguished names. If the value returned is `null`, any
issuer distinguished name will do.

If the value returned is not `null`, it is a
unmodifiable `Collection` of `X500Principal`s.

**Returns:** an unmodifiable `Collection` of names
  (or `null`)

**See also:** #setIssuers

**Since:** 1.5

## X509CRLSelector.getIssuerNames()

```java
public Collection<Object> getIssuerNames()
```

Returns a copy of the issuerNames criterion. The issuer distinguished
name in the `X509CRL` must match at least one of the specified
distinguished names. If the value returned is `null`, any
issuer distinguished name will do.

If the value returned is not `null`, it is a
`Collection` of names. Each name is a `String`
or a byte array representing a distinguished name (in
RFC 2253 or
ASN.1 DER encoded form, respectively).  Note that the
`Collection` returned may contain duplicate names.

If a name is specified as a byte array, it should contain a single DER
encoded distinguished name, as defined in X.501. The ASN.1 notation for
this structure is given in the documentation for
setIssuerNames(Collection names).

Note that a deep copy is performed on the `Collection` to
protect against subsequent modifications.

**Returns:** a `Collection` of names (or `null`)

**See also:** #setIssuerNames

## X509CRLSelector.getMinCRL()

```java
public BigInteger getMinCRL()
```

Returns the minCRLNumber criterion. The `X509CRL` must have a
CRL number extension whose value is greater than or equal to the
specified value. If `null`, no minCRLNumber check will be done.

**Returns:** the minimum CRL number accepted (or `null`)

## X509CRLSelector.getMaxCRL()

```java
public BigInteger getMaxCRL()
```

Returns the maxCRLNumber criterion. The `X509CRL` must have a
CRL number extension whose value is less than or equal to the
specified value. If `null`, no maxCRLNumber check will be
done.

**Returns:** the maximum CRL number accepted (or `null`)

## X509CRLSelector.getDateAndTime()

```java
public Date getDateAndTime()
```

Returns the dateAndTime criterion. The specified date must be
equal to or later than the value of the thisUpdate component
of the `X509CRL` and earlier than the value of the
nextUpdate component. There is no match if the
`X509CRL` does not contain a nextUpdate component.
If `null`, no dateAndTime check will be done.

Note that the `Date` returned is cloned to protect against
subsequent modifications.

**Returns:** the `Date` to match against (or `null`)

**See also:** #setDateAndTime

## X509CRLSelector.getCertificateChecking()

```java
public X509Certificate getCertificateChecking()
```

Returns the certificate being checked. This is not a criterion. Rather,
it is optional information that may help a `CertStore`
find CRLs that would be relevant when checking revocation for the
specified certificate. If the value returned is `null`, then
no such optional information is provided.

**Returns:** the certificate being checked (or `null`)

**See also:** #setCertificateChecking

## X509CRLSelector.toString()

```java
public String toString()
```

Returns a printable representation of the `X509CRLSelector`.

**Returns:** a `String` describing the contents of the
        `X509CRLSelector`.

## X509CRLSelector.match(CRL)

```java
public boolean match(CRL crl)
```

Decides whether a `CRL` should be selected.

Parameters:

- `crl`: the `CRL` to be checked

**Returns:** `true` if the `CRL` should be selected,
        `false` otherwise

## X509CRLSelector.clone()

```java
public Object clone()
```

Returns a copy of this object.

**Returns:** the copy
