# DSAPrivateKeySpec class (java.security.spec)

```java
public class DSAPrivateKeySpec implements KeySpec
```

This class specifies a DSA private key with its associated parameters.

@author Jan Luehe


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see DSAPublicKeySpec
@see PKCS8EncodedKeySpec

@since 1.2

## DSAPrivateKeySpec.DSAPrivateKeySpec(BigInteger, BigInteger, BigInteger, BigInteger)

```java
public DSAPrivateKeySpec(BigInteger x, BigInteger p, BigInteger q, BigInteger g)
```

Creates a new DSAPrivateKeySpec with the specified parameter values.

@param x the private key.

@param p the prime.

@param q the sub-prime.

@param g the base.

## DSAPrivateKeySpec.getX()

```java
public BigInteger getX()
```

Returns the private key {@code x}.

@return the private key {@code x}.

## DSAPrivateKeySpec.getP()

```java
public BigInteger getP()
```

Returns the prime {@code p}.

@return the prime {@code p}.

## DSAPrivateKeySpec.getQ()

```java
public BigInteger getQ()
```

Returns the sub-prime {@code q}.

@return the sub-prime {@code q}.

## DSAPrivateKeySpec.getG()

```java
public BigInteger getG()
```

Returns the base {@code g}.

@return the base {@code g}.