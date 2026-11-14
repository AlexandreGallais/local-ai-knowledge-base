# ECFieldFp class (java.security.spec)

```java
public class ECFieldFp implements ECField
```

This immutable class defines an elliptic curve (EC) prime
finite field.

@see ECField

@author Valerie Peng

@since 1.5

## ECFieldFp.ECFieldFp(BigInteger)

```java
public ECFieldFp(BigInteger p)
```

Creates an elliptic curve prime finite field
with the specified prime {@code p}.
@param p the prime.
@throws    NullPointerException if {@code p} is null.
@throws    IllegalArgumentException if {@code p}
is not positive.

## ECFieldFp.getFieldSize()

```java
public int getFieldSize()
```

Returns the field size in bits which is size of prime p
for this prime finite field.
@return the field size in bits.

## ECFieldFp.getP()

```java
public BigInteger getP()
```

Returns the prime {@code p} of this prime finite field.
@return the prime.

## ECFieldFp.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this prime finite field for equality with the
specified object.
@param obj the object to be compared.
@return true if {@code obj} is an instance
of ECFieldFp and the prime value match, false otherwise.

## ECFieldFp.hashCode()

```java
public int hashCode()
```

{@return a hash code value for this prime finite field}