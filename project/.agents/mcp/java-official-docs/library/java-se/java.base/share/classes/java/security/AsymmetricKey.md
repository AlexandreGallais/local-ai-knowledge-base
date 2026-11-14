# AsymmetricKey interface (java.security)

```java
public non-sealed interface AsymmetricKey extends Key, DEREncodable
```

An asymmetric key, which can be either a public key or a private key.
This interface contains methods that are common to either a public key or
a private key.

@since 22

## AsymmetricKey.getParams()

```java
default AlgorithmParameterSpec getParams()
```

Returns the parameters associated with this key.
The parameters are optional and may be either
explicitly specified or implicitly created during
key pair generation.

@implSpec
The default implementation returns {@code null}.

@return the associated parameters, may be {@code null}