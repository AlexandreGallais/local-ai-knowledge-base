# DSAPublicKeySpec class (java.security.spec)

```java
public class DSAPublicKeySpec implements KeySpec
```

This class specifies a DSA public key with its associated parameters.

@author Jan Luehe


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see DSAPrivateKeySpec
@see X509EncodedKeySpec

@since 1.2

## DSAPublicKeySpec.DSAPublicKeySpec(BigInteger, BigInteger, BigInteger, BigInteger)

```java
public DSAPublicKeySpec(BigInteger y, BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAPublicKeySpec with the specified parameter values.

@param y the public key.

@param p the prime.

@param q the sub-prime.

@param g the base.

## DSAPublicKeySpec.getY()

```java
public BigInteger getY()
```

Returns the public key {@code y}.

@return the public key {@code y}.

## DSAPublicKeySpec.getP()

```java
public BigInteger getP()
```

Returns the prime {@code p}.

@return the prime {@code p}.

## DSAPublicKeySpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime {@code q}.

@return the sub-prime {@code q}.

## DSAPublicKeySpec.getG()

```java
public BigInteger getG()
```

Returns the base {@code g}.

@return the base {@code g}.