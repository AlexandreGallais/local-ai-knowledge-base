# ECPublicKey interface (java.security.interfaces)

```java
public interface ECPublicKey extends PublicKey, ECKey
```

The interface to an elliptic curve (EC) public key.

@author Valerie Peng


@see PublicKey
@see ECKey
@see java.security.spec.ECPoint

@since 1.5

## ECPublicKey.serialVersionUID

```java
long serialVersionUID
```

The class fingerprint that is set to indicate
serialization compatibility.

@deprecated A {@code serialVersionUID} field in an interface is
ineffectual. Do not use; no replacement.

## ECPublicKey.getW()

```java
ECPoint getW()
```

Returns the public point W.
@return the public point W.

## ECPublicKey.getParams()

```java
default ECParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}