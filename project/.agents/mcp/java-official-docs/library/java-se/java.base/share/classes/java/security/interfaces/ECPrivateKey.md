# ECPrivateKey interface (java.security.interfaces)

```java
public interface ECPrivateKey extends PrivateKey, ECKey
```

The interface to an elliptic curve (EC) private key.

@author Valerie Peng


@see PrivateKey
@see ECKey

@since 1.5

## ECPrivateKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## ECPrivateKey.getS()

```java
BigInteger getS()
```

Returns the private value S.
@return the private value S.

## ECPrivateKey.getParams()

```java
default ECParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}