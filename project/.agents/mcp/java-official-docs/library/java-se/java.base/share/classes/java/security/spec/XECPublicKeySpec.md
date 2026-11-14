---
title: "XECPublicKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/XECPublicKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# XECPublicKeySpec class (java.security.spec)

```java
public class XECPublicKeySpec implements KeySpec
```

A class representing elliptic curve public keys as defined in RFC 7748,
including the curve and other algorithm parameters. The public key is a
particular point on the curve, which is represented using only its
u-coordinate. A u-coordinate is an element of the field of integers modulo
some value that is determined by the algorithm parameters. This field
element is represented by a BigInteger which may hold any value. That is,
the BigInteger is not restricted to the range of canonical field elements.

**Since:** 11

## XECPublicKeySpec.XECPublicKeySpec(AlgorithmParameterSpec, BigInteger)

```java
public XECPublicKeySpec(AlgorithmParameterSpec params, BigInteger u)
```

Construct a public key spec using the supplied parameters and
u coordinate.

Parameters:

- `params`: the algorithm parameters
- `u`: the u-coordinate of the point, represented using a BigInteger which may hold any value

Throws:

- `NullPointerException`: if `params` or `u` is null.

## XECPublicKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

**Returns:** the parameters

## XECPublicKeySpec.getU()

```java
public BigInteger getU()
```

Get the u coordinate of the point.

**Returns:** the u-coordinate, represented using a BigInteger which may hold
         any value
