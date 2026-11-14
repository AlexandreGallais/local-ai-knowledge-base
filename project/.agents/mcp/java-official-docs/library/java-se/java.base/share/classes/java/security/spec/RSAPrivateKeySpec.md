# RSAPrivateKeySpec class (java.security.spec)

```java
public class RSAPrivateKeySpec implements KeySpec
```

This class specifies an RSA private key.

@author Jan Luehe
@since 1.2


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see PKCS8EncodedKeySpec
@see RSAPublicKeySpec
@see RSAPrivateCrtKeySpec

## RSAPrivateKeySpec.RSAPrivateKeySpec(BigInteger, BigInteger)

```java
public RSAPrivateKeySpec(BigInteger modulus, BigInteger privateExponent)
```

Creates a new RSAPrivateKeySpec.

@param modulus the modulus
@param privateExponent the private exponent

## RSAPrivateKeySpec.RSAPrivateKeySpec(BigInteger, BigInteger, AlgorithmParameterSpec)

```java
public RSAPrivateKeySpec(BigInteger modulus, BigInteger privateExponent, AlgorithmParameterSpec params)
```

Creates a new RSAPrivateKeySpec with additional key parameters.

@param modulus the modulus
@param privateExponent the private exponent
@param params the parameters associated with this key, may be null
@since 11

## RSAPrivateKeySpec.getModulus()

```java
public BigInteger getModulus()
```

Returns the modulus.

@return the modulus

## RSAPrivateKeySpec.getPrivateExponent()

```java
public BigInteger getPrivateExponent()
```

Returns the private exponent.

@return the private exponent

## RSAPrivateKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key, may be null if not
present.

@return the parameters associated with this key
@since 11