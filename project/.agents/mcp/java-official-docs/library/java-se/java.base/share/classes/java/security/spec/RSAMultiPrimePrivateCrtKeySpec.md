---
title: "RSAMultiPrimePrivateCrtKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAMultiPrimePrivateCrtKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAMultiPrimePrivateCrtKeySpec class (java.security.spec)

```java
public class RSAMultiPrimePrivateCrtKeySpec extends RSAPrivateKeySpec
```

This class specifies an RSA multi-prime private key, as defined in the
PKCS#1 v2.2 standard
using the Chinese Remainder Theorem (CRT) information values
for efficiency.

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** PKCS8EncodedKeySpec

**See also:** RSAPrivateKeySpec

**See also:** RSAPublicKeySpec

**See also:** RSAOtherPrimeInfo

**Since:** 1.4

## RSAMultiPrimePrivateCrtKeySpec.RSAMultiPrimePrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, RSAOtherPrimeInfo[])

```java
public RSAMultiPrimePrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, RSAOtherPrimeInfo[] otherPrimeInfo)
```

Creates a new `RSAMultiPrimePrivateCrtKeySpec`.

Note that the contents of `otherPrimeInfo`
are copied to protect against subsequent modification when
constructing this object.

Parameters:

- `modulus`: the modulus n
- `publicExponent`: the public exponent e
- `privateExponent`: the private exponent d
- `primeP`: the prime factor p of n
- `primeQ`: the prime factor q of n
- `primeExponentP`: this is d mod (p-1)
- `primeExponentQ`: this is d mod (q-1)
- `crtCoefficient`: the Chinese Remainder Theorem coefficient q-1 mod p
- `otherPrimeInfo`: triplets of the rest of primes, null can be specified if there are only two prime factors (p and q)

Throws:

- `NullPointerException`: if any of the specified parameters except `otherPrimeInfo` is null
- `IllegalArgumentException`: if an empty, i.e. 0-length, `otherPrimeInfo` is specified

## RSAMultiPrimePrivateCrtKeySpec.RSAMultiPrimePrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, RSAOtherPrimeInfo[], AlgorithmParameterSpec)

```java
public RSAMultiPrimePrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, RSAOtherPrimeInfo[] otherPrimeInfo, AlgorithmParameterSpec keyParams)
```

Creates a new `RSAMultiPrimePrivateCrtKeySpec` with additional
key parameters.

Note that the contents of `otherPrimeInfo`
are copied to protect against subsequent modification when
constructing this object.

Parameters:

- `modulus`: the modulus n
- `publicExponent`: the public exponent e
- `privateExponent`: the private exponent d
- `primeP`: the prime factor p of n
- `primeQ`: the prime factor q of n
- `primeExponentP`: this is d mod (p-1)
- `primeExponentQ`: this is d mod (q-1)
- `crtCoefficient`: the Chinese Remainder Theorem coefficient q-1 mod p
- `otherPrimeInfo`: triplets of the rest of primes, null can be specified if there are only two prime factors (p and q)
- `keyParams`: the parameters associated with key

**Since:** 11

Throws:

- `NullPointerException`: if any of the specified parameters except `otherPrimeInfo` and `keyParams` is null
- `IllegalArgumentException`: if an empty, i.e. 0-length, `otherPrimeInfo` is specified

## RSAMultiPrimePrivateCrtKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeP()

```java
public BigInteger getPrimeP()
```

Returns the primeP.

**Returns:** the primeP.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeQ()

```java
public BigInteger getPrimeQ()
```

Returns the primeQ.

**Returns:** the primeQ.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeExponentP()

```java
public BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

**Returns:** the primeExponentP.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeExponentQ()

```java
public BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

**Returns:** the primeExponentQ.

## RSAMultiPrimePrivateCrtKeySpec.getCrtCoefficient()

```java
public BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

**Returns:** the crtCoefficient.

## RSAMultiPrimePrivateCrtKeySpec.getOtherPrimeInfo()

```java
public RSAOtherPrimeInfo[] getOtherPrimeInfo()
```

Returns a copy of the otherPrimeInfo or null if there are
only two prime factors (p and q).

**Returns:** the otherPrimeInfo. Returns a new array each time this method
        is called.
