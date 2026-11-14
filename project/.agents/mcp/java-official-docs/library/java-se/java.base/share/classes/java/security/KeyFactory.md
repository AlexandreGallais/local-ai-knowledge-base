---
title: "KeyFactory class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyFactory.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyFactory class (java.security)

```java
public class KeyFactory
```

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

 The following is an example of how to use a key <example-value> in order to
instantiate a DSA public key from its encoding.
Assume Alice has received a digital signature from Bob.
Bob also sent her his public key (in encoded format) to verify
his signature. Alice then performs the following actions:

```java
X509EncodedKeySpec bobPubKeySpec = new X509EncodedKeySpec(bobEncodedPubKey);
KeyFactory keyFactory = KeyFactory.getInstance("DSA");
PublicKey <example-value> = keyFactory.generatePublic(bobPubKeySpec);
Signature sig = Signature.getInstance("DSA");
sig.initVerify(bobPubKey);
sig.update(data);
sig.verify(signature);
```

 Every implementation of the Java platform is required to support the
following standard `KeyFactory` algorithms:

- `DiffieHellman`

- `DSA`

- `EC`

- `RSA`

- `RSASSA-PSS`

- `X25519`

These algorithms are described in the
KeyFactory section of the
Java Security Standard Algorithm Names Specification.
Consult the release documentation for your implementation to see if any
other algorithms are supported.

**See also:** Key

**See also:** PublicKey

**See also:** PrivateKey

**See also:** java.security.spec.KeySpec

**See also:** java.security.spec.DSAPublicKeySpec

**See also:** java.security.spec.X509EncodedKeySpec

**Since:** 1.2

## KeyFactory.KeyFactory(KeyFactorySpi, Provider, String)

```java
protected KeyFactory(KeyFactorySpi keyFacSpi, Provider provider, String algorithm)
```

Creates a `KeyFactory` object.

Parameters:

- `keyFacSpi`: the delegate
- `provider`: the provider
- `algorithm`: the name of the algorithm to associate with this `KeyFactory`

## KeyFactory.getInstance(String)

```java
public static KeyFactory getInstance(String algorithm) throws NoSuchAlgorithmException
```

Returns a `KeyFactory` object that converts
public/private keys of the specified algorithm.

 This method traverses the list of registered security providers,
starting with the most preferred provider.
A new `KeyFactory` object encapsulating the
`KeyFactorySpi` implementation from the first
provider that supports the specified algorithm is returned.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the requested key algorithm. See the KeyFactory section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.

**Implementation note:** The JDK Reference Implementation additionally uses the
`jdk.security.provider.preferred`
Security property to determine
the preferred provider order for the specified algorithm. This
may be different from the order of providers returned by
Security.getProviders().

**Returns:** the new `KeyFactory` object

**See also:** Provider

Throws:

- `NoSuchAlgorithmException`: if no `Provider` supports a `KeyFactorySpi` implementation for the specified algorithm
- `NullPointerException`: if `algorithm` is `null`

## KeyFactory.getInstance(String, String)

```java
public static KeyFactory getInstance(String algorithm, String provider) throws NoSuchAlgorithmException, NoSuchProviderException
```

Returns a `KeyFactory` object that converts
public/private keys of the specified algorithm.

 A new `KeyFactory` object encapsulating the
`KeyFactorySpi` implementation from the specified provider
is returned.  The specified provider must be registered
in the security provider list.

 Note that the list of registered providers may be retrieved via
the Security.getProviders() method.

Parameters:

- `algorithm`: the name of the requested key algorithm. See the KeyFactory section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the name of the provider.

**Returns:** the new `KeyFactory` object

**See also:** Provider

Throws:

- `IllegalArgumentException`: if the provider name is `null` or empty
- `NoSuchAlgorithmException`: if a `KeyFactorySpi` implementation for the specified algorithm is not available from the specified provider
- `NoSuchProviderException`: if the specified provider is not registered in the security provider list
- `NullPointerException`: if `algorithm` is `null`

## KeyFactory.getInstance(String, Provider)

```java
public static KeyFactory getInstance(String algorithm, Provider provider) throws NoSuchAlgorithmException
```

Returns a `KeyFactory` object that converts
public/private keys of the specified algorithm.

 A new `KeyFactory` object encapsulating the
`KeyFactorySpi` implementation from the specified provider
is returned.  Note that the specified provider does not
have to be registered in the provider list.

Parameters:

- `algorithm`: the name of the requested key algorithm. See the KeyFactory section in the  Java Security Standard Algorithm Names Specification for information about standard algorithm names.
- `provider`: the provider.

**Returns:** the new `KeyFactory` object

**See also:** Provider

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the specified provider is `null`
- `NoSuchAlgorithmException`: if a `KeyFactorySpi` implementation for the specified algorithm is not available from the specified `Provider` object
- `NullPointerException`: if `algorithm` is `null`

## KeyFactory.getProvider()

```java
public final Provider getProvider()
```

Returns the provider of this key <example-value> object.

**Returns:** the provider of this key <example-value> object

## KeyFactory.getAlgorithm()

```java
public final String getAlgorithm()
```

Gets the name of the algorithm
associated with this `KeyFactory`.

**Returns:** the name of the algorithm associated with this
`KeyFactory`

## KeyFactory.generatePublic(KeySpec)

```java
public final PublicKey generatePublic(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a public key <example-value> from the provided key <example-value>
(key <example-value>).

Parameters:

- `keySpec`: the specification (key <example-value>) of the public key.

**Returns:** the public key.

Throws:

- `InvalidKeySpecException`: if the given key <example-value> is inappropriate for this key <example-value> to produce a public key.

## KeyFactory.generatePrivate(KeySpec)

```java
public final PrivateKey generatePrivate(KeySpec keySpec) throws InvalidKeySpecException
```

Generates a private key <example-value> from the provided key <example-value>
(key <example-value>).

Parameters:

- `keySpec`: the specification (key <example-value>) of the private key.

**Returns:** the private key.

Throws:

- `InvalidKeySpecException`: if the given key <example-value> is inappropriate for this key <example-value> to produce a private key.

## KeyFactory.getKeySpec(Key, Class<T>)

```java
public final <T extends KeySpec> T getKeySpec(Key key, Class<T> keySpec) throws InvalidKeySpecException
```

Returns a specification (key <example-value>) of the given key object.
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

- `InvalidKeySpecException`: if the requested key <example-value> is inappropriate for the given key, or the given key <example-value> be processed (e.g., the given key has an unrecognized algorithm or format).

## KeyFactory.translateKey(Key)

```java
public final Key translateKey(Key key) throws InvalidKeyException
```

Translates a key <example-value>, whose provider may be unknown or potentially
untrusted, into a corresponding key <example-value> of this key factory.

Parameters:

- `key`: the key whose provider is unknown or untrusted.

**Returns:** the translated key.

Throws:

- `InvalidKeyException`: if the given key <example-value> be processed by this key factory.
