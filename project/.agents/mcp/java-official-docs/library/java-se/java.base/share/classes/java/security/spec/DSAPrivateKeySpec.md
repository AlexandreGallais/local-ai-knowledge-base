---
title: "DSAPrivateKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/DSAPrivateKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAPrivateKeySpec class (java.security.spec)

```java
public class DSAPrivateKeySpec implements KeySpec
```

This class specifies a DSA private key with its associated parameters.

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** DSAPublicKeySpec

**See also:** PKCS8EncodedKeySpec

**Since:** 1.2

## DSAPrivateKeySpec.DSAPrivateKeySpec(BigInteger, BigInteger, BigInteger, BigInteger)

```java
public DSAPrivateKeySpec(BigInteger x, BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAPrivateKeySpec with the specified parameter values.

Parameters:

- `x`: the private key.
- `p`: the prime.
- `q`: the sub-prime.
- `g`: the base.

## DSAPrivateKeySpec.getX()

```java
public BigInteger getX()
```

Returns the private key `x`.

**Returns:** the private key `x`.

## DSAPrivateKeySpec.getP()

```java
public BigInteger getP()
```

Returns the prime `p`.

**Returns:** the prime `p`.

## DSAPrivateKeySpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime `q`.

**Returns:** the sub-prime `q`.

## DSAPrivateKeySpec.getG()

```java
public BigInteger getG()
```

Returns the base `g`.

**Returns:** the base `g`.
