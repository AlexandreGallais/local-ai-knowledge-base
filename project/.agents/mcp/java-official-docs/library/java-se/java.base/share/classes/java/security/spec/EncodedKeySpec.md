---
title: "EncodedKeySpec class (java.security.spec)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/spec/EncodedKeySpec.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EncodedKeySpec class (java.security.spec)

```java
public abstract class EncodedKeySpec implements KeySpec
```

This class represents a public or private key in encoded format.

**See also:** java.security.Key

**See also:** java.security.KeyFactory

**See also:** KeySpec

**See also:** X509EncodedKeySpec

**See also:** PKCS8EncodedKeySpec

**Since:** 1.2

## EncodedKeySpec.EncodedKeySpec(byte[])

```java
public EncodedKeySpec(byte[] encodedKey)
```

Creates a new `EncodedKeySpec` with the given encoded key.

Parameters:

- `encodedKey`: the encoded key. The contents of the array are copied to protect against subsequent modification.

Throws:

- `NullPointerException`: if `encodedKey` is null.

## EncodedKeySpec.EncodedKeySpec(byte[], String)

```java
protected EncodedKeySpec(byte[] encodedKey, String algorithm)
```

Creates a new `EncodedKeySpec` with the given encoded key.
This constructor is useful when subsequent callers of the
`EncodedKeySpec` object might not know the algorithm
of the key.

Parameters:

- `encodedKey`: the encoded key. The contents of the array are copied to protect against subsequent modification.
- `algorithm`: the algorithm name of the encoded key. See the AsymmetricKey <example-value> section in the  Java Security Standard Algorithm Names Specification for information about standard asymmetric key <example-value> names.

**Since:** 9

Throws:

- `NullPointerException`: if `encodedKey` or `algorithm` is null.
- `IllegalArgumentException`: if `algorithm` is the empty string `""`

## EncodedKeySpec.getAlgorithm()

```java
public String getAlgorithm()
```

Returns the name of the algorithm of the encoded key.

**Returns:** the name of the algorithm, or null if not specified

**Since:** 9

## EncodedKeySpec.getEncoded()

```java
public byte[] getEncoded()
```

Returns the encoded key.

**Returns:** the encoded key. Returns a new array each time
this method is called.

## EncodedKeySpec.getFormat()

```java
public abstract String getFormat()
```

Returns the name of the encoding format associated with this
key specification.

If the opaque representation of a key
(see Key) can be transformed
(see KeyFactory)
into this key <example-value> (or a subclass of it),
`getFormat` called
on the opaque key <example-value> the same value as the
`getFormat` method
of this key specification.

**Returns:** a string representation of the encoding format.
