# RSAKeyGenParameterSpec class (java.security.spec)

```java
public class RSAKeyGenParameterSpec implements AlgorithmParameterSpec
```

This class specifies the set of parameters used to generate an RSA
key pair.

@author Jan Luehe

@see java.security.KeyPairGenerator#initialize(java.security.spec.AlgorithmParameterSpec)

@since 1.3

## RSAKeyGenParameterSpec.F0

```java
public static final BigInteger F0
```

The public-exponent value F0 = 3.

## RSAKeyGenParameterSpec.F4

```java
public static final BigInteger F4
```

The public exponent-value F4 = 65537.

## RSAKeyGenParameterSpec.RSAKeyGenParameterSpec(int, BigInteger)

```java
public RSAKeyGenParameterSpec(int keysize, BigInteger publicExponent)
```

Constructs a new {@code RSAKeyGenParameterSpec} object from the
given keysize, public-exponent value, and null key parameters.

@param keysize the modulus size (specified in number of bits)
@param publicExponent the public exponent

## RSAKeyGenParameterSpec.RSAKeyGenParameterSpec(int, BigInteger, AlgorithmParameterSpec)

```java
public RSAKeyGenParameterSpec(int keysize, BigInteger publicExponent, AlgorithmParameterSpec keyParams)
```

Constructs a new {@code RSAKeyGenParameterSpec} object from the
given keysize, public-exponent value, and key parameters.

@param keysize the modulus size (specified in number of bits)
@param publicExponent the public exponent
@param keyParams the key parameters, may be null
@since 11

## RSAKeyGenParameterSpec.getKeysize()

```java
public int getKeysize()
```

Returns the keysize.

@return the keysize.

## RSAKeyGenParameterSpec.getPublicExponent()

```java
public BigInteger getPublicExponent()
```

Returns the public-exponent value.

@return the public-exponent value.

## RSAKeyGenParameterSpec.getKeyParams()

```java
public AlgorithmParameterSpec getKeyParams()
```

Returns the parameters to be associated with key.

@return the associated parameters, may be null if
        not present
@since 11