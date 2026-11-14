# ECPoint class (java.security.spec)

```java
public class ECPoint
```

This immutable class represents a point on an elliptic curve (EC)
in affine coordinates. Other coordinate systems can
extend this class to represent this point in other
coordinates.

@author Valerie Peng

@since 1.5

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
{@code x} and affine y-coordinate {@code y}.
@param x the affine x-coordinate.
@param y the affine y-coordinate.
@throws    NullPointerException if {@code x} or
{@code y} is null.

## ECPoint.getAffineX()

```java
public BigInteger getAffineX()
```

Returns the affine x-coordinate {@code x}.
Note: POINT_INFINITY has a null affine x-coordinate.
@return the affine x-coordinate.

## ECPoint.getAffineY()

```java
public BigInteger getAffineY()
```

Returns the affine y-coordinate {@code y}.
Note: POINT_INFINITY has a null affine y-coordinate.
@return the affine y-coordinate.

## ECPoint.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this elliptic curve point for equality with
the specified object.
@param obj the object to be compared.
@return true if {@code obj} is an instance of
ECPoint and the affine coordinates match, false otherwise.

## ECPoint.hashCode()

```java
public int hashCode()
```

{@return the hash code value for this elliptic curve point}