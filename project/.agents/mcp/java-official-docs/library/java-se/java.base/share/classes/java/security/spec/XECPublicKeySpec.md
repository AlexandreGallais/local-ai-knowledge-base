# XECPublicKeySpec class (java.security.spec)

```java
public class XECPublicKeySpec implements KeySpec
```

A class representing elliptic curve public keys as defined in RFC 7748,
including the curve and other algorithm parameters. The public key is a
particular point on the curve, which is represented using only its
u-coordinate. A u-coordinate is an element of the field of integers modulo
some value that is determined by the algorithm parameters. This field
element is represented by a BigInteger which may hold any value. That is,
the BigInteger is not restricted to the range of canonical field elements.

@since 11

## XECPublicKeySpec.XECPublicKeySpec(AlgorithmParameterSpec, BigInteger)

```java
public XECPublicKeySpec(AlgorithmParameterSpec params, BigInteger u)
```

Construct a public key spec using the supplied parameters and
u coordinate.

@param params the algorithm parameters
@param u the u-coordinate of the point, represented using a BigInteger
         which may hold any value

@throws NullPointerException if {@code params} or {@code u}
                             is null.

## XECPublicKeySpec.getParams()

```java
public AlgorithmParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

@return the parameters

## XECPublicKeySpec.getU()

```java
public BigInteger getU()
```

Get the u coordinate of the point.

@return the u-coordinate, represented using a BigInteger which may hold
         any value