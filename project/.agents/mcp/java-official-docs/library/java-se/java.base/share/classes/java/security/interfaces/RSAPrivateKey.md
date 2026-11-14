# RSAPrivateKey interface (java.security.interfaces)

```java
public interface RSAPrivateKey extends java.security.PrivateKey, RSAKey
```

The interface to an RSA private key.

@author Jan Luehe
@since 1.2


@see RSAPrivateCrtKey

## RSAPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The type fingerprint that is set to indicate
serialization compatibility with a previous
version of the type.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## RSAPrivateKey.getPrivateExponent()

```java
BigInteger getPrivateExponent()
```

Returns the private exponent.

@return the private exponent

## RSAPrivateKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}
@since 11