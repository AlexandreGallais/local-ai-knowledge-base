# RSAMultiPrimePrivateCrtKeySpec class (java.security.spec)

```java
public class RSAMultiPrimePrivateCrtKeySpec extends RSAPrivateKeySpec
```

This class specifies an RSA multi-prime private key, as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard
using the Chinese Remainder Theorem (CRT) information values
for efficiency.

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Valerie Peng


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see PKCS8EncodedKeySpec
@see RSAPrivateKeySpec
@see RSAPublicKeySpec
@see RSAOtherPrimeInfo

@since 1.4

## RSAMultiPrimePrivateCrtKeySpec.RSAMultiPrimePrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, RSAOtherPrimeInfo[])

```java
public RSAMultiPrimePrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, RSAOtherPrimeInfo[] otherPrimeInfo)
```

Creates a new {@code RSAMultiPrimePrivateCrtKeySpec}.

<p>Note that the contents of {@code otherPrimeInfo}
are copied to protect against subsequent modification when
constructing this object.

@param modulus         the modulus n
@param publicExponent  the public exponent e
@param privateExponent the private exponent d
@param primeP          the prime factor p of n
@param primeQ          the prime factor q of n
@param primeExponentP  this is d mod (p-1)
@param primeExponentQ  this is d mod (q-1)
@param crtCoefficient  the Chinese Remainder Theorem
                       coefficient q-1 mod p
@param otherPrimeInfo  triplets of the rest of primes, null can be
                       specified if there are only two prime factors
                       (p and q)
@throws NullPointerException     if any of the specified parameters
        except {@code otherPrimeInfo} is null
@throws IllegalArgumentException if an empty, i.e. 0-length,
        {@code otherPrimeInfo} is specified

## RSAMultiPrimePrivateCrtKeySpec.RSAMultiPrimePrivateCrtKeySpec(BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, BigInteger, RSAOtherPrimeInfo[], AlgorithmParameterSpec)

```java
public RSAMultiPrimePrivateCrtKeySpec(BigInteger modulus, BigInteger publicExponent, BigInteger privateExponent, BigInteger primeP, BigInteger primeQ, BigInteger primeExponentP, BigInteger primeExponentQ, BigInteger crtCoefficient, RSAOtherPrimeInfo[] otherPrimeInfo, AlgorithmParameterSpec keyParams)
```

Creates a new {@code RSAMultiPrimePrivateCrtKeySpec} with additional
key parameters.

<p>Note that the contents of {@code otherPrimeInfo}
are copied to protect against subsequent modification when
constructing this object.

@param modulus          the modulus n
@param publicExponent   the public exponent e
@param privateExponent  the private exponent d
@param primeP           the prime factor p of n
@param primeQ           the prime factor q of n
@param primeExponentP   this is d mod (p-1)
@param primeExponentQ   this is d mod (q-1)
@param crtCoefficient   the Chinese Remainder Theorem coefficient
                        q-1 mod p
@param otherPrimeInfo   triplets of the rest of primes, null can be
                        specified if there are only two prime factors
                        (p and q)
@param keyParams        the parameters associated with key
@throws NullPointerException     if any of the specified parameters
        except {@code otherPrimeInfo} and {@code keyParams}
        is null
@throws IllegalArgumentException if an empty, i.e. 0-length,
        {@code otherPrimeInfo} is specified
@since 11

## RSAMultiPrimePrivateCrtKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeP()

```java
public BigInteger getPrimeP()
```

Returns the primeP.

@return the primeP.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeQ()

```java
public BigInteger getPrimeQ()
```

Returns the primeQ.

@return the primeQ.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeExponentP()

```java
public BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

@return the primeExponentP.

## RSAMultiPrimePrivateCrtKeySpec.getPrimeExponentQ()

```java
public BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

@return the primeExponentQ.

## RSAMultiPrimePrivateCrtKeySpec.getCrtCoefficient()

```java
public BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

@return the crtCoefficient.

## RSAMultiPrimePrivateCrtKeySpec.getOtherPrimeInfo()

```java
public RSAOtherPrimeInfo[] getOtherPrimeInfo()
```

Returns a copy of the otherPrimeInfo or null if there are
only two prime factors (p and q).

@return the otherPrimeInfo. Returns a new array each time this method
        is called.