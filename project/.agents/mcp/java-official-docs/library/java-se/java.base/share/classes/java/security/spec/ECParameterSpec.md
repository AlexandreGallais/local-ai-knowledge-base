---
title: "ECParameterSpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECParameterSpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECParameterSpec class (java.security.spec)

```java
public class ECParameterSpec implements AlgorithmParameterSpec
```

This immutable class specifies the set of domain parameters
used with elliptic curve cryptography (ECC).

**See also:** AlgorithmParameterSpec

**Since:** 1.5

## ECParameterSpec.ECParameterSpec(EllipticCurve, ECPoint, BigInteger, int)

```java
public ECParameterSpec(EllipticCurve curve, ECPoint g, BigInteger n, int h)
```

Creates elliptic curve domain parameters based on the
specified values.

Parameters:

- `curve`: the elliptic curve which this parameter defines.
- `g`: the generator which is also known as the base point.
- `n`: the order of the generator `g`.
- `h`: the cofactor.

Throws:

- `NullPointerException`: if `curve`, `g`, or `n` is null.
- `IllegalArgumentException`: if `n` or `h` is not positive.

## ECParameterSpec.getCurve()

```java
public EllipticCurve getCurve()
```

Returns the elliptic curve that this parameter defines.

**Returns:** the elliptic curve that this parameter defines.

## ECParameterSpec.getGenerator()

```java
public ECPoint getGenerator()
```

Returns the generator which is also known as the base point.

**Returns:** the generator which is also known as the base point.

## ECParameterSpec.getOrder()

```java
public BigInteger getOrder()
```

Returns the order of the generator.

**Returns:** the order of the generator.

## ECParameterSpec.getCofactor()

```java
public int getCofactor()
```

Returns the cofactor.

**Returns:** the cofactor.
