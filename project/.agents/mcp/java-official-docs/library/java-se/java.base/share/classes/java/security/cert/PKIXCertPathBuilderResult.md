---
title: "PKIXCertPathBuilderResult class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXCertPathBuilderResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXCertPathBuilderResult class (java.security.cert)

```java
public class PKIXCertPathBuilderResult extends PKIXCertPathValidatorResult implements CertPathBuilderResult
```

This class represents the successful result of the PKIX certification
path builder algorithm. All certification paths that are built and
returned using this algorithm are also validated according to the PKIX
certification path validation algorithm.

Instances of `PKIXCertPathBuilderResult` are returned by
the `build` method of `CertPathBuilder`
objects implementing the PKIX algorithm.

All `PKIXCertPathBuilderResult` objects contain the
certification path constructed by the build algorithm, the
valid policy tree and subject public key <example-value> from the build
algorithm, and a `TrustAnchor` describing the certification
authority (CA) that served as a trust anchor for the certification path.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathBuilderResult

**Since:** 1.4

## PKIXCertPathBuilderResult.PKIXCertPathBuilderResult(CertPath, TrustAnchor, PolicyNode, PublicKey)

```java
public PKIXCertPathBuilderResult(CertPath certPath, TrustAnchor trustAnchor, PolicyNode policyTree, PublicKey <example-value>)
```

Creates an instance of `PKIXCertPathBuilderResult`
containing the specified parameters.

Parameters:

- `certPath`: the validated `CertPath`
- `trustAnchor`: a `TrustAnchor` describing the CA that served as a trust anchor for the certification path
- `policyTree`: the immutable valid policy tree, or `null` if there are no valid policies
- `subjectPublicKey`: the public key of the subject

Throws:

- `NullPointerException`: if the `certPath`, `trustAnchor` or `subjectPublicKey` parameters are `null`

## PKIXCertPathBuilderResult.getCertPath()

```java
public CertPath getCertPath()
```

Returns the built and validated certification path. The
`CertPath` object does not include the trust anchor.
Instead, use the getTrustAnchor() method to
obtain the `TrustAnchor` that served as the trust anchor
for the certification path.

**Returns:** the built and validated `CertPath` (never
`null`)

## PKIXCertPathBuilderResult.toString()

```java
public String toString()
```

Return a printable representation of this
`PKIXCertPathBuilderResult`.

**Returns:** a `String` describing the contents of this
        `PKIXCertPathBuilderResult`
