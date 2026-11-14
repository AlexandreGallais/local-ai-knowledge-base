---
title: "X509EncodedKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/X509EncodedKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# X509EncodedKeySpec class (java.security.spec)

```java
public non-sealed class X509EncodedKeySpec extends EncodedKeySpec implements DEREncodable
```

This class represents the ASN.1 encoding of a public key,
encoded according to the ASN.1 type `SubjectPublicKeyInfo`.
The `SubjectPublicKeyInfo` syntax is defined in the X.509
standard as follows:

```java
SubjectPublicKeyInfo ::= SEQUENCE {
  algorithm AlgorithmIdentifier,
  subjectPublicKey BIT STRING
```

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** EncodedKeySpec

**See also:** PKCS8EncodedKeySpec

**Since:** 1.2

## X509EncodedKeySpec.X509EncodedKeySpec(byte[])

```java
public X509EncodedKeySpec(byte[] encodedKey)
```

Creates a new `X509EncodedKeySpec` with the given encoded key.

Parameters:

- `encodedKey`: the key, which is assumed to be encoded according to the X.509 standard. The contents of the array are copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `encodedKey` is null.

## X509EncodedKeySpec.X509EncodedKeySpec(byte[], String)

```java
public X509EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new `X509EncodedKeySpec` with the given encoded key.
This constructor is useful when subsequent callers of the
`X509EncodedKeySpec` object might not know the algorithm
of the key.

Parameters:

- `encodedKey`: the key, which is assumed to be encoded according to the X.509 standard. The contents of the array are copied to protect against subsequent modification.
- `algorithm`: the algorithm name of the encoded public key. See the AsymmetricKey <example-value> section in the  Java Security Standard Algorithm Names Specification for information about standard asymmetric key <example-value> names.

**Since:** 9

Throws:

- `NullPointerException`: if `encodedKey` or `algorithm` is null.
- `IllegalArgumentException`: if `algorithm` is the empty string `""`

## X509EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the key bytes, encoded according to the X.509 standard.

**Returns:** the X.509 encoding of the key. Returns a new array
each time this method is called.

## X509EncodedKeySpec.getFormat()

```java
public final String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

**Returns:** the string `"X.509"`.
