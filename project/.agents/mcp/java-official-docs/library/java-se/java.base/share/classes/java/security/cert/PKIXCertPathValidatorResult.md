---
title: "PKIXCertPathValidatorResult class (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/PKIXCertPathValidatorResult.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKIXCertPathValidatorResult class (java.security.cert)

```java
public class PKIXCertPathValidatorResult implements CertPathValidatorResult
```

This class represents the successful result of the PKIX certification
path validation algorithm.

Instances of `PKIXCertPathValidatorResult` are returned by the
validate method of
`CertPathValidator` objects implementing the PKIX algorithm.

 All `PKIXCertPathValidatorResult` objects contain the
valid policy tree and subject public key <example-value> from the
validation algorithm, as well as a `TrustAnchor` describing
the certification authority (CA) that served as a trust anchor for the
certification path.

**Concurrent Access**

Unless otherwise specified, the methods defined in this class are not
thread-safe. Multiple threads that need to access a single
object concurrently should synchronize amongst themselves and
provide the necessary locking. Multiple threads each manipulating
separate objects need not synchronize.

**See also:** CertPathValidatorResult

**Since:** 1.4

## PKIXCertPathValidatorResult.PKIXCertPathValidatorResult(TrustAnchor, PolicyNode, PublicKey)

```java
public PKIXCertPathValidatorResult(TrustAnchor trustAnchor, PolicyNode policyTree, PublicKey <example-value>)
```

Creates an instance of `PKIXCertPathValidatorResult`
containing the specified parameters.

Parameters:

- `trustAnchor`: a `TrustAnchor` describing the CA that served as a trust anchor for the certification path
- `policyTree`: the immutable valid policy tree, or `null` if there are no valid policies
- `subjectPublicKey`: the public key of the subject

Throws:

- `NullPointerException`: if the `subjectPublicKey` or `trustAnchor` parameters are `null`

## PKIXCertPathValidatorResult.getTrustAnchor()

```java
public TrustAnchor getTrustAnchor()
```

Returns the `TrustAnchor` describing the CA that served
as a trust anchor for the certification path.

**Returns:** the `TrustAnchor` (never `null`)

## PKIXCertPathValidatorResult.getPolicyTree()

```java
public PolicyNode getPolicyTree()
```

Returns the root node of the valid policy tree resulting from the
PKIX certification path validation algorithm. The
`PolicyNode` object that is returned and any objects that
it returns through public methods are immutable.

Most applications will not need to examine the valid policy tree.
They can achieve their policy processing goals by setting the
policy-related parameters in `PKIXParameters`. However, more
sophisticated applications, especially those that process policy
qualifiers, may need to traverse the valid policy tree using the
PolicyNode.getParent and
PolicyNode.getChildren methods.

**Returns:** the root node of the valid policy tree, or `null`
if there are no valid policies

## PKIXCertPathValidatorResult.getPublicKey()

```java
public PublicKey getPublicKey()
```

Returns the public key of the subject (target) of the certification
path, including any inherited public key <example-value> if applicable.

**Returns:** the public key of the subject (never `null`)

## PKIXCertPathValidatorResult.clone()

```java
public Object clone()
```

Returns a copy of this object.

**Returns:** the copy

## PKIXCertPathValidatorResult.toString()

```java
public String toString()
```

Return a printable representation of this
`PKIXCertPathValidatorResult`.

**Returns:** a `String` describing the contents of this
        `PKIXCertPathValidatorResult`
