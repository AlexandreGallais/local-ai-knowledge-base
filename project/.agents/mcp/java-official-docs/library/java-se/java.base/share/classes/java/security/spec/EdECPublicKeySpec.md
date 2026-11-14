---
title: "EdECPublicKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EdECPublicKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdECPublicKeySpec class (java.security.spec)

```java
public final class EdECPublicKeySpec implements KeySpec
```

A class representing elliptic curve public keys as defined in
RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA), including the curve and other
algorithm parameters. The public key is a point on the curve, which is
represented using an `EdECPoint`.

**Since:** 15

## EdECPublicKeySpec.EdECPublicKeySpec(NamedParameterSpec, EdECPoint)

```java
public EdECPublicKeySpec(NamedParameterSpec params, EdECPoint point)
```

Construct a public key spec using the supplied parameters and
point.

Parameters:

- `params`: the algorithm parameters.
- `point`: the point representing the public key.

Throws:

- `NullPointerException`: if `params` or `point` is null.

## EdECPublicKeySpec.getParams()

```java
public NamedParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

**Returns:** the parameters.

## EdECPublicKeySpec.getPoint()

```java
public EdECPoint getPoint()
```

Get the point representing the public key.

**Returns:** the `EdECPoint` representing the public key.
