# PKCS8EncodedKeySpec class (java.security.spec)

```java
public non-sealed class PKCS8EncodedKeySpec extends EncodedKeySpec implements DEREncodable
```

This class represents the ASN.1 encoding of a private key,
encoded according to the ASN.1 type {@code OneAsymmetricKey}.
The {@code OneAsymmetricKey} syntax is defined in the PKCS#8 standard
as follows:

<pre>
OneAsymmetricKey ::= SEQUENCE {
  version Version,
  privateKeyAlgorithm PrivateKeyAlgorithmIdentifier,
  privateKey PrivateKey,
  attributes       [0] Attributes OPTIONAL,
  ...,
  [[2: publicKey  [1] PublicKey OPTIONAL ]],
  ...
}

PrivateKeyInfo ::= OneAsymmetricKey

Version ::= INTEGER { v1(0), v2(1) }

PrivateKeyAlgorithmIdentifier ::= AlgorithmIdentifier

PrivateKey ::= OCTET STRING

PublicKey ::= BIT STRING

Attributes ::= SET OF Attribute
</pre>

@author Jan Luehe


@see java.security.Key
@see java.security.KeyFactory
@see KeySpec
@see EncodedKeySpec
@see X509EncodedKeySpec

@spec https://www.rfc-editor.org/info/rfc5958
    RFC 5958: Asymmetric Key Packages

@since 1.2

## PKCS8EncodedKeySpec.PKCS8EncodedKeySpec(byte[])

```java
public PKCS8EncodedKeySpec(byte[] encodedKey)
```

Creates a new {@code PKCS8EncodedKeySpec} with the given encoded key.

@param encodedKey the key, which is assumed to be
encoded according to the PKCS #8 standard. The contents of
the array are copied to protect against subsequent modification.
@throws NullPointerException if {@code encodedKey}
is null.

## PKCS8EncodedKeySpec.PKCS8EncodedKeySpec(byte[], String)

```java
public PKCS8EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new {@code PKCS8EncodedKeySpec} with the given encoded key and
algorithm. This constructor is useful when subsequent callers of
the {@code PKCS8EncodedKeySpec} object might not know the
algorithm of the private key.

@param encodedKey the key, which is assumed to be
encoded according to the PKCS #8 standard. The contents of
the array are copied to protect against subsequent modification.
@param algorithm the algorithm name of the encoded private key.
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

## PKCS8EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the key bytes, encoded according to the PKCS #8 standard.

@return the PKCS #8 encoding of the key. Returns a new array
each time this method is called.

## PKCS8EncodedKeySpec.getFormat()

```java
public final String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

@return the string {@code "PKCS#8"}.