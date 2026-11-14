---
title: "ECPoint class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECPoint.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECPoint class (java.security.spec)

```java
public class ECPoint
```

This immutable class represents a point on an elliptic curve (EC)
in affine coordinates. Other coordinate systems can
extend this class to represent this point in other
coordinates.

**Since:** 1.5

## ECPoint.POINT_INFINITY

```java
public static final ECPoint POINT_INFINITY
```

This defines the point at infinity.

## ECPoint.ECPoint(BigInteger, BigInteger)

```java
public ECPoint(BigInteger x, BigInteger y)
```

Creates an ECPoint from the specified affine x-coordinate
`x` and affine y-coordinate `y`.

Parameters:

- `x`: the affine x-coordinate.
- `y`: the affine y-coordinate.

Throws:

- `NullPointerException`: if `x` or `y` is null.

## ECPoint.getAffineX()

```java
public BigInteger getAffineX()
```

Returns the affine x-coordinate `x`.
Note: POINT_INFINITY has a null affine x-coordinate.

**Returns:** the affine x-coordinate.

## ECPoint.getAffineY()

```java
public BigInteger getAffineY()
```

Returns the affine y-coordinate `y`.
Note: POINT_INFINITY has a null affine y-coordinate.

**Returns:** the affine y-coordinate.

## ECPoint.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this elliptic curve point for equality with
the specified object.

Parameters:

- `obj`: the object to be compared.

**Returns:** true if `obj` is an instance of
ECPoint and the affine coordinates match, false otherwise.

## ECPoint.hashCode()

```java
public int hashCode()
```
