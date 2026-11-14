---
title: "KeyFactorySpi class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyFactorySpi.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyFactorySpi class (java.security)

```java
public abstract class KeyFactorySpi
```

This class defines the *Service Provider Interface* (**SPI**)
for the `KeyFactory` class.
All the abstract methods in this class must be implemented by each
cryptographic service provider who wishes to supply the implementation
of a key <example-value> for a particular algorithm.

 Key <example-value> are used to convert *keys* (opaque
cryptographic keys of type `Key`) into *key <example-value>*
(transparent representations of the underlying key <example-value>), and vice
versa.

 Key <example-value> are bidirectional. That is, they allow you to build an
opaque key <example-value> from a given key <example-value> (key <example-value>), or to
retrieve the underlying key <example-value> of a key <example-value> in a suitable format.

 Multiple compatible key <example-value> may exist for the same key.
For example, a DSA public key may be specified using
`DSAPublicKeySpec` or
`X509EncodedKeySpec`. A key <example-value> can be used to translate
between compatible key specifications.

 A provider should document all the key <example-value> supported by its
key factory.

**See also:** KeyFactory

**See also:** Key

**See also:** PublicKey

**See also:** PrivateKey

**See also:** java.security.spec.KeySpec

**See also:** java.security.spec.DSAPublicKeySpec

**See also:** java.security.spec.X509EncodedKeySpec

**Since:** 1.2

## KeyFactorySpi.KeyFactorySpi()

```java
public KeyFactorySpi()
```

Constructor for subclasses to call.

## KeyFactorySpi.engineGeneratePublic(KeySpec)

```java
protected abstract PublicKey engineGeneratePublic(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a public key <example-value> from the provided key
specification (key <example-value>).

Parameters:

- `keySpec`: the specification (key <example-value>) of the public key.

**Returns:** the public key.

Throws:

- `InvalidKeySpecException`: if the given key <example-value> is inappropriate for this key <example-value> to produce a public key.

## KeyFactorySpi.engineGeneratePrivate(KeySpec)

```java
protected abstract PrivateKey engineGeneratePrivate(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a private key <example-value> from the provided key
specification (key <example-value>).

Parameters:

- `keySpec`: the specification (key <example-value>) of the private key.

**Returns:** the private key.

Throws:

- `InvalidKeySpecException`: if the given key <example-value> is inappropriate for this key <example-value> to produce a private key.

## KeyFactorySpi.engineGetKeySpec(Key, Class<T>)

```java
protected abstract <T extends KeySpec> T engineGetKeySpec(Key key, Class<T> keySpec) throws InvalidKeySpecException
```

Returns a specification (key <example-value>) of the given key
object.
`keySpec` identifies the specification class in which
the key <example-value> should be returned. It could, for example, be
`DSAPublicKeySpec.class`, to indicate that the
key <example-value> should be returned in an instance of the
`DSAPublicKeySpec` class.

Parameters:

- `<T>`: the type of the key <example-value> to be returned
- `key`: the key.
- `keySpec`: the specification class in which the key <example-value> should be returned.

**Returns:** the underlying key <example-value> (key <example-value>) in an instance
of the requested specification class.

Throws:

- `InvalidKeySpecException`: if the requested key <example-value> is inappropriate for the given key, or the given key <example-value> be dealt with (e.g., the given key has an unrecognized format).

## KeyFactorySpi.engineTranslateKey(Key)

```java
protected abstract Key engineTranslateKey(Key key) throws InvalidKeyException
```

Translates a key <example-value>, whose provider may be unknown or
potentially untrusted, into a corresponding key <example-value> of this key
factory.

Parameters:

- `key`: the key whose provider is unknown or untrusted.

**Returns:** the translated key.

Throws:

- `InvalidKeyException`: if the given key <example-value> be processed by this key factory.
