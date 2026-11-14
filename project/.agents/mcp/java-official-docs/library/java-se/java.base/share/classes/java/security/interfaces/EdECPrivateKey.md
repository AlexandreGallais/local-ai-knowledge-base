# EdECPrivateKey interface (java.security.interfaces)

```java
public interface EdECPrivateKey extends EdECKey, PrivateKey
```

An interface for an elliptic curve private key as defined by
<a href="https://tools.ietf.org/html/rfc8032">RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA)</a>. These keys are distinct from the
keys represented by {@code ECPrivateKey}, and they are intended for use
with algorithms based on RFC 8032 such as the EdDSA {@code Signature}
algorithm.
<p>
An Edwards-Curve private key is a bit string. This interface only supports bit
string lengths that are a multiple of 8, and the key is represented using
a byte array.

@spec https://www.rfc-editor.org/info/rfc8032
     RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)
@since 15

## EdECPrivateKey.getBytes()

```java
Optional<byte[]> getBytes()
```

Get a copy of the byte array representing the private key. This method
may return an empty {@code Optional} if the implementation is not
willing to produce the private key value.

@return an {@code Optional} containing the private key byte array.
If the key is not available, then an empty {@code Optional}.

## EdECPrivateKey.getParams()

```java
default NamedParameterSpec getParams()
```

{@inheritDoc java.security.AsymmetricKey}

@implSpec
The default implementation returns {@code null}.

@return {@inheritDoc java.security.AsymmetricKey}