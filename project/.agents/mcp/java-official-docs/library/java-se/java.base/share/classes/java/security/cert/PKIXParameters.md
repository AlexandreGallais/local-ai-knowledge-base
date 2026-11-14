---
title: "PKIXParameters class (java.security.cert) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXParameters class (java.security.cert)

```java
public class PKIXParameters implements CertPathParameters
```

Parameters used as input for the PKIX `CertPathValidator`
algorithm.

A PKIX `CertPathValidator` uses these parameters to
validate a `CertPath` according to the PKIX certification path
validation algorithm.

To instantiate a `PKIXParameters` object, an
application must specify one or more *most-trusted CAs* as defined by
the PKIX certification path validation algorithm. The most-trusted CAs
can be specified using one of two constructors. An application
can call PKIXParameters(Set),
specifying a `Set` of `TrustAnchor` objects, each
of which identify a most-trusted CA. Alternatively, an application can call
PKIXParameters(KeyStore), specifying a
`KeyStore` instance containing trusted certificate entries, each
of which will be considered as a most-trusted CA.

Once a `PKIXParameters` object has been created, other parameters
can be specified (by calling setInitialPolicies
or setDate, for instance) and then the
`PKIXParameters` is passed along with the `CertPath`
to be validated to CertPathValidator.validate.

Any parameter that is not set (or is set to `null`) will
be set to the default value for that parameter. The default value for the
`date` parameter is `null`, which indicates
the current time when the path is validated. The default for the
remaining parameters is the least constrained.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathValidator

**Since:** 1.4

## PKIXParameters.PKIXParameters(Set<TrustAnchor>)

```java
public PKIXParameters(Set<TrustAnchor> trustAnchors) throws InvalidAlgorithmParameterException
```

Creates an instance of `PKIXParameters` with the specified
`Set` of most-trusted CAs. Each element of the
set is a TrustAnchor.

Note that the `Set` is copied to protect against
subsequent modifications.

Parameters:

- `trustAnchors`: a `Set` of `TrustAnchor`s

Throws:

- `InvalidAlgorithmParameterException`: if the specified `Set` is empty `(trustAnchors.isEmpty() == true)`
- `NullPointerException`: if the specified `Set` is `null`
- `ClassCastException`: if any of the elements in the `Set` are not of type `java.security.cert.TrustAnchor`

## PKIXParameters.PKIXParameters(KeyStore)

```java
public PKIXParameters(KeyStore keystore) throws KeyStoreException, InvalidAlgorithmParameterException
```

Creates an instance of `PKIXParameters` that
populates the set of most-trusted CAs from the trusted
certificate entries contained in the specified `KeyStore`.
Only keystore entries that contain trusted `X509Certificates`
are considered; all other certificate types are ignored.

Parameters:

- `keystore`: a `KeyStore` from which the set of most-trusted CAs will be populated

Throws:

- `KeyStoreException`: if the keystore has not been initialized
- `InvalidAlgorithmParameterException`: if the keystore does not contain at least one trusted certificate entry
- `NullPointerException`: if the keystore is `null`

## PKIXParameters.getTrustAnchors()

```java
public Set<TrustAnchor> getTrustAnchors()
```

Returns an immutable `Set` of the most-trusted
CAs.

**Returns:** an immutable `Set` of `TrustAnchor`s
(never `null`)

**See also:** #setTrustAnchors

## PKIXParameters.setTrustAnchors(Set<TrustAnchor>)

```java
public void setTrustAnchors(Set<TrustAnchor> trustAnchors) throws InvalidAlgorithmParameterException
```

Sets the `Set` of most-trusted CAs.

Note that the `Set` is copied to protect against
subsequent modifications.

Parameters:

- `trustAnchors`: a `Set` of `TrustAnchor`s

**See also:** #getTrustAnchors

Throws:

- `InvalidAlgorithmParameterException`: if the specified `Set` is empty `(trustAnchors.isEmpty() == true)`
- `NullPointerException`: if the specified `Set` is `null`
- `ClassCastException`: if any of the elements in the set are not of type `java.security.cert.TrustAnchor`

## PKIXParameters.getInitialPolicies()

```java
public Set<String> getInitialPolicies()
```

Returns an immutable `Set` of initial
policy identifiers (OID strings), indicating that any one of these
policies would be acceptable to the certificate user for the purposes of
certification path processing. The default return value is an empty
`Set`, which is interpreted as meaning that any policy would
be acceptable.

**Returns:** an immutable `Set` of initial policy OIDs in
`String` format, or an empty `Set` (implying any
policy is acceptable). Never returns `null`.

**See also:** #setInitialPolicies

## PKIXParameters.setInitialPolicies(Set<String>)

