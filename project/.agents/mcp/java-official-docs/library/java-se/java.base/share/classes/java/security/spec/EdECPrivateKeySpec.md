# EdECPrivateKeySpec class (java.security.spec)

```java
public final class EdECPrivateKeySpec implements KeySpec
```

A class representing elliptic curve private keys as defined in
<a href="https://tools.ietf.org/html/rfc8032">RFC 8032: Edwards-Curve
Digital Signature Algorithm (EdDSA)</a>, including the curve and other
algorithm parameters. The private key is a bit string represented using
a byte array. This class only supports bit string lengths that are a
multiple of 8.

@spec https://www.rfc-editor.org/info/rfc8032
     RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)
@since 15

## EdECPrivateKeySpec.EdECPrivateKeySpec(NamedParameterSpec, byte[])

```java
public EdECPrivateKeySpec(NamedParameterSpec params, byte[] bytes)
```

Construct a private key spec using the supplied parameters and
bit string.

@param params the algorithm parameters.
@param bytes the key as a byte array. This array is copied
             to protect against subsequent modification.

@throws NullPointerException if {@code params} or {@code bytes}
                             is null.

## EdECPrivateKeySpec.getParams()

```java
public NamedParameterSpec getParams()
```

Get the algorithm parameters that define the curve and other settings.

@return the algorithm parameters.

## EdECPrivateKeySpec.getBytes()

```java
public byte[] getBytes()
```

Get the byte array representing the private key. A new copy of the array
is returned each time this method is called.

@return the private key as a byte array.