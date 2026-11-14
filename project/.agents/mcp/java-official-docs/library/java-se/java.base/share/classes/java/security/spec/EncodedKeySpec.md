# EncodedKeySpec class (java.security.spec)

```java
public abstract class EncodedKeySpec implements KeySpec
```

This class represents a public or private key in encoded format.

@author Jan Luehe


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see X509EncodedKeySpec
@see PKCS8EncodedKeySpec

@since 1.2

## EncodedKeySpec.EncodedKeySpec(byte[])

```java
public EncodedKeySpec(byte[] encodedKey)
```

Creates a new {@code EncodedKeySpec} with the given encoded key.

@param encodedKey the encoded key. The contents of the
array are copied to protect against subsequent modification.
@throws NullPointerException if {@code encodedKey}
is null.

## EncodedKeySpec.EncodedKeySpec(byte[], String)

```java
protected EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new {@code EncodedKeySpec} with the given encoded key.
This constructor is useful when subsequent callers of the
{@code EncodedKeySpec} object might not know the algorithm
of the key.

@param encodedKey the encoded key. The contents of the
array are copied to protect against subsequent modification.
@param algorithm the algorithm name of the encoded key.
See the AsymmetricKey Algorithms section in the
<a href="{@docRoot}/../specs/security/standard-names.html#asymmetrickey-algorithms">
Java Security Standard Algorithm Names Specification</a>
for information about standard asymmetric key algorithm names.
@spec security/standard-names.html Java Security Standard Algorithm Names
@throws NullPointerException if {@code encodedKey}
or {@code algorithm} is null.
@throws IllegalArgumentException if {@code algorithm} is
the empty string {@code ""}
@spec security/standard-names.html Java Security Standard Algorithm Names
@since 9

## EncodedKeySpec.getAlgorithm()

```java
public String getAlgorithm()
```

Returns the name of the algorithm of the encoded key.

@return the name of the algorithm, or null if not specified
@since 9

## EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the encoded key.

@return the encoded key. Returns a new array each time
this method is called.

## EncodedKeySpec.getFormat()

```java
public abstract String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

<p>If the opaque representation of a key
(see {@link java.security.Key Key}) can be transformed
(see {@link java.security.KeyFactory KeyFactory})
into this key specification (or a subclass of it),
{@code getFormat} called
on the opaque key returns the same value as the
{@code getFormat} method
of this key specification.

@return a string representation of the encoding format.