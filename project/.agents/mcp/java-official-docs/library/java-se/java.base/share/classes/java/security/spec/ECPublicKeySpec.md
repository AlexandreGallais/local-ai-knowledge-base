---
title: "ECPublicKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECPublicKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECPublicKeySpec class (java.security.spec)

```java
public class ECPublicKeySpec implements KeySpec
```

This immutable class specifies an elliptic curve public key with
its associated parameters.

**See also:** KeySpec

**See also:** ECPoint

**See also:** ECParameterSpec

**Since:** 1.5

## ECPublicKeySpec.ECPublicKeySpec(ECPoint, ECParameterSpec)

```java
public ECPublicKeySpec(ECPoint w, ECParameterSpec params)
```

Creates a new ECPublicKeySpec with the specified
parameter values.

Parameters:

- `w`: the public point.
- `params`: the associated elliptic curve domain parameters.

Throws:

- `NullPointerException`: if `w` or `params` is null.
- `IllegalArgumentException`: if `w` is point at infinity, i.e. ECPoint.POINT_INFINITY

## ECPublicKeySpec.getW()

```java
public ECPoint getW()
```

Returns the public point W.

**Returns:** the public point W.

## ECPublicKeySpec.getParams()

```java
public ECParameterSpec getParams()
```

Returns the associated elliptic curve domain
parameters.

**Returns:** the EC domain parameters.
