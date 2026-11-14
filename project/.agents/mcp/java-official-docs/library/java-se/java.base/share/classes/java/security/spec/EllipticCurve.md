---
title: "EllipticCurve class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EllipticCurve.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EllipticCurve class (java.security.spec)

```java
public class EllipticCurve
```

This immutable class holds the necessary values needed to represent
an elliptic curve.

**See also:** ECField

**See also:** ECFieldFp

**See also:** ECFieldF2m

**Since:** 1.5

## EllipticCurve.EllipticCurve(ECField, BigInteger, BigInteger)

```java
public EllipticCurve(ECField field, BigInteger a, BigInteger b)
```

Creates an elliptic curve with the specified elliptic field
`field` and the coefficients `a` and
`b`.

Parameters:

- `field`: the finite field that this elliptic curve is over.
- `a`: the first coefficient of this elliptic curve.
- `b`: the second coefficient of this elliptic curve.

Throws:

- `NullPointerException`: if `field`, `a`, or `b` is null.
- `IllegalArgumentException`: if `a` or `b` is not null and not in `field`.

## EllipticCurve.EllipticCurve(ECField, BigInteger, BigInteger, byte[])

```java
public EllipticCurve(ECField field, BigInteger a, BigInteger b, byte[] seed)
```

Creates an elliptic curve with the specified elliptic field
`field`, the coefficients `a` and
`b`, and the `seed` used for curve generation.

Parameters:

- `field`: the finite field that this elliptic curve is over.
- `a`: the first coefficient of this elliptic curve.
- `b`: the second coefficient of this elliptic curve.
- `seed`: the bytes used during curve generation for later validation. Contents of this array are copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `field`, `a`, or `b` is null.
- `IllegalArgumentException`: if `a` or `b` is not null and not in `field`.

## EllipticCurve.getField()

```java
public ECField getField()
```

Returns the finite field `field` that this
elliptic curve is over.

**Returns:** the field `field` that this curve
is over.

## EllipticCurve.getA()

```java
public BigInteger getA()
```

Returns the first coefficient `a` of the
elliptic curve.

**Returns:** the first coefficient `a`.

## EllipticCurve.getB()

```java
public BigInteger getB()
```

Returns the second coefficient `b` of the
elliptic curve.

**Returns:** the second coefficient `b`.

## EllipticCurve.getSeed()

```java
public byte[] getSeed()
```

Returns the seeding bytes `seed` used
during curve generation. May be null if not specified.

**Returns:** the seeding bytes `seed`. A new
array is returned each time this method is called.

## EllipticCurve.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this elliptic curve for equality with the
specified object.

Parameters:

- `obj`: the object to be compared.

**Returns:** true if `obj` is an instance of
EllipticCurve and the field, A, and B match, false otherwise.

## EllipticCurve.hashCode()

```java
public int hashCode()
```

Returns a hash code value for this elliptic curve.

**Returns:** a hash code value computed from the hash codes of the field, A,
and B, as follows:

```java
    (field.hashCode() << 6) + (a.hashCode() << 4) + (b.hashCode() << 2)
```
