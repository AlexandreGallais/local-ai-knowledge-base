---
title: "RSAOtherPrimeInfo class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/RSAOtherPrimeInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAOtherPrimeInfo class (java.security.spec)

```java
public class RSAOtherPrimeInfo
```

This class represents the triplet (prime, exponent, and coefficient)
inside RSA's OtherPrimeInfo structure, as defined in the
PKCS#1 v2.2 standard.
The ASN.1 syntax of RSA's OtherPrimeInfo is as follows:

```java
OtherPrimeInfo ::= SEQUENCE {
  prime        INTEGER,
  exponent     INTEGER,
  coefficient  INTEGER
```

**See also:** RSAPrivateCrtKeySpec

**See also:** java.security.interfaces.RSAMultiPrimePrivateCrtKey

**Since:** 1.4

## RSAOtherPrimeInfo.RSAOtherPrimeInfo(BigInteger, BigInteger, BigInteger)

```java
public RSAOtherPrimeInfo(BigInteger prime, BigInteger primeExponent, BigInteger crtCoefficient)
```

Creates a new `RSAOtherPrimeInfo`
given the prime, primeExponent, and
crtCoefficient as defined in PKCS#1.

Parameters:

- `prime`: the prime factor of n.
- `primeExponent`: the exponent.
- `crtCoefficient`: the Chinese Remainder Theorem coefficient.

Throws:

- `NullPointerException`: if any of the parameters, i.e. `prime`, `primeExponent`, `crtCoefficient`, is null.

## RSAOtherPrimeInfo.getPrime()

```java
public final BigInteger getPrime()
```

Returns the prime.

**Returns:** the prime.

## RSAOtherPrimeInfo.getExponent()

```java
public final BigInteger getExponent()
```

Returns the prime's exponent.

**Returns:** the primeExponent.

## RSAOtherPrimeInfo.getCrtCoefficient()

```java
public final BigInteger getCrtCoefficient()
```

Returns the prime's crtCoefficient.

**Returns:** the crtCoefficient.
