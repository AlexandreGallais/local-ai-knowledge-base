# X509EncodedKeySpec class (java.security.spec)

```java
public non-sealed class X509EncodedKeySpec extends EncodedKeySpec implements DEREncodable
```

This class represents the ASN.1 encoding of a public key,
encoded according to the ASN.1 type {@code SubjectPublicKeyInfo}.
The {@code SubjectPublicKeyInfo} syntax is defined in the X.509
standard as follows:

<pre>
SubjectPublicKeyInfo ::= SEQUENCE {
  algorithm AlgorithmIdentifier,
  subjectPublicKey BIT STRING }
</pre>

@author Jan Luehe


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see EncodedKeySpec
@see PKCS8EncodedKeySpec

@since 1.2

## X509EncodedKeySpec.X509EncodedKeySpec(byte[])

```java
public X509EncodedKeySpec(byte[] encodedKey)
```

Creates a new {@code X509EncodedKeySpec} with the given encoded key.

@param encodedKey the key, which is assumed to be
encoded according to the X.509 standard. The contents of the
array are copied to protect against subsequent modification.
@throws NullPointerException if {@code encodedKey}
is null.

## X509EncodedKeySpec.X509EncodedKeySpec(byte[], String)

```java
public X509EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new {@code X509EncodedKeySpec} with the given encoded key.
This constructor is useful when subsequent callers of the
{@code X509EncodedKeySpec} object might not know the algorithm
of the key.

@param encodedKey the key, which is assumed to be
encoded according to the X.509 standard. The contents of the
array are copied to protect against subsequent modification.
@param algorithm the algorithm name of the encoded public key.
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

## X509EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the key bytes, encoded according to the X.509 standard.

@return the X.509 encoding of the key. Returns a new array
each time this method is called.

## X509EncodedKeySpec.getFormat()

```java
public final String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

@return the string {@code "X.509"}.