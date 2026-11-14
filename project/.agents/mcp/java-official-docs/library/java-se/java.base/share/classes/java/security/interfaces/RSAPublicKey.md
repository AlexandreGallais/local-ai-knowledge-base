# RSAPublicKey interface (java.security.interfaces)

```java
public interface RSAPublicKey extends java.security.PublicKey, RSAKey
```

The interface to an RSA public key.

@author Jan Luehe
@since 1.2

## RSAPublicKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## RSAPublicKey.getPublicExponent()

```java
BigInteger getPublicExponent()
```

Returns the public exponent.

@return the public exponent

## RSAPublicKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}
@since 11