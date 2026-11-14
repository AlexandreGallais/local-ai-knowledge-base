---
title: "DSAPublicKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/DSAPublicKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DSAPublicKeySpec class (java.security.spec)

```java
public class DSAPublicKeySpec implements KeySpec
```

This class specifies a DSA public key with its associated parameters.

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** DSAPrivateKeySpec

**See also:** X509EncodedKeySpec

**Since:** 1.2

## DSAPublicKeySpec.DSAPublicKeySpec(BigInteger, BigInteger, BigInteger, BigInteger)

```java
public DSAPublicKeySpec(BigInteger y, BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAPublicKeySpec with the specified parameter values.

Parameters:

- `y`: the public key.
- `p`: the prime.
- `q`: the sub-prime.
- `g`: the base.

## DSAPublicKeySpec.getY()

```java
public BigInteger getY()
```

Returns the public key `y`.

**Returns:** the public key `y`.

## DSAPublicKeySpec.getP()

```java
public BigInteger getP()
```

Returns the prime `p`.

**Returns:** the prime `p`.

## DSAPublicKeySpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime `q`.

**Returns:** the sub-prime `q`.

## DSAPublicKeySpec.getG()

```java
public BigInteger getG()
```

Returns the base `g`.

**Returns:** the base `g`.
