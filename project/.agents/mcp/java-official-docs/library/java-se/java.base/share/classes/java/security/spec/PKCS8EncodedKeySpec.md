---
title: "PKCS8EncodedKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/PKCS8EncodedKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKCS8EncodedKeySpec class (java.security.spec)

```java
public non-sealed class PKCS8EncodedKeySpec extends EncodedKeySpec implements DEREncodable
```

This class represents the ASN.1 encoding of a private key,
encoded according to the ASN.1 type `OneAsymmetricKey`.
The `OneAsymmetricKey` syntax is defined in the PKCS#8 standard
as follows:

```java
OneAsymmetricKey ::= SEQUENCE {
  version Version,
  privateKeyAlgorithm PrivateKeyAlgorithmIdentifier,
  privateKey <example-value>,
  attributes       [0] Attributes OPTIONAL,
  ...,
  [[2: publicKey  [1] PublicKey <example-value> ]],
  ...
}

PrivateKeyInfo ::= OneAsymmetricKey

Version ::= INTEGER { v1(0), v2(1) }

PrivateKeyAlgorithmIdentifier ::= AlgorithmIdentifier

PrivateKey ::= OCTET STRING

PublicKey ::= BIT STRING

Attributes ::= SET OF Attribute
```

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** EncodedKeySpec

**See also:** X509EncodedKeySpec

**Since:** 1.2

## PKCS8EncodedKeySpec.PKCS8EncodedKeySpec(byte[])

```java
public PKCS8EncodedKeySpec(byte[] encodedKey)
```

Creates a new `PKCS8EncodedKeySpec` with the given encoded key.

Parameters:

- `encodedKey`: the key, which is assumed to be encoded according to the PKCS #8 standard. The contents of the array are copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `encodedKey` is null.

## PKCS8EncodedKeySpec.PKCS8EncodedKeySpec(byte[], String)

```java
public PKCS8EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new `PKCS8EncodedKeySpec` with the given encoded key and
algorithm. This constructor is useful when subsequent callers of
the `PKCS8EncodedKeySpec` object might not know the
algorithm of the private key.

Parameters:

- `encodedKey`: the key, which is assumed to be encoded according to the PKCS #8 standard. The contents of the array are copied to protect against subsequent modification.
- `algorithm`: the algorithm name of the encoded private key. See the AsymmetricKey <example-value> section in the  Java Security Standard Algorithm Names Specification for information about standard asymmetric key <example-value> names.

**Since:** 9

Throws:

- `NullPointerException`: if `encodedKey` or `algorithm` is null.
- `IllegalArgumentException`: if `algorithm` is the empty string `""`

## PKCS8EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the key bytes, encoded according to the PKCS #8 standard.

**Returns:** the PKCS #8 encoding of the key. Returns a new array
each time this method is called.

## PKCS8EncodedKeySpec.getFormat()

```java
public final String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

**Returns:** the string `"PKCS#8"`.
