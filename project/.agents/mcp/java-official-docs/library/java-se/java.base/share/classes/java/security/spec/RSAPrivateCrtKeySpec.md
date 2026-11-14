---
title: "RSAPrivateCrtKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAPrivateCrtKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPrivateCrtKeySpec class (java.security.spec)

```java
public class RSAPrivateCrtKeySpec extends RSAPrivateKeySpec
```

This class specifies an RSA private key, as defined in the
PKCS#1 v2.2 standard,
using the Chinese Remainder Theorem (CRT) information values for efficiency.

**Since:** 1.2

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** PKCS8EncodedKeySpec

**See also:** RSAPrivateKeySpec

**See also:** RSAPublicKeySpec

## RSAPrivateCrtKeySpec.RSAPrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger)

```java
public RSAPrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient)
```

Creates a new `RSAPrivateCrtKeySpec`.

Parameters:

- `modulus`: the modulus n
- `publicExponent`: the public exponent e
- `privateExponent`: the private exponent d
- `primeP`: the prime factor p of n
- `primeQ`: the prime factor q of n
- `primeExponentP`: this is d mod (p-1)
- `primeExponentQ`: this is d mod (q-1)
- `crtCoefficient`: the Chinese Remainder Theorem coefficient q-1 mod p

## RSAPrivateCrtKeySpec.RSAPrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, AlgorithmParameterSpec keyParams)
```

Creates a new `RSAPrivateCrtKeySpec` with additional
key parameters.

Parameters:

- `modulus`: the modulus n
- `publicExponent`: the public exponent e
- `privateExponent`: the private exponent d
- `primeP`: the prime factor p of n
- `primeQ`: the prime factor q of n
- `primeExponentP`: this is d mod (p-1)
- `primeExponentQ`: this is d mod (q-1)
- `crtCoefficient`: the Chinese Remainder Theorem coefficient q-1 mod p
- `keyParams`: the parameters associated with key

**Since:** 11

## RSAPrivateCrtKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent

## RSAPrivateCrtKeySpec.getPrimeP()

```java
public BigInteger getPrimeP()
```

Returns the primeP.

**Returns:** the primeP

## RSAPrivateCrtKeySpec.getPrimeQ()

```java
public BigInteger getPrimeQ()
```

Returns the primeQ.

**Returns:** the primeQ

## RSAPrivateCrtKeySpec.getPrimeExponentP()

```java
public BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

**Returns:** the primeExponentP

## RSAPrivateCrtKeySpec.getPrimeExponentQ()

```java
public BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

**Returns:** the primeExponentQ

## RSAPrivateCrtKeySpec.getCrtCoefficient()

```java
public BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

**Returns:** the crtCoefficient
