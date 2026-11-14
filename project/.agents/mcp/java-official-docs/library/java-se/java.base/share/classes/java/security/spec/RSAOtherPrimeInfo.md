# RSAOtherPrimeInfo class (java.security.spec)

```java
public class RSAOtherPrimeInfo
```

This class represents the triplet (prime, exponent, and coefficient)
inside RSA's OtherPrimeInfo structure, as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard.
The ASN.1 syntax of RSA's OtherPrimeInfo is as follows:

<pre>
OtherPrimeInfo ::= SEQUENCE {
  prime        INTEGER,
  exponent     INTEGER,
  coefficient  INTEGER
}

</pre>

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Valerie Peng


@see RSAPrivateCrtKeySpec
@see java.security.interfaces.RSAMultiPrimePrivateCrtKey

@since 1.4

## RSAOtherPrimeInfo.RSAOtherPrimeInfo(BigInteger, BigInteger, BigInteger)

```java
public RSAOtherPrimeInfo(BigInteger prime, BigInteger primeExponent, BigInteger crtCoefficient)
```

Creates a new {@code RSAOtherPrimeInfo}
given the prime, primeExponent, and
crtCoefficient as defined in PKCS#1.

@param prime the prime factor of n.
@param primeExponent the exponent.
@param crtCoefficient the Chinese Remainder Theorem
coefficient.
@throws    NullPointerException if any of the parameters, i.e.
{@code prime}, {@code primeExponent},
{@code crtCoefficient}, is null.

## RSAOtherPrimeInfo.getPrime()

```java
public final BigInteger getPrime()
```

Returns the prime.

@return the prime.

## RSAOtherPrimeInfo.getExponent()

```java
public final BigInteger getExponent()
```

Returns the prime's exponent.

@return the primeExponent.

## RSAOtherPrimeInfo.getCrtCoefficient()

```java
public final BigInteger getCrtCoefficient()
```

Returns the prime's crtCoefficient.

@return the crtCoefficient.