# EdECPublicKey interface (java.security.interfaces)

```java
public interface EdECPublicKey extends EdECKey, PublicKey
```

An interface for an elliptic curve public key as defined by
<a href="https://tools.ietf.org/html/rfc8032">RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA)</a>. These keys are distinct from the
keys represented by {@code ECPublicKey}, and they are intended for use with
algorithms based on RFC 8032 such as the EdDSA {@code Signature} algorithm.
<p>
An Edwards-Curve public key is a point on the curve, which is represented using an
EdECPoint.

@spec https://www.rfc-editor.org/info/rfc8032
     RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)
@since 15

## EdECPublicKey.getPoint()

```java
EdECPoint getPoint()
```

Get the point representing the public key.

@return the {@code EdECPoint} representing the public key.

## EdECPublicKey.getParams()

```java
default NamedParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}