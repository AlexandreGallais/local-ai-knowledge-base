---
title: "RSAPrivateCrtKey <example-value> (java.security.interfaces)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/interfaces/RSAPrivateCrtKey.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RSAPrivateCrtKey <example-value> (java.security.interfaces)

```java
public interface RSAPrivateCrtKey <example-value> RSAPrivateKey
```

The interface to an RSA private key, as defined in the
PKCS#1 v2.2 standard,
using the *Chinese Remainder Theorem* (CRT) information values.

**Since:** 1.2

**See also:** RSAPrivateKey

## RSAPrivateCrtKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

**Deprecated:** A `serialVersionUID` field in an interface is
ineffectual. Do not use; no replacement.

## RSAPrivateCrtKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

**Returns:** the public exponent

## RSAPrivateCrtKey.getPrimeP()

```java
BigInteger getPrimeP()
```

Returns the primeP.

**Returns:** the primeP

## RSAPrivateCrtKey.getPrimeQ()

```java
BigInteger getPrimeQ()
```

Returns the primeQ.

**Returns:** the primeQ

## RSAPrivateCrtKey.getPrimeExponentP()

```java
BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

**Returns:** the primeExponentP

## RSAPrivateCrtKey.getPrimeExponentQ()

```java
BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

**Returns:** the primeExponentQ

## RSAPrivateCrtKey.getCrtCoefficient()

```java
BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

**Returns:** the crtCoefficient
