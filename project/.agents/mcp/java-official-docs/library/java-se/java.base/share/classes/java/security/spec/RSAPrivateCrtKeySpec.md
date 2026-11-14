# RSAPrivateCrtKeySpec class (java.security.spec)

```java
public class RSAPrivateCrtKeySpec extends RSAPrivateKeySpec
```

This class specifies an RSA private key, as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard,
using the Chinese Remainder Theorem (CRT) information values for efficiency.

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Jan Luehe
@since 1.2


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see PKCS8EncodedKeySpec
@see RSAPrivateKeySpec
@see RSAPublicKeySpec

## RSAPrivateCrtKeySpec.RSAPrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger)

```java
public RSAPrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient)
```

Creates a new {@code RSAPrivateCrtKeySpec}.

@param modulus the modulus n
@param publicExponent the public exponent e
@param privateExponent the private exponent d
@param primeP the prime factor p of n
@param primeQ the prime factor q of n
@param primeExponentP this is d mod (p-1)
@param primeExponentQ this is d mod (q-1)
@param crtCoefficient the Chinese Remainder Theorem
coefficient q-1 mod p

## RSAPrivateCrtKeySpec.RSAPrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, AlgorithmParameterSpec keyParams)
```

Creates a new {@code RSAPrivateCrtKeySpec} with additional
key parameters.

@param modulus the modulus n
@param publicExponent the public exponent e
@param privateExponent the private exponent d
@param primeP the prime factor p of n
@param primeQ the prime factor q of n
@param primeExponentP this is d mod (p-1)
@param primeExponentQ this is d mod (q-1)
@param crtCoefficient the Chinese Remainder Theorem
coefficient q-1 mod p
@param keyParams the parameters associated with key
@since 11

## RSAPrivateCrtKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent

## RSAPrivateCrtKeySpec.getPrimeP()

```java
public BigInteger getPrimeP()
```

Returns the primeP.

@return the primeP

## RSAPrivateCrtKeySpec.getPrimeQ()

```java
public BigInteger getPrimeQ()
```

Returns the primeQ.

@return the primeQ

## RSAPrivateCrtKeySpec.getPrimeExponentP()

```java
public BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

@return the primeExponentP

## RSAPrivateCrtKeySpec.getPrimeExponentQ()

```java
public BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

@return the primeExponentQ

## RSAPrivateCrtKeySpec.getCrtCoefficient()

```java
public BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

@return the crtCoefficient