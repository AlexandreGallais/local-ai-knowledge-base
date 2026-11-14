---
title: "RSAMultiPrimePrivateCrtKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/RSAMultiPrimePrivateCrtKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAMultiPrimePrivateCrtKey <example-value> (java.security.interfaces)

```java
public interface RSAMultiPrimePrivateCrtKey <example-value> RSAPrivateKey
```

The interface to an RSA multi-prime private key, as defined in the
PKCS#1 v2.2 standard,
using the *Chinese Remainder Theorem* (CRT) information values.

**See also:** java.security.spec.RSAPrivateKeySpec

**See also:** java.security.spec.RSAMultiPrimePrivateCrtKeySpec

**See also:** RSAPrivateKey

**See also:** RSAPrivateCrtKey

**Since:** 1.4

## RSAMultiPrimePrivateCrtKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## RSAMultiPrimePrivateCrtKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent.

## RSAMultiPrimePrivateCrtKey.getPrimeP()

```java
BigInteger getPrimeP()
```

Returns the primeP.

**Returns:** the primeP.

## RSAMultiPrimePrivateCrtKey.getPrimeQ()

```java
BigInteger getPrimeQ()
```

Returns the primeQ.

**Returns:** the primeQ.

## RSAMultiPrimePrivateCrtKey.getPrimeExponentP()

```java
BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

**Returns:** the primeExponentP.

## RSAMultiPrimePrivateCrtKey.getPrimeExponentQ()

```java
BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

**Returns:** the primeExponentQ.

## RSAMultiPrimePrivateCrtKey.getCrtCoefficient()

```java
BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

**Returns:** the crtCoefficient.

## RSAMultiPrimePrivateCrtKey.getOtherPrimeInfo()

```java
RSAOtherPrimeInfo[] getOtherPrimeInfo()
```

Returns the otherPrimeInfo or null if there are only
two prime factors (p and q).

**Returns:** the otherPrimeInfo.
