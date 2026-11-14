---
title: "ECFieldFp class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/ECFieldFp.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ECFieldFp class (java.security.spec)

```java
public class ECFieldFp implements ECField
```

This immutable class defines an elliptic curve (EC) prime
finite field.

**See also:** ECField

**Since:** 1.5

## ECFieldFp.ECFieldFp(BigInteger)

```java
public ECFieldFp(BigInteger p)
```

Creates an elliptic curve prime finite field
with the specified prime `p`.

Parameters:

- `p`: the prime.

Throws:

- `NullPointerException`: if `p` is null.
- `IllegalArgumentException`: if `p` is not positive.

## ECFieldFp.getFieldSize()

```java
public int getFieldSize()
```

Returns the field size in bits which is size of prime p
for this prime finite field.

**Returns:** the field size in bits.

## ECFieldFp.getP()

```java
public BigInteger getP()
```

Returns the prime `p` of this prime finite field.

**Returns:** the prime.

## ECFieldFp.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this prime finite field for equality with the
specified object.

Parameters:

- `obj`: the object to be compared.

**Returns:** true if `obj` is an instance
of ECFieldFp and the prime value match, false otherwise.

## ECFieldFp.hashCode()

```java
public int hashCode()
```
