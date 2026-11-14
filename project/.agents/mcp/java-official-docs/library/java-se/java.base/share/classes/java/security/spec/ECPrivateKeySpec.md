# ECPrivateKeySpec class (java.security.spec)

```java
public class ECPrivateKeySpec implements KeySpec
```

This immutable class specifies an elliptic curve private key with
its associated parameters.

@see KeySpec
@see ECParameterSpec

@author Valerie Peng

@since 1.5

## ECPrivateKeySpec.ECPrivateKeySpec(BigInteger, ECParameterSpec)

```java
public ECPrivateKeySpec(BigInteger s, ECParameterSpec params)
```

Creates a new ECPrivateKeySpec with the specified
parameter values.
@param s the private value.
@param params the associated elliptic curve domain
parameters.
@throws    NullPointerException if {@code s}
or {@code params} is null.

## ECPrivateKeySpec.getS()

```java
public BigInteger getS()
```

Returns the private value S.
@return the private value S.

## ECPrivateKeySpec.getParams()

```java
public ECParameterSpec getParams()
```

Returns the associated elliptic curve domain
parameters.
@return the EC domain parameters.