# RSAKey interface (java.security.interfaces)

```java
public interface RSAKey
```

The interface to a public or private key in
<a href="https://tools.ietf.org/rfc/rfc8017.txt">PKCS#1 v2.2</a> standard,
such as those for RSA, or RSASSA-PSS algorithms.

@spec https://www.rfc-editor.org/info/rfc8017
     RFC 8017: PKCS #1: RSA Cryptography Specifications Version 2.2
@author Jan Luehe

@see RSAPublicKey
@see RSAPrivateKey

@since 1.3

## RSAKey.getModulus()

```java
BigInteger getModulus()
```

Returns the modulus.

@return the modulus

## RSAKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key.
The parameters are optional and may be either
explicitly specified or implicitly created during
key pair generation.

@implSpec
The default implementation returns {@code null}.

@return the associated parameters, may be null
@since 11