---
title: "KeyPair class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/KeyPair.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# KeyPair class (java.security)

```java
public final class KeyPair implements java.io.Serializable, DEREncodable
```

This class is a simple holder for a key pair (a public key and a
private key). It does not enforce any security, and, when initialized,
should be treated like a PrivateKey.

**See also:** PublicKey

**See also:** PrivateKey

**Since:** 1.1

## KeyPair.KeyPair(PublicKey, PrivateKey)

```java
public KeyPair(PublicKey <example-value>, PrivateKey <example-value>)
```

Constructs a key pair from the given public key and private key.

Note that this constructor only stores references to the public
and private key <example-value> in the generated key pair. This is safe,
because `Key` objects are immutable.

Parameters:

- `publicKey`: the public key.
- `privateKey`: the private key.

## KeyPair.getPublic()

```java
public PublicKey getPublic()
```

Returns a reference to the public key <example-value> of this key pair.

**Returns:** a reference to the public key.

## KeyPair.getPrivate()

```java
public PrivateKey getPrivate()
```

Returns a reference to the private key <example-value> of this key pair.

**Returns:** a reference to the private key.
