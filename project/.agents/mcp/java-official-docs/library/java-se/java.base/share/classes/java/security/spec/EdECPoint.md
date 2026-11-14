---
title: "EdECPoint class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EdECPoint.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EdECPoint class (java.security.spec)

```java
public final class EdECPoint
```

An elliptic curve point used to specify keys as defined by
RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA). These points are distinct from the
points represented by `ECPoint`, and they are intended for use with
algorithms based on RFC 8032 such as the EdDSA `Signature` algorithm.

An EdEC point is specified by its y-coordinate value and a boolean that
indicates whether the x-coordinate is odd. The y-coordinate is an
element of the field of integers modulo some value p that is determined by
the algorithm parameters. This field element is represented by a
`BigInteger`, and implementations that consume objects of this class
may reject integer values which are not in the range [0, p).

**Since:** 15

## EdECPoint.EdECPoint(boolean, BigInteger)

```java
public EdECPoint(boolean xOdd, BigInteger y)
```

Construct an EdECPoint.

Parameters:

- `xOdd`: whether the x-coordinate is odd.
- `y`: the y-coordinate, represented using a `BigInteger`.

Throws:

- `NullPointerException`: if `y` is null.

## EdECPoint.isXOdd()

```java
public boolean isXOdd()
```

Get whether the x-coordinate of the point is odd.

**Returns:** a boolean indicating whether the x-coordinate is odd.

## EdECPoint.getY()

```java
public BigInteger getY()
```

Get the y-coordinate of the point.

**Returns:** the y-coordinate, represented using a `BigInteger`.
