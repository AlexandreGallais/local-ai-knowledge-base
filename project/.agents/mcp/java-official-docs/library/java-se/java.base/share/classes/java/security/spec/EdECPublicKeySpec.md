# EdECPublicKeySpec class (java.security.spec)

```java
public final class EdECPublicKeySpec implements KeySpec
```

A class representing elliptic curve public keys as defined in
<a href="https://tools.ietf.org/html/rfc8032">RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA)</a>, including the curve and other
algorithm parameters. The public key is a point on the curve, which is
represented using an {@code EdECPoint}.

@spec https://www.rfc-editor.org/info/rfc8032
     RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)
@since 15

## EdECPublicKeySpec.EdECPublicKeySpec(NamedParameterSpec, EdECPoint)

```java
public EdECPublicKeySpec(NamedParameterSpec params, EdECPoint point)
```

Construct a public key spec using the supplied parameters and
point.

@param params the algorithm parameters.
@param point the point representing the public key.

@throws NullPointerException if {@code params} or {@code point}
                             is null.

## EdECPublicKeySpec.getParams()

```java
public NamedParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

@return the parameters.

## EdECPublicKeySpec.getPoint()

```java
public EdECPoint getPoint()
```

Get the point representing the public key.

@return the {@code EdECPoint} representing the public key.