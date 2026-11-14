# RSAPrivateCrtKey interface (java.security.interfaces)

```java
public interface RSAPrivateCrtKey extends RSAPrivateKey
```

The interface to an RSA private key, as defined in the
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard,
using the <i>Chinese Remainder Theorem</i> (CRT) information values.

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Jan Luehe
@since 1.2


@see RSAPrivateKey

## RSAPrivateCrtKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## RSAPrivateCrtKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent

## RSAPrivateCrtKey.getPrimeP()

```java
BigInteger getPrimeP()
```

Returns the primeP.

@return the primeP

## RSAPrivateCrtKey.getPrimeQ()

```java
BigInteger getPrimeQ()
```

Returns the primeQ.

@return the primeQ

## RSAPrivateCrtKey.getPrimeExponentP()

```java
BigInteger getPrimeExponentP()
```

Returns the primeExponentP.

@return the primeExponentP

## RSAPrivateCrtKey.getPrimeExponentQ()

```java
BigInteger getPrimeExponentQ()
```

Returns the primeExponentQ.

@return the primeExponentQ

## RSAPrivateCrtKey.getCrtCoefficient()

```java
BigInteger getCrtCoefficient()
```

Returns the crtCoefficient.

@return the crtCoefficient