```java
public void setInitialPolicies(Set<String> initialPolicies)
```

Sets the `Set` of initial policy identifiers
(OID strings), indicating that any one of these
policies would be acceptable to the certificate user for the purposes of
certification path processing. By default, any policy is acceptable
(i.e. all policies), so a user that wants to allow any policy as
acceptable does not need to call this method, or can call it
with an empty `Set` (or `null`).

Note that the `Set` is copied to protect against
subsequent modifications.

Parameters:

- `initialPolicies`: a `Set` of initial policy OIDs in `String` format (or `null`)

**See also:** #getInitialPolicies

Throws:

- `ClassCastException`: if any of the elements in the set are not of type `String`

## PKIXParameters.setCertStores(List<CertStore>)

```java
public void setCertStores(List<CertStore> stores)
```

Sets the list of `CertStore`s to be used in finding
certificates and CRLs. May be `null`, in which case
no `CertStore`s will be used. The first
`CertStore`s in the list may be preferred to those that
appear later.

Note that the `List` is copied to protect against
subsequent modifications.

Parameters:

- `stores`: a `List` of `CertStore`s (or `null`)

**See also:** #getCertStores

Throws:

- `ClassCastException`: if any of the elements in the list are not of type `java.security.cert.CertStore`

## PKIXParameters.addCertStore(CertStore)

```java
public void addCertStore(CertStore store)
```

Adds a `CertStore` to the end of the list of
`CertStore`s used in finding certificates and CRLs.

Parameters:

- `store`: the `CertStore` to add. If `null`, the store is ignored (not added to list).

## PKIXParameters.getCertStores()

```java
public List<CertStore> getCertStores()
```

Returns an immutable `List` of `CertStore`s that
are used to find certificates and CRLs.

**Returns:** an immutable `List` of `CertStore`s
(may be empty, but never `null`)

**See also:** #setCertStores

## PKIXParameters.setRevocationEnabled(boolean)

```java
public void setRevocationEnabled(boolean val)
```

Sets the RevocationEnabled flag. If this flag is true, the default
revocation checking mechanism of the underlying PKIX service provider
will be used, unless a `PKIXRevocationChecker` is passed in
as a `CertPathChecker` (see below for further explanation). If
this flag is false, the default revocation checking mechanism will be
disabled (not used).

When a `PKIXParameters` object is created, this flag is set
to true. This setting reflects the most common strategy for checking
revocation, since each service provider must support revocation
checking to be PKIX compliant. Sophisticated applications should set
this flag to false when it is not practical to use a PKIX service
provider's default revocation checking mechanism or when an alternative
revocation checking mechanism is to be substituted (by also calling the
addCertPathChecker or setCertPathCheckers methods).

Note that when a `PKIXRevocationChecker` is passed in as a
parameter via the `addCertPathChecker` or
`setCertPathCheckers` methods, it will be used to check
revocation irrespective of the setting of the RevocationEnabled flag.

Parameters:

- `val`: the new value of the RevocationEnabled flag

## PKIXParameters.isRevocationEnabled()

```java
public boolean isRevocationEnabled()
```

Checks the RevocationEnabled flag. If this flag is true, the default
revocation checking mechanism of the underlying PKIX service provider
will be used, unless a `PKIXRevocationChecker` is passed in as
a `CertPathChecker`. If this flag is false, the default revocation
checking mechanism will be disabled (not used). See the setRevocationEnabled method for more details on
setting the value of this flag.

**Returns:** the current value of the RevocationEnabled flag

## PKIXParameters.setExplicitPolicyRequired(boolean)

```java
public void setExplicitPolicyRequired(boolean val)
```

Sets the ExplicitPolicyRequired flag. If this flag is true, an
acceptable policy needs to be explicitly identified in every certificate.
By default, the ExplicitPolicyRequired flag is false.

Parameters:

- `val`: `true` if explicit policy is to be required, `false` otherwise

## PKIXParameters.isExplicitPolicyRequired()

```java
public boolean isExplicitPolicyRequired()
```

Checks if explicit policy is required. If this flag is true, an
acceptable policy needs to be explicitly identified in every certificate.
By default, the ExplicitPolicyRequired flag is false.

**Returns:** `true` if explicit policy is required,
`false` otherwise

## PKIXParameters.setPolicyMappingInhibited(boolean)

```java
public void setPolicyMappingInhibited(boolean val)
```

Sets the PolicyMappingInhibited flag. If this flag is true, policy
mapping is inhibited. By default, policy mapping is not inhibited (the
flag is false).

Parameters:

- `val`: `true` if policy mapping is to be inhibited, `false` otherwise

## PKIXParameters.isPolicyMappingInhibited()

```java
public boolean isPolicyMappingInhibited()
```

