---
title: "PKIXBuilderParameters class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXBuilderParameters.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXBuilderParameters class (java.security.cert)

```java
public class PKIXBuilderParameters extends PKIXParameters
```

Parameters used as input for the PKIX `CertPathBuilder`
algorithm.

A PKIX `CertPathBuilder` uses these parameters to build a `CertPath` which has been
validated according to the PKIX certification path validation algorithm.

To instantiate a `PKIXBuilderParameters` object, an
application must specify one or more *most-trusted CAs* as defined by
the PKIX certification path validation algorithm. The most-trusted CA
can be specified using one of two constructors. An application
can call CertSelector) PKIXBuilderParameters(Set, CertSelector), specifying a
`Set` of `TrustAnchor` objects, each of which
identifies a most-trusted CA. Alternatively, an application can call
CertSelector) PKIXBuilderParameters(KeyStore, CertSelector), specifying a
`KeyStore` instance containing trusted certificate entries, each
of which will be considered as a most-trusted CA.

In addition, an application must specify constraints on the target
certificate that the `CertPathBuilder` will attempt
to build a path to. The constraints are specified as a
`CertSelector` object. These constraints should provide the
`CertPathBuilder` with enough search criteria to find the target
certificate. Minimal criteria for an `X509Certificate` usually
include the subject name and/or one or more subject alternative names.
If enough criteria is not specified, the `CertPathBuilder`
may throw a `CertPathBuilderException`.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathBuilder

**Since:** 1.4

## PKIXBuilderParameters.PKIXBuilderParameters(Set<TrustAnchor>, CertSelector)

```java
public PKIXBuilderParameters(Set<TrustAnchor> trustAnchors, CertSelector targetConstraints) throws InvalidAlgorithmParameterException
```

Creates an instance of `PKIXBuilderParameters` with
the specified `Set` of most-trusted CAs.
Each element of the set is a TrustAnchor.

Note that the `Set` is copied to protect against
subsequent modifications.

Parameters:

- `trustAnchors`: a `Set` of `TrustAnchor`s
- `targetConstraints`: a `CertSelector` specifying the constraints on the target certificate

Throws:

- `InvalidAlgorithmParameterException`: if `trustAnchors` is empty `(trustAnchors.isEmpty() == true)`
- `NullPointerException`: if `trustAnchors` is `null`
- `ClassCastException`: if any of the elements of `trustAnchors` are not of type `java.security.cert.TrustAnchor`

## PKIXBuilderParameters.PKIXBuilderParameters(KeyStore, CertSelector)

```java
public PKIXBuilderParameters(KeyStore keystore, CertSelector targetConstraints) throws KeyStoreException, InvalidAlgorithmParameterException
```

Creates an instance of `PKIXBuilderParameters` that
populates the set of most-trusted CAs from the trusted
certificate entries contained in the specified `KeyStore`.
Only keystore entries that contain trusted `X509Certificate`s
are considered; all other certificate types are ignored.

Parameters:

- `keystore`: a `KeyStore` from which the set of most-trusted CAs will be populated
- `targetConstraints`: a `CertSelector` specifying the constraints on the target certificate

Throws:

- `KeyStoreException`: if `keystore` has not been initialized
- `InvalidAlgorithmParameterException`: if `keystore` does not contain at least one trusted certificate entry
- `NullPointerException`: if `keystore` is `null`

## PKIXBuilderParameters.setMaxPathLength(int)

```java
public void setMaxPathLength(int maxPathLength)
```

Sets the value of the maximum number of non-self-issued intermediate
certificates that may exist in a certification path. A certificate
is self-issued if the DNs that appear in the subject and issuer
fields are identical and are not empty. Note that the last certificate
in a certification path is not an intermediate certificate, and is not
included in this limit. Usually the last certificate is an end entity
certificate, but it can be a CA certificate. A PKIX
`CertPathBuilder` instance must not build
paths longer than the length specified.

 A value of 0 implies that the path can only contain
a single certificate. A value of -1 implies that the
path length is unconstrained (i.e. there is no maximum).
The default maximum path length, if not specified, is 5.
Setting a value less than -1 will cause an exception to be thrown.

 If any of the CA certificates contain the
`BasicConstraintsExtension`, the value of the
`pathLenConstraint` field of the extension overrides
the maximum path length parameter whenever the result is a
certification path of smaller length.

Parameters:

- `maxPathLength`: the maximum number of non-self-issued intermediate certificates that may exist in a certification path

**See also:** #getMaxPathLength

Throws:

- `InvalidParameterException`: if `maxPathLength` is set to a value less than -1

## PKIXBuilderParameters.getMaxPathLength()

```java
public int getMaxPathLength()
```

Returns the value of the maximum number of intermediate non-self-issued
certificates that may exist in a certification path. See
the `setMaxPathLength` method for more details.

**Returns:** the maximum number of non-self-issued intermediate certificates
 that may exist in a certification path, or -1 if there is no limit

**See also:** #setMaxPathLength

## PKIXBuilderParameters.toString()

```java
public String toString()
```

Returns a formatted string describing the parameters.

**Returns:** a formatted string describing the parameters
