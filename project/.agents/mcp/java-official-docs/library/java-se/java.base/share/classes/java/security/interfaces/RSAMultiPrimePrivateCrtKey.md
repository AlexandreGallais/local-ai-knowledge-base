# RSAMultiPrimePrivateCrtKey interface (java.security.interfaces)

```java
public interface RSAMultiPrimePrivateCrtKey extends RSAPrivateKey
```

The interface to an RSA multi-prime private key, as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard,
using the <i>Chinese Remainder Theorem</i> (CRT) information values.

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Valerie Peng


@see java.security.spec.RSAPrivateKeySpec
@see java.security.spec.RSAMultiPrimePrivateCrtKeySpec
@see RSAPrivateKey
@see RSAPrivateCrtKey

@since 1.4

## RSAMultiPrimePrivateCrtKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## RSAMultiPrimePrivateCrtKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent.

## RSAMultiPrimePrivateCrtKey.getPrimeP()

```java
BigInteger getPrimeP()
```

Returns the primeP.

@return the primeP.

## RSAMultiPrimePrivateCrtKey.getPrimeQ()

```java
BigInteger getPrimeQ()
```

Returns the primeQ.

@return the primeQ.

## RSAMultiPrimePrivateCrtKey.getPrimeExponentP()

```java
BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

@return the primeExponentP.

## RSAMultiPrimePrivateCrtKey.getPrimeExponentQ()

```java
BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

@return the primeExponentQ.

## RSAMultiPrimePrivateCrtKey.getCrtCoefficient()

```java
BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

@return the crtCoefficient.

## RSAMultiPrimePrivateCrtKey.getOtherPrimeInfo()

```java
RSAOtherPrimeInfo[] getOtherPrimeInfo()
```

Returns the otherPrimeInfo or null if there are only
two prime factors (p and q).

@return the otherPrimeInfo.