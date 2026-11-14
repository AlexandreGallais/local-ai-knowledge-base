---
title: "EdECPublicKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/EdECPublicKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdECPublicKey <example-value> (java.security.interfaces)

```java
public interface EdECPublicKey <example-value> EdECKey, PublicKey
```

An interface for an elliptic curve public key as defined by
RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA). These keys are distinct from the
keys represented by `ECPublicKey`, and they are intended for use with
algorithms based on RFC 8032 such as the EdDSA `Signature` algorithm.

An Edwards-Curve public key is a point on the curve, which is represented using an
EdECPoint.

**Since:** 15

## EdECPublicKey.getPoint()

```java
EdECPoint getPoint()
```

Get the point representing the public key.

**Returns:** the `EdECPoint` representing the public key.

## EdECPublicKey.getParams()

```java
default NamedParameterSpec getParams()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns `null`.

**Returns:** (inherited documentation)