Checks if policy mapping is inhibited. If this flag is true, policy
mapping is inhibited. By default, policy mapping is not inhibited (the
flag is false).

**Returns:** true if policy mapping is inhibited, false otherwise

## PKIXParameters.setAnyPolicyInhibited(boolean)

```java
public void setAnyPolicyInhibited(boolean val)
```

Sets state to determine if the any policy OID should be processed
if it is included in a certificate. By default, the any policy OID
is not inhibited (isAnyPolicyInhibited()
returns `false`).

Parameters:

- `val`: `true` if the any policy OID is to be inhibited, `false` otherwise

## PKIXParameters.isAnyPolicyInhibited()

```java
public boolean isAnyPolicyInhibited()
```

Checks whether the any policy OID should be processed if it
is included in a certificate.

**Returns:** `true` if the any policy OID is inhibited,
`false` otherwise

## PKIXParameters.setPolicyQualifiersRejected(boolean)

```java
public void setPolicyQualifiersRejected(boolean qualifiersRejected)
```

Sets the PolicyQualifiersRejected flag. If this flag is true,
certificates that include policy qualifiers in a certificate
policies extension that is marked critical are rejected.
If the flag is false, certificates are not rejected on this basis.

 When a `PKIXParameters` object is created, this flag is
set to true. This setting reflects the most common (and simplest)
strategy for processing policy qualifiers. Applications that want to use
a more sophisticated policy must set this flag to false.

Note that the PKIX certification path validation algorithm specifies
that any policy qualifier in a certificate policies extension that is
marked critical must be processed and validated. Otherwise the
certification path must be rejected. If the policyQualifiersRejected flag
is set to false, it is up to the application to validate all policy
qualifiers in this manner in order to be PKIX compliant.

Parameters:

- `qualifiersRejected`: the new value of the PolicyQualifiersRejected flag

**See also:** #getPolicyQualifiersRejected

**See also:** PolicyQualifierInfo

## PKIXParameters.getPolicyQualifiersRejected()

```java
public boolean getPolicyQualifiersRejected()
```

Gets the PolicyQualifiersRejected flag. If this flag is true,
certificates that include policy qualifiers in a certificate policies
extension that is marked critical are rejected.
If the flag is false, certificates are not rejected on this basis.

 When a `PKIXParameters` object is created, this flag is
set to true. This setting reflects the most common (and simplest)
strategy for processing policy qualifiers. Applications that want to use
a more sophisticated policy must set this flag to false.

**Returns:** the current value of the PolicyQualifiersRejected flag

**See also:** #setPolicyQualifiersRejected

## PKIXParameters.getDate()

```java
public Date getDate()
```

Returns the time for which the validity of the certification path
should be determined. If `null`, the current time is used.

Note that the `Date` returned is copied to protect against
subsequent modifications.

**Returns:** the `Date`, or `null` if not set

**See also:** #setDate

## PKIXParameters.setDate(Date)

```java
public void setDate(Date date)
```

Sets the time for which the validity of the certification path
should be determined. If `null`, the current time is used.

Note that the `Date` supplied here is copied to protect
against subsequent modifications.

Parameters:

- `date`: the `Date`, or `null` for the current time

**See also:** #getDate

## PKIXParameters.setCertPathCheckers(List<PKIXCertPathChecker>)

```java
public void setCertPathCheckers(List<PKIXCertPathChecker> checkers)
```

Sets a `List` of additional certification path checkers. If
the specified `List` contains an object that is not a
`PKIXCertPathChecker`, it is ignored.

Each `PKIXCertPathChecker` specified implements
additional checks on a certificate. Typically, these are checks to
process and verify private extensions contained in certificates.
Each `PKIXCertPathChecker` should be instantiated with any
initialization parameters needed to execute the check.

This method allows sophisticated applications to extend a PKIX
`CertPathValidator` or `CertPathBuilder`.
Each of the specified `PKIXCertPathChecker`s will be called,
in turn, by a PKIX `CertPathValidator` or
`CertPathBuilder` for each certificate processed or
validated.

Regardless of whether these additional `PKIXCertPathChecker`s
are set, a PKIX `CertPathValidator` or
`CertPathBuilder` must perform all of the required PKIX
checks on each certificate. The one exception to this rule is if the
RevocationEnabled flag is set to false (see the setRevocationEnabled method).

Note that the `List` supplied here is copied and each
`PKIXCertPathChecker` in the list is cloned to protect
against subsequent modifications.

Parameters:

- `checkers`: a `List` of `PKIXCertPathChecker`s. May be `null`, in which case no additional checkers will be used.

**See also:** #getCertPathCheckers

Throws:

- `ClassCastException`: if any of the elements in the list are not of type `java.security.cert.PKIXCertPathChecker`
