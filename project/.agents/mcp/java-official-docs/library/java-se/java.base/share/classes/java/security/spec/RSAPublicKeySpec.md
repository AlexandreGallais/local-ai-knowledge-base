---
title: "RSAPublicKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAPublicKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPublicKeySpec class (java.security.spec)

```java
public class RSAPublicKeySpec implements KeySpec
```

This class specifies an RSA public key.

**Since:** 1.2

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** X509EncodedKeySpec

**See also:** RSAPrivateKeySpec

**See also:** RSAPrivateCrtKeySpec

## RSAPublicKeySpec.RSAPublicKeySpec(BigInteger, BigInteger)

```java
public RSAPublicKeySpec(BigInteger modulus, BigInteger publicExponent)
```

Creates a new RSAPublicKeySpec.

Parameters:

- `modulus`: the modulus
- `publicExponent`: the public exponent

## RSAPublicKeySpec.RSAPublicKeySpec(BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPublicKeySpec(BigInteger modulus, BigInteger publicExponent, AlgorithmParameterSpec params)
```

Creates a new RSAPublicKeySpec with additional key parameters.

Parameters:

- `modulus`: the modulus
- `publicExponent`: the public exponent
- `params`: the parameters associated with this key, may be null

**Since:** 11

## RSAPublicKeySpec.getModulus()

```java
public BigInteger getModulus()
```

Returns the modulus.

**Returns:** the modulus

## RSAPublicKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent

## RSAPublicKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key, may be null if not
present.

**Returns:** the parameters associated with this key

**Since:** 11
