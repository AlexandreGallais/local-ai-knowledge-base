---
title: "RSAPrivateKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAPrivateKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPrivateKeySpec class (java.security.spec)

```java
public class RSAPrivateKeySpec implements KeySpec
```

This class specifies an RSA private key.

**Since:** 1.2

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** PKCS8EncodedKeySpec

**See also:** RSAPublicKeySpec

**See also:** RSAPrivateCrtKeySpec

## RSAPrivateKeySpec.RSAPrivateKeySpec(BigInteger, BigInteger)

```java
public RSAPrivateKeySpec(BigInteger modulus, BigInteger privateExponent)
```

Creates a new RSAPrivateKeySpec.

Parameters:

- `modulus`: the modulus
- `privateExponent`: the private exponent

## RSAPrivateKeySpec.RSAPrivateKeySpec(BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPrivateKeySpec(BigInteger modulus, BigInteger privateExponent, AlgorithmParameterSpec params)
```

Creates a new RSAPrivateKeySpec with additional key parameters.

Parameters:

- `modulus`: the modulus
- `privateExponent`: the private exponent
- `params`: the parameters associated with this key, may be null

**Since:** 11

## RSAPrivateKeySpec.getModulus()

```java
public BigInteger getModulus()
```

Returns the modulus.

**Returns:** the modulus

## RSAPrivateKeySpec.getPrivateExponent()

```java
public BigInteger getPrivateExponent()
```

Returns the private exponent.

**Returns:** the private exponent

## RSAPrivateKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key, may be null if not
present.

**Returns:** the parameters associated with this key

**Since:** 11
