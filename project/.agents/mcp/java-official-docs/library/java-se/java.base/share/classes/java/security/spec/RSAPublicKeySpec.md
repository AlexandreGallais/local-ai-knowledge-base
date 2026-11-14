# RSAPublicKeySpec class (java.security.spec)

```java
public class RSAPublicKeySpec implements KeySpec
```

This class specifies an RSA public key.

@author Jan Luehe
@since 1.2


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see X509EncodedKeySpec
@see RSAPrivateKeySpec
@see RSAPrivateCrtKeySpec

## RSAPublicKeySpec.RSAPublicKeySpec(BigInteger, BigInteger)

```java
public RSAPublicKeySpec(BigInteger modulus, BigInteger publicExponent)
```

Creates a new RSAPublicKeySpec.

@param modulus the modulus
@param publicExponent the public exponent

## RSAPublicKeySpec.RSAPublicKeySpec(BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPublicKeySpec(BigInteger modulus, BigInteger publicExponent, AlgorithmParameterSpec params)
```

Creates a new RSAPublicKeySpec with additional key parameters.

@param modulus the modulus
@param publicExponent the public exponent
@param params the parameters associated with this key, may be null
@since 11

## RSAPublicKeySpec.getModulus()

```java
public BigInteger getModulus()
```

Returns the modulus.

@return the modulus

## RSAPublicKeySpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent

## RSAPublicKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key, may be null if not
present.

@return the parameters associated with this key
@since 11